'use client'

import { useEffect, useRef } from 'react'
import { SUPPLY_CHAIN } from '@/content/story'

/**
 * The page's one big motion moment: each stage wipes in via clip-path.
 *
 * Fail-safe by default — the steps are plain visible CSS. JS *opts in* to the
 * animation by setting data-anim, so if the script never arrives, or the
 * observer never fires, the chain still reads. It also skips the animation
 * outright when the section is already on screen at mount (no flash) or when
 * the visitor asked for reduced motion.
 */
export default function SupplyChain() {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Already in view on load: leave it visible rather than clipping then
    // re-revealing, which would read as a flicker.
    const box = el.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) return

    el.dataset.anim = 'armed'

    const release = () => {
      el.dataset.anim = 'run'
    }

    // Arming hides the steps, so there must always be a way back out. If the
    // observer never fires — hidden tab, odd embedded webview — this releases
    // anyway. Content is never permanently stuck behind an animation.
    const failsafe = window.setTimeout(release, 3000)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.clearTimeout(failsafe)
            release()
            io.disconnect()
          }
        }
      },
      { threshold: 0.2 }
    )

    io.observe(el)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [])

  return (
    <ol ref={ref} className="sc">
      {SUPPLY_CHAIN.map((s, i) => (
        <li
          key={s.label}
          className={s.here ? 'sc-step sc-here' : 'sc-step'}
          style={{ ['--i' as string]: i }}
        >
          <span className="sc-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="sc-label">{s.label}</span>
          <span className="sc-detail">{s.detail}</span>
        </li>
      ))}
    </ol>
  )
}
