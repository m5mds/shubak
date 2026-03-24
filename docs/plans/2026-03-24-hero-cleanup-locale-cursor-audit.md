# Hero Cleanup And Locale/Cursor Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the fragile desktop hero z-push/shatter sequence with a clean entrance, then run a diagnosis-only audit for locale toggle and cursor bugs.

**Architecture:** Keep the existing page structure, load sequence, hero-ready signal, mobile path, and reduced-motion path intact. Simplify the desktop hero to a single visible frame plus content entrance, then verify production behavior before performing a read-only audit of locale, ScrollTrigger, and cursor interactions.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis, Framer Motion, context-based i18n.

---

## Understanding Summary

- Task A is a targeted simplification of the desktop-only hero animation path in `components/sections/HeroZpush.tsx`.
- The landing frame, shatter panes, z-axis push, speed lines, pinning, and perspective-only wrappers are being removed entirely.
- The page-load sequence, hero-ready signal, hero content, scroll indicator, mobile behavior, and reduced-motion behavior must remain intact.
- The replacement desktop behavior is a plain `gsap.fromTo` entrance on the hero container followed by a non-pinned scroll-linked fade/blur.
- The hero frame should remain visibly present after the load sequence, but without pane overlays or shatter mechanics.
- Task B is diagnostic only: find and report the locale-toggle and cursor issues without changing their behavior.
- Verification is mandatory between Task A and Task B.

## Assumptions

- The existing reusable [`WindowFrame`](c:/Users/LENOVO/.antigravity/shubak/components/ui/WindowFrame.tsx) can be reused or lightly wrapped for the stable hero frame.
- There is no Git repository initialized at `c:\Users\LENOVO\.antigravity\shubak`, so requested commit messages may need to be reported instead of executed unless a repo is found elsewhere.
- The browser/manual audit for Task B can be performed locally after the build/start verification succeeds.
- The hero-ready signal must still fire only after the desktop entrance animation completes, while mobile/reduced-motion can keep firing immediately after their simpler entrance logic.

## Decision Log

- Decision: Remove the desktop hero choreography rather than continue patching it.
  Alternatives considered: Patch individual GSAP tweens or hide broken layers conditionally.
  Why: The user explicitly wants the z-push/shatter path removed because repeated fixes have not stabilized it.

- Decision: Keep the page-load sequence and hero-ready signaling contract unchanged.
  Alternatives considered: Fire readiness as soon as the section mounts or move readiness into the services section.
  Why: The services section already depends on the current signal contract.

- Decision: Treat locale and cursor work as audit-only in this pass.
  Alternatives considered: Fix obvious issues during the audit.
  Why: The user explicitly requested findings only for Task B.

### Task 1: Desktop Hero Cleanup

**Files:**
- Modify: `components/sections/HeroZpush.tsx`
- Modify or replace: `components/sections/hero/ShatterableWindowFrame.tsx`
- Reference: `components/ui/WindowFrame.tsx`
- Reference only: `components/sections/hero/SpeedLines.tsx`

**Step 1: Simplify the frame strategy**

- Decide whether to:
  - reuse `WindowFrame` directly in the hero, or
  - convert `ShatterableWindowFrame` into a simple hero frame wrapper with no pane overlays.
- Preserve the same rounded border, title bar, and dot placement behavior.

**Step 2: Remove desktop-only obsolete animation state**

- Delete the `landingFrameRef` ref and all GSAP/ScrollTrigger setup that targets it.
- Delete pane tweens, speed-line tweens, landing titlebar/dot tweens, and z-axis hero tweens.
- Delete `pin: true`, perspective wrappers, and `preserve-3d` classes that only existed for z-depth animation.
- Remove unused imports and desktop-only element selectors that no longer exist.

**Step 3: Add the clean desktop entrance**

- After `loadComplete`, run:
  - a single `gsap.fromTo(heroSceneRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: signalHeroReady })`
  - a single `gsap.to(heroSceneRef.current, { opacity: 0, y: -60, filter: 'blur(4px)', ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 } })`
- Keep mobile and reduced-motion branches unchanged unless required for selector cleanup.

**Step 4: Simplify JSX**

- Keep:
  - `PageLoadSequence`
  - `section` container
  - `heroSceneRef`
  - stable frame wrapper
  - `HeroContent`
  - `ScrollIndicator`
- Remove:
  - `SpeedLines`
  - landing frame markup
  - 3D wrapper structure

### Task 2: Task A Verification

**Files:**
- Verify: `components/sections/HeroZpush.tsx`

**Step 1: Build**

- Run: `npm run build`
- Expected: Next.js production build succeeds.

**Step 2: Route smoke test**

- Start the production server.
- Verify `/` returns `200`.
- Verify `/contact` returns `200`.
- Verify `/services/web-mobile` returns `200`.

**Step 3: Code search**

- Confirm `HeroZpush.tsx` no longer contains:
  - `landingFrame`
  - `pane-tl`
  - `pane-tr`
  - `pane-bl`
  - `pane-br`
  - `speed-line`
  - `SpeedLines`
  - `landing-titlebar`
  - `landing-dot`
- Confirm `HeroZpush.tsx` still contains:
  - `shubak:hero-ready`
  - `shubakHeroReady`

**Step 4: Browser check**

- Confirm page-load sequence still runs.
- Confirm hero appears inside a clean frame.
- Confirm scroll fades/blurs the hero naturally with no pin gap.
- Confirm services appear directly after the hero and still activate correctly.

### Task 3: Locale Toggle Audit

**Files:**
- Inspect: `lib/i18n/context.tsx`
- Inspect: GSAP-bearing components found by search
- Inspect: layout and section components for directional CSS

**Step 1: Trace locale switching**

- Record where `setLocale` is called.
- Record whether `lang` and `dir` on `<html>` update directly.
- Record whether toggling causes a context rerender, layout remount, or both.

**Step 2: Audit GSAP lifecycle**

- For each GSAP component, record:
  - dependency array inputs
  - whether locale/dir changes recreate the animation
  - whether cleanup is explicit or delegated to `useGSAP`
  - whether a `ScrollTrigger.refresh()` occurs after layout changes

**Step 3: Audit direction-sensitive values**

- Record where `isRTL`, `dir`, `x`, or `xPercent` affect animation direction or layout.
- Flag cases where values may be captured at mount but not recalculated after locale changes.

**Step 4: Audit directional CSS**

- Search for hardcoded left/right and margin/padding directional classes.
- Report any non-logical properties that could break under RTL/LTR switching.

### Task 4: Cursor Audit

**Files:**
- Inspect: `components/ui/CustomCursor.tsx`
- Inspect: `components/providers/SmoothScrollProvider.tsx`
- Inspect: `app/layout.tsx`

**Step 1: Trace cursor mechanics**

- Record event source (`mousemove`, motion values, springs).
- Record positioning mode (`fixed` or `absolute`).
- Record whether the cursor performs any RTL-aware coordinate math.

**Step 2: Check Lenis interaction**

- Determine whether the cursor is mounted inside or outside the Lenis-wrapped subtree.
- Determine whether Lenis transforms could affect the cursor’s coordinate space.

**Step 3: Check ancestor transform risks**

- Search layout/provider ancestors for transforms or `will-change` declarations that could break fixed positioning.

### Task 5: Diagnostic Output

**Step 1: Produce the required report sections**

- `## Locale Toggle Findings`
- `## Cursor Findings`
- `## Recommended Fix Order`

**Step 2: Do not implement any Task B fixes**

- Restrict Task B output to findings, likely root causes, and recommended order only.
