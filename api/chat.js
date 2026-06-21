// api/chat.js — Vercel Serverless Function
// Держит API-ключ на сервере (process.env.OPENAI_API_KEY),
// чтобы он никогда не попадал в браузер пользователя.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "messages must be an array" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is not configured: missing OPENAI_API_KEY" });
    return;
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 500
      })
    });

    if (!openaiResponse.ok) {
      const errText = await openaiResponse.text();
      res.status(openaiResponse.status).json({ error: "OpenAI API error", details: errText });
      return;
    }

    const data = await openaiResponse.json();
    const answer = data.choices?.[0]?.message?.content || "";

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: String(err) });
  }
}
