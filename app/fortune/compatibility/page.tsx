"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/InputField";
import { Gender } from "@/types/fortune";

export default function CompatibilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    lastName: "", firstName: "", birthdate: "", gender: "" as Gender | "",
  });
  const [partner, setPartner] = useState({
    name: "", birthdate: "", gender: "" as Gender | "",
  });

  const genderOptions = [
    { value: "male", label: "男性" },
    { value: "female", label: "女性" },
    { value: "other", label: "その他" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.birthdate || !form.gender || !partner.birthdate || !partner.gender) return;
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "compatibility", partnerInput: partner }),
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
        <div className="text-5xl mb-3">💑</div>
        <h1 className="text-3xl font-bold text-white mb-2">相性占い</h1>
        <p className="text-white/70">あなたと気になる相手の相性をAIが鑑定します</p>
      </div>

      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* あなたの情報 */}
          <div>
            <h3 className="text-sm font-bold text-purple-600 mb-3">あなたの情報</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <InputField label="姓" placeholder="山田" value={form.lastName} autoComplete="family-name"
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                <InputField label="名" placeholder="太郎" value={form.firstName} autoComplete="given-name"
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <InputField label="生年月日 *" type="date" required value={form.birthdate}
                onChange={(e) => setForm({ ...form, birthdate: e.target.value })} />
              <SelectField label="性別 *" required options={genderOptions} value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })} />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 相手の情報 */}
          <div>
            <h3 className="text-sm font-bold text-pink-500 mb-3">相手の情報</h3>
            <div className="flex flex-col gap-3">
              <InputField label="相手の名前" placeholder="鈴木 花子" value={partner.name}
                onChange={(e) => setPartner({ ...partner, name: e.target.value })} />
              <InputField label="相手の生年月日 *" type="date" required value={partner.birthdate}
                onChange={(e) => setPartner({ ...partner, birthdate: e.target.value })} />
              <SelectField label="相手の性別 *" required options={genderOptions} value={partner.gender}
                onChange={(e) => setPartner({ ...partner, gender: e.target.value as Gender })} />
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading}>
            💑 相性を占う
          </Button>
        </form>
      </Card>
    </div>
  );
}
