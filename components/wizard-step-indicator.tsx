// マイページ内の複数ステップフォーム（サークル作成・活動の様子投稿など）で共通のステップ表示。
export function WizardStepIndicator({
  steps,
  currentStep,
}: {
  steps: readonly string[];
  currentStep: number;
}) {
  return (
    <>
      {/* デスクトップ */}
      <div className="hidden items-center gap-2.5 lg:flex">
        {steps.map((label, i) => {
          const n = i + 1;
          const active = n === currentStep;
          const hasLine = i < steps.length - 1;
          return (
            <div key={label} className="flex items-center gap-2.5">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border text-xs font-bold ${
                    active
                      ? "border-cb-accent bg-cb-accent text-white"
                      : "border-[#E6DCCB] bg-white text-cb-placeholder"
                  }`}
                >
                  {n}
                </div>
                <span
                  className={`whitespace-nowrap text-[12.5px] ${
                    active ? "font-bold text-cb-accent-dark" : "text-cb-muted-3"
                  }`}
                >
                  {label}
                </span>
              </div>
              {hasLine ? <div className="h-px w-[74px] bg-[#E6DCCB]" /> : null}
            </div>
          );
        })}
      </div>

      {/* モバイル */}
      <div className="flex items-start px-3 pb-4 pt-3.5 lg:hidden">
        {steps.map((label, i) => {
          const n = i + 1;
          const active = n === currentStep;
          const hasLine = i < steps.length - 1;
          return (
            <div key={label} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[13px] font-bold ${
                    active
                      ? "border-cb-accent bg-cb-accent text-white"
                      : "border-[#E6DCCB] bg-white text-cb-placeholder"
                  }`}
                >
                  {n}
                </div>
                <span
                  className={`whitespace-nowrap text-[10px] ${
                    active ? "font-bold text-cb-accent-dark" : "text-cb-muted-3"
                  }`}
                >
                  {label}
                </span>
              </div>
              {hasLine ? <div className="mt-[15px] h-px w-[18px] shrink-0 bg-[#E6DCCB]" /> : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
