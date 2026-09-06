"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { StyledCheckbox } from "@/components/styled-checkbox";
import { notifSettings } from "@/lib/account-settings-mock-data";

export function NotificationSettingsCard() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notifSettings.map((s) => [s.key, true])),
  );

  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-2 pt-4 lg:px-6 lg:pb-1 lg:pt-[22px]">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="mail" filled size={19} className="text-cb-accent lg:text-[20px]" />
        <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">メール通知設定</h2>
      </div>
      <div className="mt-1.5 hidden text-[11.5px] text-cb-muted-3 lg:block">
        受け取りたいメールの種類を選択してください。
      </div>

      <div className="mt-3.5 flex flex-col gap-4 lg:mt-4 lg:gap-4">
        {notifSettings.map((setting) => (
          <label key={setting.key} className="flex items-start gap-2.5">
            <span className="mt-px">
              <StyledCheckbox
                checked={enabled[setting.key]}
                onChange={(e) => setEnabled((prev) => ({ ...prev, [setting.key]: e.target.checked }))}
              />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#3B352C] lg:text-[12.5px]">{setting.label}</div>
              <div className="mt-1.5 text-[10.5px] leading-[1.7] text-cb-muted-3">{setting.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
