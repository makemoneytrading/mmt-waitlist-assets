/* MMT Private Invite — Wix injection bundle for makemoney.com.au/private-invite
   Simple one-pager: title, Wistia video, follow-up line. No buttons. */
(function () {
  'use strict';
  var p = window.location.pathname.replace(/\/+$/, '');
  if (p !== '/private-invite') return;
  if (document.getElementById('mmt-pi-root')) return;

  var LOGO = 'https://cdn.jsdelivr.net/gh/makemoneytrading/mmt-waitlist-assets@0e6803a6247f45561ac1eb6deabf3baa15f79dd7/homepage-v3/assets/logo.png';

  /* Anti-flash: hide Wix shell, paint black */
  var af = document.createElement('style');
  af.id = 'mmt-pi-anti-flash';
  af.textContent =
    'html.mmt-pi-prep,html.mmt-pi-prep body{background:#0a0a0a!important}' +
    'html.mmt-pi-prep body>*:not(#mmt-pi-root){display:none!important}';
  (document.head || document.documentElement).appendChild(af);
  document.documentElement.classList.add('mmt-pi-prep');

  /* Real mobile viewport (Wix ships width=320) */
  var wanted = 'width=device-width, initial-scale=1, viewport-fit=cover';
  function fixViewport() {
    var cur = document.querySelector('meta[name="viewport"]');
    if (cur && cur.getAttribute('content') === wanted && cur.hasAttribute('data-mmt-viewport')) return;
    var metas = document.querySelectorAll('meta[name="viewport"]');
    for (var i = 0; i < metas.length; i++) metas[i].parentNode && metas[i].parentNode.removeChild(metas[i]);
    var m = document.createElement('meta');
    m.name = 'viewport'; m.setAttribute('content', wanted); m.setAttribute('data-mmt-viewport', '1');
    document.head.appendChild(m);
  }
  fixViewport();

  function addLink(rel, href, cross) {
    var l = document.createElement('link'); l.rel = rel; l.href = href;
    if (cross) l.crossOrigin = ''; document.head.appendChild(l);
  }
  addLink('preconnect', 'https://fast.wistia.com', true);
  addLink('preconnect', 'https://fonts.googleapis.com');
  addLink('stylesheet', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Anton&display=swap');

  var wl = document.createElement('script'); wl.src = 'https://fast.wistia.com/player.js'; wl.async = true; document.head.appendChild(wl);
  var wm = document.createElement('script'); wm.src = 'https://fast.wistia.com/embed/rd7d652xeu.js'; wm.async = true; wm.type = 'module'; document.head.appendChild(wm);

  var css = document.createElement('style');
  css.id = 'mmt-pi-css';
  css.textContent = [
    'html,body{margin:0!important;padding:0!important;width:100%!important;max-width:100vw!important;min-width:0!important;overflow-x:hidden!important;background:#0a0a0a!important}',
    '#mmt-pi-root{position:relative;min-height:100vh;min-height:100dvh;width:100%;background:#0a0a0a;color:#f7f7f5;font-family:Inter,system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;box-sizing:border-box}',
    '#mmt-pi-root *,#mmt-pi-root *::before,#mmt-pi-root *::after{box-sizing:border-box}',
    '#mmt-pi-root::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(255,107,26,.16),transparent 70%),radial-gradient(ellipse 80% 60% at 50% 100%,rgba(255,107,26,.06),transparent 70%)}',
    '.pi-hdr{position:relative;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(10,10,10,.85)}',
    '.pi-hdr-in{max-width:1280px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}',
    '.pi-logo{height:38px;width:auto;display:block}',
    '.pi-lic{text-align:right;line-height:1.2;color:inherit;text-decoration:none;display:inline-block;transition:opacity .15s ease}',
    '.pi-lic:hover,.pi-lic:focus-visible{opacity:.85}',
    '.pi-lic:focus-visible{outline:2px solid #FF6B1A;outline-offset:3px;border-radius:4px}',
    '.pi-lic-k{display:block;font-size:10px;color:#8a8880;letter-spacing:.14em;text-transform:uppercase}',
    '.pi-lic-v{display:block;font-size:12px;color:#c7c5c0;font-weight:600;margin-top:2px}',
    '.pi-main{position:relative;flex:1;padding:56px 24px 72px;text-align:center}',
    '.pi-in{max-width:1000px;margin:0 auto}',
    '.pi-eyebrow{display:inline-block;margin:0 0 18px;padding:8px 16px;border:1px solid rgba(255,107,26,.45);border-radius:999px;background:rgba(255,107,26,.08);color:#FF6B1A;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}',
    '.pi-title{margin:0 0 36px;font-family:Anton,Inter,sans-serif;font-weight:400;line-height:.95;letter-spacing:-.01em;text-transform:uppercase;font-size:clamp(44px,7.5vw,104px);color:#f7f7f5;text-shadow:0 6px 40px rgba(0,0,0,.6)}',
    '.pi-title .hl{color:#FF6B1A;text-shadow:0 0 40px rgba(255,107,26,.35),0 6px 40px rgba(0,0,0,.6)}',
    '.pi-frame{position:relative;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:#000;border:2px solid #FF6B1A;box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 8px rgba(255,107,26,.08),0 0 60px rgba(255,107,26,.2)}',
    '.pi-frame wistia-player{display:block;width:100%;height:100%}',
    "wistia-player[media-id='rd7d652xeu']:not(:defined){background:center / contain no-repeat url('https://fast.wistia.com/embed/medias/rd7d652xeu/swatch');display:block;filter:blur(5px);padding-top:56.25%}",
    '.pi-note{margin:32px auto 0;max-width:720px;font-size:clamp(18px,2.2vw,24px);font-weight:700;line-height:1.4;color:#f7f7f5}',
    '.pi-ftr{position:relative;border-top:1px solid rgba(255,255,255,.08);padding:24px;text-align:center;font-size:11px;color:#8a8880;line-height:1.6}',
    '@media(max-width:640px){.pi-hdr-in{padding:12px 16px}.pi-logo{height:30px}.pi-lic-k{font-size:9px}.pi-lic-v{font-size:11px}.pi-main{padding:36px 16px 48px}.pi-title{font-size:13vw;margin-bottom:24px}.pi-frame{border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.5),0 0 0 5px rgba(255,107,26,.08),0 0 40px rgba(255,107,26,.18)}.pi-note{margin-top:24px;font-size:18px}}'
  ].join('');
  document.head.appendChild(css);

  function render() {
    if (document.getElementById('mmt-pi-root')) return;
    document.body.classList.remove('device-mobile-optimized', 'device-mobile-non-optimized');
    var root = document.createElement('div');
    root.id = 'mmt-pi-root';
    root.innerHTML =
      '<header class="pi-hdr"><div class="pi-hdr-in">' +
        '<img class="pi-logo" src="' + LOGO + '" alt="Make Money Team" width="140" height="52">' +
        '<a class="pi-lic" href="https://service.asic.gov.au/search/RepresentativeDetail?PermissionType=Australian%20financial%20services%20authorised%20representatives&amp;RepNumber=001310836" target="_blank" rel="noopener noreferrer" aria-label="Verify our Financial Services Licence on the ASIC register"><span class="pi-lic-k">Financial Services Licence</span><span class="pi-lic-v">AFSL #460940 / AR #1310836</span></a>' +
      '</div></header>' +
      '<main class="pi-main"><div class="pi-in">' +
        '<h1 class="pi-title">Private <span class="hl">Video</span></h1>' +
        '<div class="pi-frame"><wistia-player media-id="rd7d652xeu" aspect="1.7777777777777777"></wistia-player></div>' +
        '<p class="pi-note">Watch this video then jump back into our chat and let me know you have any questions \uD83D\uDCAA</p>' +
      '</div></main>' +
      '';
    document.body.appendChild(root);
    document.title = 'Private Video | Make Money Team';
    fixViewport();
  }
  if (document.body) render(); else document.addEventListener('DOMContentLoaded', render, { once: true });
  window.addEventListener('load', function () { fixViewport(); render(); }, { once: true });
  var n = 0, t = setInterval(function () { fixViewport(); if (++n > 12) clearInterval(t); }, 250);
})();
