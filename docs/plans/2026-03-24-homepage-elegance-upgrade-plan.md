# Homepage Elegance Upgrade Plan

Date: 2026-03-24
Project: Shubak marketing site
Prepared by: Codex

## Workflow Frame

This plan follows the intent of:

- `workflows/uifeature.md`: define interaction states, motion, accessibility, and implementation boundaries before touching UI code
- `workflows/flagshipfeature.md`: treat the homepage as a flagship surface, pause for approval at the design checkpoint, and gate implementation with verification

Skills used for this planning pass:

- `brainstorming`
- `frontend-design`
- `wcag-audit-patterns`
- `plan-writing`

## Findings First

### 1. The CTA is visually unstable, not confidently designed

The current CTA section is the weakest interaction on the page. It scales the content down while a separate frame and title bar fade in over it. That creates a "collapsing into a shell" effect instead of a deliberate premium reveal.

Current issues in `components/cta-section.tsx`:

- The frame and content animate as separate layers instead of one composed surface.
- The main motion is `scale: 1 -> 0.75`, which reads as shrinkage rather than resolution.
- The animation uses a global `.cta-dot` selector instead of ref-scoped elements.
- The button label is an email address, not a high-confidence action.
- The section closes the page without enough trust, availability, or momentum.

### 2. Services has scroll drama, but not hover intelligence

`components/sections/services/ServicesHorizontalScroll.tsx` creates a strong pinned-scroll moment, but `components/sections/services/ServicePanel.tsx` is mostly static once a card is in view.

Compared with current benchmark patterns on [Antimatter AI](https://www.antimatterai.com/), the missing layer is not more animation volume. It is active-state clarity:

- no hover spotlight or surface response
- no sibling dimming or active-card emphasis
- no focus-visible equivalent to hover behavior
- no progressive reveal of supporting detail when a card becomes active

### 3. Motion language is fragmented across the homepage

The homepage already contains multiple animation systems:

- GSAP hero entrance and scroll fade
- GSAP pinned services scroll
- Framer Motion `FadeUp`
- Framer Motion word-reveal in About
- Framer Motion timeline growth in Process

Each section works on its own, but they do not yet feel like one design language. Premium sites like [Resend](https://resend.com/) and [Linear](https://linear.app/) are quieter and more consistent: fewer motion ideas, reused with discipline.

### 4. Section transitions are too abrupt

The page moves from section to section with hard cuts. The user asked for more fade effects, and that is directionally right, but the right solution is not "animate everything more." The right solution is a shared section-to-section fade system:

- edge fades between major surfaces
- consistent reveal timing for headings and framed content
- atmospheric depth without adding heavy blur everywhere

### 5. The closing narrative is underpowered for enterprise positioning

The site looks premium, but the final third of the page still behaves like a tasteful portfolio. It does not yet close like an enterprise studio homepage:

- CTA copy is too thin
- no confidence markers near the CTA
- no trust bridge between process and contact
- no final "why now / why us / what happens next" clarity

## Target State

The homepage should feel:

- composed, not animated for its own sake
- interactive, but never noisy
- confident in desktop hover behavior and fully usable from keyboard and touch
- visually continuous from hero to CTA
- closer to "system quality" than "landing page styling"

## Implementation Plan

### Phase 1: Build a Shared Motion Foundation

Goal: replace section-by-section motion improvisation with a small reusable system.

Actions:

- Create a shared reveal primitive for section headers and content surfaces.
- Standardize motion tokens in CSS or a small motion config:
  - duration
  - easing
  - blur amount
  - vertical offset
  - viewport trigger margin
- Keep GSAP only for the interactions that truly need it:
  - hero scene
  - pinned services scroll
- Move simple fades and entrance reveals to Framer Motion or CSS-backed motion primitives.
- Extend reduced-motion handling so every new effect has a graceful no-motion path.

Suggested additions:

- `components/motion/SectionReveal.tsx`
- `components/motion/SurfaceReveal.tsx`
- `lib/motion.ts` or CSS custom properties in `app/globals.css`

Acceptance criteria:

- Hero, services heading, about header, process header, and CTA all share the same reveal grammar.
- No section relies on ad hoc motion values when a shared primitive would work.
- Reduced motion produces a stable, elegant layout with no hidden content.

### Phase 2: Rebuild the CTA as a Premium Closing Surface

Goal: turn the CTA from a fragile animation into the page's cleanest section.

Actions:

- Replace the current dual-layer "content shrinks while frame fades in" structure with a single composed surface.
- Animate the CTA in a way that resolves forward, not inward:
  - subtle fade
  - slight lift or settle
  - optional border/intensity ramp
  - no aggressive scale-down
- Scope all animated elements through refs instead of global selectors.
- Add `revertOnUpdate` and cleanup guarantees if GSAP remains in use.
- Upgrade CTA content hierarchy:
  - action-led button label
  - support copy describing what happens next
  - optional secondary action such as opening the contact page
  - quiet trust line such as response time or project-fit note
- Keep the visual language aligned with `WindowFrame`, but make the CTA feel like the strongest version of that motif.

Suggested file targets:

- `components/cta-section.tsx`
- `components/ui/WindowFrame.tsx`
- `lib/i18n/en.ts`
- `lib/i18n/ar.ts`

Acceptance criteria:

- The CTA reads as intentional on first scroll, not glitchy.
- Locale changes do not leave stale CTA animation state behind.
- Keyboard focus and reduced-motion paths remain polished.
- The primary action is legible as a real CTA, not just an email label.

### Phase 3: Add Enterprise-Grade Hover Behavior to Services

Goal: give the services section the active-state sophistication it is currently missing.

Actions:

- Add a desktop hover/focus treatment to each service panel:
  - subtle lift or tilt-free elevation
  - border glow or line-intensity ramp
  - radial spotlight that follows pointer position
  - title/description emphasis on active card
- Dim non-active sibling panels slightly so the hovered card becomes the reading target.
- Reveal supporting detail progressively:
  - service bullets
  - tools
  - numeric marker
- Ensure keyboard users get the same active treatment via `:focus-visible` or controlled active state.
- Keep mobile behavior simpler:
  - no pointer-tracking
  - preserve readability and scroll performance

Suggested file targets:

- `components/sections/services/ServicePanel.tsx`
- `components/sections/services/ServicesHorizontalScroll.tsx`
- `app/globals.css`

Acceptance criteria:

- Services feels alive even when the user is not scrolling.
- Hover improves clarity instead of adding noise.
- The active card state is obvious with mouse, keyboard, and touch fallbacks.
- No hover-only information becomes inaccessible.

### Phase 4: Add Section Fade and Atmosphere Across the Rest of the Homepage

Goal: soften section boundaries and make the page feel more continuous.

Actions:

- Add reusable top/bottom fade overlays or mask transitions between:
  - hero -> services
  - services -> about
  - about -> process
  - process -> CTA
- Introduce a restrained background-atmosphere layer:
  - edge gradients
  - depth vignettes
  - low-contrast glow where appropriate
- Apply reveal timing to the services heading, CTA body, and any major framed surfaces that currently pop in too abruptly.
- Review About and Process so their motion matches the new shared system rather than feeling like separate experiments.

Suggested file targets:

- `app/page.tsx`
- `components/about-section.tsx`
- `components/sections/ProcessSection.tsx`
- `components/sections/services/ServicesHorizontalScroll.tsx`
- `components/cta-section.tsx`
- `app/globals.css`

Acceptance criteria:

- The page no longer feels like stacked blocks.
- Fades are visible enough to add continuity, but subtle enough to avoid looking theatrical.
- Motion stays performant on mid-range devices.

### Phase 5: Improve the Enterprise Story at the Bottom of the Page

Goal: make the last impression stronger than the first impression.

Actions:

- Strengthen CTA copy so it answers:
  - why contact now
  - what Shubak is best suited for
  - what happens after outreach
- Add a lightweight trust bridge before or inside the CTA:
  - selected capabilities
  - response expectation
  - geography / availability / delivery model
- Consider a slim proof strip between Process and CTA:
  - selected work
  - sectors
  - operating principles
- Revisit spacing rhythm so the lower half of the homepage carries the same confidence as the hero.

Acceptance criteria:

- The CTA section closes with confidence and specificity.
- The final screen feels enterprise-ready, not generic.
- The user understands both the value and the next step.

## Recommended Build Order

1. Phase 1: shared motion foundation
2. Phase 2: CTA rebuild
3. Phase 3: services hover system
4. Phase 4: section fade continuity
5. Phase 5: CTA narrative and proof polish

## Checkpoints

To stay aligned with `workflows/flagshipfeature.md`, implementation should pause at these checkpoints:

1. Approve motion direction and CTA design approach before code changes.
2. Review implementation after CTA + services hover land, before broader polish.
3. Run final polish and accessibility verification before calling the homepage done.

## Verification Plan

Required after implementation:

- `npm.cmd run lint`
- `npm.cmd run build`
- Desktop browser pass:
  - hero -> services transition
  - services hover behavior
  - CTA entrance and hover/focus behavior
- Mobile browser pass:
  - services stacked layout
  - CTA readability and tap targets
- Locale pass:
  - switch Arabic <-> English without reload
  - verify no broken layout or stale animation state
- Accessibility pass:
  - keyboard navigation through services and CTA
  - `prefers-reduced-motion`
  - contrast and focus visibility

## Non-Goals

- No design-system rewrite in this pass.
- No full homepage restructuring beyond what supports the CTA and lower-page polish.
- No decorative effects that materially hurt performance or readability.

## Success Metric

This effort is successful when the homepage feels like one deliberate system:

- the CTA no longer looks bugged
- services rewards hover and focus with clear active-state feedback
- the rest of the page fades and resolves with consistency
- the final impression feels closer to Antimatter, Resend, and Linear in discipline, not imitation
