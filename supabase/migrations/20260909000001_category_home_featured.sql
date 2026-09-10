-- カテゴリ名の修正、および「トップページに表示する」を管理画面から運用で切り替えられるようにする is_featured 列を追加する。

alter table public.categories
  add column is_featured boolean not null default false;

update public.categories set name = 'スポーツ' where slug = 'ball-sports';
update public.categories set name = 'ゲーム' where slug = 'esports';

update public.categories
set is_featured = true
where slug in ('ball-sports', 'martial-arts', 'board-games', 'book-club', 'go-shogi', 'gardening');
