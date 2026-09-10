-- アカウント設定のメール通知設定が保存できるよう、profiles テーブルに列を追加する。
alter table public.profiles
  add column notification_settings jsonb not null default '{
    "messages": true,
    "circleApprovals": true,
    "eventReminders": true,
    "announcements": true
  }'::jsonb;
