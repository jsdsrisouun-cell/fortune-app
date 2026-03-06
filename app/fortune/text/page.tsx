"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/InputField";
import { FortuneCategory, FortuneMethod, Gender } from "@/types/fortune";

const CATEGORIES: FortuneCategory[] = [
  "出会い", "片想い", "あの人の気持ち", "復縁", "結婚",
  "仕事", "人生総合", "金運", "健康",
];

export default function TextFortunePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    gender: "" as Gender | "",
    category: "" as FortuneCategory | "",
    method: "四柱推命" as FortuneMethod,
  });

  const genderOptions = [
    { value: "male", label: "男性" },
    { value: "female", label: "女性" },
    { value: "other", label: "その他" },
  ];

  const methodOptions = [
    { value: "四柱推命", label: "四柱推命" },
    { value: "西洋占星術", label: "西洋占星術" },
    { value: "姓名判断", label: "姓名判断" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.birthdate || !form.gender || !form.category) return;
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "text" }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error ?? "鑑定中にエラーが発生しました。もう一度お試しください。");
        return;
      }
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(data))}`);
    } catch {
      alert("鑑定中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📜</div>
        <h1 className="text-3xl font-bold text-white mb-2">詳細テキスト鑑定</h1>
        <p className="text-white/70">相談ジャンルを選んでAIが深掘り鑑定します</p>
      </div>

      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="姓"
              placeholder="山田"
              value={form.lastName}
              autoComplete="family-name"
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <InputField
              label="名"
              placeholder="太郎"
              value={form.firstName}
              autoComplete="given-name"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <InputField
            label="生年月日 *"
            type="date"
            required
            value={form.birthdate}
            onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
          />
          <SelectField
            label="性別 *"
            required
            options={genderOptions}
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
          />
          <SelectField
            label="相談ジャンル *"
            required
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as FortuneCategory })}
          />
          <SelectField
            label="占術"
            options={methodOptions}
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value as FortuneMethod })}
          />
          <Button type="submit" fullWidth loading={loading}>
            ✨ 詳細鑑定を受ける
          </Button>
        </form>
      </Card>
    </div>
  );
}
