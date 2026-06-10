import type { Metadata } from "next";
import { Exo, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HeartBeat 3-in-1 | 下一代运动传感器胸带 · 技术调研",
  description: "心率监测 + 呼吸检测 + 核心体温三合一胸带市场全景、技术路径与运动生理学框架。对标Visma-Lease a Bike车队传感器生态。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${exo.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
