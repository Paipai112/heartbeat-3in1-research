import React from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { GlossaryLink } from '@/components/GlossaryLink';
import { SourceTooltip } from '@/components/SourceTooltip';

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function MetricBadge({
  label,
  value,
  unit,
  note,
}: {
  label: string;
  value: string;
  unit?: string;
  note?: string;
}) {
  return (
    <div className="glass-card p-5 text-center">
      <div className="text-2xl font-bold text-green-400">
        {value}
        {unit && (
          <span className="text-base text-[#94A3B8]">{unit}</span>
        )}
      </div>
      <div className="text-sm text-[#94A3B8] mt-1">{label}</div>
      {note && <div className="text-xs text-[#64748B] mt-1">{note}</div>}
    </div>
  );
}

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={'glass-card-elevated ' + className}>{children}</div>;
}

function InfoCard({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={'glass-card p-6 ' + className}>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="text-base text-[#94A3B8] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function TechMethodCard({
  name,
  icon,
  principle,
  metrics,
  accuracy,
  maturity,
  chestStrap,
  pros,
  cons,
}: {
  name: string;
  icon: React.ReactNode;
  principle: string;
  metrics: string;
  accuracy: string;
  maturity: string;
  chestStrap: string;
  pros: string;
  cons: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      <div className="space-y-2 text-base text-[#94A3B8]">
        <p>
          <span className="text-green-400 font-medium">原理：</span>
          {principle}
        </p>
        <p>
          <span className="text-green-400 font-medium">可测指标：</span>
          {metrics}
        </p>
        <p>
          <span className="text-green-400 font-medium">精度等级：</span>
          {accuracy}
        </p>
        <p>
          <span className="text-green-400 font-medium">成熟度：</span>
          {maturity}
        </p>
        <p>
          <span className="text-green-400 font-medium">胸带集成可行性：</span>
          {chestStrap}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-1 text-base">
        <p className="text-green-400/80">&#x2713; {pros}</p>
        <p className="text-red-400/80">&#x2717; {cons}</p>
      </div>
    </GlassCard>
  );
}

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-xs text-green-400 font-mono mb-2">{number}</p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-[#94A3B8]">{subtitle}</p>
      )}
    </div>
  );
}

function AnalysisCard({
  severity,
  title,
  mitigation,
}: {
  severity: string;
  title: string;
  mitigation: string;
}) {
  const colorMap: Record<string, string> = {
    High: 'text-red-400 bg-red-500/10 border-red-500/20',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4 text-base text-white">{title}</td>
      <td className="py-3 px-4 text-center">
        <span
          className={
            'text-xs px-2 py-0.5 rounded-full border ' +
            (colorMap[severity] || '')
          }
        >
          {severity}
        </span>
      </td>
      <td className="py-3 px-4 text-base text-[#94A3B8]">{mitigation}</td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG Icon Components
// ---------------------------------------------------------------------------

function IconISE() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

function IconMicrofluidic() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M12 10v8" />
      <path d="M12 14l-2-2" />
      <path d="M12 14l2-2" />
    </svg>
  );
}

function IconAmperometric() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
    </svg>
  );
}

function IconImpedance() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14z" />
    </svg>
  );
}

function IconPaperBased() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function IconMicroneedle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="10" />
      <line x1="12" y1="10" x2="20" y2="12" />
      <line x1="12" y1="10" x2="4" y2="12" />
      <circle cx="12" cy="18" r="4" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block -mt-0.5 mr-1"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PRODUCTS = [
  {
    name: 'FLOWBIO S1',
    company: 'FLOWBIO (UK)',
    technology: 'ISE (Na+)',
    metrics: 'Na+, sweat rate, skin temp',
    formFactor: 'Chest clip-on',
    price: '$299 / £249',
    battery: '20h rechargeable',
    cert: 'Research-grade',
  },
  {
    name: 'Nix Hydration Biosensor',
    company: 'Nix Inc. (US)',
    technology: 'ISE array + microfluidic',
    metrics: 'Na+, K+, sweat rate, fluid loss, electrolyte loss',
    formFactor: 'Forearm patch + pod',
    price: '$129 + $25/4 patches',
    battery: 'Reusable pod',
    cert: 'Consumer',
  },
  {
    name: 'Gatorade Gx Sweat Patch',
    company: 'Garmin / Gatorade',
    technology: 'Colorimetric lateral flow',
    metrics: 'Na+ (semi-quant), sweat rate',
    formFactor: 'Single-use forearm patch',
    price: '$25 / 2-pack',
    battery: 'Single-use',
    cert: 'Consumer wellness',
  },
  {
    name: 'Epicore Discovery Patch',
    company: 'Epicore Biosystems (US/MIT)',
    technology: 'Microfluidic multi-chamber',
    metrics: 'Na+, K+, Cl-, glucose, lactate, cortisol, pH',
    formFactor: 'Body adhesive patch',
    price: 'Enterprise ($50-200/patch)',
    battery: 'Single-use',
    cert: 'Research / Industrial',
  },
  {
    name: 'hDrop Gen 2',
    company: 'hDrop Technologies',
    technology: 'Impedance',
    metrics: 'Hydration status, sweat rate',
    formFactor: 'Forearm wearable band',
    price: '$150',
    battery: '30h',
    cert: 'Consumer',
  },
  {
    name: 'Kenzen Patch',
    company: 'Kenzen (US)',
    technology: 'ISE + temperature',
    metrics: 'Na+, K+, skin temp, activity',
    formFactor: 'Chest patch',
    price: 'Enterprise',
    battery: '24h patch',
    cert: 'Industrial safety',
  },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function SweatAnalysisPage() {
  return (
    <div className="page-enter">
      {/* ================================================================= */}
      {/* Hero Section */}
      {/* ================================================================= */}
      <PageHero
        title="汗液分析"
        titleGradient="从生物标记物到可穿戴实验室"
        subtitle="可穿戴汗液生化传感技术：原理、产品、集成路径与前沿突破"
        badge={{ text: 'Deep Dive · Sweat Analysis', color: 'green' }}
        description="汗液是人体唯一可非侵入式获取的、含有丰富生化信息的体液。本页系统梳理六大汗液传感技术路线、五款商用产品的深度对比、汗液分析在胸带上的集成可行性，以及心率+呼吸+体温+汗液四合一融合的AI教练潜力。"
      />

      {/* ================================================================= */}
      {/* Section 01: 汗液分析概述 */}
      {/* ================================================================= */}
      <section className="bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: '技术全景', href: '/technology' },
              { label: '汗液分析' },
            ]}
          />

          <SectionHeading
            number="01"
            title="汗液分析概述"
            subtitle="为什么汗液是运动生物化学监测的「圣杯」"
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="text-base text-[#94A3B8] leading-relaxed space-y-4">
              <p>
                汗液是人体唯一可通过非侵入方式持续获取、且含有丰富生化信息的体液。与血液不同，汗液的收集不需要刺破皮肤；与唾液或尿液不同，汗液可以在运动过程中连续产生，天然适合可穿戴设备的实时监测场景。汗液中包含{' '}
                <GlossaryLink slug="electrolyte">电解质</GlossaryLink>（Na+、K+、Cl-）、代谢物（
                <GlossaryLink slug="lactate">乳酸</GlossaryLink>、葡萄糖、氨）、激素（皮质醇）、以及微量元素，堪称一个流动的体外化学实验室。
              </p>
              <p>
                在耐力运动场景下，职业自行车运动员每小时流失 1-2L 汗液，其中钠离子的流失量可达{' '}
                <SourceTooltip sourceId="cyclingnews-sweat-breathing">
                  500-2000 mg/h
                </SourceTooltip>
                。这些电解质的快速流失如果不能及时补充，将直接导致肌肉痉挛、运动表现下降，甚至诱发低钠血症（hyponatremia）这一危及生命的电解质紊乱。汗液成分的实时监测——而非事后补测——是精准运动营养的最后一公里。
              </p>
              <p>
                过去十年，汗液分析经历了从实验室到可穿戴的范式转移。传统方法依赖汗液贴片收集+实验室高效液相色谱/质谱分析（HPLC/MS），周期以周为单位。2020年代以来，基于{' '}
                <GlossaryLink slug="ion-selective-electrode">
                  离子选择性电极
                </GlossaryLink>{' '}
                （ISE）、微流控比色法（microfluidic colorimetry）和电化学酶电极（enzymatic amperometry）
                的可穿戴汗液传感器进入商业化阶段，使汗液成分的实时、原位、连续监测成为可能。
              </p>
            </div>

            <div className="text-base text-[#94A3B8] leading-relaxed space-y-4">
              <p>
                汗液中的关键生物标记物包括：
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <span className="text-white font-medium">Na+ (钠离子)</span>
                  ：10-90 mmol/L，最主要的电解质，直接反映体内钠平衡。高浓度提示脱水趋势。
                </li>
                <li>
                  <span className="text-white font-medium">K+ (钾离子)</span>
                  ：2-10 mmol/L，细胞内主要阳离子，与肌肉收缩和神经传导密切相关。
                </li>
                <li>
                  <span className="text-white font-medium">Cl- (氯离子)</span>
                  ：10-70 mmol/L，与Na+共同维持渗透压。氯离子 &gt;60 mmol/L 是囊性纤维化（cystic fibrosis）的诊断标准之一。
                </li>
                <li>
                  <span className="text-white font-medium">乳酸 (Lactate)</span>
                  ：5-25 mmol/L，无氧代谢的标志物，可替代血乳酸监测训练强度。
                </li>
                <li>
                  <span className="text-white font-medium">葡萄糖 (Glucose)</span>
                  ：0.01-0.5 mmol/L，与血糖存在弱相关（r=0.7-0.8），可作为代谢监测的补充指标。
                </li>
                <li>
                  <span className="text-white font-medium">氨 (Ammonia)</span>
                  ：蛋白质分解代谢的指标，高水平提示能量供应转向氨基酸代谢。
                </li>
                <li>
                  <span className="text-white font-medium">皮质醇 (Cortisol)</span>
                  ：压力与恢复激素，结合HRV可构建完整的压力-恢复画像。
                </li>
              </ul>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-3 gap-5">
            <MetricBadge
              label="运动出汗率"
              value="1-2"
              unit=" L/h"
              note="职业自行车手中等强度"
            />
            <MetricBadge
              label="钠流失量"
              value="500-2000"
              unit=" mg/h"
              note="个体差异 3-5×"
            />
            <MetricBadge
              label="可测电解质"
              value="6+"
              unit=" 类型"
              note="Na+, K+, Cl-, Ca²⁺, NH₄⁺, pH"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 02: 商用产品与竞争格局 */}
      {/* ================================================================= */}
      <section className="bg-[#0A1120] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="02"
            title="商用产品与竞争格局"
            subtitle="从实验室到消费级——可穿戴汗液传感器市场扫描"
          />

          {/* Products Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full min-w-[800px] text-base">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    产品
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    公司
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    技术
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    指标
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    形态
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    价格
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    续航
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    认证
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {PRODUCTS.map((p, idx) => (
                  <tr
                    key={p.name}
                    className={
                      idx === 0
                        ? 'bg-green-500/5 border border-green-500/10'
                        : 'hover:bg-white/[0.02] transition-colors'
                    }
                  >
                    <td className="py-3 px-3">
                      <span
                        className={
                          idx === 0
                            ? 'text-green-400 font-semibold'
                            : 'text-white'
                        }
                      >
                        {p.name}
                        {idx === 0 && ' ⭐'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.company}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.technology}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.metrics}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.formFactor}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.price}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.battery}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{p.cert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Individual Product Deep Dives */}
          <div className="grid lg:grid-cols-2 gap-6">
            <InfoCard title="FLOWBIO S1 — 唯一胸带形态汗液传感器">
              <p>
                <SourceTooltip sourceId="cyclingnews-sweat-breathing">
                  FLOWBIO S1
                </SourceTooltip>{' '}
                是目前全球唯一一款专为胸带形态设计的汗液传感器。它通过一个 3D 打印夹扣（clip）直接固定到 Garmin HRM-Pro 或 Polar H10 等现有胸带上，无需额外绑带。核心技术为固体接触式离子选择性电极（solid-contact ISE），采用亲水性微流控引流垫将汗液从皮肤导入含有Na+离子载体膜的微传感器腔室。
              </p>
              <p>
                FLOWBIO 已被{' '}
                <SourceTooltip sourceId="velo-visma-tymewear">
                  多支世巡赛车队
                </SourceTooltip>{' '}
                采用，Wout van Aert、Jonas Vingegaard、Pauline Ferrand-Prevot 均在训练和比赛中使用。FLOWBIO 的 BLE 数据可同步至 Garmin 码表和 Wahoo 生态，提供实时钠离子浓度、出汗率和皮肤温度三项核心指标。售价 $299/£249，定位研究级精度但消费级价格，是胸带集成的概念验证案例。
              </p>
            </InfoCard>

            <InfoCard title="Nix Hydration Biosensor — 消费级汗液电解质监测标杆">
              <p>
                Nix Biosensor 采用前臂贴片 + 可拆卸传感器的分体式设计：一次性微流控贴片通过毛细作用引导汗液进入 ISE 阵列，可重用传感器荚（sensor pod）内含电位计读取电路和 BLE 通信模块。单盒 4 个贴片售价 $25，传感器荚 $129，是目前消费级市场最具性价比的汗液电解质方案。
              </p>
              <p>
                Nix 的独特之处在于其软件层——Nix 应用将汗液数据转化为「汗液档案」（Sweat Profile），包括出汗率、钠浓度、钾浓度、体液流失量估计和电解质流失总量。传感器荚可在每次使用后通过 USB 充电、消毒后复用。Nix 目前已获得多家 NBA、MLS 和 NCAA 运动队的采用，但其前臂佩戴形态限制了与心率胸带的同时使用。
              </p>
            </InfoCard>

            <InfoCard title="Epicore Discovery Patch — 最全面的汗液生化面板">
              <p>
                <SourceTooltip sourceId="cyclingnews-sweat-breathing">
                  Epicore Biosystems
                </SourceTooltip>{' '}
                是从 MIT 的 John Rogers 实验室（柔性电子先驱）spin-out 的公司。其 Discovery Patch 采用多层微流控通道设计，单个贴片可同时测量 Na+、K+、Cl-、葡萄糖、乳酸、皮质醇和 pH 共 7 种生物标记物。微流控通道通过精确的几何设计控制汗液流向不同反应腔室，每个腔室预装特定的比色染料或酶试剂。
              </p>
              <p>
                Discovery Patch 的目标市场是工业安全（高温作业工人热应激监测）和运动员科研，而非消费级零售。其单贴片成本较高（$50-200），数据读取需要配合 Epicore 的专用光学读取器或智能手机相机。尽管全面性无出其右，但单次使用+外部读取的限制使其不适合作为实时训练辅助的日常工具。
              </p>
            </InfoCard>

            <InfoCard title="Gatorade Gx Sweat Patch — 入门级汗液分析大众化尝试">
              <p>
                Gatorade 与 Garmin 合作推出的 Gx Sweat Patch 是最早进入大众消费市场的汗液分析产品。它采用侧流层析（lateral flow）比色法：汗液通过毛细作用沿纸基试纸条迁移，遇特定染料显色，橙色强度与钠离子浓度成正比。用户使用 Gx 移动应用扫描贴片，应用通过图像处理算法将 RGB 值转换为半定量钠浓度。
              </p>
              <p>
                Gx 贴片定价 $25/2个，属于一次性消费品。它能提供出汗率和钠浓度的半定量估计（精度约 ±20-30%），足以支持基本的补水指导，但不适合需要精确数据的竞技训练。Garmin 将其整合进 Garmin Connect 生态，可为用户生成训练后补水建议。然而，Gx 贴片与核心 Garmin 可穿戴生态（手表、码表、心率胸带）之间缺乏实时数据联通，这使其停留在「训练后分析」而非「训练中实时指导」的层级。
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 03: 核心技术路线分析 */}
      {/* ================================================================= */}
      <section className="bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="03"
            title="核心技术路线分析"
            subtitle="六大汗液传感技术原理、成熟度、精度与胸带适配性对比"
          />

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <TechMethodCard
              name="离子选择性电极 (ISE)"
              icon={<IconISE />}
              principle="基于 Nernst 方程 E = E₀ + (RT/zF)ln[a] 的电位法（potentiometry）测量。离子载体掺杂聚合物膜（ionophore-doped polymer membrane）提供对特定离子的选择性响应，产生的电位差与目标离子活度的对数成正比。固体接触式ISE（solid-contact ISE）省去了传统液体填充的内参比电极，大幅缩小尺寸。"
              metrics="Na+, K+, Cl-, Ca²⁺, NH₄⁺, pH（使用不同离子载体）"
              accuracy="Na+/K+ 误差 ±2-5%（校准后），无校准漂移 ~1-2 mV/h"
              maturity="★★★★★ 最成熟——临床血气分析仪已使用数十年"
              chestStrap="★★★★ 高——FLOWBIO 已证明胸带 ISE 可行；需引流材料+汗液储库设计"
              pros="最成熟，单离子通道成本低（$1-3），可重复使用（需维护）"
              cons="需定期校准，离子载体膜寿命1-6个月，存在交叉选择性干扰"
            />

            <TechMethodCard
              name="微流控比色法 (Microfluidic Colorimetric)"
              icon={<IconMicrofluidic />}
              principle="毛细作用驱动汗液进入微通道（microchannel），预装试剂染料与目标分析物反应产生颜色变化，颜色强度与浓度成正比（Lambert-Beer 定律）。多通道设计可在单贴片上同时测量多种分析物。"
              metrics="Na+, Cl-, 葡萄糖, 乳酸, pH, 皮质醇（多腔室设计）"
              accuracy="半定量，Na+ 视觉分辨率约 5-10 mmol/L"
              maturity="★★★★ 已商业化（Gatorade、Epicore），外场验证充分"
              chestStrap="★★ 低——微流控通道依赖重力驱动流动，胸部方向次优；读数器（光学/手机）体积大"
              pros="无需电子元件，支持多分析物，一次性使用卫生，制造成本极低"
              cons="仅单次使用，5-15分钟滞后，半定量精度，需要外部读数器"
            />

            <TechMethodCard
              name="电化学安培法 (Amperometric / Enzymatic)"
              icon={<IconAmperometric />}
              principle="氧化还原酶（葡萄糖氧化酶、乳酸氧化酶等）固定在工作电极表面催化目标分析物的氧化反应；在固定电位下测量产生的电流，电流大小与浓度成正比。需使用选择性渗透膜（如Nafion）排除抗坏血酸、尿酸等干扰物。"
              metrics="葡萄糖, 乳酸, 尿酸, 乙醇"
              accuracy="葡萄糖误差 ±5-10%，抗坏血酸/尿酸干扰需膜层抑制"
              maturity="★★★★ 成熟——血糖试纸条是全球最大的生物传感器市场"
              chestStrap="★★★ 中等——酶电极需定期更换，比ISE更复杂"
              pros="可直接检测代谢物（不仅是离子），电化学理论成熟，可重复使用"
              cons="酶稳定性有限（数天至数周），依赖氧气，需要干扰抑制膜"
            />

            <TechMethodCard
              name="阻抗/电导法 (Impedance / Conductivity)"
              icon={<IconImpedance />}
              principle="双电极交流阻抗测量法——通过一对电极施加 AC 信号，测量汗液的总体电导率。总电导率 ∝ Σ（各离子浓度 × 摩尔电导率）。可通过出汗率变化追踪离子浓度的稀释/浓缩趋势（dilution tracking），但不能区分具体离子种类。"
              metrics="总电解质浓度、出汗率估计（稀释追踪）、水合指数"
              accuracy="总电解质误差 ±10-15%，无离子选择性——无法区分Na+和K+"
              maturity="★★★ 简单可靠，hDrop 已商用，多家研究机构有原型"
              chestStrap="★★★★★ 最高——ECG/BioZ 电极理论上可直接测量汗液电导率，最简单集成。仅需两个小电极接触汗液。"
              pros="最简单电路（双电极+AC源+ADC），无需膜，无需校准（趋势），极其坚固"
              cons="完全无离子选择性，严重受出汗率变化影响，仅提供「总量」信息"
            />

            <TechMethodCard
              name="比色贴片/纸基 (Paper-based Colorimetric)"
              icon={<IconPaperBased />}
              principle="Whatman滤纸或硝酸纤维素膜浸渍比色染料；汗液润湿纸基→染料反应→颜色强度与浓度成正比→智能手机摄像头读取RGB值。本质上是最简单的「湿化学」分析平台。"
              metrics="Na+, Cl-, pH, 葡萄糖, 乳酸（单分析物或多分析物阵列）"
              accuracy="半定量，外场条件下 Na+ 误差 ±20-30%，受光照影响大"
              maturity="★★★ 学术原型丰富 + 部分商业化（Gatorade贴片即工程化版本）"
              chestStrap="★ 低——纸片需取下拍照读取，非实时；胸部汗液收集不均匀"
              pros="超低成本（<$0.10/片），无需任何电子元件，可生物降解"
              cons="非实时，主观读数，光照/角度影响精度，单次使用"
            />

            <TechMethodCard
              name="微针阵列 (Microneedle Array)"
              icon={<IconMicroneedle />}
              principle="微米级实心或空心针（50-900 μm）无痛穿透角质层直达组织间液（ISF）；ISF组成与血浆高度相似但不含血细胞。传感器直接接触ISF进行电化学检测。克服了「需要出汗才能测量」的根本限制。"
              metrics="葡萄糖, 乳酸, Na+, K+, 皮质醇, 药物代谢物——理论上所有血液指标"
              accuracy="葡萄糖 vs 血液误差 ±10-15%（早期阶段），随传感器优化改善中"
              maturity="★★ 研究阶段；首批产品预计 2024-2025 年面市（血糖为主）"
              chestStrap="★★★ 远期潜力——柔性基板上的微针阵列可编织进胸带面料接触皮肤"
              pros="直接ISF通路（与血液相关），无需出汗，连续监测，生物标记物范围极广"
              cons="早期阶段，生物相容性待验证，皮肤刺激风险，监管路径长，制造复杂"
            />
          </div>

          {/* Technology Comparison Ranking */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              六大技术多维对比排名
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-base">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      评估维度
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      精度最佳
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      成本最低
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      最成熟
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      胸带最易
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      多分析物
                    </th>
                    <th className="text-center py-3 px-3 text-sm text-[#94A3B8] font-normal">
                      监管最简
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-white font-medium">第一名</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">ISE / 安培法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">纸基比色</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">ISE</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">阻抗法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">微流控比色</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">阻抗法</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-white font-medium">第二名</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">微流控比色</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">微流控比色</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">安培法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">ISE</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">ISE</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">纸基比色</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-white font-medium">第三名</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">微针阵列</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">阻抗法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">微流控比色</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">安培法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">安培法</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">ISE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 04: 汗液分析 × 胸带的集成可行性 */}
      {/* ================================================================= */}
      <section className="bg-[#0A1120] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="04"
            title="汗液分析 × 胸带的集成可行性"
            subtitle="从概念验证到量产化——四种集成架构与六大工程挑战"
          />

          {/* FLOWBIO Proof */}
          <GlassCard className="p-8 mb-10 border-green-500/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <IconCheck />
              </div>
              <div className="space-y-3 text-base text-[#94A3B8] leading-relaxed">
                <h3 className="text-xl font-semibold text-white">
                  FLOWBIO 已经证明：胸带汗液传感是可行的
                </h3>
                <p>
                  <SourceTooltip sourceId="cyclingnews-sweat-breathing">
                    FLOWBIO S1
                  </SourceTooltip>{' '}
                  通过一个精妙的 3D 打印夹扣直接固定到现有的 Garmin HRM-Pro 或 Polar H10
                  胸带上。其核心技术在于一个亲水性引流垫（hydrophilic wicking pad）——它从皮肤表面吸收汗液，通过微流控通道导入固体接触式 ISE
                  传感器腔室。整个模块重量约 30g，自带独立 BLE 通信。
                </p>
                <p>
                  在实际使用中，包括{' '}
                  <SourceTooltip sourceId="velo-visma-tymewear">
                    Wout van Aert、Jonas Vingegaard、Pauline Ferrand-Prevot
                  </SourceTooltip>{' '}
                  在内的职业车手在环法、古典赛等最高强度比赛中使用此配置。这表明汗液传感不仅可以在胸带上工作，而且可以在最恶劣的动态条件下工作。FLOWBIO 的存在证明了两件事：(1)
                  胸部是汗液收集的有效位置；(2) 汗液传感器与心率胸带可以在物理上共存。
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Four Integration Architectures */}
          <h3 className="text-xl font-semibold text-white mb-6">
            四种集成架构（由简到难）
          </h3>

          <div className="space-y-6 mb-10">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  方案一
                </span>
                <h4 className="text-lg font-semibold text-white">夹扣式模块（Clip-on Module）</h4>
              </div>
              <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
                <p>
                  独立模块拥有自己的 PCB、电池和 BLE 通信，通过夹扣固定到现有胸带。这是 FLOWBIO 当前采用的方法，也是投入市场最快的路径。
                </p>
                <p>
                  <span className="text-green-400/80">✓ 优势：</span>
                  最快上市（12-18个月），兼容任何现有胸带，ECG/BioZ PCB 与 ISE 传感器 PCB 物理隔离，避免串扰问题。
                </p>
                <p>
                  <span className="text-red-400/80">✗ 劣势：</span>
                  增加体积（FLOWBIO 约30g），需单独充电，未真正集成。
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  方案二
                </span>
                <h4 className="text-lg font-semibold text-white">胸带嵌入式传感器阵列</h4>
              </div>
              <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
                <p>
                  ISE 或电导率电极直接嵌入胸带织物/电极区域。汗液引流织物通道（sweat-wicking textile channels）
                  将汗液引导至传感器测量区。ECG+BioZ+汗液共享同一 MCU 和 BLE 模块。
                </p>
                <p>
                  <span className="text-green-400/80">✓ 优势：</span>
                  真正一体化，更轻（可&lt;50g），共享MCU/BLE省电省成本。
                </p>
                <p>
                  <span className="text-red-400/80">✗ 劣势：</span>
                  汗液路由设计复杂，电极寿命限制，洗涤耐久性待验证。
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  方案三
                </span>
                <h4 className="text-lg font-semibold text-white">微流控织物 (Microfluidic Textile)</h4>
              </div>
              <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
                <p>
                  微流控通道通过激光刻蚀或编织工艺直接集成到胸带纺织材料中。毛细作用被动驱动汗液从收集区→传感器腔室→废液储库。无需任何泵或阀。
                </p>
                <p>
                  <span className="text-green-400/80">✓ 优势：</span>
                  优雅的被动流体处理，极致轻薄，无活动部件。
                </p>
                <p>
                  <span className="text-red-400/80">✗ 劣势：</span>
                  纺织微制造门槛高（需专业设备+材料学背景），洗涤耐久性是最大不确定性。
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  方案四
                </span>
                <h4 className="text-lg font-semibold text-white">混合柔性 PCB (Hybrid Flex PCB)</h4>
              </div>
              <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
                <p>
                  单张柔性 PCB 上集成 ECG 电极触点、BioZ 激励/感应通路、ISE 阵列和 TMP117 温度传感器。微流控层以层压方式贴合在 PCB
                  上方，负责汗液引流。所有传感器共享同一电源管理和 MCU。
                </p>
                <p>
                  <span className="text-green-400/80">✓ 优势：</span>
                  最高集成度，单次组装，共享电源管理，最小体积。
                </p>
                <p>
                  <span className="text-red-400/80">✗ 劣势：</span>
                  研发最复杂，跨传感器干扰管理至关重要，ISE 膜需要可更换设计。
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Key Challenges Table */}
          <h3 className="text-xl font-semibold text-white mb-4">
            关键工程挑战与解决方案
          </h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full min-w-[700px] text-base">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    挑战
                  </th>
                  <th className="text-center py-3 px-4 text-sm text-[#94A3B8] font-normal w-[80px]">
                    严重性
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    解决方案
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <AnalysisCard
                  severity="High"
                  title="出汗延迟（需出汗后才能测量）"
                  mitigation="汗液检测电极触发测量开始；使用皮肤温度+心率作为出汗前水合状态替代指标"
                />
                <AnalysisCard
                  severity="High"
                  title="旧汗液 vs 新汗液（残留效应）"
                  mitigation="连续流微流控设计+废液储库；定期冲洗通道；传感器响应时间监测判断新旧汗切换"
                />
                <AnalysisCard
                  severity="Medium"
                  title="可复用传感器上的盐结晶"
                  mitigation="自清洁电极设计；亲水涂层防止结晶附着；每次使用后校准检查"
                />
                <AnalysisCard
                  severity="Medium"
                  title="温度补偿"
                  mitigation="ISE 传感器附近共位放置 TMP117（±0.1°C）；Nernst 方程实时温度校正"
                />
                <AnalysisCard
                  severity="Medium"
                  title="ECG 与 ISE 信号串扰"
                  mitigation="物理间距 &gt;5mm；ECG 频率域（0.05-150Hz）与 ISE 电位测量（DC/超低频）天然隔离"
                />
                <AnalysisCard
                  severity="Medium"
                  title="体毛干扰汗液收集"
                  mitigation="引流垫设计可绕过毛发接触皮肤；推荐关键测量区剃毛以确保最佳性能"
                />
              </tbody>
            </table>
          </div>

          {/* 4-in-1 Design Concept */}
          <h3 className="text-xl font-semibold text-white mb-4">
            设计概念——四合一胸带的原型定义
          </h3>
          <GlassCard className="p-6">
            <div className="text-base text-[#94A3B8] leading-relaxed space-y-3">
              <p>
                基于以上分析，一个可行的四合一胸带原型设计如下：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="text-white font-medium">前中心：</span>
                  可拆卸ISE汗液传感器模块，内含固体接触式Na+/K+双通道离子选择性电极。离子载体膜设计为可更换卡匣（cartridge），每3个月更换一次。
                </li>
                <li>
                  <span className="text-white font-medium">左/右侧：</span>
                  ECG + BioZ 电极（医用级导电硅胶干电极），四电极配置提供 ECG 差分信号和 BioZ 四线测量。
                </li>
                <li>
                  <span className="text-white font-medium">顶部：</span>
                  <SourceTooltip sourceId="ti-tmp117">
                    TMP117
                  </SourceTooltip>{' '}
                  数字温度传感器，通过薄硅胶层与皮肤热耦合，PCB 热隔离槽隔离 MCU 自热。±0.1°C 医疗级精度。
                </li>
                <li>
                  <span className="text-white font-medium">中心：</span>
                  <SourceTooltip sourceId="nordic-nrf52840">
                    nRF52840
                  </SourceTooltip>{' '}
                  模组 + 200mAh Li-Po 电池。单 SoC 处理 ECG DSP、BioZ 解调、ISE 电位读数、温度采集和 BLE 5.4 双模通信。
                </li>
                <li>
                  <span className="text-white font-medium">目标总重：</span>
                  &lt;50g（对比：Polar H10 38g + FLOWBIO 30g = 68g 两设备合计，集成方案减重 26%）
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 05: 四合一协同效应 */}
      {/* ================================================================= */}
      <section className="bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="05"
            title="四合一协同效应"
            subtitle="当心率、呼吸、体温和汗液数据在时域上完美对齐——AI教练的决策引擎诞生"
          />

          {/* Synergy Matrix */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full min-w-[800px] text-base">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    模态组合
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal w-[250px]">
                    新洞察
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    生理基础
                  </th>
                  <th className="text-left py-3 px-3 text-sm text-[#94A3B8] font-normal">
                    应用场景
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {([
                  [
                    'HR + 汗液 Na+',
                    '心率漂移 vs 电解质耗竭——精准区分两类疲劳',
                    '心率上升而Na+正常=心血管漂移；心率上升且Na+下降=电解质耗竭 → 立即补盐',
                    '精准补水策略：该喝水还是喝电解质饮料？',
                  ],
                  [
                    'HR + 出汗率',
                    '心血管漂移量化 → 实时体液需求模型',
                    '出汗率 × 时间 + 心率趋势 = 个性化体液流失模型。不同温湿度下得出个人化的「每小时应补水量」',
                    '何时喝、喝多少——告别「凭感觉喝水」',
                  ],
                  [
                    '核心体温 + 出汗率',
                    '全身体温调节效率评估',
                    'T_core / 出汗率比 = 冷却效率；比值上升 = 即将发生热应激（散热效率下降）',
                    '热适应进度追踪、热应激预警',
                  ],
                  [
                    '呼吸通气量 (VE) + 汗液乳酸',
                    '呼吸阈值 vs 代谢阈值——双阈值校准',
                    'BioZ 测量 VE/VT1/VT2（呼吸阈值）+ 汗液乳酸阈值比较 → 训练区间的「地面真值」',
                    '训练区间精准设定（Zone 2上界到底在哪？）',
                  ],
                  [
                    'HRV + 汗液皮质醇',
                    '完整压力-恢复画像：自主神经 + 内分泌双维度',
                    '自主神经（HRV）+ 内分泌（皮质醇）= 全面的身体应激水平评估',
                    '过度训练预防、恢复状态评估、减量周时机判断',
                  ],
                  [
                    'ECG + 汗液 K+',
                    '心脏电解质紊乱早期预警',
                    '血钾异常表现为 ECG T 波变化 + 汗液K+下降 → 双重确认',
                    '心律失常风险筛查（特别是高温长时间运动场景）',
                  ],
                  [
                    '全部四项 (HR+RR+T+Sweat)',
                    '全面代谢-体温-自主神经综合画像',
                    'ML融合 15+ 特征 → 个性化「表现准备度评分」含 4 个子维度',
                    'AI教练「决策引擎」——一堂训练课里的所有关键决策',
                  ],
                ] as const).map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-green-400 font-medium">{row[0]}</td>
                    <td className="py-3 px-3 text-white">{row[1]}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{row[2]}</td>
                    <td className="py-3 px-3 text-[#94A3B8]">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Coach Capabilities */}
          <h3 className="text-xl font-semibold text-white mb-6">
            AI教练解锁的四层能力
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
                  1
                </span>
                <h4 className="text-lg font-semibold text-white">实时警报 (Real-time Alerts)</h4>
              </div>
              <ul className="space-y-2 text-base text-[#94A3B8]">
                <li>
                  <span className="text-red-400 font-medium">痉挛风险：</span>
                  Na+快速下降 + HR异常上升 → 立即发布电解质补充警告
                </li>
                <li>
                  <span className="text-red-400 font-medium">热应激：</span>
                  T_core上升 + 出汗率下降（无汗症前兆）→ 立即降温警告
                </li>
                <li>
                  <span className="text-red-400 font-medium">撞墙预警 (Bonk Warning)：</span>
                  汗液葡萄糖趋势下降 + 呼吸交换率（RER，通过RR估算）变化 → 即将能量耗竭
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                  2
                </span>
                <h4 className="text-lg font-semibold text-white">训练中指导 (In-session Guidance)</h4>
              </div>
              <ul className="space-y-2 text-base text-[#94A3B8]">
                <li>
                  <span className="text-amber-400 font-medium">精确补水指令：</span>
                  「现在喝 500mL 电解质饮料」（基于出汗率 × Na+浓度 × 已骑行时间）
                </li>
                <li>
                  <span className="text-amber-400 font-medium">强度控制：</span>
                  「降低输出——核心体温接近 39.5°C 阈值」
                </li>
                <li>
                  <span className="text-amber-400 font-medium">补给窗口：</span>
                  「10分钟后需补充碳水」（基于个性化糖原消耗模型）
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                  3
                </span>
                <h4 className="text-lg font-semibold text-white">训练后分析 (Post-session Analysis)</h4>
              </div>
              <ul className="space-y-2 text-base text-[#94A3B8]">
                <li>
                  <span className="text-blue-400 font-medium">个性化汗液档案更新：</span>
                  每次训练后自动更新你的「汗液指纹」——出汗率曲线、Na+浓度基线、温度-出汗率关系
                </li>
                <li>
                  <span className="text-blue-400 font-medium">热适应进度：</span>
                  对比历史数据判断你对热的适应程度（Na+浓度变化、T_core-功率关系）
                </li>
                <li>
                  <span className="text-blue-400 font-medium">恢复状态：</span>
                  HRV + 皮质醇代理（汗液皮质醇趋势）+ 静息心率 → 恢复评分
                </li>
                <li>
                  <span className="text-blue-400 font-medium">电解质补充计划：</span>
                  基于本次训练的实际流失量，给出精确到毫克的补充方案
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">
                  4
                </span>
                <h4 className="text-lg font-semibold text-white">长期适应追踪 (Long-term Adaptation)</h4>
              </div>
              <ul className="space-y-2 text-base text-[#94A3B8]">
                <li>
                  <span className="text-green-400 font-medium">热适应信号：</span>
                  汗液 Na+浓度趋势下降 = 身体学会保钠（热适应的经典标志）
                </li>
                <li>
                  <span className="text-green-400 font-medium">体能进步：</span>
                  给定功率下 T_core 趋势下降 + 出汗率上升 = 有氧能力提升
                </li>
                <li>
                  <span className="text-green-400 font-medium">个体化湿度-出汗率曲线：</span>
                  机器学习模型在2-4周内学习「你的正常」，基线建立后异常检测成为可能
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 06: 前沿研究 */}
      {/* ================================================================= */}
      <section className="bg-[#0A1120] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="06"
            title="前沿研究"
            subtitle="学术界正在突破的六个方向——未来3-5年可能改变游戏规则"
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <InfoCard title="1. 连续皮质醇监测">
              <p>
                <SourceTooltip sourceId="cyclingnews-sweat-breathing">
                  Stanford 2024
                </SourceTooltip>
                ：基于核酸适配体（aptamer）的电化学皮质醇传感器取得突破。适配体是与皮质醇特异性结合的短链 DNA/RNA
                序列，被固定在金电极表面。皮质醇结合时适配体构象变化改变电子传递效率，检测限低至 0.1 pg/mL（足以区分正常和应激水平）。这项技术的关键意义在于首次提供了压力/恢复的内分泌维度实时数据——与 HRV（自主神经维度）互补，构成完整的应激画像。
              </p>
            </InfoCard>

            <InfoCard title="2. 汗液-ISF 混合微针传感">
              <p>
                加州大学圣地亚哥分校（UCSD）Joseph Wang 实验室（全球可穿戴电化学传感领域最大课题组）正在开发同时获取汗液和组织间液 （ISF）的混合传感器平台。微针阵列穿透角质层获取 ISF
                中的葡萄糖（与血糖高相关），而同一柔性贴片上的 ISE 阵列从皮肤表面汗液获取电解质。这种双层采样策略结合了 ISF 的代谢物深度和汗液的无创便利性。
              </p>
            </InfoCard>

            <InfoCard title="3. 疾病筛查应用">
              <p>
                汗液分析在疾病筛查领域已有 FDA 批准的标杆应用：Wescor Macroduct 系统通过测量汗液 Cl- 浓度诊断囊性纤维化（Cl- &gt;60 mmol/L
                为阳性，敏感性 &gt;98%）。糖尿病应用方面，近期研究发现汗液葡萄糖与血糖存在 r=0.7-0.8 的相关性，虽然不足以替代血糖仪进行胰岛素剂量决策，但可作为连续血糖趋势监测的补充。运动场景下，汗液乳酸阈值与血乳酸阈值的高度一致性（r&gt;0.9）已在多项研究中验证。
              </p>
            </InfoCard>

            <InfoCard title="4. 自供能汗液传感器">
              <p>
                利用汗液中的乳酸作为生物燃料电池（BFC）燃料是学术界热门方向。乳酸氧化酶生物燃料电池可从汗液乳酸中提取微瓦级（μW）
                功率，足以驱动低功耗传感器自身运行。UCLA 和 NC State
                大学已成功演示完全由汗液供电的传感器平台——乳酸氧化产生电子，电子流经外部电路产生电流，同时电流信号本身也包含乳酸浓度信息（既是电源也是传感器）。这一方向若成功规模化，「无需电池的可穿戴汗液传感器」将成为现实。
              </p>
            </InfoCard>

            <InfoCard title="5. 闭环药物递送">
              <p>
                传感器检测到生物标记物变化 → 触发微流控泵释放药物——这是可穿戴设备的终极形态之一。在糖尿病管理场景中：汗液/ISF 葡萄糖传感器检测到血糖升高 → 微泵释放胰岛素。在运动场景中：Na+
                传感器检测到钠浓度快速下降 → 微泵释放电解质浓缩液。目前该方向仍处于概念验证和动物实验阶段，但可穿戴微泵技术（渗透泵、电渗泵、压电微泵）已相对成熟，主要等待传感器精度和长期可靠性的验证。
              </p>
            </InfoCard>

            <InfoCard title="6. 机器学习个性化基线">
              <p>
                汗液成分的个体差异可达 3-5 倍——同样的运动强度和时间，A 的汗钠浓度可能是 20 mmol/L，而 B 是 70 mmol/L。这意味着任何通用的阈值都没有意义。解决方案是：机器学习模型在设备初次佩戴的 2-4
                周内学习「你的正常」，建立个人化的「汗液指纹」（Sweat Fingerprint）——包括基础 Na+浓度、出汗率-温度曲线、Na+浓度随运动时间的变化斜率等。基线建立后，任何偏离基线的变化都可以作为有意义的异常信号。这种「个体内基线比较」(intra-individual baseline comparison) 策略比「群体参考范围」(population reference range) 敏感度提高 5-10 倍。
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 07: 芯片与硬件方案 */}
      {/* ================================================================= */}
      <section className="bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="07"
            title="芯片与硬件方案"
            subtitle="ISE前端、微流控制造、温度补偿与四合一系统的完整功耗预算"
          />

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <InfoCard title="ISE 模拟前端 (AFE)">
              <div className="space-y-3">
                <p>
                  离子选择性电极的输出是高阻抗（10⁶-10⁹ Ω）直流电位信号，需要一个高输入阻抗、低偏置电流的电位计（potentiostat）或仪表放大器作为 AFE。
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="text-green-400 font-medium">TI LMP91000：</span>
                    可配置 AFE 电位计，内置跨阻放大器（TIA）和可编程偏置电压，支持 2-引线或 3-引线电化学传感器。价格 $3-5，是成本敏感项目的首选。可通过 SPI 配置内部寄存器切换恒电位/恒电流模式。
                  </li>
                  <li>
                    <span className="text-green-400 font-medium">ADI AD5940：</span>
                    高精度电化学 AFE，双通道设计可同时驱动 ISE 和安培酶电极。内置高精度 ADC（16-bit, 800ksps）和可编程激励波形发生器。价格 $8-12，适合需要同时进行 ISE 和酶电极测量的场景。
                  </li>
                </ul>
              </div>
            </InfoCard>

            <InfoCard title="微流控制造方案">
              <div className="space-y-3">
                <p>
                  汗液传感器的微流控组件可根据研发阶段和产量选择不同制造方案：
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="text-green-400 font-medium">PDMS 软光刻：</span>
                    实验室原型首选。聚二甲基硅氧烷（PDMS）浇注在 SU-8 光刻模具上固化成型。优点：透明、生物相容、可表面处理改亲水性。缺点：不适合大规模量产。
                  </li>
                  <li>
                    <span className="text-green-400 font-medium">激光切割纸基：</span>
                    最便宜的原型方案（&lt;$1/片）。CO₂激光切割 Whatman 滤纸形成微通道，层压塑料薄膜封顶。几小时内即可从设计到验证。
                  </li>
                  <li>
                    <span className="text-green-400 font-medium">3D 打印模具：</span>
                    中等规模方案。SLA 或 PolyJet 打印精密模具或直接打印微通道（分辨率 ~50-100μm），适合小批量生产（100-1000件）。
                  </li>
                </ul>
              </div>
            </InfoCard>
          </div>

          {/* Temperature IC */}
          <GlassCard className="p-6 mb-10">
            <h3 className="text-lg font-semibold text-white mb-3">温度补偿 IC</h3>
            <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
              <p>
                ISE 的 Nernst 响应与温度成正比（斜率 = RT/zF × ln(10) ≈ 59.16 mV/decade at 25°C），因此精确的温度测量对离子浓度计算至关重要。1°C 的温度误差可导致 ~2% 的浓度计算误差。
              </p>
              <p>
                <SourceTooltip sourceId="ti-tmp117">
                  TI TMP117
                </SourceTooltip>{' '}
                （$2-3, ±0.1°C 精度）被推荐与 ISE 传感器共位安装（co-located），以确保测量温度精确反映传感器结区的真实温度。TMP117 符合 ASTM E1112 与 ISO
                80601-2-56 医疗级温度计标准，16-bit 数字输出通过 I²C 接口直接接入 MCU。
              </p>
            </div>
          </GlassCard>

          {/* Power Budget Table */}
          <h3 className="text-xl font-semibold text-white mb-4">
            四合一系统功耗预算
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[600px] text-base">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    组件
                  </th>
                  <th className="text-center py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    功耗
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {([
                  ['ECG AFE (MAX30001)', '0.6-1.0 mW'],
                  ['BioZ (MAX30001)', '1.0-2.0 mW'],
                  ['TMP117 (温度)', '0.01-0.05 mW'],
                  ['ISE AFE (LMP91000)', '0.3-1.5 mW'],
                  ['MCU (nRF52840)', '0.5-2.0 mW'],
                  ['BLE 传输 (平均)', '1.0-3.0 mW'],
                ] as const).map(([component, power]) => (
                  <tr key={component} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-[#94A3B8]">{component}</td>
                    <td className="py-3 px-4 text-center text-white">{power}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/[0.08] bg-green-500/5">
                  <td className="py-3 px-4 text-green-400 font-semibold">总功耗</td>
                  <td className="py-3 px-4 text-center text-green-400 font-bold">3.5-9.5 mW</td>
                </tr>
              </tbody>
            </table>
          </div>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-3">续航与 BOM 估算</h3>
            <div className="text-base text-[#94A3B8] leading-relaxed space-y-2">
              <p>
                <span className="text-green-400 font-medium">续航：</span>
                200mAh Li-Po 电池在 3.5mW（最低功耗模式）下的理论续航约 75 小时，在 9.5mW（全功能模式包括 BioZ 连续激励）下约 55 小时。考虑实际电池可用容量（~85%）和安全余量，四合一胸带的保守续航估计为 48-60 小时——相当于每周充电 1-2 次。
              </p>
              <p>
                <span className="text-green-400 font-medium">BOM 估算：</span>
                三合一（ECG+BioZ+Temp）BOM 约 $10-18 + 汗液模块（ISE AFE + ISE 传感器 + 微流控组件）约 $4-8 = 四合一总物料成本 $14-26。其中 ISE 离子载体膜为可更换消耗件，建议以卡匣形式单独销售（$5-10/个，每 3 个月更换），形成稳定的配件收入流。
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Section 08: 监管路径 */}
      {/* ================================================================= */}
      <section className="bg-[#0A1120] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            number="08"
            title="监管路径"
            subtitle="从一般健康设备到医疗级认证——分阶段监管策略"
          />

          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[700px] text-base">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    声明 (Claim)
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    监管路径
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-[#94A3B8] font-normal">
                    预计周期
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {([
                  [
                    '汗液电解质「水合意识」(Hydration Awareness)',
                    '一般健康设备 (General Wellness) — 无需 FDA 审查',
                    '0 个月',
                  ],
                  [
                    '汗液 Na+「电解质补充指导」',
                    'FDA Class I 510(k) Exempt',
                    '3-6 个月',
                  ],
                  [
                    '汗液葡萄糖「糖尿病管理」',
                    'FDA Class II 510(k) + 临床试验',
                    '18-36 个月',
                  ],
                  [
                    '汗液皮质醇「压力/肾上腺评估」',
                    'FDA Class II 510(k) — 新型设备，可能需 De Novo 分类',
                    '24-36 个月',
                  ],
                  [
                    'CE 标志 (欧盟)',
                    'EU MDR Class IIa (短期使用)',
                    '9-18 个月',
                  ],
                  [
                    'NMPA (中国)',
                    'II 类医疗器械注册',
                    '6-12 个月',
                  ],
                ] as const).map(([claim, path, timeline]) => (
                  <tr key={claim} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-white">{claim}</td>
                    <td className="py-3 px-4 text-[#94A3B8]">{path}</td>
                    <td className="py-3 px-4 text-[#94A3B8]">{timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              建议的渐进式监管策略
            </h3>
            <div className="text-base text-[#94A3B8] leading-relaxed space-y-3">
              <p>
                汗液传感器的监管策略建议采用「先软后硬」的渐进式路径：
              </p>
              <p>
                <span className="text-green-400 font-medium">第一阶段（上市时）：</span>
                以「一般健康设备」(General Wellness) 身份上市，声明限为「水合意识」(Hydration Awareness) 和「运动表现参考」(Athletic Performance Reference)。此阶段无需任何 FDA 注册，可立即面向消费者销售，验证产品-市场匹配。
              </p>
              <p>
                <span className="text-green-400 font-medium">第二阶段（上市后 12 个月）：</span>
                完成电解质相关的性能验证（与传统实验室方法对比），申请 FDA Class I 510(k) Exempt 或通过 De Novo 获得「电解质补充指导」声明。同步启动 CE Mark (EU MDR Class IIa) 和 NMPA II 类注册。
              </p>
              <p>
                <span className="text-green-400 font-medium">第三阶段（上市后 24-36 个月）：</span>
                对于葡萄糖、皮质醇等更高风险声明的适用范围，开展正式临床试验（n=50-200），提交 FDA Class II 510(k) 申请。此阶段的投入和时间窗口显著增大，但对应的竞争壁垒和临床价值也最高。
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Navigation Footer */}
      {/* ================================================================= */}
      <section className="bg-[#020617] py-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-[#64748B]">探索更多技术专题</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/technology"
                className="text-sm text-[#94A3B8] hover:text-green-400 transition-colors px-4 py-2 glass-card rounded-full"
              >
                ← 技术全景
              </Link>
              <Link
                href="/technology/respiration"
                className="text-sm text-[#94A3B8] hover:text-green-400 transition-colors px-4 py-2 glass-card rounded-full"
              >
                呼吸检测
              </Link>
              <Link
                href="/technology/temperature"
                className="text-sm text-[#94A3B8] hover:text-green-400 transition-colors px-4 py-2 glass-card rounded-full"
              >
                核心体温
              </Link>
              <Link
                href="/technology/combinations"
                className="text-sm text-[#94A3B8] hover:text-green-400 transition-colors px-4 py-2 glass-card rounded-full"
              >
                组合方案
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
