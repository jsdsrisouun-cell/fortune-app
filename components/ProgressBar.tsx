interface ProgressBarProps {
  value: number; // 0〜100
  colorClass?: string;
}

export default function ProgressBar({
  value,
  colorClass = "bg-[#1a1a2e]",
}: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-[#e0e0e8] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
