# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: delivery customers.** Most orders arrive through GrabFood, GoFood, and ShopeeFood — food reaches people at home or at work, and they never see the shop. The app listing, not the website, is where most purchase decisions happen.

**Secondary: walk-in and takeaway** at the two kitchens, plus direct orders over WhatsApp.

**A distinct third reader: the person eating.** Printed takeaway boxes carry a QR code. They scan it mid-meal, one-handed, on a phone, often on weak mobile data. They are already a customer — the job is trust, not conversion.

## Product Purpose

Ayamtenns sells Nashville hot chicken, operating since 2020 out of BSD City, Tangerang. Success is repeat orders on the delivery apps and enough credibility that the sourcing story survives scrutiny.

## Positioning

The chicken comes from a single integrated, NKV-certified farm — one supplier since day one, not a mix of market suppliers — and the certification numbers are published for anyone to verify against the government register.

The mechanism a competitor cannot casually copy is not the sourcing itself but the willingness to print the registration numbers and invite the check.

## Operating Context

- Ordering: GrabFood, GoFood, ShopeeFood (primary), WhatsApp, walk-in.
- Hours: 11:00–20:00 WIB, daily.
- Two kitchens: BSD and Gading Serpong. The website currently publishes only one address — Ruko Avenix 92 Blok C.16, Sampora, Cisauk, Tangerang, Banten — so the second location is undocumented on the site.
- Printed QR on takeaway packaging encodes `AYAMTENNS.COM/BOX`, which redirects to `/story`. Thousands of boxes are already printed.
- `/marketing` is an internal AI marketing dashboard (drafts, Instagram insights, publishing). It is meant to be private and is currently reachable publicly without authentication, together with `/api/drafts`.

## Capabilities and Constraints

- Menu: Nashville Box (4 flavours), Sando (3), Tenders, T-Nuggets, Ayam Pops, Combos.
- **Meltdown is a cheese-seasoning flavour, not the hottest item.** Its descriptions on both the Box and the Sando are placeholders awaiting real copy.
- Dipjoy: 5 house sauces. Smokin' Sauce was discontinued.
- Heat levels: Lvl 0 No Spicy, Lvl 1 Mild, Lvl 2 Medium are live. **Lvl 3 Hot and Lvl 4 X-Hot are planned but do not exist in the kitchen and must not be shown.**
- Reheating: oven at 170°C for 5–7 minutes is tested, for the chicken alone. Air fryer figures are a general reference, not tested. The full Nashville Box set (rice + egg + chicken) is untested.
- The `/box` route, in every capitalisation, must keep redirecting to `/story`. Removing it sends printed packaging to a 404.
- Undecided and not to be invented: Meltdown copy, air fryer and full-set reheat numbers, the second outlet's address on the site.

## Brand Commitments

- Name: Ayamtenns. Tagline: **"Raised right. Fried hot."** ("Your daily craving" is retired.)
- Voice: blunt and plain. States a standard rather than asking for credit for what it cost — "Kebanyakan tempat ayam goreng memakai ayam kelas foodservice. Kami tidak." Never inflates.
- **Never name the supplier's brand or company publicly.** Refer to it as "peternakan bersertifikat NKV".
- Never fabricate facts, figures, statistics, or testimonials. Anything untested carries a visible placeholder instead of a guess.
- Identity: red `#D91C1C`, ink `#0E0E0E` (`#1A1A1A` on `/story`), white. Brutalist editorial — no rounded corners, gradients, shadows, or generic icons.
- Type: Archivo Black (headings), Inter Tight (body), JetBrains Mono (labels).
- Logo mark: `public/images/ayam.svg` (chicken). Favicon is that mark, red on transparent — chosen by the owner over a wordmark letterform.
- Channels: Instagram `@ayamtenns`, WhatsApp `628111779957`.

## Evidence on Hand

- **Verifiable registrations:** NKV RPHU `3604120-008`, Registrasi Produk Hewan `PHD360404052400280`, checkable at the Ditjen PKH register (`simpol.ditjenpkh.pertanian.go.id`).
- Certifications displayed: NKV, Halal, HACCP.
- **Own photography:** `public/images/photoshoot/` — 4K+ food and interior shots, owned.
- **Third-party photography:** `public/images/farm/` — five farm photos taken from the supplier's website, 555×300, copyright not held by Ayamtenns and permission unconfirmed. Currently unused.
- **Missing:** `public/story/chicken.jpg`, the `/story` hero photo, has not been supplied.
- **Absences future work must not paper over:** there is no laboratory test of Ayamtenns' own meat. The antibiotic-free and prebiotic/probiotic claims rest solely on the supplier's retail packaging, not on independent testing, and the site says so explicitly.

## Product Principles

1. **Verifiable beats persuasive.** Publish numbers people can check, and invite the check.
2. **State the standard, not the sacrifice.** Never ask the customer for credit for what quality cost.
3. **Untested stays visibly untested.** A placeholder is honest; an invented number is not.
4. **The supplier stays unnamed.** Their certification is the proof, not their brand.
5. **The QR surface is read on a phone, mid-meal, on weak signal.** If something has to give, it is the animation, never the speed.

## Accessibility & Inclusion

Mobile-first, usable one-handed while eating. `/story` respects `prefers-reduced-motion` and keeps content readable when JavaScript fails. No formal WCAG conformance level has been set as a requirement yet.
