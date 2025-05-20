import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">
            At Its Different Productions, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, shipping address, and payment information when you make a purchase or create an account.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Send you marketing communications (if you've opted in)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our business, such as payment processors and shipping companies.
          </p>
          
          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our website, analyze site usage, and assist in our marketing efforts.
          </p>
          
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data.
          </p>
          
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
          
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@itsdifferentproductions.com">privacy@itsdifferentproductions.com</a>.
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
