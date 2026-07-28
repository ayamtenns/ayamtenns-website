import type { Metadata } from 'next'
import { HERO, OUTRO, PAGE_META, SECTIONS, SPICE_LEVELS, WHATSAPP_NUMBER } from '@/content/box'

export const metadata: Metadata = {
  title: PAGE_META.title,
  description: PAGE_META.description,
  openGraph: {
    title: PAGE_META.title,
    description: PAGE_META.ogDescription,
    url: 'https://ayamtenns.com/box',
    siteName: 'Ayamtenns',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: PAGE_META.title,
    description: PAGE_META.ogDescription,
  },
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
          --muted: #0E0E0E99;
          --hair: 1px solid #0E0E0E;
        }

        .box-page {
          max-width: 640px;
          margin: 0 auto;
          border-left: var(--hair);
          border-right: var(--hair);
          min-height: 100vh;
          background: var(--paper);
        }

        /* ── meta strip ── */
        .bx-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: var(--hair);
          padding: 10px 22px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .bx-meta strong { color: var(--ink); font-weight: 700; }

        /* ── hero ── */
        .bx-hero {
          background: var(--ink);
          color: var(--paper);
          padding: 44px 28px 38px;
          border-bottom: 4px solid var(--red);
        }
        .bx-hero h1 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(28px, 8vw, 50px);
          letter-spacing: -.025em;
          line-height: .9;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .bx-hero p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          font-weight: 500;
          color: rgba(255,255,255,.72);
          max-width: 38ch;
        }

        /* ── section rows ── */
        .bx-section {
          border-bottom: var(--hair);
          padding: 28px 28px 28px 22px;
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 0 12px;
          align-items: start;
        }
        .bx-num {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 32px;
          letter-spacing: -.02em;
          color: rgba(14,14,14,.1);
          line-height: 1;
          padding-top: 2px;
          user-select: none;
        }
        .bx-content h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 17px;
          letter-spacing: -.01em;
          text-transform: uppercase;
          margin-bottom: 10px;
          line-height: 1.1;
        }
        .bx-content p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.62;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .bx-content p:last-of-type { margin-bottom: 0; }

        /* certification badges */
        .bx-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 14px;
        }
        .bx-badge {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          font-weight: 700;
          border: 1px solid var(--ink);
          padding: 4px 9px;
          line-height: 1;
        }

        /* footnote / disclaimer */
        .bx-note {
          display: block;
          margin-top: 12px;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: var(--muted);
          font-style: italic;
          border-left: 2px solid rgba(14,14,14,.15);
          padding-left: 10px;
        }

        /* reheat placeholder */
        .bx-placeholder {
          display: inline-block;
          margin-top: 12px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: .08em;
          color: var(--muted);
          border: 1px dashed rgba(14,14,14,.35);
          padding: 9px 14px;
        }
        .bx-final {
          display: block;
          margin-top: 14px;
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }

        /* ── spice levels (section 07) ── */
        .bx-spice {
          border-bottom: var(--hair);
          padding: 28px 28px 28px 22px;
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 0 12px;
          align-items: start;
        }
        .bx-spice-num {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 32px;
          letter-spacing: -.02em;
          color: rgba(14,14,14,.1);
          line-height: 1;
          padding-top: 2px;
          user-select: none;
        }
        .bx-spice-inner h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 17px;
          letter-spacing: -.01em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .bx-levels {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bx-level {
          display: flex;
          flex-direction: column;
          gap: 3px;
          border: 1px solid var(--ink);
          padding: 8px 14px;
          min-width: 86px;
        }
        .bx-level .lnum {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .bx-level .lname {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: -.01em;
        }

        /* ── outro / CTA ── */
        .bx-outro {
          background: var(--ash);
          border-bottom: var(--hair);
          padding: 36px 28px 32px;
        }
        .bx-outro h2 {
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: clamp(22px, 7vw, 30px);
          letter-spacing: -.025em;
          text-transform: uppercase;
          margin-bottom: 10px;
          line-height: .95;
        }
        .bx-outro > p {
          font-family: "Inter Tight", system-ui, sans-serif;
          font-size: 15px;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .bx-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: var(--ink);
          color: var(--paper);
          font-family: "Archivo Black", system-ui, sans-serif;
          font-size: 15px;
          letter-spacing: .02em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 18px 24px;
          border: 2px solid var(--ink);
          /* tap target minimum 48px height */
          min-height: 56px;
        }
        .bx-ig {
          display: block;
          margin-top: 16px;
          text-align: center;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
        }

        /* ── footer ── */
        .bx-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── mobile ── */
        @media (max-width: 680px) {
          .box-page { border-left: 0; border-right: 0; }
          .bx-meta-right { display: none; }
          .bx-section, .bx-spice { padding: 22px 18px; }
          .bx-hero { padding: 36px 18px 30px; }
          .bx-outro { padding: 28px 18px 26px; }
          .bx-foot { padding: 12px 18px; }
        }
      `}</style>

      <div className="box-page">

        {/* brand strip */}
        <header className="bx-meta">
          <strong>Ayamtenns</strong>
          <span className="bx-meta-right">BSD City · Indonesia</span>
        </header>

        {/* hero */}
        <section aria-labelledby="hero-heading">
          <div className="bx-hero">
            <h1 id="hero-heading">{HERO.heading}</h1>
            <p>{HERO.body}</p>
          </div>
        </section>

        {/* sections 01–06 */}
        <article>
          {SECTIONS.map((section) => (
            <section key={section.id} className="bx-section" aria-labelledby={`s-${section.id}`}>
              <span className="bx-num" aria-hidden="true">{section.num}</span>
              <div className="bx-content">
                <h2 id={`s-${section.id}`}>{section.heading}</h2>

                {section.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                {section.badges && (
                  <div className="bx-badges" role="list" aria-label="Sertifikasi">
                    {section.badges.map((b) => (
                      <span key={b} className="bx-badge" role="listitem">{b}</span>
                    ))}
                  </div>
                )}

                {section.note && (
                  <span className="bx-note">{section.note}</span>
                )}

                {section.reheatingPlaceholder && (
                  <div className="bx-placeholder">{section.reheatingPlaceholder}</div>
                )}
                {section.reheatingFinal && (
                  <span className="bx-final">{section.reheatingFinal}</span>
                )}
              </div>
            </section>
          ))}

          {/* section 07: level pedas */}
          <section className="bx-spice" aria-labelledby="s-spice">
            <span className="bx-spice-num" aria-hidden="true">07</span>
            <div className="bx-spice-inner">
              <h2 id="s-spice">Level pedas</h2>
              <div className="bx-levels">
                {SPICE_LEVELS.map((lvl) => (
                  <div key={lvl.label} className="bx-level">
                    <span className="lnum">{lvl.label}</span>
                    <span className="lname">{lvl.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>

        {/* outro */}
        <section className="bx-outro" aria-labelledby="s-outro">
          <h2 id="s-outro">{OUTRO.heading}</h2>
          <p>{OUTRO.body}</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="bx-wa-btn"
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
        </section>

        <footer className="bx-foot">
          <span>© 2026 Ayamtenns</span>
          <span>ayamtenns.com/box</span>
        </footer>

      </div>
    </>
  )
}
