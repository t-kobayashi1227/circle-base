-- にいがたサークルベース: 初期スキーマ (MVP仕様書 v2 セクション4)
create extension if not exists "pgcrypto";

-- 更新日時を自動更新する共通トリガー関数
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- profiles (auth.users を拡張)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  real_name text not null,
  display_name text not null,
  birthdate date not null,
  -- 未成年判定はサインアップ時にアプリ側で計算して保存する（birthdateは不変のため再計算不要）
  is_minor boolean not null default false,
  guardian_consent boolean not null default false,
  avatar_path text,
  bio text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  constraint guardian_consent_required_if_minor check (
    is_minor = false or guardian_consent = true
  )
);

comment on table public.profiles is '会員・主催者共通プロフィール。real_name/birthdate/guardian_consentは非公開（本人・管理者のみ）';
comment on column public.profiles.real_name is '実名。一般ユーザー向けAPI・画面には露出させない';

-- signUp() の options.data (real_name, display_name, birthdate, guardian_consent) から
-- profiles 行を自動作成する。メール確認が有効な場合、確認完了までクライアントに
-- セッションが無くRLS経由のINSERTができないため、auth.users側のトリガーで担保する。
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_birthdate date := (new.raw_user_meta_data ->> 'birthdate')::date;
  v_is_minor boolean := extract(year from age(current_date, (new.raw_user_meta_data ->> 'birthdate')::date)) < 18;
  v_guardian_consent boolean := coalesce((new.raw_user_meta_data ->> 'guardian_consent')::boolean, false);
begin
  insert into public.profiles (id, real_name, display_name, birthdate, is_minor, guardian_consent)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'real_name', ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', ''),
    v_birthdate,
    v_is_minor,
    v_guardian_consent
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ============================================================
-- categories / areas
-- ============================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  parent_id uuid references public.categories (id) on delete set null,
  sort_order int not null default 0
);

create table public.areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0
);

-- ============================================================
-- circles
-- ============================================================
create table public.circles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  type text not null check (type in ('ongoing', 'one_time')),
  event_date date,
  category_id uuid not null references public.categories (id),
  area_id uuid not null references public.areas (id),
  description text not null default '',
  requirements text not null default '',
  schedule text not null default '',
  location text not null default '',
  status text not null default 'published' check (status in ('published', 'unpublished')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint event_date_required_for_one_time check (
    (type = 'one_time' and event_date is not null) or (type = 'ongoing')
  )
);

create index circles_owner_id_idx on public.circles (owner_id);
create index circles_category_id_idx on public.circles (category_id);
create index circles_area_id_idx on public.circles (area_id);
create index circles_status_idx on public.circles (status);
create index circles_created_at_idx on public.circles (created_at desc);
create index circles_updated_at_idx on public.circles (updated_at desc);

create trigger circles_set_updated_at
  before update on public.circles
  for each row
  execute function public.set_updated_at();

-- ============================================================
-- circle_images
-- ============================================================
create table public.circle_images (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  storage_path text not null,
  sort_order int not null default 0
);

create index circle_images_circle_id_idx on public.circle_images (circle_id);

-- ============================================================
-- circle_updates (活動の様子)
-- ============================================================
create table public.circle_updates (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles (id) on delete cascade,
  content text not null,
  image_path text,
  created_at timestamptz not null default now()
);

create index circle_updates_circle_id_idx on public.circle_updates (circle_id, created_at desc);

-- ============================================================
-- conversations / messages
-- ============================================================
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid references public.circles (id) on delete set null,
  participant_a uuid not null references public.profiles (id) on delete cascade,
  participant_b uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint participants_distinct check (participant_a <> participant_b)
);

create index conversations_participant_a_idx on public.conversations (participant_a);
create index conversations_participant_b_idx on public.conversations (participant_b);
create unique index conversations_unique_pair_idx
  on public.conversations (circle_id, least(participant_a, participant_b), greatest(participant_a, participant_b));

create trigger conversations_set_updated_at
  before update on public.conversations
  for each row
  execute function public.set_updated_at();

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index messages_conversation_id_idx on public.messages (conversation_id, created_at);

-- 新規メッセージ時に会話の updated_at を更新（一覧の最終メッセージ日時ソート用）
-- SECURITY DEFINER: 参加者に conversations の UPDATE 権限を付与していないため、RLSを迂回して実行する
create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

create trigger messages_touch_conversation
  after insert on public.messages
  for each row
  execute function public.touch_conversation_on_message();

-- ============================================================
-- reports / blocks
-- ============================================================
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  target_type text not null check (target_type in ('circle', 'user')),
  target_id uuid not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'resolved')),
  created_at timestamptz not null default now()
);

create index reports_status_idx on public.reports (status);
create index reports_target_idx on public.reports (target_type, target_id);

create table public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint blocker_blocked_distinct check (blocker_id <> blocked_id),
  constraint blocks_unique_pair unique (blocker_id, blocked_id)
);

create index blocks_blocker_id_idx on public.blocks (blocker_id);
