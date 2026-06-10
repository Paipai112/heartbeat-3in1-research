export function Hero() {
  return (
    <section
      className="min-h-[90vh] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(34,197,94,0.08), transparent)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Research Report June 2026
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

        {/* Subtitle */}
        <p className="text-lg text-[#94A3B8] mt-6">
          心率监测 - 呼吸检测 - 核心体温 - 一个设备，三项生命体征
        </p>

        {/* Description */}
        <p className="text-sm text-[#64748B] max-w-xl mx-auto mt-4">
          基于 Visma-Lease a Bike
          世界巡回赛车队传感器生态的深度调研
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <a
            href="#business"
            className="rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3.5 transition-colors duration-200"
          >
            探索报告
          </a>
          <a
            href="#technology"
            className="rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 transition-colors duration-200"
          >
            技术方案
          </a>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/5 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white">$8,000 万+</div>
            <div className="text-sm text-[#94A3B8] mt-1">
              胸带心率监测市场 2034 年规模
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white">$200-350</div>
            <div className="text-sm text-[#94A3B8] mt-1">
              三合一产品建议定价区间
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400">0</div>
            <div className="text-sm text-[#94A3B8] mt-1">
              现有消费级三合一产品数
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-2">
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
  );
}
