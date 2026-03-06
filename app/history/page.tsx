"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { FortuneResult } from "@/types/fortune";
import { loadHistory, clearHistory } from "@/lib/localStorage";

const TYPE_LABEL: Record<string, string> = {
  daily: "今日の運勢",
  text: "詳細鑑定",
  compatibility: "相性占い",
  name: "姓名判断",
};

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<FortuneResult[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleClear = () => {
    if (confirm("鑑定履歴をすべて削除しますか？")) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-56px)] px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">鑑定履歴</h1>
        <p className="text-white/70 text-sm">過去の鑑定結果を確認できます</p>
      </div>

      <div className="w-full max-w-xl">
        {history.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-gray-500">鑑定履歴がありません</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 text-purple-500 text-sm hover:underline"
            >
              占いを始める
            </button>
          </Card>
        ) : (
          <>
            <div className="flex justify-end mb-3">
              <button onClick={handleClear} className="text-xs text-white/60 hover:text-white transition">
                履歴をすべて削除
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {history.map((h) => (
                <Card
                  key={h.id}
                  className="cursor-pointer hover:shadow-purple-300/30 transition-shadow"
                  onClick={() =>
                    router.push(`/result?data=${encodeURIComponent(JSON.stringify(h))}`)
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-purple-600">
                      {TYPE_LABEL[h.type] ?? h.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(h.createdAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="text-gray-700 font-semibold mb-1">
                    総合運: {h.scores.total}点
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{h.totalMessage}</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
