import { Module } from "@/lib/types";

export const l1Modules: Module[] = [
  // ════════════════════════════════════════════════════════════════
  // L1:ecg — 心电传感器 (ECG)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L1:ecg",
    layer: "L1",
    name: "心电传感器 (ECG)",
    summary:
      "MAX30001 模拟前端驱动的心电采集：干电极、18-bit ADC、512 sps、CMRR >100dB，将心肌电活动转化为高保真心电波形。",
    description:
      "心电传感器是胸带系统的核心生物电信号采集通道，将心肌细胞去极化与复极化过程产生的微弱电位差（0.5-4 mV）转化为数字心电波形。其信号链路从一对医用级导电硅胶干电极开始——干电极直接接触皮肤表面，无需导电凝胶即实现低阻抗电气连接（接触阻抗 10-50 kΩ）——差分信号进入 MAX30001 模拟前端（AFE），经过可编程增益放大器（20-160x）、EMI 滤波器和 18-bit Sigma-Delta ADC（512 sps）后输出高信噪比数字 ECG 流 [ref-max30001-datasheet]。\n\nMAX30001 内置右腿驱动（RLD）输出和 >100dB 的共模抑制比（CMRR），在干电极条件下仍能有效抑制 50/60 Hz 工频共模干扰。芯片硬件 R-R 检测引擎可直接输出逐拍心率，无需软件后处理。输入参考噪声仅 1.6µV RMS（0.05-150 Hz 带宽），确保 P 波和 ST 段等低幅值心电特征的信号保真度 [ref-seshadri-cardiorespiratory-2023]。\n\nECG 信号是心率（HR）、心率变异性（HRV）、RMSSD、LF/HF 比值等多项基础指标的唯一数据来源。在 3-in-1 胸带架构中，ECG 还与 BioZ 呼吸通道共享同一电极阵列——MAX30001 通过时分复用（TDM）机制在两个通道间切换采集。此外，ECG 信号中的 R 波幅度调制（RAM）和呼吸性窦性心律不齐（RSA）为 EDR（ECG 衍生呼吸）提供了零增量硬件的冗余呼吸率通道 [ref-goods-core-2023]。",
    importance: "high",
    dependsOn: [],
    feedsInto: [
      "L2:hr",
      "L2:hrv",
      "L2:rmssd",
      "L2:respiratory-rate",
      "L2:lf-hf-ratio",
    ],
    tags: ["心电", "电极", "模拟前端"],
    implementations: [
      {
        type: "mainstream",
        name: "MAX30001 单导联 ECG",
        vendor: "Analog Devices",
        description:
          "MAX30001 WLP-28 封装（2.9×3.5mm）提供单导联 ECG 采集，两电极差分输入 + 可选 RLD 输出。18-bit ADC @ 512 sps，硬件 R-R 检测，功耗约 0.6-1.0 mW（ECG 通道）。通过 SPI 接口与 nRF52840 主控通信，已量产验证（Fitbit、Samsung 等多款穿戴设备采用）。",
        pros: [
          "单芯片 ECG+BioZ 集成，BOM 最简",
          "硬件 R-R 检测降低 MCU 负荷",
          "超小封装适合紧凑型胸带设计",
          "量产验证充分，参考设计丰富",
        ],
        cons: [
          "仅支持单导联 ECG（无法做多导联分析）",
          "依赖 SPI 通信，占用引脚较多",
          "WLP 封装手工焊接困难（需回流焊）",
        ],
        citations: ["ref-max30001-datasheet"],
      },
      {
        type: "advanced",
        name: "MAX30001 三导联 ECG（3-lead）",
        vendor: "Analog Devices",
        description:
          "在标准两电极配置基础上增加第三电极（Wilson 中心电端参考），实现改良三导联 ECG（I、II、III 导联可通过计算推导）。需额外模拟开关在导联间切换，增加硬件复杂度。可提供更丰富的心电图形态信息（如心电轴偏移检测），适合医用级心律失常筛查场景。",
        pros: [
          "多导联 ECG 形态更丰富",
          "心电轴偏移、心肌缺血等特征可检测",
          "同一 MAX30001 硬件平台扩展",
        ],
        cons: [
          "增加电极数量 → 胸带复杂度上升",
          "需模拟开关 + 额外 PCB 面积",
          "三导联在运动场景下的额外临床价值有限",
        ],
        citations: ["ref-max30001-datasheet"],
      },
    ],
    glossaryTerms: [
      "ecg-electrocardiogram",
      "afe-analog-front-end",
      "max30001",
      "spi-serial-peripheral-interface",
    ],
    references: [
      "ref-max30001-datasheet",
      "ref-seshadri-cardiorespiratory-2023",
      "ref-goods-core-2023",
    ],
    principles:
      "ECG 信号链路：干电极接触皮肤（接触阻抗 Z_contact ~10-50 kΩ）→ MAX30001 差分输入级（输入阻抗 >500 MΩ，确保信号衰减 <0.01%）→ 可编程增益放大器（20-160x，适配 0.5-4 mV 输入范围）→ EMI 低通滤波（截止 ~1 kHz，抑制射频干扰）→ 18-bit ΔΣ ADC @ 512 sps→ 数字抽取滤波（输出数据率 512 Hz）→ SPI 输出至 MCU。右腿驱动（RLD）：放大共模电压后反相驱动至 RLD 电极，主动抵消共模噪声，CMRR 提升至 >100dB。",
  },

  // ════════════════════════════════════════════════════════════════
  // L1:bioz — 生物阻抗传感器 (BioZ)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L1:bioz",
    layer: "L1",
    name: "生物阻抗传感器 (BioZ)",
    summary:
      "MAX30001 BioZ 通道：50kHz 四电极凯尔文连接、20-bit ADC、64 sps，将呼吸引起的胸腔阻抗变化转化为高分辨率呼吸波形。",
    description:
      "生物阻抗传感器（BioZ）是胸带呼吸监测的核心硬件通道。其物理原理基于一个简洁的事实：胸腔内容纳着空气（高阻抗）和体液/组织（低阻抗），呼吸过程中两者的比例变化导致总阻抗波动。吸气时肺膨胀、空气体积增加→电流通路中高阻抗区域扩大→总阻抗 ΔZ ≈ 2-5 Ω（安静），深呼吸时可达 10-15 Ω。MAX30001 BioZ 通道通过向胸腔注入 50 kHz、约 100 µA RMS 的激励电流（远低于 IEC 60601-1 患者辅助漏电流限值 100 µA）并测量电压响应来计算阻抗 [ref-max30001-datasheet]。\n\nBioZ 采用四电极（tetrapolar/凯尔文连接）配置：一对激励电极（I+/I-）注入 50 kHz 恒流正弦波，另一对感应电极（V+/V-）进行高输入阻抗差分电压测量。这种配置有效消除了电极-皮肤接触阻抗引入的误差——感应电极几乎不汲取电流（输入阻抗 >10 MΩ），接触阻抗变化对测量结果的影响可忽略。激励频率 50 kHz 是经过大量实验优化的结果：低于 10 kHz 时细胞膜电容效应显著、信号衰减大；高于 100 kHz 时组织介电特性变化、呼吸调制深度下降。50 kHz 恰好处于细胞膜弛豫频率之上、组织色散区间的甜点位置，兼顾了穿透深度与调制灵敏度 [ref-respiratory-monitoring-motion-2025]。\n\nMAX30001 BioZ 通道内置 20-bit ΔΣ ADC @ 64 sps 和可编程激励源（频率、电流幅度可调），与 ECG 通道通过片上 TDM 机制共享电极阵列。激励脉冲仅在 ECG ADC 采样窗口关闭后的间隙注入，避免 50 kHz 谐波分量混入 ECG 频带。ΔZ(t) 波形输出即为呼吸波形，潮气量 TV ∝ ΔZ，与肺活量计对比的皮尔逊相关系数 r = 0.93 ± 0.05 [ref-machado-chest-2025]。在四合一胸带中，BioZ 还与 ISE 汗液传感器共享前胸部皮肤区域——两者的频域天然隔离（BioZ 50 kHz vs ISE DC/超低频）使得共存可行。",
    importance: "high",
    dependsOn: [],
    feedsInto: [
      "L2:respiratory-rate",
      "L2:tidal-volume",
      "L2:minute-ventilation",
    ],
    tags: ["生物阻抗", "呼吸", "胸廓"],
    implementations: [
      {
        type: "mainstream",
        name: "MAX30001 BioZ 四电极配置",
        vendor: "Analog Devices",
        description:
          "MAX30001 内置 BioZ 通道提供完整的四电极阻抗测量方案：可编程激励源（50 kHz、50-100 µA RMS）、20-bit BioZ ADC @ 64 sps、I/Q 解调输出。与 ECG 共享电极阵列，单芯片实现心率+呼吸。功耗 1.0-2.0 mW（双通道运行），已内置于 Polar H10 级别胸带方案中。",
        pros: [
          "ECG+BioZ 单芯片，BOM 成本最低",
          "四电极凯尔文连接消除接触阻抗误差",
          "TDM 时分复用避免 ECG/BioZ 串扰",
          "I/Q 解调输出提供相位信息",
        ],
        cons: [
          "激励频率固定 50 kHz（不支持多频扫描）",
          "BioZ 功耗占比最高（双通道运行 40%+）",
          "需至少 4 个电极接触点，胸带设计复杂度上升",
        ],
        citations: ["ref-max30001-datasheet"],
      },
      {
        type: "advanced",
        name: "AD5940 多频阻抗谱方案",
        vendor: "Analog Devices",
        description:
          "AD5940 专用 BioZ AFE 支持可编程激励频率（DC-200 kHz），可进行多频阻抗谱（MF-BioZ）扫描。16-bit ADC @ 800 ksps，支持 EIS（电化学阻抗谱）模式。可区分胸式呼吸与腹式呼吸——通过多频段的阻抗变化模式差异识别不同胸部区域的扩张。需与独立 ECG AFE 配合使用，适合研究级产品。",
        pros: [
          "多频扫描能力，支持胸式/腹式呼吸分离",
          "可编程激励波形，灵活性最高",
          "EIS 模式可用于汗液 ISE 测量（一芯多用）",
        ],
        cons: [
          "需要独立 ECG 芯片配合，BOM 增加",
          "封装更大（LFCSP-32, 5×5mm）",
          "多频算法复杂度显著增加",
        ],
        citations: ["ref-max30001-datasheet"],
      },
    ],
    glossaryTerms: [
      "bioz-bioimpedance",
      "max30001",
      "edr-ecg-derived-respiration",
      "respiratory-rate",
      "tidal-volume",
      "motion-artifact-removal",
    ],
    references: [
      "ref-max30001-datasheet",
      "ref-respiratory-monitoring-motion-2025",
      "ref-machado-chest-2025",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "四电极凯尔文连接原理：I+ → 激励正极注入 50 kHz 恒流正弦波 → 电流穿胸而过 → I- 激励负极形成闭合回路。V+/V- 高输入阻抗差分放大器测量感应路径上的电压降。胸腔阻抗 Z = (V+ - V-) / I_excitation。阻抗变化幅度 ΔZ：安静呼吸 ≈ 2-5 Ω，深呼吸 ≈ 10-15 Ω。呼吸波形 = ΔZ(t)。TDM 时序：BioZ 激励脉冲仅在 ECG ADC 采样窗口关闭后的间隙期注入，确保 50 kHz 载波不混入 0.05-150 Hz ECG 频带。",
  },

  // ════════════════════════════════════════════════════════════════
  // L1:tmp117 — 温度传感器 (TMP117)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L1:tmp117",
    layer: "L1",
    name: "温度传感器 (TMP117)",
    summary:
      "TI TMP117 医疗级数字温度传感器：16-bit ΔΣ ADC、±0.1°C 精度、I²C 接口，符合 ASTM E1112/ISO 80601-2-56，将皮肤温度转化为 NIST 可溯源数字读数。",
    description:
      "TMP117 是 Texas Instruments 的医疗级数字温度传感器，专为人体温度测量应用设计。其核心规格——±0.1°C 最大误差（-20°C 至 +50°C 范围）、16-bit ΔΣ ADC（分辨率 0.0078°C）、典型功耗仅 3.5 µA @ 1 Hz——使其成为可穿戴胸带皮肤温度测量的首选方案。TMP117 符合 ASTM E1112（医用电子体温计标准）和 ISO 80601-2-56（临床体温计标准），提供 NIST 可溯源精度 [ref-goods-core-2023]。\n\n在胸带集成中，TMP117 通过 WSON-6（2.0×2.0 mm）封装焊接于 PCB 皮肤接触侧，通过一层薄导热硅胶（≈ 0.3-0.5 mm 厚度）与皮肤热耦合。关键设计要点是 PCB 热隔离——MCU 和 BLE PA 的自身发热可通过铜箔传导至 TMP117 产生 ±0.2-0.5°C 的测量误差。解决方案包括：在 TMP117 焊盘周围布置 PCB 热隔离槽、传感器区域独立 PCB 半岛设计、以及基于 MCU 片上温度传感器的自热动态补偿模型 [ref-seshadri-cardiorespiratory-2023]。\n\nTMP117 的输出是核心体温（T_core）估算的基石。在单热流法（SHF）架构中，T_skin 与热通量传感器读数联立求解 T_core = T_skin + K × Q_flux；在双热流法（DHF）架构中，两个 TMP117 或 TMP117+热电堆组合形成双通道热流测量系统。I²C 数字接口直接接入 nRF52840，1 Hz 采样率足矣（核心体温变化速率通常 <0.05°C/min）。在四合一胸带中，TMP117 还与 LMP91000 ISE AFE 提供温度补偿——Nernst 方程的斜率与温度成正比（~59.16 mV/decade @ 25°C），TMP117 的 ±0.1°C 精度确保 ISE 浓度计算的温度误差 <0.4%。",
    importance: "medium",
    dependsOn: [],
    feedsInto: ["L2:skin-temperature", "L3:core-body-temp"],
    tags: ["温度", "医疗级", "I²C"],
    implementations: [
      {
        type: "mainstream",
        name: "TMP117 数字皮肤温度传感",
        vendor: "Texas Instruments",
        description:
          "TMP117 WSON-6（2.0×2.0mm）±0.1°C 精度，16-bit ΔΣ ADC，I²C 数字输出。3.5 µA 平均功耗 @ 1 Hz。NIST 可溯源精度，符合 ASTM E1112/ISO 80601-2-56。TI 提供完整的驱动代码和参考设计。价格 $2-3（批量）。",
        pros: [
          "±0.1°C 医疗级精度，NIST 可溯源",
          "数字输出无需外部 ADC，BOM 极简",
          "超低功耗（3.5 µA @ 1 Hz）",
          "小型化封装适合可穿戴设计",
        ],
        cons: [
          "仅测量皮肤表面温度，非核心体温",
          "PCB 自热需额外隔离设计",
          "响应时间受导热硅胶厚度影响",
        ],
        citations: ["ref-goods-core-2023"],
      },
      {
        type: "advanced",
        name: "TMP117 + 热电堆双热流配置",
        vendor: "Texas Instruments + 定制热电堆",
        description:
          "两个 TMP117（或一个 TMP117 + 一个定制热电堆）配合已知热阻绝缘层形成双热流传感器对。双通道独立测量 (T_skin, Q1) 和 (T_top, Q2)，通过联立傅里叶方程消除个体组织热导率差异。精度预期 ±0.1-0.3°C（核心体温），无需个体校准。参考 Murata Moni-Patch 临床验证架构。",
        pros: [
          "±0.1-0.3°C 核心体温精度",
          "无需个体校准（自校准特性）",
          "消除 SHF 中皮下脂肪/血流不确定性",
        ],
        cons: [
          "需要定制热电堆或双传感器，BOM 增加",
          "双通道匹配精度要求高",
          "传感器布局空间需求增大",
        ],
        citations: ["ref-goods-core-2023"],
      },
    ],
    glossaryTerms: [
      "tmp117",
      "i2c-inter-integrated-circuit",
      "skin-temperature",
      "core-body-temperature",
      "astm-e1112",
      "single-heat-flux",
      "dual-heat-flux",
    ],
    references: [
      "ref-goods-core-2023",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "TMP117 精度规格：±0.1°C (max) 在 -20°C 至 +50°C，±0.05°C (typ) 在 30-45°C 人体测温范围。16-bit ΔΣ ADC 分辨率 0.0078°C/LSB。I²C 地址可选（ADD0 引脚决定 0x48/0x49/0x4A/0x4B）。Nernst 温度补偿：TMP117 测温 ±1°C 误差 → ISE 浓度计算误差 ≈ 2%，±0.1°C 误差 → 浓度误差 <0.4%。热隔离关键：PCB 铜箔挖空（热隔离槽）+ TMP117 区域独立半岛 + MCU 温度感知动态补偿。",
  },

  // ════════════════════════════════════════════════════════════════
  // L1:ise — 汗液离子传感器 (ISE)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L1:ise",
    layer: "L1",
    name: "汗液离子传感器 (ISE)",
    summary:
      "LMP91000 AFE + Na⁺/K⁺ 离子选择性电极：基于 Nernst 电位法的电化学汗液分析，可更换卡匣设计，将汗液离子浓度转化为可穿戴生化数据。",
    description:
      "汗液离子传感器（ISE）是四合一胸带中的生化传感通道，基于离子选择性电极（Ion-Selective Electrode）技术测量汗液中的 Na⁺ 和 K⁺ 浓度。ISE 的核心是离子载体掺杂聚合物膜（ionophore-doped polymer membrane）——对特定离子具有高度选择性的有机分子嵌入 PVC 或硅橡胶基质中，膜两侧的离子活度差产生符合 Nernst 方程的电位差：E = E₀ + (RT/zF)ln[a]。固体接触式 ISE（solid-contact ISE）省去了传统液体填充内参比电极，将传感器尺寸缩小至微升级别，使胸带集成成为可能 [ref-cyclingnews-sweat-breathing]。\n\nLMP91000 是 TI 的可配置 AFE 电位计，专为电化学传感器设计——内置跨阻放大器（TIA）、可编程偏置电压和温度传感器，支持 2-引线或 3-引线电化学传感器配置。ISE 的输出是高阻抗（10⁶-10⁹ Ω）直流电位信号，LMP91000 的超低输入偏置电流（<10 pA）确保电位测量精度不受负载效应影响。SPI 接口可配置内部寄存器在恒电位/恒电流模式间切换。价格 $3-5（批量），是成本敏感项目的首选 ISE AFE [ref-seshadri-cardiorespiratory-2023]。\n\n在胸带上集成 ISE 面临独特的工程挑战：汗液需要从皮肤表面收集并引导至传感器腔室——这通过亲水性微流控引流垫（hydrophilic wicking pad）实现，类似 FLOWBIO S1 的已量产验证方案。FLOWBIO 已在环法级别比赛中被 Wout van Aert、Jonas Vingegaard 等职业车手使用，证明胸带汗液传感的可行性 [ref-velo-visma-tymewear]。ISE 的核心限制是离子载体膜寿命（1-6 个月，反复汗液接触后降解），因此采用可更换卡匣设计——卡匣内含 Na⁺/K⁺ 双通道膜、微流控引流通道和废液储库，每 3 个月更换一次（$5-10/个），形成稳定的配件收入流。TMP117 共位安装提供 Nernst 斜率温度补偿（1°C 误差 → ~2% 浓度误差）。",
    importance: "medium",
    dependsOn: [],
    feedsInto: ["L2:sodium-concentration", "L2:skin-conductivity"],
    tags: ["汗液", "离子选择性", "电化学"],
    implementations: [
      {
        type: "mainstream",
        name: "LMP91000 + ISE 夹扣式模块（FLOWBIO 方案）",
        vendor: "Texas Instruments / FLOWBIO",
        description:
          "LMP91000 AFE 驱动 Na⁺ ISE，固体接触式离子载体膜。汗液通过亲水性引流垫导入传感器腔室，产生符合 Nernst 方程的电位输出。独立模块（夹扣式）固定在现有胸带上，自带 BLE 通信和电池。FLOWBIO S1 是该方案的市场验证产品（$299），已被世巡赛车队采用。精度 Na⁺ ±2-5%（校准后），价格 $3-5（AFE 芯片）。",
        pros: [
          "已量产验证（FLOWBIO S1）",
          "夹扣式设计兼容现有胸带",
          "LMP91000 内置温度传感器用于补偿",
          "SPI 可编程配置灵活",
        ],
        cons: [
          "独立模块增加体积（FLOWBIO ~30g）",
          "需单独充电，增加用户复杂度",
          "离子载体膜寿命有限（1-6 个月）",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-velo-visma-tymewear",
        ],
      },
      {
        type: "advanced",
        name: "AD5940 + 双通道 ISE 一体化集成",
        vendor: "Analog Devices / 定制",
        description:
          "AD5940 电化学 AFE 双通道同时驱动 Na⁺ 和 K⁺ 固体接触式 ISE。ISE 膜阵列嵌入胸带前中心区域，通过纺织微流控通道（激光刻蚀织物）引导汗液。与 ECG/BioZ 共享 nRF52840 MCU 和 BLE 通信，实现真正的单设备一体化。离子载体膜以可更换卡匣形式提供，校准参数通过 NFC 标签存储在卡匣中。",
        pros: [
          "一体化设计，无需独立模块",
          "双通道同时测量 Na⁺ + K⁺",
          "共享 MCU/BLE 省电省成本",
          "卡匣式设计创造配件收入流",
        ],
        cons: [
          "纺织微流控制造门槛高",
          "ISE 与 ECG/BioZ 共存需谨慎设计",
          "洗涤耐久性待验证",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [
      "ion-selective-electrode",
      "electrolyte",
      "sweat-sodium",
      "nernst-equation",
      "sweat-rate",
      "dehydration-monitoring",
      "microfluidics",
    ],
    references: [
      "ref-cyclingnews-sweat-breathing",
      "ref-velo-visma-tymewear",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "Nernst 方程：E = E₀ + (RT/zF) × ln[a]，其中 E₀ = 标准电极电位，R = 气体常数 8.314 J/(mol·K)，T = 绝对温度 (K)，z = 离子电荷数 (+1 for Na⁺/K⁺)，F = 法拉第常数 96485 C/mol，a = 离子活度 (≈ 浓度 for 稀溶液)。室温 25°C 时斜率 = 59.16 mV/decade（浓度变化 10× → 电位变化 59.16 mV）。LMP91000 输入特性：输入阻抗 >10¹² Ω，偏置电流 <10 pA。汗液 Na⁺ 范围 10-90 mmol/L → 对应的电位变化 ≈ 56 mV。",
  },

  // ════════════════════════════════════════════════════════════════
  // L1:imu — 惯性传感器 (IMU)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L1:imu",
    layer: "L1",
    name: "惯性传感器 (IMU)",
    summary:
      "LSM6DSO 6-axis IMU：3D 加速度计 + 3D 陀螺仪、运动分类、姿态估计，为运动伪影补偿和活动识别提供参考信号。",
    description:
      "惯性传感器（IMU）是胸带的运动感知核心——LSM6DSO（STMicroelectronics）集成了 3 轴加速度计（±2/4/8/16g 可编程量程）和 3 轴陀螺仪（±125/250/500/1000/2000 dps），以 6-axis 数据提供完整的运动状态描述。在胸带应用中，IMU 承担三个关键角色：运动伪影参考信号、活动类型分类、以及姿态/步频估计 [ref-seshadri-cardiorespiratory-2023]。\n\n运动伪影补偿是 IMU 在 BioZ 呼吸监测中的核心功能——跑步步频（约 2.7 Hz）与呼吸频率（0.2-1.0 Hz）并非完全分离（高强度运动时 RR 可达 1 Hz），简单的固定频率滤波无法彻底分离。RLS 自适应滤波器以 IMU 三轴加速度为参考输入 x(n)、BioZ 呼吸信号为目标信号 d(n)，自适应消除与运动相关的信号成分。IMU 同时提供运动类型检测（静止/步行/跑步/骑行），触发对应的滤波参数集切换，进一步提高信号质量 [ref-respiratory-monitoring-motion-2025]。\n\nLSM6DSO 内置的有限状态机（FSM）和机器学习核心（MLC）可在芯片层面完成基础活动分类（静止、步行、跑步、骑行），无需唤醒主 MCU——显著降低系统功耗。6-axis 数据（加速度计 100 Hz + 陀螺仪 100 Hz）通过 SPI 输出至 nRF52840。在四合一胸带中，IMU 还与 TMP117 热模型配合，通过加速度计判定运动状态修正环境散热系数（风速每增加 1 m/s，皮肤表面对流传热系数增加约 30%），辅助核心体温估算。IMU 功耗约 0.55 mA（组合模式，6-axis @ 100 Hz），是胸带中功耗最低的传感器之一。",
    importance: "medium",
    dependsOn: [],
    feedsInto: ["L2:acceleration", "L3:core-body-temp"],
    tags: ["运动", "加速度计", "姿态"],
    implementations: [
      {
        type: "mainstream",
        name: "LSM6DSO 6-axis IMU 标准方案",
        vendor: "STMicroelectronics",
        description:
          "LSM6DSO 集成 3D 加速度计（±16g） + 3D 陀螺仪（±2000 dps），内置 FSM + MLC 实现芯片级活动分类。SPI/I²C 接口，功耗 0.55 mA @ 组合模式 100 Hz。LGA-14L 封装 2.5×3.0×0.83mm，已广泛应用于运动穿戴设备。",
        pros: [
          "内置 FSM/MLC 芯片级活动分类，降低 MCU 负荷",
          "超低功耗（0.55 mA 组合模式）",
          "小型化封装适合紧凑设计",
          "丰富的运动检测库和参考设计",
        ],
        cons: [
          "6-axis 校准需出厂标定",
          "陀螺仪漂移需定期零偏校准",
          "无磁力计，无法提供绝对航向",
        ],
        citations: ["ref-seshadri-cardiorespiratory-2023"],
      },
      {
        type: "advanced",
        name: "LSM6DSO + 磁力计 9-axis 融合方案",
        vendor: "STMicroelectronics + LIS3MDL",
        description:
          "在 LSM6DSO 6-axis 基础上增加 LIS3MDL 3-axis 磁力计，通过 9-axis 传感器融合算法（Madgwick/Mahony AHRS）输出绝对航向和四元数姿态。对于需要精确空间位置追踪的运动分析场景（如游泳划水计数、举重动作分析）提供更丰富的姿态信息。",
        pros: [
          "9-axis 绝对姿态输出（含航向）",
          "丰富的高级运动分析能力",
          "传感器融合算法成熟（开源库丰富）",
        ],
        cons: [
          "磁力计增加 BOM 成本和 PCB 面积",
          "磁力计易受铁磁材料干扰（胸带周边环境）",
          "9-axis 校准复杂度显著增加",
        ],
        citations: ["ref-seshadri-cardiorespiratory-2023"],
      },
    ],
    glossaryTerms: [
      "imu-inertial-measurement-unit",
      "motion-artifact-removal",
      "rls-adaptive-filter",
      "sensor-fusion",
      "machine-learning-core-temp",
    ],
    references: [
      "ref-seshadri-cardiorespiratory-2023",
      "ref-respiratory-monitoring-motion-2025",
    ],
    principles:
      "LSM6DSO 核心参数：加速度计量程 ±16g、噪声密度 80 µg/√Hz、ODR 最高 6.66 kHz。陀螺仪量程 ±2000 dps、噪声密度 4 mdps/√Hz。FSM 可编程状态机支持 16 个独立程序（每个最多 256 条指令），MLC 支持决策树分类器。RLS 自适应滤波：以 IMU 3-axis 加速度为 x(n)、BioZ 呼吸波形为 d(n)，遗忘因子 λ = 0.99 平衡收敛速度与稳态误差。运动频率（步频 ~2.7 Hz）与呼吸频率（0.2-1.0 Hz）的频域分离 + IMU 参考信号使自适应滤波显著。",
  },
];
