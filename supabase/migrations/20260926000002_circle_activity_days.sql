-- サークル（type = 'ongoing'）の「主な活動曜日」を追加する。
-- 値は lib/circle-form-options.ts の activityDayOptions（月〜日・不定期）のいずれか。
-- 会費の支払い方法は、イベント用に追加した payment_method 列を共用する。

alter table public.circles
  add column if not exists activity_days text[] not null default '{}';
