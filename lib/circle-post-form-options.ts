export const postWizardSteps = ["内容入力", "写真・動画", "確認", "完了"];

export const postCategoryOptions = [
  "登山・ハイキング",
  "交流会",
  "練習・トレーニング",
  "イベント",
  "その他",
];

export const postingTips = [
  "タイトルは山名や活動名を入れると伝わりやすくなります",
  "写真は明るい屋外の一枚を先頭に置くと目を引きます",
  "初参加の方の感想を添えると雰囲気が伝わります",
  "一般公開にすると、サークルを探している人にも届きます",
];

export const visibilityOptions = [
  {
    id: "members" as const,
    title: "メンバー限定（非公開）",
    desc: "サークルメンバーだけが閲覧できます",
  },
  {
    id: "public" as const,
    title: "一般公開",
    desc: "サークルページを見た人が閲覧できます",
  },
];
