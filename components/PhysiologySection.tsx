const METRICS_ECG = [
  "心率 (HR): 40-240 bpm @ 1Hz",
  "HRV 时域: RMSSD, SDNN, pNN50",
  "心率变异 (HRV) 频域: LF, HF, LF/HF",
  "静息心率 (RHR) 连续监测",
  "最大心率 (MHR) 估算与校准",
  "心率恢复 (HRR) 1min/2min",
  "训练冲量 (TRIMP) 积分",
  "心血管漂移 (CV Drift) 趋势",
  "呼吸性窦性心律 (RSA) 幅度",
];

const METRICS_BIOZ = [
  "呼吸频率 (RR): 4-60 bpm",
  "潮气量 (TV): 相对变化",
  "分钟通气量 (VE) 估算",
  "通气阈值 VT1 / VT2 检测",
  "呼吸深度 (Breathing Depth)",
  "吸气/呼气时间比 (I:E Ratio)",
  "呼吸频率变异 (RFV)",
  "VO2max 间接估算",
];

const METRICS_TEMP = [
  "核心体温 (Tcore) @ 0.01°C",
  "皮肤温度 (Tskin) 多点",
  "热应激指数 (HSI) 计算",
  "热习服 (Heat Acclimation) 状态",
  "脱水风险 (Dehydration Risk)",
  "热舒适度 (Thermal Comfort)",
  "月经周期体温追踪",
  "热负荷 (Heat Load) 积分",
];

const TIMELINE_PHASES = [
  {
    badge: "第一阶段",
    title: "数据采集",
    color: "green",
    items: [
      "ECG 250Hz · BioZ 64Hz · Temp 1Hz",
      "自适应滤波 RLS/LMS",
      "HRV 时域频域特征提取",
      "呼吸周期分割与标注",
    ],
  },
  {
    badge: "第二阶段",
    title: "指标计算",
    color: "blue",
    items: [
      "TRIMP · TSS · ATL · CTL · TSB",
      "通气阈值 VT1/VT2 V-slope",
      "HSI 加权积分计算",
      "恢复评分 Recovery Score",
    ],
  },
  {
    badge: "第三阶段",
    title: "模型推理",
    color: "purple",
    items: [
      "过训练预测 LSTM/Transformer",
      "心率区间动态推荐",
      "热调节曲线建模",
      "多维异常检测算法",
    ],
  },
  {
    badge: "第四阶段",
    title: "AI 教练输出",
    color: "amber",
    items: [
      "自然语言训练建议生成",
      "热适应策略与补水计划",
      "恢复 vs 强度决策引擎",
      "长期趋势报告与周期规划",
    ],
  },
];

const MOAT_CARDS = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-3-3v6m-5 4h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    title: "多模态感知",
    description:
      "ECG+BioZ+Temp三通道同步采集，构建单一传感器无法实现的生理状态全貌",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3z"
      />
    ),
    title: "个性化建模",
    description:
      "个体基线校准、热习服曲线、通气阈值自适应，千人千面的精准模型",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
    title: "预测性洞察",
    description:
      "从被动监测到主动预警：过训练、热应激、脱水风险在发生前即可预测",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
    title: "生态数据飞轮",
    description:
      "设备数 x 训练时长 x 生理信号维度 — 数据越多模型越强，形成持久壁垒",
  },
];

const CONTRIBUTION_COLUMNS = [
  {
    sensor: "ECG",
    label: "心率 / 心电图",
    color: "#22C55E",
    colorClass: "text-green-400",
    borderClass: "border-green-500/20",
    checks: [
      "实时心率区间训练指导",
      "HRV 恢复状态每日评分",
      "心肺耦合 RSA 生物反馈",
      "TRIMP 训练负荷量化",
      "HRR 心血管适能跟踪",
    ],
    insight:
      "心率是所有训练模型的基础输入，HRV是恢复评估的黄金指标。ECG提供心脏自主神经系统的窗口，是AI教练量化训练负荷与恢复平衡的核心数据源。",
  },
  {
    sensor: "BioZ",
    label: "生物阻抗 / 呼吸",
    color: "#3B82F6",
    colorClass: "text-blue-400",
    borderClass: "border-blue-500/20",
    checks: [
      "通气阈值 VT1/VT2 无创检测",
      "呼吸效率 VE/VO2 实时评估",
      "呼吸肌疲劳早期预警",
      "节律性呼吸指导与训练",
      "VO2max 心肺耐力估算",
    ],
    insight:
      "呼吸是唯一能直接测量通气阈值的可穿戴方法，无替代方案。BioZ使乳酸阈训练从实验室走进日常训练，彻底改变了强度分区的精度和可及性。",
  },
  {
    sensor: "CoreTemp",
    label: "核心体温",
    color: "#F59E0B",
    colorClass: "text-amber-400",
    borderClass: "border-amber-500/20",
    checks: [
      "热应激安全阈值实时监控",
      "热习服训练进度跟踪",
      "脱水风险加权评估",
      "月经周期训练适配",
      "环境热负荷决策支持",
    ],
    insight:
      "世巡赛车队65%+已采用CORE传感器，但独立验证精度有待提升。核心体温是耐力运动中最被低估的生理指标，与功率输出衰减直接相关。",
  },
];

function ColorBadge({ color }: { color: string }) {
  const colorMap: Record<string, string> = {
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border text-xs font-semibold tracking-wider ${colorMap[color] ?? colorMap.green}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      {color === "green" && "ECG"}
      {color === "blue" && "BioZ"}
      {color === "purple" && "模型"}
      {color === "amber" && "AI"}
    </span>
  );
}

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 mt-0.5 text-green-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PhysiologySection() {
  return (
    <section id="physiology" className="bg-[#0A0A1A] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Chapter label */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/[0.03] border border-white/[0.06] text-[#64748B] text-xs font-semibold tracking-wider uppercase">
            第三章 · 运动生理学框架
          </span>
        </div>

        {/* Section heading */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
          从传感器数据到
          <br />
          <GradientText>AI 教练</GradientText>
        </h2>

        {/* ==================== SENSOR CARDS ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* ECG Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h4l2-8 4 16 2-8h4"
                />
              </svg>
              <h3 className="text-green-400 font-heading font-bold text-lg">
                ECG
              </h3>
              <span className="text-[#64748B] text-xs">心率 / 心电图</span>
            </div>
            <ul className="space-y-2.5">
              {METRICS_ECG.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2 text-sm text-[#94A3B8]"
                >
                  <span className="w-1 h-1 rounded-full bg-green-500/50 shrink-0 mt-1.5" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          {/* BioZ Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104a9 9 0 00-6.646 8.719 9 9 0 004.306 7.677M9.75 3.104A9 9 0 0118 12a9 9 0 01-2.298 6M9.75 3.104a8.97 8.97 0 012.25-.29m0 0c3.96 0 7.335 2.56 8.402 6m-8.402-6a9 9 0 018.402 6m0 0a9 9 0 01-2.36 5.76"
                />
              </svg>
              <h3 className="text-blue-400 font-heading font-bold text-lg">
                BioZ
              </h3>
              <span className="text-[#64748B] text-xs">
                生物阻抗 / 呼吸
              </span>
            </div>
            <ul className="space-y-2.5">
              {METRICS_BIOZ.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2 text-sm text-[#94A3B8]"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/50 shrink-0 mt-1.5" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          {/* CoreTemp Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v13m0 0a4 4 0 01-4-4V6a4 4 0 118 0v6a4 4 0 01-4 4z"
                />
              </svg>
              <h3 className="text-amber-400 font-heading font-bold text-lg">
                CoreTemp
              </h3>
              <span className="text-[#64748B] text-xs">核心体温</span>
            </div>
            <ul className="space-y-2.5">
              {METRICS_TEMP.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2 text-sm text-[#94A3B8]"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-500/50 shrink-0 mt-1.5" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==================== AI COACH TIMELINE ==================== */}
        <div className="mt-24">
          <h3 className="font-heading text-2xl font-bold">
            AI 教练能力构建路径
          </h3>

          <div className="relative mt-12">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-amber-500" />

            <div className="space-y-8">
              {TIMELINE_PHASES.map((phase, idx) => (
                <div key={phase.title} className="relative ml-12">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[3.15rem] top-2 w-3 h-3 rounded-full border-2 ${
                      idx === 0
                        ? "bg-green-500 border-green-500"
                        : idx === 1
                          ? "bg-blue-500 border-blue-500"
                          : idx === 2
                            ? "bg-purple-500 border-purple-500"
                            : "bg-amber-500 border-amber-500"
                    }`}
                  />

                  {/* Glass card */}
                  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ColorBadge color={phase.color} />
                      <span className="text-white font-heading font-bold text-lg">
                        {phase.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-sm text-[#94A3B8]"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 mt-1.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== COMPETITIVE MOAT ==================== */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold">
            三合一数据构建 AI 教练竞争壁垒
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {MOAT_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h4 className="text-sm text-white font-bold mb-2">
                  {card.title}
                </h4>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== SENSOR CONTRIBUTION ==================== */}
        <div className="mt-20">
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 lg:p-12">
            <h3 className="font-heading text-2xl font-bold mb-10">
              各传感器对 AI 教练的能力贡献
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {CONTRIBUTION_COLUMNS.map((col) => (
                <div key={col.sensor} className="flex flex-col">
                  {/* Sensor label */}
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: col.color }}
                    />
                    <h4 className={`font-heading font-bold text-lg ${col.colorClass}`}>
                      {col.sensor}
                    </h4>
                    <span className="text-[#64748B] text-xs">
                      {col.label}
                    </span>
                  </div>

                  {/* Check items */}
                  <ul className="space-y-3 flex-1">
                    {col.checks.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#94A3B8]"
                      >
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div
                    className={`h-px my-6 ${col.borderClass}`}
                    style={{
                      background: `linear-gradient(to right, ${col.color}33, transparent)`,
                    }}
                  />

                  {/* Key insight */}
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {col.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
