import { Module } from "@/lib/types";

export const l5Modules: Module[] = [
  {
    id: "L5:training-load",
    layer: "L5",
    name: "训练负荷优化",
    summary: "基于TRIMP、恢复就绪度、VT1/VT2位置动态计算次日最佳训练量和强度区间，自动调整计划防止过度训练。",
    description:
      "训练负荷优化是AI教练的核心模块，它将L4恢复就绪度（当前恢复状态）、L4 TRIMP（近期训练负荷）和L3 VT1/VT2（当前有氧/无氧阈值位置）三者融合，输出次日个性化训练建议。核心决策逻辑：恢复就绪度 > 85分时系统允许高强度训练（Zone 4-5）；70-85分建议中等强度训练（Zone 2-3为主）；50-70分建议轻松恢复训练（Zone 1）；<50分强制建议休息或低强度活动 [ref-haddad-athlete-2024]。\n\n" +
      "训练负荷优化的关键创新在于动态急性/慢性负荷比（ACWR）管理。传统ACWR使用固定的7天/28天窗口，但这个窗口对所有运动员一视同仁。HeartBeat系统的个体化ACWR基于恢复就绪度的历史数据自适应调整窗口长度——恢复快的运动员可以使用更短的慢性窗口（如21天），从而更快地适应训练负荷增加；恢复慢的运动员扩大慢性窗口（如35天），使负荷增加的步伐更保守、安全。\n\n" +
      "VT1/VT2的动态位置为训练负荷优化提供了真实的生理学基础。随着有氧能力提升，VT1和VT2向更高心率百分比移动，系统自动调整各训练区间的目标心率/功率范围。此外，核心体温数据提供环境热负荷修正——当预期训练环境温度较高时，自动下调建议强度的上限，以补偿T_core加速上升带来的额外生理负荷。该模块是HeartBeat系统从'监测工具'到'主动教练'转变的标志性能力 [ref-cyclingnews-sweat-breathing]。",
    importance: "high",
    dependsOn: [
      "L4:trimp",
      "L4:recovery-readiness",
      "L3:vt1",
      "L3:vt2",
    ],
    feedsInto: [],
    tags: ["训练", "负荷", "周期化"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-haddad-athlete-2024",
      "ref-cyclingnews-sweat-breathing",
      "ref-velo-visma-tymewear",
    ],
  },
  {
    id: "L5:heat-stress-warning",
    layer: "L5",
    name: "热应激预警",
    summary: "热负荷评分超过阈值时推送分级警报（注意/警告/危险），结合出汗率下降判断无汗症前兆，预防热射病。",
    description:
      "热应激预警模块是HeartBeat系统安全防线的核心组成部分。它接收L4热负荷评分作为主要输入，当热负荷达到不同等级时触发对应的预警和干预动作：<5分（正常）仅显示当前T_core和趋势，不推送通知；5-7分（中度）推送'注意'级别提醒，建议开始主动补水；7-8分（高度）推送'警告'级别通知和振动提醒，建议立即降低运动强度并补充电解质饮料；>8分（危险）推送持续性强警报，建议立即停止户外训练/比赛，启动主动降温措施（冰水摄入、寻找阴凉处）[ref-verdel-core-2021]。\n\n" +
      "该模块的核心预警规则包含无汗症检测（anhidrosis detection）——这是劳力性热射病（EHS）的早期信号。当T_core持续上升但出汗率下降时（通常T_core上升应该伴随出汗率增加），提示散热系统即将失效。结合心率数据可区分无汗症和单纯的环境湿度问题：出汗率下降+HR异常上升=无汗症预警；出汗率下降+HR正常=环境湿度高限制了汗液蒸发（非中枢性散热功能障碍）。\n\n" +
      "热应激预警是HeartBeat系统从'事后分析'到'事前预防'转变的关键模块。传统体温监测产品（如CORE 2）只提供T_core数值显示，用户需要自己理解数据的含义并决定如何行动。HeartBeat系统的热应激预警将生理数据转化为可执行的安全建议——这是AI教练区别于被动监测器的本质 [ref-goods-core-2023]。该模块还可以在比赛前根据天气预报预估热负荷风险，帮助运动员提前规划赛前降温策略和赛中补给方案。",
    importance: "high",
    dependsOn: [
      "L4:heat-load",
      "L3:core-body-temp",
      "L3:dehydration-risk",
    ],
    feedsInto: [],
    tags: ["热应力", "安全", "预警"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
    ],
  },
  {
    id: "L5:hydration-strategy",
    layer: "L5",
    name: "补水策略",
    summary: "基于实时出汗量、Na⁺浓度和电解质平衡状态，计算精确到mL和mg的个性化补水方案，替代凭感觉喝水。",
    description:
      "补水策略模块是HeartBeat系统中最直接的实时决策输出之一。它接收L4电解质平衡指数和L3脱水风险指数，计算出当前应立即补充的液体量和电解质类型。核心算法：基于累积出汗量（由皮肤电导/出汗率推算）、汗液Na⁺浓度（ISE传感器实测）和已运动时间，给出一个明确的可执行指令——例如'现在喝500mL电解质饮料（含Na⁺约400mg）'。这是对传统'凭感觉喝水'模式的根本性改正 [ref-cyclingnews-sweat-breathing]。\n\n" +
      "补水策略的独特之处在于区分补水类型：纯水vs电解质饮料。当汗液Na⁺浓度 > 基线120%时推荐纯水（体内Na⁺浓度偏高，需稀释）；Na⁺浓度在基线80-120%时推荐标准电解质饮料（等渗）；Na⁺浓度 < 基线80%时推荐高钠电解质饮料（体内Na⁺耗竭，需快速补充）。这种分层建议基于运动营养学循证指南，其精度远远超过市面上任何基于体重变化的事后估算方法。\n\n" +
      "模块的第二层功能是个体化汗液档案的持续更新。每次训练结束后，系统自动更新用户的'汗液指纹'——包括基础出汗率、Na⁺浓度基线、出汗率-温度曲线和Na⁺浓度随运动时间的变化斜率。使用2-4周后，补水建议从'群体模型'切换到'个人模型'，使补水量的建议误差从±30%降至±10%以内。这一持续学习的闭环是汗液分析传感器的核心长期价值，也形成了使用越久、越不可能迁移到其他平台的数据锁定效应。",
    importance: "high",
    dependsOn: [
      "L4:electrolyte-balance",
      "L3:dehydration-risk",
      "L2:sodium-concentration",
    ],
    feedsInto: [],
    tags: ["补水", "电解质", "个性化"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-cyclingnews-sweat-breathing",
    ],
  },
  {
    id: "L5:recovery-optimization",
    layer: "L5",
    name: "恢复指导",
    summary: "综合恢复就绪度、昼夜节律相位和训练负荷，输出个性化的睡眠建议、营养补充方案和减量周时机判断。",
    description:
      "恢复指导模块是AI教练中将训练与休息连接起来的桥梁。它输入L4恢复就绪度（当前恢复状态）、L4昼夜节律相位（生物钟稳定性）和L4 TRIMP（近期训练负荷），输出个性化恢复建议。核心输出包括：睡眠建议（基于昼夜节律相位偏移，推荐今晚入睡时间窗口——例如'你的体温最低点延迟了1.5小时，建议今晚比平时晚30分钟入睡'）；恢复活动建议（基于恢复就绪度分数，推荐针对性恢复手段——轻松散步、泡沫轴放松、冷水浸泡等）[ref-haddad-athlete-2024]。\n\n" +
      "减量周（taper week）时机判断是该模块的高级功能。当连续14天TRIMP / 恢复就绪度的比值超过个体临界值时，系统自动建议开始1周减量期。减量期的训练量建议基于个体的最佳减量策略——研究表明减量40-60%的训练量同时保持训练强度，可在赛事前实现2-3%的运动表现提升。恢复指导模块动态计算减量期的每日训练量，确保运动员在比赛日达到超量恢复的峰值 [ref-haddad-athlete-2024]。\n\n" +
      "模块还结合体温节律信息提供训练时间建议：当训练安排在体温节律高点时段（通常为下午4-7PM）进行高强度训练，运动表现和恢复效率最优。对于晨间训练者，系统会建议适当延长热身时间（因为晨间T_core较低、肌肉温度不足）。这种基于生物学时机的训练安排是周期化训练中常被忽视但至关重要的维度——训练的效果不仅取决于你练了什么，还取决于你什么时候练。",
    importance: "medium",
    dependsOn: [
      "L4:recovery-readiness",
      "L4:circadian-phase",
      "L4:trimp",
    ],
    feedsInto: [],
    tags: ["恢复", "睡眠", "超量恢复"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-haddad-athlete-2024",
    ],
  },
  {
    id: "L5:race-pacing",
    layer: "L5",
    name: "比赛配速",
    summary: "预判VT1/VT2位置、当前热负荷和脱水趋势，生成个性化比赛配速曲线。输出如'维持当前功率可安全完赛，加速有35%撞墙风险'。",
    description:
      "比赛配速模块是HeartBeat系统在比赛日最直接的决策输出。它综合L3 VT1/VT2（体能阈值定位）、L3核心体温（热负荷约束）、L3通气效率（VE/VCO₂——心肺效率指标）和L3脱水风险，生成个性化的比赛配速策略。核心输出是一系列可执行的指导，如：'基于当前VT2位于88% HRmax，建议起步配速不超过VT1（75% HRmax），之后可在赛程后1/3加速至VT2附近' [ref-velo-visma-tymewear]。\n\n" +
      "该模块的核心算法是热负荷-脱水双约束下的安全配速曲线。随着比赛的进行和T_core上升，安全配速的上限动态下调——这不是让你变慢，而是防止你以不可持续的速度提前消耗。系统会输出一个风险概率模型：例如'在当前配速下，完赛前T_core将达到39.8°C，撞墙风险45%；建议降低5%功率使T_core峰值控制在39.2°C，撞墙风险降至15%'。这种量化风险评估将客观生理数据转化为运动员和教练都能理解的概率语言。\n\n" +
      "VE/VCO₂斜率的实时监测为配速策略提供了心肺效率维度的信息。如果比赛中VE/VCO₂斜率开始上升（通气效率下降），这可能是心肺疲劳的早期信号——此时即使心率和T_core看起来在可控范围内，也应开始积极调整配速。这种多源交叉验证的配速策略是单功能设备（纯心率带、纯功率计）无法提供的：功率计告诉你能输出多少瓦，但不告诉你在当前生理状态下维持这个功率是否可持续 [ref-cyclingnews-sweat-breathing]。HeartBeat的配速策略告诉你的不只是'该骑多快'，而是'以某个速度骑行，还能坚持多久'。",
    importance: "high",
    dependsOn: [
      "L3:vt1",
      "L3:vt2",
      "L3:core-body-temp",
      "L3:ventilatory-efficiency",
    ],
    feedsInto: [],
    tags: ["配速", "比赛", "阈值"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-velo-visma-tymewear",
      "ref-cyclingnews-sweat-breathing",
      "ref-haddad-athlete-2024",
    ],
  },
  {
    id: "L5:personalized-nutrition",
    layer: "L5",
    name: "个性化营养",
    summary: "基于汗液Na⁺流失量、能量消耗估算（心率-代谢模型）和运动持续时间，输出精确到mg的电解质补充和碳水摄入建议。",
    description:
      "个性化营养模块是AI教练将训练数据和营养科学联结起来的最终输出。它接收L4电解质平衡（Na⁺/K⁺流失情况）、L3核心体温（热环境能量消耗修正）和L4 TRIMP（训练生理负荷），计算输出训练前、中、后三个阶段的个性化营养建议。核心输出包括：训练前能量需求预估（基于预期的TRIMP×个体能量效率系数）、训练中实时补给触发（碳水补充时间窗口和剂量）、训练后精确回复营养（电解质补充量精确到mg、蛋白质摄入时机建议）[ref-cyclingnews-sweat-breathing]。\n\n" +
      "该模块的革命性在于将营养建议从'群体指南'（如'每小时补充60-90g碳水'）升级为'个体量化方案'。不同运动员的汗液电解质流失差异可达3-5倍——一个高钠汗者（Na⁺ > 70 mmol/L）在2小时高强度训练中可能流失Na⁺高达2000mg+，而低钠汗者（Na⁺ < 30 mmol/L）可能只流失500mg。群体指南无法为这两种运动员提供有意义的建议。HeartBeat系统的个性化营养模块通过连续监测个体汗液成分，为每个用户建立精确到毫克的补充方案 [ref-cyclingnews-sweat-breathing]。\n\n" +
      "能量消耗估算基于心率-代谢当量模型：HR → VO₂估算（通过个体化HR-VO₂关系）→ 能量消耗（kcal）。当T_core超过38.5°C时，能量消耗自动上调10-15%（热环境使同等强度下的代谢成本增加）。训练后模块基于实际Na⁺流失量给出个性化的补充方案：不仅告诉你需要补充多少Na⁺，还建议补钠速率（快速vs缓慢）、是否配合碳水以促进肠道Na⁺吸收。模块也整合了碳水补充时机——利用心率数据和已消耗能量估算，在糖原即将耗尽的20分钟前触发碳水补充提醒。",
    importance: "medium",
    dependsOn: [
      "L4:electrolyte-balance",
      "L3:core-body-temp",
      "L4:trimp",
    ],
    feedsInto: [],
    tags: ["营养", "热量", "补给"],
    implementations: [],
    glossaryTerms: [],
    references: [
      "ref-cyclingnews-sweat-breathing",
    ],
  },
];
