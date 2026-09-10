-- にいがたサークルベース: 初期マスタデータ (MVP仕様書 v2 セクション1.2, 1.3)
-- `supabase db reset` / 初回セットアップ時に投入する

-- ============================================================
-- areas: 新潟市の区 + 市内全域
-- ============================================================
insert into public.areas (slug, name, sort_order) values
  ('chuo-ku', '中央区', 1),
  ('higashi-ku', '東区', 2),
  ('nishi-ku', '西区', 3),
  ('konan-ku', '江南区', 4),
  ('akiha-ku', '秋葉区', 5),
  ('minami-ku', '南区', 6),
  ('kita-ku', '北区', 7),
  ('nishikan-ku', '西蒲区', 8),
  ('citywide', '市内全域', 9)
on conflict (slug) do nothing;

-- ============================================================
-- categories: 大分類
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order) values
  ('sports', 'スポーツ系', null, 1),
  ('culture', '文化系', null, 2),
  ('senior-casual', 'シニア・ゆるやか系', null, 3)
on conflict (slug) do nothing;

-- ============================================================
-- categories: 中分類 (スポーツ系)
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order, is_featured)
select v.slug, v.name, p.id, v.sort_order, v.is_featured
from (values
  ('ball-sports', 'スポーツ', 1, true),
  ('martial-arts', '格闘技', 2, true),
  ('cycling', 'サイクルスポーツ', 3, false),
  ('winter-sports', 'ウインタースポーツ', 4, false),
  ('marine-sports', 'マリンスポーツ', 5, false),
  ('running', 'ランニング・マラソン', 6, false),
  ('outdoor-mountain', 'アウトドア・登山', 7, false)
) as v(slug, name, sort_order, is_featured)
cross join (select id from public.categories where slug = 'sports') as p
on conflict (slug) do nothing;

-- ============================================================
-- categories: 中分類 (文化系)
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order, is_featured)
select v.slug, v.name, p.id, v.sort_order, v.is_featured
from (values
  ('board-games', 'ボードゲーム・カードゲーム', 1, true),
  ('book-club', '読書会', 2, true),
  ('photography', '写真・カメラ', 3, false),
  ('music', '音楽・楽器', 4, false),
  ('dance', 'ダンス', 5, false),
  ('crafts', '手芸・クラフト', 6, false),
  ('cooking', '料理・お菓子作り', 7, false),
  ('esports', 'ゲーム', 8, false),
  ('art-illustration', 'アート・イラスト', 9, false)
) as v(slug, name, sort_order, is_featured)
cross join (select id from public.categories where slug = 'culture') as p
on conflict (slug) do nothing;

-- ============================================================
-- categories: 中分類 (シニア・ゆるやか系)
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order, is_featured)
select v.slug, v.name, p.id, v.sort_order, v.is_featured
from (values
  ('go-shogi', '囲碁・将棋', 1, true),
  ('gardening', '園芸・ガーデニング', 2, true),
  ('walking', 'ウォーキング', 3, false),
  ('mahjong', '麻雀', 4, false),
  ('calligraphy-tea', '書道・茶道', 5, false)
) as v(slug, name, sort_order, is_featured)
cross join (select id from public.categories where slug = 'senior-casual') as p
on conflict (slug) do nothing;
