'use client';

import { ReactNode } from 'react';
import { useLocale } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

interface WindowFrameProps {
  children: ReactNode;
  variant?: 'default' | 'minimal' | 'glass';
  className?: string;
  hideTitleBar?: boolean;
}

export function WindowFrame({
  children,
  variant = 'default',
  className,
  hideTitleBar = false,
}: WindowFrameProps) {
  const { dir } = useLocale();
  const isGlass = variant === 'glass';
  const isMinimal = variant === 'minimal';
  const showTitleBar = !hideTitleBar && !isMinimal;

  return (
    <div
      className={cn(
        'group/window relative overflow-hidden rounded-[12px] border border-white/[0.09] transition-all duration-300 ease-out hover:border-white/[0.18]',
        isGlass
          ? 'bg-[#111118]/70 backdrop-blur-[12px]'
          : isMinimal
            ? 'bg-transparent'
            : 'bg-[#111118]',
        !isMinimal && 'hover:scale-[1.003] hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] transition-shadow',
        className
      )}
    >
      {showTitleBar && (
        <div
          className={cn(
            'flex h-[22px] items-center border-b px-3',
            isGlass ? 'border-white/[0.12] bg-white/[0.05]' : 'border-white/[0.09] bg-white/[0.04]',
            dir === 'rtl' ? 'justify-end' : 'justify-start'
          )}
        >
          <div aria-hidden="true" className="flex items-center gap-1.5">
            <div className="h-[6px] w-[6px] rounded-full bg-white/25 transition-colors duration-300 group-hover/window:bg-white/45" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/25 transition-colors duration-300 group-hover/window:bg-white/45" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/25 transition-colors duration-300 group-hover/window:bg-white/45" />
          </div>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
