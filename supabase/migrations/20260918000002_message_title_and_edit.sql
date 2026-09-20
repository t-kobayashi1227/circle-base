-- メッセージにタイトルカラムを追加し、編集を可能にする。
-- title は message 種別のみで使用。activity には null のままにする。
-- 既存メッセージは content の1行目をタイトルとして backfill する。

alter table public.circle_updates
  add column title text;

-- 既存メッセージの title を content の1行目から backfill
update public.circle_updates
set title = split_part(content, E'\n', 1)
where kind = 'message'
  and title is null
  and content <> '';

-- circle_updates の編集をサークル所有者に許可
create policy "circle_updates_update_owner"
  on public.circle_updates for update
  using (
    exists (
      select 1 from public.circles c
      where c.id = circle_updates.circle_id
        and c.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.circles c
      where c.id = circle_updates.circle_id
        and c.owner_id = auth.uid()
    )
  );
