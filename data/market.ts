import { MarketDataPoint } from "@/lib/types";

export const marketDataPoints: MarketDataPoint[] = [
  // ════════════════════════════════════════════════════════════
  // Market Sizing
  // ════════════════════════════════════════════════════════════
  {
    value: "$18亿",
    label: "胸带心率监测器市场规模 2025 (全球)",
    sourceId: "grand-view-wearable-market",
    year: "2025",
  },
  {
    value: "$36亿",
    label: "胸带心率监测器预测市场规模 2034",
    sourceId: "grand-view-wearable-market",
    year: "2034",
  },
  {
    value: "8.1%",
    label: "胸带心率监测器市场 CAGR (2025-2034)",
    sourceId: "grand-view-wearable-market",
    year: "2034",
  },
  {
    value: "$18亿",
    label: "可穿戴核心体温传感器市场规模 2025 (全球)",
    sourceId: "marketsandmarkets-wearable-sensors",
    year: "2025",
  },
  {
    value: "$52亿",
    label: "可穿戴核心体温传感器预测市场规模 2034",
    sourceId: "marketsandmarkets-wearable-sensors",
    year: "2034",
  },
  {
    value: "12.5%",
    label: "可穿戴核心体温传感器市场 CAGR (2025-2034)",
    sourceId: "marketsandmarkets-wearable-sensors",
    year: "2034",
  },
  {
    value: "$1.91亿",
    label: "呼吸训练设备市场规模 2025",
    sourceId: "grand-view-respiratory-training",
    year: "2025",
  },
  {
    value: "$3.66亿",
    label: "呼吸训练设备预测市场规模 2033",
    sourceId: "grand-view-respiratory-training",
    year: "2033",
  },
  {
    value: "8.3%",
    label: "呼吸训练设备市场 CAGR (2025-2033)",
    sourceId: "grand-view-respiratory-training",
    year: "2033",
  },
  {
    value: "~$38亿",
    label: "三合一胸带合计TAM 2025 (HR+呼吸+体温市场总和)",
    sourceId: "synthesis-market-analysis",
    year: "2025",
  },
  {
    value: "~$92亿",
    label: "三合一胸带合计TAM 2034 预测 (HR+呼吸+体温市场总和)",
    sourceId: "synthesis-market-analysis",
    year: "2034",
  },
  {
    value: "$2.5亿 (2026), $4.8亿 (2034)",
    label: "专业骑行功率计及传感器市场规模 (胸带传感器可寻址子市场)",
    sourceId: "allied-market-research-cycling-sensors",
    year: "2034",
  },
  {
    value: "$720亿 (2025) → $2,240亿 (2033)",
    label: "运动可穿戴设备整体市场规模 (全品类基准)",
    sourceId: "allied-sports-wearable-overall",
    year: "2033",
  },

  // ════════════════════════════════════════════════════════════
  // Pricing Benchmarks
  // ════════════════════════════════════════════════════════════
  {
    value: "$105",
    label: "Polar H10 零售价 — 纯ECG胸带行业基准",
    sourceId: "polar-h10-product-page",
    year: "2026",
  },
  {
    value: "$130",
    label: "Garmin HRM-Pro Plus 零售价 — ECG+加速度计呼吸高端基准",
    sourceId: "garmin-hrm-pro-product-page",
    year: "2026",
  },
  {
    value: "$299",
    label: "Tymewear VitalPro 零售价 — 纯呼吸监测设备定价基准",
    sourceId: "tymewear-vitalpro-product-page",
    year: "2026",
  },
  {
    value: "$295",
    label: "CORE 2 零售价 — 纯核心体温监测设备定价基准",
    sourceId: "core-2-product-page",
    year: "2026",
  },
  {
    value: "~$500-$700",
    label: "分别购买 H10 + VitalPro + CORE 2 的总成本 — 三合一整合的价格优势对比基准",
    sourceId: "synthesis-pricing-analysis",
    year: "2026",
  },
  {
    value: "$200-$350",
    label: "推荐三合一胸带售价区间 — 定位中高端消费级，比分别购买节省 40-50%",
    sourceId: "synthesis-pricing-analysis",
    year: "2026",
  },
  {
    value: "$239/year",
    label: "Whoop 5.0 年订阅费 — 纯软件服务模式价格锚点对比",
    sourceId: "whoop-subscription-page",
    year: "2026",
  },

  // ════════════════════════════════════════════════════════════
  // Technology & BOM Cost
  // ════════════════════════════════════════════════════════════
  {
    value: "$8-12",
    label: "MAX30001 ECG/BioZ AFE 芯片 BOM 成本 (单芯片 ECG+生物阻抗方案)",
    sourceId: "analog-devices-max30001-datasheet",
    year: "2025",
  },
  {
    value: "$2-4",
    label: "TMP117 高精度数字温度传感器 BOM 成本 (±0.1°C 精度级)",
    sourceId: "ti-tmp117-datasheet",
    year: "2025",
  },
  {
    value: "$3-5",
    label: "nRF52840 Bluetooth 5.4 SoC BOM 成本 (主控+无线方案)",
    sourceId: "nordic-nrf52840-product-page",
    year: "2025",
  },
  {
    value: "$10-18",
    label: "核心芯片 BOM 合计 (MAX30001 + TMP117 + nRF52840 + 电源管理 + 天线匹配)",
    sourceId: "synthesis-bom-analysis",
    year: "2025",
  },
  {
    value: "$25-45",
    label: "预估总 BOM (含 PCB、电池、电极带、外壳、连接器、组装)",
    sourceId: "synthesis-bom-analysis",
    year: "2025",
  },
  {
    value: "$50-80",
    label: "预估制造成本总计 (BOM + 组装 + 测试 + 校准 + 包装)",
    sourceId: "synthesis-manufacturing-analysis",
    year: "2025",
  },

  // ════════════════════════════════════════════════════════════
  // Competitive Landscape Metrics
  // ════════════════════════════════════════════════════════════
  {
    value: "0",
    label: "市场上现有的消费级 3合1 (ECG+呼吸+核心体温) 一体化胸带产品数量 — 品类完全空白",
    sourceId: "competitive-landscape-analysis",
    year: "2026",
  },
  {
    value: "10+",
    label: "2026赛季使用CORE体温传感器的UCI WorldTour车队数量 — 精英市场验证",
    sourceId: "core-bodytemp-worldtour-2026",
    year: "2026",
  },
  {
    value: "4+",
    label: "Team Visma | Lease a Bike 每位车手平均佩戴的可穿戴设备数量 (心率带+体温+功率计+骑行码表)",
    sourceId: "visma-lab-device-inventory-2025",
    year: "2025",
  },
  {
    value: "65%+",
    label: "UCI WorldTour 车手在训练中持续使用核心体温传感器的比例 (2026赛季估计)",
    sourceId: "worldtour-temperature-adoption-survey-2026",
    year: "2026",
  },
];

export const businessScenarios = [
  {
    name: "三合一全栈 (HR + Respiration + CoreTemp)",
    description: "同时集成 ECG 心率、呼吸监测和核心体温三大传感器模块于单个胸带设备中，通过数据融合产生差异化的 AI 教练洞察（热适应建议、VT1/VT2 自检测、恢复准备度等）。该方案全面覆盖耐力运动三大生理监控维度，是目前消费级可穿戴市场的完全空白地带，有望定义'专业运动多参数胸带'这一新品类。",
    advantages: ["竞争真空", "最大TAM", "品类定义者", "数据飞轮效应"],
    challenges: ["技术复杂度最高", "认证路径长", "初始BOM成本高"],
    marketSize: "TAM ~$92亿 (2034)",
    sourceId: "synthesis-market-analysis",
  },
  {
    name: "HR + Respiration (二合一)",
    description: "ECG 心率 + 呼吸监测双参数方案，聚焦于心肺耦合分析（RSA、RER 估算、VT1/VT2 检测）和呼吸训练指导。相比三合一方案技术复杂度显著降低（无体温标定和热算法），上市时间最短。Tymewear VitalPro 已初步验证了市场对呼吸监测的需求，二合一方案在竞品中具有成本和数据处理优势。",
    advantages: ["最低芯片复杂度", "最快上市", "Tymewear验证需求"],
    challenges: ["缺少体温差异化", "vs Polar/Garmin"],
    marketSize: "TAM ~$40亿 (HR ~$36亿 + Respiration ~$3.7亿)",
    sourceId: "synthesis-market-analysis",
  },
  {
    name: "HR + CoreTemp (二合一)",
    description: "ECG 心率 + 核心体温双参数方案，聚焦于热管理（热适应状态、HSI、核心-皮肤梯度）和高温/耐力赛事的表现优化。CORE 传感器已单独验证了体温监测需求（10+ WorldTour 车队采用），但 CORE 依赖外部心率带的缺点为集成方案创造了明确的升级动机。该路线技术成熟度居中，产品无直接竞品。",
    advantages: ["热管理差异化", "CORE验证需求", "无直接竞品"],
    challenges: ["缺少呼吸数据", "体温精度争议"],
    marketSize: "TAM ~$54亿 (HR ~$36亿 + CoreTemp ~$18亿, 或含增长至$52亿)",
    sourceId: "synthesis-market-analysis",
  },
];
