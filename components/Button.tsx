"use client";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 px-8 py-4 text-lg";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-purple-400/40 hover:-translate-y-0.5 hover:shadow-purple-400/60 active:translate-y-0 disabled:opacity-60",
    outline:
      "border-2 border-[#667eea] text-[#667eea] hover:bg-[#667eea]/10 active:bg-[#667eea]/20",
    ghost: "text-[#667eea] hover:bg-[#667eea]/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          占い中...
        </>
      ) : (
        children
      )}
    </button>
  );
}
