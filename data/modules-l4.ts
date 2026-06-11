import { Module } from "@/lib/types";

export const l4Modules: Module[] = [
  {
    id: "L4:electrolyte-balance",
    layer: "L4",
    name: "电解质平衡",
    summary: "综合汗液Na⁺/K⁺比值趋势与绝对浓度，评估电解质耗竭、正常或过量状态，指导精准补水策略。",
    description:
      "电解质平衡指数综合汗液Na⁺和K⁺的绝对浓度、Na⁺/K⁺比值变化趋势以及出汗率，评估运动员在训练中的电解质状态。在长时间耐力运动中，Na⁺流失量可达500-2000 mg/h，K⁺流失量约为Na⁺的1/5至1/10。电解质的大量流失如果不能及时补充，将直接影响神经肌肉传导效率，表现为肌肉痉挛、协调能力下降甚至心律失常 [ref-cyclingnews-sweat-breathing]。\n\n" +
      "Na⁺/K⁺比值是细胞膜电位稳态的反映。运动初期Na⁺/K⁺比值通常升高（出汗初期汗液Na⁺浓度较高），后期随体内Na⁺储备耗尽比值下降。比值持续低于基线80%提示严重电解质耗竭。皮肤电导作为辅助信号提供出汗率的持续性验证——出汗率保持正常但Na⁺浓度急剧下降提示体内Na⁺耗竭，出汗率也下降则提示体液总量不足 [ref-cyclingnews-sweat-breathing]。\n\n" +
      "电解质平衡是L4级别（高级指标层）的第一个入口——它将两个L2基础信号（Na⁺浓度、皮肤电导）融合为一个有明确临床和训练含义的复合指数。输出直接进入L5补水策略和个性化营养两个AI教练模块。该指数的独特之处在于提供了实时而非事后的电解质补充决策依据——传统汗液贴片需要取下分析后才得到结果，而胸带集成ISE可以在训练中持续更新电解质状态。",
    importance: "medium",
    dependsOn: [
      "L2:sodium-concentration",
      "L2:skin-conductivity",
    ],
    feedsInto: [
      "L5:hydration-strategy",
      "L5:personalized-nutrition",
    ],
    tags: ["电解质", "Na⁺/K⁺", "肌肉痉挛", "补水"],
    implementations: [
      {
        type: "mainstream",
        name: "双通道ISE + 趋势分析",
        vendor: "自研 / FLOWBIO参考架构",
        description:
          "使用Na⁺和K⁺双通道ISE传感器（LMP91000 AFE）同时采集汗液中两种电解质浓度。对比个体基线（前2-4周训练数据），计算Na⁺/K⁺比值偏离基线的标准化得分，输出为0-100电解质平衡指数。>70为正常，40-70为注意，<40为需要补充电解质。",
        pros: [
          "双通道信息比单一Na⁺测量更全面",
          "比值分析可消除出汗速率对绝对浓度的混淆",
          "FLOWBIO S1已在职业赛场验证胸带Na⁺ ISE的可行性",
        ],
        cons: [
          "K⁺离子载体膜的寿命和选择性挑战比Na⁺更大",
          "需要出汗后才能提供数据（运动开始后3-8分钟延迟）",
          "ISE电极需要每3个月更换离子载体膜卡匣",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
        ],
      },
      {
        type: "advanced",
        name: "汗液电解质+皮肤电导融合模型",
        vendor: "自研",
        description:
          "在双通道ISE基础上，加入皮肤电导数据作为独立验证通道。当ISE和电导数据出现分歧时（如ISE显示Na⁺正常但电导急剧下降），触发信号质量审查逻辑。使用Kalman滤波器融合两条独立测量通道，输出更平滑的电解质平衡指数。",
        pros: [
          "双通道独立验证提高测量可靠性",
          "电导数据不受ISE膜老化的影响",
          "信号融合降低短时波动和异常值",
        ],
        cons: [
          "电导法的离子无选择性，不能区分Na⁺和K⁺",
          "当ISE和电导信号出现系统性分歧时需要人工规则判断",
          "算法复杂度增加，需要额外的DSP资源",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-cyclingnews-sweat-breathing",
    ],
  },
  {
    id: "L4:heat-load",
    layer: "L4",
    name: "热负荷",
    summary: "综合核心体温上升速率、心率热漂移和脱水风险，输出0-10热应激评分，≥7应减少运动强度，≥8建议停止训练。",
    description:
      "热负荷（Heat Load）是L4级别的高级预后指标，综合评估运动员当前的总体热应激水平。其核心输入包括：核心体温（T_core）的绝对值和上升速率——T_core > 38.5°C且上升速率 > 0.05°C/min提示热应激加速；心率（HR）的热漂移程度——恒定功率下HR的额外上升，每°C T_core升高导致HR增加约10-15 bpm；脱水风险指数——体液减少导致的散热效率下降 [ref-verdel-core-2021]。\n\n" +
      "热负荷评分范围为0-10：<3为正常热负荷，3-5为轻度热应变（开始出现心血管热漂移），5-7为中度（需减少运动强度），7-8为高度（强制降低强度，提示补水），>8为危险（建议立即停止户外训练/比赛）。T_core > 40.5°C且出现CNS功能障碍（意识混乱、行为异常）为劳力性热射病（EHS）的诊断标准，死亡率5-10%但早期识别可将死亡率降至接近零 [ref-goods-core-2023]。\n\n" +
      "热负荷是AI教练热应激预警模块的唯一直接输入。当热负荷超过阈值，系统从监测模式切换到主动干预模式——推送分级警报、建议降低运动强度、启动主动降温策略（如'现在需要补充冰水500mL'）。热负荷的长期趋势（月/季度对比）也可用于量化热适应的进展，同等运动负荷下热负荷评分的下降是热适应的客观证据。",
    importance: "high",
    dependsOn: [
      "L3:core-body-temp",
      "L3:dehydration-risk",
    ],
    feedsInto: [
      "L5:heat-stress-warning",
    ],
    tags: ["热负荷", "热应激", "热射病", "安全"],
    implementations: [
      {
        type: "mainstream",
        name: "多参数加权热负荷评分",
        vendor: "自研",
        description:
          "将T_core绝对值、T_core上升速率、HR热漂移量、脱水风险指数四个子指标标准化为0-10子评分，使用运动生理学文献推荐的权重加权求和。加入运动强度自动调节：相同T_core下高强度运动产热更多，热负荷评分上调。",
        pros: [
          "算法透明，子评分可单独查看便于理解",
          "与军事（US Army PHEL）和运动医学指南对齐",
          "适合MCU实时计算，延迟<1秒",
        ],
        cons: [
          "权重基于群体数据，个体差异需长时间调整",
          "T_core估算的精度直接影响热负荷的精度",
          "环境条件（湿度、风速、太阳辐射）未直接纳入",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "个体化热耐受极限模型",
        vendor: "自研 / 机器学习",
        description:
          "通过2-4周训练数据学习个体热耐受曲线：T_core-运动表现关系、出汗率-温度关系、HR-热漂移系数。建立个体化安全边界后，热负荷评分从群体参考转变为个体偏离基准的量化，异常检测灵敏度提高5-10倍。",
        pros: [
          "个体化阈值比群体阈值更有实际指导意义",
          "可以识别'高热耐受型'和'高热敏感型'运动员",
          "自适应学习使模型随训练适应而变化",
        ],
        cons: [
          "2-4周学习期内预警精度不足",
          "需要一定的热暴露数据（热训练记录）才能建立模型",
          "模型更新频率需平衡时效性和稳定性",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
          "ref-haddad-athlete-2024",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
      "ref-haddad-athlete-2024",
    ],
  },
  {
    id: "L4:recovery-readiness",
    layer: "L4",
    name: "恢复就绪度",
    summary: "综合HRV、RMSSD和LF/HF比值，输出0-100恢复评分。>85为完全恢复，<50应避免高强度训练。",
    description:
      "恢复就绪度（Recovery Readiness）是HeartBeat系统中对接AI教练训练负荷优化的核心高级指标。它综合三个HRV维度的指标：RMSSD（副交感神经活动的最纯净指标）——高RMSSD表示副交感神经主导、恢复良好，低RMSSD提示交感神经主导、应激/疲劳；HRV整体趋势——连续三天HRV低于基线80%应主动减量；LF/HF比值——长时间运动后持续升高提示交感神经持续激活 [ref-haddad-athlete-2024]。\n\n" +
      "恢复就绪度以0-100分制输出：>85分为完全恢复（可以进行高强度训练），70-85为适度恢复（可进行中等强度训练），50-70为部分恢复（建议轻松恢复训练），<50为未恢复（应避免高强度训练，优先休息或低强度活动）。每日晨起1分钟RMSSD测量配合主观疲劳问卷即可达85%+准确率。恢复就绪度的核心价值在于将主观感受（'我觉得累'）转化为客观量化的恢复状态，减少凭感觉训练导致的过度训练风险。\n\n" +
      "在HeartBeat的多传感器系统中，恢复就绪度还可以从体温数据（入睡前T_core下降速率）和汗液数据（汗液皮质醇趋势，未来）中获取补充验证。T_core持续偏高（>37.5°C在入睡前）是恢复不足和自主神经失衡的标志，与深睡眠减少和次日训练表现下降显著相关。这种多源交叉验证使恢复就绪度成为真正可信赖的训练决策输入——而非单一HRV指标可能产生的假阳性或假阴性。",
    importance: "high",
    dependsOn: [
      "L2:rmssd",
      "L2:hrv",
      "L2:lf-hf-ratio",
    ],
    feedsInto: [
      "L5:training-load",
      "L5:recovery-optimization",
    ],
    tags: ["恢复", "HRV", "RMSSD", "训练准备度", "过度训练"],
    implementations: [
      {
        type: "mainstream",
        name: "HRV多参数融合恢复评分",
        vendor: "自研 / 对标WHOOP/OURA",
        description:
          "采集晨起1分钟或5分钟HRV数据，计算RMSSD（权重0.5）、HRV SDNN（权重0.15）、LF/HF比值（权重0.15）和静息心率（权重0.2）的加权恢复评分。与个体7天滑动基线对比，输出0-100的标准化恢复就绪度。",
        pros: [
          "对标WHOOP和OURA的验证方法，生理基础扎实",
          "仅需ECG数据，硬件成本最低",
          "短时测量（1分钟）即可获得有效恢复评估",
        ],
        cons: [
          "单一ECG源无法区分自主神经疲劳和外周肌肉疲劳",
          "需要固定测量条件（晨起、仰卧位、安静状态）",
          "急性因素（咖啡因、酒精、情绪）可显著影响HRV",
        ],
        citations: [
          "ref-haddad-athlete-2024",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
      {
        type: "advanced",
        name: "多模态恢复评估（ECG+体温+呼吸）",
        vendor: "自研 / 多传感器融合",
        description:
          "在HRV评分基础上，加入夜间T_core下降速率（正常入睡前下降约1°C）、夜间呼吸率（升高是早期过度训练的敏感指标）和心率恢复速率（运动后1分钟HR下降 > 12 bpm为正常）作为补充恢复子维度。贝叶斯层次模型综合三个模态的证据输出最终恢复评分。",
        pros: [
          "多模态证据减少单一HRV的误判率",
          "夜间T_core和呼吸率不受主观因素影响",
          "可同时评估自主神经恢复和代谢恢复两个维度",
        ],
        cons: [
          "需要佩戴设备入睡或采集夜间数据",
          "贝叶斯层次模型计算量大于简单加权",
          "跨模态冲突时的仲裁逻辑需要大量数据验证",
        ],
        citations: [
          "ref-haddad-athlete-2024",
          "ref-verdel-core-2021",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-haddad-athlete-2024",
      "ref-seshadri-cardiorespiratory-2023",
      "ref-verdel-core-2021",
    ],
  },
  {
    id: "L4:trimp",
    layer: "L4",
    name: "训练冲量 (TRIMP)",
    summary: "基于心率-时间曲线与强度权重的训练负荷量化方法。结合VT1/VT2改进经典TRIMP计算，是训练周期化管理的基石。",
    description:
      "训练冲量（Training Impulse, TRIMP）是量化单次训练课生理负荷的经典方法，最初由Eric Banister于1991年提出。核心思想是将训练时间划分为多个区间，每个区间的心率乘以对应运动强度权重（通常使用心率储备百分比HRR作为权重），累积得到整堂课的训练负荷（单位AU, Arbitrary Units）。单次训练课的TRIMP通常在0-300+ AU，而周TRIMP趋势是训练负荷管理的核心指标。\n\n" +
      "在HeartBeat系统中，TRIMP计算得到两个关键改进：(1) 使用VT1和VT2替代任意心率区间划分，使强度权重具有真实的生理学基础——VT1以下（Zone 1-2）权重较低（有氧代谢为主）、VT1-VT2之间（Zone 3-4）权重中等、VT2以上权重急剧增加（无氧代谢+代谢性酸中毒）；(2) 结合核心体温数据，TRIMP得到热量修正——相同心率在高温环境下代表更高的生理负荷，因为T_core升高使心血管系统承担额外散热负荷 [ref-haddad-athlete-2024]。\n\n" +
      "周/月TRIMP趋势分析是运动训练周期化管理的基石。急性/慢性负荷比（ACWR, Acute:Chronic Workload Ratio）通过对比最近7天TRIMP和28天平均TRIMP来评估训练负荷的适宜性——ACWR 0.8-1.3为安全区，>1.5为损伤风险增高区。TRIMP同时feed进三个L5 AI教练模块：训练负荷优化（决定明日训练量）、恢复优化（判断减量周时机）和个性化营养（基于实际负荷计算热量和电解质补充需求）。",
    importance: "high",
    dependsOn: [
      "L2:hr",
      "L3:vt1",
      "L3:vt2",
    ],
    feedsInto: [
      "L5:training-load",
      "L5:recovery-optimization",
      "L5:personalized-nutrition",
    ],
    tags: ["训练负荷", "TRIMP", "周期化", "ACWR", "运动量"],
    implementations: [
      {
        type: "mainstream",
        name: "改良Banister TRIMP + VT阈值",
        vendor: "自研 / 体育科学经典方法",
        description:
          "基于Banister 1991 TRIMP公式，将心率储备（HRR）与VT1/VT2阈值对齐。使用分段性别权重函数：Zone 1-2（HR < VT1）权重1.0-1.5、Zone 3-4（VT1 < HR < VT2）权重1.5-2.5、Zone 5（HR > VT2）权重2.5-4.0。累积每分钟的HRR×权重得到TRIMP。",
        pros: [
          "体育科学领域广泛接受和验证的经典方法",
          "VT1/VT2阈值提供真实生理学基础而非任意分区",
          "计算简单，适合嵌入式实时处理",
        ],
        cons: [
          "Banister原始TRIMP使用非线性权重（女性）vs线性权重（男性）的区分已被质疑",
          "等时长不同运动类型（跑步vs骑行vs游泳）的TRIMP不可直接比较",
          "不能捕捉神经肌肉负荷（如举重训练的特殊负荷）",
        ],
        citations: [
          "ref-haddad-athlete-2024",
        ],
      },
      {
        type: "advanced",
        name: "温度修正TRIMP (T-TRIMP)",
        vendor: "自研 / 多传感器融合",
        description:
          "在改良Banister TRIMP基础上，加入核心体温（T_core）修正因子。心率权重乘以温度系数：当T_core > 38.5°C时，同等心率下的TRIMP增加15-25%，反映心血管系统额外承担的热调节负荷。T_core数据来自L3核心体温模块。",
        pros: [
          "更准确地量化热环境下的真实生理负荷",
          "使得高温训练和常温训练的TRIMP可比",
          "修正后的T-TRIMP与RPE的相关性显著高于原始TRIMP",
        ],
        cons: [
          "依赖T_core估算精度（SHF/自研DHF模块）",
          "温度修正系数需个体化校准",
          "增加了计算和数据依赖的复杂度",
        ],
        citations: [
          "ref-haddad-athlete-2024",
          "ref-verdel-core-2021",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-haddad-athlete-2024",
      "ref-verdel-core-2021",
    ],
    principles:
      "TRIMP的核心原理：心率是反映运动强度的最直接生理信号，但心率与强度之间的关系并非线性——在高强度区域，心率每升高1 bpm代表的生理代价远超低强度区域。因此TRIMP使用加权心率替代原始心率。Banister原始公式为TRIMP = duration × ΔHR × k × e^(b × ΔHR)，其中ΔHR = (HR_exercise - HR_rest) / (HR_max - HR_rest)，k和b为性别相关常数（男性k=0.64, b=1.92；女性k=0.86, b=1.67）。HeartBeat系统的改良在于：将ΔHR的分段基于VT1和VT2进行生理学对齐，而不是固定的心率百分比，因为VT1/VT2的位置根据训练状态会动态变化（有氧能力提升→VT1和VT2向更高HR%移动），静态分区无法反映这种适应。T-TRIMP进一步加入T_core修正因子，使TRIMP真正反映'生理真实负荷'而不仅仅是'数学计算负荷'。",
  },
  {
    id: "L4:circadian-phase",
    layer: "L4",
    name: "昼夜节律相位",
    summary: "基于核心体温24小时波动周期评估生物钟稳定性。清晨最低约36.1°C，傍晚最高约37.0°C，相位偏移提示生物钟紊乱。",
    description:
      "昼夜节律相位是核心体温以约24小时为周期的波动模式分析。正常人体的T_core在清晨（约4-6AM）达到最低点（约36.1°C），在傍晚（约5-7PM）达到最高点（约37.0°C），振幅约0.3-0.5°C。这种节律由下丘脑视交叉上核（SCN）控制，通过松果体褪黑素分泌和下丘脑-垂体-甲状腺轴的昼夜调控来维持 [ref-haddad-athlete-2024]。\n\n" +
      "昼夜节律相位的偏移是生物钟紊乱的客观量化指标。跨时区旅行后，体温节律的相位适应性调整需要约1天/时区。晨间体温最低点延迟1小时以上（相位延迟）提示前一晚入睡过晚或睡眠质量差。对于精英运动员来说，赛前到达比赛地的时区适应窗口需要约10天，远比赛场适应长——体温节律相位追踪可以客观量化适应进度 [ref-verdel-core-2021]。\n\n" +
      "昼夜节律相位分析还可用于优化训练时间选择：在体温节律的高点期间（下午-傍晚）进行高强度训练，此时肌肉温度和酶活性最高、受伤风险最低。晨间训练表现通常比下午低5-10%，部分原因就在于T_core较低。结合T_skin数据（皮肤温度的昼夜变化幅度更大，受环境影响更敏感），L4昼夜节律相位模块为L5恢复优化提供何时训练、何时休息的生物学时机建议。",
    importance: "low",
    dependsOn: [
      "L2:skin-temperature",
      "L3:core-body-temp",
    ],
    feedsInto: [
      "L5:recovery-optimization",
    ],
    tags: ["昼夜节律", "生物钟", "时差", "睡眠"],
    implementations: [
      {
        type: "mainstream",
        name: "24h T_core余弦拟合",
        vendor: "自研 / 时间生物学标准方法",
        description:
          "对24小时T_core数据进行余弦函数拟合（Cosinor分析）：T(t) = M + A × cos(2π(t-φ)/24)，其中M为中值（mesor），A为振幅，φ为相位（acrophase时间）。输出相位偏移量（与标准相位的差值，单位：小时）和振幅。需要至少24小时连续佩戴数据。",
        pros: [
          "Cosinor分析是时间生物学的金标准方法",
          "输出直观（相位偏移小时数），便于用户理解",
          "可与褪黑素分泌节律和睡眠日记交叉验证",
        ],
        cons: [
          "需要24小时佩戴，目前T_core模块精度在此类长时间数据中可能不足",
          "运动产热会掩盖自然的体温节律信号",
          "单日数据受多种因素影响，需要多日平均才有意义",
        ],
        citations: [
          "ref-haddad-athlete-2024",
        ],
      },
      {
        type: "advanced",
        name: "双温度节律分析（T_core + T_skin）",
        vendor: "自研",
        description:
          "同时分析T_core和T_skin的24小时节律，利用两者在昼夜变化中的时相关系差异：T_core的昼夜节律更稳定（由中枢调控），T_skin受环境和行为影响更大（外周调控）。当T_core和T_skin的相位差增大（通常T_skin变化滞后于T_core约0.5-1小时），提示外周血管舒缩节律与中枢节律的解耦——这是自主神经功能紊乱的潜在标志。",
        pros: [
          "双温度信号提供更多节律信息维度",
          "T_core-T_skin相位差是自主神经功能的独立指标",
          "T_skin数据由TMP117直接采集，不受估算误差影响",
        ],
        cons: [
          "Cosinor分析的置信区间在数据缺失时变宽显著",
          "需要准确的入睡/醒来时间标注",
          "临床意义的验证数据较少",
        ],
        citations: [
          "ref-haddad-athlete-2024",
          "ref-verdel-core-2021",
        ],
      },
    ],
    glossaryTerms: [],
    references: [
      "ref-haddad-athlete-2024",
      "ref-verdel-core-2021",
    ],
  },
];
