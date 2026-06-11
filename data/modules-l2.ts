import { Module } from "@/lib/types";

export const l2Modules: Module[] = [
  // ════════════════════════════════════════════════════════════════
  // L2:hr — 心率 (Heart Rate)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:hr",
    layer: "L2",
    name: "心率 (HR)",
    summary:
      "通过 ECG R-R 间期瞬时计算每分钟心跳次数（bpm），是最基础也最关键的实时训练强度指标，由 MAX30001 硬件 R-R 检测引擎直接输出。",
    description:
      "心率（Heart Rate, HR）是胸带系统产出最基础也最核心的基础指标。其计算源自在 L1:ecg 传感器输出的 ECG 波形上检测 R 波峰值位置——每两个连续 R 波之间的时间间隔（R-R 间期）取倒数乘以 60 即为瞬时心率。MAX30001 内置硬件 R-R 检测引擎可直接输出逐拍心率值，无需 MCU 软件处理，延迟 <1 秒。典型安静心率范围 40-60 bpm（耐力运动员），最大心率随年龄下降（粗略公式：HRmax ≈ 220 - age，个体差异 ±10 bpm），运动期间可达 180-210 bpm [ref-haddad-athlete-2024]。\n\n心率数据是训练强度分区（Zone 1-5）的唯一实时依据。心率对运动负荷的响应延迟约 15-30 秒（远慢于呼吸通气的 5-10 秒），但在稳态运动中是最可靠的强度指标。长时间恒定功率下的心率缓慢攀升（心血管漂移，cardiovascular drift）反映了血浆容量减少、每搏输出量下降的代偿机制——是脱水、热应激和疲劳的整合信号。将心率与 L2:minute-ventilation、L3:core-body-temp 结合，可区分心血管漂移的不同驱动因素 [ref-seshadri-cardiorespiratory-2023]。\n\n心率也是多项高级指标的上游输入：L3:vt1 和 L3:vt2 通气阈值检测需要心率作为第二维度验证；L3:core-body-temp 的单热流法估算需要心率补偿（心率升高 → 皮肤血流增加 → 热导率变化）；L4:trimp（训练冲量）完全基于心率-时间曲线计算训练负荷。心率是横跨基础层到 AI 教练层的贯穿性指标，其精度直接决定下游所有指标的可信度。胸带 ECG 采集的心率精度（MAE <1 bpm）远优于腕部 PPG（MAE 1-5 bpm 安静，运动时可达 10-20 bpm），这是胸带方案的核心竞争力之一。",
    importance: "high",
    dependsOn: ["L1:ecg"],
    feedsInto: [
      "L3:vt1",
      "L3:vt2",
      "L3:core-body-temp",
      "L4:trimp",
    ],
    tags: ["心率", "R波", "训练强度"],
    implementations: [
      {
        type: "mainstream",
        name: "MAX30001 硬件 R-R 检测",
        vendor: "Analog Devices",
        description:
          "MAX30001 内置硬件 R-R 检测引擎，在 ECG ADC 输出的基础上进行片上峰值检测和间期测量，输出逐拍心率值和 R-R 间期时间戳。延迟 <1 秒，支持 30-240 bpm 范围。硬件检测的优势在于不占用 MCU 计算资源、响应快，且可通过中断唤醒 MCU 实现低功耗心率监测。",
        pros: [
          "硬件检测不占 MCU 资源",
          "<1 秒响应延迟",
          "支持中断唤醒 MCU 低功耗模式",
          "输出逐拍 R-R 间期原始值用于 HRV 计算",
        ],
        cons: [
          "高噪声下可能漏检/误检（需 SQI 门控）",
          "仅输出间期，不输出 ECG 形态信息",
          "需额外软件模块处理运动伪影时段",
        ],
        citations: ["ref-max30001-datasheet"],
      },
      {
        type: "advanced",
        name: "Pan-Tompkins 自适应阈值 QRS 检测",
        vendor: "软件算法 / 学术界",
        description:
          "经典 Pan-Tompkins 算法（1985）的数字实现：带通滤波（5-15 Hz）→ 微分 → 平方 → 移动窗口积分 → 自适应阈值峰值检测。在 nRF52840 MCU 上实现，可同时输出心率、R-R 间期和信号质量指数（SQI）。相比硬件检测，软件检测可以更好地处理噪声时段（逐拍 SQI 评分 + 门控输出），但延迟略高（2-3 秒）且占用 MCU 计算资源。",
        pros: [
          "输出逐拍 SQI 信号质量指数",
          "自适应阈值对噪声鲁棒性更好",
          "可输出 ECG 形态特征（QRS 宽度等）",
          "开源实现丰富（参考 Python/Matlab 社区）",
        ],
        cons: [
          "占用 MCU DSP 计算资源",
          "延迟 2-3 秒（高于硬件检测）",
          "ARM Cortex-M4F 上的实时性能需优化",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-haddad-athlete-2024",
        ],
      },
    ],
    glossaryTerms: [
      "ecg-electrocardiogram",
      "max30001",
      "hrv-heart-rate-variability",
      "peak-detection",
      "signal-quality-index",
    ],
    references: [
      "ref-max30001-datasheet",
      "ref-seshadri-cardiorespiratory-2023",
      "ref-haddad-athlete-2024",
    ],
    principles:
      "心率计算流程：ECG 波形 x(t) → R 波峰值检测 → R-R 间期 RR_i (ms) → 瞬时心率 HR_i = 60000 / RR_i (bpm)。输出可选：逐拍 HR 值 或 滑动平均 HR（4-8 拍窗口平滑）。MAX30001 硬件 R-R 检测：片上数字比较器 + 不应期计时器（最小 RR 间隔 250 ms → HR_max = 240 bpm）。SQI 门控：低信噪比（SQI < 0.6）时段输出「数据不可用」标记而非错误心率值。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:hrv — 心率变异性 (HRV)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:hrv",
    layer: "L2",
    name: "心率变异性 (HRV)",
    summary:
      "逐次心跳间期的微小变化，反映自主神经系统功能——副交感高则 HRV 高（恢复良好），交感高则 HRV 低（应激/疲劳），是训练准备度的黄金指标。",
    description:
      "心率变异性（Heart Rate Variability, HRV）分析的是连续心跳之间时间间隔的微小波动——即使平均心率为 60 bpm，实际 R-R 间期并非精确的 1000 ms，而是在 900-1100 ms 之间不断变化。这种变化不是随机噪声，而是自主神经系统（ANS）调节窦房结放电频率的直接体现：副交感神经（迷走神经）活性增加 → 心率减慢 + R-R 间期变异性增大；交感神经活性增加 → 心率加快 + R-R 间期趋于僵化（变异性降低）[ref-verdel-core-2021]。\n\nHRV 的计算基于 L1:ecg 输出的 R-R 间期时间序列。时域指标包括：SDNN（全部正常窦性 RR 间期的标准差，24h 测量 30-150 ms）、RMSSD（相邻间期差值的均方根，20-100 ms，副交感神经的最纯净指标）和 pNN50（相邻间期差 >50 ms 的百分比）。频域指标通过快速傅里叶变换（FFT）或自回归（AR）模型将 RR 间期序列转换到频域：低频 LF（0.04-0.15 Hz，交感+副交感混合）、高频 HF（0.15-0.40 Hz，副交感主导，与呼吸频率耦合）、以及 LF/HF 比值。非线性指标如样本熵（Sample Entropy）和去趋势波动分析（DFA）可捕获传统时频域方法遗漏的复杂度信息 [ref-goods-core-2023]。\n\n晨间 HRV 趋势是当前训练恢复/准备度评估中最广泛使用且经过充分验证的指标。主流实践：运动员每日晨起后进行 1 分钟短时仰卧 ECG 测量 → 计算 RMSSD（或经对数变换的 lnRMSSD）→ 与个人 7 天滚动基线比较。连续 3 天低于基线 80% 应主动减量。结合主观疲劳问卷（RPE），准确率可达 85%+。运动后 HRV 恢复速率（post-exercise HRV recovery）是自主神经恢复速度的独立指标，与耐力表现和过度训练风险密切相关。HRV 是 L2:rmssd 和 L2:lf-hf-ratio 的直接上游，同时也是 L3:rsa（呼吸性窦性心律不齐）和 L4:recovery-readiness 的数据基础。",
    importance: "high",
    dependsOn: ["L1:ecg"],
    feedsInto: ["L2:rmssd", "L2:lf-hf-ratio", "L3:rsa", "L4:recovery-readiness"],
    tags: ["自主神经", "恢复", "变异性"],
    implementations: [
      {
        type: "mainstream",
        name: "单导联 ECG R-R 间期 → 时域 + 频域 HRV",
        vendor: "软件算法 / 开源社区",
        description:
          "从 MAX30001 输出的 R-R 间期时间序列出发，在 nRF52840 MCU（或手机 App 端）完成 HRV 计算。核心步骤：R-R 间期预处理（移除异位搏动和伪影，插值补全）→ 时域指标（SDNN, RMSSD, pNN50）→ 重采样为 4 Hz 均匀时间序列 → FFT 频域分析（LF, HF, LF/HF）。1-5 分钟短时测量窗口即可得到稳定结果。",
        pros: [
          "基于标准 R-R 间期输入，算法成熟",
          "时域+频域指标计算量适中（M4F MCU 可承受）",
          "与 Polar/Garmin 设备输出格式兼容",
          "Kubios HRV 等商业软件提供金标准参考",
        ],
        cons: [
          "运动状态下 R-R 间期伪影率高（>20%）",
          "短时 HRV 比 24h 长时 HRV 信息量有限",
          "呼吸频率变化会显著影响频域指标",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "多模态 HRV（ECG + BioZ 呼吸波形联合分析）",
        vendor: "自研 / 学术界",
        description:
          "同时利用 ECG R-R 间期和 BioZ 呼吸波形进行心肺耦合 HRV 分析。通过 BioZ 呼吸波形精确标记每个呼吸周期的吸/呼气相位，在 HRV 分析中分离呼吸驱动的 HF 成分与纯粹的自律神经调节成分。可输出呼吸校正后的 HRV 指标（RMSSD_corrected, HFnu_corrected），提高运动后恢复评估的特异性。",
        pros: [
          "呼吸相位校正提高 HRV 解译特异性",
          "区分呼吸性窦性心律不齐 vs 真正的副交感活性",
          "心肺耦合分析提供新的生理洞察维度",
        ],
        cons: [
          "需要同步高质量 BioZ 呼吸波形",
          "算法复杂度高（M4F MCU 边缘计算有挑战）",
          "缺乏标准化参考，临床验证尚不充分",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [
      "hrv-heart-rate-variability",
      "ecg-electrocardiogram",
      "rmssd",
      "sdnn",
      "lf-hf-ratio",
      "respiratory-sinus-arrhythmia",
    ],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
      "ref-machado-chest-2025",
    ],
    principles:
      "HRV 时域指标：SDNN = sqrt(Σ(RR_i - RR_mean)² / N)，反映总体变异性。RMSSD = sqrt(Σ(RR_i - RR_{i-1})² / (N-1))，强调逐拍变化、主要由副交感介导。pNN50 = (出现 |RR_i - RR_{i-1}| > 50 ms 的次数 / N) × 100%，副交感活性指标。频域分析：4 ms 重采样后 FFT（256-1024 点），LF 0.04-0.15 Hz，HF 0.15-0.40 Hz，LF/HF 比值。预处理关键：移除异位搏动（RR 变化 >20% 视为异位），线性插值补全缺失点。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:rmssd — RMSSD 相邻间期差值均方根
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:rmssd",
    layer: "L2",
    name: "RMSSD 相邻间期差值均方根",
    summary:
      "相邻 R-R 间期差值的均方根，是副交感（迷走神经）神经活动的最纯净时域指标，也是晨间短时 HRV 测量的首选参数。",
    description:
      "RMSSD（Root Mean Square of Successive Differences）是 HRV 时域分析中的核心参数，专门量化逐拍 R-R 间期的短期变异性。其计算为：RMSSD = sqrt(Σ (RR_i - RR_{i-1})² / (N-1))，其中 RR_i 是第 i 个 R-R 间期（ms）。与 SDNN（标准差，反映总体变异性）不同，RMSSD 的数学形式天然突出了相邻间期的差异，这使得它对迷走神经（副交感神经）介导的快速心率调节极为敏感——迷走神经释放乙酰胆碱的效应时间常数约 100-200 ms，恰好体现在相邻心跳间的间期变化上 [ref-verdel-core-2021]。\n\nRMSSD 被公认为副交感神经活动的最纯净指标（比 SDNN 和频域 HF 参数更纯净），主要理由有三：(1) RMSSD 的有创药理阻断实验（阿托品注射后 RMSSD 下降 >90%）证实其几乎完全由迷走神经介导；(2) 呼吸频率对 RMSSD 的影响远小于对频域 HF 的影响——即使在呼吸频率变化时 RMSSD 仍能可靠反映副交感紧张度；(3) 短时测量窗口（1-5 分钟）即可获得稳定的 RMSSD 估计值，使之成为每日晨间恢复评估的理想选择 [ref-goods-core-2023]。\n\n在 HeartBeat 胸带系统中，L2:hrv 输出的 R-R 间期序列直接驱动 RMSSD 计算。典型应用流程：每日晨起佩戴胸带 → 60 秒仰卧测量 → nRF52840 RFID 片上计算 RMSSD → BLE 上传至手机 App → 与 7 天滚动基线比较 → 生成恢复评分。当 lnRMSSD 连续 3 天低于基线 80% 时，触发减量建议。RMSSD 同时也是 L4:recovery-readiness 评分公式中权重最高的单一输入参数（通常权重 >30%），以及 L5:recovery-optimization（恢复优化策略）的输入。运动后 RMSSD 恢复速率（30 分钟内 RMSSD 回升至基线 70% 的所需时间）与次日的训练表现高度相关。",
    importance: "high",
    dependsOn: ["L2:hrv"],
    feedsInto: ["L4:recovery-readiness", "L5:recovery-optimization"],
    tags: ["迷走神经", "副交感", "时域"],
    implementations: [
      {
        type: "mainstream",
        name: "短时 RMSSD（1-5 分钟仰卧测量）",
        vendor: "自带 / Kubios HRV 标准",
        description:
          "在 nRF52840 MCU 上直接计算 1-5 分钟窗口内的 RMSSD：从 L2:hrv 获取 R-R 间期数组 → 移除异位搏动（相邻 RR 变化 >20% 视为异位，剔除该拍及下一拍）→ 计算 RMSSD = sqrt(Σ ΔRR² / (N-1))。结果为原始 ms 值或自然对数变换后 lnRMSSD。手机 App 端进行 7 天滚动基线计算和偏差分析。",
        pros: [
          "计算简单，M4F MCU 毫秒级完成",
          "1 分钟窗口即可获得稳定估计",
          "lnRMSSD 对数变换使分布正态化",
          "被运动科学界广泛接受和验证",
        ],
        cons: [
          "需要严格标准化测量条件（仰卧、时间一致）",
          "急性应激（咖啡因、酒精）会显著影响",
          "单日波动大，需 7 天滚动平均解读",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "超短时 RMSSD + 呼吸门控校正",
        vendor: "自研 / 学术界",
        description:
          "将测量窗口压缩至 30 秒（超短时），同时利用 BioZ 呼吸波形将每次 R-R 间期按呼吸相位（吸气 vs 呼气）分组计算 RMSSD。吸气期 RMSSD 与副交感激活呈更强的正相关（因 RSA 效应），呼气期 RMSSD 更接近基础迷走紧张度。输出呼吸相位分离的 RMSSD 指标，减少呼吸频率变化对 HRV 评估的污染。",
        pros: [
          "30 秒超短时测量，用户体验更好",
          "呼吸相位校正提高测量特异性",
          "区分 RSA 驱动 HRV vs 真正迷走紧张度",
        ],
        cons: [
          "需同步高质量 BioZ 呼吸波形",
          "30 秒窗口在剧烈呼吸频率波动时不适用",
          "呼吸门控算法的额外计算负担",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [
      "rmssd",
      "hrv-heart-rate-variability",
      "sdnn",
      "recovery-status",
      "ecg-electrocardiogram",
    ],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
      "ref-machado-chest-2025",
    ],
    principles:
      "RMSSD = sqrt(Σ (RR_i - RR_{i-1})² / (N-1))，其中 N 为有效 R-R 间期数（排除异位搏动后）。典型值：20-100 ms（运动员偏高）。lnRMSSD 对数变换使分布趋近正态，适合参数化统计分析（均值 ± 1.96×SD 构建个人参考区间）。晨间 RMSSD 临床应用：7 天滚动均值 = 基线，每日 RMSSD / 基线 × 100 = 恢复百分比。阿托品阻断实验证实 RMSSD 下降 >90%（副交感纯指标）。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:respiratory-rate — 呼吸率 (RR)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:respiratory-rate",
    layer: "L2",
    name: "呼吸率 (RR)",
    summary:
      "每分钟呼吸次数（rpm），从 BioZ 胸腔阻抗波形或 EDR 心电衍生呼吸提取，是少数同时受自主神经和中枢神经双重控制的生理指标。",
    description:
      "呼吸率（Respiratory Rate, RR）是每分钟的呼吸循环次数，单位为 rpm（breaths per minute 或 respirations per minute）。成年人安静状态典型值 12-20 rpm，运动期间可升至 40-60 rpm，精英运动员的最大呼吸率可接近 60-70 rpm。与心率不同，呼吸率是极少数同时受自主神经系统（脑干 pre-Botzinger 复合体自动维持节律）和中枢神经系统（大脑皮层可随时接管控制）双重调控的生理过程，使其成为洞察压力、情绪和训练强度的独特窗口 [ref-haddad-athlete-2024]。\n\nHeartBeat 胸带通过两条独立通道提取呼吸率：(1) **BioZ 通道**（主通道，来自 L1:bioz）：对 ΔZ(t) 呼吸波形进行基于自适应阈值的峰值检测——滑动窗口（10 秒）内计算信号标准差 σ，峰值阈值 = 0.5 σ，相邻波峰时间间隔 Δt → RR = 60 / Δt。加入不应期约束（最小间隔 ≥1 秒 @ 最大 RR = 60 rpm）防止误检。静态 MAE 0.5-2.0 rpm，运动时 MAE 2-6 rpm（RLS 自适应滤波后）[ref-respiratory-monitoring-motion-2025]。(2) **EDR 通道**（冗余通道，来自 L1:ecg）：从 ECG 信号中提取 R 波幅度调制（RAM）和呼吸性窦性心律不齐（RSA）两个独立呼吸成分，精度略低于 BioZ（MAE 1-3 rpm 安静），但零增量硬件。当两个通道均可用时，卡尔曼滤波融合将 RMSE 降低 11.6%（安静）至 30%（运动状态）[ref-machado-chest-2025]。\n\n呼吸率是多项下游模块的核心输入：与 L2:tidal-volume 相乘得到 L2:minute-ventilation（VE, 分钟通气量）；与心率耦合分析定位 L3:vt1（第一通气阈）和 L3:vt2（第二通气阈）；L3:rsa 完全基于呼吸率与 R-R 间期的交叉相关分析；L3:breathing-pattern（呼吸模式分析）基于呼吸率的变异性和趋势。夜间呼吸率升高（>基线+3 rpm 持续 2 晚）是早期过度训练的敏感指标，灵敏度 >70% [ref-vitazkova-respiratory-2024]。",
    importance: "high",
    dependsOn: ["L1:bioz", "L1:ecg"],
    feedsInto: [
      "L2:minute-ventilation",
      "L3:vt1",
      "L3:breathing-pattern",
      "L3:rsa",
    ],
    tags: ["呼吸", "BioZ", "EDR"],
    implementations: [
      {
        type: "mainstream",
        name: "BioZ 峰值检测 + EDR 冗余通道",
        vendor: "自研 / MAX30001",
        description:
          "BioZ 通道为主：对 MAX30001 BioZ 模块输出的 ΔZ(t) 波形（64 sps）进行 4 阶巴特沃斯带通滤波（0.05-2 Hz），然后自适应阈值峰值检测计算 RR。EDR 通道为降级冗余：从 ECG 信号提取 RAM 和 RSA 两个呼吸成分，在 BioZ SQI 低于阈值时自动接管。卡尔曼滤波融合（双通道 SQI 均 >0.6 时）降低 RMSE 11.6-30%。",
        pros: [
          "BioZ 主通道精度高（MAE 0.5-2.0 rpm 静态）",
          "EDR 零增量硬件提供冗余保护",
          "双模融合在高运动场景尤为有效",
          "SQI 门控避免输出低质量数据",
        ],
        cons: [
          "RLS 自适应滤波需 IMU 参考信号",
          "高强度运动下 BioZ 电极接触变化影响精度",
          "EDR 通道在高强度运动下精度退化 >50%",
        ],
        citations: [
          "ref-max30001-datasheet",
          "ref-respiratory-monitoring-motion-2025",
          "ref-machado-chest-2025",
        ],
      },
      {
        type: "advanced",
        name: "深度学习多模态呼吸率融合",
        vendor: "自研（ResNet-LSTM 架构）",
        description:
          "将 BioZ 波形、ECG 导出的 RAM/RSA 信号、IMU 三轴加速度共 5 个输入通道输入 ResNet-LSTM 混合深度学习模型。CNN 提取局部波形形态特征（吸/呼比、波峰尖锐度），LSTM 捕获数分钟尺度的呼吸模式演变。模型在训练中学习识别伪影模式，而非仅依赖单一信号。在公开数据集上呼吸率 MAE <1.5 rpm（含运动场景）。",
        pros: [
          "运动伪影高发区间精度显著优于传统信号处理",
          "自动学习伪影模式，无需手动调参",
          "可同时输出呼吸模式分类（正常/喘息/浅快）",
        ],
        cons: [
          "需要大规模标注训练数据",
          "ARM M4F MCU 无法实时推理（需模型压缩/量化）",
          "可解释性低于传统信号处理方法",
        ],
        citations: [
          "ref-respiratory-monitoring-motion-2025",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [
      "respiratory-rate",
      "bioz-bioimpedance",
      "edr-ecg-derived-respiration",
      "sensor-fusion",
      "kalman-filter",
      "motion-artifact-removal",
      "rls-adaptive-filter",
    ],
    references: [
      "ref-max30001-datasheet",
      "ref-respiratory-monitoring-motion-2025",
      "ref-machado-chest-2025",
      "ref-haddad-athlete-2024",
      "ref-vitazkova-respiratory-2024",
    ],
    principles:
      "BioZ 呼吸率提取流程：ΔZ(t) → 4 阶巴特沃斯带通 0.05-2 Hz → RLS 自适应滤波（IMU 参考）→ 中值滤波去基线漂移（窗口 ~20s）→ 自适应阈值峰值检测（阈值 = 0.5σ，10s 滑动窗口）→ 不应期约束（RR_max = 60 rpm → 最小间隔 1s）→ SQI 门控（自相关峰高 + 频谱纯度 + 幅值变异系数）→ RR 输出。EDR 通道：RAM（R 波幅值序列的 0.1-0.5 Hz 带通） + RSA（R-R 间期序列的 0.1-0.5 Hz 带通），峰值检测同上。卡尔曼融合：BioZ 为主传感器（低过程噪声 Q），EDR 为辅传感器（高过程噪声 Q），观测量为两通道独立 RR 估计，融合后输出最大后验估计。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:tidal-volume — 潮气量 (TV)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:tidal-volume",
    layer: "L2",
    name: "潮气量 (TV)",
    summary:
      "每次呼吸吸入/呼出的气体体积（mL），通过 BioZ 胸腔阻抗波形的幅度 ΔZ 估算——ΔZ 与 TV 的皮尔逊相关系数 r = 0.93 ± 0.05。",
    description:
      "潮气量（Tidal Volume, TV）指每次自然呼吸时吸入或呼出的气体体积，安静状态下成年人典型值为 300-500 mL/次，运动时可增至 2000-3000 mL/次。传统测量需要肺活量计（spirometer）或面罩式气体分析设备——侵入性强、不适合日常训练。BioZ 胸腔阻抗技术通过呼吸波形幅度间接估算 TV，是目前非面罩式潮气量估算最可行的方案 [ref-machado-chest-2025]。\n\nTV 估算基于 L1:bioz 输出的 ΔZ(t) 呼吸波形：每个呼吸周期的波形下面积 A_i（峰-谷间积分）与 TV_i 成正比。通过初始校准（安静坐位，对照肺活量计测量 TV_ref）确定比例系数 k = TV_ref / A_ref。后续 TV_est = k × A_i。校准后 R² = 0.91, RMSE = 0.12 L（与肺活量计对比，多个独立验证结果 r = 0.87-0.93）[ref-respiratory-monitoring-motion-2025]。校准的一次性是个体化的——不同体型、胸廓形态的人群 k 值不同（体脂率高者 k 通常偏小，因皮下脂肪增加了电流路径但不贡献呼吸容积变化）。\n\nTV 是 L2:minute-ventilation（VE = TV_mean × RR_mean）、L3:breathing-pattern（浅快呼吸 vs 深呼吸的量化判别）和 L3:vt1/vt2 阈值检测（TV 随运动强度的非线性增长斜率）的核心上游指标。运动经济性评估中，同一速度下 TV 的上升提示呼吸效率下降（需要更多空气获取相同氧气）。在 BioZ 信号质量下降（SQI < 0.6）时，TV 估算退化为基于心率和加速度计的代谢当量（MET）模型——精度显著下降但提供连续性趋势信息。",
    importance: "medium",
    dependsOn: ["L1:bioz"],
    feedsInto: ["L2:minute-ventilation", "L3:breathing-pattern"],
    tags: ["呼吸深度", "肺通气", "BioZ"],
    implementations: [
      {
        type: "mainstream",
        name: "BioZ 波形积分法（单点校准）",
        vendor: "自研 / 学术界",
        description:
          "对 SQI 门控后的 ΔZ(t) 呼吸波形进行逐周期积分：每个呼吸周期检测吸/呼相位边界（峰值检测 + 基线过零），计算波形下面积 A_i。通过单次安静校准确定比例系数 k = TV_ref / A_ref。输出逐呼吸 TV_est = k × A_i，30 秒滑动窗口平滑。算法在 ARM M4F MCU 上实时运行。",
        pros: [
          "非面罩式、可日常佩戴使用",
          "经验证的 r = 0.87-0.93（与肺活量计对比）",
          "计算开销适中，MCU 可实时处理",
          "长期趋势比单次绝对值更有临床价值",
        ],
        cons: [
          "需要个体化校准（k 值因人而异）",
          "校准后数周内体重大幅变化需重新校准",
          "运动伪影时期信号质量下降影响精度",
        ],
        citations: [
          "ref-respiratory-monitoring-motion-2025",
          "ref-machado-chest-2025",
        ],
      },
      {
        type: "advanced",
        name: "多频 BioZ 分区潮气量估算",
        vendor: "自研 / AD5940",
        description:
          "利用 AD5940 的多频阻抗谱能力（扫描 5-200 kHz）获取不同频率下的胸腔阻抗变化，通过多频数据区分上胸腔（肺为主）与下胸腔/腹部（膈肌主导）的容积变化。低频（5-50 kHz）的 ΔZ 更反映胸壁和肺的容积变化，中高频（50-200 kHz）的 ΔZ 额外包含腹部移动的贡献。分区模型输出胸式呼吸 TV_thoracic 和腹式呼吸 TV_abdominal，总 TV = TV_thoracic + TV_abdominal。",
        pros: [
          "区分胸式/腹式呼吸贡献",
          "多频数据提高 TV 估算精度（预期 r >0.95）",
          "为呼吸模式评估提供新维度",
        ],
        cons: [
          "需要 AD5940 支持多频扫描",
          "多频算法复杂度高",
          "缺乏大规模临床验证数据",
        ],
        citations: [
          "ref-machado-chest-2025",
          "ref-respiratory-monitoring-motion-2025",
        ],
      },
    ],
    glossaryTerms: [
      "tidal-volume",
      "bioz-bioimpedance",
      "minute-ventilation",
      "respiratory-rate",
      "edr-ecg-derived-respiration",
    ],
    references: [
      "ref-respiratory-monitoring-motion-2025",
      "ref-machado-chest-2025",
    ],
    principles:
      "TV 估算：对 ΔZ(t) 波形进行逐周期峰-谷检测 → 每个周期的波形下面积 A_i = ∫_{t_insp_start}^{t_insp_end} |ΔZ(t) - ΔZ_baseline| dt → TV_est = k × A_i，k 通过单点安静校准确定（k = TV_ref (spirometer) / A_ref (BioZ)）。校准条件：安静坐位、正常潮式呼吸、60 秒数据窗口。RMSE = 0.12 L，R² = 0.91（与肺活量计对比）。参考值：安静 TV ≈ 300-500 mL，运动 TV ≈ 2000-3000 mL。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:minute-ventilation — 分钟通气量 (VE)
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:minute-ventilation",
    layer: "L2",
    name: "分钟通气量 (V̇E)",
    summary:
      "每分钟吸入/呼出的气体总量（L/min）= 呼吸率 × 潮气量，是反映代谢需求的最直接呼吸指标，VE/VCO₂ 斜率是心肺适能的金标准参数。",
    description:
      "分钟通气量（Minute Ventilation, V̇E）是每分钟吸入或呼出的气体总量，计算公式 VE = RR_mean × TV_mean，其中 RR_mean 为 30 秒滑动窗口内的平均呼吸率（来自 L2:respiratory-rate），TV_mean 为同期平均潮气量（来自 L2:tidal-volume）。安静状态下 VE 约 6-8 L/min，中等强度运动约 60-80 L/min，剧烈运动可达 120-200 L/min（精英男性运动员）。VE 直接反映代谢需求——是能量消耗的呼吸代理指标，与 VO₂（耗氧量）和 VCO₂（二氧化碳排出量）高度线性相关 [ref-seshadri-cardiorespiratory-2023]。\n\nVE 的训练价值在于它能够识别训练强度的关键转换点——L3:vt1（第一通气阈）对应于 VE 从线性增长变为超线性增长的拐点，L3:vt2（第二通气阈）对应 VE/VCO₂ 开始持续上升的位置（呼吸代偿点）。这些阈值传统上需要面罩式气体分析设备（$20,000+ 的代谢车）才能测量，HeartBeat 胸带通过 BioZ 衍生的 VE 估算实现了日常训练中的无面罩通气阈值检测——这是胸带方案相比纯心率胸带的最大差异化优势之一 [ref-haddad-athlete-2024]。\n\nVE 的准确度直接受 TV 校准质量和 RR 精度的双重影响。RMSE 在安静状态下约 0.8-1.5 L/min，中等强度运动下升至 2-5 L/min。30 秒滑动平均平滑了单次呼吸的起伏，适合实时显示和趋势分析。VE 也是通气效率（Ventilatory Efficiency, VE/VCO₂ slope）计算的基础——VE/VCO₂ 斜率 <30 为正常，>35 为异常，是世界顶级耐力运动员（环法车手、奥运马拉松选手）年度体测的核心参数。需要注意的是 BioZ 估算的 VE 不是直接测量的 VE（没有气体分析），两者之间的系统性偏差需要个体校准补偿。",
    importance: "medium",
    dependsOn: ["L2:respiratory-rate", "L2:tidal-volume"],
    feedsInto: ["L3:vt1", "L3:vt2", "L3:ventilatory-efficiency"],
    tags: ["通气", "VE", "代谢"],
    implementations: [
      {
        type: "mainstream",
        name: "RR × TV 乘积法（30s 滑动窗口）",
        vendor: "自研",
        description:
          "取 30 秒滑动窗口内的平均呼吸率 RR_mean（来自 L2:respiratory-rate）和平均潮气量 TV_mean（来自 L2:tidal-volume），VE = RR_mean × TV_mean。30 秒窗口平滑单次呼吸波动，适合实时显示。SQI 门控：RR 和 TV 的 SQI 同时 >0.6 时输出 VE，否则降级为仅 RR 指示代谢趋势。",
        pros: [
          "直接公式计算，MCU 开销极小",
          "30 秒平滑适合实时训练指导",
          "与代谢车测 VE 的趋势高相关",
        ],
        cons: [
          "精度受 TV 校准质量和 RR 精度的双重影响",
          "BioZ SQI 低时无法可靠输出 VE",
          "每分钟绝对值与面罩气体分析存在系统性偏差",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-haddad-athlete-2024",
        ],
      },
      {
        type: "advanced",
        name: "心率-呼吸耦合 VE 估算模型",
        vendor: "自研 / 学术界",
        description:
          "利用心率与 VE 在稳态运动中的强线性关系（r >0.9），以心率为主变量、加速度计+呼吸率为协变量构建多元线性回归 VE 估算模型。模型需要初始校准（递增负荷测试中记录 HR-VE 关系），校准后可在 TV 估算不可用时（BioZ SQI 低）维持 VE 输出。适合高强度运动场景下 BioZ 信号质量不可靠时的降级策略。",
        pros: [
          "不依赖 BioZ TV 估算，健壮性更高",
          "心率- VE 线性关系在稳态运动中已被大量验证",
          "可与 BioZ VE 进行交叉验证（双通道冗余）",
        ],
        cons: [
          "非稳态运动（间歇、冲刺）中 HR-VE 关系失配",
          "需要递增负荷测试校准",
          "精度低于直接 BioZ VE 估算（在 BioZ 可用时）",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-haddad-athlete-2024",
        ],
      },
    ],
    glossaryTerms: [
      "minute-ventilation",
      "tidal-volume",
      "respiratory-rate",
      "vt1-first-ventilatory-threshold",
      "vt2-second-ventilatory-threshold",
      "vo2max",
    ],
    references: [
      "ref-seshadri-cardiorespiratory-2023",
      "ref-haddad-athlete-2024",
    ],
    principles:
      "VE 计算：VE = RR_mean (rpm) × TV_mean (mL) / 1000 (L/min)。30 秒滑动窗口均值平滑 RR_mean 和 TV_mean。安静值 6-8 L/min，最大值 120-200 L/min（精英运动员）。VE-VO₂ 关系：在稳态有氧运动中 VE ≈ 20-30 × VO₂ (L/min)（通气当量），即每产生 1 L 的 VO₂ 需要约 20-30 L 的通气量。VE/VCO₂ 斜率 <30 正常，>35 异常。BioZ VE 与肺活量计对比 RMSE：安静 0.8-1.5 L/min，运动 2-5 L/min。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:skin-temperature — 皮肤温度
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:skin-temperature",
    layer: "L2",
    name: "皮肤温度 (Skin Temperature)",
    summary:
      "TMP117 直接测量的皮肤表面温度（°C），±0.1°C 精度、1 Hz 采样率，是核心体温估算和热调节状态评估的基础输入。",
    description:
      "皮肤温度（Skin Temperature, T_skin）是接触式数字温度传感器 TMP117（来自 L1:tmp117）直接输出的基础生理参数——通过导热硅胶层与胸部皮肤热耦合，1 Hz 采样率输出 16-bit 分辨率（0.0078°C）温度值。安静状态下 T_skin 范围约 28-36°C，受环境温度、皮肤血流灌注量和出汗蒸发散热的共同调节。T_skin 的绝对值和变化趋势是判断外周血管舒缩状态的关键指标 [ref-goods-core-2023]。\n\n在胸带系统中，T_skin 是三合一（核心体温）和四合一（热 × 汗液）的核心数据支点。单热流法（SHF）需要 T_skin + 热通量求解 T_core = T_skin + K × Q_flux；双热流法（DHF）需要两个 TMP117 或 TMP117+热电堆组合。T_skin 同时也是 Nernst 温度补偿的关键输入——ISE 传感器（来自 L1:ise）的电位-浓度转换斜率与绝对温度成正比（59016 mV/decade @ 25°C），TMP117 的 ±0.1°C 精度确保 ISE 浓度计算误差 <0.4% [ref-seshadri-cardiorespiratory-2023]。\n\n皮肤温度的临床应用包括：(1) 运动起始 T_skin 升高速率反映预热效果；(2) 运动中 T_skin 骤降提示外周血管突然收缩（冷应激/严重脱水初期信号）；(3) T_core - T_skin 梯度缩小（<1°C 持续 30 分钟）提示散热系统接近极限；(4) 夜间 T_skin 升高趋势与入睡准备度相关。T_skin 是 L3:core-body-temp（核心体温估算）和 L4:circadian-phase（昼夜节律相位）的直接上游。",
    importance: "medium",
    dependsOn: ["L1:tmp117"],
    feedsInto: ["L3:core-body-temp", "L4:circadian-phase"],
    tags: ["体温", "热传导", "皮肤"],
    implementations: [
      {
        type: "mainstream",
        name: "TMP117 直接数字皮肤温度测量",
        vendor: "Texas Instruments",
        description:
          "TMP117 WSON-6（2.0×2.0mm）焊接于 PCB 皮肤接触侧，通过 0.3-0.5 mm 导热硅胶层与胸部皮肤热耦合。I²C 数字输出 @ 1 Hz 至 nRF52840。PCB 热隔离槽 + MCU 温度动态补偿修正自热误差。输出 T_skin 用于 SHF/DHF 核心体温估算和 ISE Nernst 温度补偿。",
        pros: [
          "±0.1°C NIST 可溯源精度",
          "数字输出简化硬件设计",
          "超低功耗（3.5 µA @ 1 Hz）",
        ],
        cons: [
          "仅皮肤表面温度，非核心体温",
          "PCB 自热需要额外隔离设计",
          "胸带位置/压力变化影响热耦合效率",
        ],
        citations: [
          "ref-goods-core-2023",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
      {
        type: "advanced",
        name: "TMP117 阵列多点皮肤温度映射",
        vendor: "Texas Instruments + 定制",
        description:
          "在胸带不同位置部署 2-4 个 TMP117 传感器（前中心、左胸、右胸、背部），形成多点皮肤温度分布图。多点的空间平均降低局部血流的随机误差，温差分布反映外周血管舒缩的区域差异。可用于热适应状态评估（热适应后多点温差缩小）。I²C 共享总线（不同地址）连接多个 TMP117 共享 nRF52840 两条 IO 引脚。",
        pros: [
          "空间平均提高皮肤温度测量可靠性",
          "多点温差提供外周血管调节信息",
          "I²C 总线共享简化布线",
        ],
        cons: [
          "传感器数量增加 BOM 成本和 PCB 面积",
          "多个传感器的热耦合一致性维护复杂",
          "对常规运动训练而言临床价值边际较低",
        ],
        citations: [
          "ref-goods-core-2023",
        ],
      },
    ],
    glossaryTerms: [
      "skin-temperature",
      "tmp117",
      "core-body-temperature",
      "i2c-inter-integrated-circuit",
      "astm-e1112",
    ],
    references: [
      "ref-goods-core-2023",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "TMP117 精度：±0.1°C (max) -20°C 至 +50°C，±0.05°C (typ) 30-45°C 人体生理范围。0.0078°C 分辨率 (16-bit)。I²C 地址：0x48/0x49/0x4A/0x4B（ADD0 引脚决定）。T_skin 应用：核心体温模型 T_core = T_skin + K × Q_flux，ISE Nernst 斜率 S = (R×T)/F × ln(10) ≈ 0.1984 × T (K) mV/decade，T 误差 ±0.1°C → 浓度误差 <0.4%。PCB 热隔离：TMP117 周围铜箔挖空槽 + MCU 自热模型 ΔT_MCU_power = f(P_MCU) 实时补偿。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:sodium-concentration — Na⁺ 浓度
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:sodium-concentration",
    layer: "L2",
    name: "Na⁺ 浓度 (Sodium Concentration)",
    summary:
      "汗液中钠离子浓度（mmol/L），通过 ISE Nernst 电位法测量，10-90 mmol/L 范围，是判断脱水风险与电解质补充需求的核心生化指标。",
    description:
      "汗液钠离子浓度 [Na⁺] 是汗液生化分析中最核心的单一指标，由 L1:ise 传感器通过离子选择性电极（ISE）的 Nernst 电位法测量。Na⁺ 离子载体膜（如 ETH 2120 钠离子载体掺杂 PVC 膜）对钠离子产生选择性电位响应：E = E₀ + (RT/zF) × ln[Na⁺]。在 25°C 下，[Na⁺] 浓度每变化 10 倍（1 decade），电位变化约 59.16 mV。汗液 Na⁺ 浓度范围 10-90 mmol/L（个体差异达 3-5 倍），长时间运动中可从初始 20 mmol/L 逐渐降至 10 mmol/L 以下——这种下降反映体内电解质逐步耗竭 [ref-cyclingnews-sweat-breathing]。\n\n职业自行车运动员每小时流失 1-2L 汗液，钠离子流失量可达 500-2000 mg/h。如果仅补充纯水而不补充钠，血钠浓度将下降 → 可能诱发低钠血症（hyponatremia，血钠 <135 mmol/L），轻则肌肉痉挛、运动表现下降，重则脑水肿危及生命。实时 [Na⁺] 监测让运动员从「凭感觉喝水」升级为「基于数据的精确补水」——当 [Na⁺] 趋势下降 >30% 基线且出汗率持续高时，触发「补充电解质饮料」而非「纯水」的指令 [ref-velo-visma-tymewear]。\n\n[Na⁺] 数据与 L2:skin-conductivity（皮肤电导）、L2:hr（心率漂移趋势）联合输入 L3:dehydration-risk（脱水风险指数）。长期训练中，[Na⁺] 静息基线下降是热适应（身体学会保钠）的经典标志——热适应完成后的运动员在同等运动强度下的汗钠浓度下降 10-30%。[Na⁺] 还流入 L4:electrolyte-balance（电解质平衡状态）和 L5:hydration-strategy（个性化补水策略），是四合一胸带的生化数据支柱。",
    importance: "medium",
    dependsOn: ["L1:ise"],
    feedsInto: [
      "L3:dehydration-risk",
      "L4:electrolyte-balance",
      "L5:hydration-strategy",
    ],
    tags: ["钠离子", "汗液", "电解质"],
    implementations: [
      {
        type: "mainstream",
        name: "固体接触式 ISE Na⁺ 单通道",
        vendor: "FLOWBIO / 定制",
        description:
          "FLOWBIO S1 提供已量产验证的 Na⁺ ISE 方案：固体接触式离子载体膜 + 亲水性引流垫 + LMP91000 AFE。Nernst 电位 → ADC → [Na⁺] 浓度计算（温度补偿）。单通道测量 Na⁺。FLOWBIO 被多支世巡赛车队采用，含 Wout van Aert、Jonas Vingegaard，在环法级别比赛中验证。精度 ±2-5%（校准后），无校准漂移 ~1-2 mV/h。",
        pros: [
          "已量产验证（FLOWBIO S1）",
          "国际赛场实战验证",
          "固体接触式无需填充液",
          "LMP91000 内置温度传感器",
        ],
        cons: [
          "仅单通道（Na⁺），无 K⁺ 信息",
          "校准后数周漂移需重新标定",
          "亲水性引流垫需定期更换",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-velo-visma-tymewear",
        ],
      },
      {
        type: "advanced",
        name: "双通道 Na⁺ + K⁺ ISE 阵列",
        vendor: "自研 / LMP91000 双通道",
        description:
          "在同一传感器卡匣中集成两个独立的 ISE 通道（Na⁺ + K⁺ 离子载体膜），共享 LMP91000 或双 LMP91000 AFE。双通道数据提供 Na⁺/K⁺ 比值——K⁺ 是细胞内主要阳离子（2-10 mmol/L 汗液），Na⁺/K⁺ 比值下降反映电解质耗竭偏向钠而非钾。加装电导率电极（AC 阻抗法）作为「总电解质浓度」的独立验证通道，三通道交叉验证提高数据可信度。",
        pros: [
          "双通道 Na⁺ + K⁺ 提供电解质全景",
          "Na⁺/K⁺ 比值比单一浓度更具诊断价值",
          "电导率通道提供独立交叉验证",
        ],
        cons: [
          "传感器复杂度增加，膜成本翻倍",
          "双通道校准流程更复杂",
          "胸带空间需要更大传感器区域",
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
      "dehydration-monitoring",
      "sweat-rate",
    ],
    references: [
      "ref-cyclingnews-sweat-breathing",
      "ref-velo-visma-tymewear",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "Nernst 电位 → 浓度：[Na⁺] = 10^((E - E₀) / (RT/zF × ln10)) = 10^((E - E₀) / 59.16) mmol/L @ 25°C。温度补偿：S (T) = 59.16 × (T/298.15) mV/decade。典型汗钠范围 10-90 mmol/L，个体差异 3-5×。校准：两点校准（10 mmol/L + 100 mmol/L 标准液），斜率 55-59 mV/decade（膜效率 <100% 时斜率 < 理论值）。漂移 ~1-2 mV/h（未校准），对应浓度误差 ~4-8%/h。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:skin-conductivity — 皮肤电导
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:skin-conductivity",
    layer: "L2",
    name: "皮肤电导 (Skin Conductivity)",
    summary:
      "通过双电极 AC 阻抗法测量汗液总电导率（µS），反映总电解质浓度和出汗率趋势——最简单可靠的汗液传感方案。",
    description:
      "皮肤电导（Skin Conductivity / Galvanic Skin Response, GSR）通过一对电极施加 AC 信号（通常 1-10 kHz）测量汗液的总体电导率。电导率 ∝ Σ（各离子浓度 × 摩尔电导率），主要贡献者为 Na⁺、K⁺、Cl⁻。电导法不区分具体离子种类，但提供了「总电解质浓度」的综合指标。由于电导率与汗液中的总离子浓度强相关，当出汗率稳定时，电导率的下降趋势反映电解质稀释——即汗液中离子浓度在降低（体内电解质逐步耗竭）[ref-seshadri-cardiorespiratory-2023]。\n\n电导法的最大优势在于极简性——仅需两个小型电极接触汗液（理论上可复用 ECG/BioZ 电极）、一个 AC 信号源和一个 ADC，电路复杂度远低于 ISE。它在胸带上的集成度最高（★★★★★）——ECG/BioZ 电极区域在出汗后天然形成电导测量路径。测量原理：施加频率 f（1-10 kHz）的 AC 电压 V_ac，测量电流 I_ac，电导 G = I_ac / V_ac = 1 / Z。电导 G 的上升与出汗率正相关，但电导率的绝对值同时受离子浓度和汗液量双重影响，单独使用电导率无法区分「大量稀释汗液」和「少量浓缩汗液」[ref-cyclingnews-sweat-breathing]。\n\n在四合一胸带中，电导通道作为 ISE [Na⁺] 测量的互补/降级方案：当 ISE 传感器还未被汗液充分浸润（运动开始 3-8 分钟）或 ISE 膜到期更换期间，电导率提供连续的「总电解质」趋势信息。电导率 + 出汗率联合可进行稀释追踪（dilution tracking）——出汗率稳定时电导率下降 = 体内电解质耗竭，出汗率上升时电导率不变 = 电解质供应仍充足。电导率流入 L3:dehydration-risk 和 L4:electrolyte-balance，权重低于 ISE [Na⁺] 但提供独立性验证。",
    importance: "medium",
    dependsOn: ["L1:ise"],
    feedsInto: ["L3:dehydration-risk", "L4:electrolyte-balance"],
    tags: ["电导", "GSR", "汗腺"],
    implementations: [
      {
        type: "mainstream",
        name: "双电极 AC 阻抗电导率测量",
        vendor: "自研 / hDrop 参考",
        description:
          "复用胸带 ECG/BioZ 电极（或专用小型电导电极对），施加 1-10 kHz AC 电压（~100 mVpp），测量电流 → 计算电导 G。电路极简：AC 信号源（nRF52840 PWM + 简易低通滤波）+ 电流检测电阻 + ADC。hDrop Gen 2 已商用该方案（前臂穿戴，水合状态监测），验证了消费级电导率测量的可行性。",
        pros: [
          "电路极简，BOM 成本 <$0.50",
          "可复用现有 ECG/BioZ 电极",
          "无需离子载体膜、无需校准",
          "极其坚固、不受盐结晶影响",
        ],
        cons: [
          "完全无离子选择性（不能区分 Na⁺/K⁺）",
          "受出汗率变化严重影响",
          "仅提供总电解质信息",
        ],
        citations: [
          "ref-cyclingnews-sweat-breathing",
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
      {
        type: "advanced",
        name: "多频电导谱（1 kHz - 100 kHz 扫描）",
        vendor: "自研 / AD5940 EIS 模式",
        description:
          "利用 AD5940 的电化学阻抗谱（EIS）模式，扫描 1 kHz - 100 kHz 频率范围的电导率变化。低频（1-10 kHz）电导率主要由汗液中的离子浓度决定，高频（50-100 kHz）电导率额外包含细胞膜电容效应。通过多频数据的 Cole-Cole 模型拟合，可分离出「纯离子电导」和「细胞膜电容」两个独立参数，在某种程度上提供比单频更丰富的汗液组成信息。",
        pros: [
          "多频提供更多汗液组成信息",
          "Cole-Cole 模型分离离子电导与膜电容",
          "AD5940 已原生支持 EIS 模式",
        ],
        cons: [
          "需要 AD5940（增加 BOM 成本）",
          "多频扫描时间增加（数秒）",
          "多频数据的生理学解释仍在研究中",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [
      "sweat-rate",
      "electrolyte",
      "dehydration-monitoring",
      "bioz-bioimpedance",
    ],
    references: [
      "ref-cyclingnews-sweat-breathing",
      "ref-seshadri-cardiorespiratory-2023",
    ],
    principles:
      "电导率测量：G = I_ac / V_ac = 1/Z (Siemens, S)，通常以 µS 为单位。AC 激励频率 1-10 kHz 避免电极极化（DC 会导致电极-电解质界面的电荷积累，产生极化电位误差）。汗液电导率与总离子浓度的关系：G ≈ Σ(c_i × λ_i)，c_i 为各离子浓度，λ_i 为摩尔电导率。Na⁺ λ = 50.1 S·cm²/mol, K⁺ λ = 73.5 S·cm²/mol, Cl⁻ λ = 76.3 S·cm²/mol。dilution tracking：出汗率稳定 → G 下降 = 离子浓度下降（电解质耗竭）。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:acceleration — 加速度
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:acceleration",
    layer: "L2",
    name: "加速度 (Acceleration)",
    summary:
      "LSM6DSO 三轴加速度计输出的运动加速度（m/s² 或 g），用于运动检测、步频计算、姿态估计，以及为核心体温模型提供运动状态输入。",
    description:
      "加速度（Acceleration）是 LSM6DSO IMU（来自 L1:imu）三轴加速度计输出的基础运动参数，量程 ±16g、采样率 100 Hz、噪声密度 80 µg/√Hz。三轴数据（a_x, a_y, a_z）经过重力分量分离后，提供胸部在空间中的线性加速度——纵向（跑步前进方向）、横向（左右摇摆）和垂直（上下弹跳）三个维度的运动强度信息 [ref-seshadri-cardiorespiratory-2023]。\n\n加速度数据在胸带系统中的第一个关键应用是运动类型分类——通过时域特征（均值、标准差、峰度）和频域特征（主导频率、频谱熵），LSM6DSO 内置的 FSM/MLC 可在芯片层面完成基础活动分类（静止、步行、跑步、骑行），无需唤醒主 MCU。运动类型信息触发对应的心率区间算法、呼吸率滤波参数集和核心体温环境散热系数切换。第二个应用是 BioZ 呼吸监测的运动伪影补偿——三轴加速度作为 RLS 自适应滤波器的参考输入 x(n)，实时消除呼吸波形中与运动相关的信号成分 [ref-respiratory-monitoring-motion-2025]。\n\n第三个应用（相对次要但不可忽略）是步频（cadence）计算——垂直轴加速度的主导频率（跑步时约 2.5-3.0 Hz，即 150-180 spm）对应跑步步频，被骑行界称为「踏频」的前后轴加速度主导频率对应骑行节奏。步频是跑步经济性的基础指标之一。加速度的第四个应用是辅助 L3:core-body-temp——加速度幅值反映运动强度（代谢产热），与心率一起作为核心体温模型的运动补偿输入（区分「T_skin 上升是因为环境热还是代谢产热」）。加速度是 L2 层唯一的 low 重要度模块——它本身不产生直接的训练洞察，但为三个 high-importance 模块（呼吸率、核心体温、HRV）提供不可或缺的运动上下文。",
    importance: "low",
    dependsOn: ["L1:imu"],
    feedsInto: ["L3:core-body-temp"],
    tags: ["运动检测", "步频", "姿态"],
    implementations: [
      {
        type: "mainstream",
        name: "LSM6DSO 芯片级活动分类 + RLS 参考信号",
        vendor: "STMicroelectronics",
        description:
          "LSM6DSO 内置 FSM 完成基础活动分类（静止/步行/跑步/骑行），输出运动类型标签 + 三轴原始加速度数据 @ 100 Hz。原始加速度送入 nRF52840 的 RLS 自适应滤波器作为运动伪影参考信号 x(n)。加速度幅值 ‖a‖ = sqrt(a_x² + a_y² + a_z²) 用于区分运动强度等级。",
        pros: [
          "FSM 芯片级活动分类，MCU 零负担",
          "100 Hz 采样率满足运动检测需求",
          "超低功耗（0.55 mA 组合模式）",
        ],
        cons: [
          "FSM 分类粒度有限（仅基础分类）",
          "复杂运动场景（足球、篮球）分类精度下降",
          "仅加速度（无磁力计），无法绝对定向",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
          "ref-respiratory-monitoring-motion-2025",
        ],
      },
      {
        type: "advanced",
        name: "9-axis AHRS 运动全景分析",
        vendor: "STMicroelectronics + Madgwick AHRS",
        description:
          "LSM6DSO 加速度计 + 陀螺仪 + LIS3MDL 磁力计进行 9-axis Madgwick AHRS 传感器融合，输出四元数姿态、绝对航向和重力校正后的线性加速度。可精确计算胸部空间轨迹，用于高级运动分析（游泳划水类型、跑步垂直振幅、举重杠铃路径）。同时为热通量传感器提供精确的体表方向信息（相对于风向的迎风面积）。",
        pros: [
          "9-axis 全景运动分析",
          "精确姿态和航向信息",
          "可输出高级运动指标（垂直振幅、触地时间）",
        ],
        cons: [
          "磁力计易受铁磁环境干扰",
          "BOM 增加（+LIS3MDL ~$1.50）",
          "9-axis 校准复杂（硬铁/软铁校准）",
        ],
        citations: [
          "ref-seshadri-cardiorespiratory-2023",
        ],
      },
    ],
    glossaryTerms: [
      "imu-inertial-measurement-unit",
      "motion-artifact-removal",
      "sensor-fusion",
      "rls-adaptive-filter",
    ],
    references: [
      "ref-seshadri-cardiorespiratory-2023",
      "ref-respiratory-monitoring-motion-2025",
    ],
    principles:
      "加速度数据规格：量程 ±16g，噪声密度 80 µg/√Hz，ODR 100 Hz（可编程 1.6 Hz - 6.66 kHz）。三轴输出 a_x, a_y, a_z (g 或 m/s²)。重力分量分离：高通滤波（截止 0.1 Hz）提取运动加速度，低通滤波提取重力分量（用于倾斜角计算）。运动强度指数 = √(a_x² + a_y² + a_z²) 的 RMS 值 × 时间窗口（如 1 分钟）。RLS 参考 = [a_x(t), a_y(t), a_z(t)] 三通道时间序列同步输入自适应滤波器。",
  },

  // ════════════════════════════════════════════════════════════════
  // L2:lf-hf-ratio — LF/HF 比值
  // ════════════════════════════════════════════════════════════════
  {
    id: "L2:lf-hf-ratio",
    layer: "L2",
    name: "LF/HF 比值 (LF/HF Ratio)",
    summary:
      "HRV 频域分析中低频（0.04-0.15 Hz）与高频（0.15-0.40 Hz）功率之比，传统解释为交感-副交感平衡指标，现代观点认为需与时域指标联合解读。",
    description:
      "LF/HF 比值是心率变异性（HRV）频域分析中的一个经典参数，将 R-R 间期时间序列经 FFT 或 AR 模型转换到频域后，计算低频功率 LF（0.04-0.15 Hz）与高频功率 HF（0.15-0.40 Hz）的比值。传统观点将 LF/HF 解释为「交感-副交感平衡」指标——LF 反映交感+副交感混合活动（以交感为主），HF 几乎完全由副交感（迷走神经）活动驱动（因 HF 频段与呼吸频率 0.15-0.40 Hz 重合，即 9-24 rpm），因此 LF/HF 升高传统上被认为表示交感活性占优 [ref-verdel-core-2021]。\n\n然而，近年来学术界对这一解释的争议显著增加：(1) LF 功率约 50% 来自副交感贡献（有创药理实验证实阿托品注射后 LF 也显著下降），因此 LF/HF 不是纯粹的「SNS/PNS 比值」；(2) 呼吸频率变化直接改变 HF 功率位置和幅度——当呼吸率偏离 0.15-0.40 Hz 范围（如运动中 RR >24 rpm 或深度慢呼吸 <9 rpm），HF 功率的计算失准；(3) LF/HF 的个体间变异系数高达 50-100%，使其不适合做跨个体比较，更适合个体内纵向追踪 [ref-goods-core-2023]。因此，Modern HRV 指南建议 LF/HF 应始终与时域 RMSSD（来自 L2:rmssd）联合解读，而非单独使用。\n\n在 HeartBeat 系统中，L2:hrv 输出的频域功率谱直接提供 LF 和 HF 的积分值。LF/HF 的应用场景包括：长时间运动后 LF/HF 升高（>基线 2 倍持续 >30 分钟）提示交感神经持续激活、恢复延迟；晨间 LF/HF 升高伴随 RMSSD 降低（双指标确认）增加了「当天应减量」决策的置信度。LF/HF 与 L2:rmssd 共同流入 L4:recovery-readiness，但权重低于 RMSSD（~15% vs ~30%）。BioZ 呼吸波形与 ECG 的联合分析可以提供「呼吸校正版 LF/HF」——利用呼吸率精确定位 HF 频段边界，避免呼吸率偏移导致的频域计算偏差。",
    importance: "low",
    dependsOn: ["L2:hrv"],
    feedsInto: ["L4:recovery-readiness"],
    tags: ["交感神经", "频域", "自主平衡"],
    implementations: [
      {
        type: "mainstream",
        name: "FFT 频域 LF/HF 标准计算",
        vendor: "自带 / Kubios HRV 标准",
        description:
          "从 R-R 间期时间序列出发：移除异位搏动 → 4 Hz 均匀重采样（立方样条插值）→ 256 点 FFT（Welch 方法，50% 重叠、Hamming 窗）→ 对 LF（0.04-0.15 Hz）和 HF（0.15-0.40 Hz）频段积分 → LF/HF = LF_power / HF_power。nRF52840 M4F MCU 上可实时运行（ARM CMSIS-DSP 库 FFT 实现）。",
        pros: [
          "标准算法、被广泛使用和引用",
          "CMSIS-DSP 加速 FFT 计算",
          "与 Kubios/HRV 商业软件输出一致",
        ],
        cons: [
          "LF/HF 的生理学解释有争议",
          "呼吸频率偏移时 HF 频段定义失准",
          "个体间差异大，不适合跨用户比较",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-goods-core-2023",
        ],
      },
      {
        type: "advanced",
        name: "呼吸校正 LF/HF + 归一化单位输出",
        vendor: "自研 / 学术界",
        description:
          "利用 BioZ 呼吸波形实时确定当前呼吸频率，动态调整 HF 频段边界（HF 中心频率 = 呼吸频率，HF 带宽 = ±0.1 Hz）。输出 LF 和 HF 的归一化单位（nu: LFnu = LF/(LF+HF) × 100, HFnu = HF/(LF+HF) × 100），消除总功率变化的影响。同时输出「传统 LF/HF」（固定频段）和「呼吸校正 LF/HF」（动态频段）供对比。",
        pros: [
          "呼吸校正消除呼吸率偏移导致的误差",
          "nu 归一化单位不受总功率变化影响",
          "传统版 + 校正版对比提供内部验证",
        ],
        cons: [
          "需要同步高质量 BioZ 呼吸波形",
          "呼吸校正算法的额外计算负担",
          "校正方法尚未成为行业标准",
        ],
        citations: [
          "ref-verdel-core-2021",
          "ref-machado-chest-2025",
        ],
      },
    ],
    glossaryTerms: [
      "lf-hf-ratio",
      "hrv-heart-rate-variability",
      "rmssd",
      "sdnn",
      "respiratory-sinus-arrhythmia",
      "ecg-electrocardiogram",
    ],
    references: [
      "ref-verdel-core-2021",
      "ref-goods-core-2023",
      "ref-machado-chest-2025",
    ],
    principles:
      "LF/HF 计算：R-R 间期 → 4 Hz 重采样 → FFT（Welch 法）→ P(f) 功率谱密度。LF_power = ∫_{0.04}^{0.15} P(f) df，HF_power = ∫_{0.15}^{0.40} P(f) df，LF/HF = LF_power / HF_power。LFnu = LF/(LF+HF) × 100，HFnu = HF/(LF+HF) × 100。静息典型范围 0.5-10。注意：(1) LF 不是纯交感指标（~50% 副交感贡献），(2) HF 在呼吸率 <9 rpm (0.15 Hz) 或 >24 rpm (0.40 Hz) 时漏失，(3) 个体间 CV 50-100%，仅适合个体内纵向追踪。",
  },
];
