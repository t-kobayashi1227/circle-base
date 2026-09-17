-- 「主催者情報」タブ向けに、サークルの紹介文とは別に主催者からのメッセージを
-- 入力できるようにする。また、主催者の連絡先としてメールアドレスを公開できるようにする。

alter table public.circles
  add column if not exists owner_message text not null default '';

alter table public.profiles
  add column if not exists contact_email text;

-- 公開ビューに趣味・関心と連絡先メールアドレスを追加する。
-- CREATE OR REPLACE VIEW は既存列の並び替え・改名ができないため、新しい列は末尾に追加する。
create or replace view public.profiles_public
  with (security_invoker = false)
  as
  select id, display_name, avatar_path, bio, created_at, interests, contact_email
  from public.profiles;
