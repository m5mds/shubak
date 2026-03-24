/**
 * lib/physics.ts — Centralized Spring Physics System
 * ─────────────────────────────────────────────────────
 * ALL spring configurations live here. No component may define
 * inline stiffness, damping, or mass values. Import from this file.
 *
 * Three profiles, three kinetic personalities:
 *
 *   springMicro  → Near-instant, no oscillation. Cursor, hover, tooltips.
 *   springMacro  → Heavy, critically-damped. Modals, page transitions, layout.
 *   springSpatial → Low mass, high tension. Z-axis depth, scale effects.
 */

import type { SpringOptions } from "framer-motion";

// ─── MICRO ─────────────────────────────────────────────────────────────────────
// High stiffness + high damping = near-instant settle with zero bounce.
// Use for: magnetic cursor, magnetic buttons, hover states, micro-interactions.
export const springMicro: SpringOptions = {
  stiffness: 300,
  damping: 30,
  mass: 0.5,
};

// ─── MACRO ─────────────────────────────────────────────────────────────────────
// Medium stiffness + critically-damped = heavy, deliberate, expensive feel.
// Use for: page transitions, modals, section reveals, navigation.
export const springMacro: SpringOptions = {
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

// ─── SPATIAL ───────────────────────────────────────────────────────────────────
// High stiffness + moderate damping + lower mass = snappy Z-axis scale.
// Use for: hero zoom/exit, depth scaling, the "Shubak window" effect.
export const springSpatial: SpringOptions = {
  stiffness: 300,
  damping: 25,
  mass: 0.8,
};

// ─── TRANSITION HELPERS ────────────────────────────────────────────────────────
// Pre-composed Framer Motion transition objects for direct use in `transition={}`.
export const transitionMicro = { type: "spring" as const, ...springMicro };
export const transitionMacro = { type: "spring" as const, ...springMacro };
export const transitionSpatial = { type: "spring" as const, ...springSpatial };
