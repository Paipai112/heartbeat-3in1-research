import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";

function TechCard({
  title,
  subtitle,
  children,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <div
      className={
        variant === "highlight"
          ? "glass-card-elevated p-8 glow-green border-green-500/20"
          : "glass-card p-6"
      }
    >
      <h3 className="font-heading text-lg font-semibold text-white mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-[#64748B] mb-3 font-mono">{subtitle}</p>
      )}
      <div className="text-sm text-[#94A3B8] leading-relaxed">{children}</div>
    </div>
  );
}

function LayerCard({
  name,
  icon,
  chips,
  description,
}: {
  name: string;
  icon: React.ReactNode;
  chips: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6 flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{name}</h4>
        <p className="text-xs text-green-400 font-mono mt-0.5">{chips}</p>
        <p className="text-xs text-[#94A3B8] mt-2">{description}</p>
      </div>
    </div>
  );
}

function ChallengeCard({
  title,
  severity,
  solution,
}: {
  title: string;
  severity: string;
  solution: string;
}) {
  const colors: Record<string, string> = {
    high: "text-red-400 bg-red-500/10 border-red-500/20",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  };
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <span
          className={
            "text-xs px-2 py-0.5 rounded-full border " + (colors[severity] || "")
          }
        >
          {severity === "high"
            ? "高优先级"
            : severity === "medium"
              ? "中优先级"
              : "低优先级"}
        </span>
      </div>
      <p className="text-xs text-[#94A3B8]">{solution}</p>
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <div className="page-enter">
      <PageHero
        title="技术全景"
        titleGradient="三合一胸带核心技术"
        subtitle="呼吸传感器 · 核心体温监测 · 芯片方案 · 系统架构"
        description="从物理原理到芯片选型，从信号链路到系统集成 — 覆盖三合一胸带从概念到量产的完整技术路径。"
        badge={{ text: "Technology Landscape", color: "teal" }}
      />

      {/* Architecture Overview */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "首页", href: "/" }, { label: "技术全景" }]}
          />

          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              系统架构总览
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              四层架构设计，从物理传感器到无线传输，每层均采用成熟量产芯片方案。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <LayerCard
              name="传感层"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
              chips="ECG电极 · BioZ电极 · TMP117 · 热通量传感器"
              description="导电硅胶干电极采集ECG/BioZ信号，TMP117采集皮肤温度，热通量传感器测量散热速率。"
            />
            <LayerCard
              name="AFE 层"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              }
              chips="MAX30001 · TMP117 ADC · 激励源"
              description="MAX30001内置18-bit ECG ADC（512sps）和20-bit BioZ ADC（64sps），单芯片完成双参数转换。"
            />
            <LayerCard
              name="计算层"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9h6M9 13h6M9 17h4" />
                </svg>
              }
              chips="nRF52840 · ARM Cortex-M4F · 64MHz"
              description="边缘DSP处理：RLS自适应滤波、运动伪影消除、信号质量评估、传感器融合算法。"
            />
            <LayerCard
              name="传输层"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                >
                  <path d="M5 12.55a11 11 0 0114.08 0" />
                  <path d="M1.42 9a16 16 0 0121.16 0" />
                  <path d="M8.53 16.11a6 6 0 016.95 0" />
                  <circle cx="12" cy="20" r="1" />
                </svg>
              }
              chips="BLE 5.4 · ANT+ · 双模并发"
              description="nRF SoftDevice并发BLE+ANT+：Heart Rate Service (0x180D) + Health Thermometer (0x1809) + Custom Respiration Service。"
            />
          </div>
        </div>
      </section>

      {/* Respiration Technology Summary */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              呼吸检测技术全览
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              七大技术路径的系统对比。生物阻抗法 (BioZ)
              是胸带形态下的最优选择——与ECG共享电极，单芯片实现。
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                    技术
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    静态精度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    动态精度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    潮气量
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    功耗
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    运动鲁棒性
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    胸带适配
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  [
                    "BioZ 生物阻抗",
                    "MAE 0.5-2.0",
                    "误差2-3×",
                    "★★★★★",
                    "低",
                    "中",
                    "★★★★★",
                    true,
                  ],
                  [
                    "EDR (ECG衍生)",
                    "MAE 1-3",
                    "高强退化",
                    "★",
                    "零",
                    "低",
                    "★★★★★",
                    false,
                  ],
                  [
                    "加速度计/IMU",
                    "RMSE ~2",
                    "RMSE 3.77",
                    "★",
                    "极低",
                    "中",
                    "★★★",
                    false,
                  ],
                  [
                    "RIP 感应体积描记",
                    "&lt;2 rpm",
                    "LoA扩大3×",
                    "★★★",
                    "低",
                    "中",
                    "★★",
                    false,
                  ],
                  [
                    "应变传感器",
                    "误差3-4%",
                    "运动下降",
                    "★★★",
                    "极低",
                    "中",
                    "★★★★",
                    false,
                  ],
                  [
                    "声学法",
                    "良好(安静)",
                    "显著下降",
                    "★",
                    "中",
                    "低",
                    "★",
                    false,
                  ],
                  [
                    "电容式应变",
                    "&lt;2%",
                    "需IMU融合",
                    "★★",
                    "极低",
                    "中",
                    "★★★",
                    false,
                  ],
                ].map((row) => (
                  <tr
                    key={row[0] as string}
                    className={
                      row[7]
                        ? "bg-green-500/5 border border-green-500/10"
                        : "hover:bg-white/[0.02]"
                    }
                  >
                    <td className="py-3 px-3">
                      <span
                        className={
                          row[7] ? "text-green-400 font-semibold" : "text-white"
                        }
                      >
                        {row[0] as string}
                        {row[7] && " ⭐"}
                      </span>
                    </td>
                    {([1, 2, 3, 4, 5, 6] as number[]).map(
                      (i) =>
                        (
                          <td
                            key={i}
                            className="py-3 px-3 text-center text-[#94A3B8]"
                          >
                            {row[i] as string}
                          </td>
                        ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3">
            <Link
              href="/technology/respiration"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
            >
              深入了解呼吸检测技术 →
            </Link>
          </div>
        </div>
      </section>

      {/* Temperature Summary */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              核心体温监测全览
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              六大非侵入式测温路径的系统对比。单热流法 (SHF) 最成熟（CORE 2
              已商用），双热流法 (DHF) 精度更高，是自主方案的首选方向。
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                    技术
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    精度
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    功耗
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    穿戴性
                  </th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal">
                    商用状态
                  </th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal">
                    代表产品
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  [
                    "单热流法 SHF",
                    "±0.2-0.7°C",
                    "低",
                    "优",
                    "已商用",
                    "CORE 2 ($295)",
                    false,
                  ],
                  [
                    "双热流法 DHF",
                    "±0.1-0.3°C",
                    "中",
                    "良",
                    "临床验证",
                    "Murata Moni-Patch",
                    true,
                  ],
                  [
                    "零热流法 ZHF",
                    "±0.1-0.3°C",
                    "高",
                    "差",
                    "仅临床",
                    "3M Bair Hugger",
                    false,
                  ],
                  [
                    "可吞服药丸",
                    "±0.1°C",
                    "无",
                    "侵入",
                    "已商用",
                    "e-Celsius ($50-100)",
                    false,
                  ],
                  [
                    "入耳式",
                    "±0.2-0.5°C",
                    "中",
                    "中",
                    "部分商用",
                    "Vitarate VTB01",
                    false,
                  ],
                  [
                    "HR模型估算",
                    "±0.3-0.5°C",
                    "零增量",
                    "优",
                    "研究阶段",
                    "学术原型",
                    false,
                  ],
                ].map((row) => (
                  <tr
                    key={row[0] as string}
                    className={
                      row[6]
                        ? "bg-cyan-500/5 border border-cyan-500/10"
                        : "hover:bg-white/[0.02]"
                    }
                  >
                    <td className="py-3 px-3">
                      <span
                        className={
                          row[6]
                            ? "text-cyan-400 font-semibold"
                            : "text-white"
                        }
                      >
                        {row[0] as string}
                        {row[6] && " ⭐"}
                      </span>
                    </td>
                    {([1, 2, 3, 4] as number[]).map(
                      (i) =>
                        (
                          <td
                            key={i}
                            className="py-3 px-3 text-center text-[#94A3B8]"
                          >
                            {row[i] as string}
                          </td>
                        ),
                    )}
                    <td className="py-3 px-3 text-[#94A3B8] text-xs">
                      {row[5] as string}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/technology/temperature"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
          >
            深入了解核心体温监测 →
          </Link>
        </div>
      </section>

      {/* Chip Solutions */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              芯片方案对比
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              六种硬件方案的系统对比。MAX30001 + TMP117 + nRF52840
              是综合最优选择。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "方案 A: MAX30001+TMP117",
                tag: "★★★★★ 首选",
                desc: "MAX30001单芯片解决ECG+BioZ，TMP117提供±0.1°C医疗级测温，nRF52840双模无线。三芯片方案，BOM $10-18，总功耗~3mW。Polar/Garmin同级别芯片方案。",
                highlight: true,
              },
              {
                name: "方案 B: AFE4960+TMP117",
                tag: "★★★★★ 最高精度",
                desc: "TI AFE4960是MAX30001的竞品，ECG+BioZ参数略优（24-bit ADC），但生态成熟度不如MAX30001。适合追求极致精度场景。BOM $12-21。",
                highlight: false,
              },
              {
                name: "方案 C: AD5940+MAX30001+MAX30205",
                tag: "★★★★ 最灵活",
                desc: "双AFE方案，AD5940独立处理BioZ，MAX30001专做ECG，MAX30205测温。灵活性最高但BOM成本也最高($18-27)，适合研究级产品。",
                highlight: false,
              },
              {
                name: "方案 D: AD8233+AD5941+NTC",
                tag: "★★★ 最低成本",
                desc: "AD8233做ECG(16-bit)，AD5941做BioZ，NTC热敏电阻测皮肤温度(精度~±0.5°C)。适合预算敏感的项目。BOM $11-17。",
                highlight: false,
              },
              {
                name: "方案 E: MAX86176+TMP117",
                tag: "★★★ 功能最全",
                desc: "MAX86176集成ECG+BioZ+PPG+SpO2，功能最全面但BOM较高($17-28)。适合想要额外光学传感的产品。",
                highlight: false,
              },
              {
                name: "方案 F: AD8233+分立+NTC",
                tag: "★★ 最精简",
                desc: "最简方案：AD8233做ECG + 分立电路做BioZ + NTC测温。BOM最低($5-10)但开发难度大、精度受限。",
                highlight: false,
              },
            ].map((chip) => (
              <TechCard
                key={chip.name}
                title={chip.name}
                subtitle={chip.tag}
                variant={chip.highlight ? "highlight" : "default"}
              >
                <p>{chip.desc}</p>
              </TechCard>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/technology/combinations"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 transition-colors text-sm"
            >
              查看完整组合方案详解 →
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Challenges */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              关键集成挑战
            </h2>
            <p className="text-[#94A3B8] max-w-xl">
              三合一不是三个传感器的简单叠加——跨传感器干扰、运动伪影、热隔离是核心工程挑战。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ChallengeCard
              title="ECG与BioZ共享电极串扰"
              severity="high"
              solution="MAX30001内置TDM隔离，四电极配置分离激励与感应通路，独立激励频率选择（50kHz BioZ不影响0.05-150Hz ECG）。"
            />
            <ChallengeCard
              title="运动伪影"
              severity="high"
              solution="RLS自适应滤波 + IMU运动状态感知 + 信号质量指数(SQI)门控。四电极干电极+医用导电硅胶优化接触阻抗。"
            />
            <ChallengeCard
              title="温度传感器热隔离"
              severity="medium"
              solution="PCB热隔离槽设计，TMP117独立热通量路径，传感器凸出接触皮肤。MCU自热补偿算法。"
            />
            <ChallengeCard
              title="多速率数据同步"
              severity="medium"
              solution="MCU硬件时间戳同步：ECG 250Hz / BioZ 64Hz / 温度 1Hz，统一数据包打包(BLE GATT notification)。"
            />
            <ChallengeCard
              title="BLE/ANT+协议适配"
              severity="medium"
              solution="BLE GHS v1.0规范含呼吸率数据，自定义Respiration Service (UUID自定义)。ANT+借道Muscle Oxygen Profile传体温(同CORE方案)。"
            />
            <ChallengeCard
              title="认证路径 (FDA/CE/NMPA)"
              severity="medium"
              solution="分阶段策略：Wellness → OTC (510k Class II) → 诊断级。ISO 13485 QMS + IEC 60601电气安全 + ISO 10993生物相容性。"
            />
          </div>
        </div>
      </section>

      {/* Deep-Read Navigation */}
      <section
        className="py-20 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(34,197,94,0.05), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              关键技术深度阅读
            </h2>
            <p className="text-[#94A3B8]">
              每个技术领域均有独立深度页面，覆盖从原理到工程实现的完整链路
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                href: "/technology/respiration",
                title: "呼吸检测技术",
                desc: "BioZ+EDR双模融合深度拆解，从物理原理到芯片实现",
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="1.5"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <path d="M4 22v-7" />
                  </svg>
                ),
              },
              {
                href: "/technology/temperature",
                title: "核心体温监测",
                desc: "单热流vs双热流对比，CORE 2独立验证数据与自研方案",
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                  >
                    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
                  </svg>
                ),
              },
              {
                href: "/technology/combinations",
                title: "硬件组合方案",
                desc: "二合一到三合一，六种芯片方案BOM与功耗完整对比",
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                ),
              },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="group">
                <div className="glass-card p-8 text-center h-full hover:-translate-y-1 transition-all duration-300 hover:border-green-500/20 cursor-pointer">
                  <div className="flex justify-center mb-4">{card.icon}</div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8]">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
