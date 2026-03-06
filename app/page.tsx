import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function HomePage() {
  const menus = [
    { href: "/fortune/daily", icon: "🌅", title: "今日の運勢", description: "生年月日だけで今日の運勢を即占い" },
    { href: "/fortune/text", icon: "📜", title: "詳細テキスト鑑定", description: "相談ジャンルを選んで深掘り鑑定" },
    { href: "/fortune/compatibility", icon: "💑", title: "相性占い", description: "気になる相手との相性を診断" },
    { href: "/fortune/name", icon: "✍️", title: "姓名判断", description: "名前に秘められた運命を読み解く" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4 animate-pulse-star">⭐</div>
        <h1 className="text-5xl font-bold text-white tracking-wide mb-3">今日の運勢</h1>
        <p className="text-white/80 text-lg">あなたの運命を占います</p>
      </div>

      {/* メインカード */}
      <Card className="w-full max-w-xl text-center">
        <div className="w-44 h-44 mx-auto mb-8 rounded-full overflow-hidden shadow-xl ring-4 ring-purple-200">
          <img
            src="https://images.unsplash.com/photo-1548048026-5a1a941d93d3?w=400&h=400&fit=crop"
            alt="おみくじ"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          おみくじを引いて運勢を占いましょう
        </h2>
        <p className="text-gray-500 mb-8">今日のあなたの運勢はどうでしょうか？</p>
        <Link href="/fortune/daily">
          <Button fullWidth>
            ✨ おみくじを引く
          </Button>
        </Link>
      </Card>

      {/* 占いメニュー */}
      <div className="w-full max-w-xl mt-8 grid grid-cols-2 gap-4">
        {menus.map((m) => (
          <Link key={m.href} href={m.href}>
            <div className="bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl p-4 text-white transition cursor-pointer border border-white/20">
              <div className="text-3xl mb-2">{m.icon}</div>
              <div className="font-bold text-sm mb-1">{m.title}</div>
              <div className="text-xs text-white/70">{m.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
