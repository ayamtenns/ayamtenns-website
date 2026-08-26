import type { Metadata } from 'next'
import Image from 'next/image'
import SupplyChain from './SupplyChain'
import Reveal from './Reveal'
import {
  CLAIMS,
  HERO,
  OUTRO,
  PAGE_META,
  QUICK_BAR,
  REHEAT,
  SPICE,
  TRUST,
  VERIFY_URL,
  WHATSAPP_NUMBER,
} from '@/content/story'

export const metadata: Metadata = {
  metadataBase: new URL('https://ayamtenns.com'),
  title: PAGE_META.title,
  description: PAGE_META.description,
  openGraph: {
    title: PAGE_META.title,
    description: PAGE_META.description,
    url: 'https://ayamtenns.com/story',
    siteName: 'Ayamtenns',
    type: 'article',
    images: [{ url: PAGE_META.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_META.title,
    description: PAGE_META.description,
    images: [PAGE_META.ogImage],
  },
}

export default function StoryPage() {
  return (
    <>
      <style>{`
        .st {
          /* Brand */
          --red: #D91C1C;
          --ink: #1A1A1A;
          --paper: #FFFFFF;

          /* Photo grade — tune these, not the file. The photo stays itself:
             its own colour, its own red comb. We only push contrast, sink the
             backdrop to black, and lay a thin red wash over the midtones so it
             sits in the same key as the rest of the page.
               contrast/bright  shape the tones
               sat              keep the comb's red honest (1 = untouched)
               grade-strength   the red wash; keep it low, this is a tint not
                                a duotone. 0 turns it off entirely.
               shadow           how hard the dark backdrop crushes to black */
          --photo-contrast: 1.22;
          --photo-bright: 0.94;
          --photo-sat: 1.06;
          --grade-red: #D91C1C;
          --grade-strength: 0.14;
          --duo-shadow: 0.55;

          /* Framing knobs, per orientation.
             Portrait: the photo is barely taller than the viewport, so almost
             nothing crops vertically and the empty backdrop above the bird
             stays in frame — zoom past 1 to push it out.
             Landscape: cover already crops a lot vertically, so zoom would cut
             the head off; leave it at 1 and aim with --duo-focus instead. */
          --duo-zoom: 1.22;
          --duo-origin: center 64%;
          --duo-focus: center 50%;

          --bar-h: 46px;

          background: var(--paper);
          color: var(--ink);
          overflow-x: hidden;
        }

        .st-wrap { max-width: 1100px; margin: 0 auto; }

        .st-label {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        /* ─── quick bar ───────────────────────────────────────────────
           Sits above the hero in flow so it never covers it, then sticks. */
        .st-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          height: var(--bar-h);
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--ink);
          border-bottom: 1px solid var(--ink);
        }
        .st-bar a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--paper);
          text-decoration: none;
        }
        .st-bar a + a { border-left: 1px solid rgba(255,255,255,.22); }
        .st-bar a:active { background: var(--red); }

        /* ─── 01 hero ─────────────────────────────────────────────── */
        .st-hero {
          position: relative;
          min-height: calc(100svh - var(--bar-h));
          display: flex;
          align-items: flex-end;
          background: var(--ink);
          overflow: hidden;
        }
        /* Black plate, not red — the backdrop should read as real black behind
           the bird rather than a coloured field. */
        .st-hero-media { position: absolute; inset: 0; background: var(--ink); }
        /* Thin red wash. soft-light tints the midtones and leaves the blacks
           and the comb's own red alone; a full overlay would flatten both. */
        .st-hero-media::before {
          content: '';
          position: absolute; inset: 0;
          z-index: 1;
          background: var(--grade-red);
          mix-blend-mode: soft-light;
          opacity: var(--grade-strength);
          pointer-events: none;
        }
        .st-hero-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          /* The photo keeps its own colour. Contrast lifts the white feathers
             off the backdrop and sinks the backdrop toward black. */
          filter:
            contrast(var(--photo-contrast))
            brightness(var(--photo-bright))
            saturate(var(--photo-sat));
          transform: scale(var(--duo-zoom));
          transform-origin: var(--duo-origin);
          object-position: var(--duo-focus);
        }
        /* Wide/landscape viewports crop plenty on their own. */
        @media (min-aspect-ratio: 1/1) {
          .st { --duo-zoom: 1; --duo-focus: center 30%; }
        }
        /* Crush the darks + keep the headline legible over any photo. */
        .st-hero-media::after {
          content: '';
          position: absolute; inset: 0;
          z-index: 2; /* legibility scrim sits above the grade */
          background: linear-gradient(
            to top,
            rgba(26,26,26,.92) 0%,
            rgba(26,26,26,.55) 45%,
            rgba(26,26,26,calc(var(--duo-shadow) * .5)) 100%
          );
        }
        .st-hero-text {
          position: relative;
          z-index: 3; /* above the grade (1) and the scrim (2) */
          width: 100%;
          padding: 0 16px 40px;
        }
        .st-hero h1 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(44px, 13.5vw, 190px);
          line-height: .85;
          letter-spacing: -.03em;
          text-transform: uppercase;
          color: var(--paper);
          margin-bottom: 18px;
        }
        .st-hero p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,.72);
        }

        /* Hero entrance — pure CSS so it runs at first paint with no JS and
           no flash. Wipes, never fades: hard edges match the page. */
        @keyframes st-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
        .st-hero h1 { animation: st-wipe .8s cubic-bezier(.65,0,.35,1) both; }
        .st-hero p  { animation: st-wipe .5s cubic-bezier(.65,0,.35,1) .55s both; }

        /* Generic reveal: visible by default, JS arms it only where it means
           to animate (see Reveal.tsx). */
        [data-wipe="armed"] { clip-path: inset(0 100% 0 0); }
        [data-wipe="run"] {
          clip-path: inset(0);
          transition: clip-path .6s cubic-bezier(.65,0,.35,1);
          transition-delay: calc(var(--i, 0) * .1s);
        }

        /* ─── 02 supply chain ─────────────────────────────────────── */
        .st-chain { padding: 64px 16px; border-bottom: 1px solid var(--ink); }
        .st-chain > .st-label { color: rgba(26,26,26,.5); margin-bottom: 24px; display: block; }
        .sc { list-style: none; display: grid; gap: 1px; background: rgba(26,26,26,.16); border: 1px solid var(--ink); }
        .sc-step {
          background: var(--paper);
          padding: 20px 18px;
          display: grid;
          grid-template-columns: 30px 1fr;
          grid-template-areas: "num label" "num detail";
          column-gap: 12px;
        }
        /* Wipe, not fade. Visible by default — JS arms the clip only when it
           intends to animate, so no-JS still shows the whole chain. */
        .sc[data-anim="armed"] .sc-step { clip-path: inset(0 100% 0 0); }
        .sc[data-anim="run"] .sc-step {
          clip-path: inset(0 0 0 0);
          transition: clip-path .55s cubic-bezier(.65,0,.35,1);
          transition-delay: calc(var(--i) * .13s);
        }
        .sc-num {
          grid-area: num;
          align-self: start;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px; font-weight: 700;
          letter-spacing: .1em;
          color: var(--red);
          padding-top: 4px;
        }
        .sc-label {
          grid-area: label;
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(20px, 5.4vw, 30px);
          letter-spacing: -.02em;
          text-transform: uppercase;
          line-height: 1.05;
        }
        .sc-detail {
          grid-area: detail;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 13px;
          color: rgba(26,26,26,.6);
          margin-top: 3px;
        }
        /* The reader is standing here — invert it. */
        .sc-here { background: var(--ink); }
        .sc-here .sc-label { color: var(--paper); }
        .sc-here .sc-detail { color: rgba(255,255,255,.66); }
        .sc-here .sc-num { color: var(--red); }

        @media (min-width: 860px) {
          .sc { grid-template-columns: repeat(4, 1fr); }
          .sc-step { padding: 26px 20px 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-step { clip-path: none !important; }
          .sc[data-anim] .sc-step { transition: none !important; clip-path: none !important; }
          .st-ribbon-track { animation: none !important; }
          .st-hero h1, .st-hero p { animation: none !important; clip-path: none !important; }
          [data-wipe] { clip-path: none !important; transition: none !important; }
          .st-meter-fill { transition: none !important; }
        }

        /* ─── ribbon ──────────────────────────────────────────────── */
        .st-ribbon {
          background: var(--ink);
          color: var(--paper);
          overflow: hidden;
          border-bottom: 1px solid var(--ink);
        }
        .st-ribbon-track {
          display: flex;
          width: max-content;
          animation: st-slide 26s linear infinite;
        }
        .st-ribbon span {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 13px;
          letter-spacing: .04em;
          text-transform: uppercase;
          padding: 11px 22px;
          white-space: nowrap;
        }
        .st-ribbon span::after { content: '·'; margin-left: 22px; color: var(--red); }
        @keyframes st-slide { to { transform: translateX(-50%); } }

        /* ─── 03 trust (the loud one) ─────────────────────────────── */
        .st-trust { background: var(--red); color: var(--paper); padding: 76px 16px 68px; }
        .st-trust h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(38px, 11.5vw, 128px);
          line-height: .86;
          letter-spacing: -.03em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .st-trust > .st-wrap > p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: clamp(17px, 4.6vw, 22px);
          font-weight: 600;
          margin-bottom: 36px;
        }
        .st-codes { display: grid; gap: 12px; margin-bottom: 28px; }
        .st-code { border: 2px solid var(--paper); padding: 16px 18px; }
        .st-code .st-label { color: rgba(255,255,255,.72); display: block; margin-bottom: 7px; }
        .st-code b {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: clamp(15px, 4.4vw, 22px);
          font-weight: 700;
          letter-spacing: .02em;
          word-break: break-all;
          display: block;
        }
        .st-verify {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 54px;
          padding: 16px 24px;
          background: var(--paper);
          color: var(--red);
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 14px;
          letter-spacing: .04em;
          text-transform: uppercase;
          text-decoration: none;
        }
        @media (min-width: 720px) { .st-codes { grid-template-columns: 1fr 1fr; } }

        /* ─── 04 claims (deliberately uneven) ─────────────────────── */
        .st-claims { padding: 72px 16px; border-bottom: 1px solid var(--ink); }
        .st-claims .lead {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(32px, 9vw, 76px);
          line-height: .92;
          letter-spacing: -.03em;
          text-transform: uppercase;
          margin-bottom: 30px;
        }
        .st-claims .body {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: clamp(16px, 4.4vw, 20px);
          line-height: 1.6;
          max-width: 46ch;
          margin-bottom: 14px;
        }
        .st-claims .note {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: rgba(26,26,26,.5);
          max-width: 44ch;
          border-left: 2px solid rgba(26,26,26,.2);
          padding-left: 12px;
          margin-bottom: 40px;
        }
        .st-claims .msg {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(20px, 5.6vw, 34px);
          line-height: 1.1;
          letter-spacing: -.02em;
          max-width: 20ch;
          border-top: 3px solid var(--red);
          padding-top: 18px;
        }

        /* ─── 05 reheat + 06 spice (utility, small) ───────────────── */
        .st-util { padding: 56px 16px; border-bottom: 1px solid var(--ink); }
        .st-util .st-label { color: rgba(26,26,26,.5); display: block; margin-bottom: 16px; }
        .st-util h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(22px, 6vw, 32px);
          letter-spacing: -.02em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .st-slot {
          border: 2px dashed rgba(26,26,26,.4);
          padding: 18px;
          text-align: center;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: .08em;
          color: rgba(26,26,26,.55);
        }
        .st-final {
          display: block;
          margin-top: 10px;
          background: var(--red);
          color: var(--paper);
          padding: 18px;
          text-align: center;
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(17px, 5vw, 22px);
          text-transform: uppercase;
          letter-spacing: -.01em;
        }
        .st-levels { border: 1px solid var(--ink); }
        .st-lvl {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(26,26,26,.14);
        }
        .st-lvl:last-child { border-bottom: 0; }
        .st-lvl i {
          font-style: normal;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px; letter-spacing: .14em;
          color: rgba(26,26,26,.5); min-width: 42px;
        }
        .st-lvl b {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 15px; text-transform: uppercase; letter-spacing: -.01em;
          flex: 1;
        }
        .st-meter { display: flex; gap: 4px; }
        .st-meter span { width: 20px; height: 6px; background: rgba(26,26,26,.14); }
        .st-meter span[data-on="1"] { background: var(--red); }

        /* ─── 07 outro (airy) ─────────────────────────────────────── */
        .st-outro { padding: 110px 16px 90px; text-align: center; }
        .st-outro h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(30px, 8.5vw, 66px);
          line-height: .9;
          letter-spacing: -.03em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .st-outro > p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 16px;
          color: rgba(26,26,26,.62);
          margin-bottom: 40px;
        }
        .st-wa {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 58px; padding: 18px 34px;
          background: var(--ink); color: var(--paper);
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 15px; letter-spacing: .04em; text-transform: uppercase;
          text-decoration: none;
        }
        .st-ig {
          display: block; margin-top: 22px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(26,26,26,.5); text-decoration: none;
        }

        .st-foot {
          display: flex; justify-content: space-between;
          padding: 16px; border-top: 1px solid var(--ink);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(26,26,26,.45);
        }
        .st-foot a { color: inherit; text-decoration: none; }

        @media (min-width: 860px) {
          .st-hero-text, .st-chain, .st-trust, .st-claims, .st-util, .st-outro, .st-foot {
            padding-left: 40px; padding-right: 40px;
          }
        }
      `}</style>

      <div className="st">
        <Reveal />


        {/* quick bar — above the hero in flow, so it never covers it */}
        <nav className="st-bar" aria-label="Pintasan">
          <a href="#panasin">{QUICK_BAR.reheat}</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            {QUICK_BAR.whatsapp}
          </a>
        </nav>

        {/* ─── 01 hero ─── */}
        <header className="st-hero">
          <div className="st-hero-media">
            <Image
              src={HERO.image.src}
              alt={HERO.image.alt}
              fill
              sizes="100vw"
              quality={65}
              priority
            />
          </div>
          <div className="st-hero-text">
            <div className="st-wrap">
              <h1>{HERO.heading}</h1>
              <p>{HERO.sub}</p>
            </div>
          </div>
        </header>

        {/* ─── 02 supply chain ─── */}
        <section className="st-chain" aria-labelledby="h-chain">
          <div className="st-wrap">
            <span className="st-label" id="h-chain">Dari sana ke sini</span>
            <SupplyChain />
          </div>
        </section>

        <div className="st-ribbon" aria-hidden="true">
          <div className="st-ribbon-track">
            {[0, 1].map((dup) => (
              <div key={dup} style={{ display: 'flex' }}>
                {['Raised right', 'Fried hot', 'NKV certified', 'BSD City'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─── 03 trust ─── */}
        <section className="st-trust" aria-labelledby="h-trust">
          <div className="st-wrap">
            <h2 id="h-trust" data-wipe="off">{TRUST.heading}</h2>
            <p data-wipe="off" style={{ ["--i" as string]: 1 }}>{TRUST.sub}</p>

            <div className="st-codes">
              {TRUST.items.map((it, i) => (
                <div key={it.value} className="st-code" data-wipe="off" style={{ ["--i" as string]: i + 2 }}>
                  <span className="st-label">{it.label}</span>
                  <b>{it.value}</b>
                </div>
              ))}
            </div>

            <a className="st-verify" href={VERIFY_URL} target="_blank" rel="noopener noreferrer">
              {TRUST.cta} ↗
            </a>
          </div>
        </section>

        {/* ─── 04 claims ─── */}
        <section className="st-claims" aria-label="Klaim">
          <div className="st-wrap">
            <p className="lead" data-wipe="off">{CLAIMS.lead}</p>
            <p className="body">{CLAIMS.body}</p>
            <p className="note">{CLAIMS.note}</p>
            <p className="msg" data-wipe="off">{CLAIMS.msg}</p>
          </div>
        </section>

        {/* ─── 05 reheat ─── */}
        <section className="st-util" id="panasin" aria-labelledby="h-reheat">
          <div className="st-wrap">
            <span className="st-label">05</span>
            <h2 id="h-reheat">{REHEAT.heading}</h2>
            <div className="st-slot">{REHEAT.placeholder}</div>
            <strong className="st-final">{REHEAT.final}</strong>
          </div>
        </section>

        {/* ─── 06 spice ─── */}
        <section className="st-util" aria-labelledby="h-spice">
          <div className="st-wrap">
            <span className="st-label">06</span>
            <h2 id="h-spice">{SPICE.heading}</h2>
            <div className="st-levels">
              {SPICE.levels.map((l, i) => (
                <div key={l.label} className="st-lvl">
                  <i>{l.label}</i>
                  <b>{l.name}</b>
                  <span className="st-meter" aria-hidden="true">
                    {[0, 1, 2].map((n) => (
                      <span key={n} data-on={n < i ? '1' : '0'} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 07 outro ─── */}
        <section className="st-outro" aria-labelledby="h-outro">
          <h2 id="h-outro" data-wipe="off">{OUTRO.heading}</h2>
          <p>{OUTRO.body}</p>
          <a
            className="st-wa"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {OUTRO.whatsappLabel} ↗
          </a>
          <a className="st-ig" href={OUTRO.instagramUrl} target="_blank" rel="noopener noreferrer">
            {OUTRO.instagram}
          </a>
        </section>

        <footer className="st-foot">
          <a href="/">← Ayamtenns</a>
          <span>ayamtenns.com/story</span>
        </footer>

      </div>
    </>
  )
}
