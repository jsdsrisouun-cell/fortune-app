import Card from "@/components/Card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">プライバシーポリシー</h1>
        <p className="text-gray-600 text-sm mb-4">最終更新日：2026年3月6日</p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">収集する情報</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          本サービスでは、鑑定のために氏名・生年月日・性別の入力を求める場合があります。
          これらの情報は鑑定処理のみに使用し、サーバーには保存しません。
          Googleログインを利用する場合、Google が提供するプロフィール情報（名前・メールアドレス）を取得します。
        </p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">情報の利用目的</h2>
        <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside">
          <li>AI鑑定結果の生成</li>
          <li>ユーザー認証（Googleログイン）</li>
          <li>サービス改善のための統計的な分析（個人を特定しない形で）</li>
        </ul>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">情報の保存</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          鑑定履歴はお使いのブラウザのlocalStorageにのみ保存され、外部サーバーには送信・保存されません。
          いつでもブラウザから削除可能です。
        </p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">第三者への提供</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          本サービスはAI鑑定にGemini API（Google）を使用しています。
          鑑定のプロンプト情報はGoogleのプライバシーポリシーに従って処理されます。
        </p>

        <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">お問い合わせ</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          プライバシーに関するご質問はサービス内のお問い合わせフォームよりご連絡ください。
        </p>
      </Card>
    </div>
  );
}
