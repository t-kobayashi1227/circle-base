"use client";

import { useState } from "react";
import { FaqCategoryTabs } from "@/components/faq/faq-category-tabs";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import type { FaqCategory, FaqItem } from "@/lib/legal-mock-data";

export function FaqBrowser({ categories, items }: { categories: FaqCategory[]; items: FaqItem[] }) {
  const [active, setActive] = useState(categories[0]?.key ?? "");
  const filtered = items.filter((item) => item.category === active);

  return (
    <>
      <FaqCategoryTabs categories={categories} active={active} onSelect={setActive} />
      <FaqAccordion key={active} items={filtered} />
    </>
  );
}
