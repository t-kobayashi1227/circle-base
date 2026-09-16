-- 基本情報タブの項目拡充。
-- ・「活動頻度・時間」を「活動頻度」「主な活動時間」の2項目に分割（schedule列は廃止し、既存値は schedule_frequency へ引き継ぐ）
-- ・サークルメンバー数（member_count）・設立時期（founded_at）を追加
-- ・活動場所の行き方・集合方法（location_access）を追加

alter table public.circles
  add column schedule_frequency text not null default '',
  add column schedule_time text not null default '',
  add column member_count text not null default '',
  add column founded_at text not null default '',
  add column location_access text not null default '';

update public.circles set schedule_frequency = schedule where schedule <> '';

alter table public.circles drop column schedule;
