export type Gender = "male" | "female" | "other";

export type FortuneType = "daily" | "text" | "compatibility" | "name";

export type FortuneCategory =
  | "出会い"
  | "片想い"
  | "あの人の気持ち"
  | "復縁"
  | "結婚"
  | "仕事"
  | "人生総合"
  | "金運"
  | "健康";

export type FortuneMethod =
  | "四柱推命"
  | "西洋占星術"
  | "姓名判断";

export interface UserInput {
  lastName: string;
  firstName: string;
  birthdate: string; // YYYY-MM-DD
  gender: Gender;
  category?: FortuneCategory;
  method?: FortuneMethod;
}

export interface PartnerInput {
  name: string;
  birthdate: string;
  gender: Gender;
}

export interface FortuneScores {
  love: number;
  work: number;
  money: number;
  health: number;
  total: number;
}

export interface LuckyItems {
  color: string;
  item: string;
  number: number;
}

export interface FortuneResult {
  id: string;
  type: FortuneType;
  scores: FortuneScores;
  totalMessage: string;
  detailText: string;
  lucky: LuckyItems;
  createdAt: string;
  userInput: UserInput;
  partnerInput?: PartnerInput;
}
