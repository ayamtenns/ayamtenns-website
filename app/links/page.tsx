import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AyamTenns — Links",
  description:
    "Your daily craving nashville chicken. Order via GrabFood, GoFood, WhatsApp, or visit our website. BSD City, Indonesia.",
}

export default function LinksPage() {
  return (
    <>
      <style>{`
        :root{
          --red:#D91C1C;
          --ink:#0E0E0E;
          --paper:#FFFFFF;
          --ash:#F2F2F0;
          --rule:#0E0E0E;
          --hair:1px;
          --muted:#0E0E0E99;
        }
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:var(--paper);color:var(--ink);font-family:"Inter Tight",system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh}
        ::selection{background:var(--red);color:#fff}
        a{color:inherit;text-decoration:none}
        .mono{font-family:"JetBrains Mono",ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase}

        .page{max-width:1500px;margin:0 auto;border-left:var(--hair) solid var(--rule);border-right:var(--hair) solid var(--rule);min-height:100vh;display:flex;flex-direction:column;position:relative}

        /* top meta */
        .meta{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-bottom:var(--hair) solid var(--rule);font-size:11px}
        .meta > *{padding:10px 22px}
        .meta .l{color:var(--muted)}
        .meta .c{border-left:var(--hair) solid var(--rule);border-right:var(--hair) solid var(--rule);text-transform:uppercase;font-weight:700;letter-spacing:.08em}
        .meta .r{display:flex;gap:18px;justify-content:flex-end;color:var(--muted)}
        .dot{display:inline-block;width:7px;height:7px;background:var(--red);margin-right:6px;transform:translateY(-1px)}
        .blink{animation:blink 1.2s steps(2,end) infinite}
        @keyframes blink{50%{opacity:.15}}

        /* ---------- HEAD: split editorial layout ---------- */
        .head{display:grid;grid-template-columns: 1.4fr 1fr;border-bottom:var(--hair) solid var(--rule)}
        .head .L{padding:46px 32px 32px;border-right:var(--hair) solid var(--rule);position:relative}
        .head .R{padding:46px 32px 32px;display:flex;flex-direction:column;justify-content:space-between;gap:24px;background:var(--ash);position:relative;overflow:hidden}

        .kicker{display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:18px}
        .kicker .pill{display:inline-flex;align-items:center;gap:8px;padding:5px 9px;border:var(--hair) solid var(--ink);font-weight:700;color:var(--ink)}

        .wordmark{font-family:"Archivo Black";font-size:clamp(64px, 10.5vw, 168px);line-height:.82;letter-spacing:-.035em;text-transform:uppercase}
        .wordmark .slash{color:var(--red)}

        .tagline{margin-top:18px;font-family:"Inter Tight";font-weight:600;font-size:clamp(14px,1.2vw,18px);letter-spacing:-.005em;max-width:36ch}
        .tagline em{font-style:italic;font-weight:400;color:var(--red)}

        /* right column big index card */
        .indexcard{border:var(--hair) solid var(--ink);background:#fff;padding:18px;display:flex;flex-direction:column;gap:14px}
        .indexcard h4{font-family:"JetBrains Mono";font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:500}
        .indexcard ol{list-style:none;display:flex;flex-direction:column}
        .indexcard ol li{display:flex;gap:14px;padding:6px 0;border-top:var(--hair) dashed #0e0e0e33;font-family:"JetBrains Mono";font-size:11px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
        .indexcard ol li:first-child{border-top:0}
        .indexcard ol li b{color:var(--red);font-weight:700;min-width:20px}
        .indexcard ol li span{flex:1}
        .indexcard ol li .pg{color:var(--muted)}
        .indexcard ol li:hover{color:var(--red)}

        .stamp-row{display:flex;align-items:center;gap:14px}
        .stamp{width:96px;height:96px;border:var(--hair) solid var(--red);color:var(--red);display:grid;place-items:center;transform:rotate(-6deg);position:relative;background:#fff;flex-shrink:0}
        .stamp::before{content:"";position:absolute;inset:5px;border:var(--hair) dashed var(--red);opacity:.7}
        .stamp .inner{text-align:center;font-family:"Archivo Black";font-size:9px;letter-spacing:.04em;text-transform:uppercase;line-height:1}
        .stamp .inner b{display:block;font-size:18px;letter-spacing:-.02em;margin:3px 0}
        .stamp-cap{font-family:"JetBrains Mono";font-size:11px;letter-spacing:.1em;text-transform:uppercase;line-height:1.5;color:var(--muted)}
        .stamp-cap b{display:block;color:var(--ink);font-weight:700;font-size:13px}

        /* divider */
        .red-rule{height:4px;background:var(--red)}

        /* ---------- LIST: bigger, more editorial rows ---------- */
        .list-head{display:grid;grid-template-columns: 1fr auto;align-items:center;padding:14px 28px;border-bottom:var(--hair) solid var(--rule);font-family:"JetBrains Mono";font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
        .list-head b{color:var(--ink);font-weight:700}

        .list{flex:1;display:flex;flex-direction:column;border-bottom:var(--hair) solid var(--rule)}
        .row{display:grid;grid-template-columns: 96px 1fr auto 80px;align-items:center;border-top:var(--hair) solid var(--rule);padding:26px 28px;cursor:pointer;position:relative;transition:background .25s ease, color .25s ease;text-decoration:none;overflow:hidden}
        .row:first-child{border-top:0}
        .row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.7,0,.2,1);z-index:0}
        .row.feat::before{background:var(--ink);transform:scaleX(1)}
        .row > *{position:relative;z-index:1}
        .row:hover::before{transform:scaleX(1)}
        .row:hover{color:#fff}
        .row:hover .num{color:#ffffff66}
        .row:hover .body .sub{color:#ffffffaa}
        .row:hover .meta-r{color:#ffffffaa}
        .row:hover .meta-r .badge{border-color:#ffffff66}
        .row:hover .arrow{background:var(--red);border-color:var(--red);color:#fff;transform:translate(-4px,-4px)}

        .row .num{font-family:"Archivo Black";font-size:42px;letter-spacing:-.02em;color:#0e0e0e1f;line-height:1}
        .row .body .title{font-family:"Archivo Black";font-size:clamp(22px, 2.4vw, 34px);letter-spacing:-.005em;text-transform:uppercase;line-height:1}
        .row .body .sub{font-family:"JetBrains Mono";font-size:11px;letter-spacing:.12em;color:var(--muted);text-transform:uppercase;margin-top:8px}
        .row .meta-r{font-family:"JetBrains Mono";font-size:10px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;text-align:right;padding-right:22px;display:flex;flex-direction:column;gap:6px;align-items:flex-end}
        .row .meta-r .badge{display:inline-flex;align-items:center;gap:6px;border:var(--hair) solid var(--ink);padding:3px 7px;font-weight:700;color:var(--ink)}
        .row .meta-r .badge .d{width:6px;height:6px;background:var(--red)}
        .row .arrow{justify-self:end;width:46px;height:46px;display:grid;place-items:center;border:var(--hair) solid var(--ink);font-family:"JetBrains Mono";font-weight:700;font-size:18px;background:#fff;transition:transform .3s cubic-bezier(.7,0,.2,1), background .25s ease, color .25s ease, border-color .25s ease}

        /* featured (Grab) row — solid red persistent */
        .row.feat{color:#fff}
        .row.feat::before{background:var(--red)}
        .row.feat .num{color:#ffffff44}
        .row.feat .body .sub{color:#ffffffcc}
        .row.feat .meta-r{color:#ffffffcc}
        .row.feat .meta-r .badge{border-color:#ffffff66;color:#fff}
        .row.feat .meta-r .badge .d{background:#fff}
        .row.feat .arrow{background:transparent;border-color:#fff;color:#fff}
        .row.feat:hover::before{background:var(--ink)}
        .row.feat:hover .arrow{background:var(--red);border-color:var(--red);color:#fff}

        /* ---------- ticker ---------- */
        .ticker{display:flex;align-items:stretch;position:relative;overflow:hidden;background:var(--ink);color:#fff;overflow:hidden;border-bottom:var(--hair) solid var(--rule);position:relative;z-index:0}
        .ticker .tag{padding:12px 14px;background:var(--red);position:relative;z-index:2;flex-shrink:0;font-family:"Archivo Black";font-size:12px;letter-spacing:.06em;text-transform:uppercase;border-right:var(--hair) solid var(--red);white-space:nowrap;display:flex;align-items:center;justify-content:center}
        .ticker .track{display:flex;gap:42px;padding:12px 0;white-space:nowrap;animation:scroll 30s linear infinite;min-width:200%;align-items:center}
        .ticker .track span{font-family:"Archivo Black";font-size:14px;text-transform:uppercase;letter-spacing:.04em;display:inline-flex;align-items:center;gap:18px}
        .ticker .track span::after{content:"●";color:var(--red);margin-left:18px}
        @keyframes scroll{to{transform:translateX(-50%)}}

        /* foot */
        .foot{display:grid;grid-template-columns: 1fr auto 1fr;align-items:center;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-family:"JetBrains Mono"}
        .foot > *{padding:14px 22px}
        .foot .l{color:var(--muted)}
        .foot .c{border-left:var(--hair) solid var(--rule);border-right:var(--hair) solid var(--rule);font-weight:700}
        .foot .r{display:flex;justify-content:flex-end;gap:20px;color:var(--muted)}

        @media(max-width:880px){
          .page{border-left:0;border-right:0;max-width:100% !important;margin:0 !important;width:100% !important;min-width:0}
          .head{grid-template-columns:1fr}
          /* Grid/flex children default to min-width:auto, so they refuse to
             shrink below their text's intrinsic width. Without this the
             wordmark forces the whole page wider than the viewport. */
          .head, .head .L, .head .R{min-width:0}
          .head .L{border-right:0;border-bottom:var(--hair) solid var(--rule);padding:32px 20px 26px}
          .head .R{padding:24px 20px}
          /* 64px min was ~439px wide — wider than a 375px phone. */
          .wordmark{font-size:clamp(34px, 11.5vw, 64px)}
          .kicker{flex-wrap:wrap;gap:10px}
          /* Two flex:1 spans split the row evenly and inflated it; let the
             URL hug its own text instead. */
          .indexcard ol li{gap:10px}
          .indexcard ol li .pg{flex:0 0 auto;text-align:right}
          .row{grid-template-columns:60px 1fr 46px;padding:20px 18px;margin-left:-1px;margin-right:-1px}
          .row .arrow{margin-right:0}
          .row .body .title{font-size:18px}
          .row .meta-r{display:none}
          .list{margin-left:-1px;margin-right:-1px}
          .list-head{margin-left:-1px;margin-right:-1px}
          .red-rule{margin-left:-1px;margin-right:-1px}
          .ticker{margin-left:-1px;margin-right:-1px}
          .ticker .tag{font-size:10px;padding:10px 10px}
          .meta .l, .meta .r, .meta .c{display:none}
          .foot{grid-template-columns:1fr}
          .foot .l, .foot .r{display:none}
        }
      `}</style>

      <main className="page">

        <header className="meta mono">
          <div className="l"><span className="dot blink"></span>OPEN NOW · 10:00 / 22:00 WIB</div>
          <div className="c">AYAMTENNS — NASHVILLE HOT CHICKEN CO.</div>
          <div className="r">
            <span>BSD CITY · ID</span>
            <span>EST. 2020</span>
          </div>
        </header>

        {/* editorial split header */}
        <section className="head">
          <div className="L">
            <div className="kicker">
              <span>◉ DIRECTORY · ALL LINKS</span>
              <span className="pill">VOL.&nbsp;01 / 2026</span>
            </div>
            <h1 className="wordmark">Ayam<span className="slash">/</span>Tenns</h1>
            <p className="tagline">Your daily <em>craving</em> nashville chicken. <br />One tap, one box, one burn.</p>
          </div>
          <div className="R">
            <div className="indexcard">
              <h4>// Index</h4>
              <ol>
                <li><b>01</b><span>Website Official</span><span className="pg">ayamtenns.com</span></li>
                <li><b>02</b><span>GrabFood</span><span className="pg">grab.com</span></li>
                <li><b>03</b><span>GoFood</span><span className="pg">gofood.co.id</span></li>
                <li><b>04</b><span>WhatsApp</span><span className="pg">+62 …</span></li>
                <li><b>05</b><span>Instagram</span><span className="pg">@ayamtenns</span></li>
              </ol>
            </div>

            <div className="stamp-row">
              <div className="stamp">
                <div className="inner">Made<b>Hot</b>Daily</div>
              </div>
              <div className="stamp-cap">
                <b>Pick Your Channel.</b>
                5 ways to get your<br />daily craving — fired<br />fresh, never frozen.
              </div>
            </div>
          </div>
        </section>

        <div className="red-rule"></div>

        <div className="list-head">
          <span><b>The Links</b> — Tap to open</span>
          <span>05 / Total</span>
        </div>

        <nav className="list">
          <a className="row" href="https://ayamtenns.com" target="_blank" rel="noopener noreferrer">
            <span className="num">01</span>
            <div className="body">
              <div className="title">Website Official</div>
              <div className="sub">ayamtenns.com</div>
            </div>
            <div className="meta-r">
              <span>Order · Menu · Story</span>
            </div>
            <span className="arrow">↗</span>
          </a>

          <a className="row feat" href="https://r.grab.com/o/ZnEvIjmq" target="_blank" rel="noopener noreferrer">
            <span className="num">02</span>
            <div className="body">
              <div className="title">Order via GrabFood</div>
              <div className="sub">delivery · grab.com</div>
            </div>
            <div className="meta-r"></div>
            <span className="arrow">↗</span>
          </a>

          <a className="row" href="https://gofood.link/a/FvfMwZj" target="_blank" rel="noopener noreferrer">
            <span className="num">03</span>
            <div className="body">
              <div className="title">Order via GoFood</div>
              <div className="sub">delivery · gofood.co.id</div>
            </div>
            <div className="meta-r"></div>
            <span className="arrow">↗</span>
          </a>

          <a className="row" href="https://wa.me/6208111779957" target="_blank" rel="noopener noreferrer">
            <span className="num">04</span>
            <div className="body">
              <div className="title">WhatsApp Kami</div>
              <div className="sub">+62 811 · 1779 · 957</div>
            </div>
            <div className="meta-r"></div>
            <span className="arrow">↗</span>
          </a>

          <a className="row" href="https://www.instagram.com/ayamtenns" target="_blank" rel="noopener noreferrer">
            <span className="num">05</span>
            <div className="body">
              <div className="title">Follow Instagram</div>
              <div className="sub">@ayamtenns</div>
            </div>
            <div className="meta-r"></div>
            <span className="arrow">↗</span>
          </a>
        </nav>

        <div className="ticker" aria-hidden="true">
          <div className="tag">DAILY CRAVING ●</div>
          <div className="track">
            <span>NO MSG EVER</span><span>HORMONE FREE</span><span>ANTIBIOTIC FREE</span><span>NASHVILLE BOX FROM 48K</span><span>MANIACC COMBO · SHARE LOUD</span><span>NEW · GARLIC PARM</span>
            <span>NO MSG EVER</span><span>HORMONE FREE</span><span>ANTIBIOTIC FREE</span><span>NASHVILLE BOX FROM 48K</span><span>MANIACC COMBO · SHARE LOUD</span><span>NEW · GARLIC PARM</span>
          </div>
        </div>

        <footer className="foot">
          <div className="l">© 2026 #AyamTenns</div>
          <div className="c">Your Daily Craving Nashville Chicken</div>
          <div className="r"><span>EST. 2020</span><span>BSD CITY</span></div>
        </footer>

      </main>
    </>
  )
}
