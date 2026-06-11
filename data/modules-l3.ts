import { Module } from "@/lib/types";

export const l3Modules: Module[] = [
  {
    id: "L3:vt1",
    layer: "L3",
    name: "第一通气阈值 (VT1)",
    summary: "从纯有氧代谢向有氧+无氧混合代谢过渡的拐点，对应血乳酸约2 mmol/L，是极化训练中Zone 2的上限基准。",
    description:
      "VT1（第一通气阈）是运动强度递增过程中，分钟通气量（VE）首次出现非线性加速增长的拐点。在此阈值以下，有氧代谢完全满足能量需求，脂肪氧化和线粒体生物生成达到最大效率。VT1对应血乳酸约2 mmol/L，通常位于最大心率的65-80%区间。\n\n" +
      "VT1的检测依赖BioZ传感器同时采集呼吸率（RR）和潮气量（TV），通过VE = RR x TV的实时计算识别通气效率转折点。相比血乳酸测试，BioZ非侵入式VT1检测可实现日常训练中的连续监测，无需扎血或昂贵的气体分析设备。Visma车队教练Mathieu Heijboer明确指出，呼吸数据使车队从'极端极化训练'转向'基于VT1的训练'，这是UAE车队成功的关键差异化因素 [ref-velo-visma-tymewear]。\n\n" +
      "VT1以下训练最大化脂肪氧化和线粒体生物生成，是构建有氧基础的核心区间。结合心率数据，VT1位置可根据个体训练状态下降（有氧能力提升）或上升（停训期间），提供量化的训练适应追踪。VT1的准确检测是VT2和TRIMP计算的前置条件，也是AI教练制定训练负荷和比赛配速策略的基础输入 [ref-seshadri-cardiorespiratory-2023]。",
    importance: "high",
    dependsOn: [
      "L2:respiratory-rate",
      "L2:minute-ventilation",
      "L2:hr",
    ],
    feedsInto: [
      "L3:vt2",
      "L4:trimp",
      "L5:training-load",
      "L5:race-pacing",
    ],
    tags: ["通气阈值", "有氧训练", "代谢转换", "训练区间"],
    implementations: [
      {
        type: "mainstream",
        name: "BioZ VE拐点检测",
        vendor: "自研 / Visma Tymewear方法",
        description:
          "通过BioZ传感器采集呼吸率（RR）和潮气量（TV），实时计算分钟通气量（VE = RR x TV），使用滑动窗口线性回归检测VE-VO₂关系的第一次斜率转折点。窗口大小60秒，阈值灵敏度基于个体化基线校准。",
        pros: [
          "非侵入式，无需面罩或气体分析设备",
          "可在日常训练中连续监测VT1漂移",
          "与金标准气体分析的相关系数r > 0.85",
        ],
        cons: [
          "运动伪影在高强度下增加检测噪声",
          "个体差异需5-10次训练数据建立基线",
          "通气效率受呼吸模式（胸式/腹式）影响",
        ],
        citations: [
          "ref-vitazkova-respiratory-2024",
          "ref-machado-chest-2025",
          "ref-velo-visma-tymewear",
        ],
      },
      {
        type: "advanced",
        name: "多信号交叉验证VT1",
        vendor: "自研 / 多传感器融合",
        description:
          "结合BioZ VE拐点、心率变异性（HRV）转折（RMSSD从下降转为稳定）和运动加速度计输出功率拐点，使用三信号投票机制提高VT1检测鲁棒性。贝叶斯概率模型输出VT1置信度评分（0-100）。",
        pros: [
          "三信号交叉验证降低误检率 > 30%",
          "运动伪影干扰下仍可保持有效检测",
          "自动识别检测置信度并标记低置信度事件",
        ],
        cons: [
          "计算复杂度高，需MCU上实现轻量贝叶斯推理",
          "初始校准需一次金标准气体分析对照",
          "跨运动类型（跑步vs骑行）需独立校准",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-vitazkova-respiratory-2024",
      "ref-machado-chest-2025",
      "ref-seshadri-cardiorespiratory-2023",
      "ref-velo-visma-tymewear",
    ],
    principles:
      "VT1的生理基础：在低-中等强度运动时，有氧代谢产生的CO₂完全通过呼吸排出，VE与VO₂呈线性关系。当运动强度超过VT1时，无氧代谢开始贡献能量，乳酸被碳酸氢盐缓冲产生额外CO₂，刺激呼吸中枢使VE出现非线性加速。这一拐点反映了代谢方式从纯有氧向混合代谢的转变。BioZ通过胸廓阻抗变化检测呼吸运动，其ΔZ信号幅度与潮气量高度相关（Pearson r = 0.93±0.05），结合R-R间期同步性分析，可在无需面罩的条件下实现VT1的非侵入式定位。",
  },
  {
    id: "L3:vt2",
    layer: "L3",
    name: "第二通气阈值 (VT2)",
    summary: "呼吸代偿点，反映高强度运动的可持续上限。VE非线性激增，对应血乳酸约4 mmol/L，是比赛配速策略的核心参考。",
    description:
      "VT2（第二通气阈/呼吸代偿点）是运动强度进一步增加时，乳酸积累速率超过机体缓冲能力，代谢性酸中毒触发呼吸中枢强烈驱动，导致分钟通气量（VE）出现第二次非线性激增的拐点。VT2对应血乳酸约4 mmol/L，通常位于最大心率的85-95%区间。VT2以上每增加1km/h速度，生理代价成倍增长——这是可维持30-60分钟的最大稳态强度上限。\n\n" +
      "VT2的检测依赖VT1作为前置条件：只有在确定了第一拐点之后，才能在高强度区间通过VE-VCO₂关系识别第二拐点。VT2处呼吸率（RR）骤升、潮气量（TV）接近平台、VE/VCO₂斜率显著增加。BioZ提供的高时间分辨率呼吸数据（64Hz采样）使VT2拐点的检测精度优于心率阈值法（HR-based VT2），因为心率对强度增加的响应天然滞后于通气变化 [ref-seshadri-cardiorespiratory-2023]。\n\n" +
      "VT2是比赛配速策略的基石：5km-10km比赛通常维持在VT2附近，半程马拉松略低于VT2，全程马拉松显著低于VT2。AI教练结合VT2位置建议FTP/CP测试强度和比赛开局的功率/配速上限。VT2与VT1的间距（VT2%HRmax - VT1%HRmax）也是有氧能力的重要指标，间距越窄通常代表有氧效率越高 [ref-haddad-athlete-2024]。",
    importance: "high",
    dependsOn: [
      "L3:vt1",
      "L2:minute-ventilation",
      "L2:hr",
    ],
    feedsInto: [
      "L4:trimp",
      "L5:training-load",
      "L5:race-pacing",
    ],
    tags: ["通气阈值", "无氧代谢", "呼吸代偿", "比赛策略"],
    implementations: [
      {
        type: "mainstream",
        name: "VE/VCO₂斜率突变检测",
        vendor: "自研 / 生理信号处理",
        description:
          "基于VT1已确定的前提下，在VT1以上强度区间持续监测VE/VCO₂斜率。当斜率出现第二次阶跃增加（通常增加幅度 > 20%）时标记为VT2。使用分段线性回归在连续滑动窗口中拟合，检测拐点位置。",
        pros: [
          "生理基础清晰，VE/VCO₂斜率的阈值含义明确",
          "算法复杂度适中，适合嵌入式MCU实施",
          "与金标准血乳酸法的MAE < 3% HRmax",
        ],
        cons: [
          "对VT1检测精度敏感，VT1误差会传播至VT2",
          "短时间内的高强度间歇训练中检测窗口不足",
          "个体通气反应差异需个性化基线校准",
        ],
        citations: [
          "ref-vitazkova-respiratory-2024",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
      {
        type: "advanced",
        name: "呼吸模式+心率联合拐点检测",
        vendor: "自研 / 多传感器融合",
        description:
          "在VE/VCO₂斜率法基础上，加入呼吸模式转变（胸式呼吸比例突增）和心率非线性加速作为辅助确认信号。使用加权投票算法：VE/VCO₂斜率（权重0.5）+ 呼吸模式（权重0.3）+ 心率加速度（权重0.2）综合判定VT2位置。",
        pros: [
          "多信号融合降低单一信号噪声导致的误检",
          "呼吸模式变化是VT2的可靠辅助信号",
          "自动输出检测置信度，低于阈值时标记需要手动确认",
        ],
        cons: [
          "需要同时采集BioZ（呼吸波形）和ECG（R-R间期）",
          "呼吸模式识别算法需额外DSP资源",
          "高强度运动伪影下的呼吸模式识别准确率下降",
        ],
        citations: [
          "ref-machado-chest-2025",
          "ref-haddad-athlete-2024",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-vitazkova-respiratory-2024",
      "ref-seshadri-cardiorespiratory-2023",
      "ref-haddad-athlete-2024",
      "ref-machado-chest-2025",
    ],
    principles:
      "VT2的生理基础：当运动强度超过VT2时，糖酵解产生乳酸的速度超过线粒体氧化利用和血液缓冲的能力。H⁺积累刺激颈动脉体和延髓化学感受器，驱动呼吸中枢强烈增加通气以通过CO₂排出代偿代谢性酸中毒。这一呼吸代偿的不成比例增加表现为VE的第二次激增。VT2处的VE/VCO₂斜率陡增是心肺耦合失调的标志。BioZ以64Hz采集呼吸波形，捕捉胸廓阻抗变化的细微模式（潮气量平台+呼吸率加速），使VT2检测精度超过传统的心率阈值法，后者固有的心率延迟（10-20秒）会系统性低估VT2位置。",
  },
  {
    id: "L3:core-body-temp",
    layer: "L3",
    name: "核心体温",
    summary: "人体深部组织温度，运动时每升高1°C运动表现下降2-5%。通过皮肤温度+心率+加速度的多传感器融合模型估算。",
    description:
      "核心体温（Core Body Temperature, T_core）是人体深部器官的温度，是热调节状态的最核心生理参数。正常安静范围36.5-37.5°C，运动中可达38.0-39.5°C。T_core每升高1°C，运动表现下降2-5%，最大摄氧量（VO₂max）下降约15-20%，计时赛完赛时间延长8-12%——这是经过大量实验室与实地研究交叉验证的结论 [ref-verdel-core-2021]。\n\n" +
      "非侵入式核心体温估算需要多传感器数据融合。皮肤温度（T_skin，由TMP117采集）提供热通量模型的基础输入；心率（HR）提供心血管热漂移信息——T_core每升高1°C，恒定功率下心率上升约10-15 bpm；加速度计（IMU）提供运动状态分类，用于区分运动产热和环境热的差异贡献。双热流法（DHF）基于傅里叶定律，通过两个串联热通量传感器联立求解消去个体组织热导率差异，精度可达±0.1-0.3°C [ref-goods-core-2023]。\n\n" +
      "T_core数据是热适应训练的量化基础（需>38.5°C持续60分钟触发适应），是比赛热管理策略的实时决策依据，是安全红线（持续>39.5°C应强制停止），也是睡眠质量评估的参考（入睡前T_core下降约1°C是正常入睡的必要条件）。2025年环法自行车赛中，17/21个赛段冠军在比赛日佩戴了核心体温传感器 [ref-cyclingnews-sweat-breathing]。",
    importance: "high",
    dependsOn: [
      "L2:skin-temperature",
      "L2:hr",
      "L2:acceleration",
    ],
    feedsInto: [
      "L3:dehydration-risk",
      "L4:heat-load",
      "L4:circadian-phase",
      "L5:heat-stress-warning",
      "L5:race-pacing",
      "L5:personalized-nutrition",
    ],
    tags: ["核心体温", "热调节", "热适应", "安全"],
    implementations: [
      {
        type: "mainstream",
        name: "单热流法 (SHF)",
        vendor: "greenteg AG (CORE 2)",
        description:
          "单热通量传感器测量皮肤向环境的散热速率，结合傅里叶定律q = -k·dT/dx与AI算法反推核心温度。T_core = T_skin + 补偿量（基于热通量+环境温度+个体参数）。原理简单、成本最低，但需个体校准。",
        pros: [
          "商用成熟，CORE 2已量产并在世巡赛车队广泛使用",
          "功耗低，适合可穿戴设备",
          "集成门槛低，greenteg提供OEM方案（Calera Research）",
        ],
        cons: [
          "独立验证MAE ±0.2-0.7°C，95% LoA为-0.38至+0.72°C",
          "仅51%的配对值在≤0.3°C阈值内（运动条件）",
          "个体间差异大，环境变化可导致0.2-0.4°C漂移",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "双热流法 (DHF)",
        vendor: "自研 / Murata参考架构",
        description:
          "两个串联热通量传感器独立测量两道热通量，通过联立傅里叶热传导方程组消去个体组织热导率差异。校准一次后无需重复校准，精度预期±0.1-0.3°C，显著优于单热流法。",
        pros: [
          "精度提升50-70% vs SHF，接近金标准水平",
          "消除个体组织热导率差异的依赖",
          "校准一次后无需重复校准",
          "可申请核心专利，建立技术护城河",
        ],
        cons: [
          "需要定制热电堆传感器，制造工艺门槛高",
          "需要至少两枚高精度温度传感器（TMP117）共位安装",
          "研发周期12-18个月，需金标准对照数据采集",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "多传感器融合+深度学习模型",
        vendor: "自研 / AI增强方案",
        description:
          "输入T_skin + HR + 加速度计 + 环境温度 + 湿度，使用LSTM/Transformer深度学习模型直接回归T_core。无需专用热通量传感器硬件，BOM成本最低，但需大规模金标准标注数据。",
        pros: [
          "BOM成本最低（无额外热通量传感器）",
          "模型持续迭代，精度随时间提升",
          "数据网络效应：用户越多模型越好",
        ],
        cons: [
          "需要1000+受试者的金标准标注训练数据",
          "模型在MCU上的推理需要NPU或云端支持",
          "早期阶段精度低于硬件传感器方案",
        ],
        citations: [
          "ref-haddad-athlete-2024",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
      "ref-haddad-athlete-2024",
      "ref-cyclingnews-sweat-breathing",
    ],
    principles:
      "核心体温测量的物理基础是傅里叶热传导定律：q = -k·dT/dx，其中q为热通量（W/m²），k为材料热导率（W/(m·K)），dT/dx为温度梯度。在胸带形态下，热量的完整路径为：T_core → (皮下组织传导) → T_skin → (传感器绝缘层R1) → T1 → (绝缘层R2) → T2 → (环境散热) → T_ambient。双热流法（DHF）通过两个串联热通量传感器产生两个独立方程，联立求解消去皮下组织热导率R_tissue这一最不稳定的个体差异参数。稳态条件下q1 ≈ q2（热通量守恒），因此q_in = (T1-T2)/(R1+R2)由设计参数R1和R2决定，与个体生理差异无关。DHF是当前可穿戴核心体温监测的最优技术路径。",
  },
  {
    id: "L3:dehydration-risk",
    layer: "L3",
    name: "脱水风险指数",
    summary: "综合汗Na⁺浓度趋势、皮肤电导变化和核心体温上升速率，评估当前脱水的可能性与严重程度。",
    description:
      "脱水风险指数是一个多源融合指标，综合评估运动员在训练和比赛中的脱水风险。指数输入包括：汗液钠离子浓度（Na⁺）的变化趋势——高Na⁺浓度提示血浆渗透压升高；皮肤电导/出汗率数据——出汗率下降提示即将耗尽可用体液；核心体温上升速率——T_core加速上升是脱水的敏感指标（脱水导致血浆容量减少、散热效率下降）。\n\n" +
      "在耐力运动中，职业运动员每小时流失1-2L汗液，钠离子流失量可达500-2000 mg/h [ref-cyclingnews-sweat-breathing]。即使是2%体重的体液流失即可显著影响运动表现，5%以上则可能引发严重热损伤。脱水风险指数将这些独立的生理信号转变为一个直观的0-100评分：0-30为安全、31-60为注意、61-80为警告、81-100为危险。\n\n" +
      "该指数的核心价值在于将四个独立传感器信号转化为一个可执行的决策信息。当指数超过阈值时，AI教练的补水策略模块会自动触发个性化的补水建议——计算当前应补充的液体量和电解质类型（纯水vs电解质饮料）。指数的另一关键功能是区分两类运动能力下降：心血管漂移（心率上升但Na⁺正常）vs电解质耗竭（心率上升且Na⁺下降），这两类需要完全不同的干预策略。",
    importance: "medium",
    dependsOn: [
      "L2:sodium-concentration",
      "L2:skin-conductivity",
      "L3:core-body-temp",
    ],
    feedsInto: [
      "L4:heat-load",
      "L5:heat-stress-warning",
      "L5:hydration-strategy",
    ],
    tags: ["脱水", "水合状态", "电解质", "安全预警"],
    implementations: [
      {
        type: "mainstream",
        name: "加权评分模型",
        vendor: "自研 / 生理信号融合",
        description:
          "将Na⁺浓度变化率、皮肤电导下降率、T_core上升速率和心率漂移量四个子指标标准化后加权求和，输出0-100的脱水风险评分。各权重基于运动生理学文献和个体历史数据自适应确定。",
        pros: [
          "算法简单透明，适合实时嵌入式计算",
          "各子指标生理含义明确，便于用户理解",
          "可与FLOWBIO S1和Nix Biosensor的已有汗液数据对接",
        ],
        cons: [
          "权重设定需要较大样本量的验证数据",
          "出汗延迟导致运动开始后3-8分钟无数据输入",
          "汗液Na⁺浓度的绝对水平个体差异达3-5倍",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-haddad-athlete-2024",
        ],
      },
      {
        type: "advanced",
        name: "个体化基线异常检测",
        vendor: "自研 / 机器学习",
        description:
          "在2-4周内学习个体Na⁺基线、出汗率-温度曲线和T_core-HR耦合关系。基线建立后，采用椭圆包络（elliptical envelope）异常检测模型，将偏离个体基线的多维偏差转化为脱水风险概率。",
        pros: [
          "个体内基线比较的敏感度比群体参考范围高5-10倍",
          "自动学习个体'汗液指纹'，适应3-5倍的个体间差异",
          "异常检测模型可发现传统阈值法遗漏的早期信号",
        ],
        cons: [
          "需要2-4周的学习期，此期间精度不足",
          "学习期需要用户保持相对稳定的训练和补给模式",
          "模型漂移需定期重建基线",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-haddad-athlete-2024",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-cyclingnews-sweat-breathing",
      "ref-haddad-athlete-2024",
    ],
  },
  {
    id: "L3:breathing-pattern",
    layer: "L3",
    name: "呼吸模式",
    summary: "胸式呼吸与腹式呼吸的比例分析。疲劳时倾向于胸式主导（浅快），多频率BioZ可区分胸廓不同部位的扩张模式。",
    description:
      "呼吸模式分析通过多频率BioZ传感器区分胸廓不同部位的阻抗变化，从而解析胸式呼吸与腹式呼吸的比例。胸式呼吸以肋间肌为主，腹式呼吸以膈肌为主，两者在BioZ信号中表现为不同频率和空间分布特征。疲劳状态下，副呼吸肌（胸锁乳突肌、斜角肌）被募集，呼吸模式从腹式主导转向胸式主导。\n\n" +
      "多频率BioZ（例如同时使用10kHz和50kHz激励）可以区分浅层（胸廓运动）和深层（膈肌运动）的组织阻抗变化，提供呼吸模式的空间信息。胸/腹呼吸比是运动经济性的重要指标：在给定运动强度下，腹式呼吸比例为70-80%为正常，低于50%提示呼吸效率下降和即将疲劳 [ref-vitazkova-respiratory-2024]。\n\n" +
      "呼吸模式反馈在耐力运动训练中有直接应用价值：腹式呼吸训练可提升呼吸效率8-12%，延长力竭时间。不同运动项目的体位限制了特定的呼吸模式——游泳需要与划臂节奏配合的快速胸式呼吸，自行车低趴姿势限制了腹部扩张，了解这些约束可以帮助AI教练在特定场景下给出务实的呼吸优化建议。",
    importance: "medium",
    dependsOn: [
      "L2:respiratory-rate",
      "L2:tidal-volume",
    ],
    feedsInto: [
      "L3:ventilatory-efficiency",
    ],
    tags: ["呼吸模式", "呼吸肌", "疲劳", "运动经济性"],
    implementations: [
      {
        type: "mainstream",
        name: "多频率BioZ胸/腹分解",
        vendor: "自研",
        description:
          "使用MAX30001可编程BioZ激励频率（10-100kHz），交替发射低频（10kHz，探测深层组织）和高频（50kHz，探测浅层组织）信号。低频信号偏重膈肌运动贡献，高频信号偏重胸廓运动贡献，通过双频率分解计算胸/腹呼吸比例。",
        pros: [
          "利用已有BioZ硬件，无需额外传感器",
          "多频率信息提供空间分辨能力",
          "算法可以在MCU上实现实时处理",
        ],
        cons: [
          "胸/腹区分精度受电极放置位置影响",
          "运动伪影对低频信号的干扰更大",
          "需要经过金标准（呼吸带/超声）校准验证",
        ],
        citations: [
          "ref-vitazkova-respiratory-2024",
          "ref-machado-chest-2025",
        ],
      },
      {
        type: "advanced",
        name: "胸廓多位点阻抗成像",
        vendor: "自研 / 研究级",
        description:
          "在胸带不同位置布置多对BioZ电极（前胸上下+后背两侧），形成多通道阻抗成像阵列。通过电阻抗断层成像（EIT）原理重建胸廓截面的呼吸运动分布图，提供高空间分辨率的呼吸模式分析。",
        pros: [
          "最高空间分辨率，可定位各肺叶和膈肌运动",
          "可以检测单侧呼吸异常（如气胸、肺不张）",
          "具有临床诊断和研究价值",
        ],
        cons: [
          "硬件复杂度大幅增加（多通道BioZ AFE）",
          "计算量大，不适合当前MCU实现在线处理",
          "电极数量增加使穿戴复杂度上升",
        ],
        citations: [
          "ref-machado-chest-2025",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-vitazkova-respiratory-2024",
      "ref-machado-chest-2025",
      "ref-seshadri-cardiorespiratory-2023",
    ],
  },
  {
    id: "L3:ventilatory-efficiency",
    layer: "L3",
    name: "通气效率 (VE/VCO₂)",
    summary: "每排出1升CO₂所需通气量的斜率，是心肺功能的综合指标。不受主观努力影响，对高原训练反应评估尤为敏感。",
    description:
      "通气效率（VE/VCO₂斜率）衡量呼吸系统排出代谢产生CO₂的经济性。斜率越低，表示用更少的通气量即可完成CO₂排出，肺功能越好。正常健康个体VE/VCO₂斜率 < 30，> 35为异常，提示通气-灌注不匹配或心功能受损。该指标不受受试者主观努力程度影响，因此比VO₂max更能客观反映心肺适应状态 [ref-vitazkova-respiratory-2024]。\n\n" +
      "VE/VCO₂斜率在运动训练中有独特的应用价值：它是一个对训练适应和停训退步都很敏感的指标。高原训练1-2周后VE/VCO₂斜率下降，提示有氧能力提升（每CO₂排出所需通气量减少）。回到平原后1-2周斜率趋向上升，反映高原效应消退。VE/VCO₂斜率还在慢性心衰管理中被广泛使用——斜率>34与不良预后显著相关，这使其成为从运动到临床均可受益的跨领域核心参数 [ref-seshadri-cardiorespiratory-2023]。\n\n" +
      "BioZ为VE/VCO₂斜率的连续监测提供了独特价值：传统实验室气体分析仪只在测试时可用，而BioZ可以在每堂训练课中自然采集数据。结合VT2作为高强度区间上限，VE/VCO₂斜率是评估心肺适应进展的纵向趋势指标。年度2-4次测量对比可用于判断运动员是否有氧能力进步。",
    importance: "medium",
    dependsOn: [
      "L2:minute-ventilation",
      "L3:vt2",
    ],
    feedsInto: [
      "L5:race-pacing",
    ],
    tags: ["通气效率", "心肺功能", "高原训练", "趋势追踪"],
    implementations: [
      {
        type: "mainstream",
        name: "VE/VCO₂斜率线性回归",
        vendor: "自研",
        description:
          "在VT1至VT2之间的中等-高强度区间，对VE与VCO₂进行线性回归拟合斜率。BioZ提供VE数据，VCO₂通过心率-代谢当量关系间接估算。输出整堂课和分段VE/VCO₂斜率。",
        pros: [
          "算法简单，稳定可靠",
          "适合所有运动强度区间的斜率计算",
          "可直接与临床金标准格式对齐",
        ],
        cons: [
          "VCO₂的间接估算基于心率-代谢关系，存在模型误差",
          "需要VT1和VT2的准确检测作为前置条件",
          "短时间训练课的斜率估计不稳定性增大",
        ],
        citations: [
          "ref-vitazkova-respiratory-2024",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-vitazkova-respiratory-2024",
      "ref-seshadri-cardiorespiratory-2023",
    ],
  },
  {
    id: "L3:rsa",
    layer: "L3",
    name: "呼吸性窦性心律不齐 (RSA)",
    summary: "吸气时心率增快、呼气时心率减慢的自然生理现象。RSA幅度是迷走神经张力的敏感指标，可独立验证副交感神经功能。",
    description:
      "呼吸性窦性心律不齐（Respiratory Sinus Arrhythmia, RSA）是吸气时心率增快、呼气时心率减慢的自然生理现象，由迷走神经对心脏窦房结的节律性调控驱动。HRV的高频成分（HF, 0.15-0.40Hz）几乎完全由RSA贡献，因此RSA幅度是副交感神经张力（迷走神经活性）的纯净且独立的指标。\n\n" +
      "BioZ呼吸波形与ECG R-R间期的交叉相关分析使RSA的量化更加精准：BioZ提供高信噪比的呼吸相位信息（吸气/呼气起止时刻），ECG提供逐拍的R-R间期，两者的时间锁相关系可直接计算RSA幅度（吸气R-R间期 - 呼气R-R间期，单位ms）。相比纯ECG的HRV频谱分析（受呼吸频率不确定影响），BioZ+ECG联合RSA检测从根本上消除了呼吸深度变化对HF功率的混淆 [ref-seshadri-cardiorespiratory-2023]。\n\n" +
      "RSA幅度随年龄递减（20岁约80-120ms，60岁约20-40ms），随有氧训练水平递增。RSA与呼吸道被自主神经调节的耦合程度（心肺耦合）可用于客观评估自主神经功能状态。当RMSSD下降但RSA幅度保持正常时，提示自主神经变化可能是外周因素（如脱水）而非中枢神经疲劳所致——这种区分对恢复状态判断至关重要。",
    importance: "low",
    dependsOn: [
      "L2:hrv",
      "L2:respiratory-rate",
    ],
    feedsInto: [],
    tags: ["RSA", "迷走神经", "心肺耦合", "自主神经"],
    implementations: [
      {
        type: "mainstream",
        name: "BioZ-ECG交叉相关RSA检测",
        vendor: "自研",
        description:
          "BioZ呼吸波形提供高信噪比的呼吸相位信息（64Hz采样），通过峰值检测确定吸气和呼气相位。ECG R-R间期序列与呼吸相位同步对齐，计算吸气相平均R-R间期和呼气相平均R-R间期的差值作为RSA幅度。",
        pros: [
          "利用已有ECG+BioZ硬件，无需额外传感器",
          "比纯ECG-HRV频谱法的RSA估计更精准",
          "适合实时测量和长期趋势分析",
        ],
        cons: [
          "RSA幅度受呼吸深度强烈影响，需控制呼吸或标注呼吸深度",
          "运动状态下RSA幅度显著减小，信噪比降低",
          "临床应用价值有待更多研究验证",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-seshadri-cardiorespiratory-2023",
      "ref-machado-chest-2025",
    ],
  },
];
