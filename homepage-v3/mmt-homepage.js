/* MMT Homepage v3 — Wix injection bundle
   Replaces the two-step audience router with the humanprinter-style homepage.
   Kinetic hero, VSL, countdown, 14 testimonials, calculators, cert wall, wins, disclaimer.
   Previous router preserved at commit 340418d (mmt-waitlist-gate.js)
*/
(function () {
  'use strict';
  var p = window.location.pathname;
  if (p !== '/' && p !== '/home' && p !== '') return;
  if (document.getElementById('mmt-hp3-root')) return;

  var CDN = 'https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/';

  /* ---- TYPEFORM EMBED (loaded once) ---- */
  (function () {
    if (document.getElementById('mmt-tf-css')) return;
    var css = document.createElement('link');
    css.id = 'mmt-tf-css';
    css.rel = 'stylesheet';
    css.href = 'https://embed.typeform.com/next/css/popup.css';
    document.head.appendChild(css);
    var s = document.createElement('script');
    s.id = 'mmt-tf-js';
    s.src = 'https://embed.typeform.com/next/embed.js';
    s.defer = true;
    document.head.appendChild(s);
  })();

  /* ---- ANTI-FLASH ---- */
  (function () {
    var s = document.createElement('style');
    s.id = 'mmt-anti-flash';
    s.textContent =
      'html.mmt-hp3-prep{background:#0a0a0a!important}' +
      'html.mmt-hp3-prep body{background:#0a0a0a!important;visibility:hidden!important}' +
      'html.mmt-hp3-prep #mmt-hp3-root{visibility:visible!important}';
    (document.head || document.documentElement).appendChild(s);
    document.documentElement.classList.add('mmt-hp3-prep');
  })();

  /* ---- VIEWPORT + WIX SHELL OVERRIDE ----
     Wix serves this page with <meta id="wixMobileViewport" name="viewport" content="width=320, ...">
     and .device-mobile-optimized on body, both of which lock the layout to 320px on mobile.
     Fix: DELETE Wix's meta and INSERT our own fresh one (in-place setAttribute doesn't relayout
     on iOS Safari), strip the body class, and add CSS that unlocks any residual width lock.
     Bounded retries with a flag — no MutationObserver loop. */
  (function () {
    var wanted = 'width=device-width, initial-scale=1, viewport-fit=cover';
    function replaceViewport() {
      // Remove ALL existing viewport metas (Wix's + any duplicates)
      var metas = document.querySelectorAll('meta[name="viewport"]');
      for (var i = 0; i < metas.length; i++) {
        if (metas[i].parentNode) metas[i].parentNode.removeChild(metas[i]);
      }
      // Insert a fresh one — this triggers iOS to recompute layout viewport
      var m = document.createElement('meta');
      m.name = 'viewport';
      m.setAttribute('content', wanted);
      m.setAttribute('data-mmt-viewport', '1');
      document.head.appendChild(m);
    }
    function fixBodyClass() {
      if (!document.body) return;
      document.body.classList.remove('device-mobile-optimized');
      document.body.classList.remove('device-mobile-non-optimized');
      document.body.classList.add('mmt-hp3-body');
    }
    // Run once immediately.
    replaceViewport();
    fixBodyClass();
    // Re-run at DOMContentLoaded and load in case Wix's runtime re-inserts.
    document.addEventListener('DOMContentLoaded', function () { replaceViewport(); fixBodyClass(); }, { once: true });
    window.addEventListener('load', function () { replaceViewport(); fixBodyClass(); }, { once: true });
    // Bounded polling for 3s after load to catch any late Wix re-insertion.
    var pollStart = 0;
    var pollInterval = null;
    function startPoll() {
      pollStart = Date.now();
      if (pollInterval) clearInterval(pollInterval);
      pollInterval = setInterval(function () {
        if (Date.now() - pollStart > 3000) { clearInterval(pollInterval); return; }
        var current = document.querySelector('meta[name="viewport"]');
        if (!current || current.getAttribute('content') !== wanted || !current.hasAttribute('data-mmt-viewport')) {
          replaceViewport();
        }
        fixBodyClass();
      }, 250);
    }
    document.addEventListener('DOMContentLoaded', startPoll, { once: true });

    // CSS unlock — belt and suspenders.
    var s = document.createElement('style');
    s.id = 'mmt-hp3-shell-fix';
    s.textContent =
      'html,body{width:100%!important;max-width:100vw!important;min-width:0!important;margin:0!important;padding:0!important;overflow-x:hidden!important}' +
      'body.device-mobile-optimized,body.device-mobile-non-optimized,body.mmt-hp3-body{width:100%!important;max-width:100vw!important}' +
      '#mmt-hp3-root{width:100%!important;max-width:100vw!important;overflow-x:hidden}';
    document.head.appendChild(s);
  })();

  /* ---- HEAD: fonts, wistia, meta ---- */
  function addLink(rel, href, cross) {
    var l = document.createElement('link');
    l.rel = rel; l.href = href;
    if (cross) l.crossOrigin = '';
    document.head.appendChild(l);
    return l;
  }
  addLink('preconnect', 'https://fast.wistia.com', true);
  addLink('preconnect', 'https://www.youtube-nocookie.com');
  addLink('preconnect', 'https://i.ytimg.com');
  addLink('preconnect', 'https://fonts.gstatic.com', true);
  addLink('stylesheet', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Anton&display=swap');

  var wistiaPlayerLib = document.createElement('script');
  wistiaPlayerLib.src = 'https://fast.wistia.com/player.js';
  wistiaPlayerLib.async = true;
  document.head.appendChild(wistiaPlayerLib);

  var wistiaScript = document.createElement('script');
  wistiaScript.src = 'https://fast.wistia.com/embed/rd7d652xeu.js';
  wistiaScript.async = true;
  wistiaScript.type = 'module';
  document.head.appendChild(wistiaScript);

  /* ---- STYLES ---- */
  var styleEl = document.createElement('style');
  styleEl.id = 'mmt-hp3-styles';
  styleEl.textContent = ":root{\n  --bg:#0a0a0a;\n  --bg-2:#111;\n  --ink:#f7f7f5;\n  --ink-2:#c7c5c0;\n  --ink-3:#8a8880;\n  --line:rgba(255,255,255,.08);\n  --line-2:rgba(255,255,255,.14);\n  --orange:#FF6B1A;\n  --orange-2:#FF8A3D;\n  --orange-glow:rgba(255,107,26,.35);\n  --gold:#e6b455;\n  --shadow:0 20px 60px rgba(0,0,0,.5);\n  --r-lg:20px;\n  --r-md:14px;\n  --r-sm:8px;\n}\n*,*::before,*::after{box-sizing:border-box}\nhtml,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\nimg,svg{display:block;max-width:100%;height:auto}\nbutton{font:inherit;color:inherit;background:none;border:0;cursor:pointer}\na{color:inherit;text-decoration:none}\na:focus-visible,button:focus-visible{outline:2px solid var(--orange);outline-offset:2px;border-radius:6px}\n\n/* ALERT STRIP */\n.alertbar{\n  background:linear-gradient(90deg,#3a0000,#7a0e0e,#3a0000);\n  color:#fff;\n  text-align:center;\n  padding:10px 16px;\n  font-weight:700;\n  font-size:13px;\n  letter-spacing:.06em;\n  text-transform:uppercase;\n  border-bottom:1px solid rgba(255,60,60,.45);\n  white-space:nowrap;\n  overflow:hidden;\n  text-overflow:ellipsis;\n}\n.alertbar .alertbar-tag{\n  display:inline-flex;\n  align-items:center;\n  gap:5px;\n  background:#ff2b2b;\n  color:#fff;\n  padding:2px 8px;\n  border-radius:4px;\n  font-weight:800;\n  letter-spacing:.08em;\n  margin-right:8px;\n  box-shadow:0 0 0 1px rgba(255,255,255,.15) inset;\n}\n.alertbar-icon{\n  display:inline-block;\n  vertical-align:middle;\n  transform-origin:center;\n  animation:mmt-alert-pulse 1.15s ease-in-out infinite;\n  will-change:transform,opacity;\n}\n@keyframes mmt-alert-pulse{\n  0%,100%{transform:scale(1);opacity:1;filter:drop-shadow(0 0 0 rgba(255,255,255,0))}\n  50%{transform:scale(1.25);opacity:.85;filter:drop-shadow(0 0 4px rgba(255,255,255,.6))}\n}\n@media (prefers-reduced-motion: reduce){\n  .alertbar-icon{animation:none}\n}\n.alertbar #alertbar-text{display:inline-block}\n\n/* HEADER */\n.hdr{position:sticky;top:0;z-index:20;background:rgba(10,10,10,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}\n.hdr-inner{max-width:1280px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}\n.brand img{height:38px;width:auto}\n.lic{text-align:right;line-height:1.2;text-decoration:none;color:inherit;display:inline-block;transition:opacity .15s ease}\na.lic:hover,a.lic:focus-visible{opacity:.85}\na.lic:focus-visible{outline:2px solid var(--orange);outline-offset:3px;border-radius:4px}\n.f-lic-a{color:inherit;text-decoration:none;transition:opacity .15s ease}\n.f-lic-a:hover,.f-lic-a:focus-visible{opacity:.85;text-decoration:underline}\n.lic-k{display:block;font-size:10px;color:var(--ink-3);letter-spacing:.14em;text-transform:uppercase}\n.lic-v{display:block;font-size:12px;color:var(--ink-2);font-weight:600;margin-top:2px}\n\n/* HERO */\n.hero{position:relative;padding:32px 24px 40px;overflow:hidden}\n.hero::before{\n  content:\"\";position:absolute;inset:0;pointer-events:none;\n  background:\n    radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,107,26,.14), transparent 70%),\n    radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,107,26,.06), transparent 70%);\n}\n.hero-inner{position:relative;max-width:1120px;margin:0 auto;text-align:center}\n\n/* Kinetic cascade headline */\n.cascade{margin:0 0 8px;position:relative;line-height:.85;font-family:'Anton','Inter',sans-serif;font-weight:400;letter-spacing:-.02em}\n.cascade-top{\n  display:block;\n  font-size:clamp(52px,9vw,128px);\n  text-transform:uppercase;\n  color:var(--ink);\n  text-shadow:0 6px 40px rgba(0,0,0,.6);\n}\n.cascade-word{\n  display:block;\n  font-size:clamp(52px,9vw,128px);\n  text-transform:uppercase;\n  color:var(--orange);\n  text-shadow:0 0 40px var(--orange-glow),0 6px 40px rgba(0,0,0,.6);\n  margin-top:-6px;\n}\n.cascade-stack{display:none} /* vertical letter stack removed on all breakpoints */\n@media(min-width:900px){\n  .cascade{padding-top:0}\n}\n\n.hero-sub{\n  font-size:clamp(18px,2.1vw,26px);\n  color:var(--ink);\n  font-weight:700;\n  margin:16px auto 20px;\n  max-width:820px;\n  line-height:1.25;\n}\n.hero-supp{\n  font-size:clamp(14px,1.4vw,17px);\n  color:var(--ink-2);\n  max-width:640px;\n  margin:0 auto 40px;\n  line-height:1.5;\n}\n\n/* VSL */\n.vsl{max-width:1000px;margin:0 auto}\n.vsl-frame{\n  position:relative;\n  aspect-ratio:16/9;\n  border-radius:var(--r-lg);\n  overflow:hidden;\n  background:#000;\n  border:1px solid var(--line-2);\n  box-shadow:var(--shadow),0 0 0 8px rgba(255,107,26,.06),0 0 60px rgba(255,107,26,.15);\n}\n.vsl-frame wistia-player{display:block;width:100%;height:100%}\n\n/* Section CTA blocks (VSL, mid-testimonials, cert wall, calc) — mirrors .shots-cta */\n.vsl-cta,.mid-cta,.cwall-cta,.calc-cta{\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n  gap:10px;\n  width:100%;\n  margin:24px auto 0;\n  padding:6px 0;\n}\n.cwall-cta{margin-top:36px}\n.calc-cta{margin-top:28px}\n.vsl-cta-n,.mid-cta-n,.cwall-cta-n,.calc-cta-n{\n  color:var(--ink-3);\n  font-size:14px;\n  text-align:center;\n  max-width:520px;\n  padding:0 12px;\n}\n.vsl-cta-lead{\n  margin:0;\n  font-size:clamp(22px,2.6vw,32px);\n  font-weight:800;\n  color:var(--ink);\n  letter-spacing:-.005em;\n  text-align:center;\n  line-height:1.15;\n}\n.vsl-cta-arrow{\n  display:block;\n  color:var(--orange);\n  font-weight:800;\n  font-size:28px;\n  line-height:1;\n  margin:-2px 0 -2px;\n  transform:translateY(0);\n  animation:mmt-cta-bounce 1.4s ease-in-out infinite;\n}\n@keyframes mmt-cta-bounce{\n  0%,100%{transform:translateY(0)}\n  50%{transform:translateY(4px)}\n}\n@media(prefers-reduced-motion:reduce){.vsl-cta-arrow{animation:none}}\n@media(max-width:640px){.vsl-cta-lead{font-size:20px}}\n\n/* SOCIAL PROOF PILLS (Trustpilot + YouTube) */\n.proof-pills{\n  display:flex;\n  gap:12px;\n  justify-content:center;\n  align-items:stretch;\n  flex-wrap:wrap;\n  margin:24px auto 0;\n  max-width:560px;\n}\n.pill{\n  display:inline-flex;\n  align-items:center;\n  gap:14px;\n  padding:14px 24px 14px 18px;\n  border:1px solid var(--line-2);\n  border-radius:999px;\n  background:rgba(255,255,255,.03);\n  color:var(--ink);\n  text-decoration:none;\n  transition:border-color .2s ease, background .2s ease, transform .2s ease;\n  min-height:64px;\n}\n.pill:hover{\n  border-color:var(--orange);\n  background:rgba(255,107,26,.06);\n  transform:translateY(-1px);\n}\n.pill-ic{\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  width:40px;\n  height:40px;\n  border-radius:999px;\n  background:rgba(255,255,255,.07);\n  flex-shrink:0;\n}\n.pill-txt{\n  display:flex;\n  flex-direction:column;\n  line-height:1.15;\n  text-align:left;\n}\n.pill-k{\n  font-size:17px;\n  font-weight:700;\n  color:var(--ink);\n  letter-spacing:-.01em;\n}\n.pill-k-dim{\n  font-weight:500;\n  color:var(--ink-3);\n  font-size:13px;\n  margin-left:1px;\n}\n.pill-v{\n  font-size:11px;\n  color:var(--ink-3);\n  letter-spacing:.04em;\n  text-transform:uppercase;\n  margin-top:2px;\n}\n@media(max-width:640px){\n  .proof-pills{gap:10px;margin-top:18px}\n  .pill{padding:9px 14px 9px 11px;gap:10px;min-height:48px}\n  .pill-ic{width:28px;height:28px}\n  .pill-k{font-size:14px}\n  .pill-v{font-size:10px}\n}\n@media(max-width:380px){\n  .pill-v{display:none}\n}\n.proof-note{\n  margin:10px auto 0;\n  text-align:center;\n  color:var(--ink-3);\n  font-size:14px;\n  letter-spacing:.01em;\n}\n@media(max-width:640px){.proof-note{font-size:12.5px}}\n\n/* Next step */\n.nextstep{margin-top:50px}\n.nextstep-k{font-size:15px;color:var(--ink-2);margin:0 0 16px;font-weight:600;letter-spacing:.02em}\n\n/* Buttons */\n.btn{\n  display:inline-flex;align-items:center;gap:10px;\n  padding:14px 26px;\n  border-radius:999px;\n  font-weight:700;\n  font-size:15px;\n  letter-spacing:.02em;\n  transition:transform .15s ease, box-shadow .2s ease, background .2s ease;\n  border:1px solid transparent;\n  white-space:nowrap;\n}\n.btn-primary{\n  background:linear-gradient(180deg,var(--orange-2),var(--orange));\n  color:#0a0a0a;\n  box-shadow:0 10px 30px rgba(255,107,26,.35),inset 0 1px 0 rgba(255,255,255,.4);\n}\n.btn-primary:hover{transform:translateY(-1px);box-shadow:0 14px 40px rgba(255,107,26,.5),inset 0 1px 0 rgba(255,255,255,.4)}\n.btn-lg{padding:16px 32px;font-size:16px}\n.btn-xl{padding:24px 56px;font-size:22px;font-weight:800;letter-spacing:.03em}\n.btn-hero{padding:26px 64px;font-size:24px;font-weight:800;letter-spacing:.03em;border-radius:999px}\n.btn-chev{font-size:22px;font-weight:400;margin-left:4px}\n\n/* COUNTDOWN */\n.countdown{padding:60px 24px;background:linear-gradient(180deg,#0f0f0f,#080808);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\n.cd-inner{\n  max-width:1100px;margin:0 auto;\n  background:linear-gradient(180deg,rgba(255,107,26,.08),rgba(255,107,26,.02));\n  border:1px solid rgba(255,107,26,.25);\n  border-radius:var(--r-lg);\n  padding:36px 32px;\n  display:grid;\n  grid-template-columns:1fr 2fr auto;\n  gap:32px;\n  align-items:center;\n}\n.cd-head{border-right:1px solid var(--line-2);padding-right:24px}\n.cd-title{margin:0;font-size:18px;font-weight:800;color:var(--ink);white-space:nowrap}\n.cd-date{margin:6px 0 0;font-size:12px;color:var(--orange);font-weight:700;letter-spacing:.06em;white-space:nowrap;text-transform:uppercase}\n.cd-sub{margin:6px 0 0;font-size:14px;color:var(--ink-2)}\n.cd-timer{text-align:center}\n.cd-label{margin:0 0 12px;font-size:11px;color:var(--ink-3);letter-spacing:.16em;text-transform:uppercase}\n.cd-units{display:flex;align-items:center;justify-content:center;gap:14px}\n.cd-u{display:flex;flex-direction:column;align-items:center;min-width:64px}\n.cd-n{\n  font-family:'Anton',sans-serif;\n  font-size:44px;\n  line-height:1;\n  color:var(--orange);\n  text-shadow:0 0 20px var(--orange-glow);\n  font-variant-numeric:tabular-nums;\n}\n.cd-x{font-size:11px;color:var(--ink-3);margin-top:6px;letter-spacing:.14em;text-transform:uppercase}\n.cd-sep{font-family:'Anton',sans-serif;font-size:32px;color:var(--ink-3);line-height:1;transform:translateY(-6px)}\n.cd-btn{justify-self:end}\n\n@media(max-width:900px){\n  .cd-inner{grid-template-columns:1fr;text-align:center;padding:28px 20px;gap:24px}\n  .cd-head{border-right:0;border-bottom:1px solid var(--line-2);padding:0 0 20px}\n  .cd-units{gap:8px}\n  .cd-u{min-width:52px}\n  .cd-n{font-size:36px}\n  .cd-btn{justify-self:center}\n}\n\n/* SECTION HEADS */\n.s-head{text-align:center;margin-bottom:48px}\n.s-eyebrow{margin:0 0 12px;font-size:12px;color:var(--orange);font-weight:700;letter-spacing:.18em;text-transform:uppercase}\n.s-title{margin:0 0 12px;font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.02em;line-height:1.1}\n.s-sub{margin:0 auto;max-width:640px;font-size:16px;color:var(--ink-2);line-height:1.5}\n\n/* STORIES GRID */\n.stories{padding:80px 24px}\n.s-inner{max-width:1280px;margin:0 auto}\n.vgrid{\n  display:grid;\n  grid-template-columns:repeat(auto-fill,minmax(320px,1fr));\n  gap:20px;\n}\n.vcard{margin:0}\n.vplay{\n  position:relative;\n  display:block;\n  width:100%;\n  aspect-ratio:16/9;\n  border-radius:var(--r-md);\n  overflow:hidden;\n  padding:0;\n  border:1px solid var(--line-2);\n  background:#000;\n  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;\n}\n.vplay img{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}\n.vplay:hover{transform:translateY(-2px);border-color:rgba(255,107,26,.4);box-shadow:0 12px 32px rgba(0,0,0,.4),0 0 0 3px rgba(255,107,26,.15)}\n.vplay:hover img{transform:scale(1.03)}\n.vbadge{\n  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);\n  width:64px;height:64px;\n  background:linear-gradient(180deg,var(--orange-2),var(--orange));\n  border-radius:50%;\n  display:flex;align-items:center;justify-content:center;\n  color:#0a0a0a;\n  box-shadow:0 8px 24px rgba(0,0,0,.5),0 0 0 8px rgba(255,107,26,.15);\n}\n.vbadge svg{width:26px;height:26px}\n.vtitle{margin:14px 4px 0;font-size:16px;line-height:1.35;font-weight:700;color:var(--ink)}\n\n/* FUNDED TRADER CERTIFICATE WALL (rotating rows) */\n.wins{padding:80px 24px 40px;background:linear-gradient(180deg,#0a0a0a,#050505)}\n.w-inner{max-width:1400px;margin:0 auto}\n.cwall{text-align:center}\n.cwall-h{\n  font-family:'Anton',sans-serif;\n  font-size:clamp(24px,4.5vw,52px);\n  line-height:1.05;\n  letter-spacing:-.01em;\n  margin:0;\n  color:var(--ink);\n  text-transform:uppercase;\n  display:flex;\n  flex-wrap:wrap;\n  justify-content:center;\n  gap:.35em;\n}\n.cwall-h .hl{color:var(--orange)}\n.cwall-h-a,.cwall-h-b{white-space:nowrap}\n.cwall-sub{\n  margin:14px auto 0;\n  max-width:640px;\n  font-size:16px;\n  color:var(--ink-2);\n  line-height:1.5;\n}\n.certs-wall{\n  display:flex;\n  flex-direction:column;\n  gap:18px;\n  margin-top:40px;\n}\n.cw-group{display:flex;flex-direction:column;gap:10px}\n.cw-row{\n  position:relative;\n  overflow:hidden;\n  border-radius:10px;\n  height:148px;\n  -webkit-mask-image:linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);\n  mask-image:linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);\n}\n.cw-row.rev .cw-track{animation-direction:reverse}\n.cw-row:hover .cw-track{animation-play-state:paused}\n.cw-track{\n  display:flex;\n  gap:14px;\n  height:100%;\n  width:max-content;\n  animation:mmt-marquee var(--cw-dur,60s) linear infinite;\n  animation-delay:var(--cw-delay,0s);\n  will-change:transform;\n}\n@keyframes mmt-marquee{\n  from{transform:translateX(0)}\n  to{transform:translateX(-50%)}\n}\n.cert{\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  height:100%;\n  aspect-ratio:4 / 3;\n  padding:0;\n  border:1px solid var(--line);\n  border-radius:8px;\n  background:#111;\n  overflow:hidden;\n  cursor:zoom-in;\n  flex-shrink:0;\n  transition:border-color .2s ease, transform .2s ease;\n}\n.cert:hover{border-color:var(--orange);transform:translateY(-2px)}\n.cert:focus-visible{outline:2px solid var(--orange);outline-offset:2px}\n.cert img{width:100%;height:100%;object-fit:cover;display:block}\n.cert-paid{border-color:hsl(155 65% 47% / .34)}\n\n/* Cert lightbox */\n.cert-box{\n  display:none;\n  position:fixed; inset:0;\n  padding:40px;\n  background:rgba(10,10,10,.94);\n  align-items:center; justify-content:center;\n  cursor:zoom-out;\n  z-index:9998;\n}\n.cert-box.open{display:flex}\n.cert-box img{\n  max-width:min(1080px, 92vw);\n  max-height:86vh;\n  object-fit:contain;\n  border-radius:12px;\n  box-shadow:0 40px 120px rgba(0,0,0,.6);\n}\n.cert-x{\n  position:absolute; top:20px; right:20px;\n  width:42px; height:42px;\n  border-radius:999px;\n  background:rgba(255,255,255,.08);\n  border:1px solid rgba(255,255,255,.18);\n  color:#fff;\n  font-size:24px; line-height:1;\n  cursor:pointer;\n}\n.cert-x:hover{background:rgba(255,255,255,.14)}\n\n@media(max-width:900px){\n  .cw-row{height:120px}\n}\n@media(max-width:600px){\n  .cw-row{height:96px}\n  .certs-wall{gap:12px}\n  .cwall-h{font-size:clamp(22px,7vw,32px);gap:.25em}\n}\n\n.w-cta{text-align:center;margin-top:56px}\n.w-fine{margin:20px 0 0;font-size:14px;color:var(--ink-3)}\n\n/* BEST RESULTS IN AUS — Discord win screenshots */\n.best{\n  padding:80px 24px 60px;\n  background:#050505;\n  border-top:1px solid var(--line);\n}\n.best-inner{max-width:1000px;margin:0 auto;text-align:center}\n.best-title{\n  font-family:'Anton',sans-serif;\n  font-size:clamp(32px,5vw,60px);\n  line-height:1.05;\n  letter-spacing:-.01em;\n  margin:0;\n  color:var(--ink);\n  text-transform:uppercase;\n}\n.best-title .hl{color:var(--orange)}\n.best-sub{\n  margin:14px auto 0;\n  max-width:820px;\n  font-size:16px;\n  color:var(--ink-2);\n  line-height:1.5;\n  text-align:center;\n}\n@media(max-width:720px){.best-sub br{display:none}}\n.shots{\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n  gap:clamp(22px,3vw,40px);\n  max-width:560px;\n  margin:48px auto 0;\n}\n.shotb{\n  display:block;\n  width:100%;\n  padding:0;\n  margin:0;\n  border:1px solid var(--line);\n  border-radius:14px;\n  background:#111;\n  overflow:hidden;\n  cursor:zoom-in;\n  transition:border-color .2s ease, transform .2s ease;\n}\n.shotb:hover{border-color:var(--orange);transform:translateY(-2px)}\n.shotb:focus-visible{outline:2px solid var(--orange);outline-offset:2px}\n.shotb img{display:block;width:100%;height:auto}\n.shots-cta{\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n  gap:12px;\n  width:100%;\n  padding:6px 0;\n}\n.shots-cta-n{color:var(--ink-3);font-size:14px}\n.best-fine{\n  margin:32px auto 0;\n  max-width:640px;\n  font-size:13px;\n  color:var(--ink-3);\n  font-style:italic;\n  line-height:1.6;\n}\n@media(max-width:640px){\n  .best{padding:60px 20px 48px}\n  .best-title{font-size:clamp(28px,9vw,40px)}\n}\n\n/* FOOTER */\n.ftr{background:#050505;border-top:1px solid var(--line);padding:60px 24px 40px}\n.f-inner{max-width:1000px;margin:0 auto;text-align:center}\n.f-brand{display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:28px}\n.f-brand img{height:38px;width:auto}\n.f-lic{margin:0;font-size:12px;color:var(--ink-3);letter-spacing:.06em}\n.f-disc{\n  max-width:820px;margin:0 auto 32px;\n  font-size:13px;line-height:1.8;color:var(--ink-2);text-align:left;\n}\n.f-disc h2{margin:0 0 20px;font-size:18px;line-height:1.4;font-weight:700;color:var(--ink);text-align:center}\n.f-disc p{margin:0 0 14px}\n.f-disc p:last-child{margin-bottom:0}\n@media(max-width:600px){.f-disc{font-size:13px;line-height:1.8}.f-disc h2{font-size:17px}}\n.f-links{margin:0 0 16px;font-size:13px;color:var(--ink-2);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0 4px;line-height:2}\n.f-links a{color:var(--ink-2);border-bottom:1px solid transparent;transition:border-color .2s ease,color .2s ease}\n.f-links a:hover{color:var(--orange);border-bottom-color:var(--orange)}\n.f-links span{margin:0 6px;color:var(--ink-3)}\n.f-copy{margin:0;font-size:11px;color:var(--ink-3)}\n\n/* LIGHTBOX */\n.lb{\n  position:fixed;inset:0;z-index:50;\n  background:rgba(0,0,0,.9);\n  backdrop-filter:blur(8px);\n  display:flex;align-items:center;justify-content:center;\n  padding:24px;\n}\n.lb[hidden]{display:none}\n.lb-frame{width:100%;max-width:1200px;aspect-ratio:16/9;background:#000;border-radius:12px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6)}\n.lb-frame iframe{width:100%;height:100%;border:0}\n.lb-close{\n  position:absolute;top:20px;right:24px;\n  width:44px;height:44px;border-radius:50%;\n  background:rgba(255,255,255,.1);\n  color:#fff;font-size:28px;line-height:1;\n  display:flex;align-items:center;justify-content:center;\n  transition:background .2s ease;\n}\n.lb-close:hover{background:rgba(255,107,26,.4)}\n\n/* MOBILE tweaks */\n@media(max-width:640px){\n  .hero{padding:32px 20px 24px}\n  .cascade-top,.cascade-word{font-size:22vw}\n  .hero-sub{font-size:clamp(14px,4.35vw,18px);margin:20px auto 32px;line-height:1.3;white-space:nowrap;max-width:100%}\n  .stories,.wins{padding:60px 20px}\n  .vgrid{grid-template-columns:1fr;gap:16px}\n  .btn-xl{padding:18px 32px;font-size:16px}\n  .btn-hero{padding:16px 34px;font-size:17px}\n  .vsl-cta{margin-top:18px;padding:4px 0 0}\n  .hdr-inner{padding:12px 16px}\n  .brand img{height:32px}\n  .lic-k{font-size:9px}\n  .lic-v{font-size:11px}\n\n  /* Alert bar: shrink to always stay on ONE line */\n  .alertbar{font-size:10.5px;letter-spacing:.03em;padding:9px 10px}\n\n  /* Section CTA subtext: tighter on mobile */\n  .vsl-cta-n,.mid-cta-n,.cwall-cta-n,.calc-cta-n{font-size:13px}\n}\n\n/* Very small phones */\n@media(max-width:400px){\n  .alertbar{font-size:9.5px;padding:8px 8px}\n  .vsl-cta-n,.mid-cta-n,.cwall-cta-n,.calc-cta-n{font-size:12.5px}\n}\n\n/* Reduce motion */\n@media(prefers-reduced-motion:reduce){\n  *{animation:none!important;transition:none!important}\n}\n\n/* ============ SIMPLE CALCULATORS (calc2) ============ */\n.calc2{\n  margin:72px auto 72px;\n  max-width:640px;\n  padding:36px clamp(22px,4vw,40px);\n  border:1px solid var(--line);\n  border-radius:22px;\n  background:linear-gradient(180deg, rgba(255,107,26,.05), rgba(255,255,255,.015));\n  box-shadow:0 24px 60px -30px rgba(255,107,26,.30), inset 0 1px 0 rgba(255,255,255,.03);\n  text-align:center;\n}\n.calcbg{padding:80px 24px 40px;background:#050505}\n.calc-inner{max-width:1120px;margin:0 auto}\n.calcbg .calc2{margin-top:0;margin-bottom:0}\n\n.calc2-eyebrow{\n  font-size:12px;letter-spacing:.18em;text-transform:uppercase;\n  color:var(--orange);margin:0 0 10px;font-weight:700;\n}\n.calc2-title{\n  font-family:'Anton',sans-serif;font-weight:400;\n  font-size:clamp(30px,5vw,46px);line-height:1.05;\n  letter-spacing:-.01em;margin:0 0 12px;color:var(--ink);\n  text-transform:uppercase;\n}\n.calc2-sub{color:var(--ink-2);font-size:15px;line-height:1.5;margin:0 auto 8px;max-width:460px}\n\n/* Inputs */\n.calc2-inputs{\n  display:grid;grid-template-columns:1fr 1fr;gap:14px;\n  margin:28px 0 0;text-align:left;\n}\n.calc2 .calc2-inputs:has(.c2-fld:only-child){grid-template-columns:1fr;max-width:340px;margin-left:auto;margin-right:auto}\n@media(max-width:520px){.calc2-inputs{grid-template-columns:1fr}}\n.c2-fld{display:flex;flex-direction:column;gap:8px}\n.c2-k{font-size:13px;color:var(--ink-2);font-weight:600;letter-spacing:.01em;text-align:center}\n.c2-w{\n  display:flex;align-items:center;justify-content:center;\n  background:rgba(255,255,255,.04);\n  border:1px solid var(--line);\n  border-radius:14px;\n  padding:4px 16px;\n  transition:border-color .18s, background .18s;\n}\n.c2-w:focus-within{border-color:var(--orange);background:rgba(255,107,26,.05)}\n.c2-c{color:var(--orange);font-weight:700;font-size:22px;margin-right:6px}\n.c2-w input{\n  width:100%;background:none;border:0;outline:0;color:var(--ink);\n  font-family:'Anton',sans-serif;font-weight:400;\n  font-size:28px;letter-spacing:.01em;\n  padding:12px 0;text-align:center;\n  font-variant-numeric:tabular-nums;\n  min-width:0;\n}\n\n/* Big result */\n.calc2-result{margin-top:28px}\n.c2r-label{\n  font-size:12px;letter-spacing:.14em;text-transform:uppercase;\n  color:var(--ink-3);margin-bottom:10px;font-weight:600;\n}\n.c2r-big{\n  font-family:'Anton',sans-serif;font-weight:400;\n  font-size:clamp(52px,10vw,88px);line-height:1;\n  color:var(--orange);letter-spacing:-.01em;\n  font-variant-numeric:tabular-nums;\n  margin-bottom:20px;\n}\n.c2r-unit{\n  font-size:.32em;color:var(--ink-2);\n  letter-spacing:.05em;margin-left:6px;\n  vertical-align:baseline;\n}\n.c2r-strip{\n  display:grid;grid-template-columns:repeat(3,1fr);\n  gap:10px;margin-top:8px;\n}\n@media(max-width:480px){.c2r-strip{grid-template-columns:1fr;gap:8px}}\n.c2r-cell{\n  display:flex;flex-direction:column;gap:4px;\n  padding:14px 10px;\n  background:rgba(255,255,255,.03);\n  border:1px solid var(--line);\n  border-radius:12px;\n}\n@media(max-width:480px){.c2r-cell{flex-direction:row;justify-content:space-between;align-items:center;padding:12px 14px}}\n.c2c-k{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);font-weight:600}\n.c2c-v{font-size:17px;font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums}\n\n.c2-fine{font-size:11px;color:var(--ink-3);line-height:1.5;margin:24px 0 0}\n.c2-fine--sm{font-size:9.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n@media(max-width:900px){.c2-fine--sm{font-size:9px}}\n@media(max-width:640px){\n  .calc2{padding:26px 18px;margin:44px auto 0}\n  .calcbg .calc2{margin:0 auto}\n  .calcbg{padding:56px 16px 24px}\n  .c2-fine--sm{white-space:normal;font-size:10px}\n}\n\n\n/* Explicit challenge label, scoped to the existing offer section */\n.best-challenge-label{display:table;margin:0 auto 18px;padding:9px 16px;border:1px solid rgba(255,107,26,.45);border-radius:999px;background:rgba(255,107,26,.08);color:var(--orange);font-size:13px;font-weight:800;line-height:1.3;letter-spacing:.12em;text-transform:uppercase}\n@media(max-width:600px){.best-challenge-label{font-size:12px;margin-bottom:14px;padding:8px 14px}}\n\n/* header apply */\n.hdr-right{display:flex;align-items:center;gap:18px}\n.hdr-cta{padding:10px 22px;font-size:14px;font-weight:800;letter-spacing:.04em}\n/* story expander */\n.p-more-wrap{display:none;margin-top:20px}\n.p-more-wrap.open{display:block}\n.p-toggle-row{text-align:center;margin-top:28px}\n.p-toggle{background:transparent;color:var(--ink);border:1px solid var(--line-2);border-radius:999px;padding:14px 28px;font:700 15px/1 Inter,sans-serif;letter-spacing:.02em;cursor:pointer;transition:border-color .2s,color .2s}\n.p-toggle:hover{border-color:var(--orange);color:var(--orange)}\n.p-toggle::after{content:'  \\2193'}\n.p-toggle.on::after{content:'  \\2191'}\n/* how it works */\n.p-sec{padding:80px 24px}\n.p-how{background:#0d0d0d;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\n.p-inner{max-width:1120px;margin:0 auto}\n.p-center{text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px}\n.p-h2{font-family:'Anton',sans-serif;font-weight:400;font-size:clamp(32px,4.6vw,56px);line-height:1.05;letter-spacing:-.01em;margin:0 0 36px;text-transform:uppercase;color:var(--ink)}\n.p-h2 .hl{color:var(--orange)}\n.p-steps{list-style:none;margin:0 0 40px;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}\n.p-steps li{display:flex;gap:16px;align-items:flex-start;padding:24px;border:1px solid var(--line);border-radius:18px;background:#0a0a0a}\n.p-step-n{flex:0 0 40px;height:40px;border-radius:50%;background:var(--orange);color:#0a0a0a;font:800 18px/40px Inter,sans-serif;text-align:center}\n.p-steps h3{margin:6px 0 6px;font-size:18px;font-weight:800;color:var(--ink)}\n.p-steps p{margin:0;font-size:15px;line-height:1.55;color:var(--ink-2)}\n/* challenge heading */\n.p-chal-title{font-size:clamp(44px,7vw,92px)}\n.p-chal-cond{margin:18px auto 10px;max-width:720px;font-size:clamp(17px,1.6vw,21px);line-height:1.5;color:var(--ink);font-weight:600}\n.p-chal-kicker{margin:0 auto 8px;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--orange)}\n@media(max-width:1000px){.p-steps{grid-template-columns:1fr}}\n@media(max-width:640px){\n  .hdr-right{gap:10px}\n  .hdr-right .lic-k{display:none}\n  .hdr-cta{padding:8px 14px;font-size:12.5px}\n  .p-sec{padding:56px 20px}\n  .p-h2{margin-bottom:26px}\n  .p-chal-title{font-size:clamp(40px,12vw,56px)}\n}\n\n/* ===== Mobile optimisation pass ===== */\n@media(max-width:640px){\n  .hero .hero-sub{white-space:normal;font-size:clamp(17px,4.9vw,20px);max-width:330px;margin:18px auto 26px;line-height:1.3;text-wrap:balance}\n  .p-chal-title{font-size:clamp(30px,10.4vw,48px);white-space:nowrap}\n  .c2-fine,.c2-fine--sm{font-size:12px;line-height:1.5}\n  .cd-label,.cd-x{font-size:12px}\n  .f-copy{font-size:12px}\n  .btn-xl{white-space:normal;text-align:center;justify-content:center;max-width:100%;padding:18px 26px}\n  .best{padding-left:12px;padding-right:12px}\n  .best .p-chal-cond,.best .p-chal-kicker{padding:0 8px}\n}\n@media(max-width:360px){\n  .cd-units{gap:4px}\n  .cd-u{min-width:44px}\n  .cd-n{font-size:30px}\n  .cd-sep{font-size:24px}\n  .cd-x{font-size:11px;letter-spacing:.08em}\n  .hdr-cta{padding:8px 12px}\n  .lic-v{font-size:10.5px}\n}\n\n/* income calc results link */\n.c2-results-row{display:flex;justify-content:center;margin-top:26px}\na.c2-results{text-decoration:none;color:#0a0a0a}\n\n/* calculators side by side */\n.calc-pair{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:stretch}\n.calc-pair .calc2{max-width:none;width:100%;margin:0;display:flex;flex-direction:column}\n.calc-pair .calc2-result{margin-top:auto;padding-top:28px}\n.calc-pair .c2-results-row{margin-top:22px}\n.calc2-inputs--3{grid-template-columns:1fr 1fr 1fr;gap:10px}\n.calc2-inputs--3 .c2-w{padding:4px 10px}\n.calc2-inputs--3 .c2-w input{font-size:24px}\n.calc2-inputs--3 .c2-c{font-size:18px}\n.c2-c--end{margin:0 0 0 4px}\n.c2-yrs{display:inline-flex;gap:6px;padding:4px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.03)}\n.c2-yr{background:none;border:0;color:var(--ink-2);font:700 13px/1 Inter,sans-serif;padding:9px 14px;border-radius:999px;cursor:pointer}\n.c2-yr.on{background:var(--orange);color:#0a0a0a}\n.calc-pair .c2r-big{margin-bottom:16px}\n@media(max-width:960px){.calc-pair{grid-template-columns:1fr;max-width:640px;margin:0 auto;gap:20px}}\n@media(max-width:520px){.calc2-inputs--3{grid-template-columns:1fr 1fr}.calc2-inputs--3 .c2-fld:last-child{grid-column:1/-1;max-width:50%;justify-self:center;width:100%}}\n/* MMT challenge: videos then horizontal wins */\n.best-inner{max-width:1120px}\n.chal-vgrid{margin:40px 0 0;text-align:left}\n.shots--row{flex-direction:row;align-items:flex-start;max-width:none;gap:20px;margin-top:40px}\n.shots--row .shotb{flex:1 1 0;min-width:0}\n@media(max-width:640px){\n  .shots--row{overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;gap:12px;padding:0 4px 8px;justify-content:flex-start}\n  .shots--row .shotb{flex:0 0 78%;scroll-snap-align:center}\n  .chal-vgrid{margin-top:28px}\n}\n\n/* two wins, bigger */\n.shots--row{max-width:none;margin-left:auto;margin-right:auto;gap:20px}\n@media(max-width:640px){.shots--row .shotb{flex:0 0 86%}}\n\n/* align both calculators row by row (desktop) */\n@media(min-width:961px){\n  .calc-pair{grid-template-rows:auto auto auto auto auto;row-gap:0}\n  .calc-pair .calc2{display:grid;grid-row:span 5;grid-template-rows:subgrid;align-content:start}\n  .calc-pair .calc2-result{margin-top:0;padding-top:28px;align-self:start}\n  .calc-pair .calc2-inputs{align-self:start}\n  .calc-pair .c2-results-row{align-self:end}\n  .calc2-inputs--3 .c2-w{padding:4px 12px}\n  .calc2-inputs--3 .c2-w input{font-size:28px}\n  .calc2-inputs--3 .c2-c{font-size:22px}\n}\n\n/* countdown popup */\n.cdm{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .25s ease}\n.cdm[hidden]{display:none}\n.cdm.show{opacity:1}\n.cdm-box{position:relative;width:100%;max-width:1100px;transform:translateY(12px) scale(.98);transition:transform .3s ease}\n.cdm.show .cdm-box{transform:none}\n.cdm .countdown{padding:0;background:none;border:0}\n.cdm .cd-inner{background-color:#100a07;box-shadow:0 30px 80px -20px rgba(255,107,26,.35),0 0 0 1px rgba(255,107,26,.25)}\n.cdm-close{position:absolute;top:-16px;right:-16px;z-index:2;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:#1a1a1a;color:#fff;font:400 26px/1 Inter,sans-serif;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0 0 3px;transition:background .2s,border-color .2s}\n.cdm-close:hover,.cdm-close:focus-visible{background:var(--orange);border-color:var(--orange);color:#0a0a0a;outline:0}\nhtml.cdm-lock,html.cdm-lock body{overflow:hidden}\n@media(max-width:640px){.cdm{padding:16px}.cdm-close{top:-14px;right:-6px;width:38px;height:38px}}\n@media(prefers-reduced-motion:reduce){.cdm,.cdm-box{transition:none}}\n\n/* header: hidden at top, slides in as a fixed bar once scrolling starts */\n.hdr{position:fixed;top:0;left:0;right:0;z-index:40;transform:translateY(-100%);opacity:0;pointer-events:none;transition:transform .3s ease,opacity .3s ease}\n.hdr.show{transform:none;opacity:1;pointer-events:auto}\n@media(prefers-reduced-motion:reduce){.hdr{transition:none}}\n.hero{padding-top:56px}\n@media(max-width:640px){.hero{padding-top:44px}}\n";
  document.head.appendChild(styleEl);

  /* ---- BODY MOUNT ---- */
  function mount() {
    if (document.getElementById('mmt-hp3-root')) return;
    var root = document.createElement('div');
    root.id = 'mmt-hp3-root';
    root.innerHTML = "\n  <!-- Simple header -->\n  <header class=\"hdr\" id=\"hdr\">\n    <div class=\"hdr-inner\">\n      <a href=\"/\" class=\"brand\" aria-label=\"Make Money Team home\">\n        <img src=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/logo.png\" alt=\"Make Money Team\" width=\"140\" height=\"52\" />\n      </a>\n      <div class=\"hdr-right\">\n      <a class=\"lic\" href=\"https://service.asic.gov.au/search/RepresentativeDetail?PermissionType=Australian%20financial%20services%20authorised%20representatives&amp;RepNumber=001310836\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Verify our Financial Services Licence on the ASIC register\">\n        <span class=\"lic-k\">Financial Services Licence</span>\n        <span class=\"lic-v\">AFSL #460940 / AR #1310836</span>\n      </a>\n      <button type=\"button\" class=\"btn btn-primary hdr-cta mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply</button>\n      </div>\n    </div>\n  </header>\n\n  <!-- HERO with kinetic cascade -->\n  <section class=\"hero\" aria-label=\"Introduction\">\n    <div class=\"hero-inner\">\n      <h1 class=\"cascade\" aria-label=\"Stop guessing.\">\n        <span class=\"cascade-top\">STOP</span>\n        <span class=\"cascade-stack\" aria-hidden=\"true\">\n          <span>G</span><span>U</span><span>E</span><span>S</span><span>S</span><span>I</span><span>N</span><span>G</span>\n        </span>\n        <span class=\"cascade-word\" aria-hidden=\"true\">GUESSING.</span>\n      </h1>\n      <p class=\"hero-sub\">Start Trading &amp; Investing With A Proven Process.</p>\n\n      <!-- VSL -->\n      <div class=\"vsl\">\n        <div class=\"vsl-frame\">\n          <wistia-player media-id=\"rd7d652xeu\" aspect=\"1.7777777777777777\"></wistia-player>\n        </div>\n        <div class=\"vsl-cta\">\n          <p class=\"vsl-cta-lead\">Start Your Personal Assessment</p>\n          <span class=\"vsl-cta-arrow\" aria-hidden=\"true\">↓</span>\n          <button type=\"button\" class=\"btn btn-primary btn-hero mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply Now (Limited Spaces)</button>\n        </div>\n      </div>\n\n      <!-- Social proof pills: Trustpilot + YouTube -->\n      <div class=\"proof-pills\">\n        <a class=\"pill pill-trust\" href=\"https://au.trustpilot.com/review/makemoneytrading.com.au\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Read our reviews on Trustpilot\">\n          <span class=\"pill-ic\" aria-hidden=\"true\">\n            <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"#00b67a\">\n              <path d=\"M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.42 6.2 20.47l1.11-6.46-4.7-4.58 6.49-.95z\"/>\n            </svg>\n          </span>\n          <span class=\"pill-txt\">\n            <span class=\"pill-k\">Trustpilot</span>\n          </span>\n        </a>\n        <a class=\"pill pill-yt\" href=\"https://taap.it/54lNUDV\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Watch us on YouTube\">\n          <span class=\"pill-ic\" aria-hidden=\"true\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"#ff0000\">\n              <path d=\"M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-1.9.5-5.8.5-5.8s-.1-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z\"/>\n            </svg>\n          </span>\n          <span class=\"pill-txt\">\n            <span class=\"pill-k\">YouTube</span>\n          </span>\n        </a>\n      </div>\n      <p class=\"proof-note\">>1,000 Students | 0 Negative Reviews</p>\n\n    </div>\n  </section>\n\n  <!-- Countdown popup: shown on arrival, closed only with the X or Apply -->\n  <div class=\"cdm\" id=\"cdm\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Next intake closing soon\" hidden>\n    <div class=\"cdm-box\">\n      <button type=\"button\" class=\"cdm-close\" id=\"cdm-close\" aria-label=\"Close\">&times;</button>\n      <section class=\"countdown\" aria-label=\"Next intake\">\n        <div class=\"cd-inner\">\n          <div class=\"cd-head\">\n            <p class=\"cd-title\">Next intake closing soon</p>\n            <p class=\"cd-date\" id=\"cd-date\"></p>\n          </div>\n          <div class=\"cd-timer\" aria-live=\"polite\">\n            <p class=\"cd-label\">Window closes in</p>\n            <div class=\"cd-units\">\n              <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd-d\">00</span><span class=\"cd-x\">Days</span></div>\n              <div class=\"cd-sep\">:</div>\n              <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd-h\">00</span><span class=\"cd-x\">Hours</span></div>\n              <div class=\"cd-sep\">:</div>\n              <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd-m\">00</span><span class=\"cd-x\">Minutes</span></div>\n              <div class=\"cd-sep\">:</div>\n              <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd-s\">00</span><span class=\"cd-x\">Seconds</span></div>\n            </div>\n          </div>\n          <button type=\"button\" class=\"btn btn-primary btn-lg cd-btn mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply now</button>\n        </div>\n      </section>\n    </div>\n  </div>\n\n  <!-- Countdown (inline, original position) -->\n  <section class=\"countdown\" aria-label=\"Next intake\">\n    <div class=\"cd-inner\">\n      <div class=\"cd-head\">\n        <p class=\"cd-title\">Next intake closing soon</p>\n        <p class=\"cd-date\" id=\"cd2-date\"></p>\n      </div>\n      <div class=\"cd-timer\">\n        <p class=\"cd-label\">Window closes in</p>\n        <div class=\"cd-units\">\n          <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd2-d\">00</span><span class=\"cd-x\">Days</span></div>\n          <div class=\"cd-sep\">:</div>\n          <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd2-h\">00</span><span class=\"cd-x\">Hours</span></div>\n          <div class=\"cd-sep\">:</div>\n          <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd2-m\">00</span><span class=\"cd-x\">Minutes</span></div>\n          <div class=\"cd-sep\">:</div>\n          <div class=\"cd-u\"><span class=\"cd-n\" id=\"cd2-s\">00</span><span class=\"cd-x\">Seconds</span></div>\n        </div>\n      </div>\n      <button type=\"button\" class=\"btn btn-primary btn-lg cd-btn mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply now</button>\n    </div>\n  </section>\n\n  <!-- Student experiences -->\n  <section class=\"stories\" aria-label=\"Student experiences\">\n    <div class=\"s-inner\">\n      <div class=\"s-head\">\n        <p class=\"s-eyebrow\">Student experiences</p>\n        <h2 class=\"s-title\">🇦🇺Real Aussies. Real Results</h2>\n      </div>\n\n      <div class=\"vgrid\" id=\"vgrid-top\"><!-- filled by app.js: featured 6 --></div>\n\n      <div class=\"mid-cta\">\n        <button type=\"button\" class=\"btn btn-primary btn-xl mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>I'm Ready To Be Profitable</button>\n        <span class=\"mid-cta-n\">>1,000 Students | 0 Negative Reviews</span>\n      </div>\n    </div>\n    </div>\n  </section>\n\n  <!-- 3 steps to get started -->\n  <section class=\"p-sec p-how\" aria-label=\"3 steps to get started\">\n    <div class=\"p-inner\">\n      <h2 class=\"p-h2\">3 steps <span class=\"hl\">to get started.</span></h2>\n      <ol class=\"p-steps\">\n        <li><span class=\"p-step-n\">1</span><div><h3>Apply</h3><p>Answer a few short questions about your goals and experience <span style=\"white-space:nowrap\">(60 seconds).</span></p></div></li>\n        <li><span class=\"p-step-n\">2</span><div><h3>Book your time</h3><p>Pick a time with the team to see if MMT is the right fit for you.</p></div></li>\n        <li><span class=\"p-step-n\">3</span><div><h3>Start winning</h3><p>If it is a fit, you are onboarded and get to start immediately.</p></div></li>\n      </ol>\n      <div class=\"p-center\">\n        <button type=\"button\" class=\"btn btn-primary btn-xl mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply now</button>\n        <span class=\"mid-cta-n\">&gt;1,000 Students | 0 Negative Reviews</span>\n      </div>\n    </div>\n  </section>\n\n  <!-- Funded trader certificate wall (rotating rows) -->\n  <section class=\"wins\" aria-label=\"Funded trader certificates\">\n    <div class=\"w-inner\">\n      <div class=\"cwall\">\n        <h2 class=\"cwall-h\">\n          <span class=\"cwall-h-a\"><span class=\"hl\">$12.7M in capital</span></span>\n          <span class=\"cwall-h-b\">to members in 12m.</span>\n        </h2>\n        <p class=\"cwall-sub\">Real Aussies. Real results. Every tile is a verified certificate from an MMT member.</p>\n        <div class=\"certs-wall\" id=\"certs\"></div>\n        <div class=\"cwall-cta\">\n          <button type=\"button\" class=\"btn btn-primary btn-xl mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>I'm Ready To Be Profitable</button>\n          <span class=\"cwall-cta-n\">>1,000 Students | 0 Negative Reviews</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Income replacement calculator -->\n  <section class=\"calcbg\" aria-label=\"Income and investing calculators\">\n    <div class=\"calc-inner\">\n      <div class=\"calc-pair\">\n      <div class=\"calc2\">\n        <p class=\"calc2-eyebrow\">Income calculator</p>\n        <h3 class=\"calc2-title\">How much you need<br><span class=\"hl\">to replace your job.</span></h3>\n\n        <div class=\"calc2-inputs\">\n          <label class=\"c2-fld\">\n            <span class=\"c2-k\">Your salary per year (AUD)</span>\n            <span class=\"c2-w\"><span class=\"c2-c\">$</span><input id=\"i-year\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" value=\"120,000\" /></span>\n          </label>\n        </div>\n\n        <div class=\"calc2-result\">\n          <div class=\"c2r-label\">To replace your income you need</div>\n          <div class=\"c2r-big num\" id=\"i-daily\">$0<span class=\"c2r-unit\">USD / day</span></div>\n        </div>\n\n        <div class=\"c2-results-row\"><a class=\"btn btn-primary btn-xl c2-results\" href=\"https://results.makemoney.com.au\" target=\"_blank\" rel=\"noopener\">See our client results</a></div>\n      </div>\n      <div class=\"calc2\">\n        <p class=\"calc2-eyebrow\">Investing calculator</p>\n        <h3 class=\"calc2-title\">What your money<br><span class=\"hl\">could grow to.</span></h3>\n\n        <div class=\"calc2-inputs calc2-inputs--3\">\n          <label class=\"c2-fld\">\n            <span class=\"c2-k\">Starting amount</span>\n            <span class=\"c2-w\"><span class=\"c2-c\">$</span><input id=\"v-start\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" value=\"10,000\" /></span>\n          </label>\n          <label class=\"c2-fld\">\n            <span class=\"c2-k\">Added each month</span>\n            <span class=\"c2-w\"><span class=\"c2-c\">$</span><input id=\"v-month\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" value=\"500\" /></span>\n          </label>\n          <label class=\"c2-fld\">\n            <span class=\"c2-k\">Yearly return</span>\n            <span class=\"c2-w\"><input id=\"v-rate\" type=\"text\" inputmode=\"decimal\" autocomplete=\"off\" value=\"10\" /><span class=\"c2-c c2-c--end\">%</span></span>\n          </label>\n        </div>\n\n        <div class=\"calc2-result\">\n          <div class=\"c2r-label\">In <span id=\"v-yrs-l\">10</span> years you could have</div>\n          <div class=\"c2r-big num\" id=\"v-out\">$0</div>\n          <div class=\"c2-yrs\" role=\"group\" aria-label=\"Years\">\n            <button type=\"button\" class=\"c2-yr\" data-y=\"5\">5 yrs</button><button type=\"button\" class=\"c2-yr on\" data-y=\"10\">10 yrs</button><button type=\"button\" class=\"c2-yr\" data-y=\"20\">20 yrs</button>\n          </div>\n        </div>\n\n        <div class=\"c2-results-row\"><a class=\"btn btn-primary btn-xl c2-results\" href=\"https://results.makemoney.com.au\" target=\"_blank\" rel=\"noopener\">See our client results</a></div>\n      </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Best Results In Aus — Discord client-win screenshots -->\n  <section class=\"best\" id=\"best-results\" aria-label=\"Best results in Australia\">\n    <div class=\"best-inner\">\n      <h2 class=\"best-title p-chal-title\">The MMT <span class=\"hl\">Challenge.</span></h2>\n      <p class=\"p-chal-cond\">Find any other mentor in Australia getting their clients better results, provide proof, and you don’t pay to join MMT.</p>\n      <div class=\"vgrid chal-vgrid\" id=\"vgrid-chal\"><!-- 6 stories --></div>\n      <div class=\"shots shots--row\" id=\"shots\">\n        <button class=\"shotb\" type=\"button\" data-full=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/clients/r1.webp\" aria-label=\"Enlarge member result screenshot 1\">\n          <img src=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/clients/r1.webp\" alt=\"Results posted by MMT members\" loading=\"lazy\" decoding=\"async\" />\n        </button>\n        <button class=\"shotb\" type=\"button\" data-full=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/clients/r3.webp\" aria-label=\"Enlarge member result screenshot 3\">\n          <img src=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/clients/r3.webp\" alt=\"Results posted by MMT members\" loading=\"lazy\" decoding=\"async\" />\n        </button>\n      </div>\n\n      <div class=\"w-cta\">\n        <button type=\"button\" class=\"btn btn-primary btn-xl mmt-cta\" data-tf-popup=\"BlTyllRG\" data-tf-size=\"70\" data-tf-redirect-target=\"_self\" data-tf-opacity=\"100\" data-tf-iframe-props=\"title=MMT Application\" data-tf-transitive-search-params data-tf-medium=\"snippet\" data-tf-full-screen>Apply Now</button>\n        <p class=\"w-fine\">>1,000 Students | 0 Negative Reviews</p>\n      </div>\n    </div>\n  </section>\n\n  <!-- Footer / disclaimer -->\n  <footer class=\"ftr\">\n    <div class=\"f-inner\">\n      <div class=\"f-brand\">\n        <img src=\"https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/logo.png\" alt=\"Make Money Team\" width=\"120\" height=\"44\" />\n        <p class=\"f-lic\"><a class=\"f-lic-a\" href=\"https://service.asic.gov.au/search/RepresentativeDetail?PermissionType=Australian%20financial%20services%20authorised%20representatives&amp;RepNumber=001310836\" target=\"_blank\" rel=\"noopener noreferrer\">Financial Services Licence &middot; AFSL #460940 / AR #1310836</a></p>\n      </div>\n      <section class=\"f-disc\" aria-labelledby=\"earnings-disclaimer-title\">\n        <h2 id=\"earnings-disclaimer-title\">Earnings &amp; Results Disclaimer</h2>\n        <p>MW Education Pty Ltd trading as Make Money Trading (“MMT”) provides education, information, tools and coaching designed to help clients improve their knowledge, skills and decision-making around trading and financial markets.</p>\n        <p>We do not promote trading as a get-rich-quick scheme, shortcut to wealth, or guaranteed source of income.</p>\n        <p>Trading involves risk, and results depend on a range of factors including your experience, knowledge, discipline, decision-making, capital, risk management, effort, market conditions and ability to apply what you learn.</p>\n        <p>We do not guarantee that you will make money, become profitable, achieve a particular return, obtain a funded trading account, replace your income, or achieve any other specific financial outcome.</p>\n        <p>Any financial results, account balances, payouts, profits, percentage returns, case studies, testimonials or client results shown on our websites, advertisements, social media, emails, presentations or other materials are provided for illustrative and educational purposes only.</p>\n        <p>Past performance is not indicative of future results.</p>\n        <p>Individual results vary significantly. Testimonials and client examples should not be interpreted as typical, average, expected or guaranteed results. Where exceptional client results are shown, they are intended to demonstrate what particular individuals have achieved in their own circumstances and are not a representation of what every client should expect to achieve.</p>\n        <p>Any projections, hypothetical results, examples, estimates or scenarios are illustrative only and should not be relied upon as representations of actual or future performance.</p>\n        <p>You should consider your own circumstances, conduct your own due diligence and, where appropriate, seek independent professional advice before making financial or investment decisions.</p>\n        <p>By accessing our content, programs, emails or services, you acknowledge that you remain responsible for your own trading and financial decisions and accept that trading can result in total loss of capital and in rare circumstances, more than what you deposit when trading leverage products.</p>\n        <p>MW Education Pty Ltd t/a Make Money Trading is a Corporate Authorised Representative (#1310836) of AFSL #460940. Any financial advice provided is general in nature only and does not take into account your objectives, financial situation or needs.</p>\n      </section>\n      <p class=\"f-links\">\n        <a href=\"https://www.makemoney.com.au/_files/ugd/a82c73_df3af99e87d44280909415e0e4da65ef.pdf\" target=\"_blank\" rel=\"noopener\">Financial Services Guide</a>\n        <span>&middot;</span>\n        <a href=\"https://www.makemoney.com.au/_files/ugd/a82c73_be9178a466134f569b9a522be6d63721.pdf\" target=\"_blank\" rel=\"noopener\">Complaints Policy</a>\n        <span>&middot;</span>\n        <a href=\"https://www.makemoney.com.au/_files/ugd/a82c73_ac4c08d167b84d41b592b02b46a72437.pdf\" target=\"_blank\" rel=\"noopener\">Terms &amp; Conditions</a>\n        <span>&middot;</span>\n        <a href=\"https://www.makemoney.com.au/_files/ugd/a82c73_c12e666f55ed4b7a8bf2b180a72b5d94.pdf\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>\n        <span>&middot;</span>\n        <a href=\"https://makemoney.com.au\" target=\"_blank\" rel=\"noopener\">makemoney.com.au</a>\n      </p>\n      <p class=\"f-copy\">&copy; <span id=\"yr\"></span> Make Money Team Pty Ltd. All rights reserved.</p>\n    </div>\n  </footer>\n\n  <!-- YouTube lightbox -->\n  <div class=\"lb\" id=\"lb\" hidden>\n    <button class=\"lb-close\" id=\"lb-close\" type=\"button\" aria-label=\"Close video\">×</button>\n    <div class=\"lb-frame\" id=\"lb-frame\"></div>\n  </div>\n\n  \n";
    // Replace CDN placeholders inside injected HTML
    root.innerHTML = root.innerHTML.split('https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/').join(CDN);
    document.body.innerHTML = ''; // wipe any Wix content
    document.body.appendChild(root);
    document.documentElement.classList.remove('mmt-hp3-prep');

    /* ---- APP JS ---- */
    try {
      var CDN_LOCAL = CDN;
// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Header: show once the visitor starts scrolling, hide again at the very top
(function(){
  var h = document.getElementById('hdr');
  if (!h) return;
  var on = false;
  function upd(){
    var s = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0, document.body.scrollTop || 0) > 10;
    if (s !== on) { on = s; h.classList.toggle('show', s); }
  }
  window.addEventListener('scroll', upd, { passive: true });
  document.addEventListener('scroll', upd, { passive: true, capture: true }); // Wix scrolls <body>
  upd();
})();

// Alert-bar current-month cohort
(function(){
  var el = document.getElementById('alertbar-text');
  if (!el) return;
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var m = months[new Date().getMonth()];
  el.textContent = m + ' cohort closing soon.';
})();

// Video testimonials — ordered: biggest results first (4), then alternated to break color clustering
(function(){
  var hostTop = document.getElementById('vgrid-top');
  var hostBot = document.getElementById('vgrid-chal'); // 6 stories under The MMT Challenge
  if (!hostTop && !hostBot) return;
  var videos = [
    // Featured 6 — order set by Mitch: Ryan, Kyle, Principal / 8 years, FIFO, Lambo guru
    { id: 'ErrtrxNCFU0', title: '$25K to $1.2 million in 6 months, and he doesn\u2019t even trade New York' },
    { id: 'aHhd2KZDCqA', title: 'Kyle made $180,000 in 30 days', thumbnail: 'https://i.ytimg.com/vi/aHhd2KZDCqA/maxresdefault.jpg' },
    { id: 'zouE4p2cyB0', title: 'Principal gets 1,100% ROI in 6 months', thumbnail: 'https://i.ytimg.com/vi/zouE4p2cyB0/maxresdefault.jpg' },
    { id: 'r368ar02ie8', title: '$150K on two degrees. 30 days of MMT made him more money.' },
    { id: 'fOKhUgSqEbg', title: 'Dyslexic FIFO worker learns to trade in 30 days' },
    { id: 'UKPd1ZIfFls', title: 'He copied a Lambo guru and lost. Then he joined MMT and won.' },
    { id: 'gbsFHFZ4oQ4', title: 'No computer for 14 years. Replaced his income in 14 weeks.' },
    { id: 'ySooVMJtTBk', title: 'FIFO worker, 7 trades, 1 loss, $20K profit' },
    { id: 'cr7BMjsIkSs', title: 'He spent 6 months vetting us. His only criticism, too easy.' },
    { id: 'pIfWy-LvR8w', title: 'Banker pays $20K a year for advice. Says this was better value.' },
    { id: 'Jxrb0YBrhsk', title: 'Mining manager finds a mentor on holiday in Bali' },
    { id: 'WzfXfw73Pt0', title: 'Tattoo artist up $2,200 last week, while still learning' },
    { id: '64IglsflfPI', title: '2 years of YouTube got him nowhere. 3 months fixed it.' },
    { id: 'cFbIvjlWx20', title: 'His wife hated trading. Now they trade together every night.' },
    { id: 'FKcu3FUjOQc', title: 'He traded 20 markets and lost. Now he trades 2 and wins.' },
    { id: 'L3xBTwqYYnE', title: 'Tradie who couldn\u2019t use a computer now works 1 hour a day' }
  ];
  function make(v){
    var art = document.createElement('article');
    art.className = 'vcard';
    art.innerHTML =
      '<button class="vplay" type="button" data-yt="' + v.id + '" aria-label="Play video: ' + v.title.replace(/"/g,'&quot;') + '">'+
        '<img src="' + (v.thumbnail || CDN_LOCAL + 'assets/stories/' + v.id + '.webp') + '" alt="" loading="lazy" width="960" height="540" />'+
        '<span class="vbadge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>'+
      '</button>'+
      '<p class="vtitle">' + v.title + '</p>';
    return art;
  }
  var CHAL = ['pIfWy-LvR8w','Jxrb0YBrhsk','WzfXfw73Pt0','64IglsflfPI','L3xBTwqYYnE','FKcu3FUjOQc'];
  var fragTop = document.createDocumentFragment();
  var fragBot = document.createDocumentFragment();
  videos.forEach(function(v, i){
    if (i < 6) fragTop.appendChild(make(v));
  });
  CHAL.forEach(function(id){ var v = videos.filter(function(x){ return x.id === id; })[0]; if (v) fragBot.appendChild(make(v)); });
  if (hostTop) hostTop.appendChild(fragTop);
  if (hostBot) hostBot.appendChild(fragBot);
})();

// Shared calc helpers
var _fmt$ = function(n){ return '$' + Math.round(n).toLocaleString('en-AU'); };
var _parseNum = function(v){ var n = parseFloat(String(v).replace(/[^0-9.]/g,'')); return isFinite(n) ? n : 0; };
var _group = function(v){ var d = String(v).replace(/[^0-9]/g,''); return d ? parseInt(d,10).toLocaleString('en-AU') : ''; };
function _wireInput(el, onChange){
  el.addEventListener('input', function(){
    var pos = el.selectionStart, before = el.value.length;
    el.value = _group(el.value);
    var after = el.value.length;
    try { el.setSelectionRange(pos + (after - before), pos + (after - before)); } catch(e){}
    onChange();
  });
}

// Investor calculator (compounding — mid stories)
(function(){
  var inMonthly = document.getElementById('c-monthly');
  var inStart   = document.getElementById('c-start');
  var outBig    = document.getElementById('o-big');
  var outY1     = document.getElementById('o-y1');
  var outY3     = document.getElementById('o-y3');
  var outY5     = document.getElementById('o-y5');
  if (!inMonthly || !inStart) return;

  var RATE = 0.03; // illustrative monthly return, matches other subdomains

  function balAt(years, monthly, start){
    var bal = start;
    for (var i = 0; i < years * 12; i++) { bal = bal * (1 + RATE) + monthly; }
    return bal;
  }
  function compute(){
    var m = _parseNum(inMonthly.value);
    var s = _parseNum(inStart.value);
    var y1 = balAt(1, m, s);
    var y3 = balAt(3, m, s);
    var y5 = balAt(5, m, s);
    if (outBig) outBig.textContent = _fmt$(y5);
    if (outY1) outY1.textContent = _fmt$(y1);
    if (outY3) outY3.textContent = _fmt$(y3);
    if (outY5) outY5.textContent = _fmt$(y5);
  }
  _wireInput(inMonthly, compute);
  _wireInput(inStart, compute);
  compute();
})();

// Investing calculator (compounding, user picks the yearly return)
(function(){
  var inS = document.getElementById('v-start');
  var inM = document.getElementById('v-month');
  var inR = document.getElementById('v-rate');
  var out = document.getElementById('v-out');
  var lbl = document.getElementById('v-yrs-l');
  if (!inS || !inM || !inR || !out) return;
  var years = 10;
  function compute(){
    var s = _parseNum(inS.value), m = _parseNum(inM.value);
    var r = Math.min(_parseNum(inR.value), 100) / 100 / 12;
    var n = years * 12, bal = s;
    for (var i = 0; i < n; i++) { bal = bal * (1 + r) + m; }
    out.textContent = _fmt$(bal);
    if (lbl) lbl.textContent = years;
  }
  _wireInput(inS, compute);
  _wireInput(inM, compute);
  inR.addEventListener('input', function(){
    var v = inR.value.replace(/[^0-9.]/g,'');
    var p = v.split('.'); if (p.length > 2) v = p[0] + '.' + p.slice(1).join('');
    if (v.length > 5) v = v.slice(0,5);
    inR.value = v; compute();
  });
  document.querySelectorAll('.c2-yr').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('.c2-yr').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on'); years = parseInt(b.getAttribute('data-y'),10); compute();
    });
  });
  compute();
})();

// Income calculator (replace day job — after certs)
// Input: AUD annual salary. Output: 100% of that, converted to USD, per trading day.
(function(){
  var inYear   = document.getElementById('i-year');
  var outDaily = document.getElementById('i-daily');
  if (!inYear) return;

  var DAYS_PER_YEAR = 240;      // 20 trading days x 12 months
  var AUD_TO_USD    = 0.66;     // illustrative conversion rate
  var SHARE         = 1;        // replace 100% of salary

  function compute(){
    var salaryAud = _parseNum(inYear.value);
    var targetUsd = salaryAud * SHARE * AUD_TO_USD;
    var dailyUsd  = targetUsd / DAYS_PER_YEAR;
    if (outDaily) outDaily.innerHTML = _fmt$(dailyUsd) + '<span class="c2r-unit">USD / day</span>';
  }
  _wireInput(inYear, compute);
  compute();
})();

// Countdown popup — shown once per browser session, closes only via the X or Apply
(function(){
  var m = document.getElementById('cdm');
  var x = document.getElementById('cdm-close');
  if (!m || !x) return;
  var KEY = 'mmt_hp3_cdm_seen';
  try { if (sessionStorage.getItem(KEY)) return; } catch(e){}
  function close(){
    m.classList.remove('show');
    document.documentElement.classList.remove('cdm-lock');
    try { sessionStorage.setItem(KEY, '1'); } catch(e){}
    setTimeout(function(){ m.hidden = true; }, 260);
  }
  m.hidden = false;
  document.documentElement.classList.add('cdm-lock');
  requestAnimationFrame(function(){ m.classList.add('show'); });
  x.addEventListener('click', close);
  var ap = m.querySelector('.cd-btn');
  if (ap) ap.addEventListener('click', close);
  setTimeout(function(){ try { x.focus({ preventScroll: true }); } catch(e){} }, 300);
})();

// Countdown — expires 5pm AEST on the 3rd business day after first visit.
// First-visit timestamp is persisted in localStorage so the deadline is stable
// across reloads and return visits. Rolls forward once the previous window ends.
(function(){
  var STORAGE_KEY = 'mmt_hp3_deadline_v1';
  var elD = document.getElementById('cd-d');
  var elH = document.getElementById('cd-h');
  var elM = document.getElementById('cd-m');
  var elS = document.getElementById('cd-s');
  if (!elD || !elH || !elM || !elS) return;

  // Sydney timezone offset (AEST +10 / AEDT +11) — resolved from a real Date via Intl.
  function sydneyOffsetMs(date){
    // toLocaleString drops timezone; we compare the Sydney wall time to UTC.
    var syd = new Date(date.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    var utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    return syd.getTime() - utc.getTime();
  }

  // Build a UTC epoch for 5pm Sydney local time on a given Sydney calendar date.
  function sydney5pmEpoch(sydY, sydM, sydD){
    // Start from a UTC guess at that Sydney wall-clock instant, then correct for tz.
    var guess = Date.UTC(sydY, sydM, sydD, 17, 0, 0);
    var off = sydneyOffsetMs(new Date(guess));
    return guess - off;
  }

  // Sydney calendar parts for a given epoch.
  function sydneyParts(epoch){
    var s = new Date(epoch).toLocaleString('en-US', {
      timeZone: 'Australia/Sydney',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    });
    // Format: MM/DD/YYYY, HH:MM
    var m = s.match(/(\d{2})\/(\d{2})\/(\d{4}),?\s+(\d{2}):(\d{2})/);
    return {
      y: +m[3], mo: +m[1] - 1, d: +m[2], h: +m[4], mi: +m[5]
    };
  }

  function isWeekend(sydY, sydMo, sydD){
    // Use noon-Sydney to sidestep DST edges when reading day-of-week.
    var epoch = sydney5pmEpoch(sydY, sydMo, sydD) - 5 * 3600 * 1000; // noon Sydney
    var wd = new Date(epoch).toLocaleString('en-US', { timeZone: 'Australia/Sydney', weekday: 'short' });
    return wd === 'Sat' || wd === 'Sun';
  }

  function addOneDay(sydY, sydMo, sydD){
    // Bump via UTC arithmetic then re-read Sydney parts.
    var e = Date.UTC(sydY, sydMo, sydD, 12, 0, 0) + 24 * 3600 * 1000;
    var t = new Date(e);
    return { y: t.getUTCFullYear(), mo: t.getUTCMonth(), d: t.getUTCDate() };
  }

  // Return the epoch for 5pm on the 3rd business day AFTER `from`.
  // Sat/Sun are skipped when counting. Business day boundary is Sydney date.
  function deadlineFrom(fromEpoch){
    var p = sydneyParts(fromEpoch);
    var y = p.y, mo = p.mo, d = p.d;
    var counted = 0;
    while (counted < 3){
      var next = addOneDay(y, mo, d);
      y = next.y; mo = next.mo; d = next.d;
      if (!isWeekend(y, mo, d)) counted++;
    }
    return sydney5pmEpoch(y, mo, d);
  }

  function loadOrSetDeadline(){
    var now = Date.now();
    var raw = null;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch(e){}
    var deadline = raw ? parseInt(raw, 10) : NaN;
    // Invalid or already expired -> start a new window from now.
    if (!deadline || isNaN(deadline) || deadline <= now){
      deadline = deadlineFrom(now);
      try { localStorage.setItem(STORAGE_KEY, String(deadline)); } catch(e){}
    }
    return deadline;
  }

  var target = loadOrSetDeadline();

  // Render the deadline date under the title (e.g. "Closes Wed 16 Sept, 5pm AEST")
  var dateEl = document.getElementById('cd-date');
  function renderDate(){
    if (!dateEl) return;
    var opts = { timeZone: 'Australia/Sydney', weekday: 'short', day: 'numeric', month: 'short' };
    var str = new Date(target).toLocaleDateString('en-AU', opts);
    dateEl.textContent = 'Closes ' + str + ', 5pm AEST';
    var d2 = document.getElementById('cd2-date'); if (d2) d2.textContent = dateEl.textContent;
  }
  renderDate();

  function pad(n){ return n < 10 ? '0' + n : String(n); }
  function tick(){
    var d = target - Date.now();
    if (d <= 0){
      // Window expired -> start a new one anchored at the moment it ran out.
      target = deadlineFrom(Date.now());
      try { localStorage.setItem(STORAGE_KEY, String(target)); } catch(e){}
      renderDate();
      d = target - Date.now();
    }
    var s = Math.floor(d/1000);
    var days = Math.floor(s/86400); s -= days*86400;
    var hrs = Math.floor(s/3600); s -= hrs*3600;
    var mins = Math.floor(s/60); s -= mins*60;
    elD.textContent = pad(days);
    elH.textContent = pad(hrs);
    elM.textContent = pad(mins);
    elS.textContent = pad(s);
    ['d','h','m','s'].forEach(function(k){ var e2 = document.getElementById('cd2-' + k); var e1 = document.getElementById('cd-' + k); if (e2 && e1) e2.textContent = e1.textContent; });
  }
  tick();
  setInterval(tick, 1000);
})();

// Funded trader certificate wall (rotating rows) — mirrors makemoney.com.au
(function () {
  var wall = document.getElementById('certs');
  if (!wall) return;
  var pad = function (i) { return String(i + 1).padStart(2, '0'); };
  var payouts = Array.from({ length: 15 }, function (_, i) {
    return { src: CDN_LOCAL + 'assets/payouts/p' + pad(i) + '.webp', label: 'Payout certificate ' + pad(i), paid: true };
  });
  var certs = Array.from({ length: 56 }, function (_, i) {
    return { src: CDN_LOCAL + 'assets/certs/c' + pad(i) + '.webp', label: 'Funded trader certificate ' + pad(i) };
  });

  // Lightbox for enlarging a cert (in-memory, no dialog API)
  var box = null, boxImg = null;
  function openCert(c) {
    if (!box) {
      box = document.createElement('div');
      box.className = 'cert-box';
      box.innerHTML = '<button class="cert-x" type="button" aria-label="Close">\u00d7</button><img alt="" />';
      boxImg = box.querySelector('img');
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.cert-x')) closeBox();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && box.classList.contains('open')) closeBox();
      });
      document.body.appendChild(box);
    }
    boxImg.src = c.src; boxImg.alt = c.label;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeBox(){ if(box){ box.classList.remove('open'); document.body.style.overflow = ''; } }

  function tile(c, eager, dup) {
    var b = document.createElement('button');
    b.className = 'cert' + (c.paid ? ' cert-paid' : '');
    b.type = 'button';
    b.setAttribute('aria-label', 'Enlarge ' + c.label);
    b.innerHTML = '<img src="' + c.src + '" alt="' + c.label + '"' + (eager ? '' : ' loading="lazy"') + ' decoding="async" />';
    if (dup) { b.setAttribute('aria-hidden', 'true'); b.tabIndex = -1; }
    b.addEventListener('click', function () { openCert(c); });
    return b;
  }

  function buildGroup(items, rowCount, eagerRows) {
    var g = document.createElement('div');
    g.className = 'cw-group';
    var per = Math.ceil(items.length / rowCount);
    for (var r = 0; r < rowCount; r++) {
      var slice = items.slice(r * per, (r + 1) * per);
      if (!slice.length) break;
      var row = document.createElement('div');
      row.className = 'cw-row' + (r % 2 ? ' rev' : '');
      var track = document.createElement('div');
      track.className = 'cw-track';
      var off = r % Math.max(slice.length, 1);
      var seq = slice.slice(off).concat(slice.slice(0, off));
      track.style.setProperty('--cw-dur', (seq.length * 5.2) + 's');
      track.style.setProperty('--cw-delay', (-r * 3.1) + 's');
      var eager = r < eagerRows;
      seq.forEach(function (c) { track.appendChild(tile(c, eager, false)); });
      // Duplicate row for the marquee loop — eager-load matches the primary
      // row so tiles are ready before they scroll into view (no flicker/blank).
      seq.forEach(function (c) { track.appendChild(tile(c, eager, true)); });
      row.appendChild(track);
      g.appendChild(row);
    }
    return g;
  }

  wall.innerHTML = '';
  // Eager-load the first payout row + the first cert row only. All other rows
  // lazy-load, which spares the browser from opening 100+ parallel requests to
  // a cold jsdelivr edge (which triggers aborts and flashing empty tiles).
  wall.appendChild(buildGroup(payouts, 1, 1));
  wall.appendChild(buildGroup(certs, 3, 1)); // bottom half of rows removed

  // Wire Best-Results shots to the same lightbox
  document.querySelectorAll('.shotb').forEach(function (b) {
    b.addEventListener('click', function () {
      openCert({ src: b.dataset.full, label: b.getAttribute('aria-label') || 'Member result' });
    });
  });
})();

// YouTube lightbox
(function(){
  var lb = document.getElementById('lb');
  var frame = document.getElementById('lb-frame');
  var closeBtn = document.getElementById('lb-close');

  function open(id){
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.hidden = true;
    frame.innerHTML = '';
    document.body.style.overflow = '';
  }
  // Event delegation — works for dynamically inserted cards too
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-yt]');
    if (el) open(el.getAttribute('data-yt'));
  });
  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !lb.hidden) close(); });
})();



































































// Story / gallery expanders
document.querySelectorAll('.p-toggle').forEach(function(b){
  b.addEventListener('click',function(){
    var t=document.getElementById(b.dataset.target); if(!t) return; var on=t.classList.toggle('open');
    b.classList.toggle('on',on); b.textContent=on?b.dataset.open:b.dataset.closed;
  });
});
    } catch(e) { console.error('[MMT-HP3] app.js failed', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

// ============================================================
// TYBASE VEIL: hide the "Booking your call now..." intermediate screen
// The Typeform popup lives inside an iframe from form.typeform.com so we can't
// reach its DOM directly (cross-origin). But we CAN detect submission via the
// postMessage event Typeform emits, and we can drop an opaque overlay on TOP of
// the popup iframe for the ~1s between submit and the native redirect firing.
// tybase has button_mode=redirect + a redirect_url, so Typeform auto-navigates
// to Calendly on its own. We just cover the visible intermediate state.
// ============================================================
(function(){
  var veil = null;
  function ensureVeil(){
    if (veil) return veil;
    veil = document.createElement('div');
    veil.id = 'mmt-tf-veil';
    veil.style.cssText = [
      'position:fixed','inset:0','background:#0a0a0a','z-index:2147483647',
      'display:flex','align-items:center','justify-content:center',
      'color:#FF6B1A','font-family:Inter,system-ui,sans-serif','font-size:14px',
      'letter-spacing:.04em','text-transform:uppercase','pointer-events:none',
      'opacity:0','transition:opacity .18s ease'
    ].join(';');
    veil.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:18px"><div style="width:34px;height:34px;border-radius:50%;border:2.5px solid rgba(255,107,26,.2);border-top-color:#FF6B1A;animation:mmt-spin .8s linear infinite"></div><span>Loading your calendar</span></div><style>@keyframes mmt-spin{to{transform:rotate(360deg)}}</style>';
    document.body.appendChild(veil);
    return veil;
  }
  function showVeil(){
    var v = ensureVeil();
    v.style.display = 'flex';
    requestAnimationFrame(function(){ v.style.opacity = '1'; });
    // Auto-hide after 6s in case redirect gets stuck
    setTimeout(function(){ hideVeil(); }, 6000);
  }
  function hideVeil(){
    if (!veil) return;
    veil.style.opacity = '0';
    setTimeout(function(){ if (veil) veil.style.display = 'none'; }, 300);
  }
  function bind(){
    window.addEventListener('message', function(ev){
      if (!ev || !ev.data) return;
      var d = ev.data;
      var type = (d && d.type) || (typeof d === 'string' ? d : '');
      // Typeform emits 'form-submit' string OR {type:'form-submit'} depending on version
      if (type === 'form-submit' || type === 'embed-form-submit') {
        showVeil();
      }
      // Hide the veil if the popup is closed manually
      if (type === 'embed-close-popup' || type === 'popup-close') {
        hideVeil();
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
