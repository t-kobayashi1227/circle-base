import type { Metadata } from "next";
import { CircleEditHeader } from "@/components/mypage/circle-edit-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { CircleEditTipsBox } from "@/components/mypage/circle-edit-tips-box";
import { CircleDeleteButton } from "@/components/mypage/circle-delete-button";
import { CircleEditForm } from "@/components/mypage/circle-edit-form";
import { CircleEditFormFooter } from "@/components/mypage/circle-edit-form-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export const metadata: Metadata = {
  title: "サークル編集",
};

// 実データ接続まではidに関わらずモックのサークルを編集対象として表示する。
export default async function CircleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <CircleEditHeader />

      <div className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[34px] border-r border-cb-border bg-cb-header py-4 lg:flex">
          <MypageNavSidebar activeHref="/mypage/circles/owned" />
          <CircleEditTipsBox />
        </div>

        <div className="min-w-0">
          <div className="bg-cb-header px-[18px] pb-4 pt-4 lg:bg-transparent lg:px-6 lg:pb-0 lg:pt-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="font-heading text-[22px] font-bold text-[#2F2B24] lg:text-[26px]">
                  サークル編集
                </h1>
                <p className="mt-2 text-[11.5px] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px]">
                  サークルの情報を編集できます。<span className="text-[#E5731B]">※</span>の項目は必須です。
                </p>
              </div>
              <CircleDeleteButton className="hidden lg:flex" />
            </div>
            <CircleDeleteButton className="mt-3.5 w-full lg:hidden" />
          </div>

          <div className="px-3.5 pb-6 pt-4 lg:px-6 lg:pb-7 lg:pt-5">
            <CircleEditForm />
          </div>
        </div>
      </div>

      <CircleEditFormFooter />
      <MobileBottomNav activeHref="/mypage" messageBadge={3} />
    </div>
  );
}
