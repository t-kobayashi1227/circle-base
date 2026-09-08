-- にいがたサークルベース: circle-media バケットにファイルサイズ・MIMEタイプの上限を設定する。
-- これまでクライアント側（image-dropzone.tsx）のみでの検証だったため、
-- Storage APIを直接叩く経路からの任意サイズ・任意形式のアップロードを防ぐ。

update storage.buckets
set file_size_limit = 5242880, -- 5MB
    allowed_mime_types = array['image/jpeg', 'image/png']
where id = 'circle-media';
