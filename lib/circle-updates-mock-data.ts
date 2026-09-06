// 活動の様子ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の circle_updates テーブル取得に置き換える。

export const manageNav = [
  { key: "info", icon: "home", label: "サークル情報", href: "/edit" },
  { key: "updates", icon: "photo_camera", label: "活動の様子", href: "/updates" },
  { key: "recruit", icon: "forum", label: "メンバー募集内容", href: "/recruit" },
  { key: "messages", icon: "chat_bubble", label: "メッセージ", href: "/messages" },
  { key: "members", icon: "group", label: "メンバー管理", href: "/members" },
  { key: "settings", icon: "settings", label: "サークル設定", href: "/settings" },
] as const;

export interface UpdatePost {
  id: string;
  tag: "hike" | "meet" | "news";
  year: string;
  md: string;
  dow: string;
  isSunday: boolean;
  title: string;
  body: string;
  likes: number;
  comments: number;
  photoCaption: string;
}

export const tagStyle = {
  hike: { label: "登山・ハイキング", bg: "#FDF3E4", border: "#F2E0C0", color: "#C07E1B" },
  meet: { label: "交流会", bg: "#FDF0F3", border: "#F2D6DE", color: "#B7607F" },
  news: { label: "お知らせ", bg: "#EDF3F9", border: "#D3E2EF", color: "#4D6B8A" },
} as const;

export const updatePosts: UpdatePost[] = [
  {
    id: "post-1",
    tag: "hike",
    year: "2024年",
    md: "5/12",
    dow: "日曜日",
    isSunday: true,
    title: "角田山ハイキングに行ってきました！",
    body: "天気にも恵まれて、絶景を楽しめました。初心者の方も無理なく登頂でき、みんなで素敵な時間を過ごしました。",
    likes: 24,
    comments: 5,
    photoCaption: "登山道を歩くメンバーの写真",
  },
  {
    id: "post-2",
    tag: "meet",
    year: "2024年",
    md: "4/28",
    dow: "日曜日",
    isSunday: true,
    title: "下山後のランチ交流会",
    body: "下山後はみんなでランチ！山の話や次回の計画で盛り上がりました。",
    likes: 18,
    comments: 3,
    photoCaption: "野外でランチをする写真",
  },
  {
    id: "post-3",
    tag: "hike",
    year: "2024年",
    md: "4/14",
    dow: "日曜日",
    isSunday: true,
    title: "弥彦山に登りました",
    body: "春の弥彦山は新緑がとてもきれいでした。山頂からの景色は最高です！",
    likes: 21,
    comments: 2,
    photoCaption: "残雪の山並みの写真",
  },
  {
    id: "post-4",
    tag: "news",
    year: "2024年",
    md: "3/30",
    dow: "土曜日",
    isSunday: false,
    title: "新しいメンバーと初めての山行！",
    body: "新メンバー2名と一緒に楽しく登山できました。ようこそ、山歩きの会へ！",
    likes: 16,
    comments: 4,
    photoCaption: "登山靴の写真",
  },
];
