import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { GlossaryLink } from "@/components/GlossaryLink";

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12">
      {number && (
        <p className="text-xs text-teal-400 font-mono mb-2">{number}</p>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
        {title}
      </h2>
      <p className="text-[#94A3B8] max-w-2xl">{subtitle}</p>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  highlight = false,
  color = "green",
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
  color?: "green" | "teal";
}) {
  const borderColor =
    highlight && color === "green"
      ? "border-green-500/20"
      : highlight && color === "teal"
        ? "border-teal-500/20"
        : "";
  const glow =
    highlight && color === "green"
      ? "glow-green"
      : highlight && color === "teal"
        ? "glow-teal"
        : "";
  const base = highlight ? "glass-card-elevated" : "glass-card";
  return (
    <div className={[base, borderColor, glow, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

function DataHighlight({ children }: { children: React.ReactNode }) {
  return <div className="data-highlight">{children}</div>;
}

function MetricBadge({
  label,
  value,
  unit = "",
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
        {value}
        {unit && (
          <span className="text-sm text-[#64748B] ml-0.5">{unit}</span>
        )}
      </p>
      <p className="text-xs text-[#64748B] mt-1">{label}</p>
    </div>
  );
}

function SmallIcon({ color, d }: { color: string; d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FBBF24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 9v4M12 17h.01M10.3 3.3l-7.6 13.14A2 2 0 004.7 19.4h14.6a2 2 0 002-2.96L13.7 3.3a2 2 0 00-3.4 0z" />
    </svg>
  );
}

function SubSectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6">
      <h4 className="font-heading text-base font-semibold text-white mb-3">
        {title}
      </h4>
      <div className="text-sm text-[#94A3B8] leading-relaxed space-y-2">
        {children}
      </div>
    </GlassCard>
  );
}

export default function RespirationPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="呼吸检测技术"
        titleGradient="从实验室到胸带"
        subtitle="可穿戴呼吸监测技术的原理、实现路径与前沿突破"
        badge={{ text: "Deep Dive · Respiration", color: "teal" }}
        description="呼吸率与潮气量是运动生理学中被长期忽视的关键指标。本页系统梳理七大呼吸检测技术路径，从物理原理到芯片实现，从商用产品到前沿研究。"
      />

      {/* ============================================================
          Section 1: 为什么呼吸数据至关重要
          ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "首页", href: "/" },
              { label: "技术全景", href: "/technology" },
              { label: "呼吸检测技术" },
            ]}
          />

          <SectionHeading
            number="01"
            title="为什么呼吸数据至关重要"
            subtitle="从自主神经系统到运动生理学，呼吸是连接身体与大脑的关键桥梁"
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4 text-[#94A3B8] leading-relaxed">
              <p>
                呼吸是人体生理中一个独特的存在——它是极少数同时受
                <strong className="text-white">自主神经系统（ANS）</strong>
                和
                <strong className="text-white">中枢神经系统（CNS）</strong>
                双重控制的生理过程。在无意识状态下，脑干的呼吸中枢通过延髓的
                pre-Botzinger 复合体自动维持节律性呼吸；在有意识控制下，大脑皮层可以随时接管——加速、屏息、深呼吸。这种双重控制机制使呼吸数据成为洞察
                <strong className="text-white">压力状态、情绪波动与训练强度</strong>
                的独特窗口。
              </p>
              <p>
                在运动场景中，呼吸数据的重要性仅次于心率。当运动强度逐渐增加，人体从有氧代谢过渡到无氧代谢时，呼吸模式会发生特征性变化。
                <GlossaryLink slug="vt1">
                  第一通气阈（VT1）
                </GlossaryLink>{" "}
                标志着血乳酸开始累积但仍可被清除的转折点（通常出现在
                65-80% HRmax），此时通气量和呼吸频率开始非线性上升；而
                <GlossaryLink slug="vt2">
                  第二通气阈（VT2）
                </GlossaryLink>{" "}
                对应呼吸代偿点（85-95% HRmax），是耐力运动员可以维持的最高稳态强度——越过此点，代谢性酸中毒迅速加剧，运动表现分钟级衰减。
              </p>
              <p>
                在恢复期，呼吸频率（respiratory rate, RR）的变化趋势是自主神经恢复的重要指标。研究表明，高强度间歇训练后呼吸频率的恢复速率与
                <strong className="text-white">HRV（心率变异性）</strong>
                高度相关（r = 0.72-0.85），但呼吸频率对运动伪影的敏感性显著低于心率变异性。这使得呼吸监测在户外运动场景中具有更高的实用价值——当腕部PPG因汗水、晃动而信号质量下降时，胸带采集的呼吸波形依然稳健可靠。
              </p>
            </div>
            <div className="space-y-4 text-[#94A3B8] leading-relaxed">
              <p>
                从工程视角看，呼吸信号包含三个层级的生物信息：
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    <strong className="text-white">基础层——呼吸频率（RR, breaths/min 或 rpm）：</strong>
                    每次呼吸周期的时间间隔，成年人安静状态 12-20 rpm，运动期间可达 40-60 rpm。这是最易于采集的基础衍生指标。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    <strong className="text-white">功能层——潮气量（TV, tidal volume）与每分通气量（VE, minute ventilation）：</strong>
                    单次吸入或呼出的气体体积（TV，安静约 500 mL/次），乘以呼吸频率即为每分通气量（VE，安静约 6-8 L/min，剧烈运动可达 120-200 L/min）。VE 直接反映代谢需求——是能量消耗的呼吸代理指标。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    <strong className="text-white">模式层——呼吸模式（breathing pattern）与通气效率（VE/VCO₂）：</strong>
                    浅快呼吸 vs. 深呼吸的切换时机、吸呼比（I:E ratio）、胸式呼吸 vs. 腹式呼吸的相对贡献比。这些模式特征与运动策略、疲劳状态直接关联。
                  </span>
                </li>
              </ul>
              <p>
                呼吸数据的独特优势在于其
                <strong className="text-white">即时响应性</strong>
                ——当运动强度突然增加时，通气量的响应延迟仅为 5-10 秒，远快于心率对负荷变化的响应（15-30 秒）。这使得呼吸监测成为评估
                <GlossaryLink slug="ventilatory-efficiency">
                  通气效率（VE/VCO₂斜率）
                </GlossaryLink>{" "}
                和识别训练区间转换的理想手段，尤其适合间歇训练和高强度运动场景。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <GlassCard className="p-5 text-center">
              <p className="text-xs text-[#64748B] mb-1">安静呼吸频率</p>
              <p className="text-xl font-heading font-bold text-white">
                12-20 <span className="text-sm text-[#64748B]">rpm</span>
              </p>
            </GlassCard>
            <GlassCard className="p-5 text-center">
              <p className="text-xs text-[#64748B] mb-1">运动呼吸频率</p>
              <p className="text-xl font-heading font-bold text-white">
                40-60 <span className="text-sm text-[#64748B]">rpm</span>
              </p>
            </GlassCard>
            <GlassCard className="p-5 text-center">
              <p className="text-xs text-[#64748B] mb-1">安静每分通气量</p>
              <p className="text-xl font-heading font-bold text-white">
                6-8 <span className="text-sm text-[#64748B]">L/min</span>
              </p>
            </GlassCard>
            <GlassCard className="p-5 text-center">
              <p className="text-xs text-[#64748B] mb-1">最大每分通气量</p>
              <p className="text-xl font-heading font-bold text-white">
                120-200 <span className="text-sm text-[#64748B]">L/min</span>
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 2: 七大技术路线全景对比
          ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="02"
            title="七大技术路线全景对比"
            subtitle="从生物阻抗到声学分析，七种技术路径在精度、功耗、运动鲁棒性上各有优劣"
          />

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[120px]">
                    技术名称
                  </th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[100px]">
                    英文名
                  </th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                    物理原理
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    静态精度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    动态精度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    潮气量能力
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    功耗
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    运动鲁棒性
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    胸带适配度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    成熟度
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {/* Row 1: BioZ ⭐ */}
                <tr className="bg-green-500/5">
                  <td className="py-3 px-3">
                    <span className="text-green-400 font-semibold">
                      生物阻抗法 ⭐推荐
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">BioZ</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    注入50kHz微安级交流电至胸腔，测量胸廓扩张引起的阻抗变化
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    MAE 0.5-2.0 rpm
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    误差2-3x静态
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-green-400 font-semibold">
                      R&sup2;=0.91
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-green-400">★★★★★</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-green-400">单芯片量产</span>
                  </td>
                </tr>
                {/* Row 2: EDR */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">ECG衍生呼吸</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">EDR</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    从ECG提取R波幅度调制(RAM)和呼吸性窦性心律不齐(RSA)
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    MAE 1-3 rpm
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    高强度退化
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-red-400">不可行</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-green-400">零增量</span>
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    ★★★★★
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    软件实现
                  </td>
                </tr>
                {/* Row 3: IMU */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">加速度计/IMU法</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">Accelerometry</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    胸廓扩张→加速度计倾角变化→呼吸位移
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    RMSE ~2 rpm
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    RMSE 3.77
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★☆☆☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">极低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★★☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">已商用</td>
                </tr>
                {/* Row 4: RIP */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">呼吸感应体积描记</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">RIP</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    胸带内感应线圈→截面积变化→电感变化→呼吸波形
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    &lt;2 rpm
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    LoA扩大3x
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★★☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★☆☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">医学金标准</td>
                </tr>
                {/* Row 5: Strain Gauge */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">应变传感器</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">Strain Gauge</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    胸带内应变片→拉伸→电阻变化→呼吸波形
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    误差3-4%
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">运动中下降</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★★☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">极低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★★★☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">早期商用</td>
                </tr>
                {/* Row 6: Acoustic */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">声学法</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">Acoustic</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    气管/颈部麦克风采集呼吸音→频谱分析→呼吸率
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    良好(安静)
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    显著下降
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★☆☆☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★☆☆☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">研究阶段</td>
                </tr>
                {/* Row 7: Capacitive */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="text-white">电容式应变法</span>
                  </td>
                  <td className="py-3 px-3 text-[#94A3B8]">Capacitive</td>
                  <td className="py-3 px-3 text-[#94A3B8]">
                    胸带内电容式传感器→拉伸→电容变化→需IMU融合
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    &lt;2%
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    需IMU融合
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★☆☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">极低</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">中</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">★★★☆☆</td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">研究阶段</td>
                </tr>
              </tbody>
            </table>
          </div>

          <DataHighlight>
            <p className="text-sm">
              <strong className="text-green-400">综合结论：</strong>
              生物阻抗法（BioZ）是胸带形态下的最优选择——与ECG共享电极阵列，单芯片（MAX30001/AD5940）实现，具备潮气量估算能力，功耗可控。EDR作为零增量软件冗余通道，可在BioZ信号质量下降时提供降级呼吸率。加速度计法适合低功耗场景（Garmin方案），RIP更适合医疗级应用（睡眠监测），应变传感器是新兴的高潜力替代路径（Tymewear方案）。
            </p>
          </DataHighlight>
        </div>
      </section>

      {/* ============================================================
          Section 3: 推荐方案深度拆解 — 生物阻抗法
          ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="03"
            title="推荐方案深度拆解 — 生物阻抗法"
            subtitle="从50kHz激励电流到VT1/VT2阈值检测——完整信号链路的工程实现"
          />

          {/* 3.1 物理原理 */}
          <div className="mb-12">
            <h3 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-teal-400 rounded-full inline-block" />
              3.1 物理原理
            </h3>

            <div className="grid lg:grid-cols-2 gap-6">
              <SubSectionCard title="胸腔阻抗模型">
                <p>
                  生物阻抗法基于一个简洁的物理事实：胸腔内容纳着心脏、肺脏、大血管与体液，其总阻抗主要由
                  <strong className="text-white">空气（高阻抗）</strong>
                  与
                  <strong className="text-white">体液/组织（低阻抗）</strong>
                  的比例决定。吸气时，肺膨胀、空气体积增加 → 电流通路中的高阻抗区域扩大 → 总阻抗增加。呼气时，肺回缩 → 空气体积减小 → 总阻抗降低。
                </p>
                <p>
                  注入频率选择为
                  <strong className="text-white">50 kHz</strong>
                  是经过大量实验优化的结果：频率过低（&lt;10 kHz）时细胞膜电容效应显著，信号衰减大；频率过高（&gt;100 kHz）时组织介电特性变化，呼吸调制深度下降。50 kHz
                  恰好处于细胞膜弛豫频率之上、组织色散区间的甜点位置，兼顾了穿透深度与调制灵敏度。
                </p>
                <p>
                  激励电流典型值为{" "}
                  <strong className="text-white">50-100 &micro;A RMS</strong>
                  ，远低于IEC 60601-1医用电气设备的患者辅助漏电流限值（100 &micro;A），确保安全性。四电极配置是区分激励与感应的关键设计。
                </p>
              </SubSectionCard>

              <SubSectionCard title="四电极配置原理">
                <p>
                  四电极（tetrapolar）配置是生物阻抗测量的标准方案，有效消除电极-皮肤接触阻抗引入的误差：
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-mono text-xs shrink-0 mt-0.5">
                      I+
                    </span>
                    <span>
                      <strong className="text-white">激励正极：</strong>
                      通过一对电极向胸腔注入 50kHz 恒流正弦波。电流路径穿胸而过。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-mono text-xs shrink-0 mt-0.5">
                      I-
                    </span>
                    <span>
                      <strong className="text-white">激励负极：</strong>
                      电流返回路径，与 I+ 形成闭合回路。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs shrink-0 mt-0.5">
                      V+
                    </span>
                    <span>
                      <strong className="text-white">感应正极：</strong>
                      高输入阻抗差分放大器的一个输入端。几乎不汲取电流——接触阻抗对测量结果的影响可忽略。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs shrink-0 mt-0.5">
                      V-
                    </span>
                    <span>
                      <strong className="text-white">感应负极：</strong>
                      差分放大器的另一端。V+ 与 V- 之间的电压差 &divide; I = 胸腔阻抗 Z。
                    </span>
                  </li>
                </ul>
                <p className="mt-3">
                  阻抗变化幅度：安静呼吸下{" "}
                  <strong className="text-white">&Delta;Z &asymp; 2-5 &Omega;</strong>
                  （基础阻抗 200-500 &Omega;），深呼吸时可达{" "}
                  <strong className="text-white">&Delta;Z &asymp; 10-15 &Omega;</strong>
                  。输出波形 &Delta;Z(t) 即为呼吸波形。潮气量 TV &prop; &Delta;Z，皮尔逊相关系数 r =
                  0.93 &plusmn; 0.05（与肺活量计对比，n=120，来源：Ansari et al., 2021）。
                </p>
              </SubSectionCard>
            </div>
          </div>

          {/* 3.2 基础指标采集 */}
          <div className="mb-12">
            <h3 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-teal-400 rounded-full inline-block" />
              3.2 基础指标采集
            </h3>

            <GlassCard className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-[#64748B] mb-1">原始信号</p>
                  <p className="text-sm text-white font-semibold">
                    &Delta;Z (&Omega;)
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    呼吸引起的胸腔阻抗变化，形成周期性波形
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">BioZ采样率</p>
                  <p className="text-sm text-white font-semibold">
                    64-256 Hz
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    远高于奈奎斯特频率（呼吸信号带宽&lt;2 Hz），保障波形细节
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">同步ECG</p>
                  <p className="text-sm text-white font-semibold">
                    250-512 Hz
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    EDR冗余通道，与BioZ共享同一电极阵列，单芯片同步采集
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">激励频率/电流</p>
                  <p className="text-sm text-white font-semibold">
                    50 kHz / ~100 &micro;A
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    组织穿透深度~5 cm，足够覆盖成人胸腔截面
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 3.3 完整算法链路 */}
          <div className="mb-12">
            <h3 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-teal-400 rounded-full inline-block" />
              3.3 从基础指标到高级指标——完整算法链路
            </h3>

            <div className="space-y-4">
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      带通滤波
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Raw BioZ信号 → 4阶巴特沃斯带通滤波器（0.05-2 Hz）。低截止 0.05
                      Hz 去除基线漂移（呼吸频率最低 3 rpm = 0.05 Hz），高截止 2 Hz
                      排除 50 Hz 激励载波残余、肌电噪声和高频干扰。巴特沃斯滤波器在通带内的平坦度优于切比雪夫型，适合保持呼吸波形形态。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      RLS自适应滤波 — 运动伪影消除
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      使用递归最小二乘（Recursive Least Squares, RLS）自适应滤波器，以IMU加速度计信号为参考输入（x(n)），呼吸信号为目标信号（d(n)）。RLS收敛速度优于LMS（最小均方），遗忘因子 &lambda; = 0.99
                      平衡收敛速度与稳态误差。运动频率（步频 2-3 Hz）与呼吸频率（0.2-1 Hz）有足够间隔，滤波效果显著。对于特定频段的运动（如骑行踏频 80-100
                      rpm &asymp; 1.3-1.7 Hz），可通过IMU频域信息辅助识别和消除。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      基线漂移去除
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      中值滤波（窗口宽度 &asymp; 1.5 x 最长呼吸周期 &asymp; 20
                      秒 @ 64Hz &asymp; 1280
                      采样点）提取缓慢漂移趋势，原始信号减去趋势得到零均值的呼吸波形。中值滤波对脉冲干扰不敏感，优于均值滤波。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      峰值检测 → 呼吸频率（RR, rpm）
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      使用基于自适应阈值的峰值检测算法。滑动窗口（10秒）内计算信号标准差 &sigma;，峰值阈值 = 0.5 &sigma;。检测到的相邻波峰时间间隔 &Delta;t → RR =
                      60 / &Delta;t。加入不应期约束（最小间隔 &ge; 1秒 @ 最大RR = 60
                      rpm）防止误检。在信噪比 &gt; 10 dB 条件下，检测准确率 &gt; 98%。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      信号质量指数（SQI）门控
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      计算滑动窗口内信号的SQI：基于波形周期性（自相关峰值高度）、幅度变异性（变异系数）和频谱纯度（主导频率能量占比）的三维质量评估。SQI
                      低于阈值（如 0.6）的时段标记为低质量，不参与呼吸率报告。门控后输出仅保留高置信度数据，运动伪影时段以"数据间隙"明确标注（优于输出错误数据）。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      波形积分 → 潮气量（TV）估算
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      对SQI门控后的呼吸波形进行逐周期积分：每个呼吸周期的波形下面积 A_i
                      &prop; TV_i。通过初始标定（安静坐位，对照肺活量计测量 TV_ref）确定比例系数 k = TV_ref
                      / A_ref。后续潮气量 TV_est =
                      k &times; A_i。与肺活量计的对比验证 R&sup2; = 0.91, RMSE =
                      0.12 L（de Geus et al.，多个独立验证结果 r = 0.87-0.93）。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    7
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      TV &times; RR → 每分通气量（VE, L/min）
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      取滑动窗口（30秒）内的平均潮气量 TV_mean 和呼吸频率
                      RR_mean，VE = TV_mean &times; RR_mean。VE 是反映代谢需求的核心指标——安静时 6-8 L/min，剧烈运动时可达 120-200
                      L/min。VE 的 30 秒滑动均值平滑了单次呼吸的起伏，适合实时显示和趋势分析。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    8
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      VE 趋势分析 → VT1/VT2 阈值检测
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      在递增负荷测试（如 ramp test）中，使用 V-slope 法分析 VE vs.
                      VCO&sub2;（或 VE vs. Workload）的斜率转折点：当 VE 对负荷的响应从线性变为超线性时，识别为 VT1（第一通气阈）；当 VE/VCO&sub2;
                      开始持续上升时，识别为 VT2（呼吸代偿点）。穿戴式胸带的挑战在于缺少 VCO&sub2;
                      气体分析数据——替代方案是使用心率-VE 耦合分析或潮气末 CO&sub2; 替代测算。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    9
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      （可选）EDR冗余通道
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      从同步采集的ECG信号中提取呼吸成分。两种互补方法：(a) R波幅度调制（RAM）——吸气时R波幅度通常降低（电极-心脏距离变化）；(b)
                      呼吸性窦性心律不齐（RSA）——吸气时心率加速、呼气时减速。EDR不需要额外硬件，可作为BioZ的降级冗余。在BioZ信号不可用或不信任时（如剧烈
                      运动/电极脱离），EDR提供呼吸率维持。
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5" highlight color="green">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-green-400 bg-green-500/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    10
                  </span>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      BioZ + EDR 双模融合 — 精度提升 11.6-30%
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      当两个通道均可用时，卡尔曼滤波融合 BioZ 和 EDR
                      独立估算的呼吸率：以BioZ为主导传感器（低过程噪声），EDR为辅助传感器（较高过程噪声）。融合后的RMSE较单模BioZ降低
                      11.6%（安静状态）至 30%（运动状态）（Johnstone et al., 2016; Charlton et
                      al., 2016）。融合策略的关键：仅在SQI均超过阈值时执行融合，否则退化为单模。
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* 3.4 芯片选择 */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-teal-400 rounded-full inline-block" />
              3.4 芯片选择
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      芯片
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      功能
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      关键参数
                    </th>
                    <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                      参考价格
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      封装
                    </th>
                    <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                      适用场景
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="bg-green-500/5">
                    <td className="py-3 px-3">
                      <span className="text-green-400 font-semibold">
                        MAX30001 ⭐首选
                      </span>
                      <p className="text-[10px] text-[#64748B]">Analog Devices</p>
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      ECG + BioZ 单芯片
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      18-bit ECG ADC (512 sps)
                      <br />
                      20-bit BioZ ADC (64 sps)
                      <br />
                      内置激励源（50kHz 可编程）
                      <br />
                      功耗: ~1.3mW（双通道运行）
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      $8-12
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      WLP-28
                      <br />
                      2.9 &times; 3.5mm
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      消费级运动胸带首选
                      <br />
                      Polar H10级别方案
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <span className="text-white font-semibold">AD5940</span>
                      <p className="text-[10px] text-[#64748B]">Analog Devices</p>
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">专用BioZ AFE</td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      16-bit ADC (800 ksps)
                      <br />
                      可编程激励频率（DC-200kHz）
                      <br />
                      多频率阻抗谱能力
                      <br />
                      更灵活，需外部MCU
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      $6-9
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      LFCSP-32
                      <br />
                      5 &times; 5mm
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      研究级/多频阻抗场景
                      <br />
                      需要单独ECG芯片配合
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <span className="text-white font-semibold">AFE4960</span>
                      <p className="text-[10px] text-[#64748B]">Texas Instruments</p>
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      ECG + BioZ 单芯片
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      24-bit ADC（双通道）
                      <br />
                      可编程激励频率
                      <br />
                      内置右腿驱动（RLD）
                      <br />
                      TI生态，更高精度
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      $10-15
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      VQFN-32
                      <br />
                      4 &times; 4mm
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">
                      TI生态偏好者
                      <br />
                      追求24-bit精度
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DataHighlight>
              <p className="text-sm">
                <strong className="text-white">选型建议：</strong>
                消费级运动胸带首选 MAX30001——ECG+BioZ 单芯片方案，BOM
                最简，生态最成熟（Fitbit、Samsung 手表均有采用），技术手册详尽，参考设计丰富。研究级产品推荐
                AD5940 + 独立 ECG AFE——灵活性最高，支持多频阻抗谱，但需要更多开发工作。TI
                生态用户可选 AFE4960，24-bit
                精度在微弱信号场景下有一定优势，但价格和生态成熟度不如 MAX30001。
              </p>
            </DataHighlight>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 4: 商用实现方案对比
          ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="04"
            title="商用实现方案对比"
            subtitle="从$105的消费级胸带到$1,500的医用级系统——当前市场上的呼吸监测产品"
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Tymewear VitalPro */}
            <GlassCard className="p-6" highlight color="green">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    Tymewear VitalPro
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    应变传感器 · 直接通气量测量
                  </p>
                </div>
                <span className="text-xs font-mono text-green-400 bg-green-500/10 rounded-full px-2 py-0.5">
                  $299
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    核心创新：胸带内置应变片（strain gauge），直接测量胸部扩张幅度，输出潮气量（TV）与每分通气量（VE）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    2025年获UCI（国际自行车联盟）赛事用批准，Stephen Seiler教授背书
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Garmin Connect / TrainingPeaks 数据集成</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>实时通气量显示——目前市场上唯一实现此功能的消费级胸带</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：产品上市时间短（2025），长期可靠性数据有限；应变传感器的耐久性和漂移特性有待验证
                  </span>
                </li>
              </ul>
            </GlassCard>

            {/* Polar H10 */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    Polar H10
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    EDR（软件级）· 零增量硬件
                  </p>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] bg-white/5 rounded-full px-2 py-0.5">
                  $105
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    通过Polar BLE SDK可读取EDR呼吸率数据（Polar SDK v5.1+提供RespirationRateData解析）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>静态精度 MAE 1-3 rpm，安静和低强度运动下可靠</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    零增量成本——H10本身是ECG胸带，EDR纯软件提取
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>行业认可度最高的胸带，研究论文中引用频次最高</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：高强度运动后EDR精度退化 &gt;50%；无潮气量/通气量能力；依赖ECG信号质量
                  </span>
                </li>
              </ul>
            </GlassCard>

            {/* Garmin HRM-Pro Plus */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    Garmin HRM-Pro Plus
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    IMU加速度计 · Firstbeat算法
                  </p>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] bg-white/5 rounded-full px-2 py-0.5">
                  $130
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    内置三轴加速度计，通过胸部运动角度变化间接估算呼吸率
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    Firstbeat算法处理——Garmin收购Firstbeat后独家使用，呼吸率作为Running Dynamics的一部分输出
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>需配对Garmin手表，呼吸数据不通过标准BLE服务暴露给第三方</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    Garmin生态内的Running Dynamics数据丰富（含垂直振幅、触地时间等）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：间接测量法——实际测量的是身体加速度，非真正的呼吸气流/胸廓扩张；手表绑定限制开放生态；无潮气量信息
                  </span>
                </li>
              </ul>
            </GlassCard>

            {/* Zephyr BioHarness 3 */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    Zephyr BioHarness 3
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    压电 + RIP · 专业级
                  </p>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] bg-white/5 rounded-full px-2 py-0.5">
                  $800-1,500
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    压电传感器 + RIP感应体积描记技术双模测量，美国国防部、NASA、特种部队采用
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    FDA 510(k) Class II 医疗器械认证，可用于临床和职业健康监测
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    同时输出ECG心率、呼吸率、皮肤温度、姿态、活动水平，数据可本地存储
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    经过极端环境验证（高温、寒冷、高湿度），美军测试报告可查
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：价格高昂、穿戴舒适度不及轻量化消费级胸带、模块较重（~50g）、非消费级定价导致市场渗透率低
                  </span>
                </li>
              </ul>
            </GlassCard>

            {/* Equivital eq02+ */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    Equivital eq02+
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    RIP · 医疗级 · 临床验证
                  </p>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] bg-white/5 rounded-full px-2 py-0.5">
                  ~$1,500
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    感应体积描记（RIP）技术——睡眠监测领域的金标准技术，临床验证数据最丰富
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    CE医疗认证（IIa类），在英国NHS和多项大型临床试验中使用
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    支持双带（胸带 + 腹带）配置，可区分胸式呼吸与腹式呼吸
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    广泛应用于制药临床试验中的呼吸安全监测
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：价格远超消费级预算；体积大、不适合运动场景；双带配置穿戴复杂
                  </span>
                </li>
              </ul>
            </GlassCard>

            {/* VivaLNK */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">
                    VivaLNK
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    医疗贴片形态 · 多参数
                  </p>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] bg-white/5 rounded-full px-2 py-0.5">
                  按模块定价
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    柔性电子贴片形态，非胸带设计——更适合临床长时间连续监测（24-72h）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    模块化方案：ECG贴片 + 呼吸贴片 + 温度贴片可独立或组合使用，主机通过蓝牙连接
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    三地认证：FDA（美国）+ CE（欧盟）+ NMPA（中国），市场覆盖最广
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>
                    临床级信号质量，已用于多家CRO（合同研究组织）的远程监测试验
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertIcon />
                  <span className="text-amber-300/80">
                    局限：贴片形态不适合高强度运动（汗水导致脱落）；一次性贴片方案，重复使用成本高；非胸带设计，与我们的产品形态差异大
                  </span>
                </li>
              </ul>
            </GlassCard>
          </div>

          <div className="mt-8">
            <DataHighlight>
              <p className="text-sm">
                <strong className="text-white">产品定位启示：</strong>
                消费级市场（$100-300）的运动呼吸监测产品目前几乎是空白。Polar H10
                的EDR呼吸率只是一个"附带功能"，精度不足以成为卖点。Garmin
                依赖手表生态闭环。Tymewear VitalPro
                是唯一以呼吸监测为核心卖点的消费级胸带（$299），但其应变传感器技术的长期可靠性证据仍不充分。
                <strong className="text-green-400">
                  这为基于MAX30001 BioZ方案的运动胸带留下了巨大的市场空间——$150-250价位，提供ECG心率 + BioZ呼吸率 + 潮气量估算，精度对标金标准。
                </strong>
              </p>
            </DataHighlight>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 5: 前沿研究方向
          ============================================================ */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="05"
            title="前沿研究方向"
            subtitle="从多频阻抗谱到柔性电子皮肤——呼吸监测技术的下一站"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <GlassCard className="p-6" highlight color="teal">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  多频生物阻抗谱
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                传统单频（50kHz）BioZ仅反映胸腔平均阻抗变化。多频阻抗谱（MF-BioZ,
                5-500kHz
                多频率同时/分时激励）可以区分不同组织成分的阻抗特性：低频（5-50kHz）主要反映细胞外液和胸腔壁组织，中频（50-200kHz）穿透细胞膜反映细胞内液，高频（200-500kHz）对不同组织的介电弛豫特性敏感。通过阻抗谱分析可实现
                <strong className="text-white">胸式呼吸与腹式呼吸的分离识别</strong>
                ——胸式呼吸主要改变上胸腔阻抗，腹式呼吸主要改变下胸腔/腹部阻抗，两组频段的阻抗变化模式不同。2023年后这一方向迅速升温，AD5940已原生支持多频扫描。
              </p>
            </GlassCard>

            {/* Card 2 */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  电容式纳米纤维传感器
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                静电纺丝技术制备的纳米纤维（如PVDF-TrFE、TPU/CNT复合材料）在拉伸时产生可测量的电容变化——灵敏度是传统金属应变片的
                10-50 倍。纳米纤维的高比表面积（&gt;10 m&sup2;/g）使其对微小的胸腔拉伸（&lt;1% 应变）即产生显著的电容信号。更重要的是，纳米纤维传感器可能从根本上改善
                <strong className="text-white">运动鲁棒性</strong>
                ——它的柔性本质使其与皮肤运动同步变形，而非像刚性传感器那样在皮肤-传感器界面产生剪切应力。目前处于实验室原型向商业化过渡阶段，核心工程挑战在于批量一致性（纺丝工艺控制）和长期稳定性（纤维疲劳）。
              </p>
            </GlassCard>

            {/* Card 3 */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 6a1 1 0 011 1v3a1 1 0 01-2 0V9a1 1 0 011-1zm0 8a1 1 0 111 1 1 1 0 01-1-1z"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  ML呼吸模式识别
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                深度学习正在重塑呼吸波形分析的方式。CNN（卷积神经网络）可以直接从原始呼吸波形中学习局部形态特征（如吸/呼比、波峰尖锐度），LSTM（长短期记忆网络）捕获呼吸模式在数分钟尺度上的演变趋势。前沿模型（ResNet-LSTM
                混合架构）在公开数据集上的呼吸模式分类准确率已达 92%+，可区分正常呼吸、喘息、呼吸暂停、Cheyne-Stokes
                呼吸等多种模式。在运动场景中，ML模型可以利用ACC+ECG+BioZ多模态输入，在运动伪影高发区间仍能维持较高的呼吸率检测准确率——关键在于模型学会识别"伪影模式"而非仅依赖信号本身。
              </p>
            </GlassCard>

            {/* Card 4 */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M4 4v6a8 8 0 0016 0V4M2 20h20"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  心肺耦合分析
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                心率与呼吸之间的耦合关系（cardiopulmonary coupling,
                CPC）是近年运动生理学的研究热点。传统上，心率与呼吸的交互分析主要关注呼吸性窦性心律不齐（RSA），但CPC分析走得更远——量化HRV的呼吸频段功率、心肺相位同步指数、以及心肺耦合强度在运动强度递变中的演化。研究发现，VT1
                和 VT2
                附近的心肺耦合模式发生特征性改变——耦合强度从低频主导（副交感）转向高频主导（交感+代谢驱动）。在胸带平台上，ECG（心率）+BioZ（呼吸）的双通道数据天然支持CPC计算，这为训练强度个性化指导提供了一个全新的生物学维度。
              </p>
            </GlassCard>

            {/* Card 5 */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M22 12h-4l-3 9L9 3l-3 9H2"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  非接触式方法
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                超宽带（UWB）雷达（如英飞凌 XENSIV 60GHz
                雷达芯片）可透过衣物检测胸腔壁运动，实现完全无接触的呼吸率监测。热成像（FLIR
                Leptop核心组件）通过检测鼻孔区域的温度变化（吸气时降温、呼气时升温）间接测量呼吸率和估算潮气量。这些技术不属于胸带方案，但作为
                <strong className="text-white">竞争格局认知</strong>
                非常重要：Apple Watch Series 9+已集成温度传感器（用于排卵跟踪），未来可能通过改进算法实现呼吸率提取；Google
                Pixel Watch 3 已通过 PPG+加速度计实现了呼吸率功能。非接触和腕部方案的持续进步，对胸带产品的差异化优势（精度+多参数）提出了持续挑战。
              </p>
            </GlassCard>

            {/* Card 6 */}
            <GlassCard className="p-6" highlight color="teal">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <SmallIcon
                    color="#2DD4BF"
                    d="M18 2h-2a4 4 0 01-4 4v2a4 4 0 01-4 4H6M10 22v-4a4 4 0 00-4-4H4"
                  />
                </div>
                <h4 className="font-heading text-sm font-semibold text-white">
                  柔性电子皮肤
                </h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                这是可穿戴传感器的终极形态愿景——厚度仅 10-50 &micro;m 的超薄电子薄膜（基于聚酰亚胺/PDMS
                基底）直接贴附在胸部皮肤上，与皮肤的刚度匹配（E &asymp; 1-100 kPa，与表皮相当）。由于传感器与皮肤之间不存在相对运动（无间隙、无剪切），运动伪影在物理层面被最小化，大大降低了后端信号处理的难度。2024年
                Nature Electronics 刊载的前沿成果（Xu et al.）展示了基于金纳米网（Au
                nanomesh）的可呼吸电子皮肤，可在连续佩戴 1 周的情况下维持 ECG + BioZ
                信号质量。当前核心瓶颈在于制造工艺的批量化、长期生物相容性验证和供电方案（无线能量传输/超薄柔性电池），预计 2028-2030
                年进入商用。
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 6: 技术挑战与解决方案
          ============================================================ */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="06"
            title="技术挑战与解决方案"
            subtitle="三合一胸带在呼吸监测上必须解决的三大核心工程挑战"
          />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Challenge 1 */}
            <GlassCard className="p-6" highlight color="teal">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 9v4M12 17h.01" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    运动伪影
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-mono">
                    高优先级
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                运动伪影是胸带呼吸监测面临的最大工程挑战。跑步时胸带相对皮肤的滑动、骑行时上身的姿态变化、乃至手臂摆动带来的胸部皮肤牵引——这些都会在呼吸波形中叠加低频运动干扰。运动频率（跑步步频 ~2.7
                Hz）与呼吸频率（0.2-1.0 Hz）并非完全无重叠（高强度运动时RR可达 1 Hz），简单的固定频率滤波无法彻底分离。
              </p>
              <div className="space-y-2 text-xs">
                <p className="text-white font-semibold">解决方案矩阵：</p>
                <ul className="space-y-1.5 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">RLS自适应滤波：</strong>
                      以IMU三轴加速度为参考信号，实时跟踪并消除与运动相关的信号成分
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">IMU运动状态感知：</strong>
                      检测运动类型（跑步/骑行/静止），切换对应的滤波参数集
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">SQI门控：</strong>
                      低信噪比时段主动输出"数据不可用"标记，避免错误数据误导用户
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">干电极优化：</strong>
                      医用导电硅胶材料选择（体积电阻率 &lt;100 &Omega;·cm），表面纹理设计增加皮肤附着力，降低滑动幅度
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            {/* Challenge 2 */}
            <GlassCard className="p-6" highlight color="teal">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    电极接触变化
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-mono">
                    高优先级
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                BioZ信号的精度高度依赖电极-皮肤接触的稳定性。电极接触阻抗从安静时的 ~10-50 k&Omega; 可能飙升至运动时的
                100-500 k&Omega;（汗水、皮肤牵拉）。接触阻抗的快速变化会导致 BioZ
                信号中出现阶跃跳变，难以与真实的呼吸变化区分开。此外，完全脱离（连接丢失）将导致数据完全丢失。
              </p>
              <div className="space-y-2 text-xs">
                <p className="text-white font-semibold">解决方案矩阵：</p>
                <ul className="space-y-1.5 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">四电极配置：</strong>
                      感应电极高输入阻抗（&gt;10
                      M&Omega;）使接触阻抗的相对变化对测量影响降至最低
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">阻抗谱监测：</strong>
                      周期性（每5分钟）测量单个电极对皮肤的接触阻抗（扫描 1-100 kHz），建立接触质量趋势，提前预警脱落
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">导电硅胶优化：</strong>
                      碳纳米管（CNT）填充硅胶 vs. 银纳米线填充硅胶的对比——CNT型接触阻抗更稳定但初始阻抗更高，银纳米线型初始阻抗更低但在汗水中长期稳定性不如CNT
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">接触压力反馈：</strong>
                      在胸带扣具中集成柔性压阻传感器，监测带体对胸部的压力，当压力低于阈值时提示用户调整
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            {/* Challenge 3 */}
            <GlassCard className="p-6" highlight color="teal">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <path d="M4 22v-7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    多传感器共存串扰
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono">
                    中优先级
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                在三合一胸带中，ECG放大器（带宽 0.05-150 Hz）、BioZ激励源（50
                kHz）、温度传感器（I&sup2;C低速率数字信号）共存在一个狭小空间（&lt;50 &times; 30
                mm）的PCB上。50 kHz BioZ激励电流 &sim;100 &micro;A 虽然微弱，但足以通过电磁耦合干扰 ECG
                微弱信号（&sim;1 mV 量级）。同时，三者的采样机制和时钟分配需要精密协调。
              </p>
              <div className="space-y-2 text-xs">
                <p className="text-white font-semibold">解决方案矩阵：</p>
                <ul className="space-y-1.5 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">TDM时分复用：</strong>
                      MAX30001内置时分复用机制——BioZ激励与ECG采样以交错时序进行，BioZ激
                      励脉冲仅在 ECG ADC 采样窗口关闭后的间隙期注入，避免激励频率的谐波分量混入 ECG 频带
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">MAX30001内置隔离：</strong>
                      ECM（电磁兼容）优化在芯片层面已完成——激励驱动与感应通路之间内置屏蔽和校准网络
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">独立激励频率选择：</strong>
                      BioZ激励(50 kHz)与ECG信号(0.05-150 Hz)的频域间隔超 5 个十倍频程，模拟前端的抗混叠滤波器（低通，截止 ~1 kHz）对 50 kHz 载波的衰减 &gt;60 dB
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span>
                      <strong className="text-white">PCB布局优化：</strong>
                      BioZ激励走线与ECG感应走线正交布线（90度交叉），最小化互感耦合；I&sup2;C（温度传感器）远离模拟信号路径，降低数字噪声耦合
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ============================================================
          Footer Navigation
          ============================================================ */}
      <section
        className="py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(8,145,178,0.05), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              继续探索技术全景
            </h2>
            <p className="text-[#94A3B8]">
              每个技术领域均有独立深度页面，覆盖从原理到工程实现的完整链路
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/technology" className="group">
              <GlassCard className="p-8 text-center h-full hover:-translate-y-1 transition-all duration-300 hover:border-green-500/20">
                <div className="flex justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  技术概览
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  四层架构总览 + 芯片方案对比 + 集成挑战分析
                </p>
              </GlassCard>
            </Link>

            <Link href="/technology/temperature" className="group">
              <GlassCard className="p-8 text-center h-full hover:-translate-y-1 transition-all duration-300 hover:border-teal-500/20">
                <div className="flex justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  核心体温监测
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  单热流 vs 双热流对比，CORE 2 验证数据与自研方案
                </p>
              </GlassCard>
            </Link>

            <Link href="/technology/combinations" className="group">
              <GlassCard className="p-8 text-center h-full hover:-translate-y-1 transition-all duration-300 hover:border-green-500/20">
                <div className="flex justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
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
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  硬件组合方案
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  二合一到三合一，六种芯片方案 BOM 与功耗完整对比
                </p>
              </GlassCard>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
