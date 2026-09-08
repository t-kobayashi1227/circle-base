import { WizardHeader } from "@/components/wizard-header";
import { MypageSidebar } from "@/components/circle-create/mypage-sidebar";
import { CircleForm } from "@/components/circle-create/circle-form";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getAreas, getCategories } from "@/lib/circles";

export const metadata = { title: "サークルを作成する" };

export default async function NewCirclePage() {
  const [categories, areas] = await Promise.all([getCategories(), getAreas()]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <WizardHeader title="サークルを作成する" backHref="/mypage" closeHref="/mypage" />

      <div className="lg:grid lg:grid-cols-[244px_minmax(0,1fr)] lg:items-stretch">
        <MypageSidebar />

        <div className="min-w-0">
          <div className="hidden px-7 pt-[26px] lg:block">
            <h1 className="font-heading text-[23px] font-bold text-[#2F2B24]">サークルを作成する</h1>
            <p className="mt-2 text-[12.5px] text-cb-muted-2">
              あなたのサークル・イベントを新しく掲載します。作成すると即座に公開されます。
            </p>
          </div>

          <div className="mx-3 my-3.5 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:mx-7 lg:my-5 lg:px-[26px] lg:py-6">
            <CircleForm mode="create" categories={categories} areas={areas} redirectTo="/mypage/circles/owned" />
          </div>
          <div className="h-6 lg:h-[26px]" />
        </div>
      </div>

      <MobileBottomNav activeHref="/" />
    </div>
  );
}
