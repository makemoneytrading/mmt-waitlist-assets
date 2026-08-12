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
  style.textContent = "\nhtml.mmt-gate-on #SITE_HEADER, html.mmt-gate-on #SITE_FOOTER,\nhtml.mmt-gate-on header[data-mesh-id], html.mmt-gate-on footer[data-mesh-id],\nhtml.mmt-gate-on [data-testid=\"SITE_HEADER\"], html.mmt-gate-on [data-testid=\"SITE_FOOTER\"] { visibility: hidden !important; }\n/* Hide every direct child of <body> under the overlay so Wix page content\n   (hero, FAQ, footer widgets) never peeks out below our compliance footer.\n   `visibility: hidden` preserves layout but keeps them invisible; anything\n   inside our overlay (via `#mmt-waitlist-gate`) explicitly re-enables\n   visibility. Wix's own #SITE_ROOT wrapper is targeted here too. */\nhtml.mmt-gate-on body > *:not(#mmt-waitlist-gate):not(dialog):not(script):not(style):not(link):not(noscript) {\n  visibility: hidden !important;\n  height: 0 !important;\n  overflow: hidden !important;\n  pointer-events: none !important;\n}\n/* Re-enable visibility for our overlay and for any <dialog> we open (cert\n   lightbox uses a body-level <dialog class=\"cert-box\">). Without this, the\n   body>*:not(...) rule above hides the dialog even though it's in the\n   browser's top-layer. */\nhtml.mmt-gate-on #mmt-waitlist-gate, html.mmt-gate-on #mmt-waitlist-gate *,\nhtml.mmt-gate-on body > dialog, html.mmt-gate-on body > dialog * { visibility: visible !important; }\n/* v2 landing overlay: normal-flow block that covers the Wix page and scrolls\n   with the browser. Was `position: fixed; inset: 0` in v1 (which prevented\n   the deck from scrolling past the first section). */\n#mmt-waitlist-gate {\n  position: absolute; top: 0; left: 0; width: 100%;\n  min-height: 100vh; z-index: 2147483647;\n  background: #000; color: #f5f5f4;\n  font-family: \"Satoshi\",\"Inter\",-apple-system,BlinkMacSystemFont,system-ui,sans-serif;\n  -webkit-font-smoothing: antialiased;\n}\nhtml.mmt-gate-on, html.mmt-gate-on body { min-height: 100vh; }\nhtml.mmt-gate-on body { position: relative; }\n#mmt-waitlist-gate a { color: inherit; text-decoration: none; }\n#mmt-waitlist-gate button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\n#mmt-waitlist-gate img, #mmt-waitlist-gate svg { display: block; max-width: 100%; }\n\n/* =========================================================\n   Make Money Trading \u2014 Prototype stylesheet\n   Aesthetic: Apple/Linear minimalism + cinematic gate\n   Accent: warm orange #FF6B1A\n   ========================================================= */\n\n:root {\n  --bg: #0a0a0a;\n  --bg-2: #111111;\n  --surface: #141414;\n  --line: rgba(255,255,255,0.08);\n  --line-strong: rgba(255,255,255,0.16);\n  --ink: #f5f5f4;\n  --ink-dim: #a1a1a1;\n  --ink-muted: #6b6b6b;\n  --accent: #ff6b1a;\n  --accent-soft: #ff8a4a;\n\n  --font-display: \"Anton\", \"Satoshi\", Impact, sans-serif;\n  --font-body: \"Satoshi\", \"Inter\", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;\n\n  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  --transition-interactive: 220ms var(--ease-out);\n\n  --max: 1200px;\n  --pad: clamp(20px, 4vw, 48px);\n\n  /* ==== Bridge tokens for imported accelerator sections ==== */\n  --card:       #141414;\n  --card-2:     #1c1c1c;\n  --fg:         #f5f5f4;\n  --muted:      #a1a1a1;\n  --muted-2:    #6b6b6b;\n  --border:     rgba(255,255,255,0.10);\n  --border-2:   rgba(255,255,255,0.18);\n  --accent-shim: #ffb078;\n  --accent-deep: #cc4a10;\n  --ok:         hsl(150 68% 46%);\n  --warn:       hsl(0 78% 60%);\n  --font:       var(--font-body);\n  --font-num:   \"Space Grotesk\", \"Satoshi\", ui-monospace, monospace;\n  --ease:       var(--ease-out);\n  --ticker-h:   34px;\n  --pad-x:      var(--pad);\n}\n\n#mmt-waitlist-gate *, #mmt-waitlist-gate *::before, #mmt-waitlist-gate *::after { box-sizing: border-box; }\n#mmt-waitlist-gate h1, #mmt-waitlist-gate h2, #mmt-waitlist-gate h3, #mmt-waitlist-gate p, #mmt-waitlist-gate ul, #mmt-waitlist-gate ol, #mmt-waitlist-gate form, #mmt-waitlist-gate figure { margin: 0; padding: 0; }\n/* scoped */\n/* scoped */\n\n/* v1 gate needed the page to be scroll-locked. v2 scrolling landing needs\n   the browser's normal vertical scroll behaviour, so the old lock is off. */\nhtml.mmt-gate-on, html.mmt-gate-on body { overflow: visible !important; height: auto !important; }\n\na { color: inherit; text-decoration: none; }\nbutton { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\nimg, svg { display: block; max-width: 100%; }\n\n::selection { background: var(--accent); color: #0a0a0a; }\n\n.wrap {\n  max-width: var(--max);\n  margin: 0 auto;\n  padding: 0 var(--pad);\n}\n\n.eyebrow {\n  font-size: 12px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  font-weight: 600;\n  margin-bottom: 24px;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.dot-pulse {\n  width: 6px; height: 6px; border-radius: 999px;\n  background: var(--accent);\n  box-shadow: 0 0 0 0 rgba(255,107,26,0.6);\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% { box-shadow: 0 0 0 0 rgba(255,107,26,0.5); }\n  70% { box-shadow: 0 0 0 10px rgba(255,107,26,0); }\n  100% { box-shadow: 0 0 0 0 rgba(255,107,26,0); }\n}\n\n.muted { color: var(--ink-muted); }\n.accent { color: var(--accent); }\n\n.section-title {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(40px, 6.5vw, 88px);\n  line-height: 0.96;\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  margin-bottom: clamp(48px, 7vw, 96px);\n}\n\n\n/* ===================== INTRO GATE ===================== */\n\n/* Scrolling landing container. Was fullscreen-fixed in v1; now a normal-flow\n   root that lets the browser handle vertical scroll while still covering the\n   whole viewport visually. */\n#intro {\n  position: relative;\n  min-height: 100vh;\n  width: 100%;\n  overflow: visible;\n  background: var(--bg);\n  color: var(--ink);\n  z-index: 1;\n}\n\n/* ============ Ambient background (richer + warmer than apply) ============\n   Deep warm-black base (24 14% 4%) with FOUR radial glows: two large ones\n   at the top corners plus two smaller mid-height glows. Result is a\n   noticeably orange wash without drowning the content. Fixed to viewport. */\n#intro::before {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  background:\n    radial-gradient(1100px 720px at 10% 4%, hsl(24 96% 55% / .22), transparent 62%),\n    radial-gradient(1000px 700px at 92% 6%, hsl(18 92% 46% / .18), transparent 60%),\n    radial-gradient(820px 620px at 96% 62%, hsl(24 96% 55% / .14), transparent 62%),\n    radial-gradient(760px 580px at 4% 70%, hsl(18 88% 44% / .12), transparent 60%);\n}\n\n/* Section-anchored warm glow \u2014 a big soft halo behind each panel's content\n   so scrolling never looks flat. Layered under content (z-index 0 inside\n   the panel; content itself is at z-index 2). */\n.mmt-panel::after {\n  content: \"\";\n  position: absolute;\n  inset: 8% 0 0 0;\n  pointer-events: none;\n  z-index: 0;\n  background: radial-gradient(600px 420px at 50% 40%, hsl(24 96% 55% / .10), transparent 70%);\n}\n\n/* Scroll progress bar removed per 2026-08-12 revision. */\n\n/* ============ Brand mark (fixed top-left, matches apply page) ============ */\n.brand {\n  position: fixed;\n  top: calc(var(--ticker-h) + clamp(16px, 2.6vh, 28px));\n  left: clamp(20px, 4vw, 46px);\n  z-index: 60;\n  display: block;\n  line-height: 0;\n  opacity: .95;\n  transition: opacity .3s var(--ease-out);\n  text-decoration: none;\n}\n.brand:hover { opacity: 1; }\n.brand img {\n  display: block;\n  width: 132px;\n  height: auto;\n  filter: drop-shadow(0 3px 18px rgb(0 0 0 / .7));\n}\n@media (max-width: 900px) {\n  .brand { left: 16px; top: calc(var(--ticker-h) + 10px); }\n  .brand img { width: 108px; }\n}\n\n/* ============ Right-side dot nav rail ============ */\n.rail {\n  position: fixed;\n  right: 18px;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 60;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 11px;\n}\n.rail button {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: none;\n  border: 0;\n  padding: 4px 2px;\n  cursor: pointer;\n  color: var(--muted-2);\n  font-family: var(--font);\n  font-size: 10.5px;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.rail .dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 99px;\n  background: hsl(24 10% 30%);\n  transition: all .35s var(--ease-out);\n  flex: none;\n}\n.rail .lbl {\n  opacity: 0;\n  transform: translateX(6px);\n  transition: opacity .28s var(--ease-out), transform .28s var(--ease-out);\n  white-space: nowrap;\n  pointer-events: none;\n  order: -1;\n}\n.rail button:hover .lbl { opacity: 1; transform: none; }\n.rail button[aria-current=\"true\"] .dot {\n  background: var(--accent);\n  height: 20px;\n  border-radius: 99px;\n  box-shadow: 0 0 14px hsl(24 96% 55% / .65);\n}\n.rail button[aria-current=\"true\"] { color: var(--fg); }\n@media (max-width: 900px) { .rail { display: none; } }\n\n/* ============ Panel head bar (\u201c01 / 06 \u2500\u2500\u2500 SECTION NAME\u201d) ============\n   Left edge sits AFTER the fixed logo so the \u201c01 / 06\u201d marker is always\n   visible. Right edge respects the fixed dot rail. */\n.mmt-panel__head {\n  position: absolute;\n  top: clamp(96px, 11vh, 128px);\n  left: clamp(180px, 15vw, 220px);\n  right: clamp(48px, 5vw, 72px);\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  font-size: 11px;\n  letter-spacing: .22em;\n  text-transform: uppercase;\n  color: var(--muted-2);\n  font-weight: 600;\n  z-index: 5;\n  pointer-events: none;\n}\n.mmt-panel__idx {\n  font-family: var(--font-num, var(--font));\n  color: var(--muted-2);\n  font-variant-numeric: tabular-nums;\n}\n.mmt-panel__rule {\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n}\n.mmt-panel__eyebrow { color: var(--accent); }\n@media (max-width: 900px) {\n  .mmt-panel__head {\n    /* Below the logo on mobile instead of beside it */\n    left: 20px;\n    right: 20px;\n    top: calc(var(--ticker-h) + 108px);\n    font-size: 10.5px;\n  }\n}\n@media (max-width: 720px) {\n  /* MOBILE: hide the section-head eyebrow bar entirely (\"03 / 06 \u00b7 PROFIT\n     TARGET CALCULATOR\" etc). On a phone the category labels crowd the\n     headline and eat vertical space. Desktop remains unchanged. */\n  .mmt-panel__head { display: none; }\n}\n\n/* Highlight the current-section head bar */\n.mmt-panel.is-active .mmt-panel__rule {\n  background: linear-gradient(90deg, var(--accent) 0%, var(--border) 60%);\n}\n\n/* Accent word treatment inside headlines */\n.mmt-h2 .accent {\n  background: linear-gradient(122deg, var(--accent-deep), var(--accent) 45%, var(--accent-shim));\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n\n/* Fine-print (ASIC reg link, etc.) sits below any card grid on a panel. */\n.mmt-fine {\n  font-family: var(--font-body);\n  font-size: 13px;\n  color: var(--muted-2);\n  text-align: center;\n  margin: 22px auto 0;\n  max-width: 640px;\n  line-height: 1.5;\n}\n\n/* Bottom drag-handle cue (like Apple sheet handles) */\n.mmt-panel__handle {\n  position: absolute;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 44px;\n  height: 4px;\n  border-radius: 99px;\n  background: hsl(24 10% 22%);\n  z-index: 5;\n  pointer-events: none;\n}\n.intro__bgs { position: absolute; inset: 0; }\n.intro__bg {\n  position: absolute; inset: -4%;\n  background-size: cover;\n  background-position: center;\n  filter: saturate(1.08) contrast(1.04);\n  transform: scale(1.08);\n  opacity: 0;\n  transition: opacity 1.8s ease-in-out;\n  will-change: opacity, transform;\n}\n.intro__bg.is-active {\n  opacity: 1;\n  animation: kenBurns 16s ease-in-out infinite alternate;\n}\n.intro__bg--1 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--2 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--3 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n.intro__bg--4 { background-image: url(\"https://static.wixstatic.com/media/a82c73_85a6857985814574b9e1ed743f0e2690~mv2.png\"); }\n@keyframes kenBurns {\n  0%   { transform: scale(1.08) translate(0, 0); }\n  100% { transform: scale(1.18) translate(-1.5%, -1%); }\n}\n\n/* Scene indicator (bottom-right) */\n.intro__scene {\n  position: absolute;\n  bottom: clamp(16px, 3vh, 28px);\n  right: clamp(16px, 3vw, 36px);\n  z-index: 5;\n  display: inline-flex; align-items: center; gap: 12px;\n  opacity: 0;\n  animation: sceneFadeIn 1.2s ease-out 2.5s forwards;\n  font-size: 10px;\n  letter-spacing: 0.3em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.6);\n}\n.intro__scene-dots { display: inline-flex; gap: 6px; }\n.intro__scene-dots .dot {\n  width: 5px; height: 5px; border-radius: 50%;\n  background: rgba(255,255,255,0.25);\n  transition: background 0.5s ease, transform 0.5s ease;\n}\n.intro__scene-dots .dot.is-active {\n  background: var(--accent);\n  transform: scale(1.4);\n  box-shadow: 0 0 12px rgba(255,107,26,0.8);\n}\n.intro__scene-label {\n  font-variant: small-caps;\n  transition: opacity 0.4s ease;\n}\n.intro__scene-label.is-fading { opacity: 0; }\n@keyframes sceneFadeIn {\n  to { opacity: 1; }\n}\n@media (max-width: 640px) {\n  .intro__scene { font-size: 9px; letter-spacing: 0.2em; bottom: 14px; right: 14px; }\n  .intro__scene-label { max-width: 160px; }\n}\n\n.intro__vignette {\n  position: absolute; inset: 0;\n  z-index: 2;\n  background:\n    radial-gradient(130% 90% at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%),\n    linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.7) 100%);\n}\n\n.intro__grain {\n  position: absolute; inset: 0;\n  pointer-events: none;\n  opacity: 0.25;\n  mix-blend-mode: overlay;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\");\n  animation: grainShift 1.2s steps(3) infinite;\n}\n@keyframes grainShift {\n  0%   { transform: translate(0,0); }\n  33%  { transform: translate(-5px,3px); }\n  66%  { transform: translate(4px,-2px); }\n  100% { transform: translate(0,0); }\n}\n\n.intro__content {\n  position: relative; z-index: 3;\n  height: 100%;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  justify-items: center;\n  /* top pad must clear 34px ticker + breathing room */\n  padding: clamp(72px, 10vh, 110px) var(--pad) clamp(24px, 5vh, 48px);\n  text-align: center;\n}\n/* Top cluster (eyebrow + brand) */\n.intro__content-top {\n  grid-row: 1;\n  display: flex; flex-direction: column; align-items: center; gap: 20px;\n  max-width: 100%;\n}\n/* Center cluster (headline) \u2014 truly vertically centered */\n.intro__content > .intro__headline {\n  grid-row: 2;\n  align-self: center;\n  display: flex; flex-direction: column; align-items: center;\n  gap: clamp(18px, 3vh, 28px);\n  width: 100%;\n}\n/* Bottom cluster (CTA + spots) */\n.intro__content > .intro__cta-wrap { grid-row: 3; align-self: end; }\n\n/* ============ STACK LAYOUT (centered single column) ============ */\n.intro__stack {\n  grid-row: 2;\n  align-self: center;\n  width: 100%;\n  max-width: 820px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: clamp(18px, 2.4vh, 28px);\n  text-align: center;\n}\n.intro__stack .intro__headline {\n  gap: 0;\n  margin: 0;\n  width: 100%;\n}\n.intro__stack .intro__word {\n  font-size: clamp(44px, 5.4vw, 76px);\n  filter: drop-shadow(0 8px 28px rgba(0,0,0,0.6));\n}\n.intro__word--inline .line {\n  white-space: nowrap;\n  justify-content: center;\n}\n.intro__word--inline .word-row + .word-row {\n  margin-left: 0.28em;\n}\n.intro__video {\n  opacity: 0;\n  transform: translateY(8px);\n  width: 100%;\n  max-width: 820px;\n}\n.intro__video-frame {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border-radius: 16px;\n  overflow: hidden;\n  background: #0a0a0a;\n  border: 1px solid rgba(255,255,255,0.10);\n  box-shadow:\n    0 30px 80px rgba(0,0,0,0.55),\n    0 0 0 1px rgba(255,107,26,0.04),\n    0 0 60px -20px rgba(255,107,26,0.25);\n}\n.intro__video-frame wistia-player {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.intro__stack .intro__license {\n  margin: 0;\n}\n.intro__stack .intro__cta-wrap {\n  margin: 0;\n}\n\n@media (max-width: 900px) {\n  .intro__stack {\n    max-width: 100%;\n    gap: clamp(14px, 2vh, 22px);\n  }\n  .intro__video-frame {\n    border-radius: 12px;\n  }\n  /* Keep 'Join the Waitlist.' on one line at tablet widths too. */\n  .intro__stack .intro__word {\n    font-size: clamp(40px, 6.5vw, 60px);\n    line-height: 1;\n  }\n  .intro__content {\n    padding-top: 72px;\n    padding-bottom: 24px;\n  }\n}\n.intro__brand {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-family: var(--font-display);\n  font-size: 18px;\n  letter-spacing: 0.05em;\n  color: rgba(255,255,255,0.82);\n}\n.intro__brand svg { color: var(--accent); }\n.intro__headline {\n  display: flex; flex-direction: column; align-items: center; gap: 24px;\n}\n.intro__tagline {\n  opacity: 0;\n  font-size: 12px;\n  letter-spacing: 0.4em;\n  text-transform: uppercase;\n  color: #ffffff;\n  font-weight: 600;\n}\n\n.intro__license {\n  opacity: 0;\n  margin-top: 6px;\n  font-size: 10px;\n  letter-spacing: 0.3em;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.7);\n  font-weight: 600;\n}\n\n.intro__eyebrow {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.35em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.7);\n  padding: 10px 16px;\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 999px;\n  backdrop-filter: blur(10px);\n  background: rgba(255,255,255,0.04);\n}\n\n.intro__word {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(80px, 15vw, 200px);\n  line-height: 0.88;\n  letter-spacing: -0.005em;\n  color: #fff;\n  text-transform: uppercase;\n  margin: 0;\n  filter: drop-shadow(0 10px 40px rgba(0,0,0,0.6));\n  text-align: center;\n  width: 100%;\n}\n.intro__word .line {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  overflow: hidden;\n}\n.intro__word .word-row { display: inline-flex; gap: 0.2em; }\n.intro__word .w {\n  display: inline-block;\n  transform: translateY(110%);\n  will-change: transform;\n}\n.intro__word .accent { color: var(--accent); }\n\n.intro__cta-wrap {\n  display: flex; flex-direction: column; align-items: center; gap: 18px;\n  position: relative;\n}\n.intro__cta-row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n/* Secondary outlined CTA \u2014 \"Free Course\" */\n/* Placeholder \u2014 actual ghost rules moved below .intro__cta::before so they\n   override the orange overlay layer. */\n.intro__cta {\n  position: relative;\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 11px;\n  padding: 15px 30px;\n  border-radius: 999px;\n  background: var(--accent);\n  color: #0a0a0a;\n  font-family: var(--font-body) !important;\n  font-weight: 800 !important;\n  font-size: 13.5px;\n  line-height: 1;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  box-shadow:\n    0 14px 40px -10px rgba(255,107,26,0.6),\n    0 0 0 1px rgba(255,255,255,0.08) inset,\n    0 0 0 0 rgba(255,107,26,0.5);\n  transition:\n    background var(--transition-interactive),\n    color var(--transition-interactive),\n    box-shadow var(--transition-interactive);\n  overflow: hidden;\n  isolation: isolate;\n}\n.intro__cta-text, .intro__cta-arrow, .intro__cta-live { position: relative; z-index: 2; }\n\n/* Lock every typographic property on BOTH CTAs (button + anchor) and their\n   inner text spans so iOS Safari, Wix host CSS, and UA defaults can\u2019t pull\n   them out of sync. Identical font, weight, size, spacing, and rendering. */\n.intro__cta,\n.intro__cta .intro__cta-text,\na.intro__cta,\na.intro__cta .intro__cta-text,\nbutton.intro__cta,\nbutton.intro__cta .intro__cta-text {\n  font-family: var(--font-body) !important;\n  font-weight: 800 !important;\n  font-size: 13.5px !important;\n  line-height: 1 !important;\n  letter-spacing: 0.14em !important;\n  text-transform: uppercase !important;\n  font-style: normal !important;\n  font-stretch: normal !important;\n  font-variant: normal !important;\n  font-feature-settings: normal !important;\n  text-decoration: none !important;\n  -webkit-text-size-adjust: 100% !important;\n  -webkit-font-smoothing: antialiased !important;\n  -moz-osx-font-smoothing: grayscale !important;\n  text-rendering: optimizeLegibility !important;\n}\n\n/* LIVE indicator inside the CTA button */\n.intro__cta-live {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 14px; height: 14px;\n  flex: 0 0 auto;\n}\n.intro__cta-live-dot {\n  width: 9px; height: 9px;\n  border-radius: 50%;\n  background: #ffffff;\n  box-shadow:\n    0 0 0 0 rgba(255,255,255,0.85),\n    0 0 6px rgba(255,255,255,0.9);\n  animation: ctaLivePulse 1.4s ease-out infinite;\n}\n@keyframes ctaLivePulse {\n  0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.85), 0 0 6px rgba(255,255,255,0.9); }\n  70%  { box-shadow: 0 0 0 8px rgba(255,255,255,0),    0 0 6px rgba(255,255,255,0.9); }\n  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0),       0 0 6px rgba(255,255,255,0.9); }\n}\n.intro__cta:hover .intro__cta-live-dot {\n  background: var(--accent);\n  box-shadow:\n    0 0 0 0 rgba(255,107,26,0.85),\n    0 0 6px rgba(255,107,26,0.9);\n  animation-name: ctaLivePulseHover;\n}\n@keyframes ctaLivePulseHover {\n  0%   { box-shadow: 0 0 0 0 rgba(255,107,26,0.85), 0 0 6px rgba(255,107,26,0.9); }\n  70%  { box-shadow: 0 0 0 8px rgba(255,107,26,0),   0 0 6px rgba(255,107,26,0.9); }\n  100% { box-shadow: 0 0 0 0 rgba(255,107,26,0),     0 0 6px rgba(255,107,26,0.9); }\n}\n.intro__cta-glow {\n  position: absolute;\n  inset: -2px;\n  border-radius: 999px;\n  background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.55) 40deg, transparent 80deg, transparent 360deg);\n  opacity: 0;\n  z-index: 1;\n  animation: ctaConic 3.2s linear infinite;\n  pointer-events: none;\n}\n.intro__cta::before {\n  content: \"\";\n  position: absolute;\n  inset: 2px;\n  border-radius: 999px;\n  background: var(--accent);\n  z-index: 1;\n  transition: background var(--transition-interactive);\n}\n.intro__cta:hover::before { background: #fff; }\n\n/* ============================================================\n   Secondary outlined CTA \u2014 \"Free Course\"\n   Placed AFTER .intro__cta and .intro__cta::before so it wins\n   the cascade and stays fully transparent (no orange fill).\n   ============================================================ */\na.intro__cta.intro__cta--ghost {\n  background: transparent !important;\n  color: rgba(255,255,255,0.72) !important;\n  border: 1px solid rgba(255,255,255,0.2) !important;\n  box-shadow: none !important;\n  text-decoration: none !important;\n  isolation: auto;\n  overflow: visible;\n  transition:\n    background var(--transition-interactive),\n    color var(--transition-interactive),\n    border-color var(--transition-interactive),\n    transform var(--transition-interactive);\n}\n/* Kill the orange ::before overlay on the ghost variant */\na.intro__cta.intro__cta--ghost::before {\n  display: none !important;\n  background: transparent !important;\n}\n.intro__cta--ghost .intro__cta-arrow {\n  background: rgba(255,255,255,0.08) !important;\n  color: inherit !important;\n}\n.intro__cta--ghost:hover {\n  background: rgba(255,255,255,0.04) !important;\n  border-color: rgba(255,255,255,0.4) !important;\n  color: rgba(255,255,255,0.95) !important;\n  transform: translateY(-1px);\n}\n.intro__cta--ghost:hover .intro__cta-arrow {\n  background: rgba(255,255,255,0.14) !important;\n  transform: translateX(3px);\n}\n.intro__cta:hover {\n  background: #fff;\n  box-shadow:\n    0 30px 70px -10px rgba(255,255,255,0.35),\n    0 0 0 1px rgba(255,255,255,0.15) inset,\n    0 0 80px 0 rgba(255,107,26,0.4);\n}\n.intro__cta.is-visible .intro__cta-glow { opacity: 1; }\n.intro__cta:active { transform: scale(0.97) !important; }\n@keyframes ctaConic {\n  to { transform: rotate(360deg); }\n}\n.intro__cta-arrow {\n  display: inline-flex; align-items: center; justify-content: center;\n  width: 24px; height: 24px;\n  border-radius: 999px;\n  background: rgba(10,10,10,0.12);\n  transition: transform var(--transition-interactive);\n}\n.intro__cta-arrow svg { width: 15px; height: 15px; }\n.intro__cta:hover .intro__cta-arrow { transform: translateX(4px); }\n\n/* Ripple */\n.intro__cta-ripple {\n  position: absolute;\n  border-radius: 999px;\n  transform: translate(-50%, -50%) scale(0);\n  background: rgba(255,255,255,0.55);\n  pointer-events: none;\n  z-index: 2;\n  animation: ctaRipple 0.7s ease-out forwards;\n}\n@keyframes ctaRipple {\n  to { transform: translate(-50%, -50%) scale(4); opacity: 0; }\n}\n\n/* Trustpilot strip \u2014 secondary CTA */\n.intro__trust {\n  opacity: 0;\n  margin-top: 4px;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 6px 12px;\n  border-radius: 999px;\n  border: 1px solid rgba(255,255,255,0.12);\n  background: rgba(255,255,255,0.03);\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  color: rgba(255,255,255,0.85);\n  font-size: 11px;\n  letter-spacing: 0.04em;\n  text-transform: none;\n  text-decoration: none;\n  transition: border-color 200ms ease, background 200ms ease, transform 200ms ease, color 200ms ease;\n  white-space: nowrap;\n}\n.intro__trust .intro__trust-stars svg { width: 72px; height: 13px; }\n.intro__trust:hover,\n.intro__trust:focus-visible {\n  border-color: rgba(0,182,122,0.55);\n  background: rgba(0,182,122,0.08);\n  color: #ffffff;\n  transform: translateY(-1px);\n  outline: none;\n}\n.intro__trust-copy { color: rgba(255,255,255,0.7); }\n.intro__trust-copy strong { color: #ffffff; font-weight: 600; }\n.intro__trust-stars {\n  display: inline-flex;\n  align-items: center;\n  line-height: 0;\n}\n.intro__trust-label {\n  color: rgba(255,255,255,0.7);\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.intro__trust-label strong { color: #00B67A; font-weight: 700; letter-spacing: 0.04em; }\n.intro__trust-arrow {\n  transition: transform 200ms ease;\n  color: rgba(255,255,255,0.55);\n}\n.intro__trust:hover .intro__trust-arrow { transform: translateX(3px); color: #00B67A; }\n@media (max-width: 560px) {\n  /* Keep the pill on ONE row so it stays compact \u2014\n     no flex-basis 100% wrap. */\n  .intro__trust {\n    flex-wrap: nowrap;\n    justify-content: center;\n    gap: 6px;\n    padding: 7px 12px;\n    font-size: 10px;\n    letter-spacing: 0.02em;\n    white-space: nowrap;\n  }\n  .intro__trust-copy { flex-basis: auto; }\n  .intro__trust-stars svg { width: 64px; height: 12px; }\n}\n\n/* Spots remaining */\n.intro__spots {\n  opacity: 0;\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.75);\n}\n.spots-live {\n  display: inline-flex; align-items: center; gap: 6px;\n  color: var(--accent);\n  font-weight: 700;\n}\n.spots-live__dot {\n  width: 7px; height: 7px; border-radius: 50%;\n  background: var(--accent);\n  box-shadow: 0 0 0 0 rgba(255,107,26,0.9);\n  animation: spotPulse 1.4s ease-out infinite;\n}\n@keyframes spotPulse {\n  0%   { box-shadow: 0 0 0 0 rgba(255,107,26,0.9); }\n  70%  { box-shadow: 0 0 0 10px rgba(255,107,26,0); }\n  100% { box-shadow: 0 0 0 0 rgba(255,107,26,0); }\n}\n.spots-count strong {\n  color: #fff;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n\n/* Ticker tape */\n.intro__ticker {\n  position: absolute;\n  top: 0; left: 0; right: 0;\n  z-index: 4;\n  height: 34px;\n  overflow: hidden;\n  background: rgba(10,10,10,0.75);\n  border-bottom: 1px solid rgba(255,255,255,0.08);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  opacity: 0;\n  transform: translateY(-100%);\n}\n.intro__ticker-track {\n  /* Fade edges so scrolling text dissolves in/out instead of clipping */\n  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);\n          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);\n}\n.intro__ticker-track {\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n  gap: 48px;\n  white-space: nowrap;\n  animation: tickerScroll 55s linear infinite;\n  padding-left: 48px;\n}\n@keyframes tickerScroll {\n  0%   { transform: translateX(0); }\n  100% { transform: translateX(-50%); }\n}\n.intro__ticker .tk {\n  display: inline-flex; align-items: center; gap: 10px;\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  color: rgba(255,255,255,0.78);\n  font-weight: 500;\n}\n.intro__ticker .tk em {\n  font-style: normal;\n  color: var(--accent);\n  font-weight: 700;\n  letter-spacing: 0.1em;\n}\n.intro__ticker .tk em.up   { color: #22c55e; }\n.intro__ticker .tk em.down { color: #ef4444; }\n.intro__ticker .tk strong { color: #fff; font-weight: 700; margin-right: 6px; font-variant-numeric: tabular-nums; }\n.intro__ticker .tk-dot.up   { background: #22c55e; box-shadow: 0 0 10px rgba(34,197,94,0.7); }\n.intro__ticker .tk-dot.down { background: #ef4444; box-shadow: 0 0 10px rgba(239,68,68,0.7); }\n.intro__ticker .tk-dot {\n  width: 5px; height: 5px; border-radius: 50%;\n  background: var(--accent);\n  display: inline-block;\n  box-shadow: 0 0 10px rgba(255,107,26,0.7);\n}\n\n/* Horizontal scan-line overlay for cinematic feel */\n.intro__scanline {\n  position: absolute;\n  inset: 0;\n  z-index: 2;\n  pointer-events: none;\n  background: repeating-linear-gradient(\n    to bottom,\n    transparent 0px,\n    transparent 3px,\n    rgba(255,255,255,0.015) 3px,\n    rgba(255,255,255,0.015) 4px\n  );\n  mix-blend-mode: overlay;\n  opacity: 0.5;\n}\n\n/* Per-letter split for headline reveal */\n.intro__word .word-row { display: inline-flex; gap: 0.22em; flex-wrap: wrap; justify-content: center; }\n.intro__word .word-row .word {\n  display: inline-flex;\n  overflow: hidden;\n}\n.intro__word .word-row .char {\n  display: inline-block;\n  transform: translateY(110%) rotate(6deg);\n  will-change: transform, opacity;\n  opacity: 0;\n}\n.intro__word .accent-row .char {\n  color: var(--accent);\n  text-shadow: 0 0 60px rgba(255,107,26,0.55);\n}\n/* Optical centering fix: the trailing period on \"Waitlist.\" visually shifts the\n   word off-center under \"Join the\". Take the period out of the centering flow\n   entirely by absolutely positioning it at the right edge of its parent word,\n   so the centered word-row is measured without it. */\n.intro__word .accent-row .word:last-child {\n  position: relative;\n}\n.intro__word .accent-row .word:last-child .char:last-child {\n  position: absolute;\n  left: 100%;\n  top: 0;\n}\n.intro__word .accent-row.is-flashing .char {\n  animation: accentFlash 0.9s ease-out;\n}\n@keyframes accentFlash {\n  0%   { filter: brightness(1); text-shadow: 0 0 0 rgba(255,107,26,0); }\n  40%  { filter: brightness(1.8); text-shadow: 0 0 80px rgba(255,107,26,0.9), 0 0 20px #fff; }\n  100% { filter: brightness(1); text-shadow: 0 0 60px rgba(255,107,26,0.55); }\n}\n\n/* Eyebrow counter */\n.intro__eyebrow-text {\n  font-variant-numeric: tabular-nums;\n}\n.intro__eyebrow-text #eyebrowCounter {\n  color: var(--accent);\n  font-weight: 800;\n  margin-right: 2px;\n}\n\n@media (max-width: 640px) {\n  .intro__ticker { height: 30px; }\n  .intro__ticker .tk { font-size: 10px; letter-spacing: 0.18em; }\n  .intro__content { padding-top: 88px; }\n  /* Eyebrow: smaller + tighter on mobile so it fits one line */\n  .intro__eyebrow {\n    font-size: 9px;\n    letter-spacing: 0.22em;\n    padding: 8px 12px;\n    max-width: calc(100vw - 32px);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .intro__brand { font-size: 15px; }\n  /* Tagline: keep it on ONE line on mobile */\n  .intro__tagline {\n    font-size: 10px;\n    letter-spacing: 0.28em;\n    white-space: nowrap;\n  }\n  /* Headline: single line on phones too. Sized to fit\n     'Join the Waitlist.' on one row at 360-420px viewports. */\n  .intro__word {\n    font-size: clamp(28px, 7.6vw, 40px);\n    line-height: 1;\n  }\n  .intro__word--inline .line {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: baseline;\n    justify-content: center;\n    gap: 0.22em;\n    white-space: nowrap;\n  }\n  .intro__word--inline .word-row + .word-row {\n    margin-left: 0;\n  }\n  /* Tight vertical rhythm so license + Trustpilot + CTA + spots\n     stay visible above Safari's address bar. */\n  .intro__content {\n    padding-top: 56px;\n    /* Drop bottom padding so the Trustpilot pill can actually reach\n       the bottom of the viewport (just above Safari's URL bar). */\n    padding-bottom: env(safe-area-inset-bottom, 0px);\n    grid-template-rows: auto 1fr;\n  }\n  .intro__stack {\n    gap: 10px;\n  }\n  .intro__video {\n    max-width: min(86vw, 400px);\n  }\n  .intro__license {\n    font-size: 9px;\n    letter-spacing: 0.26em;\n    margin: 0;\n  }\n  /* Mobile pill stays its true size \u2014 already tightened in the 560px block above. */\n  /* Push ONLY the Trustpilot pill to the bottom. Keep the headline, video,\n     license, CTA, and spots in their original centered position. */\n  .intro__stack {\n    align-self: stretch;\n    height: 100%;\n    justify-content: center;\n    padding-bottom: 8px;\n    box-sizing: border-box;\n    position: relative;\n  }\n  .intro__trust {\n    position: absolute;\n    left: 50%;\n    bottom: 8px;\n    transform: translateX(-50%);\n    margin: 0;\n  }\n  .intro__cta {\n    padding: 11px 20px;\n    gap: 9px;\n  }\n  /* Force mobile font-size on BOTH CTAs and their text spans, beating the\n     desktop !important lock above. */\n  .intro__cta,\n  .intro__cta .intro__cta-text,\n  a.intro__cta,\n  a.intro__cta .intro__cta-text,\n  button.intro__cta,\n  button.intro__cta .intro__cta-text {\n    font-size: 11.5px !important;\n  }\n  .intro__cta-arrow { width: 20px; height: 20px; }\n  .intro__cta-arrow svg { width: 13px; height: 13px; }\n  .intro__cta-live { width: 12px; height: 12px; }\n  .intro__cta-live-dot { width: 7px; height: 7px; }\n  .intro__cta-wrap {\n    gap: 10px;\n  }\n  .intro__cta-row {\n    flex-direction: column;\n    gap: 8px;\n    width: 100%;\n  }\n  .intro__cta-row .intro__cta {\n    width: auto;\n    min-width: 172px;\n  }\n  .intro__spots {\n    font-size: 8.5px;\n    letter-spacing: 0.14em;\n  }\n\n  /* Mobile waitlist modal overrides are defined AFTER the desktop modal\n     section below so they win the cascade. See end of file. */\n}\n\n.intro__foot {\n  opacity: 0;\n  display: flex; align-items: center; gap: 18px;\n  font-size: 10px;\n  letter-spacing: 0.4em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.45);\n}\n.intro__foot-divider {\n  width: 36px; height: 1px;\n  background: rgba(255,255,255,0.25);\n}\n\n/* intro exit state */\n#intro.is-leaving { pointer-events: none; }\n#intro.is-gone { display: none; }\n\n\n/* ============ WAITLIST MODAL ============ */\n.wl-modal {\n  position: absolute;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition: opacity 400ms var(--ease-out), visibility 0s linear 400ms;\n}\n.wl-modal.is-open {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transition: opacity 400ms var(--ease-out);\n}\n.wl-modal__backdrop {\n  position: absolute; inset: 0;\n  background: rgba(0,0,0,0.65);\n  backdrop-filter: blur(16px);\n}\n.wl-modal__panel {\n  position: relative;\n  width: min(520px, 92vw);\n  max-height: 92vh;\n  overflow-y: auto;\n  background: #0d0d0d;\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 20px;\n  padding: clamp(28px, 4vw, 44px);\n  text-align: left;\n  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,107,26,0.15);\n  transform: translateY(24px) scale(0.98);\n  opacity: 0;\n  transition: transform 500ms var(--ease-out), opacity 400ms var(--ease-out);\n}\n.wl-modal.is-open .wl-modal__panel {\n  transform: translateY(0) scale(1);\n  opacity: 1;\n}\n.wl-modal__close {\n  position: absolute;\n  top: 16px; right: 16px;\n  width: 40px; height: 40px;\n  display: inline-flex; align-items: center; justify-content: center;\n  border-radius: 999px;\n  color: var(--ink-dim);\n  transition: background var(--transition-interactive), color var(--transition-interactive);\n}\n.wl-modal__close:hover {\n  background: rgba(255,255,255,0.06);\n  color: var(--ink);\n}\n\n.wl-modal__header { margin-bottom: 28px; }\n.wl-modal__eyebrow-full { display: inline; }\n.wl-modal__eyebrow-short { display: none; }\n@media (max-width: 640px) {\n  .wl-modal__eyebrow-full { display: none; }\n  .wl-modal__eyebrow-short { display: inline; }\n}\n.wl-modal__eyebrow {\n  display: inline-flex; align-items: center;\n  padding: 6px 12px;\n  border: 1px solid var(--line-strong);\n  border-radius: 999px;\n  font-size: 10px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  margin-bottom: 18px;\n}\n.wl-modal__title {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(36px, 5vw, 52px);\n  line-height: 0.95;\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  color: var(--ink);\n  margin-bottom: 12px;\n}\n.wl-modal__sub {\n  font-size: 14px;\n  line-height: 1.55;\n  color: var(--ink-dim);\n}\n\n.wl-form { display: flex; flex-direction: column; gap: 16px; }\n.wl-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  position: relative;\n}\n.wl-field__label {\n  font-size: 11px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  font-weight: 600;\n}\n.wl-field__optional {\n  color: var(--ink-muted);\n  letter-spacing: 0.05em;\n  text-transform: none;\n  font-weight: 400;\n  font-size: 10px;\n}\n.wl-field input {\n  width: 100%;\n  padding: 14px 16px;\n  background: #161616;\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  color: var(--ink);\n  font-family: inherit;\n  font-size: 15px;\n  transition: border-color var(--transition-interactive), background var(--transition-interactive);\n}\n.wl-field input::placeholder { color: var(--ink-muted); }\n.wl-field input:hover { border-color: var(--line-strong); }\n.wl-field input:focus {\n  outline: none;\n  border-color: var(--accent);\n  background: #1a1a1a;\n  box-shadow: 0 0 0 4px rgba(255,107,26,0.12);\n}\n.wl-field.is-invalid input {\n  border-color: #ff4d4d;\n  background: rgba(255,77,77,0.06);\n}\n.wl-field__error {\n  font-size: 11px;\n  color: #ff8080;\n  letter-spacing: 0.04em;\n  margin-top: 2px;\n  min-height: 14px;\n}\n\n.wl-submit {\n  position: relative;\n  display: flex; align-items: center; justify-content: center; gap: 10px;\n  width: 100%;\n  padding: 16px 22px;\n  margin-top: 8px;\n  background: var(--accent);\n  color: #0a0a0a;\n  font-weight: 700;\n  font-size: 15px;\n  letter-spacing: 0.02em;\n  border-radius: 999px;\n  cursor: pointer;\n  box-shadow: 0 14px 40px -10px rgba(255,107,26,0.55);\n  transition: background var(--transition-interactive), transform var(--transition-interactive), box-shadow var(--transition-interactive);\n}\n.wl-submit:hover:not(:disabled) {\n  background: #fff;\n  transform: translateY(-2px);\n}\n.wl-submit:disabled { cursor: not-allowed; }\n.wl-submit.is-loading .wl-submit__label { opacity: 0.4; }\n.wl-submit__spinner {\n  width: 16px; height: 16px;\n  border-radius: 999px;\n  border: 2px solid rgba(10,10,10,0.25);\n  border-top-color: #0a0a0a;\n  opacity: 0;\n  transition: opacity 200ms;\n}\n.wl-submit.is-loading .wl-submit__spinner {\n  opacity: 1;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.wl-form__fine {\n  margin-top: 12px;\n  font-size: 11px;\n  line-height: 1.5;\n  color: var(--ink-muted);\n  text-align: center;\n}\n\n.wl-success {\n  display: none;\n  text-align: center;\n  padding: 20px 0;\n}\n.wl-success.is-active { display: block; animation: fadeInUp 600ms var(--ease-out); }\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(12px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.wl-success__mark {\n  color: var(--accent);\n  margin: 0 auto 24px;\n  width: 52px;\n}\n.wl-success__mark circle { stroke-dasharray: 150.8; stroke-dashoffset: 150.8; animation: drawCircle 0.8s var(--ease-out) forwards; }\n.wl-success__mark path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawTick 0.5s var(--ease-out) 0.6s forwards; }\n@keyframes drawCircle { to { stroke-dashoffset: 0; } }\n@keyframes drawTick { to { stroke-dashoffset: 0; } }\n\n.wl-success h3 {\n  font-family: var(--font-display);\n  font-weight: 400;\n  font-size: clamp(32px, 4.5vw, 44px);\n  letter-spacing: -0.01em;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n  color: var(--ink);\n}\n.wl-success p {\n  color: var(--ink-dim);\n  font-size: 14px;\n  line-height: 1.55;\n  margin-bottom: 28px;\n}\n#continueBtn { margin: 0 auto; }\n\n.wl-form.is-hidden { display: none; }\n\n\n\n/* ===================== REDUCED MOTION ===================== */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n  .intro__bg { animation: none; }\n  .intro__word .letter { transform: none; }\n}\n\n/* Waitlist-only: body background (no site below) */\n/* scoped */\n\n\n/* ============ MOBILE WAITLIST MODAL OVERRIDES ============\n   Placed at the end of the file to beat the desktop modal rules in the cascade.\n   Uses compound selectors (.wl-modal .wl-modal__panel) to lift specificity. */\n@media (max-width: 640px) {\n  .wl-modal .wl-modal__panel {\n    width: 100vw;\n    max-width: 100vw;\n    height: 100vh;\n    height: 100dvh;\n    max-height: 100vh;\n    max-height: 100dvh;\n    border-radius: 0;\n    padding: 14px 16px 14px;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    border: 0;\n  }\n  .wl-modal .wl-modal__close {\n    top: 8px;\n    right: 8px;\n    width: 32px;\n    height: 32px;\n  }\n  .wl-modal .wl-modal__header {\n    margin-bottom: 10px;\n    padding-right: 40px;\n  }\n  .wl-modal .wl-modal__eyebrow {\n    display: inline-flex;\n    flex-wrap: nowrap;\n    white-space: nowrap;\n    font-size: 9px;\n    letter-spacing: 0.16em;\n    padding: 4px 9px;\n    margin-bottom: 8px;\n    max-width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .wl-modal .wl-modal__title {\n    font-size: clamp(28px, 7.8vw, 36px);\n    line-height: 0.95;\n    margin-bottom: 4px;\n  }\n  .wl-modal .wl-modal__sub {\n    font-size: 12px;\n    line-height: 1.35;\n  }\n  .wl-modal .wl-form { gap: 8px; flex: 0 0 auto; }\n  .wl-modal .wl-field { gap: 2px; }\n  .wl-modal .wl-field__label { font-size: 9.5px; letter-spacing: 0.14em; }\n  .wl-modal .wl-field__optional { font-size: 9px; }\n  .wl-modal .wl-field input[type=\"text\"],\n  .wl-modal .wl-field input[type=\"email\"],\n  .wl-modal .wl-field input[type=\"tel\"] {\n    padding: 9px 12px;\n    font-size: 14px;\n    min-height: 38px;\n  }\n  .wl-modal .wl-submit {\n    padding: 11px 16px;\n    margin-top: 2px;\n    min-height: 42px;\n    font-size: 14px;\n  }\n  .wl-modal .wl-form__fine {\n    font-size: 9.5px;\n    line-height: 1.35;\n    margin-top: 4px;\n  }\n}\n\n/* Short iPhone screens (SE, mini, etc.) \u2014 go even tighter */\n@media (max-width: 640px) and (max-height: 740px) {\n  .wl-modal .wl-modal__panel { padding: 10px 14px 10px; }\n  .wl-modal .wl-modal__header { margin-bottom: 6px; }\n  .wl-modal .wl-modal__eyebrow { margin-bottom: 6px; padding: 3px 8px; font-size: 8.5px; }\n  .wl-modal .wl-modal__title { font-size: 26px; margin-bottom: 2px; }\n  .wl-modal .wl-modal__sub { font-size: 11px; line-height: 1.3; }\n  .wl-modal .wl-form { gap: 6px; }\n  .wl-modal .wl-field { gap: 1px; }\n  .wl-modal .wl-field__label { font-size: 9px; }\n  .wl-modal .wl-field input[type=\"text\"],\n  .wl-modal .wl-field input[type=\"email\"],\n  .wl-modal .wl-field input[type=\"tel\"] { padding: 7px 11px; font-size: 13.5px; min-height: 34px; }\n  .wl-modal .wl-submit { padding: 9px 14px; min-height: 38px; font-size: 13.5px; }\n  .wl-modal .wl-form__fine { font-size: 9px; margin-top: 2px; }\n}\n\n\n\n/* =====================================================================\n   ============  MMT LANDING v2 \u00b7 SCROLLING SECTIONS  ==================\n   ===================================================================== */\n\n/* ================================================================\n   Panel structure v2 \u2014 CENTRED, snap-scroll, apply-style layout.\n   Each panel is min 100vh, content vertically + horizontally\n   centred inside a fixed max-width column. */\n.mmt-panel {\n  position: relative;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: clamp(126px, 15vh, 168px) clamp(24px, 5vw, 64px) clamp(72px, 10vh, 104px);\n  border-bottom: none;\n  text-align: center;\n  /* No scroll-snap \u2014 v2 lets the browser scroll normally to avoid the \"stuck\n     on section 1\" bug when overlay was fixed-positioned. */\n}\n.mmt-panel:first-of-type {\n  padding-top: calc(var(--ticker-h) + clamp(112px, 14vh, 152px));\n}\n.mmt-panel__inner {\n  width: 100%;\n  max-width: 1080px;\n  margin: 0 auto;\n  position: relative;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.mmt-panel--final { border-bottom: none; }\n\n/* Old .mmt-eyebrow (kept for backwards-compat but visually hidden \u2014\n   the new .mmt-panel__head bar replaces it) */\n.mmt-eyebrow { display: none; }\n\n.mmt-h2 {\n  font-family: var(--font-body);\n  font-size: clamp(32px, 5.2vw, 62px);\n  font-weight: 800;\n  line-height: 1.05;\n  letter-spacing: -0.02em;\n  color: var(--ink);\n  max-width: 20ch;\n  margin: 0 auto 18px;\n  text-align: center;\n}\n.mmt-sub {\n  font-family: var(--font-body);\n  font-size: clamp(16px, 1.4vw, 19px);\n  font-weight: 500;\n  line-height: 1.55;\n  color: var(--ink-dim);\n  max-width: 60ch;\n  margin: 0 auto;\n  text-align: center;\n}\n.mt-lg { margin-top: clamp(36px, 5vw, 64px); width: 100%; }\n.mt-sm { margin-top: 14px; }\n\n/* Snap-scroll removed \u2014 caused first-section lock on live overlay. */\n\n/* Section 1 headline variant: stack \"Your growth isn't broken.\" and \"It's locked.\"\n   left-aligned so \"It's locked.\" sits directly under \"Your\".\n   Compound selector beats the base `.mmt-h2 { margin: 0 auto }` centering. */\n.mmt-h2.mmt-h2--lock {\n  text-align: left;\n  max-width: 26ch;\n  margin-left: 0;\n  margin-right: auto;\n}\n\n/* Section 4 spacing: more room between headline and Queensland-farmer subhead. */\n.mmt-sub--roomy { margin-top: 18px; }\n\n/* Inline apply button variant used below the section-4 video.\n   Declared with compound selectors to beat both the base `.top-apply` (fixed\n   position, top-right pill) which is defined further down in this file, and\n   the `.top-apply` rule's specificity when both classes are on the same node. */\n.top-apply.top-apply--inline {\n  position: static;\n  top: auto;\n  right: auto;\n  margin: 0;\n  padding: 12px 22px;\n  font-size: 15px;\n}\n.learn-cta {\n  display: flex;\n  justify-content: center;\n  margin-top: clamp(28px, 4vw, 44px);\n}\n\n/* ASIC section: more space between the tile grid and the \"publicly verifiable\" fine print. */\n.mmt-fine.verify-fine,\n.verify-fine.mmt-fine {\n  margin-top: clamp(28px, 4vw, 48px);\n}\n\n/* Sections 2 & 3 \u2014 keep headlines on ONE line.\n   Widen max-width past the default 20ch and scale the type down slightly. */\n#s-certs .mmt-h2,\n#s-target .mmt-h2 {\n  max-width: none;\n  white-space: nowrap;\n  font-size: clamp(28px, 4.4vw, 54px);\n}\n@media (max-width: 820px) {\n  /* On narrow screens let them wrap rather than overflow the viewport. */\n  #s-certs .mmt-h2,\n  #s-target .mmt-h2 { white-space: normal; font-size: clamp(28px, 8vw, 42px); }\n}\n\n/* Target-panel result label: split \"current rate\" onto its own line so the\n   hero card feels symmetric with the inputs on the left. */\n.pt-hero-rate {\n  display: block;\n  margin-top: 4px;\n  font-size: 0.9em;\n  color: var(--ink-muted, #6b6b6b);\n  letter-spacing: 0.06em;\n}\n\n/* ============ Fixed top-right Apply button (aligned with .brand) ============ */\n.top-apply {\n  position: fixed;\n  /* Match .brand top calc so both sit on the same visual baseline. */\n  top: calc(var(--ticker-h) + clamp(16px, 2.6vh, 28px));\n  right: clamp(20px, 4vw, 46px);\n  z-index: 60;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  border-radius: 999px;\n  background: var(--accent, #ff6b1a);\n  color: #0a0a0a;\n  font-family: var(--font-body, \"Satoshi\", \"Inter\", system-ui, sans-serif);\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.02em;\n  text-decoration: none;\n  box-shadow: 0 8px 24px rgb(255 107 26 / 0.28), 0 1px 0 rgb(0 0 0 / 0.15) inset;\n  transition: transform 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1)),\n              box-shadow 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1)),\n              background 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1));\n}\n.top-apply:hover {\n  transform: translateY(-1px);\n  background: #ff8a4a;\n  box-shadow: 0 12px 28px rgb(255 107 26 / 0.38);\n}\n.top-apply__text { line-height: 1; }\n.top-apply__arrow {\n  display: inline-flex; align-items: center; justify-content: center;\n  width: 18px; height: 18px; line-height: 0;\n  transition: transform 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1));\n}\n.top-apply:hover .top-apply__arrow { transform: translateX(2px); }\n@media (max-width: 900px) {\n  .top-apply {\n    right: 16px;\n    top: calc(var(--ticker-h) + 10px);\n    padding: 8px 14px;\n    font-size: 13px;\n  }\n  .top-apply__arrow svg { width: 12px; height: 12px; }\n}\n\n/* ============ Section 1 Trustpilot pill (sits on the right column, directly\n     under the \"ALL FOUR OPEN\" fly-status pill inside `.fly-side`) ============\n   Extra top margin drops it ~46px lower so it aligns visually with the\n   \"Now you can become a funded trader\" green pill on the left column. */\n.fly-trust {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin: 61px 0 0;\n  padding: 8px 14px;\n  border-radius: 999px;\n  background: rgb(255 255 255 / 0.04);\n  border: 1px solid rgb(255 255 255 / 0.10);\n  color: var(--ink, #f5f5f4);\n  font-family: var(--font-body, \"Satoshi\", \"Inter\", system-ui, sans-serif);\n  font-size: 13px;\n  text-decoration: none;\n  opacity: 0;\n  transform: translateY(4px);\n  pointer-events: none;\n  align-self: flex-start;\n  transition: opacity 420ms var(--ease-out, cubic-bezier(0.16,1,0.3,1)) 250ms,\n              transform 420ms var(--ease-out, cubic-bezier(0.16,1,0.3,1)) 250ms,\n              background 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1));\n}\n.fly-trust__copy strong { font-weight: 700; }\n.fly-trust__stars { display: inline-flex; align-items: center; line-height: 0; }\n.fly-trust__label { color: var(--ink-dim, #a1a1a1); }\n.fly-trust__label strong { color: var(--ink, #f5f5f4); font-weight: 700; }\n.fly-trust__arrow { color: var(--accent, #ff6b1a); }\n.fly-trust:hover { background: rgb(255 255 255 / 0.07); }\n\n/* Reveal when script.js adds .all-open to .fly-wrap (fires at 4/4). */\n.fly-wrap.all-open .fly-trust {\n  opacity: 1;\n  transform: translateY(0);\n  pointer-events: auto;\n}\n\n@media (max-width: 720px) {\n  /* Reset the desktop 61px alignment hack (which was aligning the pill with\n     the funded-trader green pill on the left column). On mobile the columns\n     stack so no vertical alignment gap needs closing. */\n  .fly-trust { margin: 14px 0 0; gap: 8px; padding: 7px 12px; font-size: 12px; flex-wrap: wrap; justify-content: center; }\n  .fly-trust__stars svg { width: 72px; height: 13px; }\n}\n\n/* ============ Compliance footer (mirrors apply.makemoney.com.au) ============ */\n/* ============ Compliance footer (thin variant) ============\n   Uses the full page width with a wide 12px body copy so the disclaimer\n   fills the row rather than wrapping into a narrow column. Links sit inline\n   on the right, and the risk foot-note is a single line beneath. */\n.mmt-legal {\n  position: relative;\n  z-index: 2;\n  padding: 22px clamp(20px, 3vw, 40px) 18px;\n  background: #0a0a0a;\n  border-top: 1px solid rgb(255 255 255 / 0.08);\n  color: var(--ink-dim, #a1a1a1);\n  font-family: var(--font-body, \"Satoshi\", \"Inter\", system-ui, sans-serif);\n}\n.mmt-legal__inner {\n  max-width: none;\n  margin: 0;\n}\n.mmt-legal__block { margin: 0 0 12px; }\n.mmt-legal__eyebrow {\n  color: var(--accent, #ff6b1a);\n  font-family: \"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n  display: inline-block;\n  margin-right: 10px;\n}\n.mmt-legal__eyebrow-mark { opacity: 0.75; margin-right: 4px; }\n.mmt-legal__body {\n  color: rgb(255 255 255 / 0.62);\n  font-size: 11.5px;\n  line-height: 1.55;\n  max-width: none;\n  display: inline;\n}\n.mmt-legal__links {\n  list-style: none;\n  margin: 0; padding: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px 18px;\n}\n.mmt-legal__links a {\n  color: var(--ink, #f5f5f4);\n  text-decoration: none;\n  font-size: 11.5px;\n  transition: color 220ms var(--ease-out, cubic-bezier(0.16,1,0.3,1));\n}\n.mmt-legal__links a:hover { color: var(--accent, #ff6b1a); }\n.mmt-legal__foot {\n  border-top: 1px solid rgb(255 255 255 / 0.06);\n  margin-top: 10px;\n  padding-top: 8px;\n  color: rgb(255 255 255 / 0.38);\n  font-size: 10.5px;\n  line-height: 1.4;\n}\n\n/* .reveal \u2014 panels animate in on scroll (fallback: always visible) */\n.reveal { opacity: 1; }\n.reveal.is-in { opacity: 1; }\n\n/* Sticky ticker (persists across scroll) */\n.intro__ticker {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: var(--ticker-h);\n  z-index: 100;\n  background: rgba(0,0,0,0.88);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-bottom: 1px solid var(--line);\n  overflow: hidden;\n  opacity: 1;\n}\n\n/* =====================================================================\n   SECTION 1 \u00b7 LOCKED FLYWHEEL\n   ===================================================================== */\n.fly-wrap {\n  display: grid;\n  grid-template-columns: 1.05fr 1fr;\n  gap: 42px;\n  align-items: center;\n  text-align: left; /* content inside the wrap keeps its own alignment */\n  width: 100%;\n  max-width: 980px;\n  margin: 0 auto;\n}\n@media (max-width: 980px) {\n  .fly-wrap { grid-template-columns: 1fr; gap: 32px; }\n}\n\n.fly-stage {\n  position: relative;\n  padding: 24px;\n}\n.wheel {\n  position: relative;\n  width: min(400px, 78vw);\n  margin: 0 auto;\n  aspect-ratio: 1;\n}\n.wheel svg { width: 100%; height: 100%; overflow: visible; }\n.wheel .spinner {\n  transform-origin: 120px 120px;\n  animation: mmt-turn 26s linear infinite;\n  animation-play-state: paused;\n}\n.wheel[data-open=\"1\"] .spinner { animation-duration: 15s; animation-play-state: running; }\n.wheel[data-open=\"2\"] .spinner { animation-duration: 9s;  animation-play-state: running; }\n.wheel[data-open=\"3\"] .spinner { animation-duration: 5s;  animation-play-state: running; }\n.wheel[data-open=\"4\"] .spinner { animation-duration: 2.4s; animation-play-state: running; }\n@keyframes mmt-turn { to { transform: rotate(360deg); } }\n\n.wheel .hubv {\n  font-family: var(--font-num);\n  font-size: 30px;\n  font-weight: 700;\n  fill: var(--ink);\n}\n.wheel .hubv.done {\n  font-size: 19px;\n  fill: hsl(150 68% 55%);\n}\n.wheel .hubk {\n  font-size: 11px;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  fill: var(--ink-dim);\n  font-weight: 700;\n}\n.wheel .hubk.done {\n  font-size: 13px;\n  letter-spacing: 0.02em;\n  text-transform: none;\n  fill: hsl(150 68% 55%);\n}\n\n.wheel-money {\n  margin-top: 20px;\n  text-align: center;\n  opacity: 0;\n  transform: translateY(6px);\n  transition: opacity 400ms var(--ease-out), transform 400ms var(--ease-out);\n}\n.wheel-money.on { opacity: 1; transform: translateY(0); }\n.wm-v {\n  font-family: var(--font-num);\n  font-size: clamp(28px, 4vw, 44px);\n  font-weight: 800;\n  color: hsl(150 68% 55%);\n  letter-spacing: -0.02em;\n}\n.wm-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n  padding: 6px 12px;\n  border: 1px solid rgba(39, 201, 138, 0.28);\n  background: rgba(39, 201, 138, 0.08);\n  border-radius: 999px;\n  color: hsl(150 68% 75%);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  opacity: 0;\n  transition: opacity 400ms var(--ease-out) 200ms;\n}\n.wm-badge.on { opacity: 1; }\n.wm-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: hsl(150 68% 55%);\n  animation: mmt-pulse 1.8s ease-in-out infinite;\n}\n@keyframes mmt-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.4; }\n}\n\n.fly-side {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.locks {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.lock {\n  --lc: #27c98a;\n  display: grid;\n  grid-template-columns: 44px 1fr auto;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  color: var(--ink);\n  cursor: pointer;\n  transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out);\n  text-align: left;\n  font-family: var(--font-body);\n}\n.lock:hover { background: var(--card-2); border-color: var(--border-2); }\n.lock .ico {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background: rgba(255,255,255,0.04);\n  color: var(--ink-dim);\n  transition: background 300ms var(--ease-out), color 300ms var(--ease-out);\n}\n.lock[aria-pressed=\"true\"] .ico {\n  background: rgba(39, 201, 138, 0.15);\n  color: var(--lc);\n}\n.lock .body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }\n.lock .t {\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--ink);\n  letter-spacing: -0.005em;\n}\n.lock .d {\n  font-size: 12.5px;\n  color: var(--ink-dim);\n  line-height: 1.35;\n}\n.lock .d small { font-size: 11px; opacity: 0.8; }\n.lock .state {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--ink-muted);\n  padding: 4px 10px;\n  border: 1px solid var(--border);\n  border-radius: 999px;\n  white-space: nowrap;\n  transition: color 300ms var(--ease-out), border-color 300ms var(--ease-out), background 300ms var(--ease-out);\n}\n.lock[aria-pressed=\"true\"] .state {\n  color: var(--lc);\n  border-color: rgba(39, 201, 138, 0.35);\n  background: rgba(39, 201, 138, 0.08);\n}\n\n.fly-status {\n  padding: 14px 16px;\n  border: 1px solid var(--line);\n  border-radius: 12px;\n  background: rgba(255,255,255,0.02);\n  transition: border-color 400ms var(--ease-out), background 400ms var(--ease-out);\n}\n.fly-status.full {\n  border-color: rgba(39, 201, 138, 0.35);\n  background: rgba(39, 201, 138, 0.06);\n}\n.fly-status .cnt {\n  font-family: var(--font-num);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  margin-bottom: 4px;\n}\n.fly-status.full .cnt { color: hsl(150 68% 65%); }\n.fly-status .msg {\n  font-size: 14px;\n  color: var(--ink);\n  line-height: 1.4;\n}\n\n/* =====================================================================\n   SECTION 2 \u00b7 CERT WALL\n   ===================================================================== */\n.certs-wall {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.cw-group { display: flex; flex-direction: column; gap: 10px; }\n.cw-label {\n  font-family: var(--font-body);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n  padding: 0 4px;\n}\n.cw-row {\n  position: relative;\n  overflow: hidden;\n  border-radius: 10px;\n  height: 148px;\n  mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);\n  -webkit-mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);\n}\n@media (max-width: 720px) {\n  .cw-row { height: 108px; }\n}\n.cw-track {\n  display: flex;\n  gap: 14px;\n  height: 100%;\n  width: max-content;\n  animation: mmt-marquee var(--cw-dur, 60s) linear infinite;\n  animation-delay: var(--cw-delay, 0s);\n  will-change: transform;\n}\n.cw-row.rev .cw-track { animation-direction: reverse; }\n@keyframes mmt-marquee {\n  from { transform: translateX(0); }\n  to { transform: translateX(-50%); }\n}\n.cw-row:hover .cw-track { animation-play-state: paused; }\n\n.cert {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  aspect-ratio: 4 / 3;\n  padding: 0;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--card);\n  overflow: hidden;\n  cursor: zoom-in;\n  transition: border-color 200ms var(--ease-out), transform 200ms var(--ease-out);\n  flex-shrink: 0;\n}\n.cert:hover {\n  border-color: var(--accent);\n  transform: translateY(-2px);\n}\n.cert img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.cert-paid {\n  border-color: rgba(39, 201, 138, 0.32);\n}\n\n.cw-hint {\n  margin-top: 14px;\n  font-size: 12px;\n  color: var(--ink-muted);\n  text-align: center;\n}\n\n/* Cert lightbox \u2014 native <dialog> in the browser's top-layer.\n   Default <dialog> styling is unstyled and centered; we override to make it\n   a full-viewport panel that matches the previous overlay design. */\n.cert-box[open] {\n  position: fixed;\n  inset: 0;\n  max-width: 100vw;\n  max-height: 100vh;\n  width: 100vw;\n  height: 100vh;\n  border: 0;\n  padding: 40px;\n  margin: 0;\n  background: rgba(0,0,0,0.92);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: zoom-out;\n  z-index: 9998; /* Only relevant for the legacy [open] fallback path. */\n}\n.cert-box::backdrop {\n  background: rgba(0,0,0,0.92);\n}\n/* Legacy fallback: some older browsers don't support <dialog>; script sets\n   the `open` attribute so [open] still styles it. */\n.cert-box:not([open]) { display: none; }\n.cert-box img {\n  max-width: min(1080px, 92vw);\n  max-height: 86vh;\n  object-fit: contain;\n  border-radius: 12px;\n  box-shadow: 0 40px 120px rgba(0,0,0,0.6);\n}\n.cert-x {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 42px;\n  height: 42px;\n  border-radius: 999px;\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.2);\n  color: #fff;\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cert-x:hover { background: rgba(255,255,255,0.18); }\n\n/* =====================================================================\n   SECTION 3 \u00b7 PROFIT TARGET CALCULATOR\n   ===================================================================== */\n.target-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n  align-items: center;\n  width: 100%;\n  max-width: 900px;\n  margin: 0 auto;\n  text-align: left;\n}\n@media (max-width: 820px) {\n  .target-grid { grid-template-columns: 1fr; gap: 24px; }\n\n}\n\n.target-inputs {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.fld {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.fld-l {\n  font-family: var(--font-body);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n}\n.fld-w {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: stretch;\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  background: var(--card);\n  overflow: hidden;\n  transition: border-color 200ms var(--ease-out);\n}\n.fld-w:focus-within { border-color: var(--accent); }\n.fld-w input {\n  border: 0;\n  background: transparent;\n  color: var(--ink);\n  font-family: var(--font-num);\n  font-size: 22px;\n  font-weight: 700;\n  padding: 14px 16px 14px 4px;\n  outline: none;\n  width: 100%;\n  letter-spacing: -0.01em;\n}\n.fld-c {\n  padding: 14px 6px 14px 16px;\n  color: var(--ink-dim);\n  font-family: var(--font-num);\n  font-size: 22px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n}\n.fld-c-r {\n  order: 2;\n  padding: 14px 16px 14px 6px;\n}\n.fld-w:has(.fld-c-r) { grid-template-columns: 1fr auto; }\n.fld-w:has(.fld-c-r) input { padding: 14px 4px 14px 16px; }\n\n.pt-fine {\n  margin: 4px 2px 0;\n  font-size: 12px;\n  color: var(--ink-muted);\n}\n\n.pt-hero {\n  padding: 32px;\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  background: linear-gradient(140deg, rgba(255,107,26,0.10) 0%, rgba(255,107,26,0.02) 60%);\n  text-align: center;\n}\n.pt-hero-v {\n  font-family: var(--font-num);\n  font-size: clamp(40px, 6vw, 68px);\n  font-weight: 800;\n  color: var(--accent);\n  letter-spacing: -0.02em;\n  line-height: 1;\n}\n.pt-hero-d {\n  margin-top: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n}\n\n/* =====================================================================\n   SECTION 5 \u00b7 VERIFY GRID\n   ===================================================================== */\n.verify-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n@media (max-width: 720px) {\n  .verify-grid { grid-template-columns: 1fr; }\n}\n\n.vf {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 28px;\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  background: var(--card);\n  color: var(--ink);\n  text-decoration: none;\n  transition: border-color 200ms var(--ease-out), background 200ms var(--ease-out), transform 200ms var(--ease-out);\n}\n.vf-link:hover, .vf-link:focus-visible {\n  border-color: var(--accent);\n  background: var(--card-2);\n  transform: translateY(-2px);\n}\n.vf-ico {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: rgba(255,107,26,0.1);\n  color: var(--accent);\n  margin-bottom: 8px;\n}\n.vf-k {\n  font-family: var(--font-body);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--ink-dim);\n}\n.vf-v {\n  font-family: var(--font-num);\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--ink);\n  letter-spacing: -0.01em;\n  margin: 2px 0;\n}\n.vf-d {\n  font-size: 14px;\n  color: var(--ink-dim);\n  line-height: 1.45;\n  margin: 4px 0 12px;\n}\n.vf-go {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: var(--accent);\n  margin-top: auto;\n}\n\n/* =====================================================================\n   MOBILE SPECIFICS\n   ===================================================================== */\n@media (max-width: 720px) {\n  .mmt-panel {\n    min-height: auto;\n    /* Panel-head eyebrow hidden on mobile \u2014 tighter top padding since we\n       don't need to clear the absolute head bar anymore. */\n    padding: clamp(72px, 10vh, 96px) 18px clamp(40px, 6vh, 60px);\n  }\n  .mmt-panel:first-of-type { padding-top: calc(var(--ticker-h) + 84px); }\n  /* Base mobile headline size \u2014 tuned so 3-word phrases like \"per trading day.\",\n     \"Make Money.\", and \"Verification and licensing.\" stay on ONE line at 390px. */\n  .mmt-h2 {\n    font-size: 24px;\n    max-width: 100%;\n    letter-spacing: -0.025em;\n    /* Extra room between headline and \"The data behind the goal\u2026\" sub. */\n    margin-bottom: 24px;\n  }\n  /* S3 only: force the accent phrase (\"per trading day.\") onto its own\n     line so the two-word first line + three-word second line reads clean. */\n  #s-target .mmt-h2 .accent { display: block; }\n  /* S4: keep \"Learn money, Make Money.\" inline on ONE line at mobile. */\n  #s-learn .mmt-h2 { font-size: 22px; white-space: nowrap; }\n  .mmt-sub { font-size: 15px; margin-top: 8px; }\n  .pt-hero { padding: 22px; }\n  .fld-w input, .fld-c { font-size: 17px; padding-top: 11px; padding-bottom: 11px; }\n\n  /* Hide market ticker on mobile \u2014 no room and it fights with the logo\n     and Apply button in the small header row. */\n  .intro__ticker { display: none; }\n  html { --ticker-h: 0px; }\n\n  /* Prevent horizontal overflow from marquee rows */\n  html, body, #mmt-waitlist-gate { overflow-x: hidden; }\n\n  /* Top-right Apply: tighter footprint clear of the logo on narrow phones */\n  .top-apply { top: 12px; right: 12px; padding: 7px 12px; font-size: 12.5px; }\n  .brand { top: 14px; left: 14px; }\n  .brand img { width: 96px; }\n\n  /* ===== FLYWHEEL / LOCKS COMPACT MOBILE ===== */\n  /* S1 headline: put \"broken. It's locked.\" on ONE line by dropping the\n     <br /> and shrinking the font so it fits in 356px inner width. */\n  /* S1 headline \u2014 user 2026-08-12 wants \"It's locked.\" on its own line.\n     Keep the <br /> visible on mobile; size at 24px to match other H2s. */\n  .mmt-h2.mmt-h2--lock {\n    font-size: 24px;\n    line-height: 1.15;\n    letter-spacing: -0.025em;\n    max-width: 100%;\n    text-align: center;\n    margin-left: auto;\n  }\n\n  /* Shrink the Strategy / Systems / Software / Support cards so the wheel\n     and all four locks fit within a single mobile viewport. */\n  .locks { gap: 6px; }\n  .lock { grid-template-columns: 30px 1fr auto; gap: 10px; padding: 8px 12px; border-radius: 10px; }\n  .lock .ico { width: 28px; height: 28px; border-radius: 8px; }\n  .lock .ico svg { width: 16px; height: 16px; }\n  .lock .t { font-size: 13px; line-height: 1.2; }\n  .lock .d { font-size: 11px; line-height: 1.25; }\n  .lock .d small { font-size: 10px; }\n  .lock .state { font-size: 8.5px; padding: 2px 7px; letter-spacing: 0.14em; }\n\n  /* Center the flywheel visual on mobile. Grid children get place-items so\n     both axes are locked. The wheel is fluid within a 240px box, itself\n     centered inside a 100%-wide stage. */\n  .fly-wrap {\n    grid-template-columns: 1fr;\n    place-items: center;\n    gap: 20px;\n  }\n  .fly-stage {\n    width: 100%;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .fly-stage .wheel {\n    width: 240px;\n    max-width: 72vw;\n    margin: 0 auto;\n  }\n  .fly-stage .wheel svg { width: 100%; height: auto; display: block; }\n  .fly-side { width: 100%; }\n  .fly-status { padding: 10px 12px; }\n\n  /* Compact \"NOW YOU CAN BECOME A FUNDED TRADER\" pill so it fits on ONE line. */\n  .wheel-money { margin-top: 12px; }\n  .wm-v { font-size: 26px; }\n  .wm-badge {\n    font-size: 9px;\n    letter-spacing: 0.08em;\n    padding: 5px 10px;\n    gap: 6px;\n    white-space: nowrap;\n    margin-top: 6px;\n  }\n\n  /* Trustpilot pill under \"ALL FOUR OPEN\" \u2014 shrink so it stays on ONE line. */\n  .fly-trust {\n    font-size: 10.5px;\n    padding: 6px 10px;\n    gap: 6px;\n    flex-wrap: nowrap;\n    white-space: nowrap;\n  }\n  .fly-trust__stars svg { width: 60px; height: 11px; }\n\n  /* Waitlist CTAs: stack vertically to prevent overlap */\n  .intro__cta-row { flex-direction: column; align-items: center; gap: 12px; }\n  .intro__cta { width: 100%; max-width: 340px; justify-content: center; }\n  /* Push Trustpilot pill well below the stacked CTAs. Original stacking\n     had Trust pill drawing over Free Course. */\n  .intro__trust { margin-top: 22px; position: relative; z-index: 2; }\n\n  /* ===== CERT LIGHTBOX \u2014 CENTER ON MOBILE ===== */\n  /* Mobile Safari sometimes fails to center a full-viewport <dialog>\n     when it uses `inset: 0` plus flex \u2014 the image drifts off-center.\n     Force it explicitly with dvh and safe-area padding. */\n  .cert-box[open] {\n    padding: 20px;\n    width: 100vw;\n    height: 100dvh;\n    max-height: 100dvh;\n  }\n  .cert-box img {\n    max-width: 92vw;\n    max-height: 78dvh;\n    margin: auto;\n  }\n  .cert-x { top: 14px; right: 14px; width: 38px; height: 38px; font-size: 20px; }\n}\n";
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
  /* CTA shows the upcoming intake month (auto-rolls on the 1st, Sydney time).
     The LIVE pulse stays as part of the button. */
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
  tl.to(".intro__video", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.4");

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
  tl.to(".intro__license", { opacity: 1, duration: 0.6 }, "-=0.5");
  tl.to(".intro__cta", { opacity: 1, duration: 0.6, onComplete: () => {
    document.querySelector(".intro__cta").classList.add("is-visible");
  }}, "-=0.3");
  tl.to(".intro__spots", { opacity: 1, duration: 0.7 }, "-=0.3");
  tl.to(".intro__trust", { opacity: 1, duration: 0.6 }, "-=0.4");

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

/* ---------- INTRO TRIGGERS ----------
   NOTE: 2026-07-12 — the primary CTA now navigates directly to Calendly in a
   new tab (see index.html). The in-page waitlist modal is intentionally NOT
   bound to the click event anymore. Modal open/close code is preserved below
   so it can be re-enabled instantly by re-binding the click handler here. */
function wireIntroTriggers() {
  document.addEventListener("keydown", (e) => {
    const waitlistModal = document.getElementById("waitlistModal");
    if (!waitlistModal) return;
    const modalOpen = waitlistModal.classList.contains("is-open");
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


/* =====================================================================
   =============  MMT LANDING v2 · SCROLLING SECTION MODULES  ==========
   Everything below is additive. It powers the six new sections
   (flywheel · certs · target calc · verify) and does not touch the
   existing intro / ticker / waitlist logic above.
   ===================================================================== */

const $$$ = (sel, root = document) => root.querySelector(sel);
const $$$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
function elN(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}

/* ============ Icons (accent green for locks so the wheel is calming, not aggressive) ============ */
const GRN = "#27c98a";
const LOCK_CLOSED = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const LOCK_OPEN   = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/></svg>';

/* ============ SECTION 1 · LOCKED FLYWHEEL ============ */
const LOCKS = [
  { id: 'strategy', label: 'Strategy', hue: GRN, pain: 'No defined edge',       fix: 'A proven process backed by data.' },
  { id: 'systems',  label: 'Systems',  hue: GRN, pain: 'No repeatable routine', fix: 'Fundamentals, technicals and risk models.' },
  { id: 'software', label: 'Software', hue: GRN, pain: 'Trading blind',         fix: 'TradeHub + MMT-Algo scanning the markets.' },
  { id: 'support',  label: 'Support',  hue: GRN, pain: 'Figuring it out alone', fix: 'Live sessions with authorised advisors every 48 hours <small>(besides Saturday)</small>' },
];

function initFlywheel() {
  const wheel = $$$('#wheel');
  const spokes = $$$('#wheel-spokes');
  const locksBox = $$$('#locks');
  if (!wheel || !spokes || !locksBox) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const CIRC = 2 * Math.PI * 92;
  const SEG = CIRC / 4;
  const open = new Set();

  // one coloured quarter-arc + one node per lock
  LOCKS.forEach((l, i) => {
    const seg = document.createElementNS(SVGNS, 'circle');
    seg.setAttribute('cx', 120); seg.setAttribute('cy', 120); seg.setAttribute('r', 92);
    seg.setAttribute('fill', 'none'); seg.setAttribute('stroke', l.hue);
    seg.setAttribute('stroke-width', 14); seg.setAttribute('stroke-linecap', 'butt');
    seg.setAttribute('transform', 'rotate(' + (-90 + i * 90) + ' 120 120)');
    seg.setAttribute('stroke-dasharray', '0 ' + CIRC);
    seg.setAttribute('data-seg', l.id);
    seg.style.transition = 'stroke-dasharray .7s cubic-bezier(.22,1,.36,1)';
    spokes.appendChild(seg);

    const a = (-90 + i * 90) * Math.PI / 180;
    const node = document.createElementNS(SVGNS, 'circle');
    node.setAttribute('cx', 120 + 92 * Math.cos(a));
    node.setAttribute('cy', 120 + 92 * Math.sin(a));
    node.setAttribute('r', 9);
    node.setAttribute('fill', '#0a0a0a');
    node.setAttribute('stroke', '#2a2a2a');
    node.setAttribute('stroke-width', 2);
    node.setAttribute('data-node', l.id);
    node.style.transition = 'fill .4s ease, stroke .4s ease';
    spokes.appendChild(node);
  });

  LOCKS.forEach(l => {
    const b = elN('button', 'lock');
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.style.setProperty('--lc', l.hue);
    b.innerHTML =
      '<span class="ico">' + LOCK_CLOSED + '</span>' +
      '<span class="body"><span class="t">' + l.label + '</span><span class="d">' + l.pain + '</span></span>' +
      '<span class="state">Locked</span>';
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') === 'true';
      b.setAttribute('aria-pressed', String(!on));
      b.querySelector('.ico').innerHTML = !on ? LOCK_OPEN : LOCK_CLOSED;
      b.querySelector('.d').innerHTML = !on ? l.fix : l.pain;
      b.querySelector('.state').textContent = !on ? 'Open' : 'Locked';
      const node = spokes.querySelector('[data-node="' + l.id + '"]');
      node.setAttribute('fill', !on ? l.hue : '#0a0a0a');
      node.setAttribute('stroke', !on ? l.hue : '#2a2a2a');
      spokes.querySelector('[data-seg="' + l.id + '"]')
        .setAttribute('stroke-dasharray', !on ? SEG.toFixed(1) + ' ' + CIRC.toFixed(1) : '0 ' + CIRC.toFixed(1));
      on ? open.delete(l.id) : open.add(l.id);
      syncWheel();
    });
    locksBox.appendChild(b);
  });

  const MSG = [
    'Tap a lock. Nothing moves until you open one.',
    'It turns — but barely. Every locked stage caps the whole wheel.',
    'Better. Still two things holding the momentum back.',
    'Close. One lock is still capping everything else.',
    '',
  ];

  let moneyRun = null;
  function runMoney() {
    const box = $$$('#wheel-money');
    const out = $$$('#wm-v');
    if (!box || !out) return;
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('on'));
    cancelAnimationFrame(moneyRun);
    const t0 = performance.now();
    const dur = 2600;
    const fmt = new Intl.NumberFormat('en-AU');
    const step = (t) => {
      const e = Math.min(1, (t - t0) / dur);
      const k = 1 - Math.pow(1 - e, 3);
      out.textContent = '$' + fmt.format(Math.round(100000 * k));
      if (e < 1) {
        moneyRun = requestAnimationFrame(step);
        return;
      }
      const badge = $$$('#wm-badge');
      if (badge) badge.classList.add('on');
    };
    moneyRun = requestAnimationFrame(step);
  }
  function stopMoney() {
    const box = $$$('#wheel-money');
    cancelAnimationFrame(moneyRun);
    const badge = $$$('#wm-badge');
    if (badge) badge.classList.remove('on');
    if (box) {
      box.classList.remove('on');
      box.hidden = true;
      const v = $$$('#wm-v');
      if (v) v.textContent = '$0';
    }
  }

  function syncWheel() {
    const n = open.size;
    wheel.dataset.open = n;
    const hv = $$$('#wheel-count');
    const hk = $$$('#wheel-hubk');
    if (hv) {
      hv.textContent = n === 4 ? 'Profitable' : (n + '/4');
      hv.classList.toggle('done', n === 4);
    }
    if (hk) {
      hk.textContent = n === 4 ? 'Trader' : 'Unlocked';
      hk.classList.toggle('done', n === 4);
    }
    const cnt = $$$('#fly-count');
    const msg = $$$('#fly-msg');
    const status = $$$('#fly-status');
    if (cnt) cnt.textContent = n === 4 ? 'ALL FOUR OPEN' : (n + '/4 UNLOCKED');
    if (msg) msg.textContent = MSG[n];
    if (status) status.classList.toggle('full', n === 4);
    /* Toggle .all-open on the flywheel wrap so the Trustpilot pill reveals
       even in browsers without :has() support. */
    const wrap = wheel.closest('.fly-wrap');
    if (wrap) wrap.classList.toggle('all-open', n === 4);
    n === 4 ? runMoney() : stopMoney();
  }
}

/* ============ SECTION 2 · CERTIFICATE WALL ============
   Halving decision (per user 2026-08-12): show ~half of the accelerator's
   walls — 1 marquee row of payouts (8 tiles) and 3 marquee rows of certs
   (28 tiles) = 4 rows, "first four lines". */
const CW_ASSETS = {
  payouts: Array.from({ length: 8 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { src: 'https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@main/assets/payouts/p' + n + '.webp', label: 'Payout certificate ' + n, paid: true };
  }),
  certs: Array.from({ length: 28 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { src: 'https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@main/assets/certs/c' + n + '.webp', label: 'Funded trader certificate ' + n };
  }),
};

function initCertsWall() {
  const wall = $$$('#certs');
  if (!wall) return;

  /* Cert lightbox: use native <dialog> so it renders in the browser's top-layer.
     A plain fixed div can be trapped inside a parent stacking context (Wix
     wrappers do this), which is why the lightbox appeared to "not open" on
     the live site even though the DOM/CSS looked correct. */
  let certBox = null;
  function openCert(c) {
    if (!certBox) {
      certBox = document.createElement('dialog');
      certBox.className = 'cert-box';
      certBox.innerHTML = '<button class="cert-x" type="button" aria-label="Close">\u00d7</button><img alt="" />';
      certBox.addEventListener('click', e => {
        if (e.target === certBox || e.target.closest('.cert-x')) {
          certBox.classList.remove('on');
          try { certBox.close(); } catch (_) {}
        }
      });
      certBox.addEventListener('close', () => certBox.classList.remove('on'));
      document.body.appendChild(certBox);
    }
    certBox.querySelector('img').src = c.src;
    certBox.querySelector('img').alt = c.label;
    certBox.classList.add('on');
    try {
      /* showModal renders in the browser's top-layer, immune to ancestor
         stacking contexts. Fall back to legacy show() if unsupported. */
      if (typeof certBox.showModal === 'function') certBox.showModal();
      else certBox.setAttribute('open', '');
    } catch (_) {
      certBox.setAttribute('open', '');
    }
  }

  const tile = (c, eager) => {
    const b = elN('button', 'cert' + (c.paid ? ' cert-paid' : ''));
    b.type = 'button';
    b.setAttribute('aria-label', 'Enlarge ' + c.label);
    b.innerHTML = '<img src="' + c.src + '" alt="' + c.label + '"' +
      (eager ? '' : ' loading="lazy"') + ' decoding="async" />';
    b.addEventListener('click', () => openCert(c));
    return b;
  };

  const buildGroup = (items, rowCount, label, eagerRows) => {
    const g = elN('div', 'cw-group');
    if (label) g.appendChild(elN('div', 'cw-label', label));
    const per = Math.ceil(items.length / rowCount);
    for (let r = 0; r < rowCount; r++) {
      const slice = items.slice(r * per, (r + 1) * per);
      if (!slice.length) break;
      const row = elN('div', 'cw-row' + (r % 2 ? ' rev' : ''));
      const track = elN('div', 'cw-track');
      const off = r % Math.max(slice.length, 1);
      const seq = slice.slice(off).concat(slice.slice(0, off));
      track.style.setProperty('--cw-dur', (seq.length * 5.2) + 's');
      track.style.setProperty('--cw-delay', (-r * 3.1) + 's');
      const eager = r < eagerRows;
      seq.forEach(c => track.appendChild(tile(c, eager)));
      seq.forEach(c => {
        const d = tile(c, false);
        d.setAttribute('aria-hidden', 'true');
        d.tabIndex = -1;
        track.appendChild(d);
      });
      row.appendChild(track);
      g.appendChild(row);
    }
    return g;
  };

  wall.innerHTML = '';
  // 1 row of payouts (paid-out traders first)
  wall.appendChild(buildGroup(CW_ASSETS.payouts, 1, '', 1));
  // 3 rows of funded certificates
  // Divider label removed per 2026-08-12 user request (was: 'Funded · verified funded accounts').
  wall.appendChild(buildGroup(CW_ASSETS.certs, 3, '', 2));

  const hint = $$$('#cw-hint');
  if (hint) hint.textContent = CW_ASSETS.payouts.length + ' payout certificates · ' +
    CW_ASSETS.certs.length + ' verified funded accounts · tap any one to enlarge';
}

/* ============ SECTION 3 · PROFIT TARGET CALCULATOR ============
   AUD/USD rate hardcoded at 0.7062 (per user 2026-08-12) — no live fetch.
   Label reads "current rate" (not "live rate"). */
const AUD_USD_RATE = 0.7062;

function initProfitTarget() {
  const wageEl = $$$('#pt-wage');
  const pctEl  = $$$('#pt-pct');
  if (!wageEl || !pctEl) return;
  const DAYS = 252;

  const num = (v) => {
    const n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
    return isFinite(n) ? n : 0;
  };
  const usd2 = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function render() {
    const wage = num(wageEl.value);
    const pct  = num(pctEl.value);
    const targetAnnual = wage * (pct / 100);
    const dailyAud = targetAnnual / DAYS;
    const dailyUsd = dailyAud * AUD_USD_RATE;
    const daily = $$$('#pt-daily-usd');
    const rate  = $$$('#pt-rate');
    if (daily) daily.textContent = usd2(dailyUsd);
    if (rate)  rate.innerHTML = 'USD per trading day<br /><span class="pt-hero-rate">current rate ' + AUD_USD_RATE.toFixed(4) + ' AUD/USD</span>';
  }

  function commaFormat(el) {
    const raw = el.value.replace(/[^0-9]/g, '');
    el.value = raw ? Number(raw).toLocaleString('en-AU') : '';
  }

  wageEl.addEventListener('input', () => { commaFormat(wageEl); render(); });
  pctEl.addEventListener('input', () => {
    pctEl.value = pctEl.value.replace(/[^0-9]/g, '');
    render();
  });

  render();
}

/* ============ SECTION 5 · ASIC VERIFICATION GRID ============ */
const VERIFY = [
  ['shield', 'Australian Financial Services Licence', 'AFSL #460940',
   'This licence permits regulated financial services in Australia.',
   'https://service.asic.gov.au/search/RepresentativeDetail?PermissionType=Australian%20financial%20services%20authorised%20representatives&RepNumber=001309212'],
  ['badge', 'Authorised Representative', 'AR #1310836',
   'We operate as authorised representative under it.',
   'https://service.asic.gov.au/search/RepresentativeDetail?PermissionType=Australian%20financial%20services%20authorised%20representatives&RepNumber=001310836'],
];
const VICO = {
  shield: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6l7.4 3v6.1c0 4.4-3 7.9-7.4 9.7-4.4-1.8-7.4-5.3-7.4-9.7V5.6z"/><path d="M8.8 12.1l2.2 2.2 4.2-4.5"/></svg>',
  badge:  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.4"/><path d="M9 13.6L7.6 21.4 12 19.3l4.4 2.1L15 13.6"/></svg>',
};

function initVerifyGrid() {
  const grid = $$$('#verify-grid');
  if (!grid) return;
  grid.innerHTML = '';
  VERIFY.forEach(([ic, k, v, d, href]) => {
    const a = elN('a', 'vf vf-link');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML =
      '<span class="vf-ico">' + (VICO[ic] || '') + '</span>' +
      '<span class="vf-k">' + k + '</span>' +
      '<span class="vf-v">' + v + '</span>' +
      '<span class="vf-d">' + d + '</span>' +
      '<span class="vf-go">Verify on ASIC ' +
      '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</span>';
    grid.appendChild(a);
  });
}

/* ============ Scroll progress bar ============ */
function initScrollProgress() {
  const fill = document.getElementById('scroll-progress-fill');
  if (!fill) return;
  let raf = null;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
    fill.style.width = pct + '%';
    raf = null;
  };
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}

/* ============ Right-side dot rail + active-section tracking ============ */
function initNavRail() {
  const rail = document.getElementById('rail');
  const panels = Array.from(document.querySelectorAll('.mmt-panel'));
  if (!rail || !panels.length) return;

  // Build the dot buttons
  panels.forEach((panel, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Go to section ${i + 1}: ${panel.dataset.label || ''}`);
    btn.dataset.target = panel.id;
    btn.innerHTML = `<span class="lbl">${panel.dataset.label || ''}</span><span class="dot" aria-hidden="true"></span>`;
    btn.addEventListener('click', () => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    rail.appendChild(btn);
  });

  // Also add drag-handle cue to every panel except the last
  panels.forEach((panel, i) => {
    if (i === panels.length - 1) return;
    const handle = document.createElement('div');
    handle.className = 'mmt-panel__handle';
    handle.setAttribute('aria-hidden', 'true');
    panel.appendChild(handle);
  });

  // Active-section tracking via IntersectionObserver
  const buttons = Array.from(rail.querySelectorAll('button'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const btn = buttons.find((b) => b.dataset.target === id);
      if (!btn) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        buttons.forEach((b) => b.removeAttribute('aria-current'));
        panels.forEach((p) => p.classList.remove('is-active'));
        btn.setAttribute('aria-current', 'true');
        entry.target.classList.add('is-active');
      }
    });
  }, { threshold: [0.4, 0.6] });
  panels.forEach((p) => io.observe(p));

  // Default: first section active on load
  const first = buttons[0];
  if (first && !buttons.some((b) => b.getAttribute('aria-current') === 'true')) {
    first.setAttribute('aria-current', 'true');
    panels[0].classList.add('is-active');
  }
}

/* ============ Boot section modules ============ */
function initSections() {
  initFlywheel();
  initCertsWall();
  initProfitTarget();
  initVerifyGrid();
  initScrollProgress();
  initNavRail();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSections);
} else {
  initSections();
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
    overlay.innerHTML = "<!-- =====================================================\n     MMT LANDING v2 \u2014 scrolling deck (replaces the fullscreen gate)\n     Structure locked with user 2026-08-12:\n       S1 Locked Flywheel\n       S2 Funded Trader Certificate Wall\n       S3 Profit Target Calculator\n       S4 Learn Money, Make Money (VSL + tagline)\n       S5 ASIC License Verification\n       S6 Join the Waitlist (Calendly / Trustpilot / Free Course)\n     Aesthetic: dark, no private-jet bg, sticky ticker at top.\n===================================================== -->\n<div id=\"intro\" aria-hidden=\"false\">\n\n  <!-- Scroll progress bar removed per 2026-08-12 revision (kept element out of DOM). -->\n\n  <!-- Brand mark (fixed top-left, same treatment as apply.makemoney.com.au) -->\n  <a class=\"brand\" href=\"#s-flywheel\" aria-label=\"Make Money Trading home\">\n    <img src=\"data:image/png;base64,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\" width=\"756\" height=\"295\" alt=\"Make Money Trading\" decoding=\"async\" />\n  </a>\n\n  <!-- Fixed top-right Apply button, aligned with brand mark. Links to Calendly. -->\n  <a class=\"top-apply\" href=\"https://calendly.com/mmt-mentor/m-m-t-coaching-application\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Apply for MMT \u2014 book your coaching application call\">\n    <span class=\"top-apply__text\">Apply</span>\n    <span class=\"top-apply__arrow\" aria-hidden=\"true\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 8h10M9 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </span>\n  </a>\n\n  <!-- Right-side dot navigation (fixed, mirrors accelerator pattern) -->\n  <nav class=\"rail\" id=\"rail\" aria-label=\"Section navigation\"></nav>\n\n  <!-- Sticky market ticker (persists across scroll) -->\n  <div class=\"intro__ticker\" aria-hidden=\"true\">\n    <div class=\"intro__ticker-track\" id=\"marketTicker\">\n      <span class=\"tk\"><i class=\"tk-dot\"></i>S&amp;P 500 <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>NASDAQ <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>DOW <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>BTC <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>ETH <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>AUD/USD <em>\u2014</em></span>\n      <span class=\"tk\"><i class=\"tk-dot\"></i>LIVE \u2022 MARKETS <em>LOADING\u2026</em></span>\n    </div>\n  </div>\n\n  <!-- Global vignette + grain for texture (kept from v1) -->\n  <div class=\"intro__vignette\"></div>\n  <div class=\"intro__grain\"></div>\n\n  <!-- ============ SECTION 1 \u00b7 LOCKED FLYWHEEL ============ -->\n  <section class=\"mmt-panel\" id=\"s-flywheel\" data-label=\"The Locked Flywheel\" data-idx=\"01\">\n    <!-- Panel-head bar removed for section 1 per 2026-08-12 revision -->\n    <div class=\"mmt-panel__inner\">\n      <h2 class=\"mmt-h2 mmt-h2--lock\">Your growth isn't broken.<br /><span class=\"accent\">It's locked.</span></h2>\n\n      <div class=\"reveal fly-wrap mt-lg\">\n        <div class=\"fly-stage\">\n          <div class=\"wheel\" id=\"wheel\" data-open=\"0\">\n            <svg viewBox=\"0 0 240 240\" role=\"img\" aria-label=\"A trading flywheel held still by four locks: strategy, systems, software and support\">\n              <defs>\n                <linearGradient id=\"ring\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n                  <stop offset=\"0\" stop-color=\"rgba(255,255,255,0.25)\"/>\n                  <stop offset=\"1\" stop-color=\"rgba(255,255,255,0.05)\"/>\n                </linearGradient>\n              </defs>\n              <circle cx=\"120\" cy=\"120\" r=\"92\" fill=\"none\" stroke=\"url(#ring)\" stroke-width=\"14\"/>\n              <g class=\"spinner\" id=\"wheel-spokes\"></g>\n              <text class=\"hubv\" x=\"120\" y=\"116\" text-anchor=\"middle\" id=\"wheel-count\">0/4</text>\n              <text class=\"hubk\" x=\"120\" y=\"136\" text-anchor=\"middle\" id=\"wheel-hubk\">Unlocked</text>\n            </svg>\n          </div>\n          <div class=\"wheel-money\" id=\"wheel-money\" hidden>\n            <div class=\"wm-v\" id=\"wm-v\">$0</div>\n            <div class=\"wm-badge\" id=\"wm-badge\" aria-live=\"polite\">\n              <span class=\"wm-dot\"></span> Now you can become a funded trader.\n            </div>\n          </div>\n        </div>\n\n        <div class=\"fly-side\">\n          <div class=\"locks\" id=\"locks\"></div>\n          <div class=\"fly-status\" id=\"fly-status\">\n            <div class=\"cnt\" id=\"fly-count\">0/4 UNLOCKED</div>\n            <div class=\"msg\" id=\"fly-msg\">Tap a lock. Nothing moves until you open one.</div>\n          </div>\n          <!-- Trustpilot pill sits on the right column, directly under the\n               \"ALL FOUR OPEN\" fly-status pill. Reveals once all 4 locks are open. -->\n          <a class=\"fly-trust\" id=\"flyTrust\" href=\"https://au.trustpilot.com/review/makemoneytrading.com.au\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Read our reviews on Trustpilot\">\n            <span class=\"fly-trust__copy\"><strong>4.9 from 169 reviews</strong></span>\n            <span class=\"fly-trust__stars\" aria-hidden=\"true\">\n              <svg width=\"88\" height=\"16\" viewBox=\"0 0 88 16\" fill=\"none\"><g fill=\"#00B67A\"><rect width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"18\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"36\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"54\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"72\" width=\"16\" height=\"16\" rx=\"1.5\"/></g><g fill=\"#FFFFFF\"><path d=\"M8 3.2l1.35 2.74L12.4 6.4l-2.2 2.14.52 3.04L8 10.14 5.28 11.58l.52-3.04L3.6 6.4l3.05-.46z\"/><path d=\"M26 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L26 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M44 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L44 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M62 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L62 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M80 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L80 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/></g></svg>\n            </span>\n            <span class=\"fly-trust__label\">on <strong>Trustpilot</strong> <span class=\"fly-trust__arrow\" aria-hidden=\"true\">\u2192</span></span>\n          </a>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- ============ SECTION 2 \u00b7 FUNDED TRADER CERTIFICATE WALL ============ -->\n  <section class=\"mmt-panel\" id=\"s-certs\" data-label=\"Funded Trader Wall\" data-idx=\"02\">\n    <div class=\"mmt-panel__head\">\n      <span class=\"mmt-panel__idx\">02 / 06</span>\n      <span class=\"mmt-panel__rule\"></span>\n      <span class=\"mmt-panel__eyebrow\">Funded Trader Wall</span>\n    </div>\n    <div class=\"mmt-panel__inner\">\n      <h2 class=\"mmt-h2\"><span class=\"accent\">$11.7 million</span> funded in 12 months.</h2>\n      <p class=\"mmt-sub\">Real Aussies. Real results. Every tile is a verified certificate from an MMT member.</p>\n\n      <div class=\"reveal certs-wall mt-lg\" id=\"certs\"></div>\n      <!-- cw-hint removed per 2026-08-12: user asked to drop the \"8 payouts \u00b7 28 verified \u00b7 tap to enlarge\" caption. -->\n    </div>\n  </section>\n\n  <!-- ============ SECTION 3 \u00b7 PROFIT TARGET CALCULATOR ============ -->\n  <section class=\"mmt-panel\" id=\"s-target\" data-label=\"Profit Target Calculator\" data-idx=\"03\">\n    <div class=\"mmt-panel__head\">\n      <span class=\"mmt-panel__idx\">03 / 06</span>\n      <span class=\"mmt-panel__rule\"></span>\n      <span class=\"mmt-panel__eyebrow\">Profit Target Calculator</span>\n    </div>\n    <div class=\"mmt-panel__inner\">\n      <h2 class=\"mmt-h2\">What you need <span class=\"accent\">per trading day.</span></h2>\n      <p class=\"mmt-sub\">The data behind the goal: is it achievable?</p>\n\n      <div class=\"reveal target-grid mt-lg\">\n        <div class=\"target-inputs\">\n          <label class=\"fld\">\n            <span class=\"fld-l\">Annual wage (AUD)</span>\n            <span class=\"fld-w\"><span class=\"fld-c\">$</span><input id=\"pt-wage\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" value=\"100,000\" aria-label=\"Annual wage in Australian dollars\" /></span>\n          </label>\n          <label class=\"fld\">\n            <span class=\"fld-l\">Replacement target</span>\n            <span class=\"fld-w\"><input id=\"pt-pct\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" value=\"25\" aria-label=\"Replacement target percentage\" /><span class=\"fld-c fld-c-r\">%</span></span>\n          </label>\n          <p class=\"pt-fine\">Assumes 252 trading days per year.</p>\n        </div>\n        <div class=\"pt-hero\">\n          <div class=\"pt-hero-v\" id=\"pt-daily-usd\">$0.00</div>\n          <div class=\"pt-hero-d\" id=\"pt-rate\">USD per trading day</div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- ============ SECTION 4 \u00b7 LEARN MONEY, MAKE MONEY (VSL) ============ -->\n  <section class=\"mmt-panel\" id=\"s-learn\" data-label=\"Learn Money, Make Money\" data-idx=\"04\">\n    <div class=\"mmt-panel__head\">\n      <span class=\"mmt-panel__idx\">04 / 06</span>\n      <span class=\"mmt-panel__rule\"></span>\n      <span class=\"mmt-panel__eyebrow\">Learn Money, Make Money</span>\n    </div>\n    <div class=\"mmt-panel__inner\">\n      <h2 class=\"mmt-h2\">Learn money, <span class=\"accent\">Make Money.</span></h2>\n      <p class=\"mmt-sub mmt-sub--roomy\">Queensland farmer brings in $1.2 million profit after joining MMT.</p>\n\n      <div class=\"reveal intro__video mt-lg\" id=\"introVideo\">\n        <div class=\"intro__video-frame\">\n          <wistia-player media-id=\"rd7d652xeu\" aspect=\"1.7777777777777777\"></wistia-player>\n        </div>\n      </div>\n\n      <!-- Apply CTA under the video, mirrors the top-right button. -->\n      <div class=\"learn-cta\">\n        <a class=\"top-apply top-apply--inline\" href=\"https://calendly.com/mmt-mentor/m-m-t-coaching-application\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Apply for MMT \u2014 book your coaching application call\">\n          <span class=\"top-apply__text\">Apply</span>\n          <span class=\"top-apply__arrow\" aria-hidden=\"true\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 8h10M9 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n          </span>\n        </a>\n      </div>\n    </div>\n  </section>\n\n  <!-- ============ SECTION 5 \u00b7 ASIC LICENSE VERIFICATION ============ -->\n  <section class=\"mmt-panel\" id=\"s-verify\" data-label=\"ASIC Licensed\" data-idx=\"05\">\n    <div class=\"mmt-panel__head\">\n      <span class=\"mmt-panel__idx\">05 / 06</span>\n      <span class=\"mmt-panel__rule\"></span>\n      <span class=\"mmt-panel__eyebrow\">Verification &amp; Licensing</span>\n    </div>\n    <div class=\"mmt-panel__inner\">\n      <h2 class=\"mmt-h2\">Verification <span class=\"accent\">and licensing.</span></h2>\n      <p class=\"mmt-sub\">Most Australian programs are unlicensed, unregulated and unauthorised to provide advice.</p>\n\n      <div class=\"reveal verify-grid mt-lg\" id=\"verify-grid\"></div>\n      <p class=\"mmt-fine verify-fine\">Both numbers are publicly verifiable on the ASIC Professional Registers at asic.gov.au.</p>\n    </div>\n  </section>\n\n  <!-- ============ SECTION 6 \u00b7 JOIN THE WAITLIST ============ -->\n  <section class=\"mmt-panel mmt-panel--final\" id=\"s-waitlist\" data-label=\"Join the Waitlist\" data-idx=\"06\">\n    <div class=\"mmt-panel__head\">\n      <span class=\"mmt-panel__idx\">06 / 06</span>\n      <span class=\"mmt-panel__rule\"></span>\n      <span class=\"mmt-panel__eyebrow\">Join the Waitlist</span>\n    </div>\n    <div class=\"mmt-panel__inner\">\n      <div class=\"intro__stack\">\n        <div class=\"intro__headline\">\n          <h1 class=\"intro__word intro__word--inline\" id=\"introWord\">\n            <span class=\"line\">\n              <span class=\"word-row\" data-split=\"Join the\"></span>\n              <span class=\"word-row accent-row\" data-split=\"Waitlist.\"></span>\n            </span>\n          </h1>\n        </div>\n\n        <p class=\"intro__license\">Financial License #460940/1310836</p>\n\n        <div class=\"intro__cta-wrap\">\n          <div class=\"intro__cta-row\">\n            <a id=\"enterBtn\" class=\"intro__cta intro__cta--live\" href=\"https://calendly.com/mmt-mentor/m-m-t-coaching-application\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Book your MMT coaching application call\">\n              <span class=\"intro__cta-glow\" aria-hidden=\"true\"></span>\n              <span class=\"intro__cta-live\" aria-hidden=\"true\"><span class=\"intro__cta-live-dot\"></span></span>\n              <span class=\"intro__cta-text\" id=\"ctaMonthLabel\">August Waitlist</span>\n              <span class=\"intro__cta-arrow\" aria-hidden=\"true\">\n                <svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 8h10M9 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n              </span>\n            </a>\n            <a class=\"intro__cta intro__cta--ghost\" href=\"https://www.skool.com/daytrading/about\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open the free Skool day trading course in a new tab\">\n              <span class=\"intro__cta-text\">Free Course</span>\n              <span class=\"intro__cta-arrow\" aria-hidden=\"true\">\n                <svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 8h10M9 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n              </span>\n            </a>\n          </div>\n        </div>\n\n        <a class=\"intro__trust\" id=\"introTrust\" href=\"https://au.trustpilot.com/review/makemoneytrading.com.au\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Read our reviews on Trustpilot\">\n          <span class=\"intro__trust-copy\"><strong>4.9 from 169 reviews</strong></span>\n          <span class=\"intro__trust-stars\" aria-hidden=\"true\">\n            <svg width=\"88\" height=\"16\" viewBox=\"0 0 88 16\" fill=\"none\"><g fill=\"#00B67A\"><rect width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"18\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"36\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"54\" width=\"16\" height=\"16\" rx=\"1.5\"/><rect x=\"72\" width=\"16\" height=\"16\" rx=\"1.5\"/></g><g fill=\"#FFFFFF\"><path d=\"M8 3.2l1.35 2.74L12.4 6.4l-2.2 2.14.52 3.04L8 10.14 5.28 11.58l.52-3.04L3.6 6.4l3.05-.46z\"/><path d=\"M26 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L26 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M44 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L44 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M62 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L62 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/><path d=\"M80 3.2l1.35 2.74 3.05.46-2.2 2.14.52 3.04L80 10.14l-2.72 1.44.52-3.04-2.2-2.14 3.05-.46z\"/></g></svg>\n          </span>\n          <span class=\"intro__trust-label\">on <strong>Trustpilot</strong> <span class=\"intro__trust-arrow\" aria-hidden=\"true\">\u2192</span></span>\n        </a>\n      </div>\n    </div>\n  </section>\n\n  <!-- ============ COMPLIANCE FOOTER (mirrors apply.makemoney.com.au) ============ -->\n  <footer class=\"mmt-legal\" role=\"contentinfo\">\n    <div class=\"mmt-legal__inner\">\n      <div class=\"mmt-legal__block\">\n        <div class=\"mmt-legal__eyebrow\"><span class=\"mmt-legal__eyebrow-mark\">//</span> General Advice Disclaimer</div>\n        <p class=\"mmt-legal__body\">All information, education, and signals provided by TradeHub and Make Money Trading are general in nature only and do not take into account your personal objectives, financial situation, or needs. Nothing on this site constitutes personal financial advice, a recommendation, or an invitation to participate in live markets or risk real capital. Past performance is not a reliable indicator of future performance. Trading and investing in financial products carries substantial risk of loss and is not suitable for every investor. You should consider the relevant disclosure documents and seek independent professional advice before making any financial decisions. Financial License #460940/1310836.</p>\n      </div>\n\n      <div class=\"mmt-legal__block\">\n        <div class=\"mmt-legal__eyebrow\"><span class=\"mmt-legal__eyebrow-mark\">//</span> Compliance</div>\n        <ul class=\"mmt-legal__links\">\n          <li><a href=\"https://app.makemoney.com.au/legal/financial-services-guide\" target=\"_blank\" rel=\"noopener noreferrer\">Financial Services Guide</a></li>\n          <li><a href=\"https://app.makemoney.com.au/legal/terms\" target=\"_blank\" rel=\"noopener noreferrer\">Terms &amp; Conditions</a></li>\n          <li><a href=\"https://app.makemoney.com.au/legal/complaints-policy\" target=\"_blank\" rel=\"noopener noreferrer\">Complaints Policy</a></li>\n          <li><a href=\"https://app.makemoney.com.au/legal/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Privacy Policy</a></li>\n        </ul>\n      </div>\n\n      <div class=\"mmt-legal__foot\">Trading involves risk of loss. Past performance not indicative of future results.</div>\n    </div>\n  </footer>\n\n</div>";
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

  /* Wistia player (VSL). Loaded asynchronously; player.js registers the
     <wistia-player> custom element, the media script preloads the asset. */
  var wistiaPlayer = document.createElement("script");
  wistiaPlayer.src = "https://fast.wistia.com/player.js";
  wistiaPlayer.async = true;
  document.head.appendChild(wistiaPlayer);
  var wistiaMedia = document.createElement("script");
  wistiaMedia.src = "https://fast.wistia.com/embed/rd7d652xeu.js";
  wistiaMedia.async = true;
  wistiaMedia.type = "module";
  document.head.appendChild(wistiaMedia);
})();
