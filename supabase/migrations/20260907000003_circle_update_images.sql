-- にいがたサークルベース: 活動報告（circle_updates）を複数枚の写真に対応させる。
-- 旧: circle_updates.image_path（単一カラム）→ 新: circle_update_images テーブル（circle_images と同じ形）。

create table public.circle_update_images (
  id uuid primary key default gen_random_uuid(),
  circle_update_id uuid not null references public.circle_updates (id) on delete cascade,
  storage_path text not null,
  sort_order int not null default 0
);

create index circle_update_images_circle_update_id_idx on public.circle_update_images (circle_update_id);

insert into public.circle_update_images (circle_update_id, storage_path, sort_order)
select id, image_path, 0 from public.circle_updates where image_path is not null;

alter table public.circle_updates drop column image_path;

alter table public.circle_update_images enable row level security;

create policy "circle_update_images_select"
  on public.circle_update_images for select
  using (
    exists (
      select 1 from public.circle_updates u
      join public.circles c on c.id = u.circle_id
      where u.id = circle_update_images.circle_update_id
        and (c.status = 'published' or c.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "circle_update_images_write_owner_or_admin"
  on public.circle_update_images for all
  using (
    exists (
      select 1 from public.circle_updates u
      join public.circles c on c.id = u.circle_id
      where u.id = circle_update_images.circle_update_id
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  )
  with check (
    exists (
      select 1 from public.circle_updates u
      join public.circles c on c.id = u.circle_id
      where u.id = circle_update_images.circle_update_id
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );
