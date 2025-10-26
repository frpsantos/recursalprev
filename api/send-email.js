// /api/send-email.js  (ESM)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  try {
    // ---- Parse robusto do body ----
    let data = req.body;
    if (!data || typeof data !== "object") {
      // Em alguns runtimes, req é um stream. Vamos ler manualmente.
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const text = Buffer.concat(chunks).toString("utf8");
      data = text ? JSON.parse(text) : {};
    }

    console.log("REQ BODY (parsed):", data);

    // ---- Validação mínima ----
    if (!data?.email || !data?.nome) {
      console.warn("Bad Request: missing fields", { email: data?.email, nome: data?.nome });
      return res.status(400).json({ ok: false, error: "Campos obrigatórios faltando" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,          // Se der erro de TLS, teste 587 + secure:false + requireTLS:true
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
      // tls: { minVersion: "TLSv1.2" }, // raramente necessário
    });

    // Verifica conexão/autenticação (ajuda a debugar credentials)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"RecursalPrev" <${process.env.ZOHO_USER}>`, // remetente DEVE ser o mesmo user ou alias aprovado
      to: "contato@recursalprev.com.br",
      subject: `Novo lead - ${data.nome}`,
      html: `
        <h2>Nova solicitação de proposta</h2>
        <p><b>Nome:</b> ${data.nome}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>WhatsApp:</b> ${data.whatsapp || "-"}</p>
        <p><b>Escritório:</b> ${data.escritorio || "-"}</p>
        <p><b>Plano:</b> ${data.plano || "-"}</p>
      `,
    });

    console.log("Email sent:", info.messageId);
    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("SMTP ERROR:", {
      message: err?.message,
      code: err?.code,
      command: err?.command,
      response: err?.response,
    });

    return res.status(500).json({
      ok: false,
      error: err?.message || "Falha ao enviar",
      code: err?.code,
      command: err?.command,
      smtp: err?.response,
    });
  }
}
