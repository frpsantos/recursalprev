import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, msg: "send-email online. Use POST para enviar." });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  try {
    let data = req.body;
    if (!data || typeof data !== "object") {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const text = Buffer.concat(chunks).toString("utf8");
      data = text ? JSON.parse(text) : {};
    }

    // checagem de envs do Microsoft 365
    if (!process.env.M365_USER || !process.env.M365_PASS) {
      console.error("ENV MISSING", { M365_USER: !!process.env.M365_USER, M365_PASS: !!process.env.M365_PASS });
      return res.status(500).json({ ok: false, error: "SMTP envs do Microsoft ausentes" });
    }

    if (!data?.email || !data?.nome) {
      return res.status(400).json({ ok: false, error: "Campos obrigatórios faltando" });
    }

    // Transporter para Exchange Online (Office 365)
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,            // STARTTLS
      requireTLS: true,
      auth: {
        user: process.env.M365_USER,
        pass: process.env.M365_PASS,
      },
      tls: {
        // garante TLS moderno; rejeita cert inválido em prod
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
      // Em serverless (Vercel) evite pooling
      pool: false,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"RecursalPrev" <${process.env.M365_USER}>`,   // remetente TEM que ser do seu tenant
      to: "frp.santos@hotmail.com,haruanacardoso@gmail.com,fernando@autrapay.com.br",
      subject: `Novo lead - ${data.nome}`,
      html: `
        <h2>Nova solicitação de proposta</h2>
        <p><b>Nome:</b> ${data.nome}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>WhatsApp:</b> ${data.whatsapp || "-"}</p>
        <p><b>Escritório:</b> ${data.escritorio || "-"}</p>
        <p><b>Plano:</b> ${data.plano || "-"}</p>
      `,
      replyTo: data.email, // opcional: ao responder vai para o lead
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("SMTP ERROR:", {
      message: err?.message, code: err?.code, command: err?.command, response: err?.response,
    });
    return res.status(500).json({
      ok: false, error: err?.message || "Falha ao enviar", code: err?.code, command: err?.command, smtp: err?.response,
    });
  }
}
