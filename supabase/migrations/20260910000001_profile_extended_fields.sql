-- プロフィール編集フォーム（性別・年齢・エリア・趣味・公開範囲）が保存できるよう、
-- profiles テーブルに対応する列を追加する。SNSリンク（instagram/x/link）は今後削除予定のため対象外。

alter table public.profiles
  add column gender text,
  add column age_range text,
  add column area text,
  add column interests text[] not null default '{}',
  add column visibility text not null default 'public'
    check (visibility in ('public', 'members', 'private'));
