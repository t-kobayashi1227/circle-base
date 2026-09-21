-- にいがたサークルベース: サークルのお気に入り機能
-- 比較検討のために複数サークルを保存しておけるようにする。
-- circle_membersと異なり、本人が自由に追加・削除できる。

create table public.circle_favorites (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint circle_favorites_unique_pair unique (circle_id, user_id)
);

create index circle_favorites_circle_id_idx on public.circle_favorites (circle_id);
create index circle_favorites_user_id_idx on public.circle_favorites (user_id);

alter table public.circle_favorites enable row level security;

-- 閲覧・追加・削除: 本人のみ（他人のお気に入りは非公開）
create policy "circle_favorites_select_self"
  on public.circle_favorites for select
  using (user_id = auth.uid());

create policy "circle_favorites_insert_self"
  on public.circle_favorites for insert
  with check (user_id = auth.uid());

create policy "circle_favorites_delete_self"
  on public.circle_favorites for delete
  using (user_id = auth.uid());
