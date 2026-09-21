import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { CircleImage } from "@/components/circle-image";
import { DetailHeader } from "@/components/circle-detail/detail-header";
import { Breadcrumb } from "@/components/circle-detail/breadcrumb";
import { PhotoGallery } from "@/components/circle-detail/photo-gallery";
import { CircleSummary } from "@/components/circle-detail/circle-summary";
import { TabNav } from "@/components/circle-detail/tab-nav";
import { ActivityDetailGallery } from "@/components/circle-detail/activity-detail-gallery";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import {
  coverImagePath,
  getCircleBySlug,
  getCircleUpdateById,
  sortedImagePaths,
  sortedUpdateImagePaths,
  toCircleDetailView,
} from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";
import { formatShortDate, splitUpdateContent } from "@/lib/circles-format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const [data, update] = await Promise.all([getCircleBySlug(slug), getCircleUpdateById(id)]);
  if (!data || !update) return { title: "活動の様子が見つかりません" };
  const { title } = splitUpdateContent(update.content);
  return { title: `${title} | ${data.name}` };
}

export default async function CircleActivityDetailPage({
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

  if (!data || !update || update.kind !== "activity") notFound();

  const circle = toCircleDetailView(data);
  const { title, desc } = splitUpdateContent(update.content);
  const imagePaths = sortedUpdateImagePaths(update);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <DetailHeader isLoggedIn={!!user} />
      <main className="flex-1">
        <Breadcrumb circle={circle} />

        <section className="lg:grid lg:grid-cols-[568px_1fr] lg:gap-[34px] lg:px-8 lg:pb-[30px] lg:pt-1">
          <PhotoGallery circleName={circle.name} imagePaths={sortedImagePaths(data)} />
          <CircleSummary circle={circle} isLoggedIn={!!user} isOwner={user?.id === data.owner_id} />
        </section>

        <TabNav slug={circle.slug} active="updates" updatesCount={circle.updatesCount} messagesCount={circle.messagesCount} />

        <div className="bg-white">
          <section className="px-4 pb-8 pt-[18px] lg:px-8 lg:pb-10 lg:pt-[26px]">
            <div className="lg:grid lg:grid-cols-[558px_1fr] lg:gap-8">
              <ActivityDetailGallery circleName={circle.name} imagePaths={imagePaths} />

              <div className="mt-4 min-w-0 lg:mt-0">
                <h1 className="font-heading text-[19px] font-bold leading-[1.5] text-[#2F2B24] lg:text-2xl">
                  {title}
                </h1>
                <div className="mt-2 text-[11.5px] text-cb-muted-3 lg:mt-[9px] lg:text-xs">
                  {formatShortDate(update.created_at)}
                </div>

                <div className="mt-3 flex items-center justify-between border-b border-[#EFE7DA] pb-3.5 lg:mt-3 lg:pb-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#3B352C] lg:gap-2">
                    <span className="h-[22px] w-[22px] shrink-0 overflow-hidden rounded-full lg:h-6 lg:w-6">
                      <CircleImage path={coverImagePath(data)} alt={circle.name} iconSize={12} />
                    </span>
                    {circle.name}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="hidden text-[11px] text-cb-muted-3 lg:inline">この記事をシェアする</span>
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black text-[11px] font-bold text-white lg:h-6 lg:w-6 lg:text-[13px]">
                      X
                    </span>
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#06C755] text-[6px] font-bold text-white lg:h-6 lg:w-6">
                      LINE
                    </span>
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F3EDE2] text-cb-muted lg:h-6 lg:w-6">
                      <MaterialSymbol name="link" size={14} />
                    </span>
                  </div>
                </div>

                {desc ? (
                  <p className="mt-3.5 whitespace-pre-line text-[12.5px] leading-[1.95] text-[#4B453C] lg:mt-4 lg:text-[13px] lg:leading-[2]">
                    {desc}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-[18px] flex justify-center lg:mt-[26px] lg:justify-start">
              <Link
                href={`/circle/${slug}/updates`}
                className="inline-flex items-center gap-1.5 rounded-full border border-cb-accent bg-white px-[22px] py-[11px] text-[12.5px] font-bold text-cb-accent-dark hover:bg-cb-accent-soft"
              >
                <MaterialSymbol name="chevron_left" size={16} />
                活動の様子一覧に戻る
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
