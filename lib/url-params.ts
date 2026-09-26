// 一覧系ページ（/circles, /category/[slug], /area/[slug]）で共通して使う
// クエリパラメータの型とURL組み立てヘルパー。

export interface ListParams {
  type?: string;
  category?: string;
  area?: string;
  q?: string;
  sort?: string;
  page?: string;
}

export function buildListHref(
  base: string,
  current: ListParams,
  overrides: Partial<Record<keyof ListParams, string | null>>,
): string {
  const params = new URLSearchParams();
  for (const key of ["type", "category", "area", "q", "sort", "page"] as const) {
    const value = key in overrides ? overrides[key] : current[key];
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// 一覧の種別フィルタ。URLでは circle / event、DBの circles.type では ongoing / one_time。
export const LIST_TYPES = {
  circle: { label: "サークル", dbType: "ongoing" },
  event: { label: "イベント", dbType: "one_time" },
} as const;

export type ListType = keyof typeof LIST_TYPES;

export function parseListType(value: string | undefined): ListType | undefined {
  return value === "circle" || value === "event" ? value : undefined;
}

// ヘッダーの「サークルを探す」「イベントを探す」。一覧の種別フィルタと対応させ、選択中の種別をハイライトする。
export const HEADER_SEARCH_LINKS = [
  { type: "circle", label: "サークルを探す", href: "/circles?type=circle" },
  { type: "event", label: "イベントを探す", href: "/circles?type=event" },
] as const satisfies readonly { type: ListType; label: string; href: string }[];
