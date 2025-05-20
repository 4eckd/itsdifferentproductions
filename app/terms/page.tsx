import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">
            Welcome to Its Different Productions. By accessing our website, you agree to these terms of service.
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
          
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Its Different Productions's website for personal, non-commercial transitory viewing only.
          </p>
          
          <h2>3. Disclaimer</h2>
          <p>
            The materials on Its Different Productions's website are provided on an 'as is' basis. Its Different Productions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>
          
          <h2>4. Limitations</h2>
          <p>
            In no event shall Its Different Productions or its suppliers be liable for any damages arising out of the use or inability to use the materials on Its Different Productions's website.
          </p>
          
          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on Its Different Productions's website could include technical, typographical, or photographic errors. Its Different Productions does not warrant that any of the materials on its website are accurate, complete or current.
          </p>
          
          <h2>6. Links</h2>
          <p>
            Its Different Productions has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
          </p>
          
          <h2>7. Site Terms of Use Modifications</h2>
          <p>
            Its Different Productions may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
          </p>
          
          <h2>8. Governing Law</h2>
          <p>
            Any claim relating to Its Different Productions's website shall be governed by the laws of the website owner's country without regard to its conflict of law provisions.
          </p>
          
          <p className="mt-8">
            Last updated: July 24, 2024
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
