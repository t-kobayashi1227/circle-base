import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function MypageLayout({ children }: LayoutProps<"/mypage">) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
