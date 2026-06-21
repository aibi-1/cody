// app.js — логика чата: рендер сообщений, отправка, история, быстрые кнопки

const STORAGE_KEY = "school_bot_history_v1";
const WELCOME_TEXT = `Привет! 👋 Я бот-помощник школы ${SCHOOL_DATA.name}. Спросите меня про расписание, цены, адреса филиалов или как записаться на курс!`;

// messages — полная история для API (включая system prompt)
let messages = [{ role: "system", content: SYSTEM_PROMPT }];
// displayMessages — то, что показываем пользователю (без system)
let displayMessages = [];

const quickButtons = [
  { label: "📅 Расписание", message: "Какое расписание курсов?" },
  { label: "💰 Цены", message: "Сколько стоят курсы?" },
  { label: "📍 Адрес", message: "Где находится школа?" },
  { label: "✏️ Записаться", message: "Как записаться на курс?" }
];

const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("chat-input");
const sendBtnEl = document.getElementById("send-btn");
const quickButtonsEl = document.getElementById("quick-buttons");
const loadingEl = document.getElementById("loading-indicator");

function init() {
  loadHistory();
  renderQuickButtons();
  renderAllMessages();
  formEl.addEventListener("submit", handleSubmit);
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length) {
        displayMessages = saved;
        messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...saved.map(m => ({ role: m.role, content: m.content }))
        ];
        return;
      }
    }
  } catch (e) {
    console.warn("Не удалось загрузить историю чата:", e);
  }
  // Если истории нет — приветственное сообщение
  displayMessages = [{ role: "assistant", content: WELCOME_TEXT }];
}

function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(displayMessages));
  } catch (e) {
    console.warn("Не удалось сохранить историю чата:", e);
  }
}

function renderQuickButtons() {
  quickButtonsEl.innerHTML = "";
  quickButtons.forEach(btn => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "quick-btn";
    el.textContent = btn.label;
    el.addEventListener("click", () => sendMessage(btn.message));
    quickButtonsEl.appendChild(el);
  });
}

function renderAllMessages() {
  messagesEl.innerHTML = "";
  displayMessages.forEach(m => renderMessage(m.role, m.content, m.isError));
  scrollToBottom();
}

function renderMessage(role, text, isError = false) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role === "user" ? "bubble-user" : "bubble-bot"}${isError ? " bubble-error" : ""}`;
  bubble.textContent = text;
  messagesEl.appendChild(bubble);
  scrollToBottom();
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showLoading() {
  loadingEl.classList.add("visible");
  sendBtnEl.disabled = true;
  inputEl.disabled = true;
  scrollToBottom();
}

function hideLoading() {
  loadingEl.classList.remove("visible");
  sendBtnEl.disabled = false;
  inputEl.disabled = false;
}

function handleSubmit(e) {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";
  sendMessage(text);
}

async function sendMessage(userText) {
  // Добавить сообщение пользователя
  messages.push({ role: "user", content: userText });
  displayMessages.push({ role: "user", content: userText });
  renderMessage("user", userText);
  saveHistory();

  showLoading();

  try {
    const answer = await askAI(messages);

    messages.push({ role: "assistant", content: answer });
    displayMessages.push({ role: "assistant", content: answer });
    renderMessage("assistant", answer);
    saveHistory();
  } catch (err) {
    console.error(err);
    const fallback = `Ошибка соединения 😔 Попробуйте позже или свяжитесь с менеджером: ${SCHOOL_DATA.phone}`;
    displayMessages.push({ role: "assistant", content: fallback, isError: true });
    renderMessage("assistant", fallback, true);
    saveHistory();
  } finally {
    hideLoading();
  }
}

document.addEventListener("DOMContentLoaded", init);
