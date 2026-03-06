import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "占い館 | AI自動鑑定",
  description: "生年月日を入力するだけでAIが本格鑑定。今日の運勢・相性占い・姓名判断をお届けします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#8b5cf6] relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl" />
            </div>
            <Header />
            <main className="relative z-10 pt-14">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
