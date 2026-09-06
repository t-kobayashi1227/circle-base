import { MaterialSymbol } from "@/components/icons/material-symbol";
import { DetailHeader } from "@/components/circle-detail/detail-header";
import { Breadcrumb } from "@/components/circle-detail/breadcrumb";
import { PhotoGallery } from "@/components/circle-detail/photo-gallery";
import { CircleSummary } from "@/components/circle-detail/circle-summary";
import { TabNav } from "@/components/circle-detail/tab-nav";
import { DetailContent } from "@/components/circle-detail/detail-content";
import { DetailSidebar } from "@/components/circle-detail/detail-sidebar";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { mockCircleDetail } from "@/lib/circle-detail-mock-data";

// 実データ接続まではスラッグに関わらずモックのサークル詳細を表示する。
export default function CircleDetailPage() {
  const circle = mockCircleDetail;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <DetailHeader />
      <main className="flex-1">
        <Breadcrumb circle={circle} />

        <section className="lg:grid lg:grid-cols-[568px_1fr] lg:gap-[34px] lg:px-8 lg:pb-[30px] lg:pt-1">
          <PhotoGallery photos={circle.photos} />
          <CircleSummary circle={circle} />
        </section>

        <TabNav />

        <section className="flex flex-col gap-4 px-4 py-4 lg:grid lg:grid-cols-[1fr_384px] lg:gap-6 lg:px-8 lg:py-10">
          <DetailContent circle={circle} />
          <DetailSidebar circle={circle} />
        </section>
      </main>
      <SiteFooter
        extra={
          <button type="button" className="flex items-center gap-1.5 text-cb-muted-3 hover:text-cb-accent">
            <MaterialSymbol name="flag" size={15} />
            このサークルを通報する
          </button>
        }
      />
      <MobileBottomNav activeHref="/" messageBadge={3} />
    </div>
  );
}
