-- サークル編集フォームで「活動内容」を入力・保存できるよう、
-- circles テーブルに対応する列を追加する。description（紹介文）とは別に、
-- 具体的な活動内容を改行区切りの箇条書きとして保持する。

alter table public.circles
  add column activities text not null default '';
