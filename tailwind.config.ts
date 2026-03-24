import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',         // Dark background
        surface: '#0D0D12',    // Slightly lighter for cards/surfaces
        text: {
          DEFAULT: '#ededed',  // Light grey/white for readability
          muted: '#7a7a8a',    // Secondary text
          faint: '#4a4a55',    // Muted text
        },
        accent: '#ffffff',     // White — used sparingly on CTAs/highlights
      },
      fontFamily: {
        readex: ['var(--font-readex)', 'sans-serif'],
        serif:  ['var(--font-serif)', 'Georgia', 'serif'],
        sans:   ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:   ['ui-monospace', "'Cascadia Code'", "'Fira Code'", 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(56px, 8vw, 96px)',
        'heading': 'clamp(28px, 3.5vw, 40px)',
        'card-title': 'clamp(18px, 2vw, 20px)',
        'body': 'clamp(15px, 2vw, 16px)',
        'label': '11px',
        'nav': '13px',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
}

export default config
