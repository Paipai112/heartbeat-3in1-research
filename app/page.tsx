import { Hero } from "@/components/Hero";
import { BusinessSection } from "@/components/BusinessSection";
import { TechnologySection } from "@/components/TechnologySection";
import { PhysiologySection } from "@/components/PhysiologySection";

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessSection />
      <TechnologySection />
      <PhysiologySection />
      <section className="bg-[#020617] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            定义下一代运动传感器的
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              品类标准
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10">
            消费级胸带市场 $36 亿 · 三合一竞争真空 ·
            技术组件全部成熟。从 Visma 车队的设备碎片化到单一设备的完整生理画像 —
            这是一个定义新品类的窗口期。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              GitHub
            </a>
            <a
              href="#business"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 transition-colors duration-200 text-sm"
            >
              返回阅读报告
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
