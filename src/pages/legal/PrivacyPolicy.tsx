import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> October 7, 2025<br />
              <strong>Last Updated:</strong> October 7, 2025
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Elevita AI ("we," "our," or "us") operates NeuroLoop™, a neurological health management platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Health Information</h3>
            <p>We collect health information you provide, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Seizure logs and neurological symptoms</li>
              <li>Medication records and dosages</li>
              <li>Vital signs and health measurements</li>
              <li>Medical history and diagnoses</li>
              <li>Video and photo documentation of symptoms</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, date of birth</li>
              <li>Emergency contact information</li>
              <li>User account credentials</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information and IP address</li>
              <li>Browser type and operating system</li>
              <li>Usage patterns and feature interactions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain the NeuroLoop service</li>
              <li>Enable care team collaboration and data sharing</li>
              <li>Send health reminders and notifications</li>
              <li>Improve our services and develop new features</li>
              <li>Conduct research (with your explicit consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">We may share your information with:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Your Care Team:</strong> Clinicians and carers you authorize</li>
              <li><strong>Researchers:</strong> Only anonymized data with your explicit consent</li>
              <li><strong>Service Providers:</strong> Cloud hosting, analytics (under strict confidentiality)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
            </ul>

            <p className="mt-4">
              <strong>We NEVER:</strong> Sell your health data or share it for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for data in transit</li>
              <li>Encryption at rest for all stored data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication available</li>
              <li>HIPAA-compliant infrastructure (production version)</li>
              <li>SOC 2 Type II certified hosting providers</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal health information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for research participation</li>
              <li>Object to processing of your data</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Retention</h2>
            <p>
              We retain your health data for as long as your account is active or as needed to provide services. After account deletion, we may retain anonymized data for research purposes with your consent, or as required by law.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place, including Standard Contractual Clauses and data processing agreements.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
            <p>
              NeuroLoop is not intended for children under 13. Parents/guardians must manage accounts for minors. We do not knowingly collect data from children without parental consent.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy. We will notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
            <p>
              For privacy questions or to exercise your rights:<br />
              <strong>Email:</strong> bec@elevitaai.com
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
