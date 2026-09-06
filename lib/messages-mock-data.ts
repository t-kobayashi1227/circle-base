// メッセージ画面の表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の conversations / messages テーブル取得に置き換える。

export interface MessageThread {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  active: boolean;
  photoCaption: string;
}

export const threads: MessageThread[] = [
  { id: "yamaaruki", name: "新潟山歩きの会（山田さん）", preview: "ありがとうございます！\n当日楽しみにしています😊", time: "10:30", unread: 2, active: true, photoCaption: "稜線を歩くメンバーの写真" },
  { id: "lunch-kai", name: "下山後のランチ交流会（佐藤さん）", preview: "ランチ会の場所、大丈夫です！\n当日はよろしくお願いします。", time: "昨日", unread: 1, active: false, photoCaption: "野外で食事をする写真" },
  { id: "yahikoyama", name: "弥彦山ハイキングクラブ（鈴木さん）", preview: "了解しました！\nまたご連絡しますね。", time: "5/14", unread: 0, active: false, photoCaption: "森の登山道の写真" },
  { id: "yurucamp", name: "ゆるキャン△新潟（田中さん）", preview: "キャンプ道具の件、\nありがとうございます！", time: "5/13", unread: 0, active: false, photoCaption: "テントの写真" },
  { id: "kakudayama", name: "角田山ハイキング（高橋さん）", preview: "次回の登山、参加します！\nよろしくお願いします。", time: "5/12", unread: 0, active: false, photoCaption: "角田山の写真" },
];

export interface ChatMessage {
  id: string;
  kind: "date" | "them" | "me";
  date?: string;
  text?: string;
  time?: string;
}

export const chatMessages: ChatMessage[] = [
  { id: "d1", kind: "date", date: "5月12日（日）" },
  { id: "m1", kind: "them", text: "はじめまして！新潟山歩きの会の山田です。\n角田山ハイキングにご興味を持っていただきありがとうございます！\nご質問などあれば、お気軽にどうぞ 😊", time: "10:15" },
  { id: "m2", kind: "me", text: "はじめまして！参加を検討しています。\n初心者でも大丈夫でしょうか？", time: "10:18" },
  { id: "m3", kind: "them", text: "はい、初心者の方も多く参加されていますよ！\nゆっくりペースで登るのでご安心ください🙂", time: "10:21" },
  { id: "m4", kind: "me", text: "ありがとうございます！\n持ち物や集合場所について教えていただけますか？", time: "10:24" },
  { id: "m5", kind: "them", text: "集合場所：新潟駅 南口（8:00集合）\n持ち物：登山靴・飲み物・レインウェア・昼食・タオルなど\n※詳細はイベントページにも記載しています。\n\nご不明点があればいつでもご連絡ください！", time: "10:27" },
  { id: "d2", kind: "date", date: "5月13日（月）" },
  { id: "m6", kind: "me", text: "ありがとうございます！\n当日楽しみにしています😊", time: "10:30" },
];

export const activeThread = {
  name: "新潟山歩きの会（山田さん）",
  circleName: "新潟山歩きの会",
  meta: "メンバー28名・登山・ハイキング",
};

export const upcomingEvent = {
  date: "5/18",
  dow: "（日）",
  title: "角田山ハイキング",
  time: "8:00〜15:00",
  place: "新潟市西蒲区",
};

export const memberCount = 4;
export const memberOverflow = 23;
