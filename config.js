// config.js — настройки приложения
// ВАЖНО: настоящий API-ключ НЕ хранится здесь и не попадает в браузер.
// Он лежит в переменной окружения Vercel (OPENAI_API_KEY) и используется
// только внутри серверной функции /api/chat.js.
// Это сделано специально: если положить ключ в клиентский JS,
// любой посетитель сайта сможет открыть DevTools и украсть его.

const CONFIG = {
  CHAT_ENDPOINT: "/api/chat", // наш собственный backend-эндпоинт (Vercel Function)
  MODEL: "gpt-4o-mini",
  MAX_TOKENS: 500
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CONFIG };
}
