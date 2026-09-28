---
# gstack: design-md-format=spec
name: Deep Water
description: A cinematic, maximalist experience — pure black depth, acid-green and hot-magenta energy, monster type in Unbounded and Petrona, driven by GSAP and Lenis. Impact over restraint.
colors:
  base: "#0A0A0A"            # pure deep dark — the canvas
  surface: "#151515"          # raised panels, cards — barely lighter than base
  surface-raised: "#1E1E1E"   # hover/active surface state
  text: "#F2F0EA"             # warm near-white, not stark #FFF
  text-muted: "#8A8A85"
  accent: "#C8FF3D"            # acid green — primary: links, CTAs, cursor glow, the signature color
  accent-deep: "#9FCC26"       # acid green, pressed/active state
  accent-secondary: "#FF3D8A"  # hot magenta — tension color, used sparingly for contrast moments
  success: "#4ADE80"
  warning: "#FBBF24"
  error: "#FF3D5A"
  border: "rgba(242,240,234,0.10)"
typography:
  display:
    fontFamily: "Unbounded"
    fontWeight: 800
    fontSize: "clamp(3.5rem, 15vw, 13rem)"
    letterSpacing: "-0.02em"
  display-serif:
    fontFamily: "Petrona"
    fontWeight: 500
    fontSize: "clamp(2rem, 6vw, 5rem)"
    letterSpacing: "0em"
  body:
    fontFamily: "Unbounded"
    fontWeight: 400
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: "Unbounded"
    fontSize: 0.75rem
    letterSpacing: 0.12em
  mono: null
rounded:
  sm: 2px
  md: 6px
  lg: 0px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 64px
  xl: 96px
  2xl: 160px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.base}"
    rounded: "{rounded.full}"
  button-primary-hover:
    backgroundColor: "{colors.text}"
  cursor-dot:
    backgroundColor: "{colors.accent}"
    mixBlendMode: difference
  reveal-mask:
    overflow: hidden
    transform-origin: bottom
  panel:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
---

# Deep Water

## Overview

**Creative North Star:** Impact first, information second — the visitor's
first three seconds should feel like the site itself is alive: huge kinetic
type, a fluid scroll, an accent color that reacts to the cursor.

**Product context:** sanblastourspanama.com, San Blas archipelago tours,
Panama. Superseding **Field Guide** (see Decisions Log) at the owner's
explicit instruction: this is now a full visual-impact experience across the
site's 391 pages, not an editorial guide.

**Mode per surface:** Experience, deliberately, on every surface — including
the long-form guide/blog pages that were previously Read-mode. Motion and
scale are now the primary tools everywhere.

**Key characteristics:**
- Pure black canvas (`#0A0A0A`), never a lighter "dark gray" dark mode.
- One neon accent (acid green) does almost everything; hot magenta is a rare
  second voice for tension moments, not a competing primary.
- Type at extreme scale (`clamp(3.5rem, 15vw, 13rem)`) carries the page —
  Unbounded (geometric, huge, confident) paired with Petrona (serif, italic-
  capable) for the mandated serif/sans mix.
- Every scroll has friction (Lenis), every text block reveals through a
  clip-path mask, every primary interactive element has a magnetic hover.

## Colors

**Strategy:** Drenched, but disciplined to one dominant accent. Acid green
(`#C8FF3D`) is the signature — it is what makes this site instantly
recognizable in a screenshot. Hot magenta (`#FF3D8A`) exists only for the rare
moment that needs a second temperature (an alternate CTA state, a single
accent word inside a huge headline) — if it starts appearing as often as
green, the system has lost its signature.

**Light or dark:** Dark only, by design — this direction does not have a
light mode. `color-scheme: dark` is set globally; do not add a toggle.

Text is `#F2F0EA` (warm near-white), not pure `#FFFFFF` — full-white text at
this scale on pure black causes visible halation/glow on most screens, which
reads as a rendering bug, not intentional design.

## Typography

**Unbounded** (display + body + label) — 8 weights, Google Fonts, OFL
license, verified 28/09/2026. Its geometric, slightly unconventional forms
hold up at `15vw` without falling apart the way a humanist sans would; used at
weight 800 for hero type, 400 for body/UI.

**Petrona** (display-serif) — 9 weights with full italic range, Google Fonts,
OFL license, verified 28/09/2026. The serif half of the mandated mix — used in
italic for the one line inside a hero that needs a different texture from the
huge Unbounded headline around it, and for pull-quote-style moments.

Two families, both freshly verified, neither shared with either sister site
nor with this project's own prior system (Instrument Serif / Source Sans 3).

## Layout

Grid-breaking, asymmetric, generous negative space (`spacing.xl`/`2xl` between
major sections — `96-160px`). Overlap and z-index are deliberate tools:
headline type may overlap a photograph, a label may sit outside its section's
normal flow. No 3-column feature grid, no centered-everything.

## Elevation & Depth

Minimal use of shadow in the literal sense — depth here comes from z-index
overlap, parallax offset, and the accent glow around interactive elements
(`box-shadow: 0 0 40px -10px var(--accent)` on hover, not a default state), not
from card drop-shadows.

## Shapes

Mostly sharp (`rounded.lg: 0px`) — this is not a rounded-card system. The one
exception is `rounded.full` on pill-shaped buttons and the custom cursor dot,
where a circle is the honest shape for that element, not decoration.

## Components

- **button-primary**: acid-green pill, base-black text. Hover inverts to
  warm-white background — never a gradient.
- **cursor-dot**: a small accent-colored dot that follows the pointer with
  a slight lag, `mix-blend-mode: difference` so it stays visible over both
  light and dark imagery; scales up over interactive elements ("magnetic").
- **reveal-mask**: `overflow: hidden` wrapper with a `translateY` inner
  element — the mechanism behind every text reveal.
- **panel**: sharp-cornered, near-black surface, hairline border — used
  sparingly; most of the page is type and image, not boxed content.

## Do's and Don'ts

- Do: let type size do the talking — `15vw` headlines are not hierarchy
  decoration, they are the content.
- Do: keep the acid-green accent singular in purpose (interaction + brand
  signature); if it starts decorating static text, it has become wallpaper.
- Do: respect `prefers-reduced-motion` — disable Lenis smoothing, cut GSAP
  durations to near-zero, and skip parallax offsets entirely for users who
  request it. Non-negotiable even in a motion-forward system.
- Don't: add a second accent hue beyond magenta — a third color turns
  "drenched but disciplined" into noise.
- Don't: round every corner — sharpness is part of this system's identity.
- Don't: let this system's weight (GSAP + Lenis + custom cursor script) load
  on a page where it never gets used — scope the scripts per page.

## Motion

- **Approach:** expressive — full choreography is the point of this system.
- **Easing:** `power4.out` for reveals/entrances, `power2.inOut` for
  scroll-linked movement, never a linear ease on anything the eye tracks.
- **Duration:** reveal(700-1000ms) micro-hover(150-250ms) page-transition(600-
  900ms)
- **The one authored moment:** the hero's text reveal on load — each line
  masked and animated up from `y: 100%` in a staggered `power4.out` sequence,
  the first thing the visitor sees move.
- **Reduced motion:** `prefers-reduced-motion: reduce` — Lenis instantiated
  with `syncTouch: false` and near-zero `duration`, GSAP timelines set
  durations to `0.01`, parallax `y` transforms clamped to `0`. The experience
  degrades to instant, static, fully readable — never broken.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-28 | Initial design system created (**Field Guide**) | `/design-consultation`, real visual research, owner's guide/authority positioning |
| 2026-09-28 | First Field Guide direction (near-monochrome) rejected | Owner: "muy sobria / fría, falta color y vida" |
| 2026-09-28 | Field Guide revised and approved (jungle/mango/hibiscus) | Warmer full palette, same editorial concept |
| 2026-09-28 | **Field Guide superseded by Deep Water** | Owner's explicit instruction: full maximalist/Awwwards-style direction across all 391 pages, GSAP + Lenis, overriding the editorial-restraint rationale from earlier today. Confirmed in chat that this replaces the whole site, not a single page. Decision logged: `4fade112-1712-47d9-b834-7abecc1469a9`. |
