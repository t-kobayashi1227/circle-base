// お知らせ用のmicroCMSデータアクセス層。
// Server Component からのみ呼び出す想定。

import { createClient, isMicroCMSRequestError } from "microcms-js-sdk";
import type { MicroCMSListContent } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

const ENDPOINT = "notices";
const REVALIDATE_SECONDS = 60;

export type NoticeCategory = "重要" | "お知らせ" | "イベント";

interface MicroCMSNotice extends MicroCMSListContent {
  title: string;
  category: NoticeCategory;
  body: string;
  scheduleLabel?: string;
  scheduleDatetime?: string;
  scheduleNote?: string;
}

export interface NoticeSchedule {
  label: string;
  datetime: string;
  note?: string;
}

export interface Notice {
  slug: string;
  date: string;
  title: string;
  tag: NoticeCategory;
  tagBg: string;
  tagColor: string;
  body: string;
  schedule?: NoticeSchedule;
}

const CATEGORY_STYLES: Record<NoticeCategory, { bg: string; color: string }> = {
  重要: { bg: "#FDECEA", color: "#C5453A" },
  お知らせ: { bg: "#EDF3F9", color: "#4D6B8A" },
  イベント: { bg: "#FDF3E4", color: "#C07E1B" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function toNotice(raw: MicroCMSNotice): Notice {
  const style = CATEGORY_STYLES[raw.category];
  return {
    slug: raw.id,
    date: formatDate(raw.publishedAt ?? raw.createdAt),
    title: raw.title,
    tag: raw.category,
    tagBg: style.bg,
    tagColor: style.color,
    body: raw.body,
    schedule:
      raw.scheduleLabel && raw.scheduleDatetime
        ? { label: raw.scheduleLabel, datetime: raw.scheduleDatetime, note: raw.scheduleNote }
        : undefined,
  };
}

export async function getAllNotices(): Promise<Notice[]> {
  const contents = await client.getAllContents<MicroCMSNotice>({
    endpoint: ENDPOINT,
    queries: { orders: "-publishedAt" },
    customRequestInit: { next: { revalidate: REVALIDATE_SECONDS } },
  });
  return contents.map(toNotice);
}

export async function getLatestNotices(limit: number): Promise<Notice[]> {
  const { contents } = await client.getList<MicroCMSNotice>({
    endpoint: ENDPOINT,
    queries: { orders: "-publishedAt", limit },
    customRequestInit: { next: { revalidate: REVALIDATE_SECONDS } },
  });
  return contents.map(toNotice);
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  try {
    const raw = await client.getListDetail<MicroCMSNotice>({
      endpoint: ENDPOINT,
      contentId: slug,
      customRequestInit: { next: { revalidate: REVALIDATE_SECONDS } },
    });
    return toNotice(raw);
  } catch (error) {
    if (isMicroCMSRequestError(error) && error.status === 404) return null;
    throw error;
  }
}
