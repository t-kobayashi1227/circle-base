import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { DetailHeader } from "@/components/circle-detail/detail-header";
import { Breadcrumb } from "@/components/circle-detail/breadcrumb";
import { PhotoGallery } from "@/components/circle-detail/photo-gallery";
import { CircleSummary } from "@/components/circle-detail/circle-summary";
import { TabNav } from "@/components/circle-detail/tab-nav";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCircleBySlug, getCircleUpdateById, sortedImagePaths, toCircleDetailView } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";
import { formatShortDate, splitUpdateContent } from "@/lib/circles-format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const [data, update] = await Promise.all([getCircleBySlug(slug), getCircleUpdateById(id)]);
  if (!data || !update) return { title: "メッセージが見つかりません" };
  const title = update.title ?? splitUpdateContent(update.content).title;
  return { title: `${title} | ${data.name}` };
}

export default async function CircleMessageDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const [data, user, update] = await Promise.all([
    getCircleBySlug(slug),
    getCurrentUser(),
    getCircleUpdateById(id),
  ]);

  if (!data || !update || update.kind !== "message") notFound();

  const circle = toCircleDetailView(data);
  const title = update.title ?? splitUpdateContent(update.content).title;
  const body = update.title ? update.content : splitUpdateContent(update.content).desc;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <DetailHeader isLoggedIn={!!user} />
      <main className="flex-1">
        <Breadcrumb circle={circle} />

        <section className="lg:grid lg:grid-cols-[568px_1fr] lg:gap-[34px] lg:px-8 lg:pb-[30px] lg:pt-1">
          <PhotoGallery circleName={circle.name} imagePaths={sortedImagePaths(data)} />
          <CircleSummary circle={circle} isLoggedIn={!!user} isOwner={user?.id === data.owner_id} />
        </section>

        <TabNav slug={circle.slug} active="messages" updatesCount={circle.updatesCount} messagesCount={circle.messagesCount} />

        <div className="bg-white">
          <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
            <Link
              href={`/circle/${slug}/messages`}
              className="mb-4 inline-flex items-center gap-1 text-[11.5px] text-cb-muted-2 hover:text-cb-accent"
            >
              <MaterialSymbol name="chevron_left" size={16} />
              メッセージ一覧に戻る
            </Link>

            <div className="mt-2 overflow-hidden rounded-xl border border-cb-border bg-cb-surface">
              <div className="border-b border-[#F5EFE5] px-5 py-4 lg:px-7 lg:py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cb-accent-soft">
                    <MaterialSymbol name="chat_bubble" filled size={18} className="text-cb-accent" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-[15px] font-bold leading-[1.5] text-[#2F2B24] lg:text-[17px]">{title}</h1>
                    <span className="text-[11px] text-cb-muted-3">{formatShortDate(update.created_at)}</span>
                  </div>
                </div>
              </div>

              {body ? (
                <div className="px-5 py-5 lg:px-7 lg:py-6">
                  <p className="whitespace-pre-line text-[13px] leading-[1.9] text-cb-ink-soft lg:text-[13.5px]">
                    {body}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
