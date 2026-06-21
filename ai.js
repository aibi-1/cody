// ai.js — функция запроса к AI API (через наш безопасный backend /api/chat)

async function askAI(messages) {
  const response = await fetch(CONFIG.CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    throw new Error(`Ошибка API (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  if (!data.answer) {
    throw new Error("Пустой ответ от сервера");
  }
  return data.answer;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { askAI };
}
