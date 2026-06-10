import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";

interface MetricCardProps {
  name: string;
  nameEn: string;
  unit: string;
  range: string;
  description: string;
  application: string;
  relevance: "high" | "medium" | "low";
}

function MetricCard({
  name,
  nameEn,
  unit,
  range,
  description,
  application,
  relevance,
}: MetricCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-base font-semibold text-white">{name}</h4>
          <p className="text-sm text-[#64748B] font-mono">{nameEn}</p>
        </div>
        {relevance === "high" && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 shrink-0">
            AI 核心
          </span>
        )}
        {relevance === "medium" && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            重要
          </span>
        )}
      </div>
      <div className="flex gap-3 text-sm mb-3">
        <span className="text-green-400 font-mono">{unit}</span>
        <span className="text-[#475569]">|</span>
        <span className="text-[#94A3B8]">{range}</span>
      </div>
      <p className="text-base text-[#94A3B8] leading-relaxed mb-3">
        {description}
      </p>
      <div className="data-highlight text-sm">
        <span className="text-[#64748B]">训练应用：</span>
        {application}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  title,
  input,
  output,
  approach,
}: {
  phase: string;
  title: string;
  input: string;
  output: string;
  approach?: string;
}) {
  return (
    <div className="glass-card p-6 relative">
      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-black font-bold">
        {phase}
      </div>
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-[#64748B]">输入：</span>
          <span className="text-[#94A3B8]">{input}</span>
        </div>
        <div>
          <span className="text-[#64748B]">输出：</span>
          <span className="text-[#94A3B8]">{output}</span>
        </div>
        {approach && (
          <div>
            <span className="text-[#64748B]">方法：</span>
            <span className="text-green-400">{approach}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const ecgMetrics = [
  {
    name: "心率 (HR)",
    nameEn: "Heart Rate",
    unit: "bpm",
    range: "安静40-60 / 最大180-210",
    description:
      "最基础但最关键的实时训练强度指标。通过R-R间期瞬时计算，反映心脏对运动负荷的即时响应。结合心率变异趋势可区分疲劳与体能提升。",
    application:
      "实时训练区间指导（Zone 1-5），长时间心率漂移监测（Cardiovascular Drift），最大心率与静息心率趋势追踪。",
    relevance: "high" as const,
  },
  {
    name: "心率变异性 (HRV)",
    nameEn: "Heart Rate Variability",
    unit: "RMSSD ms",
    range: "20-100 (运动员偏高)",
    description:
      "逐次心跳间期的微小变化，是自主神经系统功能的窗口。高HRV表示副交感神经主导（恢复良好），低HRV提示交感神经主导（应激/疲劳/训练过度）。",
    application:
      "每日晨起HRV趋势是训练准备度的黄金指标。连续3天低于基线80%应主动减量。与呼吸率联合分析可提高恢复评估准确率。",
    relevance: "high" as const,
  },
  {
    name: "RMSSD",
    nameEn: "Root Mean Square of Successive Differences",
    unit: "ms",
    range: "20-100",
    description:
      "相邻R-R间期差值的均方根，是副交感神经活动的最纯净指标。相比SDNN，RMSSD对短时变化更敏感，是晨间HRV测量的首选参数。",
    application:
      "每日晨间1分钟短时RMSSD测量足以评估恢复状态。配合主观疲劳问卷，准确率可达85%+。",
    relevance: "high" as const,
  },
  {
    name: "SDNN",
    nameEn: "Standard Deviation of NN Intervals",
    unit: "ms",
    range: "30-150 (24h) / 20-60 (5min)",
    description:
      "全部正常窦性R-R间期的标准差，反映自主神经系统的总体变异性。24小时SDNN<50ms与心血管风险增加相关，但短时SDNN受呼吸影响较大。",
    application:
      "长时SDNN趋势反映整体适应状态。与RMSSD比值可评估交感-副交感平衡变化。适合周趋势分析。",
    relevance: "medium" as const,
  },
  {
    name: "LF/HF 比值",
    nameEn: "Low/High Frequency Ratio",
    unit: "ratio",
    range: "0.5-10",
    description:
      "心率变异性频域分析中低频(0.04-0.15Hz)与高频(0.15-0.40Hz)功率之比。传统认为反映交感-副交感平衡，但现代观点认为该解释过于简化。",
    application:
      "结合时域指标（RMSSD/SDNN）综合判断恢复状态。长时间运动后LF/HF升高提示交感神经持续激活。",
    relevance: "medium" as const,
  },
  {
    name: "压力指数",
    nameEn: "Baevsky's Stress Index",
    unit: "SI units",
    range: "50-500",
    description:
      "基于心率变异性直方图分布的复合指标。高值表示心率节律趋于僵化（高应激），低值表示良好的自主调节能力。",
    application:
      "训练负荷的累计压力监测。SI>300持续2天应强制减量。配合主观RPE形成交叉验证。",
    relevance: "medium" as const,
  },
  {
    name: "恢复准备度",
    nameEn: "Recovery Readiness",
    unit: "0-100 score",
    range: ">70为良好",
    description:
      "综合HRV、静息心率、呼吸率、睡眠质量等多参数的恢复评估得分。0-100分制，>85分为完全恢复，<50分应避免高强度训练。",
    application:
      "每日训练前查看准备度决定训练强度。AI教练根据准备度自动调整当日训练计划——这是H/R/T三合一的核心价值之一。",
    relevance: "high" as const,
  },
  {
    name: "训练冲量 (TRIMP)",
    nameEn: "Training Impulse",
    unit: "AU",
    range: "0-300+/session",
    description:
      "基于心率-时间曲线与强度权重的训练负荷量化方法。Banister原始TRIMP或Edwards TRIMP均可从ECG数据计算。结合呼吸率和体温可改进负荷估算精度。",
    application:
      "周/月TRIMP趋势是训练负荷管理的基石。结合体温数据可更准确评估热环境下的真实生理负荷。AI教练的核心周期化规划输入。",
    relevance: "high" as const,
  },
];

const respirationMetrics = [
  {
    name: "呼吸率 (RR)",
    nameEn: "Respiratory Rate",
    unit: "rpm",
    range: "安静8-16 / 最大40-60",
    description:
      "每分钟呼吸次数。是少数同时受自主神经和中枢神经双重控制的生理指标。运动时呼吸率与强度呈非线性增长，在VT1和VT2处出现拐点。",
    application:
      "实时呼吸率是训练强度的第二维度（心率之外）。夜间呼吸率升高是早期过度训练的敏感指标。",
    relevance: "high" as const,
  },
  {
    name: "潮气量估算 (TV)",
    nameEn: "Tidal Volume Estimate",
    unit: "mL",
    range: "安静300-500 / 最大2000-3000",
    description:
      "每次呼吸吸入或呼出的气体量。BioZ测量的胸廓ΔZ与潮气量的Pearson相关系数为0.93±0.05，使其成为非面罩式潮气量估算的最可行方案。",
    application:
      "潮气量与呼吸率的乘积=分钟通气量。运动经济性评估：同一速度下潮气量增加提示呼吸效率下降。",
    relevance: "medium" as const,
  },
  {
    name: "分钟通气量 (VE)",
    nameEn: "Minute Ventilation",
    unit: "L/min",
    range: "安静5-10 / 最大120-200",
    description:
      "每分钟吸入/呼出气体总量 = 呼吸率 × 潮气量。是反映代谢需求的最直接呼吸指标。VE/VCO2斜率是心肺适能的金标准参数。",
    application:
      "VE拐点与乳酸阈高度相关。VE趋势可替代昂贵的气体分析设备，实现日常训练的代谢强度评估。三合一胸带的核心差异化指标。",
    relevance: "high" as const,
  },
  {
    name: "VT1 检测",
    nameEn: "First Ventilatory Threshold",
    unit: "%HRmax",
    range: "65-80%",
    description:
      "第一通气阈——从纯有氧代谢向有氧+无氧混合代谢过渡的拐点。对应血乳酸约2 mmol/L。在VT1以下训练可最大化脂肪氧化和线粒体生物生成。",
    application:
      "VT1是极化训练中Zone 2的上限。Visma教练Heijboer明确指出呼吸数据使车队从'极端极化'转向'基于VT1的训练'，这是UAE车队成功的关键差异化因素。",
    relevance: "high" as const,
  },
  {
    name: "VT2 检测",
    nameEn: "Second Ventilatory Threshold",
    unit: "%HRmax",
    range: "85-95%",
    description:
      "第二通气阈——呼吸代偿点，反映高强度运动的可持续上限。VE非线性激增、呼吸率骤升，对应血乳酸约4 mmol/L。VT2以上每增加1km/h速度，生理代价成倍增长。",
    application:
      "比赛配速策略的核心参考。AI教练根据VT2位置建议FTP/CP测试强度和比赛开局的功率/配速上限。",
    relevance: "high" as const,
  },
  {
    name: "呼吸模式",
    nameEn: "Breathing Pattern",
    unit: "ratio",
    range: "胸式/腹式主导比",
    description:
      "胸式呼吸与腹式呼吸的比例。疲劳时倾向于胸式主导（浅快），恢复良好时腹式主导（深慢）。多频率BioZ可区分胸廓不同部位的扩张模式。",
    application:
      "实时呼吸模式反馈帮助运动员优化呼吸策略。耐力项目中腹式呼吸训练可提升呼吸效率8-12%。游泳/骑行等特定体位下的呼吸模式诊断。",
    relevance: "medium" as const,
  },
  {
    name: "通气效率",
    nameEn: "Ventilatory Efficiency",
    unit: "VE/VCO2 slope",
    range: "<30正常 / >35异常",
    description:
      "每排出1升CO2所需通气量的斜率。是心肺功能的综合指标，不受主观努力影响。在慢性心衰管理中已广泛使用，在运动领域的应用正在拓展。",
    application:
      "VE/VCO2斜率下降提示有氧能力提升。对高原训练反应评估尤为敏感。耐力运动员年度体测的核心参数之一。",
    relevance: "medium" as const,
  },
  {
    name: "呼吸性窦性心律不齐 (RSA)",
    nameEn: "Respiratory Sinus Arrhythmia",
    unit: "ms",
    range: "随呼吸深度变化",
    description:
      "吸气时心率增快、呼气时心率减慢的自然生理现象。RSA幅度是迷走神经张力的敏感指标，随年龄和体能水平变化。BioZ呼吸波形与ECG R-R间期交叉相关。",
    application:
      "RSA幅度可作为副交感神经功能的独立验证。RSA-呼吸率联合分析可更精准评估自主神经功能状态。",
    relevance: "medium" as const,
  },
];

const tempMetrics = [
  {
    name: "核心体温",
    nameEn: "Core Body Temperature",
    unit: "°C",
    range: "安静36.5-37.5 / 运动38.0-39.5",
    description:
      "人体深部组织的温度，是热调节状态的最核心指标。非侵入式测量是穿戴设备领域的前沿挑战。运动时核心体温每升高1°C，运动表现下降2-5%。",
    application:
      "热适应训练的量化基础(核心体温>38.5°C持续60分钟触发适应)。比赛热管理策略的实时决策依据。安全红线:持续>39.5°C应强制停止。",
    relevance: "high" as const,
  },
  {
    name: "皮肤温度",
    nameEn: "Skin Temperature",
    unit: "°C",
    range: "28-36",
    description:
      "皮肤表面温度，由TMP117等接触式传感器直接采集。受环境温度、血流灌注和出汗蒸发共同影响。与核心体温的差值反映外周血管舒缩状态。",
    application:
      "皮肤温度骤降提示外周血管收缩（冷应激/脱水）。运动起始皮肤温度升高速率反映预热效果。",
    relevance: "medium" as const,
  },
  {
    name: "热应变指数",
    nameEn: "Heat Strain Index",
    unit: "0-10 score",
    range: ">7为高风险",
    description:
      "综合核心体温、心率、出汗率和主观感受的热应激评估。0-10分制，>8分提示热损伤风险。核心体温是计算该指数的最关键输入。",
    application:
      "AI教练在指数>7时自动降低建议训练强度，>8时建议停止户外训练。军事和工业热安全的重要参考。",
    relevance: "high" as const,
  },
  {
    name: "热适应状态",
    nameEn: "Thermal Adaptation Status",
    unit: "days/level",
    range: "7-14天完整适应",
    description:
      "通过连续热暴露追踪核心体温下降趋势和心率热漂移减少程度来评估热适应进展。完整热适应需7-14天，表现为运动时核心体温降低0.3-0.5°C。",
    application:
      "热适应训练计划的进度追踪。赛前热适应窗口规划（通常需要赛前10天到达比赛地开始适应）。",
    relevance: "high" as const,
  },
  {
    name: "核心-皮肤温差",
    nameEn: "Core-Skin Gradient",
    unit: "°C",
    range: "1-5",
    description:
      "核心体温与皮肤温度之差。缩小提示外周血管扩张散热增加，扩大提示血管收缩保热。是热调节效率的综合指标。",
    application:
      "梯度<1°C持续30分钟提示散热系统接近极限。冷环境中梯度>5°C提示外周灌注不足。赛前热身的停止信号。",
    relevance: "medium" as const,
  },
  {
    name: "降温速率",
    nameEn: "Cooling Rate",
    unit: "°C/min",
    range: "0.01-0.05",
    description:
      "运动后核心体温的下降速率。降温快提示热调节系统功能良好，降温慢提示热疲劳或脱水。比赛间歇期的降温效率直接影响后续表现。",
    application:
      "中场休息/试合间期的降温策略效果评估。冷疗干预（冰背心、冷饮）的量化效果验证。",
    relevance: "medium" as const,
  },
  {
    name: "昼夜节律相位",
    nameEn: "Circadian Phase",
    unit: "hours",
    range: "振幅0.3-0.5°C",
    description:
      "核心体温以约24小时为周期波动，清晨最低(约36.1°C)，傍晚最高(约37.0°C)。体温节律是评估昼夜节律稳定性的最佳指标之一。",
    application:
      "晨间体温相位延迟提示生物钟紊乱。跨时区比赛时的时差适应追踪。睡眠质量与体温节律的关联分析。",
    relevance: "medium" as const,
  },
  {
    name: "运动性高热",
    nameEn: "Exercise-Induced Hyperthermia",
    unit: "°C above baseline",
    range: "+1.0-3.0",
    description:
      "运动强度与持续时间驱动的核心体温升高幅度。与运动负荷正相关，与散热能力负相关。核心体温>39.5°C时中枢神经系统功能开始受损。",
    application:
      "个体化的热耐受极限评估。长时间比赛（如IRONMAN/大环赛山地赛段）的配速策略核心参考。结合心率热漂移判断是否需要主动降温。",
    relevance: "high" as const,
  },
];

export default function PhysiologyPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="运动生理学框架"
        titleGradient="三传感器驱动的生理指标全景"
        subtitle="ECG 心率 · 呼吸力学 · 核心体温 — 24 项关键生理指标的采集、计算与应用"
        description="从原始信号到训练决策——三个传感器如何构建完整的运动生理数据飞轮，为 AI 教练提供从恢复评估到比赛策略的全链路决策支持。"
        badge={{ text: "Exercise Physiology", color: "green" }}
      />

      {/* Sensor-to-Metrics Overview */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "首页", href: "/" }, { label: "运动生理学" }]}
          />

          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              三传感器 → 指标体系总览
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              每个传感器独立产生多项生理指标，交叉融合后产生更高维度的训练洞察。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F87171"
                  strokeWidth="1.5"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                ECG 心电
              </h3>
              <p className="text-green-400 text-2xl font-bold font-mono mb-2">
                8
              </p>
              <p className="text-xs text-[#94A3B8]">
                HR, HRV, RMSSD, SDNN, LF/HF,
                <br />
                压力指数, 恢复准备度, TRIMP
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <path d="M4 22v-7" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                呼吸力学
              </h3>
              <p className="text-green-400 text-2xl font-bold font-mono mb-2">
                8
              </p>
              <p className="text-xs text-[#94A3B8]">
                RR, TV, VE, VT1, VT2,
                <br />
                呼吸模式, 通气效率, RSA
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="1.5"
                >
                  <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                核心体温
              </h3>
              <p className="text-green-400 text-2xl font-bold font-mono mb-2">
                8
              </p>
              <p className="text-xs text-[#94A3B8]">
                T_core, T_skin, 热应变指数,
                <br />
                热适应, 温差梯度, 降温速率, 节律相位, 高热
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ECG Metrics */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F87171"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              ECG 心电指标
            </h2>
            <span className="text-xs text-[#64748B]">8 项</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ecgMetrics.map((m) => (
              <MetricCard key={m.nameEn} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Respiration Metrics */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <path d="M4 22v-7" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              呼吸力学指标
            </h2>
            <span className="text-xs text-[#64748B]">8 项</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {respirationMetrics.map((m) => (
              <MetricCard key={m.nameEn} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Temperature Metrics */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
              >
                <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              核心体温指标
            </h2>
            <span className="text-xs text-[#64748B]">8 项</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tempMetrics.map((m) => (
              <MetricCard key={m.nameEn} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Coach Pathway */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              AI 教练能力路径
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              从原始传感器信号到智能训练决策的四阶段演进路径。每一步都建立在上一步的基础上。
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/30 to-transparent hidden sm:block" />

            <div className="space-y-8">
              <PhaseCard
                phase="1"
                title="数据采集与预处理"
                input="ECG原始信号(250Hz) + BioZ波形(64Hz) + 温度(1Hz) + 加速度计(50Hz)"
                output="清洗后的多通道同步时间序列 + 信号质量标签(SQI 0-100)"
                approach="RLS自适应滤波 + IMU运动补偿 + 硬件时间戳同步 + 动态范围自适应"
              />
              <PhaseCard
                phase="2"
                title="指标计算与特征提取"
                input="清洗后的时间序列数据"
                output="24项生理指标 + 50+衍生特征(趋势、变异性、耦合特征、个体基线偏差)"
                approach="时域/频域分析 + 峰值检测算法 + 卡尔曼滤波 + 多传感器交叉特征(心肺耦合、热-心率漂移)"
              />
              <PhaseCard
                phase="3"
                title="生理状态推断"
                input="24项生理指标 + 历史基线 + 训练日志 + 环境数据"
                output="恢复状态(0-100)、训练准备度、疲劳等级、热应激风险、VT1/VT2位置、昼夜节律相位"
                approach="贝叶斯层次模型 + 个体化基线校准 + 多参数异常检测 + 趋势预测(LSTM)"
              />
              <PhaseCard
                phase="4"
                title="AI 教练决策输出"
                input="生理状态 + 训练目标 + 日历上下文 + 环境预报"
                output="每日训练建议、恢复干预建议、热适应计划、比赛策略、过度训练预警、长期周期分析"
                approach="强化学习(训练计划优化) + 规则引擎(安全边界) + LLM(自然语言解释) + 用户反馈闭环"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Moat */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              竞争壁垒分析
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              三合一胸带不只是硬件产品，其数据飞轮和算法壁垒构成长期护城河。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "数据飞轮",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                desc: "更多用户 → 更多标注数据 → 更精准的算法（VT1/VT2检测、核心体温估算）→ 更好的用户体验 → 更多用户。先发者的数据积累是后发者难以逾越的壁垒。",
              },
              {
                title: "算法壁垒",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                ),
                desc: "多传感器融合算法（ECG+BioZ+Temp）的参数调优需要大量金标准对照数据（肺活量计、可吞服药丸）。参数无法从论文中复制——必须自研积累。",
              },
              {
                title: "认证壁垒",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                desc: "FDA 510(k) 6-12个月 + CE MDR 9-18个月 + NMPA 6-12个月。先取得认证的企业在时间上建立壁垒。后发者即使产品Ready也需等认证周期。",
              },
              {
                title: "生态锁定",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                  >
                    <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
                    <path d="M16 8L2 22M17.5 15H9" />
                  </svg>
                ),
                desc: "开放SDK + 第三方App集成（TrainingPeaks、Garmin Connect、Wahoo）→ 用户历史数据沉淀 → 高迁移成本。对标Polar BLE SDK的成功模式。",
              },
            ].map((moat) => (
              <div key={moat.title} className="glass-card p-6 flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  {moat.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {moat.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {moat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visma AI Comparison */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              与 Visma 车队 AI 战略的对照
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              Visma 2026年与 Mistral AI 签约，但硬件数据来源碎片化是 AI
              分析的最大瓶颈。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-sm font-semibold text-red-400 mb-4">
                当前：碎片化设备 + 碎片化数据
              </h3>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex gap-2">
                  <span className="text-red-400">✗</span>
                  4个独立传感器 + 4个App + 4个数据格式
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">✗</span>
                  数据时间戳不同步，无法交叉分析
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">✗</span>
                  教练手动整合数据耗时 &gt;30min/运动员
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">✗</span>
                  Mistral AI 缺乏结构化生理输入
                </li>
              </ul>
            </div>
            <div className="glass-card-elevated p-8 glow-green border-green-500/10">
              <h3 className="text-sm font-semibold text-green-400 mb-4">
                愿景：三合一 + 统一数据流 + AI 自动分析
              </h3>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  一个设备 → 一个数据流 → 时间戳天然同步
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  交叉特征自动计算（心肺耦合、热-心率漂移）
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  AI 教练瞬时生成训练报告 &lt;5秒
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  结构化数据直接作为 LLM 上下文输入
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/technology/combinations"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 transition-colors text-sm"
            >
              查看硬件组合方案 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
