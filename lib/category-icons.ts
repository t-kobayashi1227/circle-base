// カテゴリslug毎のMaterial Symbolsアイコン名（DB側にアイコン列がないため固定マップで管理）。
const iconBySlug: Record<string, string> = {
  sports: "sports",
  culture: "palette",
  "senior-casual": "groups",
  "ball-sports": "sports_soccer",
  "martial-arts": "sports_martial_arts",
  cycling: "directions_bike",
  "winter-sports": "ac_unit",
  "marine-sports": "surfing",
  running: "directions_run",
  "outdoor-mountain": "landscape",
  "board-games": "casino",
  "book-club": "menu_book",
  photography: "photo_camera",
  music: "music_note",
  dance: "nightlife",
  crafts: "content_cut",
  cooking: "restaurant",
  esports: "sports_esports",
  "art-illustration": "palette",
  "go-shogi": "grid_on",
  gardening: "yard",
  walking: "directions_walk",
  mahjong: "casino",
  "calligraphy-tea": "brush",
};

export function categoryIcon(slug: string): string {
  return iconBySlug[slug] ?? "category";
}
