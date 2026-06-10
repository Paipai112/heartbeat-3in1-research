import React from 'react';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  titleGradient?: string;
  subtitle: string;
  description?: string;
  badge?: {
    text: string;
    color?: 'green' | 'teal';
  };
  children?: React.ReactNode;
}

export function PageHero({
  title,
  titleGradient,
  subtitle,
  description,
  badge,
  children,
}: PageHeroProps) {
  const badgeColor = badge?.color ?? 'green';

  const badgeBorderColor =
    badgeColor === 'green' ? 'border-green-500/20' : 'border-teal-500/20';
  const badgeBgColor =
    badgeColor === 'green' ? 'bg-green-500/10' : 'bg-teal-500/10';
  const dotColor =
    badgeColor === 'green' ? 'bg-green-400' : 'bg-teal-400';
  const glowBg =
    badgeColor === 'green'
      ? 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34, 197, 94, 0.08) 0%, transparent 70%)'
      : 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(8, 145, 178, 0.08) 0%, transparent 70%)';

  return (
    <section
      className="relative min-h-[40vh] flex items-center py-20 lg:py-28"
      style={{ background: glowBg }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-green-400 transition-colors duration-200 mb-8"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 3L5 7l4 4" />
          </svg>
          返回首页
        </Link>

        {/* Badge */}
        {badge && (
          <div
            className={`inline-flex items-center gap-2 rounded-full ${badgeBgColor} border ${badgeBorderColor} px-3 py-1 mb-6`}
          >
            <span className={`relative flex h-2 w-2`}>
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}
              />
            </span>
            <span className="text-xs text-[#94A3B8]">{badge.text}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {titleGradient ? (
            <>
              {title}
              <br />
              <span className="text-gradient">{titleGradient}</span>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl">{subtitle}</p>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] max-w-2xl mt-3">
            {description}
          </p>
        )}

        {/* CTA slot */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
