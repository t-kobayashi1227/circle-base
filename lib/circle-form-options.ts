// サークル作成フォームで使う「市内全域」エリアのslug。
// supabase/seed.sql の areas テーブルに同slugの行が存在する前提。

export const citywideAreaId = "citywide";

// サークルの「主な活動曜日」の選択肢。circles.activity_days に表示順のまま保存する。
export const activityDayOptions = ["月", "火", "水", "木", "金", "土", "日", "不定期"] as const;
