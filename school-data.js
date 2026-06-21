// Данные школы Codify — собраны командой
const SCHOOL_DATA = {
  name: "Codify",
  pricing: "50 000 сом за 4 месяца обучения",
  phone: "+996500431430",
  website: "codify.lab",
  instagram: "codify.kids",
  founder: "Динара Руслан",
  graduates: "Более 10 000 выпускников",
  methodology: "Harvard & MIT",
  branches: [
    "Бишкек, 7 микрорайон 26/2",
    "Бишкек, Ибраимова 115",
    "Джал, Тыналиева 2/7"
  ],
  schedule: [
    { time: "09:30 - 11:30", course: "Scratch" },
    { time: "12:00 - 14:00", course: "Roblox" },
    { time: "14:30 - 16:30", course: "HTML/CSS" },
    { time: "17:00 - 19:00", course: "Python/JS" }
  ],
  teachers: [
    { name: "Максат Каныбеков", subject: "HTML/CSS" },
    { name: "Азамат", subject: "Python" },
    { name: "Азамат", subject: "Startup Studio" }
  ],
  features: [
    "Онлайн обучение",
    "Запись уроков",
    "Рассрочка",
    "Бесплатная ИИ диагностика",
    "BootCamp",
    "Хакатоны"
  ]
};

// Поддержка использования и в браузере (через <script>), и как ES-модуль/Node
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCHOOL_DATA };
}
