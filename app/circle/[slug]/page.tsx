import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportDialog } from "@/components/report-dialog";
import { DetailHeader } from "@/components/circle-detail/detail-header";
import { Breadcrumb } from "@/components/circle-detail/breadcrumb";
import { PhotoGallery } from "@/components/circle-detail/photo-gallery";
import { CircleSummary } from "@/components/circle-detail/circle-summary";
import { TabNav } from "@/components/circle-detail/tab-nav";
import { DetailContent } from "@/components/circle-detail/detail-content";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getCircleBySlug, sortedImagePaths, toCircleDetailView } from "@/lib/circles";
import { getMembershipForUser } from "@/lib/circle-members";
import { getFavoriteForUser } from "@/lib/circle-favorites";
import { publicMediaUrl } from "@/lib/storage";
import { buildOpenGraph, defaultOgImageUrl } from "@/lib/seo";
import { getCurrentUser } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCircleBySlug(slug);
  if (!data) return { title: "サークルが見つかりません" };

  const description = data.description.slice(0, 120);
  const [coverPath] = sortedImagePaths(data);
  const imageUrl = coverPath ? publicMediaUrl(coverPath) : null;

  return {
    title: data.name,
    description,
    openGraph: buildOpenGraph({ title: data.name, description, imageUrl }),
    twitter: { card: "summary_large_image", title: data.name, description, images: [imageUrl ?? defaultOgImageUrl] },
  };
}

export default async function CircleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, user] = await Promise.all([getCircleBySlug(slug), getCurrentUser()]);

  if (!data) notFound();

  const circle = toCircleDetailView(data);
  const isOwner = user?.id === data.owner_id;
  const [membership, favorite] = user
    ? await Promise.all([
        isOwner ? Promise.resolve(null) : getMembershipForUser(data.id, user.id),
        getFavoriteForUser(data.id, user.id),
      ])
    : [null, null];
  const isMember = membership !== null;
  const isFavorited = favorite !== null;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <DetailHeader isLoggedIn={!!user} />
      <main className="flex-1">
        <Breadcrumb circle={circle} />

        <section className="lg:grid lg:grid-cols-[568px_1fr] lg:gap-[34px] lg:px-8 lg:pb-[30px] lg:pt-1">
          <PhotoGallery circleName={circle.name} imagePaths={sortedImagePaths(data)} />
          <CircleSummary
            circle={circle}
            isLoggedIn={!!user}
            isOwner={isOwner}
            isMember={isMember}
            isFavorited={isFavorited}
          />
        </section>

        <TabNav slug={circle.slug} active="basic" updatesCount={circle.updatesCount} messagesCount={circle.messagesCount} />

        <section className="flex flex-col gap-4 bg-white px-4 py-4 lg:px-8 lg:py-10">
          <DetailContent circle={circle} />
        </section>
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
