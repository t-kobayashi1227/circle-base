import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "会員登録",
};

export default function SignupPage() {
  return (
    <AuthPage activeTab="signup">
      <SignupForm />
    </AuthPage>
  );
}
