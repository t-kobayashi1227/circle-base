-- 「メンバー募集」タブに一言コメント（recruit_tagline）を追加する。

alter table public.circles
  add column recruit_tagline text not null default '';
