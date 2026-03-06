/**
 * fortune.js
 * Daily fortune logic for the Fortune App.
 * Fortune results are deterministic per (birthday × today's date) so they
 * remain stable throughout the day but change the next day.
 */

const FORTUNES = [
  {
    rank: '大吉',
    cssClass: 'rank-daikichi',
    message: '今日は最高の運気！何事にも積極的に挑戦してください。あなたの努力が実を結ぶ絶好のチャンスです。',
    loveMin: 4, workMin: 4, moneyMin: 4, healthMin: 4,
  },
  {
    rank: '吉',
    cssClass: 'rank-kichi',
    message: '運気は上昇中です。周りの人との協力で良い結果が生まれます。前向きな気持ちで行動しましょう。',
    loveMin: 3, workMin: 3, moneyMin: 3, healthMin: 3,
  },
  {
    rank: '中吉',
    cssClass: 'rank-chukichi',
    message: '穏やかな一日になりそうです。焦らずじっくりと物事に取り組むことで成果が上がるでしょう。',
    loveMin: 3, workMin: 3, moneyMin: 2, healthMin: 3,
  },
  {
    rank: '小吉',
    cssClass: 'rank-shokichi',
    message: '小さな幸せが積み重なる日です。身近な人への感謝を忘れずに。小さな親切が大きな喜びを生みます。',
    loveMin: 2, workMin: 2, moneyMin: 2, healthMin: 3,
  },
  {
    rank: '末吉',
    cssClass: 'rank-suekichi',
    message: '今は準備の時期です。焦らず一歩一歩着実に進みましょう。将来への投資が報われる時が来ます。',
    loveMin: 2, workMin: 2, moneyMin: 2, healthMin: 2,
  },
  {
    rank: '凶',
    cssClass: 'rank-kyo',
    message: '慎重に行動する日です。大きな決断は避け、現状維持に努めましょう。休息を大切にしてください。',
    loveMin: 1, workMin: 1, moneyMin: 1, healthMin: 2,
  },
  {
    rank: '大凶',
    cssClass: 'rank-daikyo',
    message: '試練の日かもしれませんが、これも成長のきっかけです。無理せず、ゆっくり休むことを優先しましょう。',
    loveMin: 1, workMin: 1, moneyMin: 1, healthMin: 1,
  },
];

const LUCKY_COLORS = [
  'ゴールド', 'シルバー', 'スカイブルー', 'ピンク', 'グリーン',
  'パープル', 'ホワイト', 'レッド', 'ネイビー', 'オレンジ',
  'イエロー', 'ターコイズ', 'コーラル', 'ラベンダー', 'ミント',
];

const LUCKY_ITEMS = [
  '四つ葉のクローバー', '水晶', '赤い糸', '金色のコイン', '桜の花びら',
  '星のペンダント', '翡翠のブレスレット', '白い石', '本', 'お茶',
  '鏡', 'くし', '財布', 'メモ帳', '花',
];

const LUCKY_DIRECTIONS = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];

const LOVE_ADVICE = [
  '積極的にアプローチするチャンスです。勇気を持って一歩踏み出して。',
  'パートナーへの感謝の気持ちを伝えましょう。小さなサプライズが効果的。',
  '出会いのチャンスが訪れます。笑顔を忘れずに行動しましょう。',
  '相手の気持ちに寄り添うことが大切な日。じっくり話し合いを。',
  '新しい出会いより既存の関係を深める日です。',
  '恋愛運は穏やかです。焦らず自然体で過ごしましょう。',
  '今日は自分磨きに専念するのが吉。内面を高めることが近道。',
  '思いがけない再会があるかもしれません。笑顔でいることが大切。',
];

const WORK_ADVICE = [
  '積極的に提案を出すと高評価を得られます。自信を持って行動を。',
  'チームワークが重要な日。周囲と協力して成果を上げましょう。',
  '集中力が高まる日。難しいタスクに取り組む絶好のチャンスです。',
  '新しいアイデアが浮かびやすい日。メモを手元に置いておきましょう。',
  '地道な作業が報われる日です。丁寧に一つひとつこなしましょう。',
  '上司や先輩から有益なアドバイスをもらえるかもしれません。',
  '計画を見直す良い機会です。優先順位を整理して効率よく進めましょう。',
  '今日は慎重に。重要な決断は明日以降に持ち越すのが無難です。',
];

const MONEY_ADVICE = [
  '臨時収入の可能性があります。衝動買いには注意して。',
  '節約を心がける日です。無駄遣いを見直しましょう。',
  '投資や貯蓄について考える良い機会です。長期的な計画を立てて。',
  '友人との割り勘などでのトラブルに注意しましょう。',
  '金運は安定しています。堅実な行動を続けてください。',
  '大きな出費は避けましょう。必要なものだけに絞って。',
  '副収入のヒントが見つかるかもしれません。アンテナを張って。',
  '今日の散財は後悔のもと。財布の紐を締めて過ごしましょう。',
];

const HEALTH_ADVICE = [
  '今日は特に健康運が良好です。積極的に体を動かしましょう。',
  '水分をこまめに摂ることを意識してください。',
  '睡眠の質を高めることが大切です。早めの就寝を心がけて。',
  '軽いストレッチや散歩でリフレッシュしましょう。',
  '食事のバランスに気をつける日です。野菜を積極的に取り入れて。',
  '目の疲れに注意。定期的に遠くを見て目を休めましょう。',
  '無理は禁物。体のサインに耳を傾けてゆっくり休みましょう。',
  '深呼吸でストレスを解消しましょう。心の余裕が健康の源です。',
];

/**
 * Simple deterministic pseudo-random number generator (mulberry32).
 * Returns a function that generates numbers in [0, 1).
 * @param {number} seed
 */
function createRng(seed) {
  let s = seed >>> 0;
  return function () {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Build a numeric seed from a birthday string ("YYYY-MM-DD") and today's date.
 * @param {string} birthday  e.g. "1990-04-15"
 * @param {Date}   today
 * @returns {number}
 */
function buildSeed(birthday, today) {
  const b = birthday.replace(/-/g, '');  // "19900415"
  const t =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  return (parseInt(b, 10) ^ t) + t;
}

/**
 * Generate a star rating string (★☆) between min and 5.
 * @param {Function} rng
 * @param {number} min
 * @returns {string}
 */
function starRating(rng, min) {
  const count = min + Math.floor(rng() * (5 - min + 1));
  const clamped = Math.min(count, 5);
  return '★'.repeat(clamped) + '☆'.repeat(5 - clamped);
}

/**
 * Pick a random element from an array using the provided rng.
 * @param {Function} rng
 * @param {Array} arr
 */
function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Format a Date as Japanese locale string (e.g. "2026年3月6日（金）").
 * @param {Date} date
 * @returns {string}
 */
function formatDateJa(date) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = days[date.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}

/**
 * Main entry point called by the fortune button.
 */
function getFortune() {
  const birthdayInput = document.getElementById('birthday');
  const birthday = birthdayInput.value;

  if (!birthday) {
    alert('生年月日を入力してください。');
    return;
  }

  const today = new Date();
  const seed = buildSeed(birthday, today);
  const rng = createRng(seed);

  // Pick fortune tier (weighted: better fortunes more common)
  const weights = [15, 25, 20, 15, 12, 8, 5]; // daikichi … daikyo
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  let fortuneIndex = 0;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) { fortuneIndex = i; break; }
  }
  const fortune = FORTUNES[fortuneIndex];

  // Lucky details
  const color = pick(rng, LUCKY_COLORS);
  const number = Math.floor(rng() * 9) + 1;
  const item = pick(rng, LUCKY_ITEMS);
  const direction = pick(rng, LUCKY_DIRECTIONS);

  // Advice
  const loveAdvice = pick(rng, LOVE_ADVICE);
  const workAdvice = pick(rng, WORK_ADVICE);
  const moneyAdvice = pick(rng, MONEY_ADVICE);
  const healthAdvice = pick(rng, HEALTH_ADVICE);

  // Star ratings
  const loveStars = starRating(rng, fortune.loveMin);
  const workStars = starRating(rng, fortune.workMin);
  const moneyStars = starRating(rng, fortune.moneyMin);
  const healthStars = starRating(rng, fortune.healthMin);

  // Render
  document.getElementById('dateDisplay').textContent = formatDateJa(today) + ' の運勢';

  const rankEl = document.getElementById('fortuneRank');
  rankEl.textContent = fortune.rank;
  rankEl.className = 'fortune-rank ' + fortune.cssClass;

  document.getElementById('fortuneMessage').textContent = fortune.message;

  document.getElementById('luckyColor').textContent = color;
  document.getElementById('luckyNumber').textContent = number;
  document.getElementById('luckyItem').textContent = item;
  document.getElementById('luckyDirection').textContent = direction;

  document.getElementById('loveAdvice').textContent = loveAdvice;
  document.getElementById('workAdvice').textContent = workAdvice;
  document.getElementById('moneyAdvice').textContent = moneyAdvice;
  document.getElementById('healthAdvice').textContent = healthAdvice;

  document.getElementById('loveStars').textContent = loveStars;
  document.getElementById('workStars').textContent = workStars;
  document.getElementById('moneyStars').textContent = moneyStars;
  document.getElementById('healthStars').textContent = healthStars;

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Reset back to input state.
 */
function resetFortune() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('birthday').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
