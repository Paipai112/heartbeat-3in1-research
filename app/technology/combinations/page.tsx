import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";

/* ------------------------------------------------------------------ */
/*  Sub-components used only in this page                             */
/* ------------------------------------------------------------------ */

function MatrixCard({
  name,
  bom,
  price,
  complexity,
  complexityLabel,
  chips,
  highlight = false,
}: {
  name: string;
  bom: string;
  price: string;
  complexity: "低" | "中" | "高";
  complexityLabel: string;
  chips: string;
  highlight?: boolean;
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

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"glass-card p-6 " + className}>
      {children}
    </div>
  );
}

function GlassCardElevated({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"glass-card-elevated p-8 " + className}>
      {children}
    </div>
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
              : "text-green-400 bg-green-500/10 border-green-500/20")
          }
        >
          {badge.text}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
        {title}
      </h2>
      <p className="text-[#94A3B8] max-w-xl">{subtitle}</p>
    </div>
  );
}

function DataHighlight({ children }: { children: React.ReactNode }) {
  return <div className="data-highlight my-4">{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function CombinationsPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="硬件组合方案"
        titleGradient="从二合一到三合一"
        subtitle="心率 + 呼吸 + 核心体温 — 多种组合路径的工程实现与产品形态"
        badge={{ text: "System Integration", color: "green" }}
        description="三合一胸带不是三个传感器的简单叠加。本页系统分析每一种组合方案的硬件架构、芯片选型、BOM 成本、功耗预算和推荐产品形态。"
      />

      {/* ============================================================ */}
      {/* Section 1: 方案全景矩阵                                        */}
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
            title="方案全景矩阵"
            subtitle="从单一功能基准到三合一的完整组合谱系。每种方案均有独立的BOM成本、复杂度评估和关键芯片选型。"
          />

          {/* Row 1: 单一功能基准 */}
          <div className="mb-8">
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第一行: 单一功能基准
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <MatrixCard
                name="纯心率 (HR Only)"
                bom="$4-8"
                price="$99-149"
                complexity="低"
                complexityLabel="低"
                chips="MAX30001 / AD8233"
              />
              <MatrixCard
                name="纯呼吸 (Respiration Only)"
                bom="$5-10"
                price="$129-179"
                complexity="低"
                complexityLabel="低"
                chips="AD5940 / ADS1292R"
              />
              <MatrixCard
                name="纯体温 (Core Temp Only)"
                bom="$3-7"
                price="$149-229"
                complexity="低"
                complexityLabel="低"
                chips="TMP117 / MAX30205"
              />
            </div>
          </div>

          {/* Row 2: 二合一 */}
          <div className="mb-8">
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第二行: 二合一方案
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
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
                name="呼吸 + 核心体温"
                bom="$8-14"
                price="$129-179"
                complexity="中"
                complexityLabel="中"
                chips="AD5940 + TMP117"
              />
            </div>
          </div>

          {/* Row 3: 三合一 */}
          <div>
            <h3 className="font-heading text-base font-semibold text-[#64748B] mb-4">
              第三行: 三合一方案
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3 max-w-md">
                <MatrixCard
                  name="HR + 呼吸 + 核心体温"
                  bom="$10-18"
                  price="$199-299"
                  complexity="高"
                  complexityLabel="高"
                  chips="MAX30001 + TMP117 + nRF52840"
                  highlight
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 2: 方案A — 三合一全栈 ⭐推荐                            */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="方案 A: 三合一全栈 ⭐ 推荐"
            subtitle="MAX30001 + TMP117 + nRF52840 — 当前综合最优的三合一芯片方案，兼顾精度、功耗、成本和量产成熟度。"
            badge={{ text: "Primary Recommendation", color: "amber" }}
          />

          {/* 2.1 系统架构图 */}
          <GlassCardElevated className="glow-green border-green-500/20 mb-10">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              2.1 系统架构图
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5">
              三合一胸带的完整信号链路。ECG 和 BioZ 共用 MAX30001 单芯片，体温由独立的 TMP117 采集，
              所有数据通过 SPI/I2C 汇聚到 nRF52840 MCU，经片上 DSP 处理后通过 BLE + ANT+ 双模并发传输。
            </p>

            <div className="overflow-x-auto">
              <pre className="text-xs font-mono leading-relaxed p-5 rounded-xl border border-green-500/20 bg-[#0A1120]/80 text-green-400/90 whitespace-pre">
{`  ┌─────────────────────────────────────────────────────────────────┐
  │                    三合一胸带完整信号链路                          │
  ├─────────────────────────────────────────────────────────────────┤
  │                                                                 │
  │  ┌──────────────┐                                                │
  │  │ ECG 电极对   │─── 干电极导电硅胶, 接触阻抗 < 50kΩ              │
  │  │ (2 electrodes)│                                               │
  │  └──────┬───────┘                                                │
  │         │ 差分模拟信号 (±1-2 mV)                                  │
  │         ▼                                                        │
  │  ┌──────────────┐      SPI (4-wire, 4 MHz)                       │
  │  │  MAX30001    │──────────────────────────────┐                  │
  │  │              │                              │                  │
  │  │  ECG AFE     │  18-bit ΔΣ ADC, 512 sps      │                  │
  │  │  BioZ AFE    │  20-bit ΔΣ ADC, 64 sps       │                  │
  │  │  激励源      │  50 kHz, 可编程电流           │                  │
  │  │  R-R 检测    │  硬件心跳检测引擎              │                  │
  │  └──────┬───────┘                              │                  │
  │         │                                       ▼                  │
  │  ┌──────┴───────┐                       ┌──────────────┐          │
  │  │ BioZ 电极对  │                       │  nRF52840    │          │
  │  │(2 electrodes)│                       │              │          │
  │  └──────────────┘                       │ ARM Cortex   │          │
  │                                         │     -M4F     │          │
  │  ┌──────────────┐  I2C (400 kHz)        │              │          │
  │  │   TMP117     │──────────────────────▶│  64 MHz      │          │
  │  │              │                       │              │          │
  │  │  ±0.1°C 精度 │  16-bit 数字输出      │  BLE 5.4     │──────────▶ 手机
  │  │  皮肤温度     │                       │  ANT+        │──────────▶ 码表
  │  └──────────────┘                       │  SPI Master  │          │
  │                                         │  I2C Master  │          │
  │  ┌──────────────┐  I2C (400 kHz)        │  GPIO        │          │
  │  │   IMU        │──────────────────────▶│  RTC         │          │
  │  │  (LSM6DSO)   │                       └──────────────┘          │
  │  │  加速度计     │  运动伪影消除参考                                │
  │  │  陀螺仪       │                                                │
  │  └──────────────┘                                                │
  │                                                                 │
  │  ┌─────────────────────────────────────────────────────────────┐│
  │  │ 电源管理:                                                    ││
  │  │   3.7V Li-Po → LDO 3.3V (模拟) + DC-DC 1.8V (数字)          ││
  │  │   → 模拟域 (MAX30001) 与数字域 (nRF52840) 独立供电,           ││
  │  │     减少数字噪声耦合到 ECG/BioZ 前端                          ││
  │  └─────────────────────────────────────────────────────────────┘│
  └─────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>

            <p className="text-xs text-[#64748B] mt-4">
              关键设计决策: ECG 与 BioZ 共享电极对，通过 MAX30001 内置的时分复用 (TDM) 机制
              隔离两组测量。激励频率 50kHz 远高于 ECG 信号频带 (0.05-150Hz)，频域天然分离。
            </p>
          </GlassCardElevated>

          {/* 2.2 六种芯片方案对比表 */}
          <div className="mb-10">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              2.2 六种芯片方案对比
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5">
              从三芯片精简方案到多 AFE 灵活方案，覆盖不同精度、成本和功耗需求的完整谱系。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">方案</th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">ECG 芯片</th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">BioZ 芯片</th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">体温芯片</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">BOM 成本</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">总功耗</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">推荐度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    {
                      id: "A",
                      name: "MAX30001+TMP117",
                      ecg: "MAX30001 (ECG AFE)",
                      bioz: "MAX30001 (BioZ AFE)",
                      temp: "TMP117",
                      bom: "$10-18",
                      power: "~3 mW",
                      rating: "★★★★★",
                      tag: "首选",
                      highlight: true,
                      analysis:
                        "单芯片解决 ECG+BioZ 双参数，BOM 最精简，量产风险最低。MAX30001 已在 Polar/Garmin 等一线品牌中大量验证，TMP117 提供医疗级 ±0.1°C 精度。推荐所有新项目首选此方案。",
                    },
                    {
                      id: "B",
                      name: "AFE4960+TMP117",
                      ecg: "AFE4960 (ECG AFE)",
                      bioz: "AFE4960 (BioZ AFE)",
                      temp: "TMP117",
                      bom: "$12-21",
                      power: "~3 mW",
                      rating: "★★★★★",
                      tag: "最高精度",
                      highlight: false,
                      analysis:
                        "TI AFE4960 是 MAX30001 的直接竞品，24-bit ADC 精度略优于 MAX30001 的 18-bit，且内置更丰富的数字滤波选项。但生态文档和量产案例不如 MAX30001 丰富。适合追求极致 ECG 精度的医疗级产品。",
                    },
                    {
                      id: "C",
                      name: "AD5940+MAX30001+MAX30205",
                      ecg: "MAX30001 (ECG AFE)",
                      bioz: "AD5940 (独立 BioZ)",
                      temp: "MAX30205",
                      bom: "$18-27",
                      power: "~5 mW",
                      rating: "★★★★",
                      tag: "最灵活",
                      highlight: false,
                      analysis:
                        "双 AFE 独立架构，AD5940 专做 BioZ（ADI 旗舰阻抗分析芯片），MAX30001 专做 ECG。灵活性最高，可独立调优每条信号链路。BOM 成本最高，适合研究级产品或需要深度定制 BioZ 参数的项目。",
                    },
                    {
                      id: "D",
                      name: "AD8233+AD5941+NTC",
                      ecg: "AD8233 (16-bit)",
                      bioz: "AD5941",
                      temp: "NTC 热敏电阻",
                      bom: "$11-17",
                      power: "~4 mW",
                      rating: "★★★",
                      tag: "最低成本",
                      highlight: false,
                      analysis:
                        "AD8233 是 Analog Devices 经典的 ECG AFE（单导联），成本极低但精度仅 16-bit，缺乏硬件 R-R 检测。AD5941 是 AD5940 的简化版。NTC 测温精度仅 ±0.5°C。适合对成本极度敏感的项目，不太推荐用于医疗级产品。",
                    },
                    {
                      id: "E",
                      name: "MAX86176+TMP117",
                      ecg: "MAX86176 (ECG+PPG)",
                      bioz: "MAX86176 (BioZ)",
                      temp: "TMP117",
                      bom: "$17-28",
                      power: "~4 mW",
                      rating: "★★★",
                      tag: "功能最全",
                      highlight: false,
                      analysis:
                        "MAX86176 集成 ECG+BioZ+PPG+SpO2 四种传感模式，功能最全面。但 BioZ 性能不如 MAX30001/AD5940 专注，且芯片封装较大（7×4 mm WLP）。适合想要额外光学传感（血氧、PPG 心率备份）的产品。",
                    },
                    {
                      id: "F",
                      name: "AD8233+分立+NTC",
                      ecg: "AD8233 (16-bit)",
                      bioz: "分立电路（运放+激励源）",
                      temp: "NTC 热敏电阻",
                      bom: "$5-10",
                      power: "~3 mW",
                      rating: "★★",
                      tag: "最精简",
                      highlight: false,
                      analysis:
                        "极限成本方案，用运放 + 模拟开关构建 BioZ 激励和检测电路。BOM 最低但开发难度极高——分立 BioZ 的信号质量受 PCB 布局、元件容差和温度漂移影响很大。仅建议对模拟电路设计能力极强的团队考虑。",
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
                      </td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.ecg}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.bioz}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">{row.temp}</td>
                      <td className="py-3 px-3 text-center text-white font-mono">
                        {row.bom}
                      </td>
                      <td className="py-3 px-3 text-center text-white font-mono">
                        {row.power}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div>
                          <span
                            className={
                              row.highlight
                                ? "text-green-400"
                                : "text-amber-400"
                            }
                          >
                            {row.rating}
                          </span>
                          <br />
                          <span
                            className={
                              "text-[10px] px-1.5 py-0.5 rounded-full border " +
                              (row.highlight
                                ? "text-green-400 bg-green-500/10 border-green-500/20"
                                : "text-[#94A3B8] bg-white/[0.04] border-white/[0.08]")
                            }
                          >
                            {row.tag}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Per-scheme analysis */}
            <div className="mt-8 space-y-4">
              {[
                {
                  id: "A",
                  title: "方案 A: MAX30001+TMP117 — 首选方案",
                  color: "green",
                  text: "单芯片解决 ECG+BioZ 双参数，BOM 最精简，量产风险最低。MAX30001 内置硬件 R-R 检测引擎和 BioZ 激励源，TMP117 提供医疗级 ±0.1°C 精度，nRF52840 支持 BLE + ANT+ 双模并发。三颗主芯片 + 电源管理 + 外围无源器件，总 BOM 可控制在 $18 以内（含 PCB/连接器/电池）。适合 90% 的三合一胸带项目。",
                },
                {
                  id: "B",
                  title: "方案 B: AFE4960+TMP117 — 最高精度",
                  color: "teal",
                  text: "TI AFE4960 是 MAX30001 的主要竞争者，24-bit ΔΣ ADC 提供更高的动态范围。TI 提供完整的参考设计和评估套件 (AFE4960EVM)，开发起步相对顺利。但在穿戴式 ECG/BioZ 领域的量产案例不如 MAX30001 广泛，供应链成熟度稍弱。适合追求极致 ECG 波形质量的诊断级产品（如需要 ST 段分析的心电监护）。",
                },
                {
                  id: "C",
                  title: "方案 C: AD5940+MAX30001+MAX30205 — 最灵活",
                  color: "amber",
                  text: "双 AFE 架构带来最大的灵活性——可独立配置 BioZ 激励频率/幅度/波形，不受 ECG 信号链路约束。AD5940 是 ADI 旗舰阻抗分析前端，支持频率扫描和复阻抗测量，适合需要多频 BioZ 分析（如区分细胞内/外液）的研究场景。缺点是 BOM 高、PCB 面积大、功耗高。适合科研级产品或需要深度定制 BioZ 参数的项目。",
                },
                {
                  id: "D",
                  title: "方案 D: AD8233+AD5941+NTC — 低配降本",
                  color: "slate",
                  text: "针对成本敏感项目的降本方案。AD8233 缺少硬件 R-R 检测，需要通过 MCU 软件算法实现（增加 CPU 开销）。NTC 测温精度有限且需要额外校准。整体系统性能相比方案 A 有明显下降，但在严格控制 BOM 的场景下是合理的选择。",
                },
                {
                  id: "E",
                  title: "方案 E: MAX86176+TMP117 — 功能最全",
                  color: "slate",
                  text: "MAX86176 集成 ECG + BioZ + PPG + SpO2，适合希望在一个产品中覆盖多种传感模式的方案。但 BioZ 通道设计主要用于呼吸率估计，不支持高精度潮气量计算所需的复阻抗分析。PPG 通道可以作为 ECG 的备用心率源（在电极接触不良时切换）。芯片封装较大（7×4 mm WLP），对微型化设计不友好。",
                },
                {
                  id: "F",
                  title: "方案 F: AD8233+分立+NTC — 极限精简",
                  color: "slate",
                  text: "最简方案，风险最高。分立 BioZ 电路对 PCB 布局高度敏感，信号质量在量产中一致性难以保证。仅建议团队具有深厚的模拟电路设计经验（运放选型、激励源设计、I/V 转换、同步解调）时考虑。更多是对比参考——说明使用集成 AFE 多花的 $5-10 是值得的。",
                },
              ].map((item) => {
                const borderClass =
                  item.color === "green"
                    ? "border-l-green-500"
                    : item.color === "teal"
                      ? "border-l-teal-500"
                      : item.color === "amber"
                        ? "border-l-amber-500"
                        : "border-l-[#475569]";

                return (
                  <div
                    key={item.id}
                    className={
                      "glass-card p-4 border-l-2 " + borderClass
                    }
                  >
                    <h4 className="text-sm font-semibold text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2.3 功耗预算详细拆解 */}
          <div className="mb-10">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              2.3 功耗预算详细拆解
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5">
              基于方案 A (MAX30001 + TMP117 + nRF52840) 的实测功耗分析。
              总功耗约 3 mW，200 mAh 锂聚合物电池可支持 60-80 小时连续工作。
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 功耗表 */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">子系统</th>
                      <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">工作模式</th>
                      <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">典型功耗</th>
                      <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">占比</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      ["ECG AFE (MAX30001)", "连续 512 sps", "0.3 - 1.0 mW", "10-20%"],
                      ["BioZ (含激励源)", "连续 64 sps, 50 kHz 激励", "1.0 - 3.0 mW", "35-50%"],
                      ["温度传感器 (TMP117)", "周期 1 Hz 采样", "0.01 - 0.05 mW", "<1%"],
                      ["MCU (nRF52840)", "低功耗 DSP 模式 @ 16 MHz", "0.5 - 2.0 mW", "15-30%"],
                      ["BLE TX (平均)", "<1% 占空比, 1 Mbps", "1.0 - 5.0 mW", "20-40%"],
                      ["IMU (LSM6DSO)", "周期 100 Hz", "0.2 - 0.5 mW", "5-10%"],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 text-white">{row[0]}</td>
                        <td className="py-3 px-3 text-center text-[#94A3B8]">
                          {row[1]}
                        </td>
                        <td className="py-3 px-3 text-center text-white font-mono">
                          {row[2]}
                        </td>
                        <td className="py-3 px-3 text-center text-[#64748B] font-mono">
                          {row[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-green-500/20 bg-green-500/5">
                      <td className="py-3 px-3 text-green-400 font-semibold" colSpan={2}>
                        总计 (连续工作)
                      </td>
                      <td className="py-3 px-3 text-center text-green-400 font-mono font-semibold">
                        3 - 10 mW
                      </td>
                      <td className="py-3 px-3 text-center text-green-400 font-mono font-semibold">
                        100%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* 电池寿命估算 */}
              <div className="space-y-4">
                <GlassCard className="glow-green border-green-500/20">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    电池寿命估算
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#94A3B8]">
                          200 mAh Li-Po 可充电电池
                        </span>
                        <span className="text-green-400 font-mono font-semibold">
                          60-80 小时
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "80%" }}
                        />
                      </div>
                      <p className="text-[10px] text-[#64748B] mt-1">
                        基于 5 mW 平均功耗, 3.7V 电压, 80% 放电深度
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#94A3B8]">
                          CR2032 纽扣电池 (225 mAh)
                        </span>
                        <span className="text-green-400 font-mono font-semibold">
                          20-30 小时
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "45%" }}
                        />
                      </div>
                      <p className="text-[10px] text-[#64748B] mt-1">
                        非充电方案，适合追求极致轻量化的产品形态
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#94A3B8]">
                          400 mAh Li-Po 可充电电池
                        </span>
                        <span className="text-green-400 font-mono font-semibold">
                          120-160 小时
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <p className="text-[10px] text-[#64748B] mt-1">
                        大容量方案，适合超长续航需求的户外运动场景
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <DataHighlight>
                  <p className="text-xs text-[#94A3B8]">
                    <span className="text-green-400 font-semibold">关键洞察: </span>
                    BioZ 激励是最大功耗来源（占总功耗 35-50%）。如果场景不需要连续呼吸监测，
                    可通过间歇激励（每 10 秒激励 1 秒）将 BioZ 功耗降至 0.1-0.3 mW，
                    总续航有望提升至 100+ 小时。
                  </p>
                </DataHighlight>
              </div>
            </div>
          </div>

          {/* 2.4 推荐产品形态 */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              2.4 推荐产品形态
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5">
              基于方案 A 的参考工业设计方向。核心思路借鉴 Polar H10 的分离式电子模块设计，
              兼顾运动稳固性、皮肤舒适度和维护便利性。
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "胸带主体",
                  items: [
                    "医疗级导电硅胶干电极",
                    "4 电极配置 (2 ECG + 2 BioZ)",
                    "电极可共享——2对 ECG/BioZ 共用亦可",
                    "IP67 防水等级",
                    "可水洗织物 + 防滑硅胶条",
                    "可调节弹性带 (60-100 cm 胸围)",
                  ],
                },
                {
                  title: "电子模块 (可拆卸)",
                  items: [
                    "尺寸目标: 60 × 35 × 8 mm",
                    "总重 (含模块): <40 g",
                    "USB-C 磁吸充电",
                    "LED 指示: 配对/充电/低电量/错误",
                    "Polar H10 兼容卡扣标准 (可选)",
                    "PCB: 4 层 FR4 / 6 层柔性可选",
                  ],
                },
                {
                  title: "电极规格",
                  items: [
                    "材质: 医用导电硅胶 (邵氏 A40-50)",
                    "接触面积: ≥ 3 cm² 每电极",
                    "电极间距: ECG 50-80 mm, BioZ 30-50 mm",
                    "接触阻抗: < 50 kΩ (目标)",
                    "干电极 —— 无需导电凝胶",
                    "定期清洁维护即可",
                  ],
                },
                {
                  title: "用户交互",
                  items: [
                    "开机: 卡扣连接自动上电",
                    "关机: 断开卡扣自动断电",
                    "LED 指示电池状态",
                    "NFC 触碰配对 (可选)",
                    "手机 App 配置参数",
                    "固件 OTA 空中升级",
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3: 方案B — HR + 呼吸 (二合一)                          */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="方案 B: HR + 呼吸 (二合一)"
            subtitle="心率 + 呼吸率 —— 最简单的双参数方案，单芯片 MAX30001 即可实现。适合不需要核心体温的训练场景。"
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="lg:col-span-2">
              <h3 className="text-base font-semibold text-white mb-4">
                技术方案与定位
              </h3>

              <div className="space-y-4 text-xs text-[#94A3B8] leading-relaxed">
                <p>
                  <span className="text-white font-semibold">适用场景: </span>
                  训练强度监测 + 呼吸效率评估。面向跑步、骑行、铁人三项等高强度有氧运动爱好者，
                  他们对心率训练有刚性需求，同时想要呼吸数据来优化节奏和了解有氧/无氧转换点，
                  但不需要核心体温监测。
                </p>

                <p>
                  <span className="text-white font-semibold">硬件架构: </span>
                  MAX30001 (ECG + BioZ) + nRF52840 —— 仅两颗主芯片即可实现双参数采集。
                  这是所有方案中最精简的二合一架构：MAX30001 单芯片同时输出 ECG 原始波形
                  (512 sps) 和 BioZ 呼吸阻抗波形 (64 sps)，无需额外传感器或 AFE。
                </p>

                <p>
                  <span className="text-white font-semibold">核心芯片 BOM: </span>
                  $8-14。包括 MAX30001 ($4-7), nRF52840 ($3-5),
                  电源管理 IC ($0.5-1), 无源器件 ($0.5-1)。
                  总制造成本 (含 PCB/组装/测试): $15-25。
                </p>

                <p>
                  <span className="text-white font-semibold">产品定位: </span>
                  进阶训练胸带, $149-199。对标 Garmin HRM-Pro+ ($129) 和 Polar H10 ($89)，
                  但提供原生的 BioZ 呼吸监测，而非 Garmin 的加速度计间接估算。
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-base font-semibold text-white mb-4">
                优劣势分析
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                  <h4 className="text-green-400 font-semibold mb-1">优势</h4>
                  <ul className="space-y-1 text-[#94A3B8]">
                    <li>&#x2022; 最低复杂度，最快上市时间</li>
                    <li>&#x2022; 单芯片双功能 (ECG+BioZ)</li>
                    <li>&#x2022; BOM 成本低，利润空间大</li>
                    <li>&#x2022; 功耗最低，续航最长</li>
                    <li>&#x2022; 固件复杂度最低</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-red-400 font-semibold mb-1">劣势</h4>
                  <ul className="space-y-1 text-[#94A3B8]">
                    <li>&#x2022; 缺少核心体温差异化功能</li>
                    <li>&#x2022; 竞争激烈 (Polar/Garmin 已有产品)</li>
                    <li>&#x2022; 难以建立技术护城河</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Competitive comparison */}
          <GlassCard className="mb-8">
            <h3 className="text-base font-semibold text-white mb-4">
              竞争对比
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">产品</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">心率检测</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">呼吸检测</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">呼吸技术</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">体温</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">售价</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="bg-green-500/5 border border-green-500/10">
                    <td className="py-3 px-3 text-green-400 font-semibold">
                      HeartBeat HR+BR ⭐
                    </td>
                    <td className="py-3 px-3 text-center text-green-400">✓ HRV</td>
                    <td className="py-3 px-3 text-center text-green-400">
                      ✓ 呼吸率 + 潮气量
                    </td>
                    <td className="py-3 px-3 text-center text-green-400">
                      BioZ 原生
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $149-199
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">Polar H10</td>
                    <td className="py-3 px-3 text-center text-white">✓ HRV</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      仅 EDR 衍生
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      EDR (ECG衍生)
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $89
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">Garmin HRM-Pro+</td>
                    <td className="py-3 px-3 text-center text-white">✓ HRV</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      间接估算
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      加速度计
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $129
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">Tymewear VitalPro</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white">
                      ✓ 呼吸率
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      RIP / 应变
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $199
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DataHighlight>
              <p className="text-xs text-[#94A3B8]">
                <span className="text-green-400 font-semibold">核心差异化: </span>
                Polar H10 虽有 ECG 可衍生呼吸率 (EDR 法)，但无原生 BioZ 硬件，
                无法测量潮气量；Garmin HRM-Pro+ 依赖加速度计间接估算呼吸率，
                RMSE ~3.77 bpm（文献实测）远不如 BioZ 的 RMSE ~1 bpm。
                本方案通过 MAX30001 的原生 BioZ 通道实现呼吸率和潮气量的直接测量，
                是现有消费级胸带无法提供的功能。
              </p>
            </DataHighlight>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                目标用户画像
              </h4>
              <p className="text-xs text-[#94A3B8]">
                严肃跑者、自行车手、铁人三项运动员 —— 需要精准心率数据和呼吸反馈来优化
                训练强度和节奏，对核心体温需求较低（或已通过其他方式监测）。
              </p>
            </div>
            <Link
              href="/technology/respiration"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-5 py-2 transition-colors text-xs"
            >
              深入了解呼吸检测 →
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 4: 方案C — HR + 核心体温 (二合一)                       */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="方案 C: HR + 核心体温 (二合一)"
            subtitle="心率 + 核心体温 —— 热适应训练和高强度耐力运动的核心数据组合。没有直接竞品，差异化空间最大。"
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="lg:col-span-2">
              <h3 className="text-base font-semibold text-white mb-4">
                技术方案与定位
              </h3>

              <div className="space-y-4 text-xs text-[#94A3B8] leading-relaxed">
                <p>
                  <span className="text-white font-semibold">适用场景: </span>
                  热适应训练、高温环境运动、军事/工业高温作业安全监测。核心体温是热应激
                  (Heat Stress) 的关键指标——当核心温度超过 38.5°C 时运动表现显著下降，
                  超过 40°C 有热射病风险。同时提供实时心率数据用于强度管理和热负荷关联分析。
                </p>

                <p>
                  <span className="text-white font-semibold">硬件架构: </span>
                  方案 A: MAX30001 (ECG) + TMP117 + nRF52840 (推荐)
                  或者方案 B: AD8233 + TMP117 + nRF52840 (降本版)。
                  MAX30001 方案 ECG 精度高且内置硬件 R-R 检测，是首选。
                  本方案的特点是 ECG AFE 不受 BioZ 通道干扰，信号质量最优。
                </p>

                <p>
                  <span className="text-white font-semibold">核心芯片 BOM: </span>
                  $6-12 (低成本版 AD8233+TMP117: $6-9 / 高性能版 MAX30001+TMP117: $9-12)。
                  不含 BioZ 通道，功耗显著低于三合一方案 (~2 mW 连续)。
                </p>

                <p>
                  <span className="text-white font-semibold">产品定位: </span>
                  热管理胸带, $179-229。目前市场无直接竞品——Polar 和 Garmin 均无核心体温功能，
                  CORE Body Temperature Monitor ($295) 有体温但无 ECG。
                  本产品填补了心率 + 核心体温一体化胸带的空白。
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-base font-semibold text-white mb-4">
                优劣势分析
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                  <h4 className="text-green-400 font-semibold mb-1">优势</h4>
                  <ul className="space-y-1 text-[#94A3B8]">
                    <li>&#x2022; ECG 精度不受 BioZ 激励干扰</li>
                    <li>&#x2022; 明确的温度差异化卖点</li>
                    <li>&#x2022; 无直接竞品，蓝海市场</li>
                    <li>&#x2022; 军事/工业 B2B 场景可拓展</li>
                    <li>&#x2022; 功耗低，续航长</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-red-400 font-semibold mb-1">劣势</h4>
                  <ul className="space-y-1 text-[#94A3B8]">
                    <li>&#x2022; 缺少呼吸数据</li>
                    <li>&#x2022; 核心体温算法的临床验证要求高</li>
                    <li>&#x2022; 用户对核心体温认知度有限</li>
                    <li>&#x2022; 热通量传感器一致性需量产验证</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Competitive positioning */}
          <GlassCard className="mb-8">
            <h3 className="text-base font-semibold text-white mb-4">
              竞争格局
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">产品</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">心率 ECG</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">核心体温</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">测温技术</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">售价</th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">一体化</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="bg-green-500/5 border border-green-500/10">
                    <td className="py-3 px-3 text-green-400 font-semibold">
                      HeartBeat HR+Temp
                    </td>
                    <td className="py-3 px-3 text-center text-green-400">✓</td>
                    <td className="py-3 px-3 text-center text-green-400">✓</td>
                    <td className="py-3 px-3 text-center text-green-400">
                      双热流法 DHF
                    </td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $179-229
                    </td>
                    <td className="py-3 px-3 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">CORE Body Temp</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-white">✓ ±0.2-0.7°C</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      单热流法 SHF
                    </td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $295
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">Polar H10</td>
                    <td className="py-3 px-3 text-center text-white">✓</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">-</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $89
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-white">Garmin HRM-Pro+</td>
                    <td className="py-3 px-3 text-center text-white">✓</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                    <td className="py-3 px-3 text-center text-[#64748B]">-</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      $129
                    </td>
                    <td className="py-3 px-3 text-center text-[#64748B]">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DataHighlight>
              <p className="text-xs text-[#94A3B8]">
                <span className="text-green-400 font-semibold">蓝海机会: </span>
                目前市场上不存在同时提供 ECG 心率和核心体温监测的胸带产品。
                CORE ($295) 仅有体温无心率，用户需要额外佩戴 Polar H10 或 Garmin 胸带——
                两设备叠加总价 $384+，且需要佩戴两条胸带。本方案以 $179-229 提供一体化解决方案，
                价格仅为竞品组合的 50%，且佩戴体验显著更优。
              </p>
            </DataHighlight>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                目标用户画像
              </h4>
              <p className="text-xs text-[#94A3B8]">
                耐力运动员（马拉松、超马、铁人三项）、高温环境运动的业余/专业选手、
                军事/消防/工业高温作业人员，以及与高温相关训练场景（热适应训练、桑拿训练）。
              </p>
            </div>
            <Link
              href="/technology/temperature"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-5 py-2 transition-colors text-xs"
            >
              深入了解体温监测 →
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 5: 方案D — 呼吸 + 核心体温 (二合一)                     */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="方案 D: 呼吸 + 核心体温 (二合一)"
            subtitle="呼吸率 + 核心体温 —— 热环境下呼吸训练的专属组合，可作为现有 ECG 设备的补充模块。"
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="lg:col-span-2">
              <h3 className="text-base font-semibold text-white mb-4">
                技术方案与定位
              </h3>

              <div className="space-y-4 text-xs text-[#94A3B8] leading-relaxed">
                <p>
                  <span className="text-white font-semibold">适用场景: </span>
                  高温环境下的呼吸训练、热适应 + 呼吸节律优化、与现有 ECG 胸带或手表搭配使用。
                  目标用户已经拥有心监测设备（如 Apple Watch、Garmin 手表或 Polar 胸带），
                  只需要呼吸和核心体温两个额外维度的数据。
                </p>

                <p>
                  <span className="text-white font-semibold">硬件架构: </span>
                  AD5940 (BioZ AFE) + TMP117 (体温) + nRF52840 (MCU/无线)。
                  AD5940 是 ADI 的专用阻抗分析前端，专为 BioZ 呼吸检测优化——支持可编程激励频率和幅度、
                  内置 DFT 引擎用于复阻抗计算，可直接输出呼吸率和潮气量估算值。
                </p>

                <p>
                  <span className="text-white font-semibold">核心芯片 BOM: </span>
                  $8-14。AD5940 ($5-8), TMP117 ($2-3), nRF52840 ($3-5)。
                  不含 ECG AFE，BOM 接近方案 B (HR+呼吸)，但功能组合完全不同。
                </p>

                <p>
                  <span className="text-white font-semibold">产品定位: </span>
                  呼吸+体温模块, $129-179。定位为"第二胸带"——与现有 ECG
                  胸带或手表互补使用。适用于热环境训练场景，呼吸数据 + 核心体温组合
                  具有独特的训练指导价值（例如评估高温下的呼吸效率变化）。
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-base font-semibold text-white mb-4">
                独特定位
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
                  <h4 className="text-teal-400 font-semibold mb-1">
                    互补而非替代
                  </h4>
                  <p className="text-[#94A3B8]">
                    此方案独特的价值主张：作为现有 ECG 设备的补充模块，
                    而非替代品。用户可以继续使用他们信任的心率监测设备
                    (Polar/Garmin/Apple Watch)，同时通过本产品获取呼吸
                    和核心体温两个增量维度。
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-amber-400 font-semibold mb-1">
                    市场风险
                  </h4>
                  <p className="text-[#94A3B8]">
                    用户是否愿意佩戴两条胸带是一个关键问题。
                    此方案的市场定位最窄，更适合作为三合一方案的
                    降级选项或 OEM 模块出售给已有 ECG 产品的品牌方。
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          <DataHighlight>
            <p className="text-xs text-[#94A3B8]">
              <span className="text-teal-400 font-semibold">策略建议: </span>
              方案 D 更适合作为技术储备而非首发产品。当方案 A (三合一) 已完成开发后，
              方案 D 可以通过裁剪 ECG 功能快速派生而出（仅需去掉 MAX30001 的 ECG 部分，
              保留 BioZ 和 TMP117）。这比独立开发方案 D 的投入产出比更高。
            </p>
          </DataHighlight>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 6: 关键集成挑战与解决方案                               */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="关键集成挑战与解决方案"
            subtitle="三合一不是简单的传感器叠加。跨传感器干扰、信号同步、热管理和协议适配是四大核心工程挑战。"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "ECG 与 BioZ 共享电极的串扰",
                severity: "high",
                body: (
                  <>
                    <p className="mb-3">
                      三合一方案中 ECG 和 BioZ 通常共用同一对干电极，50 kHz BioZ
                      激励信号可能干扰 μV 级的 ECG 信号。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">TDM 时分复用: </span>
                          MAX30001 内置时分多路复用机制，在 ECG 采样窗口期间暂停
                          BioZ 激励注入，彻底消除同频干扰。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">四电极配置: </span>
                          激励电极 (I+, I-) 与感应电极 (S+, S-) 分离，激励电流
                          不流经 ECG 电极对，物理层面隔离两组测量。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          3.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">频域分离: </span>
                          BioZ 激励频率 50 kHz 远高于 ECG 信号频带 (0.05-150 Hz)，
                          ECG 前端的抗混叠低通滤波器可有效抑制 50 kHz 载波泄漏。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "体温传感器热隔离",
                severity: "high",
                body: (
                  <>
                    <p className="mb-3">
                      核心体温测量需要通过皮肤→环境的热通量模型推算体内温度。
                      PCB 自身发热 (MCU、电源管理 IC、BLE PA) 和皮肤-环境热梯度
                      是影响测温精度的两个主要误差源。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">PCB 热隔离槽: </span>
                          在 TMP117 周围铣出空气隔离槽，阻断 MCU 热量沿 PCB 铜箔传导到
                          温度传感器区域。热仿真确认可降低 60-80% 的热传导误差。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">传感器凸出设计: </span>
                          TMP117 焊盘位于 PCB 底层，通过导热硅脂耦合到外壳凸起点，
                          确保传感器直接接触皮肤而非被空气间隙隔离。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          3.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">MCU 自热模型: </span>
                          建立 nRF52840 功耗→温升的经验模型，在固件中从 TMP117 读数中
                          减去 MCU 活动引起的局部温升偏移（动态补偿，模型参数在出厂校准中确定）。
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
                      三合一方案涉及三个截然不同的采样率：ECG 250 Hz、BioZ 64 Hz、
                      体温 1 Hz。如果各数据流之间没有精确的时间对齐，跨传感器融合算法
                      （如心率-呼吸耦合分析、体温-心率热负荷模型）将产生系统性误差。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">硬件时间戳: </span>
                          nRF52840 的 RTC (32.768 kHz 晶振) 在每个 SPI/I2C 采样完成时
                          记录硬件时间戳，精度 ±30.5 μs。所有数据样本携带微秒级时间戳。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">统一数据包打包: </span>
                          每 400 ms (ECG 100 样本 + BioZ ~25 样本 + Temp 1 样本)
                          打包为一个 BLE GATT notification 帧，携带序列号以确保
                          接收端可以检测丢失帧并重建时序。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          3.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">BLE GATT Notification: </span>
                          使用单服务多特征架构发送三个独立的数据流通知，
                          各特征独立序列号允许接收端灵活重建各信号的时间序列。
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "BLE / ANT+ 协议适配",
                severity: "medium",
                body: (
                  <>
                    <p className="mb-3">
                      标准 BLE 和 ANT+ 配置文件无法完整覆盖三合一的所有数据维度。
                      需要综合使用标准 profile + 自定义 service 的组合策略。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          1.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">BLE 标准服务: </span>
                          Heart Rate Service (0x180D) 传心率/HRV/RR-interval,
                          Health Thermometer Service (0x1809) 传皮肤/核心温度,
                          Generic Health Sensor v1.0 传 ECG 波形和呼吸率。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          2.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">BLE 自定义服务: </span>
                          Custom Respiration Service (UUID TBD) 传呼吸率/潮气量/分钟通气量。
                          Custom BioZ Raw Data Service 传 BioZ 原始波形 (研究用途)。
                          自定义服务在官方 SIG 未标准化前作为过渡方案。
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5 font-mono">
                          3.
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          <span className="text-white font-semibold">ANT+ 借道策略: </span>
                          Heart Rate Monitor (120) 传心率和 HRV。
                          借道 Muscle Oxygen Profile 传核心体温数据
                          (与 CORE Body Temperature Monitor 相同的兼容策略)。
                          nRF SoftDevice S340 支持 BLE + ANT+ 并发。
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

              const sc = severityConfig[challenge.severity] || severityConfig.medium;

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
                  <div className="text-xs text-[#94A3B8] leading-relaxed">
                    {challenge.body}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 7: 数据协议设计                                         */}
      {/* ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="数据协议设计"
            subtitle="BLE 标准服务 + 自定义服务 + ANT+ 借道策略，确保与现有运动生态的最大兼容性。"
          />

          <div className="grid lg:grid-cols-2 gap-6">
            {/* BLE Services */}
            <GlassCard>
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                  BLE
                </span>
                GATT 服务列表
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        服务名称
                      </th>
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        UUID
                      </th>
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        传输数据
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      [
                        "Heart Rate Service",
                        "0x180D",
                        "HR, HRV, RR-interval",
                      ],
                      [
                        "Health Thermometer",
                        "0x1809",
                        "皮肤温度, 核心体温",
                      ],
                      [
                        "Generic Health Sensor v1.0",
                        "SIG 标准",
                        "ECG 波形, 呼吸率",
                      ],
                      [
                        "Custom Respiration Service",
                        "UUID TBD",
                        "呼吸率, 潮气量, 分钟通气量",
                      ],
                      [
                        "Custom BioZ Raw Data",
                        "UUID TBD",
                        "BioZ 原始波形 (研究用)",
                      ],
                      [
                        "Device Information",
                        "0x180A",
                        "固件版本, 序列号, 电池电量",
                      ],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 text-white">{row[0]}</td>
                        <td className="py-2.5 px-3 text-green-400 font-mono text-[11px]">
                          {row[1]}
                        </td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-[#64748B] mt-3">
                注: Generic Health Sensor v1.0 是 Bluetooth SIG 正在标准化的
                新一代健康传感器规范，含 ECG 波形和呼吸率的标准特征定义。
                在规范正式发布前，通过自定义服务作为过渡方案。
              </p>
            </GlassCard>

            {/* ANT+ Profiles */}
            <GlassCard>
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  ANT+
                </span>
                设备 Profile
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        Profile 名称
                      </th>
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        Device Type
                      </th>
                      <th className="text-left py-2.5 px-3 text-[#94A3B8] font-normal">
                        传输数据
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      [
                        "Heart Rate Monitor",
                        "120",
                        "HR, HRV",
                      ],
                      [
                        "Muscle Oxygen",
                        "31",
                        "核心体温 (借道) — 同 CORE 方案",
                      ],
                      [
                        "Custom (呼吸)",
                        "TBD",
                        "呼吸率, 潮气量",
                      ],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 text-white">{row[0]}</td>
                        <td className="py-2.5 px-3 text-green-400 font-mono text-[11px]">
                          {row[1]}
                        </td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <h4 className="text-xs font-semibold text-amber-400 mb-1">
                  ANT+ 借道策略说明
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  ANT+ 联盟目前没有标准化的核心体温 Profile。CORE Body Temperature Monitor
                  使用的策略是借用 Muscle Oxygen Profile (Device Type 31) 的未使用字段
                  传输体温数据——这是 ANT+ 生态中获取 Garmin 码表和手表兼容性的最佳实践。
                  本方案沿用同样策略，确保与现有 Garmin 设备生态的最大兼容性。
                </p>
              </div>
            </GlassCard>
          </div>

          <DataHighlight>
            <p className="text-xs text-[#94A3B8]">
              <span className="text-green-400 font-semibold">SDK 开放策略: </span>
              建议以 MIT/Apache 2.0 协议开源 BLE Service 定义和 ANT+ Profile 映射表，
              降低第三方 App 开发者的接入门槛。开放的数据协议是最有效的生态护城河——
              一旦多个 App 集成了你的自定义 Service，切换竞品的成本将显著增加。
            </p>
          </DataHighlight>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 8: 认证与监管路径                                       */}
      {/* ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="认证与监管路径"
            subtitle="三合一胸带跨越心率、呼吸和体温三个医学功能维度，需要分阶段完成各目标市场的医疗器械注册。"
          />

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">市场</th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">监管分类</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    预计周期
                  </th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">核心标准</th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">关键要求</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  [
                    "FDA (美国)",
                    "Class II 510(k)",
                    "6-12 个月",
                    "IEC 60601 系列",
                    "Predicate Device 实质等效性证明, 可用性工程文档, 软件验证与确认",
                  ],
                  [
                    "CE (欧盟)",
                    "Class IIa MDR",
                    "9-18 个月",
                    "ISO 13485 QMS, EN 60601 系列",
                    "质量管理体系认证, 技术文件评审, Notified Body 现场审核 (MDR 新规要求更严)",
                  ],
                  [
                    "NMPA (中国)",
                    "二类医疗器械 (07-08-01)",
                    "6-12 个月",
                    "YY 0505 EMC, GB/T 16886",
                    "生物相容性测试 GB/T 16886, EMC 测试 YY 0505, 省级药品监督管理局注册",
                  ],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <span className="text-white font-semibold">{row[0]}</span>
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">{row[1]}</td>
                    <td className="py-3 px-3 text-center text-white font-mono">
                      {row[2]}
                    </td>
                    <td className="py-3 px-3 text-green-400 font-mono text-[11px]">
                      {row[3]}
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8] text-[11px]">
                      {row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phased strategy */}
          <GlassCard>
            <h3 className="text-base font-semibold text-white mb-5">
              分阶段认证策略
            </h3>

            <div className="space-y-5">
              {[
                {
                  phase: "Phase 1",
                  title: "General Wellness (非医疗器械)",
                  timeline: "0-6 个月",
                  description:
                    "不宣称任何医学功能，定位为 '健康与健身监测设备'。FDA 的 General Wellness 政策下无需 510(k) 审查。此阶段的核心目标是快速上市、验证市场需求、收集真实使用数据。固件应设计为可后续通过 OTA 解锁医疗模式（硬件不变，仅软件升级）。",
                  color: "green",
                },
                {
                  phase: "Phase 2",
                  title: "OTC 心率监测 (FDA 510(k) Class II, Product Code DPS)",
                  timeline: "6-18 个月",
                  description:
                    "以 Polar H10 / Garmin HRM-Pro 等现有 OTC 心率胸带为 Predicate Device，通过 510(k) 实质等效性路径获得心率监测功能的 FDA 许可。需提供准确性验证数据 (vs. 12-lead 金标准 ECG)、生物相容性测试、电气安全测试。这是三合一胸带最核心的监管基础。",
                  color: "teal",
                },
                {
                  phase: "Phase 3",
                  title: "扩展 510(k) — 增加呼吸率和体温测量",
                  timeline: "18-30 个月",
                  description:
                    "在心率和 ECG 已有 510(k) 的基础上，通过 Special 510(k) 或传统 510(k) 扩展适应症，包括呼吸率测量 (BioZ) 和核心体温测量 (热通量法)。需要分别提供这两个功能的临床准确性验证数据。通过后即获得三合一全部功能的监管批准。",
                  color: "amber",
                },
                {
                  phase: "Phase 4 (可选)",
                  title: "诊断级 ECG (ST 段分析, 心律失常检测)",
                  timeline: "30+ 个月",
                  description:
                    "如计划进入诊断级市场（如 ST 段抬高型心梗筛查、房颤检测），需要 De Novo 分类申请或 PMA (上市前批准)。需要大规模临床试验数据（数百至数千例），成本和周期显著增加。不建议作为首发产品的目标监管路径，可在 Phase 3 后根据市场需求决定是否推进。",
                  color: "slate",
                },
              ].map((step) => {
                const borderColor =
                  step.color === "green"
                    ? "border-l-green-500"
                    : step.color === "teal"
                      ? "border-l-teal-500"
                      : step.color === "amber"
                        ? "border-l-amber-500"
                        : "border-l-[#475569]";

                const badgeColor =
                  step.color === "green"
                    ? "text-green-400 bg-green-500/10 border-green-500/20"
                    : step.color === "teal"
                      ? "text-teal-400 bg-teal-500/10 border-teal-500/20"
                      : step.color === "amber"
                        ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        : "text-[#94A3B8] bg-white/[0.04] border-white/[0.08]";

                return (
                  <div
                    key={step.phase}
                    className={
                      "glass-card p-5 border-l-2 " + borderColor
                    }
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={
                          "text-[10px] font-mono px-2 py-0.5 rounded-full border " +
                          badgeColor
                        }
                      >
                        {step.phase}
                      </span>
                      <h4 className="text-sm font-semibold text-white">
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-[#64748B] font-mono ml-auto">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <DataHighlight>
            <p className="text-xs text-[#94A3B8]">
              <span className="text-green-400 font-semibold">策略建议: </span>
              Phase 1 (General Wellness) 是最低风险的上市路径。按 FDA 的 General Wellness 政策，
              只要不宣称诊断、治疗或预防疾病，可免于 510(k) 审查。建议在 Phase 1 阶段积累用户数据、
              验证传感器性能、建立品牌认知，同时并行推进 Phase 2 的 510(k) 准备工作。
              硬件在 Phase 1 即应按 510(k) 要求设计（电气安全、生物相容性），
              避免后续重新设计 PCB 的额外成本和延迟。
            </p>
          </DataHighlight>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 9: 推荐路径总结                                         */}
      {/* ============================================================ */}
      <section
        className="py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,197,94,0.08), transparent 70%), radial-gradient(ellipse 50% 30% at 50% 0%, rgba(8,145,178,0.05), transparent 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Big callout card */}
          <GlassCardElevated className="glow-green border-green-500/20 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs text-green-400 font-semibold">
                  首选推荐
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                MAX30001 + TMP117 + nRF52840
              </h2>
              <p className="text-lg text-gradient-green max-w-2xl mx-auto">
                三合一胸带的综合最优解
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "核心芯片 BOM",
                  value: "$10-18",
                  detail: "三颗主芯片 + 电源管理 + 无源器件",
                },
                {
                  label: "连续工作功耗",
                  value: "~3 mW",
                  detail: "可优化至 2 mW (间歇 BioZ 激励)",
                },
                {
                  label: "电池续航",
                  value: "60-80 小时",
                  detail: "200 mAh Li-Po, 5 mW 平均功耗",
                },
                {
                  label: "MVP 开发周期",
                  value: "12-18 个月",
                  detail: "硬件 + 固件 + 基础 App (Phase 1 Wellness)",
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
                  title: "量产成熟度",
                  description:
                    "三大核心芯片均已大规模量产：MAX30001 在 Polar/Garmin/Movano 等产品中累计出货超千万颗；TMP117 在医疗和工业测温中广泛使用；nRF52840 是穿戴式设备的行业标准 MCU。",
                },
                {
                  title: "生态兼容性",
                  description:
                    "nRF52840 的 SoftDevice S340 支持 BLE + ANT+ 双模并发；MAX30001 的 SPI 驱动已在 Zephyr RTOS 中开源实现；TMP117 使用标准 I2C 接口，驱动代码小于 100 行。",
                },
                {
                  title: "竞争护城河",
                  description:
                    "开放 SDK (MIT 协议) + 跨传感器融合算法 (HR-Temp 热负荷模型, HR-BR 耦合分析) + 分阶段认证壁垒 (Phase 1→4)。软件和数据的价值远高于硬件本身，这是最可持续的竞争优势。",
                },
              ].map((item) => (
                <GlassCard key={item.title}>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              ))}
            </div>

            <DataHighlight>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                <span className="text-green-400 font-semibold">核心结论: </span>
                方案 A (MAX30001+TMP117+nRF52840) 不是最便宜的方案，也不是精度最高的方案，
                但它是量产风险最低、上市速度最快、生态系统最全面的方案。在竞争窗口有限的消费电子市场，
                速度 &gt; 完美。选择已被行业验证的芯片方案，将工程资源集中投入到跨传感器融合算法、
                用户体验和开放 SDK 生态上，这是三合一胸带的最优竞争策略。
              </p>
            </DataHighlight>
          </GlassCardElevated>

          {/* CTA buttons */}
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
