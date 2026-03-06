"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg tracking-wide">
          ✨ 占い館
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/90">
          <Link href="/history" className="hover:text-white transition">
            鑑定履歴
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition"
            >
              ログアウト
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
