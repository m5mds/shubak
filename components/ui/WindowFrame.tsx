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
        'group/window relative overflow-hidden rounded-[12px] border border-white/[0.06] transition-all duration-300 ease-out hover:border-white/[0.12]',
        isGlass
          ? 'bg-[#111118]/70 backdrop-blur-[12px]'
          : isMinimal
            ? 'bg-transparent'
            : 'bg-[#111118]',
        !isMinimal && 'hover:scale-[1.003] hover:shadow-[0_0_40px_rgba(255,255,255,0.02)]',
        className
      )}
    >
      {showTitleBar && (
        <div
          className={cn(
            'flex h-[22px] items-center border-b px-3',
            isGlass ? 'border-white/[0.08] bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.03]',
            dir === 'rtl' ? 'justify-end' : 'justify-start'
          )}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-[6px] w-[6px] rounded-full bg-white/15 transition-colors duration-300 group-hover/window:bg-white/30" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/15 transition-colors duration-300 group-hover/window:bg-white/30" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/15 transition-colors duration-300 group-hover/window:bg-white/30" />
          </div>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
