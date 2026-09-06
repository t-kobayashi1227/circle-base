// 主催中のサークル管理ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の circles（owner_id = 自分）テーブル取得・集計に置き換える。

export interface OwnedStat {
  icon: string;
  label: string;
  shortLabel: string;
  value: string;
  unit: string;
  note: string;
  noteColor: string;
}

const green = "#3E9E6A";
const orange = "#C07E1B";

export const ownedStats: OwnedStat[] = [
  { icon: "groups", label: "主催中のサークル数", shortLabel: "主催中の\nサークル数", value: "3", unit: "", note: "公開中：3件", noteColor: green },
  { icon: "group", label: "総メンバー数", shortLabel: "総メンバー数", value: "48", unit: "人", note: "先月比 +8人", noteColor: green },
  { icon: "calendar_month", label: "今月の活動予定", shortLabel: "今月の\n活動予定", value: "5", unit: "件", note: "参加予定 32人", noteColor: green },
  { icon: "chat_bubble", label: "今月のメッセージ", shortLabel: "今月の\nメッセージ", value: "12", unit: "件", note: "未読 3件", noteColor: orange },
];

export interface OwnedCircle {
  id: string;
  name: string;
  category: string;
  desc: string;
  members: string;
  posts: string;
  unread: number;
  next: string;
  area: string;
  updated: string;
  photoCaption: string;
}

export const ownedCircles: OwnedCircle[] = [
  {
    id: "yamaaruki",
    name: "新潟山歩きの会",
    category: "登山・ハイキング",
    desc: "新潟の山々を中心に、月1〜2回のペースで\n登山やハイキングを楽しんでいます！",
    members: "28人",
    posts: "15件",
    unread: 2,
    next: "5/18 角田山ハイキング",
    area: "新潟市西蒲区",
    updated: "2024/05/12",
    photoCaption: "登山道を歩くメンバーの写真",
  },
  {
    id: "cafe-tour",
    name: "新潟カフェ巡り部",
    category: "食べ歩き・グルメ",
    desc: "新潟市内を中心に、おしゃれなカフェや\n美味しいお店をみんなで巡っています☕",
    members: "16人",
    posts: "9件",
    unread: 0,
    next: "5/25 古町カフェ巡り",
    area: "新潟市中央区",
    updated: "2024/05/10",
    photoCaption: "カフェで食事をする写真",
  },
  {
    id: "board-game",
    name: "ボードゲームで遊ぼう会",
    category: "ゲーム・ボードゲーム",
    desc: "初心者から経験者まで、みんなで楽しく\nボードゲームで遊んでいます！",
    members: "4人",
    posts: "7件",
    unread: 0,
    next: "5/28 ボードゲーム会",
    area: "新潟市中央区",
    updated: "2024/05/08",
    photoCaption: "ボードゲーム卓の写真",
  },
];

export const promoChecks = ["活動の様子を投稿する", "サークル情報を見直す", "SNSでシェアする"];
