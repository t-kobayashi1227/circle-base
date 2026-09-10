export function ComingSoonNote({ label }: { label: string }) {
  return (
    <div className="rounded-[11px] border border-dashed border-cb-border px-4 py-8 text-center text-[11.5px] text-cb-muted-2">
      {label}は準備中です。
    </div>
  );
}
