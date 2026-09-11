/* MMT Router Homepage — Wix injection bundle
   Replaces the six-section waitlist gate with a two-step segment router.
   Business Owner / Employee → FIFO / Tradie / High-Income → destination LPs.
   Previous waitlist bundle preserved at mmt-waitlist-gate.waitlist-2026-09-11.js.backup
*/
(function () {
  'use strict';

  // Only run on the homepage
  var p = window.location.pathname;
  if (p !== '/' && p !== '/home' && p !== '') return;
  if (document.getElementById('mmt-router-root')) return;

  /* ---- ANTI-FLASH: hide the Wix site content immediately ---- */
  (function hideWixUntilOverlay() {
    var earlyStyle = document.createElement('style');
    earlyStyle.id = 'mmt-anti-flash';
    earlyStyle.textContent =
      'html.mmt-router-prep { background: #060606 !important; }' +
      'html.mmt-router-prep body { background: #060606 !important; visibility: hidden !important; }' +
      'html.mmt-router-prep #mmt-router-root { visibility: visible !important; }';
    (document.head || document.documentElement).appendChild(earlyStyle);
    document.documentElement.classList.add('mmt-router-prep');
  })();

  // Preconnect for fonts
  function addLink(rel, href, crossOrigin) {
    var l = document.createElement('link');
    l.rel = rel; l.href = href;
    if (crossOrigin) l.crossOrigin = '';
    (document.head || document.documentElement).appendChild(l);
  }
  addLink('preconnect', 'https://api.fontshare.com');
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap';
  (document.head || document.documentElement).appendChild(fontLink);

  // Base image URL (jsDelivr from this repo, resolved at build time)
  var LOGO_URL = 'https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets/assets/mmt-logo.png';

  /* ---------- STYLES ---------- */
  var css = '';
  css += ':root { --bg: #060606; --surface: #0e0e10; --surface-2: #141416; --text: #ffffff; --muted: #a3a3a8; --dim: #5a5a60; --border: #22222a; --accent: #FF6B1A; --accent-hover: #FF7A2E; --accent-glow: rgba(255,107,26,0.35); --ease: cubic-bezier(0.16,1,0.3,1); }';
  css += '#mmt-router-root, #mmt-router-root * { box-sizing: border-box; }';
  css += '#mmt-router-root { position: fixed; inset: 0; z-index: 2147483000; background: var(--bg); color: var(--text); font-family: "Satoshi","Inter",-apple-system,BlinkMacSystemFont,system-ui,sans-serif; font-feature-settings: "ss01","cv11"; -webkit-font-smoothing: antialiased; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; }';
  css += '#mmt-router-root b { font-weight: 700; }';
  css += '#mmt-router-root button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }';
  // Glows
  css += '#mmt-router-root .glow-top { content: ""; position: fixed; inset: -20% -20% auto -20%; height: 60vh; background: radial-gradient(ellipse at 50% 0%, var(--accent-glow) 0%, transparent 60%); filter: blur(60px); opacity: 0.55; pointer-events: none; z-index: 0; }';
  css += '#mmt-router-root .glow-bot { content: ""; position: fixed; inset: auto -20% -20% -20%; height: 55vh; background: radial-gradient(ellipse at 50% 100%, var(--accent-glow) 0%, transparent 60%); filter: blur(60px); opacity: 0.45; pointer-events: none; z-index: 0; }';
  // Ticker
  css += '#mmt-router-root .ticker { position: relative; z-index: 2; height: 34px; background: #050505; border-bottom: 1px solid var(--border); overflow: hidden; }';
  css += '#mmt-router-root .ticker__track { display: flex; align-items: center; gap: 42px; padding-left: 42px; white-space: nowrap; height: 100%; animation: mmt-marquee 90s linear infinite; will-change: transform; }';
  css += '#mmt-router-root .ticker:hover .ticker__track { animation-play-state: paused; }';
  css += '#mmt-router-root .tk { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.02em; color: var(--muted); }';
  css += '#mmt-router-root .tk-dot { width: 6px; height: 6px; border-radius: 50%; }';
  css += '#mmt-router-root .tk-dot.up { background: #2ecc71; box-shadow: 0 0 8px rgba(46,204,113,0.6); }';
  css += '#mmt-router-root .tk-dot.down { background: var(--accent); box-shadow: 0 0 8px rgba(255,107,26,0.6); }';
  css += '#mmt-router-root .tk-label { color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; }';
  css += '#mmt-router-root .tk-price { color: var(--text); font-weight: 700; }';
  css += '#mmt-router-root .tk-change { font-style: normal; font-weight: 700; font-size: 11.5px; }';
  css += '#mmt-router-root .tk-change.up { color: #2ecc71; }';
  css += '#mmt-router-root .tk-change.down { color: #ff4d4d; }';
  css += '@keyframes mmt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }';
  // Header
  css += '#mmt-router-root .site-head { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; border-bottom: 1px solid var(--border); gap: 24px; }';
  css += '#mmt-router-root .brand { display: inline-flex; align-items: center; text-decoration: none; }';
  css += '#mmt-router-root .brand img { height: 56px; width: auto; display: block; }';
  css += '#mmt-router-root .license { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; line-height: 1.1; text-align: right; flex-shrink: 0; }';
  css += '#mmt-router-root .license__label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); font-weight: 600; }';
  css += '#mmt-router-root .license__num { font-size: 13px; color: var(--text); font-weight: 700; letter-spacing: 0.02em; }';
  // Wrap
  css += '#mmt-router-root .wrap { flex: 1; max-width: 1080px; width: 100%; margin: 0 auto; padding: 48px 24px 48px; position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: center; }';
  // Step
  css += '#mmt-router-root .step { display: none; opacity: 0; transform: translateY(8px); transition: opacity 0.45s var(--ease), transform 0.45s var(--ease); }';
  css += '#mmt-router-root .step.step--active { display: flex; flex-direction: column; opacity: 1; transform: none; }';
  // Hook
  css += '#mmt-router-root .hook { font-family: "Satoshi","Inter",system-ui,sans-serif; font-weight: 900; font-size: clamp(30px, 4.1vw, 52px); line-height: 1.06; letter-spacing: -0.02em; text-align: center; margin: 0 auto 72px; max-width: 1280px; white-space: normal; text-wrap: balance; }';
  css += '#mmt-router-root .hook br { display: block; }';
  css += '#mmt-router-root .hook__accent { color: var(--accent); white-space: nowrap; }';
  // Back
  css += '#mmt-router-root .back { align-self: flex-start; margin: 0 auto 32px 0; display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; font-weight: 600; padding: 8px 14px; border: 1px solid var(--border); border-radius: 999px; transition: color 0.2s, border-color 0.2s, background 0.2s; }';
  css += '#mmt-router-root .back:hover { color: var(--text); border-color: var(--accent); background: rgba(255,107,26,0.08); }';
  // Cards
  css += '#mmt-router-root .cards { display: grid; gap: 20px; margin: 0 auto; width: 100%; }';
  css += '#mmt-router-root .cards--2 { grid-template-columns: repeat(2, 1fr); max-width: 860px; }';
  css += '#mmt-router-root .cards--3 { grid-template-columns: repeat(3, 1fr); max-width: 1000px; }';
  css += '#mmt-router-root .card { position: relative; text-align: left; background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 28px 26px 24px; min-height: 220px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; overflow: hidden; transition: border-color 0.28s var(--ease), transform 0.28s var(--ease), background 0.28s var(--ease); }';
  css += '#mmt-router-root .card:hover { border-color: var(--accent); background: var(--surface-2); transform: translateY(-2px); }';
  css += '#mmt-router-root .card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 100% 0%, rgba(255,107,26,0.08), transparent 55%); opacity: 0; transition: opacity 0.28s var(--ease); pointer-events: none; }';
  css += '#mmt-router-root .card:hover::before { opacity: 1; }';
  css += '#mmt-router-root .card__icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,107,26,0.12); border: 1px solid rgba(255,107,26,0.28); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 6px; }';
  css += '#mmt-router-root .card__icon svg { width: 22px; height: 22px; }';
  css += '#mmt-router-root .card__label { font-size: 22px; font-weight: 800; letter-spacing: -0.01em; color: var(--text); }';
  css += '#mmt-router-root .card__desc { color: var(--muted); font-size: 14.5px; line-height: 1.5; }';
  css += '#mmt-router-root .card__cta { margin-top: auto; padding-top: 10px; color: var(--accent); font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }';
  // Footer
  css += '#mmt-router-root .foot { position: relative; z-index: 2; padding: 28px 24px 34px; border-top: 1px solid var(--border); text-align: center; color: var(--muted); font-size: 12px; letter-spacing: 0.02em; display: flex; flex-direction: column; gap: 14px; align-items: center; }';
  css += '#mmt-router-root .foot__pills { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }';
  css += '#mmt-router-root .foot__pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px 6px 10px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); font-size: 12.5px; font-weight: 600; text-decoration: none; letter-spacing: 0.02em; transition: color 0.2s, border-color 0.2s, background 0.2s; }';
  css += '#mmt-router-root .foot__pill:hover { color: var(--text); border-color: var(--muted); background: rgba(255,255,255,0.04); }';
  css += '#mmt-router-root .foot__pill-icon { width: 14px; height: 14px; }';
  css += '#mmt-router-root .foot__pill--tp .foot__pill-icon { color: #00b67a; }';
  css += '#mmt-router-root .foot__pill--tp:hover { border-color: #00b67a; color: #00b67a; }';
  css += '#mmt-router-root .foot__pill--tp:hover .foot__pill-icon { color: #00b67a; }';
  css += '#mmt-router-root .foot__pill--yt .foot__pill-icon { color: #ff0033; }';
  css += '#mmt-router-root .foot__pill--yt:hover { border-color: #ff0033; color: #ff0033; }';
  css += '#mmt-router-root .foot__pill--yt:hover .foot__pill-icon { color: #ff0033; }';
  css += '#mmt-router-root .foot__trust { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; color: var(--muted); font-size: 12.5px; line-height: 1.5; }';
  css += '#mmt-router-root .foot__trust b { color: var(--text); font-weight: 700; }';
  css += '#mmt-router-root .foot__sep { color: var(--dim); }';
  // Mobile
  css += '@media (max-width: 720px) {';
  css += '#mmt-router-root .site-head { padding: 12px 16px; gap: 10px; align-items: center; }';
  css += '#mmt-router-root .brand img { height: 36px; }';
  css += '#mmt-router-root .ticker { height: 28px; }';
  css += '#mmt-router-root .ticker__track { gap: 22px; padding-left: 22px; animation-duration: 70s; }';
  css += '#mmt-router-root .tk { font-size: 10.5px; }';
  css += '#mmt-router-root .tk-label { font-size: 9.5px; }';
  css += '#mmt-router-root .license { flex-shrink: 0; align-items: flex-end; }';
  css += '#mmt-router-root .license__label { font-size: 8.5px; letter-spacing: 0.1em; }';
  css += '#mmt-router-root .license__num { font-size: 10px; }';
  css += '#mmt-router-root .wrap { padding: 40px 20px 32px; max-width: 100vw; width: 100%; box-sizing: border-box; }';
  css += '#mmt-router-root .step { text-align: center; }';
  css += '#mmt-router-root .hook { font-size: 30px; line-height: 1.15; margin: 0 auto 36px; padding: 0; letter-spacing: -0.015em; max-width: 100%; white-space: normal; }';
  css += '#mmt-router-root .hook br { display: block; }';
  css += '#mmt-router-root .hook__accent { white-space: normal; display: block; margin-top: 6px; }';
  css += '#mmt-router-root .cards--2, #mmt-router-root .cards--3 { grid-template-columns: 1fr; gap: 12px; max-width: 100%; }';
  css += '#mmt-router-root .card { padding: 20px; min-height: unset; text-align: left; }';
  css += '#mmt-router-root .card__label { font-size: 19px; }';
  css += '#mmt-router-root .card__desc { font-size: 13.5px; line-height: 1.45; }';
  css += '#mmt-router-root .card__cta { font-size: 13.5px; }';
  css += '#mmt-router-root .back { align-self: center; margin: 0 auto 20px; font-size: 13px; }';
  css += '#mmt-router-root .foot { padding: 20px 16px 24px; }';
  css += '#mmt-router-root .foot__trust { font-size: 11.5px; gap: 6px; padding: 0 8px; }';
  css += '#mmt-router-root .foot__pill { font-size: 11.5px; padding: 5px 10px; }';
  css += '#mmt-router-root .glow-top, #mmt-router-root .glow-bot { opacity: 0.35; }';
  css += '}';
  css += '@media (max-width: 380px) {';
  css += '#mmt-router-root .hook { font-size: 26px; }';
  css += '#mmt-router-root .brand img { height: 32px; }';
  css += '#mmt-router-root .license__label { font-size: 8px; }';
  css += '#mmt-router-root .license__num { font-size: 9.5px; }';
  css += '}';
  css += '@media (max-width: 900px) and (min-width: 721px) {';
  css += '#mmt-router-root .cards--3 { grid-template-columns: repeat(2, 1fr); }';
  css += '}';

  var styleEl = document.createElement('style');
  styleEl.id = 'mmt-router-styles';
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  /* ---------- MARKUP ---------- */
  var root = document.createElement('div');
  root.id = 'mmt-router-root';
  root.innerHTML = [
    '<div class="glow-top"></div>',
    '<div class="glow-bot"></div>',
    // Ticker
    '<div class="ticker" role="marquee" aria-label="Market prices">',
    '  <div class="ticker__track" id="mmt-marketTicker"></div>',
    '</div>',
    // Header
    '<header class="site-head">',
    '  <a class="brand" href="/" aria-label="Make Money Team home">',
    '    <img src="' + LOGO_URL + '" alt="Make Money Team" />',
    '  </a>',
    '  <div class="license">',
    '    <span class="license__label">Financial Services License</span>',
    '    <span class="license__num">#460940 / AR #1310836</span>',
    '  </div>',
    '</header>',
    // Main
    '<main class="wrap">',
    // Step 1
    '  <section class="step step--active" id="mmt-step-1" aria-hidden="false">',
    '    <h1 class="hook">You know how to work for money.<br/><span class="hook__accent">Learn how to make money work for you.</span></h1>',
    '    <div class="cards cards--2">',
    '      <button class="card" type="button" data-goto="/business">',
    '        <span class="card__icon" aria-hidden="true">',
    '          <svg viewBox="0 0 40 40" fill="none"><rect x="6" y="12" width="28" height="20" rx="1.5" stroke="currentColor" stroke-width="2"/><path d="M14 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" stroke="currentColor" stroke-width="2"/><path d="M6 20h28" stroke="currentColor" stroke-width="2"/></svg>',
    '        </span>',
    '        <span class="card__label">Business Owner</span>',
    '        <span class="card__desc">Founders, CEOs, and owner-operators.</span>',
    '        <span class="card__cta">Continue <span aria-hidden="true">&rarr;</span></span>',
    '      </button>',
    '      <button class="card" type="button" data-next="employee">',
    '        <span class="card__icon" aria-hidden="true">',
    '          <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="6" stroke="currentColor" stroke-width="2"/><path d="M8 34c1.8-6.2 6.6-10 12-10s10.2 3.8 12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    '        </span>',
    '        <span class="card__label">Employee</span>',
    '        <span class="card__desc">You work for someone else, full-time or FIFO.</span>',
    '        <span class="card__cta">Continue <span aria-hidden="true">&rarr;</span></span>',
    '      </button>',
    '    </div>',
    '  </section>',
    // Step 2
    '  <section class="step" id="mmt-step-2" aria-hidden="true">',
    '    <button class="back" type="button" data-back aria-label="Back to previous step">',
    '      <span aria-hidden="true">&larr;</span> Back',
    '    </button>',
    '    <h1 class="hook">What do you do for work?</h1>',
    '    <div class="cards cards--3">',
    '      <button class="card" type="button" data-goto="/fifo">',
    '        <span class="card__icon" aria-hidden="true">',
    '          <svg viewBox="0 0 40 40" fill="none"><path d="M20 6l14 8v12L20 34 6 26V14l14-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 6v28M6 14l14 8 14-8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    '        </span>',
    '        <span class="card__label">FIFO Worker</span>',
    '        <span class="card__desc">Mining, oil, gas, and remote-shift workers.</span>',
    '        <span class="card__cta">Continue <span aria-hidden="true">&rarr;</span></span>',
    '      </button>',
    '      <button class="card" type="button" data-goto="/tradie">',
    '        <span class="card__icon" aria-hidden="true">',
    '          <svg viewBox="0 0 40 40" fill="none"><path d="M14 24L6 32l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M18 20l10-10a4 4 0 1 1 4 4L22 24l-4-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 18l10 10-4 4L18 22" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    '        </span>',
    '        <span class="card__label">Tradie</span>',
    '        <span class="card__desc">Sparkies, chippies, plumbers, builders.</span>',
    '        <span class="card__cta">Continue <span aria-hidden="true">&rarr;</span></span>',
    '      </button>',
    '      <button class="card" type="button" data-goto="/high-income">',
    '        <span class="card__icon" aria-hidden="true">',
    '          <svg viewBox="0 0 40 40" fill="none"><path d="M20 6v28M14 12h9a4 4 0 0 1 0 8h-6a4 4 0 0 0 0 8h9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '        </span>',
    '        <span class="card__label">High-Income Earner</span>',
    '        <span class="card__desc">Professionals earning $150k+ per year.</span>',
    '        <span class="card__cta">Continue <span aria-hidden="true">&rarr;</span></span>',
    '      </button>',
    '    </div>',
    '  </section>',
    '</main>',
    // Footer
    '<footer class="foot">',
    '  <div class="foot__pills" role="navigation" aria-label="Verify us">',
    '    <a class="foot__pill foot__pill--yt" href="https://www.youtube.com/@mentor_mitch" target="_blank" rel="noopener">',
    '      <svg class="foot__pill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>',
    '      YouTube',
    '    </a>',
    '    <a class="foot__pill" href="https://results.makemoney.com.au" target="_blank" rel="noopener">',
    '      <svg class="foot__pill-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '      Results',
    '    </a>',
    '    <a class="foot__pill foot__pill--tp" href="https://au.trustpilot.com/review/makemoneytrading.com.au" target="_blank" rel="noopener">',
    '      <svg class="foot__pill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 7.6H22l-6.2 4.7L18.4 22 12 17.3 5.6 22l2.6-7.7L2 9.6h7.4L12 2z"/></svg>',
    '      Trustpilot',
    '    </a>',
    '  </div>',
    '  <div class="foot__trust">',
    '    <span>Trusted by <b>1,000+ Aussies</b></span>',
    '    <span class="foot__sep" aria-hidden="true">&middot;</span>',
    '    <span><b>10,000+</b> verified results</span>',
    '    <span class="foot__sep" aria-hidden="true">&middot;</span>',
    '    <span><b>0</b> negative reviews</span>',
    '  </div>',
    '</footer>'
  ].join('');

  /* ---------- MOUNT ---------- */
  function mount() {
    if (document.getElementById('mmt-router-root')) return;
    document.body.appendChild(root);
    // Reveal
    document.documentElement.classList.remove('mmt-router-prep');
    var antiFlash = document.getElementById('mmt-anti-flash');
    if (antiFlash) antiFlash.remove();
    // Wire behaviour
    initRouter();
    renderTicker();
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }

  /* ---------- BEHAVIOUR ---------- */
  var DESTINATIONS = {
    '/business':    'https://mmt-business-owners.pplx.app',
    '/fifo':        'https://mmt-tradies.pplx.app',
    '/tradie':      'https://mmt-tradies.pplx.app',
    '/high-income': 'https://mmt-high-income-earners.pplx.app'
  };

  function showStep(el) {
    var active = root.querySelector('.step.step--active');
    if (active === el) return;
    if (active) {
      active.style.opacity = '0';
      active.style.transform = 'translateY(-8px)';
      setTimeout(function () {
        active.classList.remove('step--active');
        active.setAttribute('aria-hidden', 'true');
        active.style.transform = '';
        el.classList.add('step--active');
        el.setAttribute('aria-hidden', 'false');
        void el.offsetWidth;
        el.style.opacity = '1';
        // scroll overlay to top
        try { root.scrollTop = 0; } catch (e) {}
      }, 250);
    } else {
      el.classList.add('step--active');
    }
  }

  function go(pathKey) {
    var dest = DESTINATIONS[pathKey];
    if (!dest) return;
    try {
      if (window.gtag) window.gtag('event', 'router_select', { segment: pathKey });
      if (window.dataLayer) window.dataLayer.push({ event: 'router_select', segment: pathKey });
    } catch (e) {}
    window.location.assign(dest);
  }

  function initRouter() {
    var step1 = root.querySelector('#mmt-step-1');
    var step2 = root.querySelector('#mmt-step-2');
    root.addEventListener('click', function (e) {
      var card = e.target.closest('.card');
      if (card && root.contains(card)) {
        var next = card.getAttribute('data-next');
        var goto = card.getAttribute('data-goto');
        if (next === 'employee') {
          showStep(step2);
        } else if (goto) {
          go(goto);
        }
        return;
      }
      var back = e.target.closest('[data-back]');
      if (back && root.contains(back)) {
        showStep(step1);
      }
    });
  }

  /* ---------- MARKET TICKER ---------- */
  var TICKER_ITEMS = [
    { label: 'S&P 500', price: '7,591.70', change: '-0.58%', dir: 'down' },
    { label: 'NASDAQ',  price: '26,081.73', change: '-0.65%', dir: 'down' },
    { label: 'DOW',     price: '52,064.10', change: '-0.60%', dir: 'down' },
    { label: 'BTC',     price: '$76,776',   change: '-1.98%', dir: 'down' },
    { label: 'ETH',     price: '$2,443',    change: '-1.24%', dir: 'down' },
    { label: 'ASX 200', price: '8,872.40',  change: '+0.22%', dir: 'up'   },
    { label: 'GOLD',    price: '$3,614',    change: '+0.41%', dir: 'up'   }
  ];

  function renderTicker() {
    var track = root.querySelector('#mmt-marketTicker');
    if (!track) return;
    var html = '';
    for (var pass = 0; pass < 2; pass++) {
      for (var i = 0; i < TICKER_ITEMS.length; i++) {
        var it = TICKER_ITEMS[i];
        var arrow = it.dir === 'up' ? '\u25B2' : '\u25BC';
        html += '<span class="tk" aria-hidden="' + (pass === 1 ? 'true' : 'false') + '">' +
                  '<i class="tk-dot ' + it.dir + '"></i>' +
                  '<span class="tk-label">' + it.label + '</span> ' +
                  '<strong class="tk-price">' + it.price + '</strong> ' +
                  '<em class="tk-change ' + it.dir + '">' + arrow + ' ' + it.change + '</em>' +
                '</span>';
      }
    }
    track.innerHTML = html;
  }
})();
