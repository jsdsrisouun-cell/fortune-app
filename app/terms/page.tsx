import Card from "@/components/Card";

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center px-4 py-12">
      <Card className="w-full max-w-2xl prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">利用規約</h1>
        <p className="text-gray-600 text-sm mb-4">最終更新日：2026年3月6日</p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">第1条（目的）</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          本規約は、占い館アプリ（以下「本サービス」）の利用条件を定めるものです。
          ユーザーは本規約に同意の上、本サービスをご利用ください。
        </p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">第2条（免責事項）</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          本サービスが提供するAI鑑定結果は、娯楽目的のものです。
          鑑定結果に基づく判断・行動については、ユーザー自身の責任において行ってください。
          当サービスは鑑定結果の正確性・完全性を保証しません。
        </p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">第3条（禁止事項）</h2>
        <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside">
          <li>本サービスを不正な目的で利用すること</li>
          <li>他のユーザーまたは第三者に迷惑をかける行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>法令または本規約に違反する行為</li>
        </ul>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">第4条（サービスの変更・終了）</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          当サービスは、ユーザーへの事前通知なく本サービスの内容を変更、
          または提供を終了することがあります。
        </p>
      </Card>
    </div>
  );
}
