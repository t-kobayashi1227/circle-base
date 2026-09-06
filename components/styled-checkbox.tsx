import type { InputHTMLAttributes } from "react";
import { MaterialSymbol } from "@/components/icons/material-symbol";

// アイコン付きの角丸チェックボックス。<label>で囲んで使うことでテキストクリックにも反応する。
// チェックのMaterial Symbolは常に白色のため、未チェック時は白背景に溶け込んで見えなくなる。
export function StyledCheckbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <span className="relative inline-flex h-[17px] w-[17px] shrink-0">
      <input type="checkbox" className="peer absolute inset-0 z-10 cursor-pointer opacity-0" {...props} />
      <span className="absolute inset-0 flex items-center justify-center rounded-[4px] border-[1.5px] border-[#C9BFAD] bg-white peer-checked:border-cb-accent peer-checked:bg-cb-accent">
        <MaterialSymbol name="check" size={14} className="text-white" />
      </span>
    </span>
  );
}
