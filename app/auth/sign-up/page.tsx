import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: "Sign Up - Its Different Productions",
  description: "Create an account to access exclusive beats, merchandise, and NFTs.",
};

export default function SignUpPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center py-12">
      <SignUpForm />
    </div>
  );
}
