import React from 'react';

const RESPIRATION_ROWS = [
  {
    route: 'BioZ（生物电阻抗）',
    accuracy: 'MAE 0.5-2.0 rpm',
    tidalVolume: '5/5 R² 0.91',
    power: '低',
    robustness: '中',
    strapFit: '5/5',
    highlighted: true,
  },
  {
    route: 'EDR（ECG Derived Respiration）',
    accuracy: 'MAE 1.5-4.0 rpm',
    tidalVolume: '2/5（仅相对变化）',
    power: '极低（复用 ECG）',
    robustness: '中',
    strapFit: '5/5',
  },
  {
    route: 'IMU（惯性测量）',
    accuracy: 'MAE 2.0-6.0 rpm',
    tidalVolume: '1/5',
    power: '低-中',
    robustness: '低（运动干扰大）',
    strapFit: '4/5',
  },
  {
    route: '应变传感器',
    accuracy: 'MAE 1.0-3.0 rpm',
    tidalVolume: '4/5',
    power: '极低',
    robustness: '中-高',
    strapFit: '5/5',
  },
  {
    route: 'RIP（呼吸电感体积描记）',
    accuracy: '金标准（临床）',
    tidalVolume: '5/5（临床金标准）',
    power: '高',
    robustness: '高',
    strapFit: '2/5（需双带）',
  },
  {
    route: '声学（气管/鼻气流）',
    accuracy: 'MAE 1.0-3.0 rpm',
    tidalVolume: '2/5',
    power: '中',
    robustness: '低（风噪敏感）',
    strapFit: '2/5（需颈部传感器）',
  },
  {
    route: '电容式应变',
    accuracy: 'MAE 1.5-3.5 rpm',
    tidalVolume: '3/5',
    power: '极低',
    robustness: '中',
    strapFit: '5/5',
  },
];

const CORE_TEMP_CARDS = [
  {
    tech: 'SHF（单通道热通量）',
    accuracy: 'MAE 0.3-0.5°C',
    status: 'commercial' as const,
    product: 'CORE sensor (greenTEG)',
    note: '已商用，骑行/铁三市场验证',
  },
  {
    tech: 'DHF（双通道热通量）',
    accuracy: 'MAE 0.2-0.3°C',
    status: 'research' as const,
    product: 'CALERA Research',
    note: '精度最高，成本/复杂度双高',
  },
  {
    tech: 'ZHF（零热通量）',
    accuracy: 'MAE 0.1-0.2°C',
    status: 'research' as const,
    product: '3M Bair Hugger',
    note: '临床金标准，消费级体积挑战大',
  },
  {
    tech: '可吞咽胶囊',
    accuracy: '金标准（核心体温）',
    status: 'commercial' as const,
    product: 'CorTemp / e-Celsius',
    note: '仅实验室/运动医学场景',
  },
  {
    tech: '耳道式红外',
    accuracy: 'MAE 0.3-0.7°C',
    status: 'commercial' as const,
    product: 'Cosinuss° in-ear',
    note: '佩戴舒适性存疑，移动场景漂移',
  },
  {
    tech: 'HR 模型估算',
    accuracy: 'MAE 1.0-2.0°C',
    status: 'limited' as const,
    product: 'ECG + ML 模型',
    note: '个体差异大，需标定，精度有限',
  },
];

const CHIP_CARDS = [
  {
    name: '首选方案',
    chip: 'MAX30001 + TMP117',
    ecgBioz: 'ECG: 16-bit, BioZ: 17-bit',
    temp: 'TMP117: ±0.1°C (医用级)',
    bom: '$12-15',
    power: '~3.5 mW (双通道)',
    label: '性价比最优',
    labelColor: 'text-green-400 border-green-400/30 bg-green-400/5' as const,
  },
  {
    name: '最高精度',
    chip: 'AFE4960 + TMP117',
    ecgBioz: 'ECG: 24-bit, BioZ: 24-bit',
    temp: 'TMP117: ±0.1°C (医用级)',
    bom: '$15-18',
    power: '~4.5 mW',
    label: '医疗级精度',
    labelColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5' as const,
  },
  {
    name: '最灵活',
    chip: 'AD5940 + MAX30001',
    ecgBioz: 'ECG: 16-bit + 独立阻抗',
    temp: '外置 NTC ±0.2°C',
    bom: '$18-22',
    power: '~5.0 mW (可调)',
    label: '研发灵活度高',
    labelColor: 'text-amber-400 border-amber-400/30 bg-amber-400/5' as const,
  },
];

const STATUS_BADGES: Record<string, string> = {
  commercial: 'bg-green-400/10 text-green-400 border-green-400/20',
  research: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  limited: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
};

const STATUS_LABELS: Record<string, string> = {
  commercial: '已商用',
  research: '研究中',
  limited: '精度有限',
};

const ARCHITECTURE_LAYERS = [
  {
    title: '传感层',
    items: [
      'ECG 电极（干电极）',
      '胸带张力传感器',
      '皮肤温度传感器',
      'TMP117 数字温度',
    ],
  },
  {
    title: 'AFE层',
    items: [
      'MAX30001 ECG/BioZ',
      '16-bit 心电采集',
      '17-bit 阻抗测量',
      'SPI 数字接口',
    ],
  },
  {
    title: '计算层',
    items: [
      'nRF52840 SoC',
      'ARM Cortex-M4F',
      'BLE 5.4 + ANT+',
      '128 KB RAM',
    ],
  },
  {
    title: '传输层',
    items: [
      'BLE GATT 协议',
      'ECG 数据流服务',
      '呼吸率特征服务',
      '温度 + 电池服务',
    ],
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="bg-[#020617] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Chapter label */}
        <p className="text-green-400 text-sm font-semibold mb-3">
          第二章 · 技术全景
        </p>

        {/* H2 heading */}
        <h2 className="font-heading text-[#F8FAFC] text-3xl lg:text-4xl font-bold mb-2">
          呼吸检测 + 核心体温
        </h2>
        <h2 className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300 text-3xl lg:text-4xl font-bold mb-16">
          技术路线
        </h2>

        {/* ── Respiration table ── */}
        <div className="mb-20">
          <h3 className="font-heading text-white text-xl font-semibold mb-6">
            呼吸检测七大技术路线对比
          </h3>

          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#0F172A]">
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    技术路线
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    呼吸率精度（静态）
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    潮气量能力
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    功耗
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    运动鲁棒性
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#F8FAFC]">
                    胸带适配度
                  </th>
                </tr>
              </thead>
              <tbody>
                {RESPIRATION_ROWS.map((row) => (
                  <tr
                    key={row.route}
                    className={`border-b border-white/[0.06] text-xs text-[#94A3B8] ${
                      row.highlighted
                        ? 'bg-green-500/5'
                        : 'even:bg-white/[0.02]'
                    } ${!row.highlighted ? 'odd:bg-transparent' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-[#E2E8F0]">
                      {row.route}
                    </td>
                    <td className="px-4 py-3">{row.accuracy}</td>
                    <td className="px-4 py-3">{row.tidalVolume}</td>
                    <td className="px-4 py-3">{row.power}</td>
                    <td className="px-4 py-3">{row.robustness}</td>
                    <td className="px-4 py-3">{row.strapFit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callout */}
          <div className="mt-4 bg-green-500/5 border border-green-500/20 rounded-xl p-4">
            <p className="text-sm text-green-400">
              <span className="font-semibold">推荐：</span>
              BioZ + EDR 双模融合，胸带场景下 MAE 可降至 0.3-1.0 rpm，同时具备运动伪影鲁棒性
            </p>
          </div>
        </div>

        {/* ── Core temperature cards ── */}
        <div className="mb-20">
          <h3 className="font-heading text-white text-xl font-semibold mb-6">
            核心体温六大技术路线
          </h3>

          <div className="grid lg:grid-cols-3 gap-6">
            {CORE_TEMP_CARDS.map((card) => (
              <div
                key={card.tech}
                className="rounded-xl p-5 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-heading font-semibold text-[#F8FAFC] text-sm">
                    {card.tech}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_BADGES[card.status]}`}
                  >
                    {STATUS_LABELS[card.status]}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>精度</span>
                    <span className="text-[#E2E8F0] font-medium">
                      {card.accuracy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>代表产品</span>
                    <span className="text-[#E2E8F0] font-medium">
                      {card.product}
                    </span>
                  </div>
                  <p className="pt-2 text-xs text-[#64748B] border-t border-white/[0.04] mt-2">
                    {card.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chip solutions ── */}
        <div className="mb-20">
          <h3 className="font-heading text-white text-xl font-semibold mb-6">
            芯片方案对比与推荐架构
          </h3>

          <div className="grid lg:grid-cols-3 gap-6">
            {CHIP_CARDS.map((card) => (
              <div
                key={card.chip}
                className="rounded-xl p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-semibold text-[#F8FAFC] text-sm">
                    {card.name}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.labelColor}`}
                  >
                    {card.label}
                  </span>
                </div>

                <p className="text-xs text-green-400 font-mono mb-4">
                  {card.chip}
                </p>

                <div className="space-y-2 text-xs text-[#94A3B8] flex-1">
                  <div className="flex justify-between">
                    <span>ECG/BioZ</span>
                    <span className="text-[#E2E8F0]">{card.ecgBioz}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>温度</span>
                    <span className="text-[#E2E8F0]">{card.temp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BOM 成本</span>
                    <span className="text-[#E2E8F0]">{card.bom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>功耗</span>
                    <span className="text-[#E2E8F0]">{card.power}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Architecture diagram ── */}
        <div className="rounded-xl p-8 lg:p-12 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <h4 className="font-heading text-white text-lg font-bold mb-8">
            推荐系统架构：
            <span className="text-green-400">MAX30001 + TMP117 + nRF52840</span>
          </h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARCHITECTURE_LAYERS.map((layer) => (
              <div
                key={layer.title}
                className="bg-[#0F172A] rounded-xl p-5 border border-white/[0.04]"
              >
                <h5 className="font-heading font-bold text-green-400 text-sm mb-4">
                  {layer.title}
                </h5>
                <ul className="space-y-2.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-[#94A3B8] flex items-start gap-2"
                    >
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-400/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
