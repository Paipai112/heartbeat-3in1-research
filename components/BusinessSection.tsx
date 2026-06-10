interface ScenarioCard {
  rank: string;
  title: string;
  borderClass: string;
  market: string;
  advantage: string;
  challenge: string;
  competitors: string;
}

interface BarSegment {
  label: string;
  value: number;
  color: string;
}

interface MarketBarData {
  year: string;
  segments: BarSegment[];
}

interface DeviceInfo {
  label: string;
  icon: React.ReactNode;
  name: string;
}

const SCENARIO_CARDS: ScenarioCard[] = [
  {
    rank: "#1 最佳方案",
    title: "三合一：心率 + 呼吸 + 核心体温",
    borderClass: "border-green-500/50",
    market: "三市场交叉增量 · 估值超 $50 亿",
    advantage: "品类定义者 · 竞争真空 · 技术壁垒高",
    challenge: "BioZ + 体温双模信号处理 · 多参数临床验证",
    competitors: "无直接竞品（Astroskin $5,999 属医疗设备）",
  },
  {
    rank: "#2 最快上市",
    title: "二合一：心率 + 呼吸",
    borderClass: "border-blue-500/30",
    market: "胸带市场 $36 亿 + 呼吸设备 $3.66 亿",
    advantage: "MAX30001 单芯片方案 · BOM 仅增 $2-3",
    challenge: "呼吸率数据缺乏消费者认知 · 需教育市场",
    competitors: "Tymewear VitalPro ($299) · Polar H10 (EDR)",
  },
  {
    rank: "#3 差异化切入",
    title: "二合一：心率 + 核心体温",
    borderClass: "border-amber-500/30",
    market: "胸带市场 $36 亿 + 体温可穿戴 $52 亿",
    advantage: "热适应训练刚需 · 女子生理周期追踪",
    challenge: "核心体温算法精度争议 · CORE 独立验证仅51%有效",
    competitors: "CORE 2 ($295) · Calera Research",
  },
];

const MARKET_DATA: MarketBarData[] = [
  {
    year: "2025",
    segments: [
      { label: "心率胸带", value: 50, color: "bg-green-500" },
      { label: "呼吸训练", value: 5.3, color: "bg-green-400" },
      { label: "可穿戴体温", value: 44.7, color: "bg-amber-500" },
    ],
  },
  {
    year: "2034",
    segments: [
      { label: "心率胸带", value: 39, color: "bg-green-500" },
      { label: "呼吸训练", value: 4, color: "bg-green-400" },
      { label: "可穿戴体温", value: 57, color: "bg-amber-500" },
    ],
  },
];

const DEVICES: DeviceInfo[] = [
  {
    label: "心率",
    icon: <HeartIcon />,
    name: "Garmin HRM",
  },
  {
    label: "呼吸",
    icon: <LungsIcon />,
    name: "Tymewear VitalPro",
  },
  {
    label: "核心体温",
    icon: <ThermometerIcon />,
    name: "CORE 2",
  },
  {
    label: "汗液分析",
    icon: <DropletIcon />,
    name: "FLOWBIO S1",
  },
];

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-red-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function LungsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-blue-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-amber-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 000-7.5v7.5zm0 0a3.75 3.75 0 100-7.5"
      />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.25s-7.5 8.285-7.5 13.285A7.5 7.5 0 0012 23a7.5 7.5 0 007.5-7.465C19.5 10.535 12 2.25 12 2.25z"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-[#64748B]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function ColorDot({ color }: { color: string }) {
  return <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;
}

export function BusinessSection() {
  return (
    <section id="business" className="py-24 lg:py-32 bg-[#0A0A1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Chapter label */}
        <p className="text-green-400 text-sm font-semibold mb-3">
          第一章 · 商业前景调研
        </p>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          三种产品形态的{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            商业价值
          </span>
          {" "}对比
        </h2>

        {/* Intro paragraph */}
        <p className="text-[#94A3B8] max-w-2xl mb-16">
          基于 Visma-Lease a Bike 车队传感器需求分析，我们从市场规模、技术可行性和竞争格局三个维度，对三种产品组合形态进行商业价值评估。三合一方案以品类定义者身份占据最佳商业位势。
        </p>

        {/* Scenario Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {SCENARIO_CARDS.map((card) => (
            <div
              key={card.rank}
              className={`bg-white/5 backdrop-blur-xl border border-white/[0.06] border-t-2 ${card.borderClass} rounded-2xl p-6 lg:p-8 flex flex-col`}
            >
              {/* Rank */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-green-400 font-heading text-2xl font-bold">
                  {card.rank.slice(0, 3)}
                </span>
                <span className="text-xs text-[#64748B]">{card.rank.slice(4)}</span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-white text-lg mt-3 mb-6">
                {card.title}
              </h3>

              {/* Specs */}
              <dl className="space-y-4 flex-1">
                <div>
                  <dt className="text-xs text-[#64748B] mb-1">市场规模</dt>
                  <dd className="text-sm text-[#CBD5E1]">{card.market}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#64748B] mb-1">核心优势</dt>
                  <dd className="text-sm text-[#CBD5E1]">{card.advantage}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#64748B] mb-1">关键挑战</dt>
                  <dd className="text-sm text-[#CBD5E1]">{card.challenge}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#64748B] mb-1">竞品对比</dt>
                  <dd className="text-sm text-[#CBD5E1]">{card.competitors}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        {/* Market Data */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 lg:p-12">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-8">
            胸带心率监测市场增长曲线
          </h3>

          {MARKET_DATA.map((yearData) => (
            <div key={yearData.year} className="mb-8 last:mb-0">
              <p className="text-sm text-[#64748B] mb-3">{yearData.year}</p>
              <div className="h-8 rounded-full overflow-hidden flex">
                {yearData.segments.map((segment) => (
                  <div
                    key={segment.label}
                    className={`${segment.color} h-full flex items-center justify-center text-xs font-semibold text-white/90`}
                    style={{ width: `${segment.value}%` }}
                  >
                    {segment.value > 8 ? `${segment.value}%` : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-6">
            {MARKET_DATA[0].segments.map((segment) => (
              <div key={segment.label} className="flex items-center gap-2">
                <ColorDot color={segment.color} />
                <span className="text-xs text-[#94A3B8]">{segment.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visma Pain Point */}
        <div className="mt-20">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-8">
            Visma 车队的设备碎片化痛点
          </h3>

          {/* Device cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {DEVICES.map((device) => (
              <div
                key={device.name}
                className="bg-white/5 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center"
              >
                <div className="flex justify-center mb-3">{device.icon}</div>
                <p className="text-xs text-[#64748B] mb-1">{device.label}</p>
                <p className="text-sm text-[#CBD5E1] font-medium">{device.name}</p>
              </div>
            ))}
          </div>

          {/* Arrow to solution */}
          <div className="flex justify-center mb-6">
            <ArrowDownIcon />
          </div>

          {/* HeartBeat Solution Callout */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="text-green-400 text-sm font-semibold">
                一个设备 · 三项生命体征 · 无数据孤岛
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
