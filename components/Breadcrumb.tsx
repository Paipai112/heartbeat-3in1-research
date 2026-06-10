import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function ChevronRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#475569] shrink-0"
      aria-hidden="true"
    >
      <path d="M4.5 2.5L8 6l-3.5 3.5" />
    </svg>
  );
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="text-sm mb-8">
      <ol className="flex items-center gap-2 flex-wrap">
        {/* First item always links to / */}
        <li>
          <Link
            href="/"
            className="text-[#64748B] hover:text-green-400 transition-colors duration-200"
          >
            首页
          </Link>
        </li>

        <li aria-hidden="true">
          <ChevronRight />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-white">{item.label}</span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-[#64748B] hover:text-green-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#64748B]">{item.label}</span>
              )}

              {!isLast && (
                <span aria-hidden="true">
                  <ChevronRight />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
