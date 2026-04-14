'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
// @ts-ignore
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize on client
    if (typeof window === 'undefined') return;

    // Only enable smooth scroll on homepage — other pages use native scroll
    if (pathname !== '/') return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [pathname]);

  return <>{children}</>;
}
