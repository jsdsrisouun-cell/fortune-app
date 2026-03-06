import { FortuneScores, UserInput } from "@/types/fortune";

/**
 * 生年月日から天干地支を算出するシンプルなスコア算出ロジック
 * （四柱推命・西洋占星術ベースの簡易実装）
 */

// 干支の十二支インデックス
function getZodiacIndex(birthdate: string): number {
  const year = new Date(birthdate).getFullYear();
  return year % 12;
}

// 生年月日から数値シードを生成
function dateSeed(birthdate: string): number {
  const d = new Date(birthdate);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// 今日の日付シード
function todaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// シードベースの擬似乱数（0〜1）
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// スコアを指定範囲に正規化（40〜99）
function normalizeScore(raw: number): number {
  return Math.floor(raw * 60) + 40;
}

export function calcFortuneScores(input: UserInput): FortuneScores {
  const birth = dateSeed(input.birthdate);
  const today = todaySeed();
  const zodiac = getZodiacIndex(input.birthdate);

  const love   = normalizeScore(pseudoRandom(birth + today + 1 + zodiac));
  const work   = normalizeScore(pseudoRandom(birth + today + 2 + zodiac));
  const money  = normalizeScore(pseudoRandom(birth + today + 3 + zodiac));
  const health = normalizeScore(pseudoRandom(birth + today + 4 + zodiac));
  const total  = Math.floor((love + work + money + health) / 4);

  return { love, work, money, health, total };
}

// ラッキーカラー候補
const LUCKY_COLORS = ["赤", "青", "緑", "黄", "白", "紫", "橙", "桃", "紺", "金"];
const LUCKY_ITEMS  = ["お守り", "四葉のクローバー", "水晶", "桜の花びら", "鈴", "勾玉", "縁起だるま", "コイン", "星型のアクセサリー", "白い石"];

export function calcLuckyItems(input: UserInput) {
  const seed = dateSeed(input.birthdate) + todaySeed();
  const colorIdx  = Math.floor(pseudoRandom(seed + 10) * LUCKY_COLORS.length);
  const itemIdx   = Math.floor(pseudoRandom(seed + 20) * LUCKY_ITEMS.length);
  const number    = Math.floor(pseudoRandom(seed + 30) * 99) + 1;

  return {
    color: LUCKY_COLORS[colorIdx],
    item:  LUCKY_ITEMS[itemIdx],
    number,
  };
}
