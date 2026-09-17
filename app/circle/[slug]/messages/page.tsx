import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportDialog } from "@/components/report-dialog";
import { DetailHeader } from "@/components/circle-detail/detail-header";
import { Breadcrumb } from "@/components/circle-detail/breadcrumb";
import { PhotoGallery } from "@/components/circle-detail/photo-gallery";
import { CircleSummary } from "@/components/circle-detail/circle-summary";
import { TabNav } from "@/components/circle-detail/tab-nav";
import { MessageList } from "@/components/circle-detail/message-list";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCircleBySlug, getCircleUpdates, sortedImagePaths, toCircleDetailView } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCircleBySlug(slug);
  if (!data) return { title: "サークルが見つかりません" };

  return { title: `メッセージ | ${data.name}` };
}

export default async function CircleMessagesTabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, user] = await Promise.all([getCircleBySlug(slug), getCurrentUser()]);

  if (!data) notFound();

  const circle = toCircleDetailView(data);
  const updates = await getCircleUpdates(data.id, "message");

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
          <MessageList updates={updates} />
        </div>
      </main>
      <SiteFooter
        extra={
          user && user.id !== data.owner_id ? (
            <ReportDialog
              targetType="circle"
              targetId={data.id}
              triggerLabel="このサークルを通報する"
              triggerClassName="flex items-center gap-1.5 text-cb-muted-3 hover:text-cb-accent"
            />
          ) : null
        }
      />
      <MobileBottomNav activeHref="/circles" />
    </div>
  );
}
