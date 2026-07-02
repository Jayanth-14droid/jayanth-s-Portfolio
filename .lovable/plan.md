# Portfolio Redesign — Parallax + Scroll-Driven Interactions

Keep all existing content (name, bio, skills, projects, experience, contact). Only change visual design, motion, and layout structure.

## Tech additions
- `lenis` — site-wide smooth scroll
- `gsap` + `ScrollTrigger` — scroll-linked timeline/pin/horizontal-scroll effects
- `framer-motion` (already present) — reveal animations, whileInView
- Existing `useMagneticEffect` reused for magnetic buttons
- Respect `prefers-reduced-motion` in a shared hook; mobile parallax dampened to ~40%

## Global shell
- New `SmoothScrollProvider` wraps Index using Lenis; syncs with GSAP ScrollTrigger
- New sticky `Navbar` — transparent over hero, shrinks + adds bg/blur past hero, scroll-spy highlights active section (IntersectionObserver)
- Brief intro logo/name reveal (LoadingScreen tweak) — skipped on repeat visits via `sessionStorage`

## Sections (content preserved, structure rebuilt)
1. **Hero** — 3 parallax layers (bg blobs, mid shapes, foreground text). Mouse-follow drift on bg layer (desktop). Staggered name/title reveal. Scroll indicator fades on first scroll.
2. **Hero→About crossfade** — pinned bg crossfade transition.
3. **About** — parallax profile image vs text. Count-up stats (years, projects, etc.) triggered on view.
4. **Skills** — categorized chips; staggered grow/fade-in on view; hover lift + shadow.
5. **Projects** — desktop: pinned horizontal-scroll gallery (ScrollTrigger). Mobile: vertical stack. Cards: 3D tilt (max 7°), scale + shadow on hover, clip-path reveal on images.
6. **Experience/Timeline** — vertical SVG line with `stroke-dashoffset` tied to scroll; entries fade+slide in alternating sides.
7. **Contact** — calm closing, slow gradient blobs, magnetic social icons, underline-draw links.

## Interactions
- Magnetic primary CTAs (reuse existing hook)
- Optional desktop custom cursor (small dot, scales over interactive elements) — behind a toggle since user previously removed cursor effects; will keep off by default and mention
- Lazy-loading `<img loading="lazy" />` below the fold
- Transform/opacity-only animations; `will-change` only on active parallax layers

## New files
- `src/components/SmoothScrollProvider.tsx`
- `src/components/Navbar.tsx`
- `src/components/CountUp.tsx`
- `src/components/TiltCard.tsx`
- `src/hooks/useReducedMotion.tsx`
- `src/hooks/useMouseParallax.tsx`
- `src/sections/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Projects.tsx`, `Experience.tsx`, `Contact.tsx`
- Refactored `src/pages/Index.tsx` to compose the sections

## Design tokens
- Keep current dark-first palette. Add gradient/blob tokens in `index.css`. Display font: keep Space Grotesk (already loaded, strong/modern); body: Space Grotesk regular. Generous section padding (`py-32`).

## Notes
- Existing companion/3D character stays removed per prior instruction.
- Existing resume + project data + profile image reused.
- All new colors go through semantic tokens.

Confirm and I'll build it.