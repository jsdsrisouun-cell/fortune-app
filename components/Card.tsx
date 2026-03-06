import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
