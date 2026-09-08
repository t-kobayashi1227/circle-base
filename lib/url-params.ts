// 一覧系ページ（/circles, /category/[slug], /area/[slug]）で共通して使う
// クエリパラメータの型とURL組み立てヘルパー。

export interface ListParams {
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
  for (const key of ["category", "area", "q", "sort", "page"] as const) {
    const value = key in overrides ? overrides[key] : current[key];
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
