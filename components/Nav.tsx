'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
}

interface SubmenuGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

const DESKTOP_LINKS: (NavLink | SubmenuGroup)[] = [
  { label: '首页', href: '/' },
  { label: '商业前景', href: '/business' },
  {
    label: '技术全景',
    href: '/technology',
    children: [
      { label: '技术概览', href: '/technology' },
      { label: '呼吸检测', href: '/technology/respiration' },
      { label: '核心体温', href: '/technology/temperature' },
      { label: '组合方案', href: '/technology/combinations' },
      { label: '汗液分析', href: '/technology/sweat' },
    ],
  },
  { label: '运动生理学', href: '/physiology' },
];

const MOBILE_LINKS_FULL: NavLink[] = [
  { label: '首页', href: '/' },
  { label: '商业前景', href: '/business' },
  { label: '技术概览', href: '/technology' },
  { label: '呼吸检测', href: '/technology/respiration' },
  { label: '核心体温', href: '/technology/temperature' },
  { label: '组合方案', href: '/technology/combinations' },
  { label: '汗液分析', href: '/technology/sweat' },
  { label: '运动生理学', href: '/physiology' },
];

function HeartLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
          C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
          c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#4ADE80"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59
          .4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49
          -2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
          -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82
          .72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07
          -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
          -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
          .64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04
          2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
          .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
          3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
          2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8
          c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

function isSubmenuGroup(item: NavLink | SubmenuGroup): item is SubmenuGroup {
  return 'children' in item && Array.isArray(item.children);
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold text-white hover:text-green-400 transition-colors duration-200"
        >
          <HeartLogo />
          HeartBeat
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {DESKTOP_LINKS.map((item) => {
            if (isSubmenuGroup(item)) {
              return (
                <div key={item.label} className="group relative">
                  <div className="flex items-center gap-1 px-3 py-2 text-sm text-[#94A3B8] transition-colors duration-200 hover:text-white cursor-pointer rounded-md">
                    {item.label}
                    <ChevronDown />
                  </div>
                  {/* Submenu dropdown */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="glass-card py-2 min-w-[160px]">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-[#94A3B8] transition-colors duration-200 hover:text-white rounded-md"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop GitHub + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Paipai112/heartbeat-3in1-research"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-white/20"
          >
            <GitHubIcon />
            GitHub
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#020617]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {MOBILE_LINKS_FULL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#94A3B8] transition-colors duration-200 hover:text-white py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t border-white/[0.06]">
              <a
                href="https://github.com/Paipai112/heartbeat-3in1-research"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 py-2"
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
