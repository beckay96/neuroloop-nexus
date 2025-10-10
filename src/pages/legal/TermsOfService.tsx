import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> October 7, 2025<br />
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using NeuroLoop™ ("Service"), operated by Elevita AI ("Company", "we", "our"), you accept and agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
            <p>
              NeuroLoop is a neurological health management platform that enables:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tracking of seizures, Parkinson's symptoms, and neurological health data</li>
              <li>Medication management and reminders</li>
              <li>Care team collaboration between patients, carers, and clinicians</li>
              <li>Secure health data storage and analysis</li>
              <li>Optional participation in medical research</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Medical Disclaimer</h2>
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg my-4">
              <p className="font-bold mb-2">IMPORTANT MEDICAL DISCLAIMER:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>NeuroLoop is NOT a substitute for professional medical advice, diagnosis, or treatment</li>
                <li>Always seek the advice of your physician or qualified health provider</li>
                <li>Never disregard professional medical advice or delay seeking it because of something you read on NeuroLoop</li>
                <li>If you think you may have a medical emergency, call your doctor or emergency services immediately</li>
                <li>The Service does not provide real-time medical monitoring</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. User Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years old to use the Service</li>
              <li>Users under 18 must have parental/guardian consent</li>
              <li>You must provide accurate and complete information</li>
              <li>You must not impersonate any person or entity</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. User Accounts</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">You are responsible for:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your contact information is current</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Acceptable Use</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">You agree NOT to:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share another user's health information without consent</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Content Ownership and License</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Your Content:</h3>
            <p>
              You retain ownership of all health data and content you submit. By using the Service, you grant us a limited license to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Store and process your data to provide the Service</li>
              <li>Display your data to authorized care team members</li>
              <li>Use anonymized data for research (with your explicit consent)</li>
              <li>Make backups for data protection</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Our Content:</h3>
            <p>
              All Service features, design, text, graphics, logos, and software are owned by Elevita AI and protected by intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Research Participation</h2>
            <p>
              Research participation is optional and requires separate consent. You may:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose which data types to share for research</li>
              <li>Withdraw consent at any time</li>
              <li>Request deletion of your research data</li>
            </ul>
            <p className="mt-4">
              Research data is always anonymized before use. No identifiable information is shared with researchers without explicit authorization.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Payment and Subscriptions</h2>
            <p>
              Pricing to be announced. Subscriptions will be billed in advance and are non-refundable unless otherwise stated. We will provide notice before implementing any charges.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Service Availability</h2>
            <p>
              We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be unavailable due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scheduled maintenance</li>
              <li>Emergency repairs</li>
              <li>Third-party service disruptions</li>
              <li>Force majeure events</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Data Backup and Loss</h2>
            <p>
              While we maintain regular backups, we are not liable for any data loss. You should maintain your own records of critical health information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these Terms. You may delete your account at any time. Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to the Service will cease immediately</li>
              <li>Your data will be deleted per our retention policy</li>
              <li>Anonymized research data (if consented) may be retained</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELEVITA AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS OF PROFITS, OR LOSS OF LIFE.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Elevita AI from any claims arising from your use of the Service or violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">15. Governing Law</h2>
            <p>
              These Terms are governed by the laws of [Jurisdiction to be specified]. Disputes will be resolved in the courts of [Jurisdiction].
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">16. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Significant changes will be notified via email or in-app notification. Continued use constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">17. Contact Information</h2>
            <p>
              For questions about these Terms:<br />
              <strong>Email:</strong> bec@elevitaai.com
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
