import { notFound } from "next/navigation";
import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { PostsToolbar } from "@/components/circle-manage/posts-toolbar";
import { PostCard } from "@/components/circle-manage/post-card";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { coverImagePath, getCircleUpdates, getOwnedCircleById } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export default async function CircleUpdatesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const circle = await getOwnedCircleById(id, user.id);
  if (!circle) notFound();

  const updates = await getCircleUpdates(id);
  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="活動の様子" backHref={managePath} />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
            { label: circle.name, href: `${managePath}/edit` },
          ]}
          current="活動の様子"
        />

        <PostsToolbar postHref={`${managePath}/updates/new`} />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar
            circleId={id}
            circleName={circle.name}
            tagline={circle.description}
            type={circle.type}
            status={circle.status}
            imagePath={coverImagePath(circle)}
            activeKey="updates"
          />

          <div className="min-w-0 px-4 py-4 lg:px-0 lg:py-0">
            <div className="hidden lg:block">
              <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">サークル活動の様子</h1>
              <p className="mt-[9px] text-[12.5px] text-cb-muted-2">{circle.name}の活動記録です</p>
            </div>

            {updates.length === 0 ? (
              <p className="mt-8 text-center text-[12.5px] text-cb-muted">
                まだ活動の様子が投稿されていません。最初の投稿をしてみましょう。
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-3.5 lg:mt-5 lg:gap-4">
                {updates.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
