import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Col 1 - Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                  className="text-green-400"
                />
              </svg>
              <span className="font-heading font-bold text-white text-lg">
                HeartBeat
              </span>
            </div>
            <p className="text-sm text-[#64748B] max-w-sm">
              下一代三合一运动传感器胸带技术调研
            </p>
          </div>

          {/* Col 2 - Report Sections */}
          <div>
            <h3 className="text-white text-sm uppercase font-semibold mb-4">
              报告章节
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#business"
                  className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                >
                  商业前景
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                >
                  技术全景
                </a>
              </li>
              <li>
                <a
                  href="#physiology"
                  className="text-sm text-[#64748B] hover:text-green-400 transition-colors"
                >
                  运动生理学
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 - References */}
          <div>
            <h3 className="text-white text-sm uppercase font-semibold mb-4">
              参考来源
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-[#64748B]">Velo/Cyclingnews</li>
              <li className="text-sm text-[#64748B]">BikeRadar/DC Rainmaker</li>
              <li className="text-sm text-[#64748B]">MDPI Biosensors</li>
              <li className="text-sm text-[#64748B]">ADI/TI/Nordic</li>
              <li className="text-sm text-[#64748B]">PMC/PubMed</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-xs text-[#475569]">
            © 2026 HeartBeat Research
          </span>
          <span className="text-xs text-[#475569]">
            Built with Next.js + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
