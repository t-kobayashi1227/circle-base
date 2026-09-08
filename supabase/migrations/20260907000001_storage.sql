-- にいがたサークルベース: 画像アップロード用ストレージ設定
-- サークルメイン画像・活動の様子画像・プロフィール画像を1つの公開バケットで管理する。
-- パス規約: {uploaderのuid}/circles/{circleId}/... , {uploaderのuid}/updates/{updateId}/... , {uploaderのuid}/avatar/...
-- アップロード者本人のみ書き込み可能（パス先頭のuidで判定）、閲覧は誰でも可能。

insert into storage.buckets (id, name, public)
values ('circle-media', 'circle-media', true)
on conflict (id) do nothing;

create policy "circle_media_public_read"
  on storage.objects for select
  using (bucket_id = 'circle-media');

create policy "circle_media_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'circle-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "circle_media_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'circle-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "circle_media_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'circle-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
