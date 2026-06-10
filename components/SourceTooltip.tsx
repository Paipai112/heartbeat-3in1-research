'use client';

import { useState, useRef } from 'react';
import { sources } from '@/data/sources';
import type { Source } from '@/lib/types';

interface SourceTooltipProps {
  sourceId: string;
  children?: React.ReactNode;
  className?: string;
}

export function SourceTooltip({ sourceId, children, className = '' }: SourceTooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const source: Source | undefined = sources.find((s) => s.id === sourceId);
  const fallbackLabel = '数据来源';

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 150);
  };

  const handleClick = () => {
    if (source?.url) {
      window.open(source.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <span
      className={`inline-flex flex-col items-center relative ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {/* Data text */}
      <span
        className="border-b border-dashed border-[#94A3B8]/40 cursor-help transition-colors duration-200 hover:border-green-400 hover:text-green-400"
        onClick={handleClick}
      >
        {children ?? sourceId}
      </span>

      {/* Tooltip */}
      {visible && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          <div className="glass-card-elevated px-4 py-3 max-w-xs animate-[fade-in-up_0.2s_ease-out]">
            <p className="text-sm font-semibold text-white">
              {source ? source.title : fallbackLabel}
            </p>
            {source && (
              <p className="text-xs text-[#64748B] mt-1">
                {source.publisher}
                {source.date && ` · ${source.date}`}
              </p>
            )}
            {source?.url && (
              <p className="text-xs text-[#475569] mt-1.5">
                点击跳转来源 &rarr;
              </p>
            )}
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-[#1E293B] border-r border-b border-white/[0.1]" />
        </div>
      )}
    </span>
  );
}
