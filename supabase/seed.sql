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
insert into public.categories (slug, name, parent_id, sort_order)
select v.slug, v.name, p.id, v.sort_order
from (values
  ('ball-sports', '球技（サッカー／フットサル／バスケ／バレー／テニス／卓球／野球など）', 1),
  ('martial-arts', '格闘技', 2),
  ('cycling', 'サイクルスポーツ', 3),
  ('winter-sports', 'ウインタースポーツ', 4),
  ('marine-sports', 'マリンスポーツ', 5),
  ('running', 'ランニング・マラソン', 6),
  ('outdoor-mountain', 'アウトドア・登山', 7)
) as v(slug, name, sort_order)
cross join (select id from public.categories where slug = 'sports') as p
on conflict (slug) do nothing;

-- ============================================================
-- categories: 中分類 (文化系)
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order)
select v.slug, v.name, p.id, v.sort_order
from (values
  ('board-games', 'ボードゲーム・カードゲーム', 1),
  ('book-club', '読書会', 2),
  ('photography', '写真・カメラ', 3),
  ('music', '音楽・楽器', 4),
  ('dance', 'ダンス', 5),
  ('crafts', '手芸・クラフト', 6),
  ('cooking', '料理・お菓子作り', 7),
  ('esports', 'eスポーツ', 8),
  ('art-illustration', 'アート・イラスト', 9)
) as v(slug, name, sort_order)
cross join (select id from public.categories where slug = 'culture') as p
on conflict (slug) do nothing;

-- ============================================================
-- categories: 中分類 (シニア・ゆるやか系)
-- ============================================================
insert into public.categories (slug, name, parent_id, sort_order)
select v.slug, v.name, p.id, v.sort_order
from (values
  ('go-shogi', '囲碁・将棋', 1),
  ('gardening', '園芸・ガーデニング', 2),
  ('walking', 'ウォーキング', 3),
  ('mahjong', '麻雀', 4),
  ('calligraphy-tea', '書道・茶道', 5)
) as v(slug, name, sort_order)
cross join (select id from public.categories where slug = 'senior-casual') as p
on conflict (slug) do nothing;
