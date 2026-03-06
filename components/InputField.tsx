import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputField({ label, className = "", ...props }: InputFieldProps) {
  const isTextInput = !props.type || props.type === "text" || props.type === "search";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input
        lang={isTextInput ? "ja" : undefined}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#667eea]/50 focus:border-[#667eea] transition ${className}`}
        {...props}
      />
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, options, className = "", ...props }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <select
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#667eea]/50 focus:border-[#667eea] transition ${className}`}
        {...props}
      >
        <option value="">選択してください</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
