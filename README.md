# 占い館 | AI自動鑑定

生年月日を入力するだけでAIが本格鑑定。今日の運勢・相性占い・姓名判断を提供するNext.jsアプリケーションです。

---

## 必要環境

- Node.js 18以上
- npm

---

## セットアップ

### 1. 依存パッケージのインストール

```bash
cd fortune-app
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルをプロジェクトルートに作成し、以下を設定してください。

```env
# GitHub Models API（占い鑑定文の生成に使用）
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# NextAuth.js 認証設定
NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXTAUTH_URL=http://localhost:3000

# Google OAuth（ログイン機能に使用）
GOOGLE_CLIENT_ID=xxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxx
```

---

## 開発サーバーの起動

```bash
npm run dev
```

起動後、ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

> **注意（Windows）:** PowerShellからの起動は以下のコマンドを使用してください。
> ```powershell
> cmd /c "cd fortune-app && npm run dev"
> ```

---

## ビルド（本番用）

```bash
npm run build
```

ビルド成功後、`.next/` ディレクトリに成果物が生成されます。

---

## 本番サーバーの起動

ビルド完了後に以下を実行してください。

```bash
npm run start
```

起動後、ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## サーバーの停止

ターミナルでサーバーを起動している場合は `Ctrl + C` で停止できます。

バックグラウンドで起動している場合（Windows PowerShell）は以下のコマンドを使用してください。

```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## コマンド一覧

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動（ホットリロード有効） |
| `npm run build` | 本番用ビルド |
| `npm run start` | 本番サーバー起動（要ビルド済み） |
| `npm run lint` | ESLintによるコードチェック |

---

## 主な機能

- **今日の運勢** — 生年月日から四柱推命・タロットなどで鑑定
- **相性占い** — 2人の生年月日から相性を鑑定
- **姓名判断** — 名前の画数から運勢を鑑定
- **詳細テキスト鑑定** — 相談ジャンル別の深掘り鑑定
- **鑑定履歴** — 過去の鑑定結果をローカルに保存
- **Googleログイン** — NextAuth.jsによるOAuth認証

---

## 技術スタック

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [GitHub Models API](https://github.com/marketplace/models) (gpt-4o-mini)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
