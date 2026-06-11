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
        className="text-green-400"
      />
    </svg>
  );
}

const reportLinks = [
  { label: '商业前景', href: '/business' },
  { label: '技术全景', href: '/technology' },
  { label: '呼吸检测', href: '/technology/respiration' },
  { label: '核心体温', href: '/technology/temperature' },
  { label: '汗液分析', href: '/technology/sweat' },
  { label: '组合方案', href: '/technology/combinations' },
  { label: '运动生理学', href: '/physiology' },
];

const glossaryLinks = [
  { label: 'ECG', href: '/glossary/ecg' },
  { label: 'BioZ', href: '/glossary/bioz' },
  { label: 'HRV', href: '/glossary/hrv' },
  { label: 'VT1', href: '/glossary/vt1' },
  { label: '核心体温', href: '/glossary/core-body-temperature' },
  { label: '术语辞典', href: '/glossary' },
];

interface SourceLink {
  label: string;
  href?: string;
}

const sourceLinks: SourceLink[] = [
  { label: '数据来源', href: '/sources' },
  { label: 'Velo', href: 'https://velo.outsideonline.com' },
  { label: 'Cyclingnews', href: 'https://www.cyclingnews.com' },
  { label: 'MDPI', href: 'https://www.mdpi.com' },
  { label: 'ADI/TI/Nordic' },
  { label: 'PMC/PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov' },
];

export function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 - Brand (span 2) */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <HeartLogo />
              <span className="font-heading font-bold text-white text-lg">
                HeartBeat
              </span>
            </div>
            <p className="text-sm text-[#64748B] max-w-sm">
              定义下一代运动传感器的品类标准
            </p>
          </div>

          {/* Col 2 - Report Sections */}
          <div>
            <h3 className="text-white text-sm uppercase font-semibold mb-4">
              报告章节
            </h3>
            <ul className="space-y-2">
              {reportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Glossary */}
          <div>
            <h3 className="text-white text-sm uppercase font-semibold mb-4">
              术语参考
            </h3>
            <ul className="space-y-2">
              {glossaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Sources */}
          <div>
            <h3 className="text-white text-sm uppercase font-semibold mb-4">
              参考来源
            </h3>
            <ul className="space-y-2">
              {sourceLinks.map((source) =>
                source.href ? (
                  <li key={source.label}>
                    <a
                      href={source.href}
                      target={
                        source.href.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        source.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                    >
                      {source.label}
                    </a>
                  </li>
                ) : (
                  <li key={source.label}>
                    <span className="text-sm text-[#64748B]">
                      {source.label}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-xs text-[#475569]">
            &copy; 2026 HeartBeat Research
          </span>
          <span className="text-xs text-[#475569]">
            Built with Next.js + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
