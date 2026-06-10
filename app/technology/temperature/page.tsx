import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";

/*
 * Helper Components
 * Following the patterns from /technology/page.tsx: glass-card, glass-card-elevated,
 * data-highlight, text-gradient, and glow-green utility classes from globals.css.
 */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={"mb-12 " + className}>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#94A3B8] max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

interface MetricCardProps {
  value: string;
  label: string;
  detail?: string;
}

function MetricCard({ value, label, detail }: MetricCardProps) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">
        {label}
      </div>
      {detail && (
        <div className="text-xs text-[#64748B] font-mono">{detail}</div>
      )}
    </div>
  );
}

interface InfoCardProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "highlight" | "teal";
  children: React.ReactNode;
}

function InfoCard({ title, subtitle, variant = "default", children }: InfoCardProps) {
  const base =
    variant === "highlight"
      ? "glass-card-elevated p-8 glow-green border-green-500/20"
      : variant === "teal"
        ? "glass-card-elevated p-8 glow-teal border-teal-500/20"
        : "glass-card p-6";

  return (
    <div className={base}>
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

interface PhaseCardProps {
  phase: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  highlight?: boolean;
}

function PhaseCard({ phase, title, subtitle, children, highlight = false }: PhaseCardProps) {
  return (
    <div
      className={
        highlight
          ? "glass-card-elevated p-8 glow-green border-green-500/20"
          : "glass-card p-6"
      }
    >
      <span className="inline-block text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 mb-3">
        {phase}
      </span>
      <h3
        className={
          "font-heading text-lg font-semibold mb-1 " +
          (highlight ? "text-green-400" : "text-white")
        }
      >
        {title}
      </h3>
      <p className="text-xs text-[#64748B] mb-3 font-mono">{subtitle}</p>
      <div className="text-sm text-[#94A3B8] leading-relaxed">{children}</div>
    </div>
  );
}

export default function TemperatureDeepDivePage() {
  return (
    <div className="page-enter">
      <PageHero
        title="核心体温监测"
        titleGradient="从皮肤到核心"
        subtitle="非侵入式核心体温测量技术的原理、路径与工程实现"
        badge={{ text: "Deep Dive · Core Temperature", color: "teal" }}
        description="核心体温是运动热管理中最关键也最难获取的生理参数。本页深入六大技术路径，从物理原理到芯片选型，从 CORE 2 的争议到下一代自研方案。"
      />

      {/* =========================================================================
          Section 1: 为什么核心体温是运动表现的关键瓶颈
          ========================================================================= */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "首页", href: "/" },
              { label: "技术全景", href: "/technology" },
              { label: "核心体温监测" },
            ]}
          />

          <SectionHeading
            title="为什么核心体温是运动表现的关键瓶颈"
            subtitle="核心体温是运动热管理中最核心的生理参数，直接决定运动表现的上限与安全边界。"
          />

          {/* Narrative */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="text-sm text-[#94A3B8] leading-relaxed space-y-4">
              <p>
                核心体温（Core Body Temperature, T_core）指人体深部器官的温度，正常范围维持在 36.5-37.5°C。
                在运动中，骨骼肌代谢产热使 T_core 快速上升——在高温高湿环境下，马拉松选手的 T_core 可在 30
                分钟内突破 39°C，铁人三项运动员在 Kona 世锦赛中的实测值甚至达到 40°C 以上。
              </p>
              <p>
                核心体温每升高 1°C，运动表现下降 2-5%。这不是一个经验推测，而是经过大量实验室与实地研究交叉验证的结论。
                高温导致的最大摄氧量（VO₂max）下降、计时赛功率输出衰减、以及主观疲劳感知（RPE）升高，均与 T_core 线性相关。
                Nybo et al.（2014, Comprehensive Physiology）的系统综述确认：当 T_core 从 37°C 升至 40°C，VO₂max
                下降约 15-20%，而计时赛完赛时间延长 8-12%。
              </p>
              <p>
                热应激的核心机制是中枢神经系统（CNS）疲劳。当下丘脑检测到 T_core 超过阈值（通常约 39°C），会主动减少运动神经元募集，
                降低骨骼肌自主收缩力——这是一种保护性抑制，防止器官损伤。你无法依靠意志力克服它：即使你精神上还想继续，
                CNS 的"中央调控器"已经开始降档。这种中枢疲劳与传统的外周肌肉疲劳（乳酸堆积、糖原耗尽）是完全不同的生理通路。
              </p>
            </div>
            <div className="text-sm text-[#94A3B8] leading-relaxed space-y-4">
              <p>
                核心体温数据在训练与比赛中有四个不可替代的应用价值：
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-[#94A3B8]">
                <li>
                  <span className="font-semibold text-white">热适应训练的量化依据：</span>
                  科学的热适应训练需要 T_core 维持在 38.5-39.5°C 至少 60 分钟，刺激血浆容量扩张和出汗速率提升。
                  缺乏 T_core 数据的训练只是"感觉热"，无法确认生理适应是否真正发生。反复暴露 7-14 天后，
                  同等运动强度下 T_core 上升幅度下降 0.2-0.5°C，出汗阈值降低，这是可量化的适应金标准。
                </li>
                <li>
                  <span className="font-semibold text-white">比赛日热管理策略的决策依据：</span>
                  T_core 实时数据可用于制定预冷（pre-cooling）方案（冰背心、冷水浸泡）、赛中冷却策略（冰浆摄入、
                  颈部冷敷）、以及补水速率调整。UCI 世巡赛车队在极端高温赛段中依赖 T_core
                  数据决定何时暂停积极领骑、何时补充冰背心、以及何时启动"被动骑行"模式降低产热。
                </li>
                <li>
                  <span className="font-semibold text-white">安全性：劳力性热射病预防：</span>
                  劳力性热射病（Exertional Heat Stroke, EHS）是运动中最危险的急性损伤之一，死亡率约 5-10%
                  （尽早识别并快速降温可将死亡率降至接近零）。EHS 的定义是 T_core &gt; 40.5°C 且出现 CNS 功能障碍（意识混乱、
                  行为异常、昏迷）。连续 T_core 监测能提供 10-20 分钟的预警窗口——远超主观感知和外部症状的延迟。
                  美国军方、NFL 和 NCAA 均已在高温训练中强制使用某种形式的 T_core 监测。
                </li>
                <li>
                  <span className="font-semibold text-white">恢复与睡眠质量的评估：</span>
                  入睡前 T_core 下降约 1°C 是正常入睡的必要条件。运动后 T_core 持续偏高（&gt; 37.5°C
                  在入睡前）是恢复不足和自主神经失衡的标志，与深睡眠减少和次日训练表现下降显著相关。
                </li>
              </ol>
            </div>
          </div>

          {/* Current State */}
          <div className="data-highlight mb-8">
            <p className="text-sm text-[#94A3B8]">
              <span className="font-semibold text-white">当前实践：</span>
              传统金标准——可吞服温度药丸（ingestible pill）和直肠探头——精度可达 ±0.1°C，但侵入性使其无法在日常训练中使用。
              2019年，CORE 传感器（瑞士 greenteg AG）将单热流法（Single Heat Flux, SHF）从临床领域带入消费级运动市场，
              迅速成为世巡赛车队的事实标准。截至2025年，超过 65% 的 UCI WorldTour 车队使用 CORE，
              2025年环法自行车赛（TdF）21个赛段中 17 位赛段冠军在比赛日佩戴了 CORE。
              然而，关于 CORE 准确性的独立验证结果呈现显著分歧——这是本页后续将深入分析的核心议题。
            </p>
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard
              value="2-5%"
              label="性能衰减"
              detail="每升高1°C"
            />
            <MetricCard
              value="65%+"
              label="WT 车队使用率"
              detail="CORE传感器"
            />
            <MetricCard
              value="17/21"
              label="TdF 2025"
              detail="赛段冠军佩戴CORE"
            />
            <MetricCard
              value="±0.1°C"
              label="金标准精度"
              detail="可吞服药丸/直肠"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 2: 六大技术路线全景对比
          ========================================================================= */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="六大技术路线全景对比"
            subtitle="从单热流法到心率模型估算，六种非侵入式核心体温测量技术各有优劣。理解物理原理是选型的前提。"
          />

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[13%]">技术名称</th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[12%]">英文名</th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[25%]">物理原理</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal w-[10%]">精度</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal w-[8%]">响应</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal w-[7%]">功耗</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal w-[7%]">穿戴性</th>
                  <th className="text-center py-3 px-3 text-[#94A3B8] font-normal w-[9%]">商用状态</th>
                  <th className="text-left py-3 px-3 text-[#94A3B8] font-normal w-[9%]">代表产品</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  {
                    name: "单热流法",
                    en: "Single Heat Flux (SHF)",
                    principle:
                      "单热通量传感器测量皮肤→环境散热速率，结合傅里叶定律 q = -k·dT/dx 与 AI 算法反推核心温度。核心温度 = 皮肤温度 + 补偿量（基于热通量+环境温度+个体参数）。原理简单、成本最低，但需个体校准。",
                    accuracy: "±0.2-0.7°C",
                    response: "慢（数分钟）",
                    power: "低",
                    wearability: "★★★★★",
                    commercial: "已量产上市",
                    product: "CORE 2 ($295)",
                    highlight: true,
                    color: "green",
                  },
                  {
                    name: "双热流法",
                    en: "Dual Heat Flux (DHF)",
                    principle:
                      "两个串联热通量传感器，测量绝缘层两侧的温度梯度，通过热阻网络方程组求解核心→皮肤热通量，再反向推算核心温度。消除单热流法中个体组织热导率差异的影响。校准一次后无需重复校准。",
                    accuracy: "±0.1-0.3°C",
                    response: "中（数十秒）",
                    power: "中",
                    wearability: "★★★★☆",
                    commercial: "临床验证/试产",
                    product: "Murata Moni-Patch",
                    highlight: true,
                    color: "cyan",
                  },
                  {
                    name: "零热流法",
                    en: "Zero Heat Flux (ZHF)",
                    principle:
                      "主动加热皮肤表面，当传感器检测到皮肤→传感器热通量归零时，皮肤温度 = 核心温度（热平衡原理）。理想情况下为无创测量的金标准。需主动加热元件和 PID 控制。",
                    accuracy: "±0.1-0.2°C",
                    response: "快（主动加热）",
                    power: "高",
                    wearability: "★☆☆☆☆",
                    commercial: "仅临床用",
                    product: "3M Bair Hugger",
                    highlight: false,
                    color: "",
                  },
                  {
                    name: "可吞服药丸",
                    en: "Ingestible Pill",
                    principle:
                      "吞服含温度传感器+无线发射器的胶囊，通过胃肠道温度近似核心温度。胶囊经过消化道时持续发送温度数据，最终随粪便排出。金标准精度，但单次使用成本高。",
                    accuracy: "±0.1°C",
                    response: "快（实时）",
                    power: "N/A（内置电池）",
                    wearability: "★★☆☆☆",
                    commercial: "已量产上市",
                    product: "e-Celsius ($50-100/颗)",
                    highlight: false,
                    color: "",
                  },
                  {
                    name: "入耳式/鼓膜",
                    en: "Tympanic / In-Ear",
                    principle:
                      "鼓膜温度近似下丘脑温度（体温调节中枢）。入耳式设备通过红外热释电传感器或NTC热敏电阻测量外耳道/鼓膜温度。下丘脑供血动脉与鼓膜共用颈内动脉分支，血液动力学上最接近核心。",
                    accuracy: "±0.2-0.5°C",
                    response: "快（秒级）",
                    power: "中",
                    wearability: "★★★☆☆",
                    commercial: "少量上市",
                    product: "Vitarate VTB01",
                    highlight: false,
                    color: "",
                  },
                  {
                    name: "心率模型估算",
                    en: "HR-Based Model",
                    principle:
                      "利用心率 + 加速度计 + 环境温度 → 机器学习模型（随机森林/LSTM）估算核心温度。基于心率与T_core的线性漂移关系（心血管热漂移）以及加速度计对运动强度/代谢产热的间接测量。",
                    accuracy: "±0.3-0.5°C",
                    response: "慢（模型推断）",
                    power: "零增量",
                    wearability: "★★★★★",
                    commercial: "纯研究阶段",
                    product: "学术原型",
                    highlight: false,
                    color: "",
                  },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={
                      row.highlight
                        ? row.color === "cyan"
                          ? "bg-cyan-500/5 border border-cyan-500/10"
                          : "bg-green-500/5 border border-green-500/10"
                        : "hover:bg-white/[0.02]"
                    }
                  >
                    <td className="py-3 px-3">
                      <span
                        className={
                          row.highlight
                            ? row.color === "cyan"
                              ? "text-cyan-400 font-semibold"
                              : "text-green-400 font-semibold"
                            : "text-white"
                        }
                      >
                        {row.name}
                        {row.highlight && row.color === "green" && " ⭐"}
                        {row.highlight && row.color === "cyan" && " ⭐推荐自研"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#64748B] font-mono">{row.en}</td>
                    <td className="py-3 px-3 text-[#94A3B8] text-xs leading-relaxed">
                      {row.principle}
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">
                      {row.accuracy}
                    </td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">{row.response}</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">{row.power}</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">{row.wearability}</td>
                    <td className="py-3 px-3 text-center text-[#94A3B8]">{row.commercial}</td>
                    <td className="py-3 px-3 text-[#94A3B8] font-mono">{row.product}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data-highlight">
            <p className="text-sm text-[#94A3B8]">
              <span className="font-semibold text-cyan-400">推荐方向：</span>
              双热流法（DHF）是自研方案的最优技术路径。相比单热流法（SHF），DHF
              通过两个串联传感器消除了对个体组织热导率参数的依赖，精度提升 50-70%，
              同时保持了可穿戴设备所需的低功耗和胸带形态兼容。Murata Moni-Patch 的临床验证
              已证明该路径的可行性。后续 Section 3 将全面拆解 DHF 的物理模型与工程实现。
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 3: 双热流法深度拆解
          ========================================================================= */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="双热流法深度拆解"
            subtitle="这是本页的核心技术章节。从傅里叶定律到 Kalman 滤波，从芯片选型到高级指标生成——DHF 的完整工程链路。"
          />

          {/* 3.1 物理原理 */}
          <div className="mb-12">
            <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-mono">
                3.1
              </span>
              物理原理
            </h3>

            <div className="grid lg:grid-cols-2 gap-6">
              <InfoCard
                title="傅里叶热传导定律"
                subtitle="q = -k · dT/dx"
                variant="teal"
              >
                <div className="space-y-3">
                  <p>
                    双热流法的物理基础是傅里叶热传导定律。热通量 q（单位：W/m²）等于材料热导率
                    k（W/(m·K)）乘以温度梯度的负值 dT/dx（K/m）。负号表示热量从高温流向低温。
                  </p>
                  <p>
                    在胸带形态下，热量的完整路径为：
                  </p>
                  <div className="font-mono text-xs bg-[#0A1120] rounded-lg p-4 border border-white/[0.06]">
                    <p className="text-cyan-400">核心体温 T_core</p>
                    <p className="text-[#64748B]">↓ 热通量 q_in （皮下组织传导）</p>
                    <p className="text-cyan-400">皮肤温度 T_skin</p>
                    <p className="text-[#64748B]">↓ 热通量 q1 （传感器1 + 绝缘层R1）</p>
                    <p className="text-cyan-400">第一传感器温度 T1</p>
                    <p className="text-[#64748B]">↓ 热通量 q2 （绝缘层R2）</p>
                    <p className="text-cyan-400">第二传感器温度 T2</p>
                    <p className="text-[#64748B]">↓ 热通量 q_out （环境散热）</p>
                    <p className="text-cyan-400">环境温度 T_ambient</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard
                title="双热流方程系统"
                subtitle="Two-Equation Solving"
                variant="teal"
              >
                <div className="space-y-3">
                  <p>
                    两个串联的热通量传感器产生两个独立的热传导方程。系统通过联立求解消除
                    个体差异参数（如皮下脂肪厚度、组织热导率），从而获得更准确的核心温度估计。
                  </p>
                  <div className="data-highlight">
                    <p className="text-xs font-mono text-[#94A3B8]">
                      方程1: q1 = (T_skin - T1) / R1<br />
                      方程2: q2 = (T1 - T2) / R2<br />
                      其中 R1, R2 为传感器绝缘层的已知热阻（设计参数）。<br />
                      在稳态条件下 q1 ≈ q2（热通量守恒），因此：<br />
                      从核心到皮肤的热通量 q_in = (T1 - T2) / (R1 + R2)<br />
                      核心温度 T_core = T_skin + q_in × R_tissue
                    </p>
                  </div>
                  <p>
                    其中 R_tissue 是皮下组织的等效热阻，由个体参数（脂肪厚度、血灌注率）决定。
                    DHF 的核心优势在于：q_in 由两个传感器直接测量（而非单热流法的间接推断），
                    R_tissue 可以通过一次初始校准（与金标准对比）确定，此后无需重复校准。
                  </p>
                </div>
              </InfoCard>
            </div>
          </div>

          {/* 3.2 基础指标采集 */}
          <div className="mb-12">
            <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-mono">
                3.2
              </span>
              基础指标采集 — 传感器规格与选型
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-white mb-2">皮肤温度 T_skin</h4>
                <p className="text-xs text-green-400 font-mono mb-2">TMP117</p>
                <div className="text-xs text-[#94A3B8] space-y-1">
                  <p>精度: ±0.1°C (max ±0.3°C)</p>
                  <p>分辨率: 0.0078°C (16-bit)</p>
                  <p>功耗: 3.5μA@1Hz</p>
                  <p>封装: WSON-6 2×2mm</p>
                  <p className="text-[#64748B] font-mono mt-2">
                    ASTM E1112 / ISO 80601-2-56<br />
                    医疗级认证
                  </p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-white mb-2">热通量 q</h4>
                <p className="text-xs text-green-400 font-mono mb-2">自制热电堆 / greenteg gSKIN</p>
                <div className="text-xs text-[#94A3B8] space-y-1">
                  <p>感度: ~10-50 μV/(W/m²)</p>
                  <p>热阻: 已知固定值 (设计确定)</p>
                  <p>尺寸: 需定制（4-8mm 直径）</p>
                  <p>接口: 高阻输入 + 仪表放大器</p>
                  <p className="text-[#64748B] font-mono mt-2">
                    greenteg gSKIN-XO 需要许可协议<br />
                    自制方案需精密热电堆工艺
                  </p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-white mb-2">环境温度 T_ambient</h4>
                <p className="text-xs text-green-400 font-mono mb-2">辅助 NTC / SHT31</p>
                <div className="text-xs text-[#94A3B8] space-y-1">
                  <p>精度: ±0.2°C (NTC) / ±0.3°C (SHT31)</p>
                  <p>额外: 可同时获取环境湿度</p>
                  <p>位置: PCB 背面 (远离皮肤接触面)</p>
                  <p>用途: 热通量校准 + 环境应力评估</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-white mb-2">采样与处理</h4>
                <p className="text-xs text-green-400 font-mono mb-2">1 Hz 采样率</p>
                <div className="text-xs text-[#94A3B8] space-y-1">
                  <p>原因: 核心体温变化缓慢</p>
                  <p>（通常 &lt; 0.05°C/min）</p>
                  <p>ADC: nRF52840 内置 12-bit SAADC</p>
                  <p>（TMP117 可选用 I²C 数字输出）</p>
                  <p className="text-[#64748B] font-mono mt-2">
                    热电堆信号需先经仪表放大器<br />
                    （INA333/AD8237）再送 ADC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3.3 算法链路 */}
          <div className="mb-12">
            <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-mono">
                3.3
              </span>
              从基础指标到高级指标 — 完整算法链路
            </h3>

            <div className="grid lg:grid-cols-3 gap-5 mb-8">
              {[
                {
                  step: "Step 1",
                  title: "信号预处理",
                  desc: "原始热通量 + 温度信号 → 低通滤波 (0.01 Hz 截止频率，二阶 Butterworth)。去除高频噪声和运动引入的瞬态扰动。温度传感器时间常数对齐（TMP117 响应快于热电堆，需软件同步）。",
                },
                {
                  step: "Step 2",
                  title: "双热流方程求解",
                  desc: "联立傅里叶方程组，计算从核心到皮肤的热通量 q_in = (T1 - T2) / (R1 + R2)。得到 T_core 初始估计值。此步骤不依赖个体参数。",
                },
                {
                  step: "Step 3",
                  title: "Kalman 滤波状态估计",
                  desc: "状态变量：T_core（核心温度）。观测变量：T_skin + q（皮肤温度 + 热通量）。过程噪声 Q 设为 1×10⁻⁴（缓慢变化），观测噪声 R 根据传感器规格动态调整。输出平滑的 T_core 估计序列。",
                },
                {
                  step: "Step 4",
                  title: "个体参数校准",
                  desc: "校准参数：皮下组织等效热阻 R_tissue + 代谢率基础值。初始校准方法：休息态与金标准（可吞服药丸）对比采集 10 分钟数据，回归拟合得到个人化 R_tissue。体脂%可辅助初始估计。",
                },
                {
                  step: "Step 5",
                  title: "运动/环境补偿",
                  desc: "加速度计判定运动状态（静止/步行/跑步/骑行）。环境温度 + 风速估计（或用户输入）修正环境散热系数。风速每增加 1 m/s，皮肤表面对流传热系数增加约 30%。",
                },
                {
                  step: "Step 6",
                  title: "趋势平滑 + 置信度输出",
                  desc: "Savitzky-Golay 滤波器平滑 T_core 趋势（窗口 60 点 = 60 秒），输出最终 T_core ± 1σ 置信区间。置信区间宽度取决于传感器信号质量（SQI）和 Kalman 滤波器协方差矩阵的迹。",
                },
              ].map((item) => (
                <div key={item.step} className="glass-card p-6 border-t-2 border-cyan-500/30">
                  <span className="text-xs font-mono text-cyan-400">{item.step}</span>
                  <h4 className="text-sm font-semibold text-white mt-1 mb-2">{item.title}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Derived Metrics */}
            <h4 className="font-heading text-lg font-semibold text-white mb-4">
              衍生高级指标
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  name: "核心-皮肤梯度",
                  en: "Core-Skin Gradient",
                  formula: "T_core - T_skin",
                  desc: "体温调节效率：梯度增大表示散热不足。正常值 1-3°C，> 5°C 提示严重热应激。",
                },
                {
                  name: "热应变指数",
                  en: "Heat Strain Index",
                  formula: "0-10 分制",
                  desc: "基于T_core趋势+累积热暴露时间+环境温湿度计算。≥7应减少运动强度。",
                },
                {
                  name: "热适应状态",
                  en: "Thermal Adaptation Status",
                  formula: "基线对比",
                  desc: "同等训练负荷下T_core上升幅度较热适应前下降0.2-0.5°C即表示适应完成。",
                },
                {
                  name: "心血管热漂移",
                  en: "CV Thermal Drift",
                  formula: "ΔHR / ΔT_core",
                  desc: "T_core升高→心率漂移（恒定功率下HR缓慢上升）。估算心血管应变和血浆容量变化。",
                },
                {
                  name: "热性过度通气",
                  en: "Thermal Hyperventilation",
                  formula: "T_core + RR",
                  desc: "T_core > ~39°C 时呼吸频率异常升高（独立于代谢需求），是热衰竭前兆。",
                },
              ].map((metric) => (
                <div key={metric.name} className="glass-card p-5">
                  <h5 className="text-xs font-semibold text-white mb-1">{metric.name}</h5>
                  <p className="text-[10px] text-[#64748B] font-mono mb-2">{metric.en}</p>
                  <p className="text-xs text-green-400 font-mono mb-1">{metric.formula}</p>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3.4 推荐芯片组合 */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-mono">
                3.4
              </span>
              推荐芯片组合
            </h3>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="glass-card-elevated p-8 glow-teal border-teal-500/20">
                <h4 className="text-sm font-semibold text-white mb-1">温度传感器</h4>
                <p className="text-xs text-teal-400 font-mono mb-3">TMP117</p>
                <div className="text-xs text-[#94A3B8] space-y-2">
                  <p>TI 医疗级数字温度传感器，NIST 可溯源精度</p>
                  <p>±0.1°C (max ±0.3°C across -20 to +50°C)</p>
                  <p>I²C/SMBus 接口，16-bit ΔΣ ADC</p>
                  <p>3.5μA average @ 1 Hz (ultra-low power)</p>
                  <p>WSON-6, 2.0×2.0mm</p>
                  <p className="text-[#64748B] mt-2">替代方案 (成本优先): TMP112 (±0.5°C)</p>
                </div>
              </div>

              <div className="glass-card-elevated p-8 glow-teal border-teal-500/20">
                <h4 className="text-sm font-semibold text-white mb-1">热通量传感器</h4>
                <p className="text-xs text-teal-400 font-mono mb-3">定制热电堆 / greenteg gSKIN-XO</p>
                <div className="text-xs text-[#94A3B8] space-y-2">
                  <p>自制：精密 Seebeck 效应热电堆</p>
                  <p>灵敏度 ~10-50 μV/(W/m²)</p>
                  <p>已知固定热阻 R_sensor（设计参数）</p>
                  <p>尺寸 4-8mm 直径，厚度 &lt; 0.5mm</p>
                  <p>串联布置：两枚传感器通过绝缘层热连接</p>
                  <p className="text-[#64748B] mt-2">需要仪表放大器前端 (INA333/AD8237)</p>
                </div>
              </div>

              <div className="glass-card-elevated p-8 glow-teal border-teal-500/20">
                <h4 className="text-sm font-semibold text-white mb-1">MCU & 无线</h4>
                <p className="text-xs text-teal-400 font-mono mb-3">nRF52840</p>
                <div className="text-xs text-[#94A3B8] space-y-2">
                  <p>Nordic Semiconductor ARM Cortex-M4F @ 64 MHz</p>
                  <p>内置 12-bit SAADC (200 ksps, 8-ch)</p>
                  <p>BLE 5.4 + ANT+ 双模并发</p>
                  <p>1 MB Flash / 256 kB RAM</p>
                  <p>运行 DHF Kalman 滤波器 + 全协议栈绰绰有余</p>
                  <p className="text-[#64748B] mt-2">可用于 ADC 直接采样热电堆信号 (经仪表放大器后)</p>
                </div>
              </div>
            </div>

            <div className="data-highlight mt-6">
              <p className="text-sm text-[#94A3B8]">
                <span className="font-semibold text-cyan-400">BOM 估算：</span>
                上述芯片组合（TMP117 ×1 + 自制热电堆 ×2 + INA333 ×2 + nRF52840 ×1 + 外围被动元件 +
                Li-Po 电池 100mAh）物料成本约 $8-14（批量），PCB 组装成本另计。
                相比 CORE 2 零售价 $295，自研 DHF 方案有巨大的成本优势，且精度更优。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 4: CORE 2 深度分析
          ========================================================================= */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="CORE 2 深度分析"
            subtitle="市场份额最大的非侵入式核心体温传感器 — 技术细节、验证数据、争议与启示。"
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Overview Card */}
            <InfoCard
              title="CORE 2 概述"
              subtitle="greenteg AG (Switzerland) · CES 2025 发布"
              variant="highlight"
            >
              <div className="space-y-2">
                <p>技术路线: 单热流法 (Single Heat Flux, SHF)</p>
                <p>尺寸: 41.9 × 29.4 × 7.1 mm</p>
                <p>重量: 8.6g</p>
                <p>电池: 可充电锂聚合物，续航 ~6 天 (24/7 模式)</p>
                <p>无线: BLE 5.0 + ANT+</p>
                <p>防水: IPX7 (1 米 / 30 分钟)</p>
                <p>充电: 磁吸充电器 (USB-C 输入)</p>
                <p>厂商宣称精度: ±0.21°C (MAE)</p>
                <p>零售价: $294.95</p>
                <p>配件: 需要胸带夹 (HRM 胸带兼容) 或皮肤贴片</p>
              </div>
            </InfoCard>

            {/* Validation Card */}
            <InfoCard
              title="独立验证 — Verdel et al. 2021"
              subtitle="Sensors (MDPI) · PMC8434645"
              variant="default"
            >
              <div className="space-y-2">
                <p className="font-semibold text-white text-xs">关键发现：</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>测试对象：12 名自行车运动员，室内骑行至力竭</li>
                  <li>金标准对照：e-Celsius 可吞服药丸</li>
                  <li>551 个配对数据点 (T_core 范围: ~37.0-39.5°C)</li>
                  <li className="text-amber-400">
                    <span className="font-semibold">仅 51%</span> 的配对值在 ≤0.3°C 阈值内（稳态条件）
                  </li>
                  <li className="text-amber-400">
                    运动条件下 <span className="font-semibold">仅 45%</span> 在 ≤0.3°C 内
                  </li>
                  <li>
                    95% 一致性界限 (LoA): <span className="text-red-400">-0.38°C 至 +0.72°C</span>
                  </li>
                  <li>CORE 系统性低估 T_core (平均偏差 -0.13°C)</li>
                  <li>个体间差异巨大（某人偏差 -1.2°C）</li>
                </ul>
              </div>
            </InfoCard>

            {/* Goods et al. 2023 Card */}
            <InfoCard
              title="独立验证 — Goods et al. 2023"
              subtitle="European Journal of Sport Science"
              variant="default"
            >
              <div className="space-y-2">
                <p className="font-semibold text-white text-xs">关键发现：</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>测试对象：精英/亚精英耐力运动员</li>
                  <li>场景：实地户外训练（非实验室环境）</li>
                  <li>与可吞服药丸的一致性被评定为 <span className="text-red-400">"poor" (差)</span></li>
                  <li>环境变化（风、太阳辐射）显著影响 SHF 精度</li>
                  <li>皮肤血流变化（运动、情绪）引入额外误差</li>
                  <li className="text-amber-400">
                    静态环境温湿度变化即可导致 0.2-0.4°C 漂移
                  </li>
                  <li>结论：适用于趋势监测，<span className="text-red-400">不适合作为体温计替代品</span></li>
                </ul>
              </div>
            </InfoCard>
          </div>

          {/* Market & Protocol */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6">
              <h4 className="text-sm font-semibold text-white mb-3">市场表现与车队采用</h4>
              <div className="text-xs text-[#94A3B8] space-y-2">
                <p>超过 65% 的 UCI WorldTour 车队在 2025 赛季使用 CORE。</p>
                <p>2026 赛季：10 支官方车队合作伙伴关系（包括 Visma-Lease a Bike, UAE Team Emirates, INEOS Grenadiers）。</p>
                <p>三大环赛 (Grand Tours) 2025: 环意 14/21、环法 17/21、环西 15/21 赛段冠军佩戴 CORE。</p>
                <p>铁人三项：Ironman 世界锦标赛 2024/2025 男女冠军均使用 CORE。</p>
                <p className="text-[#64748B] mt-1">
                  核心洞察：虽然精度有争议，但市场已验证"运动核心体温"这一需求真实存在且用户愿意付费。大量车队基于 CORE 数据制定热管理和补给策略，证明 TREND 信息 &gt; NO 信息。
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-sm font-semibold text-white mb-3">协议与生态整合策略</h4>
              <div className="text-xs text-[#94A3B8] space-y-2">
                <p>
                  <span className="text-green-400 font-semibold">值得注意：</span>CORE 没有专用的 ANT+ 温度 Profile。
                  ANT+ 官方标准中不存在核心体温 Device Profile。CORE 采用了一个巧妙的变通方案：
                </p>
                <div className="bg-[#020617] rounded-lg p-3 border border-white/[0.06] font-mono text-[#64748B]">
                  <p>CORE → Garmin: 借道 <span className="text-green-400">ANT+ Muscle Oxygen Profile (0x0031)</span></p>
                  <p>SmO₂ 字段被重新映射为 T_core 值</p>
                  <p>需要安装 Connect IQ Data Field 进行解码显示</p>
                  <p>BLE: 自定义 Service UUID，GATT 直接传输</p>
                  <p>Wahoo/Garmin 均已原生支持 CORE BLE 配对</p>
                </div>
                <p className="text-[#64748B] mt-2">
                  启示：自研方案应走同样的路径（借用现有 ANT+ Profile + Connect IQ Data Field），
                  或推动 ANT+ 联盟建立专用 Core Temperature Profile（行业级影响力 play）。
                </p>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="data-highlight">
            <p className="text-sm text-[#94A3B8]">
              <span className="font-semibold text-white">核心洞察：</span>
              CORE 2 的市场成功证明，即使精度存在争议，运动核心体温监测仍是一个被验证的大市场。
              独立验证揭示的精度不足 (LoA -0.38 至 +0.72°C) 恰恰是自研 DHF 方案的差异化空间。
              双热流法可将精度提升到 ±0.1-0.3°C，同时消除个体校准的不确定性——这是 SHF 无法做到的。
              市场已经教育好，产品已经验证需求，剩下的是用更好的技术吃掉份额。
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 5: 商用与前沿方案
          ========================================================================= */}
      <section className="bg-[#020617] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="商用与前沿方案"
            subtitle="涵盖消费级、临床级和研究级三个层次的现有方案，以及值得关注的前沿技术方向。"
          />

          {/* Commercial Products */}
          <h3 className="font-heading text-lg font-semibold text-white mb-4">消费级商用方案</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              {
                name: "CORE 2",
                maker: "greenteg AG (CH)",
                tech: "SHF 单热流法",
                accuracy: "±0.2-0.7°C (实测)",
                price: "$294.95",
                note: "市场领导者，65%+ WT 车队采用",
              },
              {
                name: "Calera Research",
                maker: "greenteg OEM",
                tech: "SHF 单热流法",
                accuracy: "±0.2-0.5°C (估计)",
                price: "~1,195 CHF",
                note: "研究级 SDK，原始数据输出，Matlab/Python 接口",
              },
              {
                name: "Vitarate VTB01",
                maker: "Vitarate (JP)",
                tech: "入耳式 鼓膜红外",
                accuracy: "±0.2-0.5°C",
                price: "未公开",
                note: "穿戴舒适性有待验证，长时佩戴体验差",
              },
              {
                name: "e-Celsius",
                maker: "BodyCap (FR)",
                tech: "可吞服胶囊",
                accuracy: "±0.1°C (金标准)",
                price: "$50-100/颗",
                note: "单次使用，比赛日金标准验证用",
              },
              {
                name: "CorTemp",
                maker: "HQ Inc. (US)",
                tech: "可吞服胶囊",
                accuracy: "±0.1°C",
                price: "$40-80/颗",
                note: "NFL/军方验证标准，262 kHz 无线",
              },
            ].map((product) => (
              <div key={product.name} className="glass-card p-5">
                <h5 className="text-sm font-semibold text-white mb-0.5">{product.name}</h5>
                <p className="text-[10px] text-[#64748B] font-mono mb-2">{product.maker}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-[#94A3B8]">{product.tech}</p>
                  <p className="text-green-400 font-mono">{product.accuracy}</p>
                  <p className="text-[#64748B] font-mono">{product.price}</p>
                  <p className="text-[#64748B] mt-2 leading-relaxed">{product.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Grade */}
          <h3 className="font-heading text-lg font-semibold text-white mb-4">临床级方案</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <div className="glass-card p-6">
              <h4 className="text-sm font-semibold text-white mb-1">3M Bair Hugger 体温管理系统</h4>
              <p className="text-xs text-[#64748B] font-mono mb-3">ZHF 零热流法 · 金标准无创测量</p>
              <div className="text-xs text-[#94A3B8] space-y-1">
                <p>核心技术：主动加热+闭环PID控温 → 热通量归零 → 皮肤温度 = 核心温度</p>
                <p>精度：±0.1°C（与肺动脉导管对比验证）</p>
                <p>临床应用：围手术期体温管理（全球装机量超 10 万台）</p>
                <p>不可穿戴：需要交流供电、大体积加热垫和控制器</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-sm font-semibold text-white mb-1">3M SpotOn 温度监测系统</h4>
              <p className="text-xs text-[#64748B] font-mono mb-3">ZHF 零热流法 · 单点粘附免手持</p>
              <div className="text-xs text-[#94A3B8] space-y-1">
                <p>Bair Hugger 的便携化版本，一次性贴片粘附于额头</p>
                <p>精度：±0.1°C（ISO 80601-2-56 认证）</p>
                <p>单贴片成本 $10-20，不适合日常运动使用</p>
                <p>核心价值：为 DHF 方案的精度目标提供了临床级对照基准</p>
              </div>
            </div>
          </div>

          {/* Frontier Research */}
          <h3 className="font-heading text-lg font-semibold text-white mb-4">前沿研究方向</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "微波辐射测量",
                en: "Microwave Radiometry",
                desc: "测量深部组织（2-5cm 深度）的自然微波热辐射（~1-4 GHz）。根据 Planck 黑体辐射定律，组织温度决定辐射强度。非接触、穿透深度大，但天线体积大，运动伪影严重。目前主要用于乳腺癌热成像筛查。",
              },
              {
                title: "超声测温法",
                en: "Ultrasonic Thermometry",
                desc: "组织中的声速随温度变化（~2-4 m/s/°C），通过测量超声回波时间变化（ΔTOF）估算组织温度。非侵入、可测温深度大（cm 级），但需耦合剂，算法复杂，受组织异质性影响大。",
              },
              {
                title: "多传感器融合+深度学习",
                en: "Multi-Sensor DL Fusion",
                desc: "输入：T_skin + 心率 + 加速度计 + 环境温度 + 湿度。LSTM/Transformer 深度学习模型直接回归 T_core。无需专用热通量传感器，BOM 成本极低。瓶颈在于大规模训练数据采集（需金标准标注）。",
              },
              {
                title: "柔性热通量阵列",
                en: "Flexible Heat Flux Array",
                desc: "多点热通量传感器组成的柔性阵列（4-16 点），覆盖更大的皮肤区域，通过空间平均消除局部血流的随机误差。柔性 PCB 工艺（聚酰亚胺基底），可与胸带曲率共形。精度理论上可达 ±0.1°C。",
              },
            ].map((research) => (
              <div key={research.title} className="glass-card p-5 border-t-2 border-amber-500/20">
                <h5 className="text-xs font-semibold text-white mb-0.5">{research.title}</h5>
                <p className="text-[10px] text-amber-400 font-mono mb-2">{research.en}</p>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">{research.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 6: 自研方案建议
          ========================================================================= */}
      <section className="bg-[#0A1120] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title="自研方案建议"
            subtitle="三阶段策略：从快速上市到差异化壁垒，最后以 AI 模型实现长期护城河。"
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <PhaseCard
              phase="Phase 1"
              title="快速上市 — 整合 greenteg Calera"
              subtitle="时间: 6-9 个月 · 风险: 低 · 技术壁垒: 低"
            >
              <div className="space-y-2">
                <p className="font-semibold text-white text-xs">策略：</p>
                <p>直接集成或许可 greenteg Calera Research 的 SHF 模块。Calera 提供完整的 OEM 解决方案：传感器硬件 + 嵌入式算法固件 + 原始数据 SDK。最快路径将核心体温功能加入自研胸带。</p>
                <p className="font-semibold text-white text-xs mt-2">优势：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>成熟验证的精度（与 CORE 2 相同平台）</li>
                  <li>最小化内部研发投入</li>
                  <li>快速建立市场存在感</li>
                  <li>greenteg 的持续固件更新</li>
                </ul>
                <p className="font-semibold text-red-400 text-xs mt-2">风险：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>供应商依赖，议价能力弱</li>
                  <li>与 CORE 2 无本质差异化</li>
                  <li>SHF 精度天花板已被验证</li>
                  <li>许可费用侵蚀利润</li>
                </ul>
              </div>
            </PhaseCard>

            <PhaseCard
              phase="Phase 2"
              title="差异化 — 自研 DHF 方案 ⭐"
              subtitle="时间: 12-18 个月 · 风险: 中 · 技术壁垒: 高"
              highlight
            >
              <div className="space-y-2">
                <p className="font-semibold text-green-400 text-xs">策略：</p>
                <p>基于双热流法（DHF）原理，自研传感器硬件 + 嵌入式算法。参考 Murata Moni-Patch 的临床验证架构：串联热电堆对 + TMP117 医疗级皮肤温度传感 + 已知热阻绝缘层。这是建立技术护城河的核心一步。</p>
                <p className="font-semibold text-green-400 text-xs mt-2">关键 IP 机会：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>定制热电堆设计与制造工艺</li>
                  <li>DHF 个人化校准算法</li>
                  <li>运动/环境自适应补偿模型</li>
                  <li>热通量传感器-胸带集成结构设计</li>
                </ul>
                <p className="font-semibold text-green-400 text-xs mt-2">优势：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>精度预期 ±0.1-0.3°C（显著优于 CORE）</li>
                  <li>不依赖第三方供应商</li>
                  <li>可申请核心专利</li>
                  <li>临床验证后可进入医疗级市场</li>
                </ul>
                <p className="font-semibold text-amber-400 text-xs mt-2">挑战：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>热电堆精密制造（需合作封装厂）</li>
                  <li>大规模金标准验证数据采集</li>
                  <li>算法开发与安全认证周期</li>
                </ul>
              </div>
            </PhaseCard>

            <PhaseCard
              phase="Phase 3"
              title="AI 增强 — 多传感器融合模型"
              subtitle="时间: 18-24 个月 · 风险: 中高 · 技术壁垒: 最高"
            >
              <div className="space-y-2">
                <p className="font-semibold text-white text-xs">策略：</p>
                <p>利用 T_skin + 心率 + 加速度计 + 环境温度 → 深度学习模型（LSTM / Transformer）直接估算核心体温。无需专用热通量传感器硬件，降低 BOM 成本。当模型足够大且训练数据足够充分时，可达到或超越硬件传感器的精度。</p>
                <p className="font-semibold text-white text-xs mt-2">数据需求：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>1000+ 受试者的金标准标注训练数据</li>
                  <li>多种运动类型（骑行/跑步/游泳/铁三）</li>
                  <li>多种环境条件（温度 0-45°C, 湿度 10-95%）</li>
                  <li>覆盖不同体脂%、性别、训练水平</li>
                </ul>
                <p className="font-semibold text-white text-xs mt-2">长期护城河：</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  <li>最低 BOM 成本（无额外传感器）</li>
                  <li>模型持续迭代 → 精度随时间提升</li>
                  <li>数据网络效应（用户越多模型越好）</li>
                  <li>可同时输出其他衍生指标</li>
                </ul>
              </div>
            </PhaseCard>
          </div>

          {/* Phase Summary */}
          <div className="data-highlight">
            <p className="text-sm text-[#94A3B8]">
              <span className="font-semibold text-white">推荐路径：</span>
              Phase 1 (Calera 整合) 与 Phase 2 (DHF 自研) 可以并行推进——Phase 1 保证 6-9 个月内产品上市，
              Phase 2 在后台持续开发。DHF 原型完成后进行 A/B 对比测试（vs Calera SHF vs 可吞服药丸金标准），
              验证精度优势后切换为自研方案。Phase 3 AI 模型需要大量标注数据，可以在 Phase 1/2 产品上市后
              通过用户授权数据回传持续积累。三阶段环环相扣，相互加速。
            </p>
          </div>

          {/* Conclusion */}
          <div className="mt-8 glass-card-elevated p-8 glow-green border-green-500/20 text-center">
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              核心体温监测 — 从「有了就好」到「测得准」
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              CORE 2 验证了市场，但它的精度争议也指明了方向：非侵入式核心体温测量的下一个产品代际
              属于双热流法。将独立验证的 LoA 从 -0.38/+0.72°C 收窄到 ±0.2°C 以内，不仅是技术指标
              的提升，更是从"训练趋势参考"到"比赛日决策工具"的定位跃迁——这是一片尚未被充分占领的蓝海。
            </p>
          </div>

          {/* Navigation footer */}
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 transition-colors text-sm"
            >
              ← 返回技术全景
            </Link>
            <Link
              href="/technology/combinations"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 transition-colors text-sm"
            >
              查看硬件组合方案 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
