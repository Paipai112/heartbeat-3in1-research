import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";

function StatCard({
  value,
  label,
  sourceId,
}: {
  value: string;
  label: string;
  sourceId: string;
}) {
  return (
    <div className="glass-card p-6 text-center glow-green">
      <div className="text-2xl font-bold text-white font-heading">{value}</div>
      <div className="text-sm text-[#94A3B8] mt-1">{label}</div>
    </div>
  );
}

function ScenarioCard({
  name,
  tag,
  description,
  advantages,
  challenges,
  marketSize,
  highlighted = false,
}: {
  name: string;
  tag: string;
  description: string;
  advantages: string[];
  challenges: string[];
  marketSize: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        "glass-card p-8 " +
        (highlighted ? "glow-green border-green-500/30" : "")
      }
    >
      <div className="flex items-center gap-2 mb-3">
        {highlighted && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            推荐
          </span>
        )}
        <span className="text-xs text-[#64748B] font-mono">{tag}</span>
      </div>
      <h3 className="font-heading text-xl font-bold text-white mb-3">
        {name}
      </h3>
      <p className="text-base text-[#94A3B8] mb-4 leading-relaxed">
        {description}
      </p>
      <div className="mb-3">
        <p className="text-xs text-[#64748B] uppercase mb-1">优势</p>
        <ul className="space-y-1">
          {advantages.map((a) => (
            <li
              key={a}
              className="text-sm text-[#94A3B8] flex items-start gap-1.5"
            >
              <span className="text-green-400 mt-0.5">+</span>
              {a}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-xs text-[#64748B] uppercase mb-1">挑战</p>
        <ul className="space-y-1">
          {challenges.map((c) => (
            <li
              key={c}
              className="text-sm text-[#94A3B8] flex items-start gap-1.5"
            >
              <span className="text-amber-400 mt-0.5">!</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="data-highlight text-sm">
        <span className="text-[#64748B]">预估市场规模：</span>
        <span className="text-green-400 font-semibold">{marketSize}</span>
      </div>
    </div>
  );
}

function DeviceCard({
  name,
  role,
  product,
  color,
}: {
  name: string;
  role: string;
  product: string;
  color: string;
}) {
  return (
    <div className="glass-card p-5 text-center">
      <div
        className={
          "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 bg-" +
          color +
          "-500/20"
        }
      >
        <div className={"w-3 h-3 rounded-full bg-" + color + "-400"} />
      </div>
      <div className="text-sm font-semibold text-white">{name}</div>
      <div className="text-xs text-[#94A3B8] mt-0.5">{role}</div>
      <div className="text-xs text-[#64748B] mt-1 font-mono">{product}</div>
    </div>
  );
}

export default function BusinessPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="商业前景调研"
        titleGradient="三合一胸带市场机会"
        subtitle="心率监测 + 呼吸检测 + 核心体温 — 三种商业场景的深度分析"
        description="基于 Visma-Lease a Bike 车队传感器生态、全球竞品数据与市场研究报告，系统评估三合一胸带的市场可行性、竞争格局与商业路径。"
        badge={{ text: "Market Analysis", color: "green" }}
      />

      {/* Section: Market Overview */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "首页", href: "/" }, { label: "商业前景" }]}
          />

          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              市场总览
            </h2>
            <p className="text-[#94A3B8] max-w-2xl">
              三个独立市场的交汇处，消费级三合一胸带处于完美的竞争真空地带。以下数据均来自公开行业报告。
            </p>
          </div>

          {/* Market Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              value="$18亿 → $36亿"
              label="胸带心率监测市场 (2025→2034)"
              sourceId="grand-view-wearable-market"
            />
            <StatCard
              value="$18亿 → $52亿"
              label="可穿戴体温传感器市场 (2025→2034)"
              sourceId="marketsandmarkets-wearable-sensors"
            />
            <StatCard
              value="$1.91亿 → $3.66亿"
              label="呼吸训练设备市场 (2025→2033)"
              sourceId="allied-market-research-wearables"
            />
            <StatCard
              value="$200-350"
              label="三合一产品建议定价区间"
              sourceId="polar-h10-product"
            />
          </div>

          <div className="glass-card-elevated p-8 max-w-3xl">
            <p className="text-[#94A3B8] leading-relaxed">
              三个市场的总和TAM约为
              <span className="text-green-400 font-semibold">
                ~$38亿 (2025) → ~$92亿 (2034)
              </span>
              。三合一胸带不仅可以捕获这三个市场的交叉部分，还能创造增量市场 —
              将原本需要购买多个设备的用户（如Visma车队车手）转化为单一产品的客户。
              目前消费级市场上不存在任何同时提供ECG心率+呼吸率+核心体温的三合一胸带产品。
            </p>
          </div>
        </div>
      </section>

      {/* Section: Three Scenarios */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              三种商业场景对比
            </h2>
            <p className="text-[#94A3B8] max-w-2xl">
              从技术复杂度、市场规模和竞争态势三个维度，系统评估三种产品组合的商业可行性。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <ScenarioCard
              name="三合一全栈"
              tag="Scenario A"
              description="同时采集 ECG 心率 + 呼吸率/潮气量 + 核心体温，一个设备替代 Visma
              车手身上 4 个独立传感器。"
              advantages={[
                "竞争真空：消费级市场0款产品",
                "最大TAM：覆盖三个市场交叉+增量",
                "品类定义者优势：先发品牌效应",
                "数据飞轮：多参数交叉产生独特洞察",
              ]}
              challenges={[
                "技术复杂度最高",
                "认证路径长（FDA/CE/NMPA）",
                "初始BOM成本$25-45",
              ]}
              marketSize="TAM ~$92亿 (2034)"
              highlighted
            />
            <ScenarioCard
              name="HR + 呼吸"
              tag="Scenario B"
              description="聚焦心率+呼吸双参数，不包含体温。MAX30001单芯片即可实现，是技术复杂度最低的二合一方案。"
              advantages={[
                "最低芯片复杂度（2芯片方案）",
                "最快上市时间",
                "Tymewear已验证呼吸数据需求",
                "可对标/替代Polar H10 + Tymewear组合",
              ]}
              challenges={[
                "缺少体温差异化",
                "需与Polar/Garmin正面竞争",
                "呼吸数据用户认知待教育",
              ]}
              marketSize="TAM ~$40亿"
            />
            <ScenarioCard
              name="HR + 核心体温"
              tag="Scenario C"
              description="心率+核心体温双参数，不包含呼吸。热管理是耐力运动的核心刚需，CORE已验证市场需求。"
              advantages={[
                "热管理差异化明确",
                "CORE已教育市场（65% WT车队使用）",
                "无直接竞品（无ECG+CoreTemp胸带）",
              ]}
              challenges={[
                "缺少呼吸数据",
                "体温精度争议（CORE独立验证不理想）",
                "热通量传感器集成复杂度",
              ]}
              marketSize="TAM ~$54亿"
            />
          </div>
        </div>
      </section>

      {/* Section: Visma Device Fragmentation */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              Visma 车队的设备碎片化问题
            </h2>
            <p className="text-[#94A3B8] max-w-2xl">
              Visma-Lease a Bike
              是UCI世界巡回赛最具技术驱动力的车队之一。他们目前的传感器配置完美展示了三合一胸带的市场需求。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <DeviceCard
              name="Garmin HRM"
              role="心率监测"
              product="HRM-Pro Plus · $130"
              color="red"
            />
            <DeviceCard
              name="Tymewear"
              role="呼吸检测"
              product="VitalPro · $299"
              color="blue"
            />
            <DeviceCard
              name="CORE 2"
              role="核心体温"
              product="Body Sensor · $295"
              color="amber"
            />
            <DeviceCard
              name="FLOWBIO"
              role="汗液分析"
              product="S1 Sensor"
              color="purple"
            />
          </div>

          {/* Arrow to solution */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-[#475569]">
              <span className="block w-8 h-px bg-[#334155]" />
              <span className="text-xs">
                Visma 车手需同时佩戴 4+ 个独立传感器
              </span>
              <span className="block w-8 h-px bg-[#334155]" />
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22C55E"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <div className="glass-card-elevated px-8 py-5 text-center glow-green border-green-500/30">
              <span className="text-sm text-[#94A3B8]">单一设备解决方案</span>
              <div className="text-xl font-heading font-bold text-green-400 mt-1">
                HeartBeat 三合一胸带
              </div>
              <div className="text-sm text-[#64748B] mt-1">
                心率 + 呼吸 + 核心体温 · 一个设备 · 统一数据流
              </div>
            </div>
          </div>

          {/* Pain points */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: "多设备",
                desc: "4个独立设备，不同佩戴位置，训练前准备时间10+分钟",
              },
              {
                title: "多 App",
                desc: "Garmin Connect + Tymewear App + CORE App，数据无法关联",
              },
              {
                title: "数据孤岛",
                desc: "心率、呼吸、体温数据分散在不同平台，无法交叉分析",
              },
            ].map((p) => (
              <div key={p.title} className="glass-card p-5 text-center">
                <div className="text-sm font-semibold text-red-400 mb-1">
                  {p.title}
                </div>
                <div className="text-xs text-[#94A3B8]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Competitive Landscape */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              竞品全景
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              消费级与专业级竞品功能覆盖率矩阵。目前无一产品同时覆盖心率+呼吸+体温。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-4 text-[#94A3B8] font-normal">
                    产品
                  </th>
                  <th className="text-left py-3 px-4 text-[#94A3B8] font-normal">
                    价格
                  </th>
                  <th className="text-center py-3 px-4 text-[#94A3B8] font-normal">
                    ECG 心率
                  </th>
                  <th className="text-center py-3 px-4 text-[#94A3B8] font-normal">
                    呼吸
                  </th>
                  <th className="text-center py-3 px-4 text-[#94A3B8] font-normal">
                    体温
                  </th>
                  <th className="text-left py-3 px-4 text-[#94A3B8] font-normal">
                    呼吸技术
                  </th>
                  <th className="text-left py-3 px-4 text-[#94A3B8] font-normal">
                    温度技术
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  {
                    n: "Polar H10",
                    p: "$105",
                    e: true, r: "partial", t: false,
                    rt: "EDR（软件）",
                    tt: "—",
                  },
                  {
                    n: "Garmin HRM-Pro+",
                    p: "$130",
                    e: true, r: "partial", t: false,
                    rt: "加速度计+Firstbeat",
                    tt: "—",
                  },
                  {
                    n: "Tymewear VitalPro",
                    p: "$299",
                    e: false, r: true, t: false,
                    rt: "应变计",
                    tt: "—",
                  },
                  {
                    n: "CORE 2",
                    p: "$295",
                    e: false, r: false, t: true,
                    rt: "—",
                    tt: "单热流法",
                  },
                  {
                    n: "Whoop 5.0",
                    p: "$239/年",
                    e: "partial", r: "partial", t: "partial",
                    rt: "PPG衍生",
                    tt: "皮肤温度",
                  },
                  {
                    n: "Zephyr BioHarness 3",
                    p: "$800-1,500",
                    e: true, r: true, t: true,
                    rt: "压电+RIP",
                    tt: "热敏电阻",
                  },
                  {
                    n: "Astroskin",
                    p: "$5,999",
                    e: true, r: true, t: true,
                    rt: "RIP",
                    tt: "热敏电阻",
                  },
                ].map((row) => (
                  <tr key={row.n} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-white">{row.n}</td>
                    <td className="py-3 px-4 text-[#94A3B8] font-mono text-xs">
                      {row.p}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.e === true ? (
                        <span className="text-green-400">✓</span>
                      ) : row.e === "partial" ? (
                        <span className="text-amber-400">△</span>
                      ) : (
                        <span className="text-[#334155]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.r === true ? (
                        <span className="text-green-400">✓</span>
                      ) : row.r === "partial" ? (
                        <span className="text-amber-400">△</span>
                      ) : (
                        <span className="text-[#334155]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.t === true ? (
                        <span className="text-green-400">✓</span>
                      ) : row.t === "partial" ? (
                        <span className="text-amber-400">△</span>
                      ) : (
                        <span className="text-[#334155]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#94A3B8] text-xs">
                      {row.rt}
                    </td>
                    <td className="py-3 px-4 text-[#94A3B8] text-xs">
                      {row.tt}
                    </td>
                  </tr>
                ))}
                {/* Highlighted 3-in-1 row */}
                <tr className="bg-green-500/5 border border-green-500/20">
                  <td className="py-3 px-4 text-green-400 font-semibold">
                    ⭐ HeartBeat 3-in-1
                  </td>
                  <td className="py-3 px-4 text-green-400 font-mono text-xs font-semibold">
                    $200-350
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-green-400 text-xs">
                    BioZ + EDR 双模
                  </td>
                  <td className="py-3 px-4 text-green-400 text-xs">
                    双热流法 + TMP117
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section: Market Opportunity Summary */}
      <section
        className="bg-[#020617] py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(34,197,94,0.05), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                为什么是现在？
              </h2>
              <div className="space-y-4">
                {[
                  {
                    t: "技术组件全部成熟",
                    d: "MAX30001（ECG+BioZ单芯片）、TMP117（±0.1°C医疗级测温）、nRF52840（BLE+ANT+双模）均为量产方案，无需等待任何技术突破。",
                  },
                  {
                    t: "市场已被先行者教育",
                    d: "CORE（65% WT车队使用）和 Tymewear（UCI批准）已验证了呼吸和体温数据的价值，但各自是独立设备——用户渴望整合。",
                  },
                  {
                    t: "竞争真空窗口期有限",
                    d: "Polar H10发布已超5年无后继者，Garmin的呼吸检测仅为软件层面。一旦巨头意识到三合一机会，窗口期将关闭。",
                  },
                  {
                    t: "Visma验证了需求",
                    d: "顶级车队通过手动改装将4个设备凑齐三个参数——这是最真实的产品-市场匹配信号。",
                  },
                ].map((item) => (
                  <div key={item.t} className="data-highlight">
                    <p className="text-white font-semibold text-sm">
                      {item.t}
                    </p>
                    <p className="text-[#94A3B8] text-sm mt-1">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-elevated p-8 glow-green">
              <h3 className="font-heading text-xl font-bold text-white mb-6">
                竞争真空图
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "消费级三合一产品",
                    count: "0",
                    color: "text-green-400",
                  },
                  {
                    label: "ECG+呼吸胸带（消费级）",
                    count: "0",
                    color: "text-green-400",
                  },
                  {
                    label: "ECG+体温胸带（消费级）",
                    count: "0",
                    color: "text-green-400",
                  },
                  {
                    label: "ECG心率胸带（消费级）",
                    count: "5+",
                    color: "text-amber-400",
                  },
                  {
                    label: "三合一设备（专业/医疗级）",
                    count: "3",
                    color: "text-amber-400",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-2 border-b border-white/[0.04]"
                  >
                    <span className="text-sm text-[#94A3B8]">{row.label}</span>
                    <span
                      className={"text-sm font-bold font-mono " + row.color}
                    >
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/technology/combinations"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 transition-colors text-sm"
                >
                  查看技术实现方案 →
                </Link>
                <Link
                  href="/technology/respiration"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3 transition-colors text-sm"
                >
                  深入了解呼吸检测技术
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
