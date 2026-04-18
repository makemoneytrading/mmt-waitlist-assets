/* MMT Waitlist Gate — Wix injection bundle */
(function() {
  var p = window.location.pathname;
  if (p !== "/" && p !== "/home" && p !== "") return;
  if (document.getElementById("mmt-waitlist-gate")) return;

  window.MMT_CONFIG = window.MMT_CONFIG || {};
  window.MMT_CONFIG.WAITLIST_ENDPOINT = "https://dashboard.makemoneytrading.com.au/api/waitlist";

  /* ---- ANTI-FLASH: hide the Wix site content immediately ----
     Injected synchronously as the first thing so no Wix frame ever paints. */
  (function hideWixUntilOverlay() {
    var earlyStyle = document.createElement("style");
    earlyStyle.id = "mmt-anti-flash";
    earlyStyle.textContent = "html.mmt-gate-prep { background: #000 !important; }" +
      "html.mmt-gate-prep body { background: #000 !important; visibility: hidden !important; }" +
      "html.mmt-gate-prep #mmt-waitlist-gate { visibility: visible !important; }";
    (document.head || document.documentElement).appendChild(earlyStyle);
    document.documentElement.classList.add("mmt-gate-prep");
  })();

  function addLink(rel, href, crossOrigin) {
    var l = document.createElement("link");
    l.rel = rel; l.href = href;
    if (crossOrigin) l.crossOrigin = "";
    (document.head || document.documentElement).appendChild(l);
  }
  addLink("preconnect", "https://fonts.googleapis.com");
  addLink("preconnect", "https://fonts.gstatic.com", true);
  addLink("preconnect", "https://api.fontshare.com", true);
  addLink("stylesheet", "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap");
  addLink("stylesheet", "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap");

  var style = document.createElement("style");
  style.id = "mmt-waitlist-gate-styles";
  style.textContent = "\nhtml.mmt-gate-on #SITE_HEADER, html.mmt-gate-on #SITE_FOOTER,\nhtml.mmt-gate-on header[data-mesh-id], html.mmt-gate-on footer[data-mesh-id],\nhtml.mmt-gate-on [data-testid=\"SITE_HEADER\"], html.mmt-gate-on [data-testid=\"SITE_FOOTER\"] { visibility: hidden !important; }\n#mmt-waitlist-gate {\n  position: fixed; inset: 0; z-index: 2147483647;\n  background: #000; color: #f5f5f4;\n  font-family: \"Satoshi\",\"Inter\",-apple-system,BlinkMacSystemFont,system-ui,sans-serif;\n  -webkit-font-smoothing: antialiased;\n}\n#mmt-waitlist-gate a { color: inherit; text-decoration: none; }\n#mmt-waitlist-gate button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\n#mmt-waitlist-gate img, #mmt-waitlist-gate svg { display: block; max-width: 100%; }\n\n/* =========================================================\n   Make Money Trading \u2014 Prototype stylesheet\n   Aesthetic: Apple/Linear minimalism + cinematic gate\n   Accent: warm orange #FF6B1A\n   ========================================================= */\n\n:root {\n  --bg: #0a0a0a;\n  --bg-2: #111111;\n  --surface: #141414;\n  --line: rgba(255,255,255,0.08);\n  --line-strong: rgba(255,255,255,0.16);\n  --ink: #f5f5f4;\n  --ink-dim: #a1a1a1;\n  --ink-muted: #6b6b6b;\n  --accent: #ff6b1a;\n  --accent-soft: #ff8a4a;\n\n  --font-display: \"Anton\", \"Satoshi\", Impact, sans-serif;\n  --font-body: \"Satoshi\", \"Inter\", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;\n\n  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  --transition-interactive: 220ms var(--ease-out);\n\n  --max: 1200px;\n  --pad: clamp(20px, 4vw, 48px);\n}\n\n#mmt-waitlist-gate *, #mmt-waitlist-gate *::before, #mmt-waitlist-gate *::after { box-sizing: border-box; }\n#mmt-waitlist-gate h1, #mmt-waitlist-gate h2, #mmt-waitlist-gate h3, #mmt-waitlist-gate p, #mmt-waitlist-gate ul, #mmt-waitlist-gate ol, #mmt-waitlist-gate form, #mmt-waitlist-gate figure { margin: 0; padding: 0; }\n/* scoped */\n/* scoped */\n\nhtml.mmt-gate-on, html.mmt-gate-on body { overflow: hidden !important; height: 100vh !important; }\n\na { color: inherit; text-decoration: none; }\nbutton { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\nimg, svg { display: block; max-width: 100%; }\n\n::selection { background: var(--accent); color: #0a0a0a; }\n\n.wrap {\n  max-width: var(--max);\n  margin: 0 auto;\n  padding: 0 var(--pad);\n}\n\n.eyebrow {\n  font-size: 12px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  font-weight: 600;\n  margin-bottom: 24px;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.dot-pulse {\n  width: 6px; height: 6px; border-radius: 999px;\n  background: var(--accent);\n  box-shadow: 0 0 0 0 rgba(255,107,26,0.6);\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% { box-shadow: 0 0 0 0 rgba(255,107,26,0.5); }\n  70% { box-shadow: 0 0 0 10px rgba(255,107,26,0); }\n  100% { box-shadow: 0 0 0 0 rgba(255,107,26,0); }\n}\n\n.muted { color: var(--ink-muted); }\n.accent { color: var(--accent); }\n\n.section-title {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(40px, 6.5vw, 88px);\n  line-height: 0.96;\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  margin-bottom: clamp(48px, 7vw, 96px);\n}\n\n\n/* ===================== INTRO GATE ===================== */\n\n#intro {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  overflow: hidden;\n  background: #000;\n  will-change: opacity, transform;\n}\n.intro__bgs { position: absolute; inset: 0; }\n.intro__bg {\n  position: absolute; inset: -4%;\n  background-size: cover;\n  background-position: center;\n  filter: saturate(1.08) contrast(1.04);\n  transform: scale(1.08);\n  opacity: 0;\n  transition: opacity 1.8s ease-in-out;\n  will-change: opacity, transform;\n}\n.intro__bg.is-active {\n  opacity: 1;\n  animation: kenBurns 16s ease-in-out infinite alternate;\n}\n.intro__bg--1 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--2 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--3 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--4 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n@keyframes kenBurns {\n  0%   { transform: scale(1.08) translate(0, 0); }\n  100% { transform: scale(1.18) translate(-1.5%, -1%); }\n}\n\n/* Scene indicator (bottom-right) */\n.intro__scene {\n  position: absolute;\n  bottom: clamp(16px, 3vh, 28px);\n  right: clamp(16px, 3vw, 36px);\n  z-index: 5;\n  display: inline-flex; align-items: center; gap: 12px;\n  opacity: 0;\n  animation: sceneFadeIn 1.2s ease-out 2.5s forwards;\n  font-size: 10px;\n  letter-spacing: 0.3em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.6);\n}\n.intro__scene-dots { display: inline-flex; gap: 6px; }\n.intro__scene-dots .dot {\n  width: 5px; height: 5px; border-radius: 50%;\n  background: rgba(255,255,255,0.25);\n  transition: background 0.5s ease, transform 0.5s ease;\n}\n.intro__scene-dots .dot.is-active {\n  background: var(--accent);\n  transform: scale(1.4);\n  box-shadow: 0 0 12px rgba(255,107,26,0.8);\n}\n.intro__scene-label {\n  font-variant: small-caps;\n  transition: opacity 0.4s ease;\n}\n.intro__scene-label.is-fading { opacity: 0; }\n@keyframes sceneFadeIn {\n  to { opacity: 1; }\n}\n@media (max-width: 640px) {\n  .intro__scene { font-size: 9px; letter-spacing: 0.2em; bottom: 14px; right: 14px; }\n  .intro__scene-label { max-width: 160px; }\n}\n\n.intro__vignette {\n  position: absolute; inset: 0;\n  z-index: 2;\n  background:\n    radial-gradient(130% 90% at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%),\n    linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.7) 100%);\n}\n\n.intro__grain {\n  position: absolute; inset: 0;\n  pointer-events: none;\n  opacity: 0.25;\n  mix-blend-mode: overlay;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\");\n  animation: grainShift 1.2s steps(3) infinite;\n}\n@keyframes grainShift {\n  0%   { transform: translate(0,0); }\n  33%  { transform: translate(-5px,3px); }\n  66%  { transform: translate(4px,-2px); }\n  100% { transform: translate(0,0); }\n}\n\n.intro__content {\n  position: relative; z-index: 3;\n  height: 100%;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  justify-items: center;\n  /* top pad must clear 34px ticker + breathing room */\n  padding: clamp(72px, 10vh, 110px) var(--pad) clamp(24px, 5vh, 48px);\n  text-align: center;\n}\n/* Top cluster (eyebrow + brand) */\n.intro__content-top {\n  grid-row: 1;\n  display: flex; flex-direction: column; align-items: center; gap: 20px;\n  max-width: 100%;\n}\n/* Center cluster (headline) \u2014 truly vertically centered */\n.intro__content > .intro__headline {\n  grid-row: 2;\n  align-self: center;\n  display: flex; flex-direction: column; align-items: center;\n  gap: clamp(18px, 3vh, 28px);\n  width: 100%;\n}\n/* Bottom cluster (CTA + spots) */\n.intro__content > .intro__cta-wrap { grid-row: 3; align-self: end; }\n.intro__brand {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-family: var(--font-display);\n  font-size: 18px;\n  letter-spacing: 0.05em;\n  color: rgba(255,255,255,0.82);\n}\n.intro__brand svg { color: var(--accent); }\n.intro__headline {\n  display: flex; flex-direction: column; align-items: center; gap: 24px;\n}\n.intro__tagline {\n  opacity: 0;\n  font-size: 12px;\n  letter-spacing: 0.4em;\n  text-transform: uppercase;\n  color: #ffffff;\n  font-weight: 600;\n}\n\n.intro__eyebrow {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.35em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.7);\n  padding: 10px 16px;\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 999px;\n  backdrop-filter: blur(10px);\n  background: rgba(255,255,255,0.04);\n}\n\n.intro__word {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(80px, 15vw, 200px);\n  line-height: 0.88;\n  letter-spacing: -0.005em;\n  color: #fff;\n  text-transform: uppercase;\n  margin: 0;\n  filter: drop-shadow(0 10px 40px rgba(0,0,0,0.6));\n  text-align: center;\n  width: 100%;\n}\n.intro__word .line {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  overflow: hidden;\n}\n.intro__word .word-row { display: inline-flex; gap: 0.2em; }\n.intro__word .w {\n  display: inline-block;\n  transform: translateY(110%);\n  will-change: transform;\n}\n.intro__word .accent { color: var(--accent); }\n\n.intro__cta-wrap {\n  display: flex; flex-direction: column; align-items: center; gap: 18px;\n  position: relative;\n}\n.intro__cta {\n  position: relative;\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 14px;\n  padding: 20px 38px;\n  border-radius: 999px;\n  background: var(--accent);\n  color: #0a0a0a;\n  font-weight: 800;\n  font-size: 15px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  box-shadow:\n    0 18px 50px -10px rgba(255,107,26,0.65),\n    0 0 0 1px rgba(255,255,255,0.08) inset,\n    0 0 0 0 rgba(255,107,26,0.5);\n  transition:\n    background var(--transition-interactive),\n    color var(--transition-interactive),\n    box-shadow var(--transition-interactive);\n  overflow: hidden;\n  isolation: isolate;\n}\n.intro__cta-text, .intro__cta-arrow { position: relative; z-index: 2; }\n.intro__cta-glow {\n  position: absolute;\n  inset: -2px;\n  border-radius: 999px;\n  background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.55) 40deg, transparent 80deg, transparent 360deg);\n  opacity: 0;\n  z-index: 1;\n  animation: ctaConic 3.2s linear infinite;\n  pointer-events: none;\n}\n.intro__cta::before {\n  content: \"\";\n  position: absolute;\n  inset: 2px;\n  border-radius: 999px;\n  background: var(--accent);\n  z-index: 1;\n  transition: background var(--transition-interactive);\n}\n.intro__cta:hover::before { background: #fff; }\n.intro__cta:hover {\n  background: #fff;\n  box-shadow:\n    0 30px 70px -10px rgba(255,255,255,0.35),\n    0 0 0 1px rgba(255,255,255,0.15) inset,\n    0 0 80px 0 rgba(255,107,26,0.4);\n}\n.intro__cta.is-visible .intro__cta-glow { opacity: 1; }\n.intro__cta:active { transform: scale(0.97) !important; }\n@keyframes ctaConic {\n  to { transform: rotate(360deg); }\n}\n.intro__cta-arrow {\n  display: inline-flex; align-items: center; justify-content: center;\n  width: 28px; height: 28px;\n  border-radius: 999px;\n  background: rgba(10,10,10,0.12);\n  transition: transform var(--transition-interactive);\n}\n.intro__cta:hover .intro__cta-arrow { transform: translateX(4px); }\n\n/* Ripple */\n.intro__cta-ripple {\n  position: absolute;\n  border-radius: 999px;\n  transform: translate(-50%, -50%) scale(0);\n  background: rgba(255,255,255,0.55);\n  pointer-events: none;\n  z-index: 2;\n  animation: ctaRipple 0.7s ease-out forwards;\n}\n@keyframes ctaRipple {\n  to { transform: translate(-50%, -50%) scale(4); opacity: 0; }\n}\n\n/* Spots remaining */\n.intro__spots {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.75);\n}\n.spots-live {\n  display: inline-flex; align-items: center; gap: 6px;\n  color: var(--accent);\n  font-weight: 700;\n}\n.spots-live__dot {\n  width: 7px; height: 7px; border-radius: 50%;\n  background: var(--accent);\n  box-shadow: 0 0 0 0 rgba(255,107,26,0.9);\n  animation: spotPulse 1.4s ease-out infinite;\n}\n@keyframes spotPulse {\n  0%   { box-shadow: 0 0 0 0 rgba(255,107,26,0.9); }\n  70%  { box-shadow: 0 0 0 10px rgba(255,107,26,0); }\n  100% { box-shadow: 0 0 0 0 rgba(255,107,26,0); }\n}\n.spots-count strong {\n  color: #fff;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n\n/* Ticker tape */\n.intro__ticker {\n  position: absolute;\n  top: 0; left: 0; right: 0;\n  z-index: 4;\n  height: 34px;\n  overflow: hidden;\n  background: rgba(10,10,10,0.75);\n  border-bottom: 1px solid rgba(255,255,255,0.08);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  opacity: 0;\n  transform: translateY(-100%);\n}\n.intro__ticker-track {\n  /* Fade edges so scrolling text dissolves in/out instead of clipping */\n  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);\n          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);\n}\n.intro__ticker-track {\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n  gap: 48px;\n  white-space: nowrap;\n  animation: tickerScroll 55s linear infinite;\n  padding-left: 48px;\n}\n@keyframes tickerScroll {\n  0%   { transform: translateX(0); }\n  100% { transform: translateX(-50%); }\n}\n.intro__ticker .tk {\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  color: rgba(255,255,255,0.78);\n  font-weight: 500;\n}\n.intro__ticker .tk em {\n  font-style: normal;\n  color: var(--accent);\n  font-weight: 700;\n  letter-spacing: 0.1em;\n}\n.intro__ticker .tk em.up   { color: #22c55e; }\n.intro__ticker .tk em.down { color: #ef4444; }\n.intro__ticker .tk strong { color: #fff; font-weight: 700; margin-right: 6px; font-variant-numeric: tabular-nums; }\n.intro__ticker .tk-dot.up   { background: #22c55e; box-shadow: 0 0 10px rgba(34,197,94,0.7); }\n.intro__ticker .tk-dot.down { background: #ef4444; box-shadow: 0 0 10px rgba(239,68,68,0.7); }\n.intro__ticker .tk-dot {\n  width: 5px; height: 5px; border-radius: 50%;\n  background: var(--accent);\n  display: inline-block;\n  box-shadow: 0 0 10px rgba(255,107,26,0.7);\n}\n\n/* Horizontal scan-line overlay for cinematic feel */\n.intro__scanline {\n  position: absolute;\n  inset: 0;\n  z-index: 2;\n  pointer-events: none;\n  background: repeating-linear-gradient(\n    to bottom,\n    transparent 0px,\n    transparent 3px,\n    rgba(255,255,255,0.015) 3px,\n    rgba(255,255,255,0.015) 4px\n  );\n  mix-blend-mode: overlay;\n  opacity: 0.5;\n}\n\n/* Per-letter split for headline reveal */\n.intro__word .word-row { display: inline-flex; gap: 0.22em; flex-wrap: wrap; justify-content: center; }\n.intro__word .word-row .word {\n  display: inline-flex;\n  overflow: hidden;\n}\n.intro__word .word-row .char {\n  display: inline-block;\n  transform: translateY(110%) rotate(6deg);\n  will-change: transform, opacity;\n  opacity: 0;\n}\n.intro__word .accent-row .char {\n  color: var(--accent);\n  text-shadow: 0 0 60px rgba(255,107,26,0.55);\n}\n/* Optical centering fix: the trailing period on \"Waitlist.\" visually shifts the\n   word off-center under \"Join the\". Take the period out of the centering flow\n   entirely by absolutely positioning it at the right edge of its parent word,\n   so the centered word-row is measured without it. */\n.intro__word .accent-row .word:last-child {\n  position: relative;\n}\n.intro__word .accent-row .word:last-child .char:last-child {\n  position: absolute;\n  left: 100%;\n  top: 0;\n}\n.intro__word .accent-row.is-flashing .char {\n  animation: accentFlash 0.9s ease-out;\n}\n@keyframes accentFlash {\n  0%   { filter: brightness(1); text-shadow: 0 0 0 rgba(255,107,26,0); }\n  40%  { filter: brightness(1.8); text-shadow: 0 0 80px rgba(255,107,26,0.9), 0 0 20px #fff; }\n  100% { filter: brightness(1); text-shadow: 0 0 60px rgba(255,107,26,0.55); }\n}\n\n/* Eyebrow counter */\n.intro__eyebrow-text {\n  font-variant-numeric: tabular-nums;\n}\n.intro__eyebrow-text #eyebrowCounter {\n  color: var(--accent);\n  font-weight: 800;\n  margin-right: 2px;\n}\n\n@media (max-width: 640px) {\n  .intro__ticker { height: 30px; }\n  .intro__ticker .tk { font-size: 10px; letter-spacing: 0.18em; }\n  .intro__content { padding-top: 88px; }\n  /* Eyebrow: smaller + tighter on mobile so it fits one line */\n  .intro__eyebrow {\n    font-size: 9px;\n    letter-spacing: 0.22em;\n    padding: 8px 12px;\n    max-width: calc(100vw - 32px);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .intro__brand { font-size: 15px; }\n  /* Tagline: keep it on ONE line on mobile */\n  .intro__tagline {\n    font-size: 10px;\n    letter-spacing: 0.28em;\n    white-space: nowrap;\n  }\n  /* Headline: a touch smaller to leave room for tagline */\n  .intro__word {\n    font-size: clamp(64px, 16vw, 120px);\n  }\n\n  /* Mobile waitlist modal overrides are defined AFTER the desktop modal\n     section below so they win the cascade. See end of file. */\n}\n\n.intro__foot {\n  opacity: 0;\n  display: flex; align-items: center; gap: 18px;\n  font-size: 10px;\n  letter-spacing: 0.4em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.45);\n}\n.intro__foot-divider {\n  width: 36px; height: 1px;\n  background: rgba(255,255,255,0.25);\n}\n\n/* intro exit state */\n#intro.is-leaving { pointer-events: none; }\n#intro.is-gone { display: none; }\n\n\n/* ============ WAITLIST MODAL ============ */\n.wl-modal {\n  position: absolute;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition: opacity 400ms var(--ease-out), visibility 0s linear 400ms;\n}\n.wl-modal.is-open {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transition: opacity 400ms var(--ease-out);\n}\n.wl-modal__backdrop {\n  position: absolute; inset: 0;\n  background: rgba(0,0,0,0.65);\n  backdrop-filter: blur(16px);\n}\n.wl-modal__panel {\n  position: relative;\n  width: min(520px, 92vw);\n  max-height: 92vh;\n  overflow-y: auto;\n  background: #0d0d0d;\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 20px;\n  padding: clamp(28px, 4vw, 44px);\n  text-align: left;\n  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,107,26,0.15);\n  transform: translateY(24px) scale(0.98);\n  opacity: 0;\n  transition: transform 500ms var(--ease-out), opacity 400ms var(--ease-out);\n}\n.wl-modal.is-open .wl-modal__panel {\n  transform: translateY(0) scale(1);\n  opacity: 1;\n}\n.wl-modal__close {\n  position: absolute;\n  top: 16px; right: 16px;\n  width: 40px; height: 40px;\n  display: inline-flex; align-items: center; justify-content: center;\n  border-radius: 999px;\n  color: var(--ink-dim);\n  transition: background var(--transition-interactive), color var(--transition-interactive);\n}\n.wl-modal__close:hover {\n  background: rgba(255,255,255,0.06);\n  color: var(--ink);\n}\n\n.wl-modal__header { margin-bottom: 28px; }\n.wl-modal__eyebrow-full { display: inline; }\n.wl-modal__eyebrow-short { display: none; }\n@media (max-width: 640px) {\n  .wl-modal__eyebrow-full { display: none; }\n  .wl-modal__eyebrow-short { display: inline; }\n}\n.wl-modal__eyebrow {\n  display: inline-flex; align-items: center;\n  padding: 6px 12px;\n  border: 1px solid var(--line-strong);\n  border-radius: 999px;\n  font-size: 10px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  margin-bottom: 18px;\n}\n.wl-modal__title {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(36px, 5vw, 52px);\n  line-height: 0.95;\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  color: var(--ink);\n  margin-bottom: 12px;\n}\n.wl-modal__sub {\n  font-size: 14px;\n  line-height: 1.55;\n  color: var(--ink-dim);\n}\n\n.wl-form { display: flex; flex-direction: column; gap: 16px; }\n.wl-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  position: relative;\n}\n.wl-field__label {\n  font-size: 11px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  font-weight: 600;\n}\n.wl-field__optional {\n  color: var(--ink-muted);\n  letter-spacing: 0.05em;\n  text-transform: none;\n  font-weight: 400;\n  font-size: 10px;\n}\n.wl-field input {\n  width: 100%;\n  padding: 14px 16px;\n  background: #161616;\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  color: var(--ink);\n  font-family: inherit;\n  font-size: 15px;\n  transition: border-color var(--transition-interactive), background var(--transition-interactive);\n}\n.wl-field input::placeholder { color: var(--ink-muted); }\n.wl-field input:hover { border-color: var(--line-strong); }\n.wl-field input:focus {\n  outline: none;\n  border-color: var(--accent);\n  background: #1a1a1a;\n  box-shadow: 0 0 0 4px rgba(255,107,26,0.12);\n}\n.wl-field.is-invalid input {\n  border-color: #ff4d4d;\n  background: rgba(255,77,77,0.06);\n}\n.wl-field__error {\n  font-size: 11px;\n  color: #ff8080;\n  letter-spacing: 0.04em;\n  margin-top: 2px;\n  min-height: 14px;\n}\n\n.wl-submit {\n  position: relative;\n  display: flex; align-items: center; justify-content: center; gap: 10px;\n  width: 100%;\n  padding: 16px 22px;\n  margin-top: 8px;\n  background: var(--accent);\n  color: #0a0a0a;\n  font-weight: 700;\n  font-size: 15px;\n  letter-spacing: 0.02em;\n  border-radius: 999px;\n  cursor: pointer;\n  box-shadow: 0 14px 40px -10px rgba(255,107,26,0.55);\n  transition: background var(--transition-interactive), transform var(--transition-interactive), box-shadow var(--transition-interactive);\n}\n.wl-submit:hover:not(:disabled) {\n  background: #fff;\n  transform: translateY(-2px);\n}\n.wl-submit:disabled { cursor: not-allowed; }\n.wl-submit.is-loading .wl-submit__label { opacity: 0.4; }\n.wl-submit__spinner {\n  width: 16px; height: 16px;\n  border-radius: 999px;\n  border: 2px solid rgba(10,10,10,0.25);\n  border-top-color: #0a0a0a;\n  opacity: 0;\n  transition: opacity 200ms;\n}\n.wl-submit.is-loading .wl-submit__spinner {\n  opacity: 1;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.wl-form__fine {\n  margin-top: 12px;\n  font-size: 11px;\n  line-height: 1.5;\n  color: var(--ink-muted);\n  text-align: center;\n}\n\n.wl-success {\n  display: none;\n  text-align: center;\n  padding: 20px 0;\n}\n.wl-success.is-active { display: block; animation: fadeInUp 600ms var(--ease-out); }\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(12px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.wl-success__mark {\n  color: var(--accent);\n  margin: 0 auto 24px;\n  width: 52px;\n}\n.wl-success__mark circle { stroke-dasharray: 150.8; stroke-dashoffset: 150.8; animation: drawCircle 0.8s var(--ease-out) forwards; }\n.wl-success__mark path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawTick 0.5s var(--ease-out) 0.6s forwards; }\n@keyframes drawCircle { to { stroke-dashoffset: 0; } }\n@keyframes drawTick { to { stroke-dashoffset: 0; } }\n\n.wl-success h3 {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(32px, 4.5vw, 44px);\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n  color: var(--ink);\n}\n.wl-success p {\n  color: var(--ink-dim);\n  font-size: 14px;\n  line-height: 1.55;\n  margin-bottom: 28px;\n}\n#continueBtn { margin: 0 auto; }\n\n.wl-form.is-hidden { display: none; }\n\n\n\n/* ===================== REDUCED MOTION ===================== */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n  .intro__bg { animation: none; }\n  .intro__word .letter { transform: none; }\n}\n\n/* Waitlist-only: body background (no site below) */\n/* scoped */\n\n\n/* ============ MOBILE WAITLIST MODAL OVERRIDES ============\n   Placed at the end of the file to beat the desktop modal rules in the cascade.\n   Uses compound selectors (.wl-modal .wl-modal__panel) to lift specificity. */\n@media (max-width: 640px) {\n  .wl-modal .wl-modal__panel {\n    width: 100vw;\n    max-width: 100vw;\n    height: 100vh;\n    height: 100dvh;\n    max-height: 100vh;\n    max-height: 100dvh;\n    border-radius: 0;\n    padding: 14px 16px 14px;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    border: 0;\n  }\n  .wl-modal .wl-modal__close {\n    top: 8px;\n    right: 8px;\n    width: 32px;\n    height: 32px;\n  }\n  .wl-modal .wl-modal__header {\n    margin-bottom: 10px;\n    padding-right: 40px;\n  }\n  .wl-modal .wl-modal__eyebrow {\n    display: inline-flex;\n    flex-wrap: nowrap;\n    white-space: nowrap;\n    font-size: 9px;\n    letter-spacing: 0.16em;\n    padding: 4px 9px;\n    margin-bottom: 8px;\n    max-width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .wl-modal .wl-modal__title {\n    font-size: clamp(28px, 7.8vw, 36px);\n    line-height: 0.95;\n    margin-bottom: 4px;\n  }\n  .wl-modal .wl-modal__sub {\n    font-size: 12px;\n    line-height: 1.35;\n  }\n  .wl-modal .wl-form { gap: 8px; flex: 0 0 auto; }\n  .wl-modal .wl-field { gap: 2px; }\n  .wl-modal .wl-field__label { font-size: 9.5px; letter-spacing: 0.14em; }\n  .wl-modal .wl-field__optional { font-size: 9px; }\n  .wl-modal .wl-field input[type=\"text\"],\n  .wl-modal .wl-field input[type=\"email\"],\n  .wl-modal .wl-field input[type=\"tel\"] {\n    padding: 9px 12px;\n    font-size: 14px;\n    min-height: 38px;\n  }\n  .wl-modal .wl-submit {\n    padding: 11px 16px;\n    margin-top: 2px;\n    min-height: 42px;\n    font-size: 14px;\n  }\n  .wl-modal .wl-form__fine {\n    font-size: 9.5px;\n    line-height: 1.35;\n    margin-top: 4px;\n  }\n}\n\n/* Short iPhone screens (SE, mini, etc.) \u2014 go even tighter */\n@media (max-width: 640px) and (max-height: 740px) {\n  .wl-modal .wl-modal__panel { padding: 10px 14px 10px; }\n  .wl-modal .wl-modal__header { margin-bottom: 6px; }\n  .wl-modal .wl-modal__eyebrow { margin-bottom: 6px; padding: 3px 8px; font-size: 8.5px; }\n  .wl-modal .wl-modal__title { font-size: 26px; margin-bottom: 2px; }\n  .wl-modal .wl-modal__sub { font-size: 11px; line-height: 1.3; }\n  .wl-modal .wl-form { gap: 6px; }\n  .wl-modal .wl-field { gap: 1px; }\n  .wl-modal .wl-field__label { font-size: 9px; }\n  .wl-modal .wl-field input[type=\"text\"],\n  .wl-modal .wl-field input[type=\"email\"],\n  .wl-modal .wl-field input[type=\"tel\"] { padding: 7px 11px; font-size: 13.5px; min-height: 34px; }\n  .wl-modal .wl-submit { padding: 9px 14px; min-height: 38px; font-size: 13.5px; }\n  .wl-modal .wl-form__fine { font-size: 9px; margin-top: 2px; }\n}\n";
  (document.head || document.documentElement).appendChild(style);

  var overlayReady = false;
  var gsapReady = false;
  var booted = false;

  function maybeBoot() {
    if (!overlayReady || !gsapReady || booted) return;
    booted = true;
    try {
      /* =========================================================
   Make Money — Waitlist
   Standalone waitlist page (no site below the intro)
   ========================================================= */

// Endpoint where form submissions are sent. Posts to the MMT sales dashboard,
// where Baylee + the sales team see new leads on the Waitlist page.
// Override with window.MMT_CONFIG.WAITLIST_ENDPOINT for staging/testing.
const WAITLIST_ENDPOINT =
  (window.MMT_CONFIG && window.MMT_CONFIG.WAITLIST_ENDPOINT) ||
  "https://dashboard.makemoneytrading.com.au/api/waitlist";

document.documentElement.classList.add("mmt-gate-on");

/* ---------- DYNAMIC MONTH LABEL ----------
   Always shows NEXT month, auto-rolls on the 1st (Sydney time). */
function updateMonthLabels() {
  const MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  const sydneyNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" }));
  const nextMonthIdx = (sydneyNow.getMonth() + 1) % 12;
  const nextMonth = MONTHS[nextMonthIdx];

  const cta = document.getElementById("ctaMonthLabel");
  const modal = document.getElementById("modalMonthLabel");
  const modalShort = document.getElementById("modalMonthLabelShort");
  const btn = document.getElementById("enterBtn");
  if (cta) cta.textContent = `${nextMonth} Waitlist`;
  if (modal) modal.textContent = nextMonth;
  if (modalShort) modalShort.textContent = nextMonth;
  if (btn) btn.setAttribute("aria-label", `Open ${nextMonth} waitlist form`);
}
updateMonthLabels();

(function startMMT(){
  if (typeof gsap === "undefined") {
    console.warn("GSAP missing, showing static intro");
    wireWaitlistForm();
    wireIntroTriggers();
    startMarketTicker();
    return;
  }
  runIntroSequence();
  wireWaitlistForm();
  wireIntroTriggers();
  startMarketTicker();
})();
/* ---------- LIVE MARKET TICKER ----------
   Pulls US indexes from CNBC (full CORS, no key) and crypto from CoinGecko.
   Runs fully client-side. Refreshes every 30s. */
function fmtPrice(key, p) {
  if (p == null || isNaN(p)) return "—";
  if (key === "btc" || key === "eth") return "$" + Math.round(p).toLocaleString("en-US");
  return Number(p).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}
function fmtPct(c) {
  if (c == null || isNaN(c)) return "—";
  const sign = c >= 0 ? "+" : "";
  return sign + Number(c).toFixed(2) + "%";
}
function parseCnbcNum(s) {
  if (s == null) return null;
  const n = Number(String(s).replace(/[, %+]/g, ""));
  return isNaN(n) ? null : n;
}
function renderMarketTicker(items) {
  const track = document.getElementById("marketTicker");
  if (!track || !items || !items.length) return;
  const html = items.map((it) => {
    const up = (it.changePct || 0) >= 0;
    const cls = up ? "up" : "down";
    const arrow = up ? "▲" : "▼";
    return `<span class="tk"><i class="tk-dot ${cls}"></i>${it.label} <strong>${fmtPrice(it.key, it.price)}</strong> <em class="${cls}">${arrow} ${fmtPct(it.changePct)}</em></span>`;
  }).join("");
  // Duplicate for seamless scroll loop
  track.innerHTML = html + html;
}
async function fetchIndexes() {
  try {
    const url = "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=.SPX|.IXIC|.DJI&requestMethod=itv&noform=1&fund=1&output=json&exthrs=1";
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return [];
    const j = await r.json();
    const arr = j?.FormattedQuoteResult?.FormattedQuote || [];
    const map = {
      ".SPX":  { key: "sp500",  label: "S&P 500" },
      ".IXIC": { key: "nasdaq", label: "NASDAQ" },
      ".DJI":  { key: "dow",    label: "DOW" },
    };
    return arr.map((q) => {
      const m = map[q.symbol];
      if (!m) return null;
      return {
        key: m.key,
        label: m.label,
        price: parseCnbcNum(q.last),
        changePct: parseCnbcNum(q.change_pct),
      };
    }).filter(Boolean);
  } catch (e) { return []; }
}
async function fetchCrypto() {
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true", { cache: "no-store" });
    if (!r.ok) return [];
    const j = await r.json();
    return [
      { key: "btc", label: "BTC", price: j?.bitcoin?.usd,  changePct: j?.bitcoin?.usd_24h_change  ?? 0 },
      { key: "eth", label: "ETH", price: j?.ethereum?.usd, changePct: j?.ethereum?.usd_24h_change ?? 0 },
    ];
  } catch (e) { return []; }
}
async function fetchMarket() {
  const [idx, crypto] = await Promise.all([fetchIndexes(), fetchCrypto()]);
  const items = [...idx, ...crypto];
  if (items.length) renderMarketTicker(items);
}
function startMarketTicker() {
  fetchMarket();
  // Refresh every 30s
  setInterval(fetchMarket, 30000);
}

/* ---------- INTRO SEQUENCE ---------- */
function splitHeadline() {
  document.querySelectorAll(".intro__word [data-split]").forEach((row) => {
    const text = row.getAttribute("data-split");
    const words = text.split(" ");
    row.innerHTML = words.map((w) => {
      const chars = w.split("").map((c) => `<span class="char">${c}</span>`).join("");
      return `<span class="word">${chars}</span>`;
    }).join(" ");
  });
}

function runIntroSequence() {
  splitHeadline();

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".intro__ticker", { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", delay: 0.15 });
  tl.to(".intro__eyebrow", { opacity: 1, duration: 0.8 }, "-=0.4");
  tl.to(".intro__brand", { opacity: 1, duration: 0.6 }, "-=0.3");

  tl.to(".intro__word .char", {
    y: 0,
    rotate: 0,
    opacity: 1,
    duration: 0.95,
    stagger: 0.035,
    ease: "power4.out"
  }, "-=0.3");

  tl.call(() => {
    const accent = document.querySelector(".intro__word .accent-row");
    if (accent) {
      accent.classList.add("is-flashing");
      setTimeout(() => accent.classList.remove("is-flashing"), 1000);
    }
  }, null, "-=0.1");

  tl.to(".intro__tagline", { opacity: 1, duration: 0.7 }, "-=0.4");
  tl.to(".intro__cta", { opacity: 1, duration: 0.6, onComplete: () => {
    document.querySelector(".intro__cta").classList.add("is-visible");
  }}, "-=0.3");
  tl.to(".intro__spots", { opacity: 1, duration: 0.7 }, "-=0.3");

  // Count-up eyebrow: $0 → $5M
  tl.call(() => animateCounter("eyebrowCounter", 0, 5, 1800, "$", "M"), null, "-=1.5");

  // Parallax
  const bgs = document.querySelector(".intro__bgs");
  const content = document.querySelector(".intro__content");
  document.getElementById("intro").addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    gsap.to(bgs, { x: -x * 22, y: -y * 22, duration: 1.6, ease: "power2.out", overwrite: "auto" });
    gsap.to(content, { x: x * 6, y: y * 6, duration: 1.4, ease: "power2.out", overwrite: "auto" });
  });

  wireMagneticCTA();
}

/* Count-up helper */
function animateCounter(id, from, to, duration, prefix = "", suffix = "") {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = from + (to - from) * eased;
    const formatted = suffix === "M"
      ? `${prefix}${val.toFixed(val < 1 ? 2 : 1)}${suffix}`
      : `${prefix}${Math.round(val).toLocaleString()}${suffix}`;
    el.textContent = formatted;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = `${prefix}${to}${suffix}`;
  }
  requestAnimationFrame(frame);
}

/* Magnetic CTA */
function wireMagneticCTA() {
  const cta = document.getElementById("enterBtn");
  if (!cta) return;
  const strength = 0.35;
  const reset = () => gsap.to(cta, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });

  cta.addEventListener("mousemove", (e) => {
    const rect = cta.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(cta, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  });
  cta.addEventListener("mouseleave", reset);

  cta.addEventListener("click", (e) => {
    const rect = cta.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "intro__cta-ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    cta.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
}

/* ---------- INTRO TRIGGERS ---------- */
function wireIntroTriggers() {
  document.getElementById("enterBtn").addEventListener("click", openWaitlistModal);
  document.addEventListener("keydown", (e) => {
    const modalOpen = document.getElementById("waitlistModal").classList.contains("is-open");
    if (e.key === "Escape" && modalOpen) closeWaitlistModal();
  });
}

function openWaitlistModal() {
  const modal = document.getElementById("waitlistModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    const firstField = modal.querySelector('input[name="name"]');
    if (firstField) firstField.focus();
  }, 400);
}
function closeWaitlistModal() {
  const modal = document.getElementById("waitlistModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

/* ---------- WAITLIST FORM ---------- */
function wireWaitlistForm() {
  document.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", closeWaitlistModal);
  });

  const form = document.getElementById("waitlistForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(form);

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      submittedAt: new Date().toISOString(),
      source: "waitlist_gate",
      userAgent: navigator.userAgent
    };

    const errors = validate(data);
    if (Object.keys(errors).length) {
      showErrors(form, errors);
      return;
    }

    const submitBtn = form.querySelector(".wl-submit");
    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    try {
      await submitWaitlist(data);
      showSuccess();
    } catch (err) {
      console.error("Waitlist submission failed", err);
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      showErrors(form, { _global: "Something went wrong. Please try again." });
    }
  });
}

function validate({ name, email, phone }) {
  const errors = {};
  if (!name || name.length < 2) errors.name = "Please enter your full name.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits || digits.length < 8) errors.phone = "Please enter a valid mobile number.";
  return errors;
}
function clearErrors(form) {
  form.querySelectorAll(".wl-field").forEach(f => f.classList.remove("is-invalid"));
  form.querySelectorAll("[data-error]").forEach(el => el.textContent = "");
}
function showErrors(form, errors) {
  Object.entries(errors).forEach(([field, msg]) => {
    if (field === "_global") {
      const last = form.querySelector(".wl-field:last-of-type [data-error]");
      if (last) last.textContent = msg;
      return;
    }
    const input = form.querySelector(`[name="${field}"]`);
    if (!input) return;
    const wrap = input.closest(".wl-field");
    wrap.classList.add("is-invalid");
    wrap.querySelector("[data-error]").textContent = msg;
  });
}

// In-memory buffer (fallback when endpoint not set)
const __mmtWaitlistBuffer = [];

async function submitWaitlist(data) {
  __mmtWaitlistBuffer.push(data);

  if (WAITLIST_ENDPOINT) {
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json().catch(() => ({}));
  }

  // Demo mode: simulate network latency
  console.info("🟠 MMT Waitlist submission (demo mode)", data);
  return new Promise(resolve => setTimeout(resolve, 900));
}

function showSuccess() {
  const form = document.getElementById("waitlistForm");
  const success = document.getElementById("waitlistSuccess");
  const header = document.querySelector(".wl-modal__header");
  form.classList.add("is-hidden");
  if (header) header.style.display = "none";
  success.classList.add("is-active");
  success.setAttribute("aria-hidden", "false");
}

    } catch (err) { console.error("MMT waitlist boot error", err); }
  }

  function mountOverlay() {
    if (document.getElementById("mmt-waitlist-gate")) {
      overlayReady = true;
      maybeBoot();
      return;
    }
    if (!document.body) {
      /* body not parsed yet — retry on DOMContentLoaded */
      document.addEventListener("DOMContentLoaded", mountOverlay, { once: true });
      return;
    }
    var overlay = document.createElement("div");
    overlay.id = "mmt-waitlist-gate";
    overlay.innerHTML = "<!-- ============ INTRO GATE (waitlist only) ============ -->\n<div id=\"intro\" aria-hidden=\"false\">\n  <div class=\"intro__bgs\" aria-hidden=\"true\">\n    <div class=\"intro__bg intro__bg--2 is-active\" data-label=\"Private Jet \u2022 Pacific\"></div>\n  </div>\n  <div class=\"intro__vignette\"></div>\n  <div class=\"intro__scanline\" aria-hidden=\"true\"></div>\n  <div class=\"intro__grain\"></div>\n\n  <!-- Market ticker tape (live) -->\n  <div class=\"intro__ticker\" aria-hidden=\"true\">\n    <div class=\"intro__ticker-track\" id=\"marketTicker\">\n      <span class=\"tk\"><i class=\"tk-dot\"></i>S&amp;P 500 <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>NASDAQ <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>DOW <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>BTC <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>ETH <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>LIVE \u2022 MARKETS <em>LOADING\u2026</em></span>\n    </div>\n  </div>\n\n  <div class=\"intro__content\">\n    <div class=\"intro__content-top\">\n      <div class=\"intro__eyebrow\">\n        <span class=\"dot-pulse\"></span>\n        <span class=\"intro__eyebrow-text\"><span id=\"eyebrowCounter\">$0</span>&nbsp;IN CLIENT WINS SECURED IN 2026</span>\n      </div>\n      <div class=\"intro__brand\">\n        <span>Learn Money, Make Money</span>\n      </div>\n    </div>\n\n    <div class=\"intro__headline\">\n      <h1 class=\"intro__word\" id=\"introWord\">\n        <span class=\"line\">\n          <span class=\"word-row\" data-split=\"Join the\"></span>\n        </span>\n        <span class=\"line\">\n          <span class=\"word-row accent-row\" data-split=\"Waitlist.\"></span>\n        </span>\n      </h1>\n      <p class=\"intro__tagline\">Private intake \u00b7 Limited spots</p>\n    </div>\n\n    <div class=\"intro__cta-wrap\">\n      <button id=\"enterBtn\" class=\"intro__cta\" aria-label=\"Open waitlist form\">\n        <span class=\"intro__cta-glow\" aria-hidden=\"true\"></span>\n        <span class=\"intro__cta-text\" id=\"ctaMonthLabel\">May Waitlist</span>\n        <span class=\"intro__cta-arrow\" aria-hidden=\"true\">\n          <svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 8h10M9 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n        </span>\n      </button>\n      <div class=\"intro__spots\" id=\"introSpots\">\n        <span class=\"spots-live\"><span class=\"spots-live__dot\"></span>LIVE</span>\n        <span class=\"spots-count\">Only <strong id=\"spotsCount\">4</strong> spots remaining</span>\n      </div>\n    </div>\n\n  </div>\n\n  <!-- Waitlist form modal -->\n  <div id=\"waitlistModal\" class=\"wl-modal\" aria-hidden=\"true\" role=\"dialog\" aria-labelledby=\"wlTitle\">\n    <div class=\"wl-modal__backdrop\" data-close></div>\n    <div class=\"wl-modal__panel\">\n      <button class=\"wl-modal__close\" data-close aria-label=\"Close\">\n        <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" aria-hidden=\"true\"><path d=\"M5 5 L17 17 M17 5 L5 17\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n      </button>\n\n      <div class=\"wl-modal__header\">\n        <span class=\"wl-modal__eyebrow\"><span class=\"dot-pulse\"></span>&nbsp;&nbsp;<span class=\"wl-modal__eyebrow-full\">Only 4 spots remaining \u00b7 <span id=\"modalMonthLabel\">May</span> intake</span><span class=\"wl-modal__eyebrow-short\">4 spots \u00b7 <span id=\"modalMonthLabelShort\">May</span> intake</span></span>\n        <h2 id=\"wlTitle\" class=\"wl-modal__title\">Join the <span class=\"accent\">waitlist.</span></h2>\n        <p class=\"wl-modal__sub\">Drop your details. A coach will personally reach out within 48 hours with next steps.</p>\n      </div>\n\n      <form id=\"waitlistForm\" class=\"wl-form\" novalidate>\n        <label class=\"wl-field\">\n          <span class=\"wl-field__label\">Full name</span>\n          <input type=\"text\" name=\"name\" autocomplete=\"name\" required placeholder=\"Jane Doe\" />\n          <span class=\"wl-field__error\" data-error></span>\n        </label>\n        <label class=\"wl-field\">\n          <span class=\"wl-field__label\">Email</span>\n          <input type=\"email\" name=\"email\" autocomplete=\"email\" required placeholder=\"you@email.com\" />\n          <span class=\"wl-field__error\" data-error></span>\n        </label>\n        <label class=\"wl-field\">\n          <span class=\"wl-field__label\">Mobile <span class=\"wl-field__optional\">(required for callback)</span></span>\n          <input type=\"tel\" name=\"phone\" autocomplete=\"tel\" required placeholder=\"04XX XXX XXX\" />\n          <span class=\"wl-field__error\" data-error></span>\n        </label>\n\n        <button type=\"submit\" class=\"wl-submit\">\n          <span class=\"wl-submit__label\">Join the waitlist</span>\n          <span class=\"wl-submit__spinner\" aria-hidden=\"true\"></span>\n        </button>\n\n        <p class=\"wl-form__fine\">By submitting, you agree to be contacted by MMT. We never share your details. AFSL #460940 / AR #1310836.</p>\n      </form>\n\n      <!-- success state -->\n      <div class=\"wl-success\" id=\"waitlistSuccess\" aria-hidden=\"true\">\n        <div class=\"wl-success__mark\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\"><circle cx=\"26\" cy=\"26\" r=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M14 27 L23 36 L39 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n        </div>\n        <h3>You're on the list.</h3>\n        <p>Check your inbox \u2014 we'll be in touch within 48 hours.</p>\n      </div>\n    </div>\n  </div>\n</div>";
    document.body.appendChild(overlay);
    /* Overlay is in the DOM with its own black background — reveal body.
       Keep Wix content invisible underneath (mmt-gate-on handles that). */
    document.documentElement.classList.remove("mmt-gate-prep");
    document.documentElement.classList.add("mmt-gate-on");
    overlayReady = true;
    maybeBoot();
  }
  mountOverlay();

  var gsapScript = document.createElement("script");
  gsapScript.src = "https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js";
  gsapScript.onload = function() { gsapReady = true; maybeBoot(); };
  gsapScript.onerror = function() { gsapReady = true; maybeBoot(); };
  document.head.appendChild(gsapScript);
})();
