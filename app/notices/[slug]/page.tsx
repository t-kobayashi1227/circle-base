import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteSearchHeader } from "@/components/site-search-header";
import { ListBreadcrumb } from "@/components/circles-list/list-breadcrumb";
import { NoticesHero } from "@/components/notices/notices-hero";
import { NoticeDetailArticle } from "@/components/notices/notice-detail-article";
import { NoticeDetailSidebar } from "@/components/notices/notice-detail-sidebar";
import { LegalSkylineBanner } from "@/components/legal/legal-skyline-banner";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAllNotices, getNoticeBySlug } from "@/lib/microcms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);
  if (!notice) return { title: "お知らせが見つかりません" };
  return { title: notice.title };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [notice, notices] = await Promise.all([getNoticeBySlug(slug), getAllNotices()]);
  if (!notice) notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <SiteSearchHeader />

      <main className="flex-1 bg-white">
        <ListBreadcrumb items={[{ label: "ホーム", href: "/" }, { label: "お知らせ", href: "/notices" }]} current={notice.title} />

        <NoticesHero />

        <div className="px-[18px] pb-2 pt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-5 lg:px-7 lg:pb-2 lg:pt-[18px]">
          <NoticeDetailArticle notice={notice} />
          <div className="mt-4 lg:mt-0">
            <NoticeDetailSidebar notices={notices} currentSlug={notice.slug} />
          </div>
        </div>

        <LegalSkylineBanner />
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/notices" />
    </div>
  );
}
