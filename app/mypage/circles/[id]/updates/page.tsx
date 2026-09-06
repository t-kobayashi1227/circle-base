import { ManageHeader } from "@/components/circle-manage/manage-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { CircleNavSidebar } from "@/components/circle-manage/circle-nav-sidebar";
import { PostsToolbar } from "@/components/circle-manage/posts-toolbar";
import { PostCard } from "@/components/circle-manage/post-card";
import { Pagination } from "@/components/circle-manage/pagination";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { updatePosts } from "@/lib/circle-updates-mock-data";

const circleName = "新潟山歩きの会";
const circleTagline = "自然を楽しみ、仲間とつながる登山サークル";

// 実データ接続まではidに関わらずモックのサークルを表示する。
export default async function CircleUpdatesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ManageHeader mobileTitle="活動の様子" backHref={managePath} />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage" },
            { label: circleName, href: managePath },
          ]}
          current="活動の様子"
        />

        <PostsToolbar postHref={`${managePath}/updates/new`} />

        <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:gap-[26px] lg:px-7 lg:pb-[34px]">
          <CircleNavSidebar circleId={id} circleName={circleName} tagline={circleTagline} activeKey="updates" />

          <div className="min-w-0 px-4 py-4 lg:px-0 lg:py-0">
            <div className="hidden lg:block">
              <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">
                サークル活動の様子
              </h1>
              <p className="mt-[9px] text-[12.5px] text-cb-muted-2">{circleName}の活動記録です</p>
            </div>

            <div className="mt-4 flex flex-col gap-3.5 lg:mt-5 lg:gap-4">
              {updatePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-4 lg:mt-0">
              <Pagination />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" messageBadge={3} />
    </div>
  );
}
