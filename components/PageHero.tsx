import React from 'react';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  titleGradient?: string;
  subtitle: string;
  description?: string;
  badge?: {
    text: string;
    color?: string; // hex color or layer id
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
  const accentHex = badge?.color ?? "#4ADE80";

  return (
    <section
      className="relative min-h-[40vh] flex items-center py-20 lg:py-28"
      style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accentHex}10 0%, transparent 70%)`,
      }}
    >
      <div className="max-w-[72rem] mx-auto px-6 lg:px-8 w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-200 mb-8"
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
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-6 text-xs"
            style={{
              backgroundColor: accentHex + "15",
              border: `1px solid ${accentHex}30`,
              color: "#A3A3A3",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentHex }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: accentHex }}
              />
            </span>
            {badge.text}
          </div>
        )}

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
          {titleGradient ? (
            <>
              {title}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentHex}, #60A5FA)`,
                }}
              >
                {titleGradient}
              </span>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-text-secondary mt-4 max-w-2xl">{subtitle}</p>

        {/* Description */}
        {description && (
          <p className="text-sm text-text-muted max-w-2xl mt-3">
            {description}
          </p>
        )}

        {/* CTA slot */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
