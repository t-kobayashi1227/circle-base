"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";
import { StyledCheckbox } from "@/components/styled-checkbox";
import { notifSettings } from "@/lib/account-settings-mock-data";
import { createClient } from "@/lib/supabase/client";

type NotificationSettingsValue = Record<string, boolean>;

export function NotificationSettingsCard({
  userId,
  initialSettings,
}: {
  userId: string;
  initialSettings: NotificationSettingsValue;
}) {
  const [enabled, setEnabled] = useState<NotificationSettingsValue>(() =>
    Object.fromEntries(notifSettings.map((s) => [s.key, initialSettings[s.key] ?? true])),
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleToggle(key: string, checked: boolean) {
    const next = { ...enabled, [key]: checked };
    setEnabled(next);
    setStatus("saving");

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ notification_settings: next })
      .eq("id", userId);

    setStatus(error ? "error" : "saved");
  }

  return (
    <div className="rounded-xl border border-cb-border bg-cb-surface px-4 pb-2 pt-4 lg:px-6 lg:pb-1 lg:pt-[22px]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MaterialSymbol name="mail" filled size={19} className="text-cb-accent lg:text-[20px]" />
          <h2 className="font-heading text-[15px] font-bold text-cb-ink lg:text-base">メール通知設定</h2>
        </div>
        {status === "saving" ? (
          <span className="text-[10.5px] text-cb-muted-3">保存中...</span>
        ) : status === "saved" ? (
          <span className="text-[10.5px] text-[#2F7D4F]">保存しました</span>
        ) : status === "error" ? (
          <span className="text-[10.5px] text-[#D1453B]">保存に失敗しました</span>
        ) : null}
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
                onChange={(e) => handleToggle(setting.key, e.target.checked)}
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
