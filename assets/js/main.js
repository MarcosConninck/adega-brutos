// ============================================================
//  BRUTOS ADEGA | MAIN.JS
//  O conteúdo vem de dados.js. Aqui ficam só os comportamentos:
//  1. Links (WhatsApp, Maps, telefone, Instagram) e textos
//  2. Horários + selo "Aberto agora / Fechado"
//  3. Avaliações
//  4. Header, botão flutuante, vídeo e animações
// ============================================================

(function () {
  "use strict";

  const D = window.BRUTOS;
  if (!D) return;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ─── 1. LINKS E TEXTOS ─────────────────────────────────────
  const zap = (msg) => "https://wa.me/" + D.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");

  $$("[data-whatsapp]").forEach((a) => (a.href = zap(a.dataset.whatsapp)));
  $$("[data-maps]").forEach((a) => (a.href = D.mapsLink));

  const call = $("#callBtn");
  call.href = "tel:+" + D.whatsapp;
  call.textContent = "Ligar " + D.telefoneExibicao;

  const insta = $("#instaLink");
  if (D.instagram) {
    insta.href = D.instagram;
    insta.hidden = false;
  }

  $("#addressText").textContent = D.endereco;
  $("#addressRef").textContent = D.referencia || "";
  $("#mapFrame").src = D.mapsEmbed;
  $("#paymentList").textContent = D.pagamentos.join(" · ");
  $("#ano").textContent = new Date().getFullYear();

  $("#eventTitle").textContent = D.evento.titulo;
  $("#eventDesc").textContent = D.evento.descricao;

  // ─── 2. HORÁRIOS E "ABERTO AGORA" ──────────────────────────
  const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const fmt = (h) => (h === "24:00" ? "00:00" : h);
  const minutos = (h) => {
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
  };

  // Agrupa dias seguidos com o mesmo horário (ex.: "Segunda a sábado")
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const grupos = [];
  ordem.forEach((d) => {
    const h = D.horarios[d];
    const chave = h ? h.join("-") : "fechado";
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.chave === chave) ultimo.dias.push(d);
    else grupos.push({ chave, dias: [d], h });
  });

  // Dia e hora atuais no fuso de Sorocaba (independe do celular de quem acessa)
  const agora = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const parte = (t) => agora.find((p) => p.type === t).value;
  const hoje = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parte("weekday"));
  const minAgora = Number(parte("hour")) * 60 + Number(parte("minute"));

  const tbody = $("#hoursTable tbody");
  tbody.innerHTML = "";
  grupos.forEach((g) => {
    const nome =
      g.dias.length === 1
        ? DIAS[g.dias[0]]
        : DIAS[g.dias[0]] + " a " + DIAS[g.dias[g.dias.length - 1]].toLowerCase();
    const tr = document.createElement("tr");
    if (g.dias.includes(hoje)) tr.className = "is-today";
    const th = document.createElement("th");
    th.textContent = nome;
    const td = document.createElement("td");
    td.textContent = g.h ? fmt(g.h[0]) + " – " + fmt(g.h[1]) : "Fechado";
    tr.append(th, td);
    tbody.appendChild(tr);
  });

  const hHoje = D.horarios[hoje];
  const aberto = hHoje && minAgora >= minutos(hHoje[0]) && minAgora < minutos(hHoje[1]);
  const pill = $("#statusPill");
  pill.classList.add(aberto ? "is-open" : "is-closed");
  pill.textContent = aberto
    ? "Aberto · fecha " + fmt(hHoje[1])
    : hHoje && minAgora < minutos(hHoje[0])
      ? "Fechado · abre " + hHoje[0]
      : "Fechado agora";
  pill.hidden = false;

  // ─── 3. AVALIAÇÕES ─────────────────────────────────────────
  $("#ratingBig").textContent = D.google.nota;
  $("#heroRating").textContent = D.google.nota + " ★";
  $("#ratingCount").textContent = D.google.total;
  const reviews = $("#reviews");
  D.google.destaques.forEach((r) => {
    const card = document.createElement("blockquote");
    card.className = "review reveal";
    const p = document.createElement("p");
    p.textContent = "“" + r.texto + "”";
    const f = document.createElement("footer");
    f.textContent = r.autor + " · avaliação no Google";
    card.append(p, f);
    reviews.appendChild(card);
  });

  // ─── 4. HEADER, BOTÃO FLUTUANTE, VÍDEO E ANIMAÇÕES ─────────
  const header = $("#siteHeader");
  const fab = $(".fab");
  const hero = $("#inicio");
  const video = $("#eventVideo");
  let heroVisivel = true;
  let videoTocando = false;
  const atualizarFab = () => fab.classList.toggle("is-hidden", heroVisivel || videoTocando);

  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 30), {
    passive: true,
  });

  // O hero já tem o botão do WhatsApp: o flutuante só aparece depois dele
  new IntersectionObserver(
    ([e]) => {
      heroVisivel = e.isIntersecting;
      atualizarFab();
    },
    { threshold: 0.35 },
  ).observe(hero);

  // Botão de play grande: começa o vídeo e sai da frente
  const videoBox = video.closest(".event-video");
  $("#videoPlay").addEventListener("click", () => video.play());

  // Enquanto o vídeo toca, o botão flutuante sai da frente
  video.addEventListener("play", () => {
    videoTocando = true;
    videoBox.classList.add("is-playing");
    atualizarFab();
  });
  ["pause", "ended"].forEach((ev) =>
    video.addEventListener(ev, () => {
      videoTocando = false;
      atualizarFab();
    }),
  );
  // Pausa o vídeo se a pessoa rolar para longe dele
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting && !video.paused) video.pause();
  }).observe(video);

  // Animação de entrada
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => {
    if (reduzMovimento || el.closest(".hero")) {
      requestAnimationFrame(() => el.classList.add("is-visible"));
    } else {
      obs.observe(el);
    }
  });
})();
