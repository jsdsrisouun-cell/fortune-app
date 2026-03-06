"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import { FortuneResult } from "@/types/fortune";
import { saveHistory } from "@/lib/localStorage";
import { Suspense } from "react";

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [result, setResult] = useState<FortuneResult | null>(null);

  useEffect(() => {
    const raw = params.get("data");
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        // APIエラーレスポンスの場合はトップに戻る
        if (parsed.error || !parsed.scores) {
          alert(parsed.error ?? "鑑定結果の取得に失敗しました。もう一度お試しください。");
          router.replace("/");
          return;
        }
        setResult(parsed as FortuneResult);
        saveHistory(parsed as FortuneResult);
      } catch {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [params, router]);

  if (!result || !result.scores) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <div className="text-white text-xl animate-pulse">読み込み中...</div>
      </div>
    );
  }

  const { scores, totalMessage, detailText, lucky } = result;

  const categories = [
    { label: "恋愛運", icon: "♡", score: scores.love, color: "text-pink-500" },
    { label: "仕事運", icon: "🏢", score: scores.work, color: "text-blue-500" },
    { label: "金運",   icon: "$", score: scores.money, color: "text-green-500" },
    { label: "健康運", icon: "☆", score: scores.health, color: "text-yellow-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-12">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-pulse-star">⭐</div>
        <h1 className="text-5xl font-bold text-white tracking-wide mb-2">今日の運勢</h1>
        <p className="text-white/80">あなたの運命を占います</p>
      </div>

      <Card className="w-full max-w-2xl">
        {/* 総合運 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            総合運: <span>{scores.total}点</span>
          </h2>
          <p className="text-[#7c3aed] text-sm">{totalMessage}</p>
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* 運勢スコアグリッド */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-6">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className={`flex items-center gap-1.5 text-sm font-semibold mb-1.5 ${cat.color}`}>
                <span>{cat.icon}</span>
                <span className="text-gray-700">{cat.label}</span>
              </div>
              <ProgressBar value={cat.score} />
              <div className="text-xs text-gray-500 text-right mt-0.5">{cat.score}点</div>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* 詳細鑑定文 */}
        {detailText && (
          <div className="mb-6 bg-purple-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-purple-700 mb-2">✨ 詳細鑑定</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{detailText}</p>
          </div>
        )}

        {/* ラッキーアイテム */}
        <div className="text-center mb-6">
          <h3 className="text-base font-bold text-gray-700 mb-4">今日のラッキーアイテム</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">ラッキーカラー</div>
              <div className="text-lg font-bold text-yellow-600">{lucky.color}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">ラッキーアイテム</div>
              <div className="text-lg font-bold text-sky-500">{lucky.item}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">ラッキーナンバー</div>
              <div className="text-lg font-bold text-green-500">{lucky.number}</div>
            </div>
          </div>
        </div>

        <Button fullWidth onClick={() => router.push("/")}>
          ✨ もう一度占う
        </Button>
      </Card>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
