import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: "Sign In - Its Different Productions",
  description: "Sign in to your Its Different Productions account.",
};

export default function SignInPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center py-12">
      <SignInForm />
    </div>
  );
}
