-- 「活動の様子」（写真付き投稿）と「メッセージ」（お知らせ・予定連絡）は
-- 投稿方法が異なるため、circle_updates に種別カラムを追加して明確に分離する。
-- 既存データは、写真が添付されているかどうかで暫定的に振り分ける。

alter table public.circle_updates
  add column kind text not null default 'activity' check (kind in ('activity', 'message'));

update public.circle_updates u
set kind = 'message'
where not exists (
  select 1 from public.circle_update_images i where i.circle_update_id = u.id
);

create index circle_updates_circle_id_kind_idx on public.circle_updates (circle_id, kind, created_at desc);
