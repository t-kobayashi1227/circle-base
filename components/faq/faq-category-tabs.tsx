import { MaterialSymbol } from "@/components/icons/material-symbol";
import type { FaqCategory } from "@/lib/legal-mock-data";

export function FaqCategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: FaqCategory[];
  active: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3.5">
      {categories.map((c) => {
        const isActive = c.key === active;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onSelect(c.key)}
            className={`flex items-center justify-center gap-[7px] rounded-[9px] px-2 py-3.5 text-xs lg:gap-2 lg:px-4 lg:py-4 lg:text-[13px] ${
              isActive
                ? "bg-cb-accent font-bold text-white shadow-[0_2px_0_rgba(150,90,10,.25)] hover:bg-cb-accent-hover"
                : "border border-[#E4DACA] bg-white font-medium text-[#3B352C] hover:border-cb-accent hover:text-cb-accent-dark"
            }`}
          >
            <MaterialSymbol name={c.icon} size={17} className="lg:hidden" />
            <MaterialSymbol name={c.icon} size={19} className="hidden lg:inline-block" />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
