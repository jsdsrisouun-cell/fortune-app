import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { calcFortuneScores, calcLuckyItems } from "@/lib/fortuneScore";
import { FortuneResult, UserInput, PartnerInput, FortuneType } from "@/types/fortune";
import { randomUUID } from "crypto";

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN ?? "",
});

function buildPrompt(
  input: UserInput,
  scores: ReturnType<typeof calcFortuneScores>,
  type: FortuneType,
  partnerInput?: PartnerInput
): string {
  const method = input.method ?? "四柱推命";
  const name = input.lastName || input.firstName
    ? `${input.lastName} ${input.firstName}`.trim()
    : "ご相談者様";
  const category = input.category ?? "総合";

  let base = `あなたは${method}の専門家です。以下の情報をもとに占い鑑定を行い、必ずJSON形式で回答してください。

【鑑定対象】
- 名前: ${name}
- 生年月日: ${input.birthdate}
- 性別: ${input.gender === "male" ? "男性" : input.gender === "female" ? "女性" : "その他"}
- 相談ジャンル: ${category}
- 占術: ${method}
`;

  if (type === "compatibility" && partnerInput) {
    base += `
【相手の情報】
- 名前: ${partnerInput.name || "お相手"}
- 生年月日: ${partnerInput.birthdate}
- 性別: ${partnerInput.gender === "male" ? "男性" : partnerInput.gender === "female" ? "女性" : "その他"}
`;
  }

  base += `
【運勢スコア（算出済み・参考値）】
- 恋愛運: ${scores.love}点
- 仕事運: ${scores.work}点
- 金運: ${scores.money}点
- 健康運: ${scores.health}点
- 総合運: ${scores.total}点

上記スコアに基づき、以下のJSON形式で鑑定結果を返してください。detailTextは${type === "compatibility" ? "相性の詳細" : "占術に基づいた詳細な鑑定"}を200〜300文字程度で記述してください。

{
  "totalMessage": "総合運を一言で表す文（30文字以内）",
  "detailText": "詳細な鑑定文（200〜300文字）"
}`;

  return base;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, partnerInput, ...userFields } = body;
    const input: UserInput = userFields;

    // 必須項目チェック
    if (!input.birthdate) {
      return NextResponse.json({ error: "生年月日が入力されていません" }, { status: 400 });
    }

    const scores = calcFortuneScores(input);
    const lucky = calcLuckyItems(input);

    // GitHub Models API で鑑定文を生成
    const prompt = buildPrompt(input, scores, type as FortuneType, partnerInput as PartnerInput);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたは占い鑑定の専門家です。必ずJSON形式のみで回答してください。" },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });
    const raw = response.choices[0].message.content ?? "{}";
    const aiData = JSON.parse(raw);

    const result: FortuneResult = {
      id: randomUUID(),
      type: type as FortuneType,
      scores,
      totalMessage: aiData.totalMessage ?? "",
      detailText: aiData.detailText ?? "",
      lucky,
      createdAt: new Date().toISOString(),
      userInput: input,
      ...(partnerInput ? { partnerInput } : {}),
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Fortune API error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as { status: number }).status === 429
    ) {
      return NextResponse.json(
        { error: "APIの利用制限に達しました。しばらく時間をおいてから再度お試しください。" },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "鑑定中にエラーが発生しました" }, { status: 500 });
  }
}
