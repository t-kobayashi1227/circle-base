// サイト概要ページの表示イメージ確認用モックデータ。

export interface AboutFeature {
  icon: string;
  title: string;
  desc: string;
  illustrationCaption: string;
}

export const aboutFeatures: AboutFeature[] = [
  {
    icon: "search",
    title: "サークルを探す",
    desc: "エリア・カテゴリ・キーワードから、気になるサークルを簡単に見つけられます。",
    illustrationCaption: "サークルを検索する女性のイラスト",
  },
  {
    icon: "diversity_3",
    title: "仲間と出会う",
    desc: "同じ趣味や興味を持つ仲間とつながり、新しいコミュニティが広がります。",
    illustrationCaption: "仲間と出会う人々のイラスト",
  },
  {
    icon: "event",
    title: "イベントに参加する",
    desc: "サークルの活動や地域のイベントに参加して、楽しい時間を過ごせます。",
    illustrationCaption: "イベントに参加する男性のイラスト",
  },
  {
    icon: "explore",
    title: "新しい新潟を発見",
    desc: "地元の魅力や隠れたスポットを仲間と一緒に見つけて、毎日をもっと楽しく。",
    illustrationCaption: "山と旗のイラスト",
  },
];

export interface AboutStat {
  icon: string;
  value: string;
  label: string;
}

export const aboutStats: AboutStat[] = [
  { icon: "diversity_3", value: "1,200+", label: "登録ユーザー" },
  { icon: "flag", value: "320+", label: "サークル数" },
  { icon: "event", value: "1,800+", label: "開催されたイベント" },
  { icon: "favorite", value: "95%", label: "利用者満足度" },
];
