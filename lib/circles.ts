// サークル一覧・詳細ページ向けのSupabaseデータアクセス層。
// Server Component からのみ呼び出す想定（lib/supabase/server.ts を使用）。

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type AreaRow = Database["public"]["Tables"]["areas"]["Row"];
export type CircleRow = Database["public"]["Tables"]["circles"]["Row"];
type CircleImageRow = Database["public"]["Tables"]["circle_images"]["Row"];
type CircleUpdateImageRow = Database["public"]["Tables"]["circle_update_images"]["Row"];
type CircleUpdateBaseRow = Database["public"]["Tables"]["circle_updates"]["Row"];
type ProfilePublicRow = Database["public"]["Views"]["profiles_public"]["Row"];

export interface CategoryNode extends CategoryRow {
  children: CategoryRow[];
}

export type CircleWithRelations = CircleRow & {
  category: CategoryRow | null;
  area: AreaRow | null;
  circle_images: CircleImageRow[];
};

export type CircleUpdateKind = "activity" | "message";

export type CircleUpdateRow = Omit<CircleUpdateBaseRow, "kind"> & {
  kind: CircleUpdateKind;
  circle_update_images: CircleUpdateImageRow[];
};

const PAGE_SIZE = 20;

export async function getCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
  const rows = await getCategories();
  const majors = rows.filter((r) => r.parent_id === null);
  return majors.map((major) => ({
    ...major,
    children: rows.filter((r) => r.parent_id === major.id),
  }));
}

export async function getFeaturedCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getAreas(): Promise<AreaRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("areas").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
  return data;
}

export async function getAreaBySlug(slug: string): Promise<AreaRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("areas").select("*").eq("slug", slug).maybeSingle();
  return data;
}

export interface CirclesFilter {
  categorySlug?: string;
  areaSlug?: string;
  keyword?: string;
  sort?: "new" | "updated";
  page?: number;
}

export interface CirclesResult {
  circles: CircleWithRelations[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export async function getCircles(filters: CirclesFilter = {}): Promise<CirclesResult> {
  const supabase = await createClient();
  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const empty: CirclesResult = { circles: [], total: 0, page, pageSize: PAGE_SIZE, pageCount: 1 };

  let query = supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*)", { count: "exact" })
    .eq("status", "published");

  if (filters.areaSlug) {
    const area = await getAreaBySlug(filters.areaSlug);
    if (!area) return empty;
    query = query.eq("area_id", area.id);
  }

  if (filters.categorySlug) {
    const category = await getCategoryBySlug(filters.categorySlug);
    if (!category) return empty;
    if (category.parent_id === null) {
      const categories = await getCategories();
      const childIds = categories.filter((c) => c.parent_id === category.id).map((c) => c.id);
      query = query.in("category_id", [category.id, ...childIds]);
    } else {
      query = query.eq("category_id", category.id);
    }
  }

  const keyword = filters.keyword?.trim();
  if (keyword) {
    const escaped = keyword.replace(/[%_\\]/g, (m) => `\\${m}`).replace(/"/g, '\\"');
    const value = `"%${escaped}%"`;
    query = query.or(`name.ilike.${value},description.ilike.${value}`);
  }

  query =
    filters.sort === "updated"
      ? query.order("updated_at", { ascending: false })
      : query.order("created_at", { ascending: false });

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;

  const total = count ?? 0;
  return {
    circles: (data ?? []) as unknown as CircleWithRelations[],
    total,
    page,
    pageSize: PAGE_SIZE,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getLatestCircles(limit = 6): Promise<CircleWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as CircleWithRelations[];
}

// 「参加中のサークル」はメンバーシップを管理するテーブルが未実装のため、
// 実装までの暫定表示として最新のサークルをプレビュー表示する。
export async function getJoinedCirclesPreview(limit = 3): Promise<CircleWithRelations[]> {
  return getLatestCircles(limit);
}

export interface CircleDetailData extends CircleWithRelations {
  categoryParent: CategoryRow | null;
  updatesCount: number;
  messagesCount: number;
  owner: ProfilePublicRow | null;
}

export async function getCircleBySlug(slug: string): Promise<CircleDetailData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*), owner:profiles_public(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const { owner, ...rest } = data as unknown as CircleWithRelations & { owner: ProfilePublicRow | null };
  const circle = rest as CircleWithRelations;

  const categories = await getCategories();
  const categoryParent = circle.category?.parent_id
    ? (categories.find((c) => c.id === circle.category!.parent_id) ?? null)
    : null;

  const [{ count: updatesCount }, { count: messagesCount }] = await Promise.all([
    supabase
      .from("circle_updates")
      .select("*", { count: "exact", head: true })
      .eq("circle_id", circle.id)
      .eq("kind", "activity"),
    supabase
      .from("circle_updates")
      .select("*", { count: "exact", head: true })
      .eq("circle_id", circle.id)
      .eq("kind", "message"),
  ]);

  return {
    ...circle,
    categoryParent,
    updatesCount: updatesCount ?? 0,
    messagesCount: messagesCount ?? 0,
    owner,
  };
}

export async function getOwnedCircles(userId: string): Promise<CircleWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*)")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as CircleWithRelations[];
}

export async function getOwnedCircleById(id: string, userId: string): Promise<CircleWithRelations | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select("*, category:categories(*), area:areas(*), circle_images(*)")
    .eq("id", id)
    .eq("owner_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as CircleWithRelations | null;
}

export async function getCircleUpdates(circleId: string, kind?: CircleUpdateKind): Promise<CircleUpdateRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("circle_updates")
    .select("*, circle_update_images(*)")
    .eq("circle_id", circleId)
    .order("created_at", { ascending: false });
  if (kind) query = query.eq("kind", kind);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as CircleUpdateRow[];
}

export {
  formatDateJa,
  circleTypeLabel,
  isRecentlyCreated,
  sortedImagePaths,
  sortedImages,
  coverImagePath,
  sortedUpdateImagePaths,
  formatShortDate,
  splitUpdateContent,
} from "@/lib/circles-format";
import { formatDateJa } from "@/lib/circles-format";

export interface CircleDetailView {
  id: string;
  slug: string;
  ownerId: string;
  name: string;
  tagline: string;
  badges: { label: string; tone: "primary" | "green" | "purple" }[];
  categoryPath: { label: string; href: string }[];
  category: string;
  area: string;
  stats: { icon: string; label: string; value: string }[];
  description: string[];
  tags: string[];
  activities: string[];
  requirements: string[];
  recruitTagline: string;
  recruitTarget: string;
  recruitCapacity: string;
  recruitCost: string;
  recruitHowToApply: string;
  ownerMessage: string;
  memberCount: string;
  foundedAt: string;
  locationPrimary: string;
  locationSecondary: string;
  locationNote: string;
  scheduleDetail: { label: string; value: string }[];
  updatesCount: number;
  messagesCount: number;
  owner: {
    name: string;
    avatarPath: string | null;
    bio: string | null;
    area: string;
    interests: string[];
    contactEmail: string | null;
  };
}

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function toCircleDetailView(data: CircleDetailData): CircleDetailView {
  const categoryPath = [
    { label: "ホーム", href: "/" },
    { label: "サークルを探す", href: "/circles" },
  ];
  if (data.categoryParent) {
    categoryPath.push({ label: data.categoryParent.name, href: `/category/${data.categoryParent.slug}` });
  }
  if (data.category) {
    categoryPath.push({ label: data.category.name, href: `/category/${data.category.slug}` });
  }

  const stats: CircleDetailView["stats"] = [
    data.type === "one_time" && data.event_date
      ? { icon: "event", label: "開催日", value: formatDateJa(data.event_date) }
      : { icon: "event_repeat", label: "活動頻度", value: data.schedule_frequency || "随時お知らせします" },
    ...(data.type !== "one_time" && data.schedule_time
      ? [{ icon: "schedule", label: "主な活動時間", value: data.schedule_time }]
      : []),
    ...(data.member_count ? [{ icon: "groups", label: "メンバー数", value: data.member_count }] : []),
    ...(data.founded_at ? [{ icon: "flag", label: "設立時期", value: data.founded_at }] : []),
  ];

  const scheduleDetail: CircleDetailView["scheduleDetail"] =
    data.type === "one_time" && data.event_date
      ? [
          { label: "開催日", value: formatDateJa(data.event_date) },
          ...(data.schedule_frequency ? [{ label: "備考", value: data.schedule_frequency }] : []),
          ...(data.schedule_time ? [{ label: "時間", value: data.schedule_time }] : []),
        ]
      : [
          { label: "頻度", value: data.schedule_frequency || "―" },
          { label: "活動時間", value: data.schedule_time || "―" },
        ];

  const descriptionLines = splitLines(data.description);

  return {
    id: data.id,
    slug: data.slug,
    ownerId: data.owner_id,
    name: data.name,
    tagline: data.tagline,
    badges:
      data.type === "one_time"
        ? [{ label: "単発イベント", tone: "purple" }]
        : [{ label: "メンバー募集中", tone: "primary" }],
    categoryPath,
    category: data.category?.name ?? "未分類",
    area: data.area?.name ?? "エリア未設定",
    stats,
    description: descriptionLines,
    tags: [],
    activities: data.activities ? splitLines(data.activities) : [],
    requirements: data.requirements ? splitLines(data.requirements) : ["どなたでも参加できます"],
    recruitTagline: data.recruit_tagline,
    recruitTarget: data.recruit_target,
    recruitCapacity: data.recruit_capacity,
    recruitCost: data.recruit_cost,
    recruitHowToApply: data.recruit_how_to_apply,
    ownerMessage: data.owner_message ?? "",
    memberCount: data.member_count,
    foundedAt: data.founded_at,
    locationPrimary: data.location || "活動場所は主催者にお問い合わせください。",
    locationSecondary: data.location_access,
    locationNote: "",
    scheduleDetail,
    updatesCount: data.updatesCount,
    messagesCount: data.messagesCount,
    owner: {
      name: data.owner?.display_name ?? "主催者",
      avatarPath: data.owner?.avatar_path ?? null,
      bio: data.owner?.bio ?? null,
      area: data.area?.name ?? "エリア未設定",
      interests: data.owner?.interests ?? [],
      contactEmail: data.owner?.contact_email ?? null,
    },
  };
}
