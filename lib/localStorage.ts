import { FortuneResult } from "@/types/fortune";

const HISTORY_KEY = "fortune_history";
const MAX_HISTORY = 20;

export function saveHistory(result: FortuneResult): void {
  if (typeof window === "undefined") return;
  const history = loadHistory();
  const updated = [result, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function loadHistory(): FortuneResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as FortuneResult[]) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}
