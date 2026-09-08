import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// 新規サークル等をデプロイなしでも反映できるよう、1時間ごとに再生成する。
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();

  const [{ data: circles }, { data: categories }, { data: areas }] = await Promise.all([
    supabase.from("circles").select("slug, updated_at").eq("status", "published"),
    supabase.from("categories").select("slug"),
    supabase.from("areas").select("slug"),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/circles`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const circlePages: MetadataRoute.Sitemap = (circles ?? []).map((c) => ({
    url: `${baseUrl}/circle/${c.slug}`,
    lastModified: c.updated_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const areaPages: MetadataRoute.Sitemap = (areas ?? []).map((a) => ({
    url: `${baseUrl}/area/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...circlePages, ...categoryPages, ...areaPages];
}
