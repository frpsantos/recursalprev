// /api/send-email.js  (ESM)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  try {
    const data = req.body;

    if (!data?.email || !data?.nome) {
      return res.status(400).json({ ok: false, error: "Campos obrigatórios faltando" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"RecursalPrev" <${process.env.ZOHO_USER}>`,
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
