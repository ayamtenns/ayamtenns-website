"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import WrapPattern from "@/components/WrapPattern"
import { TextEffect } from "@/components/ui/text-effect"
import { InView } from "@/components/ui/in-view"
import { Magnetic } from "@/components/ui/magnetic"
import { ScrollProgress } from "@/components/ui/scroll-progress"

// ─── Design tokens ────────────────────────────────────────────────────────────
const RED = "#D91C1C"
const INK = "#0E0E0E"
const PAPER = "#FFFFFF"
const ASH = "#F2F2F0"
const HAIR = `1px solid ${INK}`
const EASE = [0.23, 1, 0.32, 1] as const

// RAIL_W = width of the decorative left/right film-strip rails.
// Every section's horizontal padding must be >= this value so text clears the rail background.
const RAIL_W = 28
const EDGE = `${RAIL_W + 16}px` // 44px — content safe zone

// ─── Font helpers ─────────────────────────────────────────────────────────────
const ARCH = "var(--font-arch), 'Archivo Black', system-ui, sans-serif"
const INTER = "var(--font-inter), 'Inter Tight', system-ui, sans-serif"
const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace"

// ─── Spring presets (ui-ux-pro-max: spring-physics for natural feel) ──────────
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 500, damping: 30 }
const SPRING_SOFT = { type: "spring" as const, stiffness: 300, damping: 28 }

// ─── Data ─────────────────────────────────────────────────────────────────────
const BOX_ITEMS = [
  {
    badge: "Box · 01",
    name: "Nashville Box · Ori",
    desc: "Classic buttermilk-brined tender, fried loud. Pickles, white bread, signature cayenne lacquer.",
    priceR: "42", priceL: "48",
    imgSrc: "/images/Nashville Box Ori.png",
    heat: 1,
  },
  {
    badge: "Box · 02",
    name: "Nashville Box · Burnt",
    desc: "Double-dredged, deep charred. Smoke-forward heat that lingers — for the serious craving.",
    priceR: "46", priceL: "52",
    imgSrc: "/images/Nashville Box Burnt.png",
    heat: 2,
  },
  {
    badge: "Box · 03",
    name: "Nashville Box · Meltdown",
    // TODO(copy): Meltdown = varian bumbu keju, BUKAN level pedas tertinggi.
    desc: "[TODO: deskripsi Meltdown — varian bumbu keju, diisi manual]",
    priceR: "49", priceL: "55",
    imgSrc: "/images/Nashville Box Meltdown.png",
    heat: 3,
  },
  {
    badge: "Box · 04 · NEW",
    name: "Nashville Box · Garlic Parm",
    desc: "Roasted garlic, aged parmesan, herb butter finish. The gentle entry — still loud.",
    priceR: "46", priceL: "52",
    imgSrc: "/images/Nashville Box Garlic Parm.png",
    heat: 1,
  },
]

const SANDO_ITEMS = [
  {
    badge: "Sando · 01",
    name: "Sando · Ori",
    desc: "Sesame brioche, cayenne-lacquered tender, cheese + shredded lettuce. Handheld, loud, done in 3 bites.",
    priceR: "56", priceL: "65",
    imgSrc: "/images/Original Sando.png",
    heat: 1,
  },
  {
    badge: "Sando · 02",
    name: "Sando · Meltdown",
    // TODO(copy): Meltdown = varian bumbu keju, BUKAN level pedas tertinggi.
    desc: "[TODO: deskripsi Meltdown — varian bumbu keju, diisi manual]",
    priceR: "56", priceL: "65",
    imgSrc: "/images/Meltdown Sando.png",
    heat: 3,
  },
  {
    badge: "Sando · 03",
    name: "Sando · Soft Egg & Ranch",
    desc: "Perfectly jammy egg, cool ranch drizzle, crispy tender. Stacked dangerously high.",
    priceR: "56", priceL: "65",
    imgSrc: "/images/Soft egg and ranch sando.png",
    heat: 1,
  },
]

const SIDES_ITEMS = [
  {
    badge: "Sides · 01",
    name: "Animal Style Fries",
    desc: "Crispy fries drowned in signature sauce, molten cheese, caramelized onions.",
    priceR: "54", priceL: "",
    imgSrc: "/images/Animal Style Fries.png",
    heat: 0,
  },
  {
    badge: "Sides · 02",
    name: "Triple Cheese Fries",
    desc: "Three-cheese blend melted over crispy fries. Rich, indulgent, no apologies.",
    priceR: "39", priceL: "",
    imgSrc: "/images/Animal Style Fries.png",
    heat: 0,
  },
  {
    badge: "Sides · 03",
    name: "Chicken & Fries",
    desc: "One crispy tender alongside seasoned fries. The straightforward side done right.",
    priceR: "50", priceL: "",
    imgSrc: "/images/Animal Style Fries.png",
    heat: 0,
  },
]

const NUGGETS_ITEMS = [
  {
    badge: "T-Nugget · 4 Pcs",
    name: "T-Nuggets · 4 Pcs",
    desc: "Bite-sized crispy tenders. Same clean source, zero fillers — snack size that doesn't compromise.",
    priceR: "30", priceL: "",
    imgSrc: "/images/photoshoot/T-Nuggets.png",
    heat: 0,
  },
  {
    badge: "T-Nugget · 6 Pcs",
    name: "T-Nuggets · 6 Pcs",
    desc: "Bite-sized crispy tenders. Same clean source, zero fillers — snack size that doesn't compromise.",
    priceR: "45", priceL: "",
    imgSrc: "/images/photoshoot/T-Nuggets.png",
    heat: 0,
  },
  {
    badge: "T-Nugget · 9 Pcs",
    name: "T-Nuggets · 9 Pcs",
    desc: "Bite-sized crispy tenders. Same clean source, zero fillers — snack size that doesn't compromise.",
    priceR: "64", priceL: "",
    imgSrc: "/images/photoshoot/T-Nuggets.png",
    heat: 0,
  },
]

const COMBO_ITEMS = [
  {
    tier: "Tier 01 · Solo",
    tag: "Solo",
    name: "Solo\nCombo",
    nameAccent: false,
    includes: ["2 Pcs Tender", "1 Pcs Rice", "1 Pcs Drink", "1 Pcs Dipjoy"],
    price: "59", featured: false,
    imgSrc: "/images/Solo Combo 1.png",
  },
  {
    tier: "Tier 02 · Most Ordered",
    tag: "Most Ordered",
    name: "Solo\nCombo 2",
    nameAccent: true,
    includes: ["3 Pcs Tender", "1 Pcs Rice", "1 Pcs Drink", "1 Pcs Dipjoy"],
    price: "75", featured: true,
    imgSrc: "/images/Solo Combo 2.png",
  },
  {
    tier: "Tier 03 · Share",
    tag: "Share · 2–3 ppl",
    name: "Maniacc\nCombo",
    nameAccent: false,
    includes: ["5 Pcs Tender", "2 Pcs Rice", "2 Pcs Drink", "2 Pcs Dipjoy"],
    price: "121.5", featured: false,
    imgSrc: "/images/Maniacc Combo.png",
  },
]

const SAUCES = [
  { name: "Comeback\nSauce", no: "No. 01", color: "#C4402A" },
  { name: "Honey\nMustard", no: "No. 02", color: "#E4B429" },
  { name: "Fancy\nRanch", no: "No. 03", color: "#F2F0E4" },
  { name: "Smokin'\nSauce", no: "No. 04", color: "#7C3A1E" },
  { name: "White\nCheese", no: "No. 05", color: "#F4E4B8" },
  { name: "Roasted\nGarlic", no: "No. 06", color: "#D9C48C" },
]

const TICKER_ITEMS = [
  "ANTIBIOTIC FREE", "NO MSG", "NKV CERTIFIED", "TRACEABLE SOURCE",
  "RAISED RIGHT", "NO SHORTCUTS", "EST. 2020", "BSD CITY", "NASHVILLE HOT CHICKEN",
]

const MENU_TABS = [
  { id: "box", label: "Nashville Box", count: 4 },
  { id: "sando", label: "Sando", count: 3 },
  { id: "tenders", label: "Tenders", count: 3 },
  { id: "nuggets", label: "T-Nuggets", count: 3 },
  { id: "pops", label: "Ayam Pops", count: 3 },
  { id: "fries", label: "Fries", count: 3 },
  { id: "extras", label: "Extras", count: undefined },
]

// ─── Shared: Brutalist button ──────────────────────────────────────────────────
function Btn({
  children, variant = "ghost", href, onClick, style: extra,
}: {
  children: React.ReactNode
  variant?: "ghost" | "primary" | "ink"
  href?: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 18px",
    minHeight: "44px", // ui-ux-pro-max: touch-target-size
    fontFamily: INTER,
    fontWeight: 700,
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    border: HAIR,
    cursor: "pointer",
    whiteSpace: "nowrap",
    lineHeight: 1,
    ...(variant === "primary" && { background: RED, color: PAPER, borderColor: RED }),
    ...(variant === "ink" && { background: INK, color: PAPER, borderColor: INK }),
    ...(variant === "ghost" && { background: "transparent", color: INK }),
    ...extra,
  }
  const motionProps = {
    style: base,
    whileHover: { x: -2, y: -2, boxShadow: `4px 4px 0 ${INK}` },
    whileTap: { scale: 0.97 },
    transition: SPRING_SNAPPY,
  }
  if (href) return <motion.a href={href} {...motionProps}>{children}</motion.a>
  return <motion.button onClick={onClick} {...motionProps}>{children}</motion.button>
}

// ─── Decorative film-strip rails ──────────────────────────────────────────────
function Rail({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left"
  return (
    <div
      aria-hidden
      className="hidden md:flex"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: `${RAIL_W}px`,
        [isLeft ? "left" : "right"]: 0,
        [isLeft ? "borderRight" : "borderLeft"]: HAIR,
        background: PAPER,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 0",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {[
        isLeft ? "FRAME / 001" : "BSD CITY — ID",
        isLeft ? "ISSUE №04" : "VOL. MMXXVI",
      ].map((text) => (
        <span
          key={text}
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: MONO,
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "rgba(14,14,14,0.45)",
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}

// ─── Section wrapper (plain passthrough) ──────────────────────────────────────
// Sticky stacking removed — sections scroll normally.
function StickyCard({ children, zIndex }: { children: React.ReactNode; zIndex: number }) {
  return <div style={{ position: "relative", zIndex }}>{children}</div>
}

// ─── MetaBar ──────────────────────────────────────────────────────────────────
function MetaBar() {
  const [time, setTime] = useState("—")

  useEffect(() => {
    const tick = () => {
      try {
        const t = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          timeZone: "Asia/Jakarta",
        })
        setTime(`JKT ${t}`)
      } catch {}
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const shared: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: "11px",
    letterSpacing: "0.08em",
    padding: "10px 16px",
  }

  return (
    <motion.header
      className="hidden md:grid"
      style={{
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        borderBottom: HAIR,
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Left — offset by EDGE so text clears the 28px rail */}
      <div style={{ ...shared, paddingLeft: EDGE, display: "flex", gap: "20px", minWidth: 0, overflow: "hidden" }}>
        <span>
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              background: RED,
              marginRight: "6px",
              transform: "translateY(-1px)",
              animation: "blink 1.2s steps(2,end) infinite",
            }}
          />
          OPEN NOW — 11:00 / 20:00
        </span>
        <span style={{ opacity: 0.5 }}>EST. 2020 · BSD CITY</span>
      </div>

      {/* Center */}
      <div style={{ ...shared, borderLeft: HAIR, borderRight: HAIR, fontWeight: 700, textTransform: "uppercase", textAlign: "center" }}>
        AYAMTENNS — NASHVILLE HOT CHICKEN CO.
      </div>

      {/* Right — offset by EDGE */}
      <div style={{ ...shared, paddingRight: EDGE, display: "flex", gap: "20px", justifyContent: "flex-end", minWidth: 0, overflow: "hidden" }}>
        <span>{time}</span>
        <span style={{ opacity: 0.5 }}>28°C · HUMID</span>
        <span style={{ opacity: 0.5 }}>IDR</span>
      </div>

      <style>{`@keyframes blink{50%{opacity:.12}}`}</style>
    </motion.header>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <motion.nav
      className="flex justify-between items-center md:grid md:grid-cols-[1fr_auto_1fr] px-6 py-3 md:px-[44px] md:py-4"
      style={{
        alignItems: "center",
        borderBottom: HAIR,
        position: "sticky",
        top: 0,
        background: scrolled ? "rgba(255,255,255,0.98)" : PAPER,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        zIndex: 40,
        transition: "background 0.25s ease, box-shadow 0.25s ease",
        boxShadow: scrolled ? `0 1px 0 ${INK}` : "none",
      }}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        style={{ display: "flex", alignItems: "center", textDecoration: "none", width: "fit-content" }}
        whileHover={{ opacity: 0.75 }}
        transition={{ duration: 0.15 }}
      >
        <Image
          src="/images/Logo AyamTenns.png"
          alt="AyamTenns"
          width={120}
          height={44}
          style={{ objectFit: "contain", height: "auto", mixBlendMode: "multiply" }}
          priority
        />
      </motion.a>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex" style={{
        gap: "28px", justifySelf: "center",
        fontFamily: INTER, fontSize: "12px", fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        {[
          { label: "Menu", href: "#menu" },
          { label: "Combos", href: "#combos" },
          { label: "Dipjoy", href: "#dipjoy" },
          { label: "Find Us", href: "#location" },
        ].map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            style={{
              color: INK, textDecoration: "none",
              padding: "4px 0", cursor: "pointer",
              // ui-ux-pro-max: state-clarity — visible hover
              position: "relative",
            }}
            whileHover={{ color: RED }}
            transition={{ duration: 0.12 }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ justifySelf: "end", display: "flex", gap: "8px", alignItems: "center" }}>
        <div className="hidden md:block">
          <Btn variant="ghost" href="https://wa.me/628111779957">
            WhatsApp <span style={{ fontFamily: MONO, fontWeight: 700 }}>↗</span>
          </Btn>
        </div>
        <Btn variant="primary" href="#order">
          Order Online <span style={{ fontFamily: MONO, fontWeight: 700 }}>→</span>
        </Btn>
      </div>
    </motion.nav>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  const HEAT_LEVEL = 3
  const heatLabels = ["No Spicy", "Mild", "Medium"]
  const { scrollY } = useScroll()
  const heroImgY = useTransform(scrollY, [0, 700], [0, 105])

  return (
    <section
      id="hero"
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        borderBottom: HAIR,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT: Text column ── */}
      <motion.div
        className="px-6 py-8 md:border-r md:py-9 md:pr-8 md:pl-[44px]"
        style={{
          borderRightColor: INK,
          position: "relative",
        }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      >
        {/* Kicker */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center" style={{
          fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em",
          fontFamily: MONO, marginBottom: "24px",
        }}>
          <span style={{ opacity: 0.75 }}>◉ NO MSG · NO ANTIBIOTIC · NKV CERTIFIED</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 10px", border: HAIR, fontWeight: 700, fontSize: "11px",
          }}>
            HEAT CERTIFIED · 3 LEVELS
          </span>
        </div>

        {/* Giant headline — mixed stroke/fill as per design spec */}
        <h1 style={{
          fontFamily: ARCH,
          // Was clamp(40px, 7vw, 130px) for "Your daily / craving / nashville
          // chicken." The new headline has longer words, so the old scale broke
          // each line in two. Reduced just enough to hold the two-line structure.
          fontSize: "clamp(34px, 5.2vw, 100px)",
          lineHeight: 0.84,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          minWidth: 0,
        }}>
          <span style={{ display: "block" }}>
            <TextEffect preset="slide" per="word" as="span" delay={0.3}>Raised right.</TextEffect>
          </span>
          <span style={{ display: "block", WebkitTextStroke: `2px ${INK}`, color: "transparent" }}>
            Fried{" "}
            <span style={{
              display: "inline-block", color: RED,
              transform: "translateY(-0.06em)", padding: "0 0.05em",
            }}>
              /
            </span>{" "}
            <span style={{ WebkitTextStroke: "0", color: RED }}>hot.</span>
          </span>
        </h1>

        {/* Undercut row */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-[22px]" style={{
          alignItems: "end",
          marginTop: "28px", paddingTop: "18px", borderTop: HAIR,
        }}>
          <span style={{ fontFamily: INTER, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
            Ch. 01
          </span>
          <p style={{ fontFamily: INTER, fontSize: "14px", lineHeight: 1.6, color: "rgba(14,14,14,0.7)" }}>
            Crispy outside. Clean inside.<br />
            Antibiotic free. No MSG. NKV certified source.<br />
            <strong style={{ fontWeight: 800, color: INK }}>Just Nashville hot chicken — done properly.</strong>
          </p>
          <span style={{ fontFamily: MONO, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, opacity: 0.5 }}>
            ↓ scroll
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ marginTop: "24px" }}>
          <Magnetic intensity={0.3} range={100}>
            <motion.a
              href="#order"
              style={{
                display: "inline-flex", alignItems: "center", gap: "14px",
                background: INK, color: PAPER,
                padding: "16px 22px",
                minHeight: "52px",
                fontFamily: ARCH, fontSize: "14px", letterSpacing: "0.06em",
                textTransform: "uppercase", border: HAIR,
                textDecoration: "none", cursor: "pointer",
              }}
              whileHover={{ background: RED, borderColor: RED }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{
                background: RED, color: PAPER,
                padding: "4px 8px", fontFamily: MONO, fontSize: "11px",
              }}>
                01
              </span>
              Order a Nashville Box{" "}
              <span style={{ fontFamily: MONO, fontWeight: 700 }}>→</span>
            </motion.a>
          </Magnetic>

          <motion.a
            href="#menu"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: INTER, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              borderBottom: HAIR, paddingBottom: "4px",
              color: INK, textDecoration: "none", cursor: "pointer",
            }}
            whileHover={{ color: RED, borderBottomColor: RED }}
            transition={{ duration: 0.15 }}
          >
            See full menu <span style={{ fontFamily: MONO, fontWeight: 700 }}>↗</span>
          </motion.a>
        </div>

        {/* Tape chips */}
        <div style={{
          marginTop: "28px", display: "flex", alignItems: "center",
          gap: "10px", padding: "10px 0",
          borderTop: HAIR, borderBottom: HAIR,
          fontFamily: MONO, overflowX: "auto",
          scrollbarWidth: "none",
        }}>
          {[
            { label: "NEW", red: true },
            { label: "BOX · SANDO · TENDERS · T-NUGGETS · POPS", red: false },
            { label: "GO-JEK", red: false },
            { label: "GRABFOOD", red: false },
            { label: "SHOPEEFOOD", red: false },
          ].map(({ label, red }) => (
            <span key={label} style={{
              fontFamily: MONO, fontSize: "10px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "4px 8px", border: HAIR, flexShrink: 0,
              ...(red && { background: RED, color: PAPER, borderColor: RED }),
            }}>
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT: Image + info column ── */}
      <motion.div
        style={{ display: "flex", flexDirection: "column" }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
      >
        {/* Plate — food image area, isolated from heat/stats below */}
        <div className="min-h-[280px] md:min-h-[480px]" style={{
          position: "relative",
          overflow: "hidden",
          background: "#111",
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: HAIR,
        }}>
          {/* Corner labels */}
          {[
            { pos: { top: "14px", left: "14px" }, text: "PLATE · 01 / SIGNATURE", dark: false },
            { pos: { top: "14px", right: "14px" }, text: "MEDIUM HEAT", dark: true },
            { pos: { bottom: "14px", left: "14px" }, text: "FROM IDR 42K", dark: false },
            { pos: { bottom: "14px", right: "14px" }, text: "© AYAMTENNS", dark: false },
          ].map(({ pos, text, dark }) => (
            <div key={text} style={{
              position: "absolute",
              fontFamily: MONO, fontSize: "10px", letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "6px 10px",
              background: dark ? RED : PAPER,
              color: dark ? PAPER : INK,
              border: dark ? `1px solid ${RED}` : HAIR,
              zIndex: 10, ...pos,
            }}>
              {text}
            </div>
          ))}

          {/* Ghost number — desktop only to avoid overflow */}
          <span aria-hidden className="hidden md:block" style={{
            position: "absolute", left: "-10px", bottom: "-30px",
            fontFamily: ARCH,
            fontSize: "clamp(160px, 22vw, 320px)",
            lineHeight: 0.8, letterSpacing: "-0.04em",
            color: RED, opacity: 0.07,
            userSelect: "none", pointerEvents: "none",
          }}>01</span>

          {/* Crosshair */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
            <div style={{ position: "absolute", left: "50%", top: "38%", bottom: "38%", width: "1px", background: PAPER, opacity: 0.3, transform: "translateX(-0.5px)" }} />
            <div style={{ position: "absolute", top: "50%", left: "38%", right: "38%", height: "1px", background: PAPER, opacity: 0.3, transform: "translateY(-0.5px)" }} />
          </div>

          {/* Hero food image — overhead flat lay, subtle parallax on scroll */}
          <motion.div
            style={{ position: "absolute", inset: "-15% 0", zIndex: 1, y: heroImgY, willChange: "transform" }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          >
            <Image
              src="/images/photoshoot/VIN01162.jpg"
              alt="AyamTenns Nashville Hot Chicken — overhead flat lay"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center center" }}
              sizes="(max-width: 768px) 90vw, 42vw"
            />
            {/* Bottom gradient so heat meter border stays crisp */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,14,14,0.18) 0%, transparent 40%)" }} />
          </motion.div>
        </div>

        {/* ── Heat meter — fully below the plate ── */}
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[130px_1fr_auto]" style={{
          alignItems: "stretch",
          borderBottom: HAIR,
          minHeight: "46px",
        }}>
          <div style={{
            padding: "12px 16px",
            fontFamily: ARCH, fontSize: "12px", letterSpacing: "0.04em",
            textTransform: "uppercase", borderRight: HAIR,
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ width: "10px", height: "10px", background: RED, flexShrink: 0 }} />
            Heat Index
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: "0 16px", gap: "5px" }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{
                flex: 1, height: "12px",
                background: i < HEAT_LEVEL ? RED : "transparent",
                border: i < HEAT_LEVEL ? "none" : HAIR,
                transform: "skewX(-18deg)", transformOrigin: "bottom left",
                display: "block",
              }} />
            ))}
          </div>
          <div style={{
            display: "flex", alignItems: "center",
            padding: "0 14px", borderLeft: HAIR,
            fontFamily: MONO, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.04em", textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            {String(HEAT_LEVEL).padStart(2, "0")} / 03 · {heatLabels[HEAT_LEVEL - 1]}
          </div>
        </div>

        {/* ── Stats grid — fully below heat meter ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { k: "// Box flavors", v: "04" },
            { k: "// Dipjoy sauces", v: "06" },
            { k: "// Heat levels", v: "03" },
          ].map(({ k, v }, i) => (
            <div key={k} style={{
              padding: "16px", borderRight: i < 2 ? HAIR : "none",
              display: "flex", flexDirection: "column", gap: "4px",
            }}>
              <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(14,14,14,0.55)" }}>
                {k}
              </span>
              <span style={{ fontFamily: ARCH, fontSize: "24px", letterSpacing: "-0.02em" }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stamp — decorative, hidden on mobile */}
      <motion.div
        className="hidden md:grid"
        style={{
          position: "absolute",
          right: `${RAIL_W + 16}px`,
          top: "180px",
          width: "140px",
          height: "140px",
          border: `1px solid ${RED}`,
          color: RED,
          placeItems: "center",
          transform: "rotate(-8deg)",
          pointerEvents: "none",
          zIndex: 5,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(4px)",
        }}
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.95 }}
      >
        <div style={{ position: "absolute", inset: "6px", border: `1px solid ${RED}` }} />
        <div style={{ position: "absolute", inset: "11px", border: `1px dashed ${RED}`, opacity: 0.65 }} />
        <div style={{
          textAlign: "center", fontFamily: ARCH,
          fontSize: "12px", letterSpacing: "0.04em",
          textTransform: "uppercase", lineHeight: 1, position: "relative", zIndex: 1,
        }}>
          Made
          <strong style={{ display: "block", fontSize: "26px", letterSpacing: "-0.02em", margin: "5px 0" }}>Hot</strong>
          Daily
          <small style={{ fontFamily: MONO, fontWeight: 500, fontSize: "9px", letterSpacing: "0.14em", display: "block", marginTop: "4px" }}>
            AYAMTENNS · BSD
          </small>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Ticker strip ─────────────────────────────────────────────────────────────
function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{
      display: "flex", alignItems: "center",
      borderBottom: HAIR, background: INK, color: PAPER, overflow: "hidden",
    }} aria-hidden>
      {/* Tag */}
      <div style={{
        paddingLeft: "14px",
        paddingRight: "14px",
        paddingTop: "12px",
        paddingBottom: "12px",
        background: RED,
        fontFamily: ARCH, fontSize: "12px",
        letterSpacing: "0.06em", textTransform: "uppercase",
        flexShrink: 0,
        borderRight: `1px solid rgba(255,255,255,0.2)`,
      }}>
        LIVE FEED ●
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: "42px", padding: "12px 0 12px 24px", whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((text, i) => (
            <span key={i} style={{
              fontFamily: ARCH, fontSize: "13px",
              textTransform: "uppercase", letterSpacing: "0.04em",
              display: "inline-flex", alignItems: "center", gap: "18px",
            }}>
              {text}
              <span style={{ color: RED, fontSize: "10px" }}>●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── MenuCard ─────────────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: (typeof BOX_ITEMS)[0]; index: number }) {
  const imgRef = useRef(null)
  const inView = useInView(imgRef, { once: true, amount: 0.25 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      style={{
        borderRight: HAIR,
        display: "flex", flexDirection: "column",
        minHeight: "360px", position: "relative",
        cursor: "default",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      // ui-ux-pro-max: stagger-sequence — 40ms per item
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Photo area */}
      <div style={{
        aspectRatio: "1",
        background: "radial-gradient(ellipse at 50% 45%, #ffffff 0%, #f4f4f2 60%, #e8e8e6 100%)",
        borderBottom: HAIR,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Badge — left offset clears the 28px rail on the first card (desktop only) */}
        <div
          className={`absolute top-[10px] z-[2] ${index === 0 ? 'left-[10px] md:left-[44px]' : 'left-[10px]'}`}
          style={{
            background: RED, color: PAPER,
            fontFamily: MONO, fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "5px 8px",
          }}
        >
          {item.badge}
        </div>

        {/* Heat dots */}
        {item.heat > 0 && (
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            background: PAPER, border: HAIR,
            fontFamily: MONO, fontSize: "10px",
            padding: "5px 8px",
            display: "flex", gap: "3px", alignItems: "center",
            zIndex: 2,
          }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: "6px", height: "6px",
                background: i < item.heat ? RED : "transparent",
                border: i < item.heat ? "none" : HAIR,
                display: "block",
              }} />
            ))}
          </div>
        )}

        {/* Food image — 0.92→1.0 on scroll into view, staggered by index */}
        <motion.div
          ref={imgRef}
          style={{ position: "relative", width: "84%", height: "84%", flexShrink: 0, willChange: "transform" }}
          animate={{
            scale: inView ? (hovered ? 1.07 : 1.0) : 0.92,
            opacity: inView ? 1 : 0,
          }}
          transition={inView ? { ...SPRING_SOFT, delay: index * 0.08 } : { duration: 0.3 }}
        >
          <Image
            src={item.imgSrc}
            alt={item.name}
            fill
            style={{
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 12px 16px rgba(0,0,0,.16))",
            }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
      </div>

      {/* Card body */}
      <div
        className={`pt-4 pb-4 pr-[18px] ${index === 0 ? 'pl-6 md:pl-[44px]' : 'pl-6'}`}
        style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}
      >
        <div style={{ fontFamily: ARCH, fontSize: "20px", letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1 }}>
          {item.name}
        </div>
        <div style={{ fontFamily: INTER, fontSize: "12px", lineHeight: 1.5, color: "rgba(14,14,14,0.65)" }}>
          {item.desc}
        </div>

        {/* Price row */}
        <div style={{
          marginTop: "auto", display: "flex",
          justifyContent: "space-between", alignItems: "flex-end",
          borderTop: HAIR, paddingTop: "12px",
        }}>
          <div style={{ fontFamily: ARCH, fontSize: "19px", letterSpacing: "-0.01em" }}>
            {item.priceR}<span style={{ color: RED }}>K</span>
            <small style={{ fontFamily: MONO, fontSize: "10px", marginLeft: "3px", color: "rgba(14,14,14,0.5)" }}>/R</small>
            {item.priceL && (
              <>
                {"  "}
                {item.priceL}<span style={{ color: RED }}>K</span>
                <small style={{ fontFamily: MONO, fontSize: "10px", marginLeft: "3px", color: "rgba(14,14,14,0.5)" }}>/L</small>
              </>
            )}
          </div>
          <motion.button
            style={{
              fontFamily: INTER, fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "8px 12px", minHeight: "36px", // touch-friendly
              border: HAIR, cursor: "pointer",
              background: "transparent", color: INK,
            }}
            whileHover={{ background: INK, color: PAPER }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.12 }}
          >
            Add +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MenuSection ──────────────────────────────────────────────────────────────
function MenuSection() {
  const [activeTab, setActiveTab] = useState("box")
  const items = activeTab === "sando" ? SANDO_ITEMS : activeTab === "fries" ? SIDES_ITEMS : activeTab === "nuggets" ? NUGGETS_ITEMS : BOX_ITEMS

  return (
    <section id="menu">
      {/* Section head */}
      <InView
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: EASE }}
        viewOptions={{ once: true, amount: 0.5 }}
      >
        <div
          className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] px-6 pt-8 pb-5 md:px-[44px] md:pt-10"
          style={{ alignItems: "end", gap: "24px", borderBottom: HAIR }}
        >
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", paddingBottom: "8px", opacity: 0.55 }}>
            § 02 / MENU
          </div>
          <h2 style={{ fontFamily: ARCH, fontSize: "clamp(26px, 6vw, 88px)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            The <em style={{ fontStyle: "normal", color: RED }}>Menu</em> — Built Loud.
          </h2>
          <div className="hidden md:block" style={{ fontFamily: MONO, fontSize: "11px", textAlign: "right", textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.5, paddingBottom: "8px", color: "rgba(14,14,14,0.55)" }}>
            Prices in IDR
            <br />R = Regular · L = Large
          </div>
        </div>
      </InView>

      {/* Tabs — horizontally scrollable */}
      <div style={{ borderBottom: HAIR, overflowX: "auto", scrollbarWidth: "none", display: "flex" }}>
        {/* Spacer to push first tab past the rail — desktop only */}
        <div className="hidden md:block" style={{ width: EDGE, flexShrink: 0, borderRight: HAIR }} />
        {MENU_TABS.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "14px 20px", minHeight: "48px",
              fontFamily: INTER, fontWeight: 700, fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: activeTab === tab.id ? INK : "transparent",
              color: activeTab === tab.id ? PAPER : INK,
              border: "none",
              borderRight: HAIR,
              outline: "none",
            }}
            whileHover={{ background: activeTab === tab.id ? INK : ASH }}
            // ui-ux-pro-max: state-transition — smooth, not snap
            transition={{ duration: 0.15 }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ fontFamily: MONO, fontSize: "10px", marginLeft: "8px", opacity: 0.55 }}>
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* 4-col card grid → 2-col on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: HAIR }}>
        {items.map((item, i) => (
          <MenuCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── ComboCard ────────────────────────────────────────────────────────────────
function ComboCard({ combo, index }: { combo: (typeof COMBO_ITEMS)[0]; index: number }) {
  return (
    <motion.div
      style={{
        borderRight: index < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
        borderTop: `3px solid ${RED}`,
        display: "flex", flexDirection: "column",
        minHeight: "460px",
        background: INK,
        color: PAPER,
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
    >
      {/* Food image — large, fills top ~55% */}
      <motion.div
        style={{ position: "relative", width: "100%", height: "300px", flexShrink: 0, background: "rgba(255,255,255,0.025)" }}
        whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <Image
          src={combo.imgSrc}
          alt={combo.name.replace("\n", " ")}
          fill
          style={{ objectFit: "contain", padding: "16px", filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.6))" }}
          sizes="33vw"
        />
      </motion.div>

      {/* Card content */}
      <div
        className={`px-6 pt-[18px] pb-6 ${index === 0 ? 'md:pl-[44px]' : ''} ${index === 2 ? 'md:pr-[44px]' : ''}`}
        style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}
      >
        {/* Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
            color: combo.featured ? RED : "rgba(255,255,255,0.4)",
            border: `1px solid ${combo.featured ? RED : "rgba(255,255,255,0.15)"}`,
            padding: "3px 8px", flexShrink: 0,
          }}>
            {combo.tag}
          </span>
          {combo.featured && (
            <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              ★ Top Pick
            </span>
          )}
        </div>

        {/* Name */}
        <div className="text-[28px] md:text-[38px]" style={{ fontFamily: ARCH, letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 0.9, whiteSpace: "pre-line" }}>
          {combo.nameAccent
            ? combo.name.split("\n").map((line, j) =>
                j === 1
                  ? <span key={j}>{"\n"}<em style={{ fontStyle: "normal", color: RED }}>{line}</em></span>
                  : <span key={j}>{line}</span>
              )
            : combo.name}
        </div>

        {/* Includes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontFamily: MONO, fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>
          {combo.includes.map((inc) => (
            <span key={inc} style={{ padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
              + {inc}
            </span>
          ))}
        </div>

        {/* Price + Order */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>IDR</div>
            <div className="text-[36px] md:text-[52px]" style={{ fontFamily: ARCH, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {combo.price}<em style={{ fontStyle: "normal", color: RED, fontSize: "30px" }}>K</em>
            </div>
          </div>
          <motion.a
            href="#order"
            style={{
              fontFamily: INTER, fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              display: "inline-flex", gap: "8px", alignItems: "center",
              borderBottom: `1px solid rgba(255,255,255,0.35)`,
              paddingBottom: "3px", color: "rgba(255,255,255,0.7)",
              textDecoration: "none", cursor: "pointer", marginBottom: "6px",
            }}
            whileHover={{ color: RED, borderBottomColor: RED }}
            transition={{ duration: 0.12 }}
          >
            Order →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── CombosSection ────────────────────────────────────────────────────────────
function CombosSection() {
  return (
    <section id="combos" style={{ paddingBottom: "80px" }}>
      <motion.div
        className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] px-6 pt-8 pb-5 md:px-[44px] md:pt-10"
        style={{
          alignItems: "end", gap: "24px",
          borderBottom: HAIR,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", paddingBottom: "8px", opacity: 0.55 }}>
          § 04 / COMBOS
        </div>
        <h2 style={{ fontFamily: ARCH, fontSize: "clamp(26px, 6vw, 88px)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
          Eat <em style={{ fontStyle: "normal", color: RED }}>Loud</em>. Share Louder.
        </h2>
        <div className="hidden md:block" style={{ fontFamily: MONO, fontSize: "11px", textAlign: "right", textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.5, paddingBottom: "8px", color: "rgba(14,14,14,0.55)" }}>
          Portions for one
          <br />or the whole crew
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: HAIR }}>
        {COMBO_ITEMS.map((combo, i) => <ComboCard key={combo.name} combo={combo} index={i} />)}
      </div>
    </section>
  )
}

// ─── DipjoySection ────────────────────────────────────────────────────────────
function DipjoySection() {
  return (
    <section id="dipjoy" className="px-6 py-8 md:px-[44px] lg:px-16 md:py-9" style={{ borderBottom: HAIR, background: ASH, overflowX: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end md:justify-between md:mb-6">
          <h3 style={{ fontFamily: ARCH, fontSize: "clamp(24px, 5vw, 60px)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            <em style={{ fontStyle: "normal", color: RED }}>Dipjoy</em> — flavorful dips, every time.
          </h3>
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "right", lineHeight: 1.5, color: "rgba(14,14,14,0.55)" }}>
            Six house sauces
            <br />Made in-kitchen
            <br />+Rp 0 with combos
          </div>
        </div>

        {/* 2-col on mobile → 3-col sm → 6-col md */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-t border-l border-[#0E0E0E]" style={{ background: PAPER }}>
          {SAUCES.map((sauce, i) => (
            <motion.div
              key={sauce.no}
              className="border-r border-b border-[#0E0E0E]"
              style={{
                padding: "18px 16px",
                display: "flex", flexDirection: "column", gap: "10px",
                minHeight: "150px", cursor: "default",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              whileHover={{ background: "#f8f8f6" }}
            >
              <div style={{ width: "44px", height: "44px", flexShrink: 0 }}>
                <div style={{ width: "44px", height: "44px", background: sauce.color, border: HAIR, position: "relative" }}>
                  <div style={{ position: "absolute", inset: "4px", border: `1px solid ${INK}`, opacity: 0.25 }} />
                </div>
              </div>
              <div style={{ fontFamily: ARCH, fontSize: "14px", letterSpacing: "-0.005em", textTransform: "uppercase", lineHeight: 1, whiteSpace: "pre-line" }}>
                {sauce.name}
              </div>
              <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", color: "rgba(14,14,14,0.5)", marginTop: "auto" }}>
                {sauce.no}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── Three Promises ───────────────────────────────────────────────────────────
const PROMISES = [
  {
    no: "Promise 01",
    title: "Raised\nRight",
    body: "Ayam dari peternakan terpadu bersertifikat NKV. Satu pemasok sejak hari pertama, bukan campuran dari pasar.",
  },
  {
    no: "Promise 02",
    title: "Fried\nHot",
    // Bagian cayenne sengaja belum ditulis — prosesnya belum dikonfirmasi.
    body: "Digoreng saat pesanan masuk, tidak pernah sebelumnya.",
  },
  {
    no: "Promise 03",
    title: "Consistent\nor Nothing",
    body: "Kalau tidak memenuhi standar kami, tidak keluar dari dapur. Setiap pesanan. Setiap kali.",
  },
]

function ThreePromises() {
  return (
    <section style={{ borderBottom: HAIR, position: "relative", overflow: "hidden", paddingTop: "80px" }}>
      {/* Background image with dark overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/photoshoot/VIN09938a.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          aria-hidden
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,14,0.91)" }} />
      </div>

      {/* Section header */}
      <motion.div
        className="block px-6 pt-8 pb-5 md:grid md:grid-cols-[44px_1fr_auto] md:px-0 md:pt-10"
        style={{
          alignItems: "end",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Rail spacer — desktop only */}
        <div className="hidden md:block" style={{ height: "100%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            § 05 / STANDARDS
          </div>
          <h2 style={{
            fontFamily: ARCH,
            fontSize: "clamp(28px, 7vw, 108px)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: PAPER,
          }}>
            No shortcuts.{" "}
            <span style={{ WebkitTextStroke: `2px ${PAPER}`, color: "transparent" }}>Ever.</span>
          </h2>
        </div>
        <div className="hidden md:block" style={{
          paddingRight: EDGE, paddingBottom: "6px",
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.1em", textTransform: "uppercase",
          lineHeight: 1.6, color: "rgba(255,255,255,0.3)",
          textAlign: "right",
        }}>
          Three commitments<br />Non-negotiable
        </div>
      </motion.div>

      {/* Three-column promise grid → single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ position: "relative", zIndex: 1 }}>
        {PROMISES.map((promise, i) => (
          <motion.div
            key={promise.no}
            className={`flex flex-col gap-5 px-6 py-8 md:py-9 ${i === 0 ? "md:px-[44px]" : "md:px-8"}`}
            style={{
              borderRight: "1px solid rgba(255,255,255,0.1)",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
          >
            {/* Large ghost number */}
            <span aria-hidden style={{
              position: "absolute",
              right: "-12px",
              bottom: "-28px",
              fontFamily: ARCH,
              fontSize: "clamp(100px, 14vw, 200px)",
              lineHeight: 0.8,
              letterSpacing: "-0.04em",
              color: PAPER,
              opacity: 0.04,
              userSelect: "none",
              pointerEvents: "none",
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Promise number badge */}
            <div style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}>
              {promise.no}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: ARCH,
              fontSize: "clamp(32px, 3.5vw, 52px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              whiteSpace: "pre-line",
              color: PAPER,
            }}>
              {promise.title}
            </div>

            {/* Divider */}
            <div style={{ width: "32px", height: "2px", background: RED, flexShrink: 0 }} />

            {/* Body */}
            <p style={{
              fontFamily: INTER,
              fontSize: "14px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "34ch",
            }}>
              {promise.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── StorySection ─────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section id="story" style={{ borderBottom: HAIR, background: INK, color: PAPER, overflow: "hidden" }}>
      {/* Section header */}
      <motion.div
        className="block px-6 pt-8 pb-5 md:grid md:grid-cols-[44px_1fr_auto] md:px-0 md:pt-10"
        style={{
          alignItems: "end",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="hidden md:block" />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            § 03 / STORY
          </div>
          <h2 style={{ fontFamily: ARCH, fontSize: "clamp(26px, 6vw, 88px)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase", color: PAPER }}>
            The Ritual.{" "}
            <em style={{ fontStyle: "normal", color: RED }}>The Craft.</em>
          </h2>
        </div>
        <div className="hidden md:block" style={{ paddingRight: EDGE, paddingBottom: "6px", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
          Behind every box<br />BSD City
        </div>
      </motion.div>

      {/* Full width: DSC00889.jpg — cinematic flying basket */}
      <motion.div
        style={{ position: "relative", height: "62vh", overflow: "hidden" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Image
          src="/images/photoshoot/VIN01168.jpg"
          alt="AyamTenns — tender on wire rack, overhead"
          fill
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, rgba(14,14,14,1) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "24px", left: EDGE, fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          FRESH · EVERY DAY
        </div>
      </motion.div>

      {/* 2-col lifestyle grid → single col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {([
          { src: "/images/photoshoot/7.JPG", alt: "AyamTenns lifestyle" },
          { src: "/images/photoshoot/40.JPG", alt: "AyamTenns lifestyle" },
        ] as const).map(({ src, alt }, i) => (
          <motion.div
            key={src}
            className="h-[240px] md:h-[480px]"
            style={{ position: "relative", overflow: "hidden", borderRight: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
          >
            <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="50vw" />
          </motion.div>
        ))}
      </div>

      {/* Full width: VIN01186-3.jpg — overhead flat lay */}
      <motion.div
        style={{ position: "relative", height: "56vh", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.07)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Image
          src="/images/photoshoot/VIN01186-3.jpg"
          alt="AyamTenns full menu — overhead flat lay"
          fill
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to bottom, rgba(14,14,14,0.55) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "22px", right: EDGE, fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          THE FULL MENU ↓
        </div>
      </motion.div>
    </section>
  )
}

// ─── Location Section ─────────────────────────────────────────────────────────
const MAPS_URL = "https://maps.google.com/?q=-6.3175003186975225,106.6522050551735"

function LocationSection() {
  return (
    <section id="location" style={{ borderBottom: HAIR }}>
      {/* Section header */}
      <motion.div
        className="block px-6 pt-8 pb-5 md:grid md:grid-cols-[44px_1fr_auto] md:px-0 md:pt-10"
        style={{
          alignItems: "end", borderBottom: HAIR,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="hidden md:block" />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
            § 06 / FIND US
          </div>
          <h2 style={{ fontFamily: ARCH, fontSize: "clamp(26px, 6vw, 88px)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            Come <em style={{ fontStyle: "normal", color: RED }}>Get It.</em>
          </h2>
        </div>
        <div className="hidden md:block" style={{ paddingRight: EDGE, paddingBottom: "6px", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, color: "rgba(14,14,14,0.45)", textAlign: "right" }}>
          BSD City<br />Tangerang
        </div>
      </motion.div>

      {/* Map + Info grid — stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px]">
        {/* Google Maps embed — silver/monochrome theme + pulsing red pin */}
        <div className="h-[260px] md:h-[400px]" style={{ position: "relative", overflow: "hidden", borderRight: HAIR, background: "#e8e8e8", cursor: "pointer" }}>
          {/* Iframe — non-interactive, purely visual. Silver grayscale filter. */}
          <iframe
            src="https://maps.google.com/maps?q=-6.3175003186975225,106.6522050551735&output=embed&z=16"
            width="100%"
            height="100%"
            style={{
              border: "none",
              display: "block",
              filter: "grayscale(100%) contrast(1.1)",
              pointerEvents: "none",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AyamTenns Location"
          />

          {/* Full-area transparent anchor — clicking anywhere opens Google Maps */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute", inset: 0, zIndex: 3,
              display: "block", textDecoration: "none",
            }}
            aria-label="Open AyamTenns in Google Maps"
          />

          {/* Pulsing red pin — centered on location, above click layer */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -55%)", zIndex: 4, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: "-24px", borderRadius: "50%", border: `1px solid ${RED}`, opacity: 0.35, animation: "locPulse 2.4s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: "-13px", borderRadius: "50%", border: `1px solid ${RED}`, opacity: 0.6, animation: "locPulse 2.4s ease-out infinite 0.7s" }} />
            <div style={{ width: "14px", height: "14px", background: RED, borderRadius: "50%", boxShadow: `0 0 0 3px rgba(217,28,28,0.28), 0 4px 14px rgba(0,0,0,0.25)`, position: "relative", zIndex: 2 }} />
          </div>

          {/* AYAMTENNS label near pin */}
          <div style={{
            position: "absolute", left: "calc(50% + 14px)", top: "calc(50% - 21px)",
            fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em",
            color: PAPER, textTransform: "uppercase", whiteSpace: "nowrap",
            background: RED, padding: "5px 10px", zIndex: 4, pointerEvents: "none",
          }}>
            AYAMTENNS
          </div>

          {/* OPEN IN MAPS hint — bottom right */}
          <div style={{
            position: "absolute", bottom: "16px", right: "16px", zIndex: 4, pointerEvents: "none",
            fontFamily: MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
            color: INK, background: "rgba(255,255,255,0.82)", padding: "6px 10px",
            border: HAIR,
          }}>
            OPEN IN MAPS ↗
          </div>

          <style>{`@keyframes locPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.4);opacity:0}}`}</style>
        </div>

        {/* Info panel */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              icon: "📍",
              label: "Address",
              value: "Ruko Avenix 92 Blok C.16\nSampora, Cisauk, Tangerang\nBanten 15345",
              href: MAPS_URL,
            },
            {
              icon: "🕐",
              label: "Hours",
              value: "11:00 — 20:00 WIB\nOpen daily",
              href: undefined,
            },
            {
              icon: "📱",
              label: "WhatsApp",
              value: "08111779957",
              href: "https://wa.me/628111779957",
            },
          ].map(({ icon, label, value, href }, i) => {
            const inner = (
              <div style={{ padding: `16px 24px`, borderBottom: i < 2 ? HAIR : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px" }}>{icon}</span>
                  <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(14,14,14,0.45)" }}>{label}</span>
                </div>
                <div style={{ fontFamily: INTER, fontSize: "14px", fontWeight: 600, lineHeight: 1.5, whiteSpace: "pre-line", color: INK }}>
                  {value}
                </div>
              </div>
            )
            return href ? (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: INK }} whileHover={{ backgroundColor: ASH }} transition={{ duration: 0.12 }}>
                {inner}
              </motion.a>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}

          {/* Open Maps CTA */}
          <div className="pt-4 pb-4 px-6 md:pl-[44px] md:pr-7" style={{ marginTop: "auto" }}>
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: INTER, fontWeight: 700, fontSize: "12px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: INK, textDecoration: "none",
                border: HAIR, padding: "12px 18px", minHeight: "44px",
              }}
              whileHover={{ x: -2, y: -2, boxShadow: `4px 4px 0 ${INK}` }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
            >
              Get Directions <span style={{ fontFamily: MONO, fontWeight: 700 }}>↗</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Order CTA ────────────────────────────────────────────────────────────────
function OrderCTA() {

  return (
    <section id="order" className="px-6 py-16 md:px-[44px] lg:px-16 md:py-20" style={{
      background: RED,
      borderTop: `3px solid ${INK}`, borderBottom: `3px solid ${INK}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Ghost text */}
      <div aria-hidden style={{
        position: "absolute", right: "-0.5rem", bottom: "-0.1em",
        fontFamily: ARCH, fontSize: "22vw", lineHeight: 1,
        color: "rgba(0,0,0,0.06)", letterSpacing: "-0.04em",
        pointerEvents: "none", userSelect: "none",
      }}>
        ORDER
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between max-w-[1400px] mx-auto w-full" style={{
        position: "relative", zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>
            [ READY? ]
          </div>
          <h2 style={{ fontFamily: ARCH, fontSize: "clamp(2rem, 7vw, 5.5rem)", lineHeight: 0.85, color: PAPER, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
            READY TO GET
            <br />YOUR FIX?
          </h2>
          <p style={{ fontFamily: INTER, fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", marginTop: "12px" }}>
            Order now from BSD City's hottest chicken spot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          className="flex flex-col gap-3 items-stretch md:items-start"
          style={{ }}
        >
          {/* Magnetic primary button */}
          <Magnetic intensity={0.4} range={120} springOptions={{ stiffness: 350, damping: 25, mass: 0.2 }}>
            <motion.a
              href="https://r.grab.com/o/ZnEvIjmq"
              target="_blank" rel="noopener noreferrer"
              className="w-full md:w-auto justify-center md:justify-start"
              style={{
                display: "inline-flex", alignItems: "center", gap: "12px",
                background: PAPER, color: RED,
                fontFamily: ARCH, fontSize: "14px", letterSpacing: "0.06em",
                textTransform: "uppercase", textDecoration: "none",
                padding: "20px 32px", minHeight: "56px",
                border: `2px solid ${PAPER}`, cursor: "pointer",
              }}
              whileTap={{ scale: 0.97 }}
            >
              GrabFood <span style={{ fontFamily: MONO, fontWeight: 700 }}>→</span>
            </motion.a>
          </Magnetic>

          {/* Secondary delivery options */}
          <div className="flex gap-[10px]">
            {[
              { label: "GoFood", href: "#order" },
              { label: "ShopeeFood", href: "#order" },
            ].map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontFamily: INTER, fontWeight: 700, fontSize: "11px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)", textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "10px 16px", minHeight: "40px",
                  cursor: "pointer",
                }}
                whileHover={{ color: PAPER, borderColor: PAPER }}
                transition={{ duration: 0.12 }}
              >
                {label} ↗
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      {/* Info strip — single col on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]" style={{ borderBottom: HAIR }}>
        {[
          { k: "// Location", v: "Ruko Avenix 92 Blok C.16\nSampora, Cisauk, Tangerang", dot: true },
          { k: "// Hours", v: "Daily 11:00 — 20:00 WIB", dot: false },
          { k: "// WhatsApp", v: "08111779957", dot: false },
          { k: "// Follow", v: "@ayamtenns", dot: false },
        ].map(({ k, v, dot }, i) => (
          <div key={k} style={{
            // First cell gets EDGE left padding; others normal
            padding: "16px 24px",
            borderRight: i < 3 ? HAIR : "none",
            borderBottom: HAIR,
            fontSize: "12px", lineHeight: 1.4,
          }}>
            <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(14,14,14,0.55)", marginBottom: "6px", display: "block" }}>
              {k}
            </span>
            <span style={{ fontFamily: INTER, fontWeight: 700, letterSpacing: "-0.005em", fontSize: "13px", display: "flex", alignItems: "flex-start", gap: "10px", whiteSpace: "pre-line", lineHeight: 1.4 }}>
              {dot && <span style={{ width: "6px", height: "6px", background: RED, borderRadius: "50%", boxShadow: `0 0 0 4px rgba(217,28,28,0.13)`, flexShrink: 0, display: "inline-block", marginTop: "4px" }} />}
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* Footer body */}
      <footer id="footer" className="px-6 pt-6 pb-8 md:px-[44px] lg:px-16" style={{ background: INK }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1.2fr]" style={{ gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "1px" }}>
          {/* Brand */}
          <div style={{ background: INK, padding: "2rem" }}>
            <Image
              src="/images/Logo AyamTenns.png"
              alt="AyamTenns"
              width={110}
              height={40}
              style={{ objectFit: "contain", height: "auto", filter: "brightness(0) invert(1)" }}
            />
            <p style={{ fontFamily: INTER, fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", marginTop: "1rem", lineHeight: 1.7 }}>
              Nashville Hot Chicken
              <br />BSD City, Indonesia
            </p>
            <p style={{ fontFamily: INTER, fontStyle: "italic", fontSize: "0.78rem", color: "rgba(255,255,255,0.16)", marginTop: "0.5rem" }}>
              "Raised right. Fried hot."
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Instagram", href: "https://www.instagram.com/ayamtenns" },
                { label: "WhatsApp", href: "https://wa.me/628111779957" },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: "8px 14px", minHeight: "36px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontFamily: MONO, fontWeight: 700, fontSize: "10px",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)", textDecoration: "none", cursor: "pointer",
                  }}
                  whileHover={{ borderColor: RED, color: RED }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                >
                  {label} ↗
                </motion.a>
              ))}
            </div>
          </div>

          {/* Menu col */}
          <div style={{ background: INK, padding: "2rem" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.25rem" }}>
              Menu
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Nashville Box", "Sando", "Tenders", "Combo Deals", "Dipjoy Sauces"].map((l) => (
                <li key={l}>
                  <a
                    href="#menu"
                    style={{ fontFamily: INTER, fontSize: "0.88rem", color: "rgba(255,255,255,0.32)", textDecoration: "none", transition: "color 0.12s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = PAPER)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div style={{ background: INK, padding: "2rem" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.25rem" }}>
              Contact
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "WA · 08111779957", href: "https://wa.me/628111779957" },
                { label: "ayamtenns@gmail.com", href: "mailto:ayamtenns@gmail.com" },
                { label: "@ayamtenns", href: "https://www.instagram.com/ayamtenns" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: INTER, fontSize: "0.82rem", color: "rgba(255,255,255,0.32)", textDecoration: "none", transition: "color 0.12s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = PAPER)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours col */}
          <div style={{ background: INK, padding: "2rem" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.25rem" }}>
              Hours & Location
            </h4>
            <div style={{ fontFamily: INTER, fontSize: "0.85rem", color: "rgba(255,255,255,0.28)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div>Daily: 11:00 — 20:00 WIB</div>
              <div style={{ marginTop: "0.85rem", color: "rgba(255,255,255,0.16)", fontSize: "0.78rem", lineHeight: 1.75 }}>
                Ruko Avenix 92 Blok C.16<br />Sampora, Cisauk<br />Tangerang, Banten 15345
              </div>
              <a
                href={MAPS_URL}
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", textDecoration: "none", marginTop: "0.6rem", transition: "color 0.12s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                OPEN IN MAPS ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <samp style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.18)" }}>
            © 2026 AYAMTENNS. ALL RIGHTS RESERVED.
          </samp>
          <samp style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.1)" }}>
            REV 1.0 — AYAMTENNS® — BSD CITY · ID
          </samp>
        </div>
      </footer>
    </>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div
      style={{
        maxWidth: "1600px",
        margin: "0 auto",
        borderLeft: HAIR,
        borderRight: HAIR,
        minHeight: "100vh",
        position: "relative",
        background: PAPER,
        // overflowX: clip prevents horizontal scroll without breaking position:sticky
        // (overflow:hidden would break sticky — this is the correct fix)
        overflowX: "clip",
      }}
    >
      <ScrollProgress className="fixed z-[100] h-[2px] bg-[#D91C1C]" />
      <Rail side="left" />
      <Rail side="right" />
      <MetaBar />
      <Navbar />
      <StickyCard zIndex={1}><HeroSection /></StickyCard>
      <TickerStrip />
      <WrapPattern size="m" density="medium" />
      <StickyCard zIndex={2}><MenuSection /></StickyCard>
      <StorySection />
      <StickyCard zIndex={3}><CombosSection /></StickyCard>
      <StickyCard zIndex={4}><ThreePromises /></StickyCard>
      <StickyCard zIndex={5}><DipjoySection /></StickyCard>
      <StickyCard zIndex={6}><LocationSection /></StickyCard>
      <StickyCard zIndex={7}><OrderCTA /></StickyCard>
      <Footer />
    </div>
  )
}
