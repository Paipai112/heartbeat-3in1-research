import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { SourceTooltip } from "@/components/SourceTooltip";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={"glass-card p-6 " + className}>{children}</div>;
}

function GlassCardElevated({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"glass-card-elevated p-8 " + className}>{children}</div>
  );
}

function SectionHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: { text: string; color?: string };
}) {
  return (
    <div className="mb-12">
      {badge && (
        <span
          className={
            "inline-block text-xs font-mono px-3 py-1 rounded-full border mb-4 " +
            (badge.color === "amber"
              ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
              : badge.color === "purple"
                ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                : "text-green-400 bg-green-500/10 border-green-500/20")
          }
        >
          {badge.text}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
        {title}
      </h2>
      <p className="text-[#94A3B8] max-w-2xl">{subtitle}</p>
    </div>
  );
}

function DataHighlight({ children }: { children: React.ReactNode }) {
  return <div className="data-highlight my-4">{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  Chevron connector for layered architecture                         */
/* ------------------------------------------------------------------ */

function LayerConnector({ color = "green" }: { color?: string }) {
  const borderColor =
    color === "green"
      ? "border-green-500/30"
      : color === "blue"
        ? "border-blue-500/30"
        : color === "amber"
          ? "border-amber-500/30"
          : "border-purple-500/30";

  const bgColor =
    color === "green"
      ? "bg-green-500/20"
      : color === "blue"
        ? "bg-blue-500/20"
        : color === "amber"
          ? "bg-amber-500/20"
          : "bg-purple-500/20";

  const textColor =
    color === "green"
      ? "text-green-400"
      : color === "blue"
        ? "text-blue-400"
        : color === "amber"
          ? "text-amber-400"
          : "text-purple-400";

  return (
    <div className="flex justify-center py-3">
      <div className={`flex flex-col items-center gap-1 ${textColor}`}>
        {/* Dashed vertical line */}
        <div className={`h-8 w-px border-l border-dashed ${borderColor}`} />
        {/* Chevron */}
        <div
          className={`w-8 h-8 rounded-full ${bgColor} border ${borderColor} flex items-center justify-center`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 5l4 4 4-4" />
          </svg>
        </div>
        <div className={`h-8 w-px border-l border-dashed ${borderColor}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data flow badge — shows which layers feed into an item             */
/* ------------------------------------------------------------------ */

function FlowBadge({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-[#64748B] font-mono">
      <span>{from}</span>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M3 2l2 2-2 2" />
      </svg>
      <span>{to}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sensor item for layer 1                                            */
/* ------------------------------------------------------------------ */

function SensorItem({
  name,
  chip,
  description,
  color = "green",
}: {
  name: string;
  chip: string;
  description: string;
  color?: "green" | "blue" | "teal";
}) {
  const colors = {
    green: {
      border: "border-green-500/20",
      bg: "bg-green-500/5",
      text: "text-green-400",
      chipBg: "bg-green-500/10",
    },
    blue: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/5",
      text: "text-blue-400",
      chipBg: "bg-blue-500/10",
    },
    teal: {
      border: "border-teal-500/20",
      bg: "bg-teal-500/5",
      text: "text-teal-400",
      chipBg: "bg-teal-500/10",
    },
  };
  const c = colors[color];

  return (
    <div className={`p-4 rounded-lg border ${c.border} ${c.bg}`}>
      <h4 className={`text-sm font-semibold ${c.text} mb-1`}>{name}</h4>
      <p className="text-[11px] text-[#64748B] font-mono mb-2">{description}</p>
      <span
        className={`inline-block text-[10px] font-mono ${c.text} ${c.chipBg} border ${c.border} rounded px-1.5 py-0.5`}
      >
        {chip}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric / capability item for layers 2-4                            */
/* ------------------------------------------------------------------ */

function DataItem({
  label,
  sources,
  description,
}: {
  label: string;
  sources: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
      <h4 className="text-sm font-semibold text-white mb-1">{label}</h4>
      <p className="text-[11px] text-[#64748B] mb-2">{description}</p>
      <span className="text-[10px] text-[#475569] font-mono">
        ← {sources}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Matrix card for hardware combination grid                          */
/* ------------------------------------------------------------------ */

function MatrixCard({
  name,
  bom,
  price,
  complexity,
  complexityLabel,
  chips,
  highlight = false,
  newBadge = false,
}: {
  name: string;
  bom: string;
  price: string;
  complexity: "低" | "中" | "高";
  complexityLabel: string;
  chips: string;
  highlight?: boolean;
  newBadge?: boolean;
}) {
  const complexityColors: Record<string, string> = {
    "低": "text-green-400 bg-green-500/10 border-green-500/20",
    "中": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "高": "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <div
      className={
        highlight
          ? "glass-card-elevated p-5 glow-green border-green-500/20 relative"
          : "glass-card p-5"
      }
    >
      {highlight && (
        <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-[10px] font-semibold text-green-400">
          ⭐ 推荐
        </div>
      )}
      {newBadge && (
        <div className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-semibold text-purple-400">
          NEW
        </div>
      )}
      <h4 className="font-heading text-sm font-semibold text-white mb-3">
        {name}
      </h4>
      <div className="space-y-1.5 text-xs text-[#94A3B8]">
        <div className="flex justify-between">
          <span>BOM 估算</span>
          <span className="text-white font-mono">{bom}</span>
        </div>
        <div className="flex justify-between">
          <span>目标价位</span>
          <span className="text-white font-mono">{price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>复杂度</span>
          <span
            className={
              "text-[11px] px-2 py-0.5 rounded-full border " +
              complexityColors[complexity]
            }
          >
            {complexityLabel}
          </span>
        </div>
        <div className="pt-2 border-t border-white/[0.06] mt-2">
          <span className="text-[#64748B]">关键芯片: </span>
          <span className="text-white/80">{chips}</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main page component                                                */
/* ================================================================== */

export default function CombinationsPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="硬件组合方案"
        titleGradient="从传感器到AI教练"
        subtitle="心率 + 呼吸 + 核心体温 + 汗液生化 — 四层架构的数据流动与硬件实现"
        badge={{ text: "System Integration", color: "green" }}
        description="四合一胸带不是四个传感器的简单叠加。本页从分层数据架构出发，展示每个传感器如何产生基础数据 → 高级指标如何从基础数据中推导 → AI 教练如何基于高级指标作出决策，同时给出每一层的硬件实现方案。"
      />

      {/* ============================================================ */}
      {/* Section 1: 四层数据架构 — The Centerpiece                       */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "首页", href: "/" },
              { label: "技术全景", href: "/technology" },
              { label: "组合方案" },
            ]}
          />

          <SectionHeader
            title="四合一数据架构：从传感器到 AI 教练"
            subtitle="每一层都依赖下一层的数据。传感器采集原始信号 → 基础指标提取特征 → 高级指标融合多源数据 → AI 教练输出可执行决策。这不是四个传感器的横向堆叠，而是四层数据的纵向流动。"
          />

          {/* === LAYER 1: Sensors === */}
          <div className="relative">
            {/* Layer number badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold text-sm">
                1
              </span>
              <h3 className="font-heading text-xl font-bold text-green-400">
                传感器层
              </h3>
              <span className="text-sm text-[#64748B]">
                物理世界 → 电信号
              </span>
            </div>

            <GlassCardElevated className="glow-green border-green-500/20 mb-0">
              <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
                胸带接触皮肤，通过五种传感模式将生理现象转化为可量化的电信号。
                每种传感器对应一个独立的模拟前端（AFE），由统一的 MCU 协调采样和数据打包。
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <SensorItem
                  name="ECG 电极对"
                  chip="MAX30001 AFE"
                  description="心脏电活动 → 差分电压 (μV-mV)"
                  color="green"
                />
                <SensorItem
                  name="BioZ 四电极"
                  chip="MAX30001 BioZ"
                  description="胸腔阻抗变化 → ΔZ 波形"
                  color="green"
                />
                <SensorItem
                  name="体温传感器"
                  chip="TMP117 ±0.1°C"
                  description="皮肤温度 → 16-bit 数字"
                  color="blue"
                />
                <SensorItem
                  name="汗液 ISE + 电导"
                  chip="LMP91000 AFE"
                  description="Na⁺/K⁺ 电位 + 汗液阻抗"
                  color="teal"
                />
                <SensorItem
                  name="IMU 加速度计"
                  chip="LSM6DSO 6-axis"
                  description="运动状态 + 姿态角"
                  color="blue"
                />
              </div>

              {/* Output arrows */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-[11px] text-[#64748B]">
                <span className="text-[#475569]">输出:</span>
                <span className="px-2 py-0.5 rounded bg-green-500/5 border border-green-500/20 text-green-400/80 font-mono">
                  ECG 波形 (250 Hz)
                </span>
                <span className="px-2 py-0.5 rounded bg-green-500/5 border border-green-500/20 text-green-400/80 font-mono">
                  BioZ 波形 (64 Hz)
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/5 border border-blue-500/20 text-blue-400/80 font-mono">
                  皮肤温度 (1 Hz)
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-500/5 border border-teal-500/20 text-teal-400/80 font-mono">
                  Na⁺ / 电导 (1 Hz)
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/5 border border-blue-500/20 text-blue-400/80 font-mono">
                  加速度 (100 Hz)
                </span>
              </div>
            </GlassCardElevated>
          </div>

          <LayerConnector color="green" />

          {/* === LAYER 2: Basic Data Indicators === */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-sm">
                2
              </span>
              <h3 className="font-heading text-xl font-bold text-blue-400">
                基础数据指标层
              </h3>
              <span className="text-sm text-[#64748B]">
                电信号 → 生理参数
              </span>
            </div>

            <GlassCardElevated className="border-blue-500/20">
              <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
                传感器原始波形经过滤波、特征提取和校准后，转化为具有明确生理含义的基础指标。
                这些指标是三级处理的直接输出——每个指标由一个特定传感器信号通过 MCU 片上 DSP 计算得出。
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <DataItem
                  label="心率 (HR)"
                  sources="ECG 电极"
                  description="R-R 间期 → 瞬时心率 (bpm)，由 MAX30001 硬件 R-R 检测引擎输出"
                />
                <DataItem
                  label="心率变异性 (HRV)"
                  sources="ECG 电极"
                  description="SDNN / RMSSD / LF/HF，从 RR 间期时间序列计算"
                />
                <DataItem
                  label="呼吸波形"
                  sources="BioZ 四电极"
                  description="胸腔阻抗变化 → 呼吸周期，含吸气/呼气相位"
                />
                <DataItem
                  label="皮肤温度"
                  sources="TMP117"
                  description="接触式皮肤温度 ±0.1°C，I²C 数字输出"
                />
                <DataItem
                  label="钠离子浓度 [Na⁺]"
                  sources="汗液 ISE"
                  description="Nernst 电位 → 汗液 Na⁺ (mmol/L)，温度补偿后输出"
                />
                <DataItem
                  label="皮肤电导 / 出汗率"
                  sources="汗液电导电极"
                  description="AC 阻抗 → 汗液导电率 (μS)，出汗率趋势"
                />
                <DataItem
                  label="加速度 / 姿态"
                  sources="IMU"
                  description="3 轴加速度 + 3 轴陀螺仪，运动状态分类"
                />
                <DataItem
                  label="钾离子浓度 [K⁺]"
                  sources="汗液 ISE"
                  description="K⁺ 离子载体膜 → 汗钾浓度，心脏电解质参考"
                />
              </div>
            </GlassCardElevated>
          </div>

          <LayerConnector color="blue" />

          {/* === LAYER 3: Advanced Metrics === */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                3
              </span>
              <h3 className="font-heading text-xl font-bold text-amber-400">
                高级指标层
              </h3>
              <span className="text-sm text-[#64748B]">
                多源融合 → 生理状态
              </span>
            </div>

            <GlassCardElevated className="border-amber-500/20">
              <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
                高级指标需要融合多个基础数据源。单个传感器无法得出核心体温、脱水风险或通气阈值——它们是多传感器数据的数学推导产物。
                这是四合一系统超越单功能设备的核心价值所在。
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    VT1 / VT2 通气阈值
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    呼吸率 + 潮气量拐点检测 → 有氧/无氧转换边界
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← 呼吸波形 + HR
                  </span>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    核心体温
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    皮肤温度 + 热通量模型 + HR → 体内温度推估
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← 皮肤温度 + HR + 加速度
                  </span>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    潮气量 (Vt)
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    BioZ 阻抗变化幅度 → 单次呼吸空气量 (mL)
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← BioZ 呼吸波形
                  </span>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    脱水风险指数
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    汗 Na⁺ 趋势 + 出汗率 + HR 漂移 → 脱水风险评分
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← [Na⁺] + 汗液电导 + HR
                  </span>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    电解质平衡状态
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    Na⁺/K⁺ 比值趋势 + 绝对浓度 → 电解质耗竭/正常/过量
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← [Na⁺] + [K⁺]
                  </span>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03]">
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">
                    热负荷 (Heat Load)
                  </h4>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    核心体温上升速率 + HR 响应 + 出汗率变化 → 热应激评分
                  </p>
                  <span className="text-[10px] text-[#475569] font-mono">
                    ← 核心体温 + HR + 汗液电导
                  </span>
                </div>
              </div>

              <DataHighlight>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  <span className="text-amber-400 font-semibold">
                    核心价值：
                  </span>
                  高级指标层的每一个指标都跨越了至少两个传感器的数据。
                  单功能设备（如纯心率胸带或 CORE 体温传感器）无法产生这些指标——这就是四合一的不可替代性。
                </p>
              </DataHighlight>
            </GlassCardElevated>
          </div>

          <LayerConnector color="amber" />

          {/* === LAYER 4: AI Coach Capabilities === */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-sm">
                4
              </span>
              <h3 className="font-heading text-xl font-bold text-purple-400">
                AI 教练能力层
              </h3>
              <span className="text-sm text-[#64748B]">
                生理状态 → 可执行决策
              </span>
            </div>

            <GlassCardElevated className="border-purple-500/20">
              <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
                AI 教练将高级指标转化为运动员可以直接执行的建议。
                每个 AI 能力依赖一组特定的高级指标和基础数据——这不是黑盒模型，而是有明确生理学基础的决策树。
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "训练负荷优化",
                    desc: "基于 VT1/VT2 实时位置动态调整目标功率区间。当核心体温超过 38.5°C 阈值时自动下调强度，防止热衰减。",
                    sources: ["VT1 / VT2", "核心体温", "HRV"],
                    color: "purple",
                  },
                  {
                    title: "热应激预警",
                    desc: "热负荷评分超过阈值 → 推送分级警报（注意/警告/危险）。结合出汗率下降趋势判断无汗症前兆（热射病最早期信号）。",
                    sources: ["热负荷", "核心体温", "出汗率"],
                    color: "red",
                  },
                  {
                    title: "补水策略",
                    desc: "实时计算：\"当前应补充 X mL 电解质饮料\"。基于累积出汗量 × [Na⁺] 浓度 × 运动持续时间 — 告别凭感觉喝水。",
                    sources: ["脱水风险指数", "电解质平衡", "出汗率"],
                    color: "blue",
                  },
                  {
                    title: "恢复指导",
                    desc: "训练后 HRV 恢复速率 + 核心体温回落曲线 + 汗 Na⁺ 基线回归 → 综合恢复评分。连续低分触发减量周建议。",
                    sources: ["HRV", "核心体温", "电解质平衡"],
                    color: "teal",
                  },
                  {
                    title: "比赛配速策略",
                    desc: "预判 VT1/VT2 + 当前热负荷 + 脱水趋势 → 剩余比赛时间的个性化配速曲线。\"维持当前功率可安全完赛，加速有 35% 撞墙风险。\"",
                    sources: ["VT1 / VT2", "热负荷", "脱水风险"],
                    color: "amber",
                  },
                  {
                    title: "个性化营养建议",
                    desc: "汗 Na⁺ 流失量 (mg) + 能量消耗估算 (kcal, 基于 HR) → 精确到毫克的电解质补充方案和碳水摄入时机建议。",
                    sources: ["电解质平衡", "脱水风险", "HR"],
                    color: "green",
                  },
                ].map((item) => {
                  const borderMap: Record<string, string> = {
                    purple: "border-purple-500/20",
                    red: "border-red-500/20",
                    blue: "border-blue-500/20",
                    teal: "border-teal-500/20",
                    amber: "border-amber-500/20",
                    green: "border-green-500/20",
                  };
                  const bgMap: Record<string, string> = {
                    purple: "bg-purple-500/10",
                    red: "bg-red-500/10",
                    blue: "bg-blue-500/10",
                    teal: "bg-teal-500/10",
                    amber: "bg-amber-500/10",
                    green: "bg-green-500/10",
                  };
                  const textMap: Record<string, string> = {
                    purple: "text-purple-400",
                    red: "text-red-400",
                    blue: "text-blue-400",
                    teal: "text-teal-400",
                    amber: "text-amber-400",
                    green: "text-green-400",
                  };

                  return (
                    <div
                      key={item.title}
                      className={`p-5 rounded-lg border ${borderMap[item.color]} ${bgMap[item.color].replace("/10", "/[0.03]")}`}
                    >
                      <h4
                        className={`text-sm font-semibold ${textMap[item.color]} mb-2`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-base text-[#94A3B8] leading-relaxed mb-3">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.sources.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#64748B]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <DataHighlight>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  <span className="text-purple-400 font-semibold">
                    数据飞轮效应：
                  </span>
                  AI 教练的建议被执行 → 新的传感器数据反馈结果 → 个性化基线更新 → 建议准确率提升。
                  使用 2-4 周后，系统从「群体模型」切换为「个人模型」（Personalized Baseline），
                  异常检测灵敏度提高 5-10 倍。
                </p>
              </DataHighlight>
            </GlassCardElevated>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 2: 方案全景矩阵 (extended for 4-in-1)                  */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="硬件方案谱系：从单一功能到四合一"
            subtitle="每一层数据架构对应特定的硬件实现。以下是覆盖所有组合路径的完整方案矩阵。"
          />

          {/* Row 1: 单一功能基准 */}
          <div className="mb-8">
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第一行：单一功能基准
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MatrixCard
                name="纯心率 (HR Only)"
                bom="$4-8"
                price="$99-149"
                complexity="低"
                complexityLabel="低"
                chips="MAX30001 / AD8233"
              />
              <MatrixCard
                name="纯呼吸 (Respiration)"
                bom="$5-10"
                price="$129-179"
                complexity="低"
                complexityLabel="低"
                chips="AD5940 / ADS1292R"
              />
              <MatrixCard
                name="纯体温 (Core Temp)"
                bom="$3-7"
                price="$149-229"
                complexity="低"
                complexityLabel="低"
                chips="TMP117 / MAX30205"
              />
              <MatrixCard
                name="纯汗液 (Sweat)"
                bom="$4-8"
                price="$129-199"
                complexity="低"
                complexityLabel="低"
                chips="LMP91000 + ISE 膜"
                newBadge
              />
            </div>
          </div>

          {/* Row 2: 二合一 */}
          <div className="mb-8">
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第二行：二合一方案
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MatrixCard
                name="HR + 呼吸"
                bom="$8-14"
                price="$149-199"
                complexity="中"
                complexityLabel="中"
                chips="MAX30001 (ECG+BioZ)"
              />
              <MatrixCard
                name="HR + 核心体温"
                bom="$6-12"
                price="$179-229"
                complexity="中"
                complexityLabel="中"
                chips="MAX30001 + TMP117"
              />
              <MatrixCard
                name="HR + 汗液"
                bom="$8-14"
                price="$179-249"
                complexity="中"
                complexityLabel="中"
                chips="MAX30001 + LMP91000"
                newBadge
              />
            </div>
          </div>

          {/* Row 3: 三合一 */}
          <div className="mb-8">
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第三行：三合一方案
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <MatrixCard
                name="HR + 呼吸 + 核心体温"
                bom="$10-18"
                price="$199-299"
                complexity="高"
                complexityLabel="高"
                chips="MAX30001 + TMP117 + nRF52840"
                highlight
              />
              <MatrixCard
                name="HR + 呼吸 + 汗液"
                bom="$12-22"
                price="$229-349"
                complexity="高"
                complexityLabel="高"
                chips="MAX30001 + LMP91000 + ISE"
                newBadge
              />
            </div>
          </div>

          {/* Row 4: 四合一 */}
          <div>
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第四行：四合一方案 ⭐ 终局
            </h3>
            <div className="max-w-md">
              <MatrixCard
                name="HR + 呼吸 + 核心体温 + 汗液"
                bom="$14-26"
                price="$299-399"
                complexity="高"
                complexityLabel="最高"
                chips="MAX30001 + TMP117 + LMP91000 + nRF52840"
                highlight
                newBadge
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3: 四合一全栈方案 — 芯片与架构                         */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="四合一系统架构：MAX30001 + TMP117 + LMP91000 + nRF52840"
            subtitle="所有传感器数据汇聚到单一 MCU，通过片上 DSP 处理后经 BLE + ANT+ 双模并发传输。四合一不是四个独立设备，而是一块 PCB 上的四条信号链路。"
            badge={{ text: "Primary Architecture", color: "amber" }}
          />

          {/* System architecture diagram */}
          <GlassCardElevated className="glow-green border-green-500/20 mb-10">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              完整信号链路图
            </h3>
            <div className="overflow-x-auto">
              <pre className="text-xs font-mono leading-relaxed p-5 rounded-xl border border-green-500/20 bg-[#0A1120]/80 text-green-400/90 whitespace-pre">
{`  ┌──────────────────────────────────────────────────────────────────────┐
  │                    四合一胸带 完整信号链路                               │
  ├──────────────────────────────────────────────────────────────────────┤
  │                                                                      │
  │  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐          │
  │  │ ECG 电极 │   │BioZ 电极 │   │ TMP117   │   │ISE 阵列  │          │
  │  │ 对 (2p)  │   │ 四线 (4p)│   │ 体温 IC  │   │LMP91000  │          │
  │  │ 干电极   │   │ 50kHz 激励│   │ ±0.1°C  │   │Na⁺/K⁺   │          │
  │  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘          │
  │       │              │              │              │                 │
  │       ▼              ▼              ▼              ▼                 │
  │  ┌────────────────────────┐    I²C │         I²C  │                 │
  │  │       MAX30001         │◄───────┘    ┌─────────┘                 │
  │  │  ECG AFE  │ BioZ AFE  │             │                            │
  │  │  18-bit   │  20-bit   │             │                            │
  │  │  512 sps  │  64 sps   │             │                            │
  │  │  HW R-R   │  激励源    │             │                            │
  │  └────────┬───────────────┘             │                            │
  │           │ SPI                         │                            │
  │           ▼              ┌──────────────┘                            │
  │  ┌──────────────────────────────────────┐                           │
  │  │            nRF52840                  │                           │
  │  │       ARM Cortex-M4F @ 64MHz        │                           │
  │  │                                      │                           │
  │  │  ┌ DSP Pipeline ──────────────────┐ │                           │
  │  │  │ ECG → HR/RR-interval/HRV      │ │                           │
  │  │  │ BioZ → RR/Vt/VE               │ │                           │
  │  │  │ TMP117 → T_skin → T_core(model)│ │                           │
  │  │  │ ISE → [Na⁺]/[K⁺] (Nernst)    │ │                           │
  │  │  │ IMU → Motion artifact removal │ │                           │
  │  │  └───────────────────────────────┘ │                           │
  │  │                                      │                           │
  │  │  BLE 5.4 ──────────► 手机 App       │                           │
  │  │  ANT+   ──────────► 码表 / 手表     │                           │
  │  └──────────────────────────────────────┘                           │
  │                                                                      │
  │  ┌─ 电源域 ─────────────────────────────────────────────────────┐   │
  │  │ 3.7V Li-Po → LDO 3.3V (模拟域) + DC-DC 1.8V (数字域)       │   │
  │  │ 模拟域: MAX30001 + LMP91000  数字域: nRF52840 + TMP117       │   │
  │  │ 模拟/数字独立供电，星型接地，减少数字噪声耦合                  │   │
  │  └─────────────────────────────────────────────────────────────┘   │
  └──────────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </GlassCardElevated>

          {/* Chip comparison table with sweat AFE */}
          <div className="mb-10">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              芯片选型对比（含汗液 AFE）
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      方案
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      ECG
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      BioZ
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      体温
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      汗液
                    </th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                      BOM
                    </th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                      功耗
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    {
                      id: "A",
                      name: "MAX30001+TMP117+LMP91000",
                      ecg: "MAX30001",
                      bioz: "MAX30001",
                      temp: "TMP117",
                      sweat: "LMP91000+ISE",
                      bom: "$14-26",
                      power: "~4-10 mW",
                      highlight: true,
                      note: "首选四合一方案",
                    },
                    {
                      id: "B",
                      name: "MAX30001+TMP117 (无汗液)",
                      ecg: "MAX30001",
                      bioz: "MAX30001",
                      temp: "TMP117",
                      sweat: "—",
                      bom: "$10-18",
                      power: "~3 mW",
                      highlight: false,
                      note: "三合一最优解",
                    },
                    {
                      id: "C",
                      name: "AD5940+MAX30001+LMP91000",
                      ecg: "MAX30001",
                      bioz: "AD5940",
                      temp: "TMP117",
                      sweat: "LMP91000",
                      bom: "$18-31",
                      power: "~5-12 mW",
                      highlight: false,
                      note: "双 AFE 灵活方案，适合研究级",
                    },
                    {
                      id: "D",
                      name: "AFE4960+TMP117+LMP91000",
                      ecg: "AFE4960",
                      bioz: "AFE4960",
                      temp: "TMP117",
                      sweat: "LMP91000",
                      bom: "$16-29",
                      power: "~4-10 mW",
                      highlight: false,
                      note: "最高 ECG 精度 24-bit",
                    },
                  ].map((row) => (
                    <tr
                      key={row.id}
                      className={
                        row.highlight
                          ? "bg-green-500/5 border border-green-500/10"
                          : "hover:bg-white/[0.02]"
                      }
                    >
                      <td className="py-3 px-3">
                        <span className="text-[#64748B] font-mono text-[11px]">
                          {row.id}.
                        </span>{" "}
                        <span
                          className={
                            row.highlight
                              ? "text-green-400 font-semibold"
                              : "text-white"
                          }
                        >
                          {row.name}
                        </span>
                        <br />
                        <span className="text-[10px] text-[#64748B]">
                          {row.note}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.ecg}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.bioz}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.temp}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">
                        {row.sweat}
                      </td>
                      <td className="py-3 px-3 text-center text-white font-mono">
                        {row.bom}
                      </td>
                      <td className="py-3 px-3 text-center text-white font-mono">
                        {row.power}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Power budget — 4-in-1 */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              四合一系统功耗预算
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                        子系统
                      </th>
                      <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                        功耗
                      </th>
                      <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                        占比
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      ["ECG AFE", "0.3–1.0 mW", "5–15%"],
                      ["BioZ (含激励)", "1.0–3.0 mW", "20–40%"],
                      ["体温传感器", "0.01–0.05 mW", "≈1%"],
                      ["ISE AFE + 传感器", "0.3–1.5 mW", "5–20%"],
                      ["MCU DSP", "0.5–2.0 mW", "10–25%"],
                      ["BLE TX (平均)", "1.0–3.0 mW", "20–40%"],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 text-white">{row[0]}</td>
                        <td className="py-3 px-3 text-center text-white font-mono">
                          {row[1]}
                        </td>
                        <td className="py-3 px-3 text-center text-[#64748B] font-mono">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-green-500/20 bg-green-500/5">
                      <td className="py-3 px-3 text-green-400 font-semibold">
                        四合一总计
                      </td>
                      <td className="py-3 px-3 text-center text-green-400 font-mono font-semibold">
                        3.5–9.5 mW
                      </td>
                      <td className="py-3 px-3 text-center text-green-400 font-mono font-semibold">
                        100%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <GlassCard className="glow-green border-green-500/20">
                <h4 className="text-sm font-semibold text-white mb-3">
                  电池寿命估算
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#94A3B8]">
                        200 mAh Li-Po (可充电)
                      </span>
                      <span className="text-green-400 font-mono font-semibold">
                        48–60 小时
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                    <p className="text-[10px] text-[#64748B] mt-1">
                      四合一，6 mW 平均功耗，80% 放电深度
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#94A3B8]">
                        三合一 (无汗液)
                      </span>
                      <span className="text-green-400 font-mono font-semibold">
                        60–80 小时
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#94A3B8]">
                        CR2032 纽扣电池
                      </span>
                      <span className="text-green-400 font-mono font-semibold">
                        18–25 小时
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "35%" }}
                      />
                    </div>
                  </div>
                </div>
                <DataHighlight>
                  <p className="text-base text-[#94A3B8] leading-relaxed">
                    <span className="text-green-400 font-semibold">
                      降功耗策略：
                    </span>
                    ISE 传感器仅在检测到出汗后通电（汗水检测电极触发）；
                    BioZ 激励在静息状态下改为间歇模式（每 10s 激励 1s）。
                    优化后四合一可提升至 70-90 小时。
                  </p>
                </DataHighlight>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 4: 关键集成挑战 (extended for sweat)                   */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="集成挑战与解决方案"
            subtitle="四合一系统面临八个核心工程挑战——从电磁兼容到汗液路由，从热管理到数据同步。"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "ECG × BioZ × ISE 串扰",
                severity: "high",
                body: (
                  <>
                    <p className="mb-3">
                      四合一系统有三条独立的模拟信号链路共存于同一 PCB 和同一皮肤区域：
                      μV 级 ECG、50kHz BioZ 激励、以及 DC/超低频 ISE 电位。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          <span className="text-white font-semibold">
                            频域天然隔离：
                          </span>
                          ECG 0.05-150Hz / BioZ 50kHz / ISE DC-0.1Hz —
                          三个信号频带不重叠，硬件滤波器即可实现初步隔离。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          <span className="text-white font-semibold">
                            TDM 时分复用：
                          </span>
                          MAX30001 在 ECG 采样窗口暂停 BioZ 激励；ISE 测量在 BioZ 非活跃期触发。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          3.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          <span className="text-white font-semibold">
                            物理间距 &gt;5mm：
                          </span>
                          ISE 传感器与 ECG/BioZ 电极间保持最小间距，模拟域走线不平行。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "汗液引流与电极共存",
                severity: "high",
                body: (
                  <>
                    <p className="mb-3">
                      胸带前中心区域需要同时容纳：心电图电极、BioZ 激励/感应电极、以及
                      汗液 ISE 传感器+微流控引流通道。空间高度拥挤。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          <span className="text-white font-semibold">
                            层叠设计：
                          </span>
                          亲水性引流织物覆盖在 ECG 电极上方（不阻断电气接触），汗液在织物层内横向流动至 ISE 腔室。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          <span className="text-white font-semibold">
                            FLOWBIO 验证：
                          </span>
                          职业车手在环法级比赛中同时使用 HR 胸带 + FLOWBIO ISE 模块，
                          证明了两者在物理和电气上可共存。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "体温传感器热隔离",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      PCB 上 MCU 和 BLE PA 的自身发热通过铜箔传导至 TMP117，产生
                      ±0.2-0.5°C 的测量误差。四合一 PCB 功率密度更高，问题更突出。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          PCB 热隔离槽 + 传感器凸出设计，MCU 自热动态补偿模型。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "多速率数据同步",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      ECG 250Hz / BioZ 64Hz / ISE 1Hz / 温度 1Hz / IMU 100Hz —
                      五条数据流必须在时域上精确对齐才能进行跨传感器融合。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          RTC 硬件时间戳 (±30.5μs) + 统一数据包打包（每 400ms 一帧，
                          含序列号）。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "ISE 电极寿命",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      ISE 离子载体膜在反复汗液接触后会逐渐降解，灵敏度漂移约 2-5%/月。
                      此外盐结晶和生物污染也会影响精度。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          可更换卡匣设计（每 3 个月更换，$5-10/个）。出厂校准 + Nernst
                          斜率温度补偿保证精度。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "出汗延迟",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      运动开始后需要 3-8 分钟才能收集到足够汗液。在出汗之前 ISE
                      传感器无数据输出。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          汗液检测电极触发 ISE 上电。出汗前使用 HR + 皮肤温度作为水合状态代理指标。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "BLE / ANT+ 协议扩展",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      现有标准 Profile 无法覆盖汗液生化数据（Na⁺/K⁺/出汗率）。
                      需要自定义 GATT 特征。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          自定义 Sweat Analysis Service（Na⁺、K⁺、皮肤电导、出汗率），
                          与标准 Heart Rate + Health Thermometer + GHS v1.0 并列。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "认证复杂度",
                severity: "high",
                body: (
                  <>
                    <p className="mb-3">
                      四合一跨越心率（Class II 510k）、体温（Class II）、呼吸率（Class
                      II）和汗液分析（Novel — 可能需要 De Novo 分类）。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-base text-[#94A3B8]">
                          分阶段：General Wellness → 510(k) 心率 → 扩展 510(k)
                          呼吸+体温 → 独立 De Novo（汗液分析诊断声明）。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
            ].map((challenge) => {
              const severityConfig: Record<
                string,
                { text: string; className: string }
              > = {
                high: {
                  text: "高优先级",
                  className:
                    "text-red-400 bg-red-500/10 border-red-500/20",
                },
                medium: {
                  text: "中优先级",
                  className:
                    "text-amber-400 bg-amber-500/10 border-amber-500/20",
                },
              };
              const sc =
                severityConfig[challenge.severity] || severityConfig.medium;

              return (
                <GlassCard key={challenge.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-sm font-semibold text-white">
                      {challenge.title}
                    </h4>
                    <span
                      className={
                        "text-xs px-2 py-0.5 rounded-full border " +
                        sc.className
                      }
                    >
                      {sc.text}
                    </span>
                  </div>
                  <div className="text-base text-[#94A3B8] leading-relaxed">
                    {challenge.body}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 5: 推荐产品形态                                        */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="推荐产品形态"
            subtitle="基于四合一架构的参考工业设计。核心思路延续 Polar H10 的分离式电子模块设计，汗液 ISE 传感器以可更换卡匣形式集成。"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "胸带主体",
                items: [
                  "医疗级导电硅胶干电极 (ECG+BioZ)",
                  "ISE 汗液传感器卡匣插槽 (前中心)",
                  "亲水性引流织物层",
                  "IP67 防水 + 可水洗织物",
                  "可调节弹性带 (60-100cm)",
                  "4 电极配置 + 2 ISE 触点",
                ],
              },
              {
                title: "电子模块",
                items: [
                  "尺寸目标: 65 × 38 × 9 mm",
                  "总重: &lt;50g (含模块+卡匣)",
                  "USB-C 磁吸充电",
                  "LED: 配对/充电/低电量/汗液就绪",
                  "MAX30001 + TMP117 + LMP91000 + nRF52840",
                  "固件 OTA 空中升级",
                ],
              },
              {
                title: "ISE 消耗件",
                items: [
                  "Na⁺/K⁺ 双通道离子载体膜",
                  "卡匣式设计，卡扣安装",
                  "寿命: ~3 个月或 100 次使用",
                  "价格: $5-10/个",
                  "出厂校准 + Nernst 温度补偿",
                  "形成稳定的配件收入流",
                ],
              },
              {
                title: "用户交互",
                items: [
                  "卡扣连接自动开机",
                  "NFC 触碰配对 (可选)",
                  "汗液就绪 LED 指示",
                  "手机 App 配置参数",
                  "出汗后 ISE 自动上电",
                  "无汗时 ISE 休眠省电",
                ],
              },
            ].map((card) => (
              <GlassCard key={card.title}>
                <h4 className="text-sm font-semibold text-white mb-3">
                  {card.title}
                </h4>
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-[#94A3B8] flex items-start gap-2"
                    >
                      <span className="text-green-500/70 mt-1 shrink-0">
                        &#x2022;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 6: 推荐路径总结                                         */}
      {/* ============================================================ */}
      <section
        className="py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,197,94,0.08), transparent 70%), radial-gradient(ellipse 50% 30% at 50% 0%, rgba(8,145,178,0.05), transparent 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <GlassCardElevated className="glow-green border-green-500/20 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs text-green-400 font-semibold">
                  终局方案
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                MAX30001 + TMP117 + LMP91000 + nRF52840
              </h2>
              <p className="text-lg text-gradient-green max-w-2xl mx-auto">
                四合一胸带的全栈最优解 — 一条 PCB，四条信号链路，六项 AI 教练能力
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "核心芯片 BOM",
                  value: "$14-26",
                  detail: "MAX30001 + TMP117 + LMP91000 + nRF52840 + ISE 膜",
                },
                {
                  label: "连续工作功耗",
                  value: "3.5-9.5 mW",
                  detail: "可优化至 2.5 mW (间歇 ISE + BioZ)",
                },
                {
                  label: "电池续航",
                  value: "48-60 小时",
                  detail: "200 mAh Li-Po，6 mW 平均功耗",
                },
                {
                  label: "AI 教练能力",
                  value: "6 项",
                  detail: "训练 / 热应激 / 补水 / 恢复 / 配速 / 营养",
                },
              ].map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <p className="text-[10px] text-[#64748B] font-mono mb-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xl font-mono font-bold text-green-400 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[#64748B]">{stat.detail}</p>
                </GlassCard>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: "技术成熟度",
                  description:
                    "MAX30001、TMP117、LMP91000、nRF52840 均为大规模量产芯片。FLOWBIO 已在职业赛场验证胸带 ISE 的可行性。四条信号链路均有成熟的参考设计。",
                },
                {
                  title: "生态兼容性",
                  description:
                    "BLE 标准服务（HR + 体温 + GHS）+ 自定义 Sweat Service + ANT+ 借道策略。nRF Connect SDK 已开源 MAX30001 和 LMP91000 的驱动代码。",
                },
                {
                  title: "竞争护城河",
                  description:
                    "四合一不是堆料——跨传感器融合算法（脱水指数、热负荷、VT1/VT2）需要四条数据流的精确时域对齐。这是纯硬件公司无法通过简单拆解复制的软件壁垒。",
                },
              ].map((item) => (
                <GlassCard key={item.title}>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-base text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              ))}
            </div>

            <DataHighlight>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                <span className="text-green-400 font-semibold">核心结论：</span>
                四合一的本质不是多传感器堆叠，而是「数据向上流动、决策向下传递」的四层架构。
                每一层的价值都建立在下层数据的质量之上。选择量产验证过的芯片方案（MAX30001 +
                TMP117 + LMP91000 + nRF52840），将工程资源集中到跨传感器融合算法和 AI
                教练决策引擎上——这才是四合一胸带的不可替代性所在。
              </p>
            </DataHighlight>
          </GlassCardElevated>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
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
              返回技术全景
            </Link>
            <Link
              href="/technology/sweat"
              className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 px-6 py-2.5 transition-colors text-sm"
            >
              深入了解汗液分析
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
                <path d="M5 3L9 7l-4 4" />
              </svg>
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2.5 transition-colors text-sm"
            >
              查看商业前景
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
                <path d="M5 3L9 7l-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
