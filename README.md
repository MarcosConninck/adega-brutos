# 🍺 Brutos Adega e Mercearia — Site

Landing page da **Brutos Adega e Mercearia** (Av. Ipanema, 5060 — Novo Horizonte, Sorocaba/SP): fotos da loja, vídeo de evento, avaliações do Google, horários com selo "Aberto agora", mapa e botões de WhatsApp.

🔗 **Endereço:** https://marcosconninck.github.io/adega-brutos/

> Projeto **separado** do site da V. R. Forge (`marcosconninck.github.io`). Cada um tem o seu repositório.

---

## 🧱 Como é feito

- HTML, CSS e JavaScript puros — sem frameworks e sem etapa de build.
- **Por enquanto, só a versão de celular.** No computador a página aparece numa coluna central, do tamanho de um celular.
- Hospedado no **GitHub Pages** como *site de projeto*: repositório `adega-brutos` → `marcosconninck.github.io/adega-brutos`.
- Todo o conteúdo editável fica em [`assets/js/dados.js`](assets/js/dados.js).

## 📂 Estrutura

```
adega-brutos/
├── index.html
├── README.md
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── dados.js      # ⭐ telefone, horários, evento, avaliações
│   │   └── main.js       # comportamento (links, "aberto agora", vídeo…)
│   ├── img/              # fotos da loja, capa do vídeo, imagem de compartilhamento
│   │   └── icons/        # favicon e ícone do celular
│   └── video/evento.mp4  # vídeo do evento (5,8 MB)
```

## 🎬 Sobre o vídeo do evento

O vídeo fica no próprio site, que é a forma mais simples e sem anúncios:

- **`preload="none"`** — o celular só baixa o vídeo quando a pessoa toca no play (não gasta os dados de quem só está olhando o site).
- **Capa (`poster`)** — mostra um quadro do vídeo com um botão de play grande.
- **`playsinline`** — no iPhone o vídeo toca dentro da página, sem abrir em tela cheia.
- Ele pausa sozinho se a pessoa rolar a página para longe.

Para trocar o vídeo: substitua `assets/video/evento.mp4` (de preferência um vídeo **vertical**, com **até ~10 MB** — vídeos enviados pelo WhatsApp já vêm nesse tamanho) e a capa `assets/img/evento-capa.jpg`. Ajuste o título e o texto em `dados.js`.

> Se um dia houver muitos vídeos, o melhor é publicar no Instagram/YouTube e só colocar o link aqui — o GitHub não é feito para guardar muitos vídeos.

## ✏️ Editando

| Quero mudar… | Onde |
| --- | --- |
| WhatsApp, telefone, Instagram | `dados.js` → `whatsapp`, `telefone` / `telefoneExibicao`, `instagram` / `instagramUsuario` — campo vazio (`""`) esconde os botões daquele contato |
| Horários | `dados.js` → `horarios` (0 = domingo … 6 = sábado; `"24:00"` = meia-noite) |
| Título e texto do evento | `dados.js` → `evento` |
| Nota e avaliações do Google | `dados.js` → `google` (copie os trechos como estão no Google) |
| Textos dos produtos e fotos | `index.html`, seção `#produtos` |

## 👀 Ver no computador antes de publicar

```bash
python -m http.server 8000
```

e acesse http://localhost:8000 (no Chrome, use o modo celular do DevTools: F12 → ícone de celular).

## 🚀 Publicar (primeira vez)

1. No **GitHub Desktop**: *File → Add local repository…* → escolha a pasta `adega-brutos`.
2. Clique em **Publish repository**, mantenha o nome `adega-brutos` e **desmarque** "Keep this code private".
3. No GitHub, abra o repositório → **Settings → Pages** → *Source: Deploy from a branch* → *Branch: `main` / `(root)`* → **Save**.
4. Em 1–2 minutos o site abre em https://marcosconninck.github.io/adega-brutos/

Depois disso, cada **Commit + Push** pelo GitHub Desktop atualiza o site.

## 📌 Pendências

- [ ] Número do WhatsApp — está em branco em `dados.js`, então todos os botões de WhatsApp (topo, evento, contato, rodapé e o flutuante) ficam escondidos até ser preenchido.
- [ ] Nome/data do evento do vídeo, para um título mais específico.
- [ ] Confirmar que as fotos do Google Maps usadas no site são da própria loja (ou trocar por fotos do dono).
- [ ] Versão para computador.

---

Fonte das informações iniciais: perfil da loja no Google Maps (novembro de 2026).
