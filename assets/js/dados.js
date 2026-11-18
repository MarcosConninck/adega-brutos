// ============================================================
//  BRUTOS ADEGA | DADOS.JS
//  Conteúdo editável do site. Para mudar telefone, horários,
//  textos do evento ou produtos, mexa só aqui.
//  Fonte dos dados iniciais: perfil no Google Maps (nov/2026).
// ============================================================

window.BRUTOS = {
  nome: "Brutos Adega e Mercearia",

  // ── CONTATOS ────────────────────────────────────────────────
  // Deixar vazio ("") esconde os botões daquele contato no site.

  // WhatsApp: só dígitos, 55 + DDD + número (ex.: "5515999999999")
  whatsapp: "",

  // Telefone para o botão "Ligar" (do Google Maps)
  telefone: "5515996139826",
  telefoneExibicao: "(15) 99613-9826",

  instagram: "https://www.instagram.com/brutus.sp/",
  instagramUsuario: "@brutus.sp",

  endereco: "Av. Ipanema, 5060 — Novo Horizonte, Sorocaba - SP, 18070-671",
  referencia: "Conveniência no posto de combustível",
  mapsLink: "https://maps.app.goo.gl/KFTCanXJ2bYiHByY7",
  mapsEmbed:
    "https://www.google.com/maps?q=Brutos+Adega+e+Mercearia,+Av.+Ipanema,+5060,+Sorocaba+-+SP&output=embed",

  // Horários por dia da semana (0 = domingo … 6 = sábado), formato "HH:MM".
  // "24:00" = meia-noite. null = fechado.
  horarios: {
    0: ["07:00", "20:00"],
    1: ["06:00", "24:00"],
    2: ["06:00", "24:00"],
    3: ["06:00", "24:00"],
    4: ["06:00", "24:00"],
    5: ["06:00", "24:00"],
    6: ["06:00", "24:00"],
  },

  pagamentos: ["Cartão de crédito", "Cartão de débito", "Aproximação (NFC)"],

  // ── EVENTO ──────────────────────────────────────────────────
  evento: {
    titulo: "Noite na Brutos",
    descricao:
      "Música, amigos e cerveja trincando. Dá o play e confira como foi — e fica de olho que tem mais vindo por aí.",
    video: "assets/video/evento.mp4",
    capa: "assets/img/evento-capa.jpg",
  },

  // ── AVALIAÇÕES DO GOOGLE ────────────────────────────────────
  google: {
    nota: "4,5",
    total: 12,
    destaques: [
      // Trechos copiados como estão no Google Maps
      { texto: "Ambiente familiar ótimo atendimento e bebidas super gelada. Super recomendo.", autor: "Edson D." },
      { texto: "Ótimo atendimento, preço bom e uma boa variedade de produtos, a cerveja mais gelada de Sorocaba", autor: "Bruno D." },
      { texto: "O melhor preço e melhor atendimento.", autor: "Cliente no Google" },
    ],
  },
};
