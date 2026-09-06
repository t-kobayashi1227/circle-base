import { WizardHeader } from "@/components/wizard-header";
import { WizardStepIndicator } from "@/components/wizard-step-indicator";
import { ManageBreadcrumb } from "@/components/circle-manage/manage-breadcrumb";
import { PostCircleBar } from "@/components/circle-update-post/post-circle-bar";
import { PostForm } from "@/components/circle-update-post/post-form";
import { PostSidebar } from "@/components/circle-update-post/post-sidebar";
import { PostFooterBar } from "@/components/circle-update-post/post-footer-bar";
import { SiteFooter } from "@/components/home/site-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { postWizardSteps } from "@/lib/circle-post-form-options";

const circleName = "新潟山歩きの会";

// 実データ接続まではidに関わらずモックのサークルを表示する。
export default async function NewActivityPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const managePath = `/mypage/circles/${id}`;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <WizardHeader
        title="活動の様子を投稿"
        backHref={`${managePath}/updates`}
        closeHref={`${managePath}/updates`}
      />
      <PostCircleBar circleName={circleName} />

      <main className="flex-1">
        <ManageBreadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "マイページ", href: "/mypage" },
            { label: "サークル一覧", href: "/mypage" },
            { label: circleName, href: managePath },
          ]}
          current="活動の様子を投稿"
        />

        <div className="px-7 pb-[34px]">
          <div className="hidden lg:block">
            <h1 className="font-heading text-[25px] font-bold text-[#2F2B24]">
              活動の様子を投稿する
            </h1>
            <p className="mt-2 text-[12.5px] text-cb-muted-2">
              サークルの活動記録を共有して、雰囲気を伝えましょう。
            </p>
          </div>
          <div className="mt-[22px] hidden lg:block">
            <WizardStepIndicator steps={postWizardSteps} currentStep={1} />
          </div>
        </div>

        {/* モバイルのステップバー */}
        <div className="border-b border-t border-[#F3ECE0] bg-cb-header lg:hidden">
          <WizardStepIndicator steps={postWizardSteps} currentStep={1} />
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-[22px] lg:px-7 lg:pb-[34px]">
          <div className="mx-3 my-3.5 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:mx-0 lg:my-0 lg:px-[26px] lg:py-6">
            <PostForm />
          </div>
          <PostSidebar circleName={circleName} circleMeta="アウトドア・登山／中央区" />
        </div>
      </main>

      <PostFooterBar />
      <SiteFooter />
      <MobileBottomNav activeHref="/mypage" messageBadge={3} />
    </div>
  );
}
