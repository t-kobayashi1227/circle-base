import Link from "next/link";

export function AuthTabs({ active }: { active: "login" | "signup" }) {
  return (
    <div className="grid grid-cols-2">
      <Link
        href="/login"
        className={`py-[17px] text-center text-[13.5px] lg:py-5 lg:text-sm ${
          active === "login"
            ? "border-b-2 border-cb-accent font-bold text-cb-accent-dark"
            : "border-b border-[#EFE7DA] font-medium text-cb-muted hover:text-cb-accent-dark"
        }`}
      >
        ログイン
      </Link>
      <Link
        href="/signup"
        className={`py-[17px] text-center text-[13.5px] lg:py-5 lg:text-sm ${
          active === "signup"
            ? "border-b-2 border-cb-accent font-bold text-cb-accent-dark"
            : "border-b border-[#EFE7DA] font-medium text-cb-muted hover:text-cb-accent-dark"
        }`}
      >
        会員登録
      </Link>
    </div>
  );
}
