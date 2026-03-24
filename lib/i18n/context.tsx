'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Dictionary } from './types';
import { ar } from './ar';
import { en } from './en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  dict: Dictionary;
  t: Dictionary;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function applyDocumentLocale(nextLocale: Locale) {
  document.documentElement.lang = nextLocale;
  document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.remove('lang-ar', 'lang-en');
  document.documentElement.classList.add(`lang-${nextLocale}`);
}

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('ar'); // Default to 'ar' to match layout.tsx SSR

  useEffect(() => {
    const saved = localStorage.getItem('shubak-locale') as Locale;
    const nextLocale = saved && (saved === 'ar' || saved === 'en') ? saved : 'ar';

    applyDocumentLocale(nextLocale);

    if (nextLocale !== locale) {
      const frameId = requestAnimationFrame(() => setLocaleState(nextLocale));
      return () => cancelAnimationFrame(frameId);
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('shubak-locale', l);
    applyDocumentLocale(l);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      });
    });
  };

  const dict = locale === 'ar' ? ar : en;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const toggleLocale = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, dict, t: dict, dir }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
