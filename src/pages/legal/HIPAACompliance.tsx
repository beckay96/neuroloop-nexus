import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Shield, Lock, Database, Users } from "lucide-react";

export default function HIPAACompliance() {
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
          <h1 className="text-4xl font-bold">HIPAA Compliance</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg my-6">
              <p className="font-bold text-blue-900 dark:text-blue-100">
                NeuroLoop's production version is designed with HIPAA compliance at its core. This page outlines our commitment to protecting Protected Health Information (PHI).
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. What is HIPAA?</h2>
            <p>
              The Health Insurance Portability and Accountability Act (HIPAA) is a US federal law that establishes national standards for protecting sensitive patient health information from being disclosed without consent.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. HIPAA Safeguards</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <Card className="p-6">
                <Shield className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Administrative Safeguards</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Security Management Process</li>
                  <li>Assigned Security Responsibility</li>
                  <li>Workforce Training</li>
                  <li>Security Incident Procedures</li>
                  <li>Business Associate Agreements</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Lock className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Physical Safeguards</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Facility Access Controls</li>
                  <li>Workstation Security</li>
                  <li>Device & Media Controls</li>
                  <li>Secure Data Centers</li>
                  <li>Physical Access Logs</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Database className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Technical Safeguards</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Access Control (MFA)</li>
                  <li>Audit Controls</li>
                  <li>Integrity Controls</li>
                  <li>Transmission Security</li>
                  <li>Encryption at Rest & Transit</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Users className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Privacy Safeguards</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Minimum Necessary Rule</li>
                  <li>Patient Rights</li>
                  <li>Breach Notification</li>
                  <li>De-identification Standards</li>
                  <li>Consent Management</li>
                </ul>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Our HIPAA Implementation</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Encryption</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>At Rest:</strong> AES-256 encryption for all stored PHI</li>
              <li><strong>In Transit:</strong> TLS 1.3 for all data transmission</li>
              <li><strong>Backups:</strong> Encrypted backup storage with secure key management</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Access Control</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Role-Based Access Control (RBAC)</li>
              <li>Multi-Factor Authentication (MFA) available</li>
              <li>Unique user identification</li>
              <li>Automatic logoff after inactivity</li>
              <li>Emergency access procedures</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Audit Logging</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comprehensive logging of all PHI access</li>
              <li>Tamper-proof audit trails</li>
              <li>Regular audit log reviews</li>
              <li>Breach detection monitoring</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Business Associate Agreements</h2>
            <p>
              We maintain Business Associate Agreements (BAAs) with all third-party service providers who may have access to PHI, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cloud hosting providers (Supabase with HIPAA compliance)</li>
              <li>Backup and disaster recovery services</li>
              <li>Email service providers</li>
              <li>Analytics platforms (PHI excluded from analytics)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Patient Rights Under HIPAA</h2>
            <p>As a NeuroLoop user, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> View and obtain copies of your PHI</li>
              <li><strong>Amendment:</strong> Request corrections to your PHI</li>
              <li><strong>Accounting:</strong> Receive a list of PHI disclosures</li>
              <li><strong>Restriction:</strong> Request limitations on PHI use/disclosure</li>
              <li><strong>Confidential Communications:</strong> Request PHI sent to alternative locations</li>
              <li><strong>Breach Notification:</strong> Be notified of PHI breaches</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Breach Notification</h2>
            <p>
              In the event of a PHI breach, we will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Notify affected individuals within 60 days</li>
              <li>Provide details of what occurred</li>
              <li>Describe steps taken to mitigate harm</li>
              <li>Offer guidance on protective measures</li>
              <li>Report to HHS if affecting 500+ individuals</li>
              <li>Notify media if affecting 500+ individuals in a state</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Research and De-identification</h2>
            <p>
              When you consent to research participation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data is de-identified per HIPAA Safe Harbor method</li>
              <li>18 HIPAA identifiers are removed</li>
              <li>No way to re-identify individuals</li>
              <li>Limited Data Sets use additional safeguards</li>
              <li>IRB approval obtained when required</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Minimum Necessary Standard</h2>
            <p>
              We limit PHI use and disclosure to the minimum necessary to accomplish the intended purpose:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clinicians only see patients they treat</li>
              <li>Carers only see authorized patient data</li>
              <li>Researchers receive only de-identified data</li>
              <li>System admins have limited PHI access</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Compliance Certifications</h2>
            <p>
              Our infrastructure and practices are certified by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HIPAA compliant hosting (Supabase HIPAA add-on)</li>
              <li>SOC 2 Type II certification</li>
              <li>Regular penetration testing</li>
              <li>Annual HIPAA compliance audits</li>
              <li>Continuous security monitoring</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Training and Awareness</h2>
            <p>
              All Elevita AI team members with PHI access receive:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Initial HIPAA training</li>
              <li>Annual refresher training</li>
              <li>Security awareness training</li>
              <li>Incident response training</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Our Privacy Officer</h2>
            <p>
              For HIPAA-related questions or to exercise your rights:<br />
              <strong>Privacy Officer:</strong> privacy@elevita.ai<br />
              <strong>Security Officer:</strong> security@elevita.ai<br />
              <strong>Compliance Questions:</strong> compliance@elevita.ai
            </p>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm">
                <strong>DEMO NOTICE:</strong> This demonstration environment is NOT HIPAA compliant and should not be used for real PHI. The production version will be fully HIPAA compliant with all safeguards active.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
