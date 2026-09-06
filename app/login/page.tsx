import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function LoginPage() {
  return (
    <AuthPage activeTab="login">
      <LoginForm />
    </AuthPage>
  );
}
