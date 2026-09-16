import { notFound } from "next/navigation";
import { WizardHeader } from "@/components/wizard-header";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { PostCircleBar } from "@/components/circle-update-post/post-circle-bar";
import { PostForm } from "@/components/circle-update-post/post-form";
import { PostSidebar } from "@/components/circle-update-post/post-sidebar";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getOwnedCircleById } from "@/lib/circles";
import { getCurrentUser } from "@/lib/auth";

export default async function NewActivityPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const circle = await getOwnedCircleById(id, user.id);
  if (!circle) notFound();

  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <WizardHeader title="投稿する" backHref={`${managePath}/updates`} closeHref={`${managePath}/updates`} />
      <PostCircleBar circleName={circle.name} />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage/circles/owned" },
            { label: circle.name, href: `${managePath}/edit` },
          ]}
          current="投稿する"
        />

        <div className="px-7 pb-2 pt-[26px]">
          <div className="hidden lg:block">
            <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">投稿する</h1>
            <p className="mt-2 text-[12.5px] text-cb-muted-2">
              活動の様子（写真付きの活動報告）や、メンバーへのお知らせ・メッセージを投稿できます。
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-[22px] lg:px-7 lg:pb-[34px]">
          <div className="mx-3 my-3.5 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:mx-0 lg:my-0 lg:px-[26px] lg:py-6">
            <PostForm circleId={id} redirectTo={`${managePath}/updates`} />
          </div>
          <PostSidebar circleName={circle.name} circleMeta={`${circle.category?.name ?? ""}／${circle.area?.name ?? ""}`} />
        </div>
      </main>

      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
