import React from 'react';
import Link from 'next/link';

function HeartLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
        className="text-[#4ADE80]"
      />
    </svg>
  );
}

const pageLinks = [
  { label: '首页', href: '/' },
  { label: '模块', href: '/module' },
  { label: '术语辞典', href: '/glossary' },
  { label: '参考文献', href: '/references' },
];

const glossaryLinks = [
  { label: 'ECG', href: '/glossary/ecg-electrocardiogram' },
  { label: 'BioZ', href: '/glossary/bioz-bioimpedance' },
  { label: 'HRV', href: '/glossary/hrv-heart-rate-variability' },
  { label: 'VT1', href: '/glossary/vt1-first-ventilatory-threshold' },
  { label: '核心体温', href: '/glossary/core-body-temperature' },
  { label: '术语辞典', href: '/glossary' },
];

interface SourceLink {
  label: string;
  href?: string;
}

const sourceLinks: SourceLink[] = [
  { label: '参考文献', href: '/references' },
  { label: 'Velo', href: 'https://velo.outsideonline.com' },
  { label: 'Cyclingnews', href: 'https://www.cyclingnews.com' },
  { label: 'MDPI', href: 'https://www.mdpi.com' },
  { label: 'ADI/TI/Nordic' },
  { label: 'PMC/PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle py-16">
      <div className="max-w-[72rem] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <HeartLogo />
              <span className="font-heading font-bold text-text-primary text-lg">
                HeartBeat
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-sm">
              定义下一代运动传感器的品类标准
            </p>
          </div>

          <div>
            <h3 className="text-text-primary text-sm uppercase font-semibold mb-4">
              页面导航
            </h3>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-[#4ADE80] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary text-sm uppercase font-semibold mb-4">
              术语参考
            </h3>
            <ul className="space-y-2">
              {glossaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-[#4ADE80] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary text-sm uppercase font-semibold mb-4">
              参考来源
            </h3>
            <ul className="space-y-2">
              {sourceLinks.map((source) =>
                source.href ? (
                  <li key={source.label}>
                    <a
                      href={source.href}
                      target={source.href.startsWith('http') ? '_blank' : undefined}
                      rel={source.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-text-muted hover:text-[#4ADE80] transition-colors"
                    >
                      {source.label}
                    </a>
                  </li>
                ) : (
                  <li key={source.label}>
                    <span className="text-sm text-text-muted">{source.label}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-xs text-text-muted">
            &copy; 2026 HeartBeat Research
          </span>
          <span className="text-xs text-text-muted">
            Built with Next.js + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
