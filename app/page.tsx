import Link from "next/link";

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card p-6 text-center glow-green">
      <div className="text-2xl font-bold text-white font-heading">{value}</div>
      <div className="text-sm text-[#94A3B8] mt-1">{label}</div>
    </div>
  );
}

function ReportCard({
  href,
  icon,
  title,
  description,
  accent = "green",
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "green" | "teal";
}) {
  const borderHover =
    accent === "teal"
      ? "hover:border-cyan-500/30"
      : "hover:border-green-500/30";
  return (
    <Link
      href={href}
      className={
        "glass-card group p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer " +
        borderHover
      }
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[#94A3B8] leading-relaxed">{description}</p>
      <span className="inline-flex items-center gap-1 text-green-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        阅读报告
        <ChevronRight />
      </span>
    </Link>
  );
}

function ChevronRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(34,197,94,0.10), transparent 60%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Research Report · June 2026
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
            下一代运动传感器
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              三合一胸带
            </span>
          </h1>

          <p className="text-lg text-[#94A3B8] mt-6">
            心率监测 · 呼吸检测 · 核心体温 — 一个设备，三项生命体征
          </p>
          <p className="text-sm text-[#64748B] max-w-xl mx-auto mt-3">
            基于 Visma-Lease a Bike
            世界巡回赛车队传感器生态的深度技术调研
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <Link
              href="/business"
              className="rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              探索报告
            </Link>
            <Link
              href="/technology"
              className="rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              技术方案
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            <HeroStat value="$8,000 万+" label="胸带心率监测市场 2034 年规模" />
            <HeroStat value="$200-350" label="三合一产品建议定价区间" />
            <HeroStat value="0" label="现有消费级三合一产品数" />
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex flex-col items-center gap-2">
            <span className="text-xs text-[#475569]">向下滚动探索</span>
            <svg
              className="w-4 h-4 text-[#475569] animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Report Sections Preview */}
      <section className="bg-[#020617] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              深度研究报告
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto">
              覆盖市场前景、技术全景与运动生理学三大维度，为三合一胸带产品决策提供完整知识基础
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ReportCard
              href="/business"
              accent="green"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20V10" />
                  <path d="M18 20V4" />
                  <path d="M6 20v-4" />
                </svg>
              }
              title="商业前景调研"
              description="三合一 vs HR+呼吸 vs HR+体温 — 三种商业场景的深度市场分析，含市场规模预测、竞品全景与 Visma 车队设备碎片化案例。"
            />
            <ReportCard
              href="/technology"
              accent="teal"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              }
              title="技术全景"
              description="七大呼吸检测技术路线对比、六大核心体温测量方法、芯片方案矩阵与系统架构设计，覆盖从理论到工程实现的全链路。"
            />
            <ReportCard
              href="/technology/respiration"
              accent="teal"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <path d="M4 22v-7" />
                </svg>
              }
              title="呼吸检测技术"
              description="生物阻抗法 (BioZ) 深度拆解 — 从 50kHz 激励电流到潮气量估算的完整信号链路，含芯片选型与算法流程。"
            />
            <ReportCard
              href="/technology/temperature"
              accent="teal"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
                </svg>
              }
              title="核心体温监测"
              description="单热流法 vs 双热流法 — CORE 2 的争议与下一代方案的工程路径，含独立验证数据分析与自研算法路线图。"
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <ReportCard
              href="/technology/combinations"
              accent="green"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              }
              title="硬件组合方案"
              description="从二合一到三合一，六种芯片方案的完整对比 — MAX30001+TMP117 为何是最优路径，含 BOM 成本、功耗预算与认证路线。"
            />
            <ReportCard
              href="/physiology"
              accent="green"
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title="运动生理学框架"
              description="24 项关键生理指标 — 从 ECG、呼吸与体温三大传感器到 AI 教练的四阶段能力路径，构建完整的运动生理数据飞轮。"
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-24 lg:py-32"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(34,197,94,0.06), transparent)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            定义下一代运动传感器的
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              品类标准
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10">
            消费级胸带市场 $36 亿 · 三合一竞争真空 ·
            技术组件全部成熟。从 Visma 车队的设备碎片化到单一设备的完整生理画像 —
            这是一个定义新品类的窗口期。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/Paipai112/heartbeat-3in1-research"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              GitHub
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              开始阅读报告
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
