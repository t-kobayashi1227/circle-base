-- 「メンバー募集内容」タブに募集対象・募集人数・費用・申込方法を表示できるよう、
-- circles テーブルに対応する列を追加する。求める方（応募資格）は既存の requirements 列を流用する。

alter table public.circles
  add column recruit_target text not null default '',
  add column recruit_capacity text not null default '',
  add column recruit_cost text not null default '',
  add column recruit_how_to_apply text not null default '';
