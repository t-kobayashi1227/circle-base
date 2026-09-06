import { WizardHeader } from "@/components/wizard-header";
import { WizardStepIndicator } from "@/components/wizard-step-indicator";
import { MypageSidebar } from "@/components/circle-create/mypage-sidebar";
import { BasicInfoForm } from "@/components/circle-create/basic-info-form";
import { FormFooterBar } from "@/components/circle-create/form-footer-bar";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { wizardSteps } from "@/lib/circle-form-options";

export default function NewCirclePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <WizardHeader title="サークルを作成する" backHref="/mypage" closeHref="/mypage" />

      <div className="lg:grid lg:grid-cols-[244px_minmax(0,1fr)] lg:items-stretch">
        <MypageSidebar />

        <div className="min-w-0">
          <div className="hidden px-7 pt-[26px] lg:block">
            <h1 className="font-heading text-[23px] font-bold text-[#2F2B24]">
              サークルを作成する
            </h1>
            <p className="mt-2 text-[12.5px] text-cb-muted-2">
              あなたのサークル・イベントを新しく掲載します。
            </p>
            <div className="mt-[22px]">
              <WizardStepIndicator steps={wizardSteps} currentStep={1} />
            </div>
          </div>

          {/* モバイルのステップバー */}
          <div className="border-b border-t border-[#F3ECE0] bg-cb-header lg:hidden">
            <WizardStepIndicator steps={wizardSteps} currentStep={1} />
          </div>

          <div className="mx-3 my-3.5 rounded-xl border border-cb-border bg-cb-surface px-4 py-[18px] lg:mx-7 lg:my-5 lg:px-[26px] lg:py-6">
            <BasicInfoForm />
          </div>
          <div className="h-6 lg:h-[26px]" />
        </div>
      </div>

      <FormFooterBar />
      <MobileBottomNav activeHref="/" messageBadge={3} />
    </div>
  );
}
