import type { Metadata } from 'next'
import Image from 'next/image'
import {
  HERO,
  HERO_IMAGE,
  OUTRO,
  OUTRO_IMAGE,
  PAGE_META,
  SECTIONS,
  SOURCES,
  SPICE,
  WHATSAPP_NUMBER,
  type Figure,
} from '@/content/box'

export const metadata: Metadata = {
  // Required so the OG/Twitter image resolves to an absolute URL when shared.
  // This is the domain the printed QR code encodes.
  metadataBase: new URL('https://ayamtenns.com'),
  title: PAGE_META.title,
  description: PAGE_META.description,
  openGraph: {
    title: PAGE_META.title,
    description: PAGE_META.ogDescription,
    url: 'https://ayamtenns.com/box',
    siteName: 'Ayamtenns',
    type: 'article',
    images: [{ url: PAGE_META.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_META.title,
    description: PAGE_META.ogDescription,
    images: [PAGE_META.ogImage],
  },
}

/** Full-bleed image break. Escapes the text measure to the page edges. */
function Bleed({ figure, priority = false }: { figure: Figure; priority?: boolean }) {
  return (
    <figure className="bx-bleed">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        sizes="(max-width: 720px) 100vw, 720px"
        quality={72}
        priority={priority}
        className="bx-bleed-img"
      />
      {(figure.caption || figure.credit) && (
        <figcaption>
          {figure.caption}
          {figure.credit && <span className="bx-credit">{figure.credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}

export default function BoxPage() {
  return (
    <>
      <style>{`
        :root {
          --red: #D91C1C;
          --ink: #0E0E0E;
          --paper: #FFFFFF;
          --ash: #F2F2F0;
        }

        .bx-article {
          max-width: 720px;
          margin: 0 auto;
          background: var(--paper);
          overflow-x: hidden;
        }

        /* Reading measure — every text block sits inside this */
        .bx-measure {
          padding-left: 24px;
          padding-right: 24px;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ─── masthead ─────────────────────────────────────────────── */
        .bx-masthead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 18px 24px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .bx-masthead .brand { font-weight: 700; color: var(--ink); }
        .bx-masthead .loc { color: #0E0E0E80; }

        /* ─── hero ────────────────────────────────────────────────── */
        .bx-hero { position: relative; background: var(--ink); }
        .bx-hero-media { position: relative; }
        .bx-hero-media img {
          display: block;
          width: 100%;
          height: 78vh;
          min-height: 480px;
          max-height: 760px;
          object-fit: cover;
          object-position: center 38%;
        }
        /* Legibility scrim — headline sits on the dark bottom half */
        .bx-hero-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(14,14,14,.30) 0%,
            rgba(14,14,14,.10) 26%,
            rgba(14,14,14,.72) 62%,
            rgba(14,14,14,.96) 100%
          );
        }
        .bx-hero-text {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 0 24px 40px;
          max-width: 640px;
          margin: 0 auto;
        }
        .bx-kicker {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #FFFFFFB3;
          display: block;
          margin-bottom: 14px;
        }
        .bx-hero-text h1 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(34px, 10.5vw, 62px);
          line-height: .88;
          letter-spacing: -.03em;
          text-transform: uppercase;
          color: var(--paper);
          margin-bottom: 18px;
          text-wrap: balance;
        }
        .bx-hero-text h1::after {
          content: '';
          display: block;
          width: 56px;
          height: 4px;
          background: var(--red);
          margin-top: 18px;
        }
        .bx-dek {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: clamp(16px, 4.4vw, 19px);
          line-height: 1.5;
          font-weight: 500;
          color: #FFFFFFD9;
          max-width: 34ch;
        }

        /* ─── section rhythm ──────────────────────────────────────── */
        .bx-sec { padding: 56px 0 8px; }
        .bx-sec:first-of-type { padding-top: 48px; }

        .bx-sec-kicker {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--red);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .bx-sec-kicker::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #0E0E0E1A;
        }

        .bx-sec h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(26px, 7.4vw, 36px);
          line-height: 1.02;
          letter-spacing: -.025em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 22px;
          text-wrap: balance;
        }

        /* Body copy — generous measure & leading for comfortable reading */
        .bx-p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.72;
          color: #0E0E0EE6;
          margin-bottom: 20px;
        }
        .bx-p:last-child { margin-bottom: 0; }
        .bx-p-lead {
          font-size: 20px;
          line-height: 1.58;
          font-weight: 500;
          color: var(--ink);
        }

        /* ─── certification badges ────────────────────────────────── */
        .bx-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid #0E0E0E1A;
        }
        .bx-badge {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--ink);
          border: 1.5px solid var(--ink);
          padding: 7px 12px;
          line-height: 1;
        }

        /* ─── stat block ──────────────────────────────────────────── */
        .bx-stats {
          margin-top: 28px;
          border-top: 2px solid var(--ink);
        }
        .bx-stat {
          display: grid;
          /* wide enough that "11 hari" stays on one line */
          grid-template-columns: 104px 1fr;
          gap: 14px;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px solid #0E0E0E1A;
        }
        .bx-stat dt {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 26px;
          line-height: 1;
          letter-spacing: -.03em;
          color: var(--red);
        }
        .bx-stat dd {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #0E0E0EBF;
        }

        /* ─── bullet list ─────────────────────────────────────────── */
        .bx-bullets {
          list-style: none;
          margin-top: 22px;
        }
        .bx-bullets li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 10px;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #0E0E0EE6;
        }
        .bx-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: .62em;
          width: 8px;
          height: 2px;
          background: var(--red);
        }

        /* ─── sources ─────────────────────────────────────────────── */
        .bx-sources {
          margin-top: 52px;
          padding: 30px 0 34px;
          background: var(--ash);
        }
        .bx-sources h2 {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .bx-sources > .bx-measure > p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #0E0E0EA6;
          margin-bottom: 18px;
        }
        .bx-sources ol {
          list-style: none;
          counter-reset: src;
        }
        .bx-sources li {
          counter-increment: src;
          position: relative;
          padding-left: 26px;
          margin-bottom: 14px;
        }
        .bx-sources li::before {
          content: counter(src);
          position: absolute;
          left: 0;
          top: 1px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--red);
        }
        .bx-sources a {
          display: block;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.45;
          font-weight: 600;
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 2px;
          /* long URLs must never widen the page */
          overflow-wrap: anywhere;
        }
        .bx-sources span {
          display: block;
          margin-top: 2px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #0E0E0E8C;
        }

        /* ─── pull quote ──────────────────────────────────────────── */
        .bx-quote {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(21px, 5.8vw, 27px);
          line-height: 1.22;
          letter-spacing: -.02em;
          color: var(--ink);
          border-left: 5px solid var(--red);
          padding: 4px 0 4px 20px;
          margin: 8px 0 0;
          text-wrap: balance;
        }

        /* ─── footnote ────────────────────────────────────────────── */
        .bx-note {
          display: block;
          margin-top: 24px;
          padding: 16px 18px;
          background: var(--ash);
          border-left: 3px solid #0E0E0E33;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #0E0E0EA6;
        }

        /* ─── reheat card ─────────────────────────────────────────── */
        .bx-reheat {
          margin-top: 4px;
          border: 2px solid var(--ink);
        }
        .bx-reheat-slot {
          display: block;
          padding: 22px 20px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 13px;
          letter-spacing: .1em;
          text-align: center;
          color: #0E0E0E8C;
          background:
            repeating-linear-gradient(
              45deg,
              #0E0E0E08 0 8px,
              transparent 8px 16px
            );
          border-bottom: 2px dashed #0E0E0E40;
        }
        .bx-reheat-final {
          display: block;
          padding: 20px;
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(19px, 5.4vw, 24px);
          letter-spacing: -.02em;
          text-align: center;
          text-transform: uppercase;
          color: var(--paper);
          background: var(--red);
        }

        /* ─── spice scale ─────────────────────────────────────────── */
        .bx-spice-scale {
          display: grid;
          grid-template-columns: 1fr;
          border: 1px solid #0E0E0E1F;
        }
        .bx-lvl {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-bottom: 1px solid #0E0E0E14;
        }
        .bx-lvl:last-child { border-bottom: 0; }
        .bx-lvl-tag {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #0E0E0E80;
          min-width: 44px;
        }
        .bx-lvl-name {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 16px;
          letter-spacing: -.01em;
          text-transform: uppercase;
          color: var(--ink);
          flex: 1;
        }
        /* Heat meter — filled bars scale with level index */
        .bx-lvl-meter { display: flex; gap: 4px; }
        .bx-lvl-meter i {
          display: block;
          width: 20px;
          height: 6px;
          background: #0E0E0E14;
        }
        .bx-lvl-meter i[data-on='1'] { background: var(--red); }

        /* ─── full-bleed figures ──────────────────────────────────── */
        .bx-bleed { margin: 44px 0; }
        .bx-bleed-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 74vh;
          object-fit: cover;
        }
        .bx-bleed figcaption {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #0E0E0E8C;
          padding: 12px 24px 0;
          max-width: 640px;
          margin: 0 auto;
        }
        /* Attribution for photography we did not shoot ourselves. */
        .bx-credit {
          display: block;
          margin-top: 4px;
          font-size: 9px;
          letter-spacing: .08em;
          color: #0E0E0E59;
        }
        /* Inline figure — sits inside a section, tighter spacing */
        .bx-figure-inline { margin: 30px 0 0; }

        /* ─── outro ───────────────────────────────────────────────── */
        .bx-outro { position: relative; margin-top: 56px; background: var(--ink); }
        .bx-outro-media { position: relative; }
        .bx-outro-media img {
          display: block;
          width: 100%;
          height: 260px;
          object-fit: cover;
          object-position: center 30%;
          opacity: .3;
        }
        .bx-outro-body {
          padding: 34px 24px 44px;
          max-width: 640px;
          margin: 0 auto;
        }
        .bx-outro h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(26px, 7.6vw, 38px);
          line-height: .96;
          letter-spacing: -.03em;
          text-transform: uppercase;
          color: var(--paper);
          margin-bottom: 12px;
          text-wrap: balance;
        }
        .bx-outro-body > p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: #FFFFFFB3;
          margin-bottom: 28px;
        }
        .bx-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 58px;
          background: var(--red);
          color: var(--paper);
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 16px;
          letter-spacing: .01em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 18px 24px;
        }
        .bx-ig {
          display: block;
          margin-top: 20px;
          text-align: center;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #FFFFFF8C;
          text-decoration: none;
        }

        /* ─── footer ──────────────────────────────────────────────── */
        .bx-foot {
          display: flex;
          justify-content: space-between;
          padding: 16px 24px 28px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #0E0E0E73;
        }

        /* ─── desktop: centred column, framed ─────────────────────── */
        @media (min-width: 721px) {
          .bx-article {
            border-left: 1px solid #0E0E0E1A;
            border-right: 1px solid #0E0E0E1A;
            min-height: 100vh;
          }
          .bx-sec { padding-top: 68px; }
          .bx-bleed { margin: 52px 0; }
        }

        /* Respect reduced-data / reduced-motion users: nothing animates,
           but keep contrast intact for high-contrast preferences. */
        @media (prefers-contrast: more) {
          .bx-p { color: var(--ink); }
          .bx-note { color: var(--ink); }
        }
      `}</style>

      <div className="bx-article">

        <header className="bx-masthead">
          <span className="brand">Ayamtenns</span>
          <span className="loc">BSD City · Indonesia</span>
        </header>

        {/* ─── hero ─── */}
        <section className="bx-hero" aria-labelledby="hero-h">
          <div className="bx-hero-media">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              sizes="(max-width: 720px) 100vw, 720px"
              quality={70}
              priority
            />
          </div>
          <div className="bx-hero-text">
            <span className="bx-kicker">{HERO.kicker}</span>
            <h1 id="hero-h">{HERO.heading}</h1>
            <p className="bx-dek">{HERO.body}</p>
          </div>
        </section>

        {/* ─── body ─── */}
        <article>
          {SECTIONS.map((s) => (
            <div key={s.id}>
              <section className="bx-sec" aria-labelledby={`h-${s.id}`}>
                <div className="bx-measure">
                  <span className="bx-sec-kicker">{s.kicker}</span>
                  <h2 id={`h-${s.id}`}>{s.heading}</h2>

                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className={`bx-p${s.lead && i === 0 ? ' bx-p-lead' : ''}`}>
                      {p}
                    </p>
                  ))}

                  {s.stats && (
                    <dl className="bx-stats">
                      {s.stats.map((st) => (
                        <div key={st.value} className="bx-stat">
                          <dt>{st.value}</dt>
                          <dd>{st.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {s.bullets && (
                    <ul className="bx-bullets">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {s.pullQuote && <p className="bx-quote">{s.pullQuote}</p>}

                  {s.badges && (
                    <div className="bx-badges" role="list" aria-label="Sertifikasi">
                      {s.badges.map((b) => (
                        <span key={b} className="bx-badge" role="listitem">{b}</span>
                      ))}
                    </div>
                  )}

                  {s.note && <p className="bx-note">{s.note}</p>}

                  {s.reheatingPlaceholder && (
                    <div className="bx-reheat">
                      <span className="bx-reheat-slot">{s.reheatingPlaceholder}</span>
                      <strong className="bx-reheat-final">{s.reheatingFinal}</strong>
                    </div>
                  )}
                </div>

                {s.figureInline && (
                  <div className="bx-figure-inline">
                    <Bleed figure={s.figureInline} />
                  </div>
                )}
              </section>

              {s.figureAfter && <Bleed figure={s.figureAfter} />}
            </div>
          ))}

          {/* ─── bagian 7: level pedas ─── */}
          <section className="bx-sec" aria-labelledby="h-spice">
            <div className="bx-measure">
              <span className="bx-sec-kicker">{SPICE.kicker}</span>
              <h2 id="h-spice">{SPICE.heading}</h2>
              <div className="bx-spice-scale">
                {SPICE.levels.map((lvl, i) => (
                  <div key={lvl.label} className="bx-lvl">
                    <span className="bx-lvl-tag">{lvl.label}</span>
                    <span className="bx-lvl-name">{lvl.name}</span>
                    <span className="bx-lvl-meter" aria-hidden="true">
                      {[0, 1, 2].map((bar) => (
                        <i key={bar} data-on={bar < i ? '1' : '0'} />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>

        {/* ─── sumber ─── */}
        <section className="bx-sources" aria-labelledby="h-sources">
          <div className="bx-measure">
            <h2 id="h-sources">{SOURCES.heading}</h2>
            <p>{SOURCES.intro}</p>
            <ol>
              {SOURCES.items.map((src) => (
                <li key={src.url}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.label}
                  </a>
                  <span>{src.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── outro ─── */}
        <section className="bx-outro" aria-labelledby="h-outro">
          <div className="bx-outro-media">
            <Image
              src={OUTRO_IMAGE.src}
              alt={OUTRO_IMAGE.alt}
              width={OUTRO_IMAGE.width}
              height={OUTRO_IMAGE.height}
              sizes="(max-width: 720px) 100vw, 720px"
              quality={65}
              loading="lazy"
            />
          </div>
          <div className="bx-outro-body">
            <h2 id="h-outro">{OUTRO.heading}</h2>
            <p>{OUTRO.body}</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="bx-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              {OUTRO.whatsappLabel} ↗
            </a>
            <a
              href={OUTRO.instagramUrl}
              className="bx-ig"
              target="_blank"
              rel="noopener noreferrer"
            >
              {OUTRO.instagram}
            </a>
          </div>
        </section>

        <footer className="bx-foot">
          <span>© 2026 Ayamtenns</span>
          <span>ayamtenns.com/box</span>
        </footer>

      </div>
    </>
  )
}
