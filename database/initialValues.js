const initialDatabase = {
  users: [],
  actions: [],
  schedules: [
    {
      id: 1,
      timeOfDay: "Morning",
    },
    {
      id: 2,
      timeOfDay: "Afternoon",
    },
    {
      id: 3,
      timeOfDay: "Night",
    },
  ],
  gratitudes: [],
  intentions: [],
  dreams: [],
  messages: [
    {
      id: 1,
      message:
        "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    },
    {
      id: 2,
      message:
        "O fracasso é apenas a oportunidade de começar de novo, desta vez de forma mais inteligente.",
    },
    {
      id: 3,
      message: "Não tenha medo de desistir do bom para perseguir o ótimo.",
    },
    {
      id: 4,
      message:
        "Você é mais corajoso(@) do que acredita, mais forte do que parece e mais inteligente do que pensa.",
    },
    {
      id: 5,
      message:
        "A vida é 10% do que acontece comigo e 90% de como eu reajo a isso.",
    },
    {
      id: 6,
      message: "Nunca é tarde demais para ser quem você poderia ter sido.",
    },
    {
      id: 7,
      message: "Seja a mudança que você deseja ver no mundo.",
    },
    {
      id: 8,
      message: "Não espere por oportunidades, crie-as.",
    },
    {
      id: 9,
      message: "Lute pelos seus objetivos, mesmo quando parecer difícil.",
    },
    {
      id: 10,
      message:
        "O sucesso não é garantido, mas o fracasso é certo se você não tentar.",
    },
  ],
  dayToDays: [],
  distractions: [],
};

export default initialDatabase;
