-- にいがたサークルベース: サークル参加者管理（招待制）
-- 「参加中のサークル」機能はこれまでDB未設計のため最新サークルを暫定表示していたが、
-- circle_membersテーブルを新設し、実際の参加状態を管理する。
-- 参加希望者が自分で申請するのではなく、メッセージでのやり取りを経て
-- 主催者が「参加者にする」を実行することでメンバーとして登録される招待制。

create table public.circle_members (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint circle_members_unique_pair unique (circle_id, user_id)
);

create index circle_members_circle_id_idx on public.circle_members (circle_id);
create index circle_members_user_id_idx on public.circle_members (user_id);

alter table public.circle_members enable row level security;

-- 閲覧: 本人・そのサークルの主催者・管理者のみ
create policy "circle_members_select_self_or_owner_or_admin"
  on public.circle_members for select
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.circles c
      where c.id = circle_members.circle_id and c.owner_id = auth.uid()
    )
  );

-- 追加: サークル主催者・管理者のみ（招待制。参加希望者本人は自分で追加できない）
create policy "circle_members_insert_owner_or_admin"
  on public.circle_members for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.circles c
      where c.id = circle_members.circle_id and c.owner_id = auth.uid()
    )
  );

-- 削除: 本人（退会）・主催者（除名）・管理者
create policy "circle_members_delete_self_or_owner_or_admin"
  on public.circle_members for delete
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.circles c
      where c.id = circle_members.circle_id and c.owner_id = auth.uid()
    )
  );
