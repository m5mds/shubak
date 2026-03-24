# Enterprise Readiness Audit

Date: 2026-03-24
Project: Shubak marketing site
Reviewer: Codex

## Scope

This audit covered:

- App shell, routing, metadata, and provider boundaries
- Locale switching and RTL/LTR behavior
- Hero and services animation lifecycle
- Contact form and API endpoint
- Accessibility and interaction quality
- Comparative positioning against Antimatter AI, Resend, and Linear

## Verification Summary

Commands run:

- `npm.cmd run lint`
- `npm.cmd run build`
- Route smoke checks for `/`, `/contact`, `/services/web-mobile`, and `/icon.svg`
- Browser audit against a served production build on port `3100`

Browser findings confirmed:

- Locale toggle updates `lang`, `dir`, and `localStorage`
- Services horizontal-scroll cards remain visible after locale changes
- Favicon 404 is removed

## Fixed In This Pass

- Fixed the locale-switch regression in the services horizontal-scroll section by forcing GSAP context reversion and clearing stale transform/progress state.
- Removed shell-level `cursor-none` so the page does not temporarily lose a usable cursor before client hydration.
- Added a skip link and anchored `main` target for keyboard users.
- Added contact form `label` / `htmlFor` / `name` wiring and disabled spellcheck on the email field.
- Raised footer copyright contrast to clear the Lighthouse accessibility failure.
- Added `app/icon.svg` so the app no longer ships a missing favicon.
- Unified homepage service-card data behind `lib/services-data.ts` so the site no longer relies on duplicated service definitions for the homepage carousel.
- Added dialog semantics, Escape handling, basic focus trapping, backdrop close, and focus restoration to the mobile menu.
- Added shell-level `color-scheme: dark`, anchor scroll offsets, and touch interaction defaults.
- Tightened the locale context type by replacing `any` with `Dictionary`.

## Findings

### High

- Locale is still modeled as client-only runtime state. The app shell ships Arabic at SSR and flips to English later if `localStorage` says so. This avoids crashes, but it is not enterprise-grade internationalization. It blocks stable locale URLs, crawlers, analytics segmentation, and cache-friendly rendering.
- Contact delivery is still operationally thin. The endpoint validates shape and email format, but it lacks structured schema validation, rate limiting, anti-automation controls, and provider-level resilience strategy.
- The site still behaves like a polished landing page rather than an enterprise proof surface. It does not yet include strong trust sections such as case-study depth, security/process credibility, concrete delivery proof, or differentiated operating model detail.

### Medium

- The app shell remains heavily client-driven for the amount of content it serves. Locale context, custom cursor, Lenis, GSAP sections, and several major content sections all hydrate on the client. That creates unnecessary interaction and performance pressure for a marketing site.
- The mobile menu is now materially better, but it still does not expose the level of rigor found in mature design systems with reusable modal primitives and shared focus management utilities.
- Metadata is still bilingual and global rather than route-locale aware. It works, but it is not ideal for discoverability, share previews, or future localized expansion.
- The contact workflow still lacks a clear success/failure observability path. There is no analytics event, request correlation, or support fallback besides generic inline error copy.

### Low

- Some visual copy and site structure remain sparse compared with benchmark sites. The current narrative gets to the point quickly, but it does not build enough momentum or evidence before asking for a project start.
- Several components are still custom one-offs instead of reusable primitives with clearer ownership boundaries.

## Why It Still Falls Short Of Flagship Sites

### Resend

Resend wins on developer clarity. Its homepage immediately explains what the product is, who it is for, and why the interaction model is easy. Shubak has tasteful visuals, but it does not yet match that level of product clarity or trust-building specificity.

### Linear

Linear wins on system feel. Its site communicates speed, operational maturity, and confidence through information density, product evidence, and sharply controlled interactions. Shubak looks premium, but it still presents more atmosphere than proof.

### Antimatter AI

Antimatter AI wins on commercial breadth and service packaging. It turns capabilities into a larger perceived operating system: services, products, demos, case studies, and trust signals all reinforce one another. Shubak has good foundations but not enough layered proof.

## Recommended Roadmap

### Phase 1

- Move locale persistence from `localStorage`-only state to a cookie-backed or route-backed model.
- Split marketing shell concerns from interaction enhancements so the core page renders correctly without client-only orchestration.
- Add anti-abuse controls and structured validation to the contact flow.
- Standardize modal/dialog behavior across mobile navigation and future overlays.

### Phase 2

- Expand the homepage with proof-heavy sections: selected work, delivery model, sector credibility, and stronger differentiation.
- Add a real case study template and convert at least one service story into measurable evidence.
- Move from bespoke section logic toward a more intentional component system with reusable motion and layout primitives.

### Phase 3

- Introduce route-level localization, locale-aware metadata, and alternates.
- Instrument analytics and funnel events around CTA, locale change, and contact submission.
- Add automated browser regression checks for locale switching, navigation, and section behavior.

## Recommended Fix Order

1. Route-backed or cookie-backed locale architecture
2. Contact endpoint hardening and observability
3. Homepage proof and differentiation upgrade
4. Shell/client-boundary reduction
5. Shared interaction primitives and regression coverage
