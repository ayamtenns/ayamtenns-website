'use client'

import { useEffect } from 'react'

/**
 * One observer for every `[data-wipe]` element on the page.
 *
 * Same contract as the supply chain: elements are plain visible CSS by
 * default, and JS *opts in* to the clip-path wipe. If the script never
 * lands, the observer never fires, or the visitor asked for reduced
 * motion, everything still reads. A failsafe releases anything armed so
 * content can't be stranded behind an animation.
 *
 * Wipes only — no fades. Hard edges match the rest of the page.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-wipe]'))
    if (els.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const armed: HTMLElement[] = []
    for (const el of els) {
      // Already on screen at mount: leave it alone rather than clipping and
      // re-revealing, which reads as a flicker.
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) continue
      el.dataset.wipe = 'armed'
      armed.push(el)
    }
    if (armed.length === 0) return

    const release = (el: HTMLElement) => {
      el.dataset.wipe = 'run'
    }
    const failsafe = window.setTimeout(() => armed.forEach(release), 4000)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            release(e.target as HTMLElement)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15 }
    )

    armed.forEach((el) => io.observe(el))

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [])

  return null
}
