-- イベント（type = 'one_time'）作成時に入力する項目を追加する。
-- ・開始時刻（event_start_time, "HH:MM"）
-- ・終了時刻／所要時間の目安（event_end_note, 自由記述）
-- ・応募締切（application_deadline, 未入力なら開催日当日が締切）
-- ・参加費の支払い方法（payment_method）
-- ・持ち物・服装（belongings）

alter table public.circles
  add column event_start_time text not null default '',
  add column event_end_note text not null default '',
  add column application_deadline date,
  add column payment_method text not null default '',
  add column belongings text not null default '';
