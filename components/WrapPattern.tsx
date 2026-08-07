"use client"

import React, { useEffect, useRef, useState } from 'react'

type Density = 'loose' | 'medium' | 'tight'
type Size = 's' | 'm' | 'l'

interface Word {
  text: string
  solid: boolean
}

const PRESETS: Record<Density, { fontSize: number; rowSpacing: number; amp: number; wavelength: number; strokeWidth: number }> = {
  loose:  { fontSize: 150, rowSpacing: 165, amp: 70, wavelength: 1200, strokeWidth: 2.2 },
  medium: { fontSize: 120, rowSpacing: 130, amp: 55, wavelength: 980,  strokeWidth: 1.8 },
  tight:  { fontSize: 92,  rowSpacing: 100, amp: 42, wavelength: 740,  strokeWidth: 1.4 },
}

const HEIGHTS: Record<Size, number> = { s: 180, m: 300, l: 460 }

function wavePath(y: number, amp: number, wl: number, totalWidth: number): string {
  const startX = -wl
  const endX = totalWidth + wl
  let d = `M ${startX} ${y} `
  const cp1x = startX + wl * 0.25
  const cp1y = y - amp
  const apex1x = startX + wl * 0.5
  d += `Q ${cp1x} ${cp1y} ${apex1x} ${y} `
  let x = apex1x
  while (x < endX) {
    x += wl * 0.5
    d += `T ${x} ${y} `
  }
  return d
}

function PatternSvg({ width, height, density = 'medium', accent = '#D91C1C', words }: {
  width: number
  height: number
  density?: Density
  accent?: string
  words?: Word[]
}) {
  const cfg = PRESETS[density]
  const { fontSize, rowSpacing, amp, wavelength: wl, strokeWidth } = cfg
  const rows = Math.ceil((height + rowSpacing * 2) / rowSpacing) + 1
  const WORDS: Word[] = words ?? [
    { text: 'AYAMTENNS',    solid: true  },
    { text: 'RAISED RIGHT', solid: false },
    { text: 'FRIED HOT',    solid: false },
  ]

  const renderRow = (i: number) => {
    const y = -rowSpacing * 0.5 + i * rowSpacing + fontSize * 0.85
    const phase = i % 2 === 0 ? 0 : wl * 0.5
    const id = `atw-${i}`
    const ampSigned = amp * (i % 2 === 0 ? 1 : -1)
    const d = wavePath(y, ampSigned, wl, width + phase * 2)
    const off = (i * 220) % 1200

    const reps = Math.ceil(width / (fontSize * 5)) + 4
    const spans: React.ReactNode[] = []
    for (let k = 0; k < reps; k++) {
      WORDS.forEach((w, wi) => {
        spans.push(
          <tspan
            key={`${k}-${wi}-w`}
            fill={w.solid ? accent : 'none'}
            stroke={w.solid ? 'none' : accent}
            strokeWidth={w.solid ? 0 : strokeWidth}
            style={{ paintOrder: 'stroke' }}
          >{w.text}</tspan>
        )
        spans.push(<tspan key={`${k}-${wi}-sp`}> </tspan>)
      })
    }

    return (
      <g key={i}>
        <defs>
          <path id={id} d={d} transform={`translate(${-phase} 0)`} />
        </defs>
        <text
          fontFamily="var(--font-anton), 'Anton', 'Archivo Black', system-ui, sans-serif"
          fontSize={fontSize}
          letterSpacing="0.5"
        >
          <textPath href={`#${id}`} startOffset={off}>{spans}</textPath>
        </text>
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      {Array.from({ length: rows }, (_, i) => renderRow(i))}
    </svg>
  )
}

export default function WrapPattern({
  size = 'm',
  density = 'medium',
  invert = false,
  accent = '#D91C1C',
  words,
  asBg = false,
  children,
  className = '',
  style = {},
}: {
  size?: Size
  density?: Density
  invert?: boolean
  accent?: string
  words?: Word[]
  asBg?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ width: 1600, height: HEIGHTS[size] })

  useEffect(() => {
    if (!ref.current) return
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setBox({
          width: Math.max(1200, Math.ceil(e.contentRect.width)),
          height: Math.max(140, Math.ceil(e.contentRect.height)),
        })
      }
    })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  if (asBg) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', ...style }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.13,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <PatternSvg width={box.width} height={box.height} density={density} accent="#000" words={words} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>
    )
  }

  const bg = invert ? accent : '#ffffff'
  const fg = invert ? '#ffffff' : accent
  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        background: bg,
        height: HEIGHTS[size],
        borderTop: '1px solid #0E0E0E',
        borderBottom: '1px solid #0E0E0E',
        ...style,
      }}
    >
      <PatternSvg
        width={box.width}
        height={box.height}
        density={density}
        accent={fg}
        words={words}
      />
      {children}
    </div>
  )
}
