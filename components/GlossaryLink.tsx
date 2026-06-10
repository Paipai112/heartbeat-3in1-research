'use client';

import Link from 'next/link';

interface GlossaryLinkProps {
  slug: string;
  term?: string;
  children?: React.ReactNode;
  className?: string;
}

export function GlossaryLink({ slug, term, children, className = '' }: GlossaryLinkProps) {
  const displayText = children ?? term ?? slug;

  return (
    <Link
      href={`/glossary/${slug}`}
      className={`inline-flex items-center gap-0.5 border-b border-dashed border-[#94A3B8]/40 hover:border-green-400 hover:text-green-400 transition-colors duration-200 cursor-help group ${className}`}
    >
      {displayText}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-[2px]"
        aria-hidden="true"
      >
        <path d="M3 1h6v6M10 0L4 6" />
      </svg>
    </Link>
  );
}
