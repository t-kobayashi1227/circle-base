import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isCurrentUserAdmin } from "@/lib/admin";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const admin = await isCurrentUserAdmin(user.id);
  if (!admin) redirect("/admin/login");

  return <>{children}</>;
}
