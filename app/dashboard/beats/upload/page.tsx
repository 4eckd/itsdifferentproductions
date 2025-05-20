"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BeatUploadForm } from "@/components/forms/beats/beat-upload-form";
import { useAuth } from "@/contexts/auth-context";

export default function BeatUploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container py-12">
      <BeatUploadForm />
    </div>
  );
}
