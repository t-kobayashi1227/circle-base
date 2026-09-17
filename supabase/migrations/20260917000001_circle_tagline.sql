-- サークル詳細ページのサークル名下に表示される「一言」を、紹介文の1行目から独立した
-- 編集可能な項目にする。

alter table public.circles
  add column if not exists tagline text not null default '';

-- 既存サークルは、これまで一言として表示されていた紹介文の1行目を初期値として引き継ぐ。
update public.circles
set tagline = split_part(description, chr(10), 1)
where tagline = '';
