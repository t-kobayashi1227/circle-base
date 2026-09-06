-- にいがたサークルベース: RLSポリシー (MVP仕様書 v2 セクション4.10)

-- ============================================================
-- ヘルパー関数
-- SECURITY DEFINER で profiles を参照し、RLSの再帰評価を避ける
-- ============================================================
create or replace function public.is_admin(uid uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

create or replace function public.is_blocked(p_blocker uuid, p_blocked uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.blocks
    where blocker_id = p_blocker and blocked_id = p_blocked
  );
$$;

-- ============================================================
-- profiles
-- 実名・生年月日・保護者同意フラグは本人・管理者のみ閲覧可（列レベル保護）。
-- 公開用のニックネーム等は profiles_public ビュー経由で参照する。
-- ============================================================
alter table public.profiles enable row level security;

create policy "profiles_select_self_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_self"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_self_or_admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- 公開ビュー: display_name/avatar_path/bio/created_at のみ公開。
-- ビューはテーブル所有者(postgres)権限で実行されるため profiles の行制限を経由せず全件参照できる。
create view public.profiles_public
  with (security_invoker = false)
  as
  select id, display_name, avatar_path, bio, created_at
  from public.profiles;

grant select on public.profiles_public to anon, authenticated;

-- ============================================================
-- categories / areas: 全員閲覧可、管理はadminのみ
-- ============================================================
alter table public.categories enable row level security;
alter table public.areas enable row level security;

create policy "categories_select_all" on public.categories for select using (true);
create policy "categories_admin_write" on public.categories for all
  using (public.is_admin()) with check (public.is_admin());

create policy "areas_select_all" on public.areas for select using (true);
create policy "areas_admin_write" on public.areas for all
  using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- circles
-- ============================================================
alter table public.circles enable row level security;

create policy "circles_select_published_or_owner_or_admin"
  on public.circles for select
  using (status = 'published' or owner_id = auth.uid() or public.is_admin());

create policy "circles_insert_own"
  on public.circles for insert
  with check (owner_id = auth.uid());

create policy "circles_update_own_or_admin"
  on public.circles for update
  using (owner_id = auth.uid() or public.is_admin());

create policy "circles_delete_own_or_admin"
  on public.circles for delete
  using (owner_id = auth.uid() or public.is_admin());

-- ============================================================
-- circle_images (公開サークルの画像は誰でも閲覧、書き込みは主催者/管理者)
-- ============================================================
alter table public.circle_images enable row level security;

create policy "circle_images_select"
  on public.circle_images for select
  using (
    exists (
      select 1 from public.circles c
      where c.id = circle_images.circle_id
        and (c.status = 'published' or c.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "circle_images_write_owner_or_admin"
  on public.circle_images for all
  using (
    exists (
      select 1 from public.circles c
      where c.id = circle_images.circle_id
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  )
  with check (
    exists (
      select 1 from public.circles c
      where c.id = circle_images.circle_id
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );

-- ============================================================
-- circle_updates (活動の様子)
-- ============================================================
alter table public.circle_updates enable row level security;

create policy "circle_updates_select"
  on public.circle_updates for select
  using (
    exists (
      select 1 from public.circles c
      where c.id = circle_updates.circle_id
        and (c.status = 'published' or c.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "circle_updates_insert_owner"
  on public.circle_updates for insert
  with check (
    exists (
      select 1 from public.circles c
      where c.id = circle_updates.circle_id and c.owner_id = auth.uid()
    )
  );

create policy "circle_updates_delete_owner_or_admin"
  on public.circle_updates for delete
  using (
    exists (
      select 1 from public.circles c
      where c.id = circle_updates.circle_id
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );

-- ============================================================
-- conversations / messages (参加者本人と管理者のみ)
-- ============================================================
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy "conversations_select_participant_or_admin"
  on public.conversations for select
  using (auth.uid() in (participant_a, participant_b) or public.is_admin());

create policy "conversations_insert_participant"
  on public.conversations for insert
  with check (
    auth.uid() in (participant_a, participant_b)
    and not public.is_blocked(participant_a, participant_b)
    and not public.is_blocked(participant_b, participant_a)
  );

create policy "messages_select_participant_or_admin"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (auth.uid() in (c.participant_a, c.participant_b) or public.is_admin())
    )
  );

create policy "messages_insert_participant_not_blocked"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and auth.uid() in (c.participant_a, c.participant_b)
        and not public.is_blocked(
          case when c.participant_a = auth.uid() then c.participant_b else c.participant_a end,
          auth.uid()
        )
    )
  );

-- ============================================================
-- reports (作成は本人、閲覧・対応は管理者のみ)
-- ============================================================
alter table public.reports enable row level security;

create policy "reports_insert_self"
  on public.reports for insert
  with check (reporter_id = auth.uid());

create policy "reports_select_admin"
  on public.reports for select
  using (public.is_admin());

create policy "reports_update_admin"
  on public.reports for update
  using (public.is_admin());

-- ============================================================
-- blocks (本人のみ操作可)
-- ============================================================
alter table public.blocks enable row level security;

create policy "blocks_select_own"
  on public.blocks for select
  using (blocker_id = auth.uid());

create policy "blocks_insert_own"
  on public.blocks for insert
  with check (blocker_id = auth.uid());

create policy "blocks_delete_own"
  on public.blocks for delete
  using (blocker_id = auth.uid());
