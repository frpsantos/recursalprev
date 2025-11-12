// /api/send-email.js  (ESM, Microsoft Graph - client_credentials)

// Requer as ENVs na Vercel:
// GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_FROM_USER

export default async function handler(req, res) {
  // CORS / preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res
      .status(200)
      .json({ ok: true, msg: "send-email via Microsoft Graph online. Use POST." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  try {
    // parse robusto do body (caso o framework não parseie)
    let data = req.body;
    if (!data || typeof data !== "object") {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const text = Buffer.concat(chunks).toString("utf8");
      data = text ? JSON.parse(text) : {};
    }

    const {
      GRAPH_TENANT_ID,
      GRAPH_CLIENT_ID,
      GRAPH_CLIENT_SECRET,
      GRAPH_FROM_USER,
    } = process.env;

    // 🧩 insira AQUI a validação
      if (
        !data?.nome ||
        !data?.email ||
        !data?.whatsapp ||
        !data?.escritorio ||
        !data?.plano
      ) {
        return res.status(400).json({
          ok: false,
          error:
            "Todos os campos são obrigatórios: nome, email, whatsapp, escritório e plano.",
        });
      }


    if (!GRAPH_TENANT_ID || !GRAPH_CLIENT_ID || !GRAPH_CLIENT_SECRET || !GRAPH_FROM_USER) {
      return res
        .status(500)
        .json({ ok: false, error: "Variáveis de ambiente do Graph ausentes" });
    }

    if (!data?.email || !data?.nome) {
      return res
        .status(400)
        .json({ ok: false, error: "Campos obrigatórios faltando: nome, email" });
    }

    // 1) Token OAuth2 (client_credentials)
    const tokenResp = await fetch(
      `https://login.microsoftonline.com/${GRAPH_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: GRAPH_CLIENT_ID,
          client_secret: GRAPH_CLIENT_SECRET,
          scope: "https://graph.microsoft.com/.default",
          grant_type: "client_credentials",
        }),
      }
    );

    const tokenData = await tokenResp.json();
    if (!tokenResp.ok || !tokenData.access_token) {
      return res.status(500).json({
        ok: false,
        error: "Falha ao obter access_token do Graph",
        details: tokenData,
      });
    }
    const accessToken = tokenData.access_token;

    // 2) Monta a mensagem
    const mailPayload = {
      message: {
        subject: `Novo lead - ${data.nome}`,
        body: {
          contentType: "HTML",
          content: `
            <h2>Nova solicitação de proposta</h2>
            <p><b>Nome:</b> ${data.nome}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>WhatsApp:</b> ${data.whatsapp || "-"}</p>
            <p><b>Escritório:</b> ${data.escritorio || "-"}</p>
            <p><b>Plano:</b> ${data.plano || "-"}</p>
          `,
        },
        toRecipients: [
          { emailAddress: { address: "recursalprev@gmail.com" } },
          { emailAddress: { address: "haruanacardoso@gmail.com" } },
          { emailAddress: { address: "fernando@autrapay.com.br" } },
        ],
        // opcional: ao responder, vai para o lead
        replyTo: [{ emailAddress: { address: data.email } }],
        from: { emailAddress: { address: GRAPH_FROM_USER } },
      },
      saveToSentItems: false,
    };

    // 3) Envia via Graph
    const sendResp = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
        GRAPH_FROM_USER
      )}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailPayload),
      }
    );

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      return res.status(sendResp.status).json({
        ok: false,
        error: "Falha ao enviar e-mail via Graph",
        details: errText,
      });
    }

    return res
      .status(200)
      .json({ ok: true, msg: "E-mail enviado com sucesso via Microsoft Graph" });
  } catch (err) {
    console.error("GRAPH SEND ERROR:", err);
    return res
      .status(500)
      .json({ ok: false, error: err?.message || "Erro desconhecido" });
  }
}
