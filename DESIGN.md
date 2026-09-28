---
# gstack: design-md-format=spec
name: Field Guide
description: An honest field guide to San Blas — jungle green and warm paper, mango and hibiscus as the only two spot colors, editorial type that earns authority through specificity instead of spectacle.
colors:
  jungle: "#1F3D2B"        # structural dark: primary buttons, dark cards, headers on dark
  paper: "#FBF3E4"         # page background, warm cream
  surface: "#FFFDF8"       # cards, raised panels — barely lighter than paper
  ink: "#221F1A"            # body text, near-black warm
  ink-on-jungle: "#FBF3E4"  # text on jungle backgrounds — reuses paper
  text-muted: "#7A6F5C"
  accent: "#E8963A"          # mango — primary accent: links, CTAs, hero figures
  accent-deep: "#C67826"     # mango, darker — hover/active states, small text on paper
  accent-secondary: "#D6577A" # hibiscus — sparing use: editorial callouts, tags, never primary CTA
  success: "#3F7D45"
  warning: "#C08A1E"
  error: "#B4453A"
  border: "rgba(31,61,43,0.16)"
typography:
  display:
    fontFamily: "Instrument Serif"
    fontWeight: 400
    fontSize: "clamp(2.4rem, 5vw, 4.4rem)"
    letterSpacing: "0em"
  body:
    fontFamily: "Source Sans 3"
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3"
    fontSize: 0.72rem
    letterSpacing: 0.1em
  mono: null
rounded:
  sm: 4px
  md: 8px
  lg: 10px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.jungle}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
  button-primary-hover:
    backgroundColor: "#16301F"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
  legend-panel:
    borderColor: "{colors.jungle}"
    borderStyle: dashed
    rounded: "{rounded.md}"
  blockquote:
    borderColor: "{colors.accent}"
    fontFamily: "{typography.display.fontFamily}"
  tag-secondary:
    backgroundColor: "{colors.accent-secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
  input:
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
  nav-link:
    textColor: "{colors.accent-deep}"
---

# Field Guide

## Overview

**Creative North Star:** An illustrated field guide, not a sales brochure — the
reader trusts this site because it tells them what's true, including when the
truth doesn't sell (no scuba diving here, and we say so before they fly).

**Product context:** sanblastourspanama.com, an English-first travel guide and
booking site for San Blas archipelago tours in Panama (Guna Yala). One of
three sister sites under the same business: sanblasfull.com sells the fast
day-trip ("pasadía", English-led), sanblastourspty.com sells the archipelago
adventure catalogue (Spanish-led, "Mola & Laguna" identity). This site is the
**guide/authority**: research, comparison, island-by-island detail, custom
trip planning — 391 pages across 5 languages (10 tours, ~60 islands, 11
bespoke packages quoted by WhatsApp, ~70 guides, ~90 blog posts).

**Mode per surface:**
- Island/tour/guide detail pages: **Read** — long-form, asymmetric editorial
  grid, a sticky "legend" panel carries facts a reader scans without reading
  the prose.
- Tour comparison / prices: **Operate** — grid-disciplined cards, scannable,
  price and duration lead.
- Booking widget container, contact form: **Operate** — plain, no decoration;
  the embedded `<sanblas-reserva>` component keeps its own functional styling,
  only its container takes this system's card treatment.
- Homepage hero: **Persuade**, briefly — one promise, one real fact, straight
  into the guide.

**Reference sites** (visual research, 28/09/2026): newzealand.com,
australia.com — official destination-authority sites; strong photography
budget is their trust signal, which this product cannot match and should not
imitate. afar.com — editorial travel magazine; the closest match to what this
site already does well in writing: type-led authority, restraint, real
specificity over spectacle. archipelagochoice.com — same product shape
(bespoke island trips + guide content), visually the weakest of the four
(generic sans, dated tour-operator look) — a concrete example of the look this
system avoids even though the product is close.

**Key characteristics:**
- Warm and alive, not glossy — color comes from the real place (jungle,
  mango, hibiscus), not from a generic "beach vacation" blue.
- Green as the anchor, not blue or teal — neither sister site uses green as a
  primary color (full = sky blue, pty = coral + turquoise), so this is
  unclaimed territory, and it's true to the product: San Blas is jungle-fringed
  islands, not only open water.
- One weight of one serif, large: hierarchy comes from size, not from weight
  or from a second display face.
- A sticky "map legend" panel (dashed jungle border) on long-form pages —
  cartographic wayfinding, not a sidebar ad.

## Colors

**Strategy:** Full palette, but disciplined — two structural neutrals (jungle,
paper), one workhorse accent (mango) that carries every primary CTA and link,
and one secondary accent (hibiscus) reserved for editorial callouts and small
tags, never a primary action. Adding a second saturated color without a rule
for when each one fires is how a "full palette" becomes visual noise; the rule
here is role, not mood — mango moves the reader forward, hibiscus flags "read
this, it's a genuine distinction" (e.g. "these two islands are often
confused").

**Light or dark:** Content-reading site, used at any hour, browser/OS
preference respected — both themes are full citizens, not an afterthought.
Dark mode keeps jungle green as the anchor (it lightens to `#3E6B4C` for
sufficient contrast on a near-black paper `#12190F`) rather than inverting to
generic gray-on-black.

Neutrals (`ink`, `text-muted`, `border`) are all derived by desaturating
toward jungle, not toward true gray — a pure gray reads as unconsidered next
to a green-anchored palette. Interactive elements are signaled by `accent`
(mango) alone; `accent-secondary` (hibiscus) never appears on a clickable
primary action, only as a label/tag, so its presence always means "editorial
note," never "click here."

## Typography

**Instrument Serif** (display) — one weight, one style pairing (regular +
italic for pull-quotes/emphasis). Verified on Google Fonts, OFL license,
28/09/2026. Chosen because size alone carries its hierarchy — a hero H1 at
`clamp(2.4rem, 5vw, 4.4rem)` next to an H3 at `2.6rem` reads as a real scale,
not a weight bump. Italic is reserved for pull-quotes and genuine emphasis,
never for reaching at "editorial credibility" on body text.

**Source Sans 3** (body, label, UI) — 8 weights, Google Fonts, OFL license,
verified 28/09/2026. Carries all long-form reading (islands, guides, blog),
all UI chrome (buttons, forms, nav), and — uppercase, tracked at `0.1em`,
600 weight — the label role: map-legend headers ("Best for", "How to get
there"), section eyebrows, tags.

No third face, no mono. This is a two-family system on purpose, down from the
four families (Plus Jakarta Sans, Inter, Fredoka, Caveat) the site carried
before this redesign.

## Layout

Creative-editorial, not the single `max-w-3xl` column every page shared
before this system. Two concrete patterns:

1. **Long-form detail** (island / tour / guide): asymmetric two-column —
   a wide reading column plus a narrower sticky "legend" panel (dashed jungle
   border, `top: 78px` under the sticky topbar) carrying scannable facts.
   Collapses to a single column under 860px, legend becomes static.
2. **Comparison/listing** (tours, prices): grid-disciplined, 3-column card
   grid, strict alignment — the deliberate contrast to pattern 1, because
   comparison and reading are different tasks and should not share one grid.

8px base spacing unit, generous by editorial-magazine standard (large section
padding, `48-64px` between sections) — density comes from typography and
color, not from cramming.

## Elevation & Depth

Soft, low shadows only (`0 1px 2px` + `0 8px 24px`, tinted toward jungle, not
pure black) on cards and the sticky legend panel. No glow, no zero-offset
halo. Most surfaces are flat — depth is reserved for the few elements that are
genuinely raised (cards, the legend panel), not applied everywhere by default.

## Shapes

Small radius throughout (`sm: 4px` buttons/inputs, `md: 8px` cards, `lg: 10px`
the legend panel and hero side-card) — editorial restraint, not the bubbly
uniform-radius look. `full` (pill) reserved for the theme toggle and the
hibiscus tag, where a pill signals "small utility control," not decoration.

## Components

- **button-primary**: jungle background, paper text. Hover darkens jungle
  (`#16301F`), never switches to a gradient.
- **button-ghost**: transparent, ink text, border-only — the secondary action
  everywhere a primary button is present.
- **card**: surface background, hairline border, soft shadow. Never nested
  inside another card.
- **legend-panel**: dashed jungle border (the one deliberately "hand-annotated
  map" gesture in the system), sticky on desktop, static on mobile.
- **blockquote**: display serif italic, mango left rule — an editorial
  pull-quote convention (see afar.com), not a status/card side-tab; never used
  on a card, only on quoted text.
- **tag-secondary**: hibiscus pill, white text — flags a genuine editorial
  distinction inline (e.g. "often confused with X"), never a primary CTA.

## Do's and Don'ts

- Do: let Instrument Serif's size do the hierarchy work; never add a second
  display face to "fix" a heading that looks too plain.
- Do: keep hibiscus rare — if more than one element per screen uses it, it has
  stopped meaning "genuine distinction."
- Do: write the sticky legend panel's facts from real content (tour/island
  data), never invented filler to fill the panel.
- Don't: reach for sky-blue or turquoise anywhere in this system — that is
  sanblasfull's and sanblastourspty's territory respectively; green is what
  keeps this site visually distinct from both.
- Don't: add icons-in-colored-circles, a 3-column feature grid, or a
  testimonial row with star ratings — this product's trust signal is written
  specificity, not badge/social-proof decoration.
- Don't: let the mango accent become a gradient button. One solid mango,
  everywhere.

## Motion

- **Approach:** minimal-functional — this is a reading-heavy site; motion
  should help comprehension (section fade-in on scroll, smooth anchor
  scrolling), never choreography.
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms)
- **The one authored moment:** the theme toggle — a quiet crossfade between
  light and dark tokens (`transition: background .25s ease, color .25s ease`
  on `body`), nothing else animates on theme switch.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-28 | Initial design system created | `/design-consultation`, based on real visual research (4 reference sites) and the owner's decision that pana leads in English as guide/authority, distinct from both sister identities |
| 2026-09-28 | First direction (near-monochrome ink/paper, restrained) rejected | Owner: "muy sobria / fría, falta color y vida" — revised to full warm palette (jungle/mango/hibiscus) keeping the same guide concept and typography |
