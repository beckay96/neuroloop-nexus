import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Download, Trash2, Edit, Eye, FileText } from "lucide-react";

export default function DataAccessRights() {
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
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Data Access & Rights</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <p className="lead text-lg mb-6">
              Your health data belongs to you. NeuroLoop is committed to transparency and giving you full control 
              over your personal health information. This page explains your rights and how to exercise them.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Data Rights</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Right to Access</h3>
                  <p className="mb-2">
                    You have the right to access all your personal health data stored in NeuroLoop.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>View all your health records, seizure logs, medication data</li>
                    <li>Access your account information and settings</li>
                    <li>See who has access to your data (care team members)</li>
                    <li>Review your research participation status</li>
                    <li>Request a complete copy of your data</li>
                  </ul>
                  <p className="mt-3 font-semibold">How to exercise: Log in to your account or email bec@elevitaai.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Download className="h-8 w-8 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Right to Data Portability</h3>
                  <p className="mb-2">
                    You can download your data in a structured, machine-readable format.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Export all your health records as CSV or JSON files</li>
                    <li>Download clinical media (videos, photos) in original formats</li>
                    <li>Transfer your data to another healthcare provider</li>
                    <li>Generate PDF reports of your tracking history</li>
                  </ul>
                  <p className="mt-3 font-semibold">How to exercise: Settings → Privacy → "Export My Data"</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Edit className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Right to Rectification</h3>
                  <p className="mb-2">
                    You can correct any inaccurate or incomplete data.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Edit your personal information at any time</li>
                    <li>Correct seizure logs or medication entries</li>
                    <li>Update your diagnoses or medical conditions</li>
                    <li>Add missing information to your records</li>
                  </ul>
                  <p className="mt-3 font-semibold">How to exercise: Edit directly in the app or contact support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">4. Right to Erasure ("Right to be Forgotten")</h3>
                  <p className="mb-2">
                    You can request deletion of your personal data.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delete your account and all associated data</li>
                    <li>Remove specific health records</li>
                    <li>Withdraw from research participation</li>
                    <li>Erase data shared with care team members</li>
                  </ul>
                  <p className="mt-3 font-semibold">How to exercise: Settings → Account → "Delete My Account"</p>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
                    <strong>Important:</strong> Some data may need to be retained for legal or safety reasons 
                    (e.g., audit logs, financial records). We'll explain what must be kept and why.
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Additional Rights</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Right to Restrict Processing</h3>
            <p>
              You can ask us to limit how we use your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Temporarily suspend data processing while we verify accuracy</li>
              <li>Maintain data but not use it for certain purposes</li>
              <li>Keep data for legal claims instead of deleting</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Right to Object</h3>
            <p>
              You can object to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Processing based on legitimate interests</li>
              <li>Direct marketing communications</li>
              <li>Research use of your data (even if previously consented)</li>
              <li>Automated decision-making or profiling</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Right to Withdraw Consent</h3>
            <p>
              You can withdraw your consent at any time for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Research participation</li>
              <li>Data sharing with specific care team members</li>
              <li>Optional features or analytics</li>
              <li>Marketing communications</li>
            </ul>
            <p className="mt-3 text-sm italic">
              Note: Withdrawing consent does not affect the lawfulness of processing based on consent before withdrawal.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">How to Exercise Your Rights</h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <h3 className="font-bold mb-3">In-App Methods</h3>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>Log in to your NeuroLoop account</li>
                  <li>Navigate to Settings → Privacy</li>
                  <li>Select the appropriate option:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Export My Data</li>
                      <li>Delete My Account</li>
                      <li>Manage Research Consent</li>
                      <li>Care Team Access</li>
                    </ul>
                  </li>
                  <li>Follow the verification steps</li>
                  <li>Confirm your request</li>
                </ol>
              </Card>

              <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <h3 className="font-bold mb-3">Email Requests</h3>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>Email: <strong>bec@elevitaai.com</strong></li>
                  <li>Subject: "Data Rights Request"</li>
                  <li>Include:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Your full name</li>
                      <li>Account email</li>
                      <li>Specific right you want to exercise</li>
                      <li>Description of your request</li>
                    </ul>
                  </li>
                  <li>We'll respond within <strong>30 days</strong></li>
                </ol>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Response Times</h2>

            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Request Type</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Access (in-app)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Immediate</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Export</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Within 48 hours</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Rectification</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Immediate (in-app) or 7 days (email)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Deletion</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Within 30 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Complex Requests</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Within 30 days (may extend to 90 days)</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-2xl font-bold mt-12 mb-4">Identity Verification</h2>
            <p>
              To protect your data, we may need to verify your identity before processing requests:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>For in-app requests: Password or biometric authentication</li>
              <li>For email requests: Security questions or verification code</li>
              <li>For sensitive requests: Additional identification may be required</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Limitations on Rights</h2>
            <p>
              In certain circumstances, we may not be able to fulfill your request:
            </p>

            <div className="space-y-4 mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Legal Obligations</h3>
                <p className="text-sm">
                  We may need to retain certain data to comply with legal requirements, such as:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                  <li>Financial transaction records (7 years)</li>
                  <li>Medical audit trails (as required by law)</li>
                  <li>Records related to legal proceedings</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Safety and Security</h3>
                <p className="text-sm">
                  We may retain data necessary to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Protect the security of our systems</li>
                  <li>Ensure patient safety</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Research Data</h3>
                <p className="text-sm">
                  Already-anonymized research data cannot be deleted because it cannot be re-identified to remove 
                  your specific records. However, you can withdraw from future research participation.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Special Considerations for Research Data</h2>

            <div className="p-6 bg-pink-50 dark:bg-pink-950/20 border-2 border-pink-300 dark:border-pink-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-pink-900 dark:text-pink-100">Research Participation Rights</h3>
              <p className="mb-3">
                If you've consented to research participation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>You can withdraw at any time</strong> - No questions asked</li>
                <li><strong>Future data won't be used</strong> - From the moment you withdraw</li>
                <li><strong>Past anonymized data may remain</strong> - Cannot be extracted from completed studies</li>
                <li><strong>No penalty for withdrawal</strong> - Your care is not affected</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Fees</h2>
            <p>
              <strong>We do not charge fees</strong> for exercising your data rights. All requests are processed 
              free of charge. However, if your request is:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Clearly unfounded or excessive</li>
              <li>Repetitive in nature</li>
            </ul>
            <p className="mt-3">
              We may charge a reasonable fee or refuse the request. We'll explain why if this happens.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Right to Lodge a Complaint</h2>
            <p>
              If you're not satisfied with how we handle your data rights request, you can:
            </p>

            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">1. Contact Us First</h3>
                <p className="text-sm">
                  Email: <strong>bec@elevitaai.com</strong><br />
                  We'll work to resolve your concern within 14 days
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">2. File a Complaint with Regulatory Authority</h3>
                <p className="text-sm mb-2">
                  <strong>Australia:</strong> Office of the Australian Information Commissioner (OAIC)
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Website: <a href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">oaic.gov.au</a></li>
                  <li>Phone: 1300 363 992</li>
                  <li>Email: enquiries@oaic.gov.au</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Deceased Individuals</h2>
            <p>
              Next of kin or legal representatives may request access to or deletion of a deceased person's data by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Providing proof of death (death certificate)</li>
              <li>Providing proof of authority (will, power of attorney)</li>
              <li>Contacting us at bec@elevitaai.com</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Children's Data</h2>
            <p>
              Parents or legal guardians can exercise data rights on behalf of children under 18 by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Accessing the child's account (if parent account linked)</li>
              <li>Contacting us with proof of guardianship</li>
              <li>Providing consent for any data sharing or research participation</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Contact Information</h2>
            <p>
              For questions about your data rights:<br />
              <strong>Email:</strong> bec@elevitaai.com<br />
              <strong>Response Time:</strong> Within 2 business days
            </p>

            <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-950/20 border-2 border-teal-300 dark:border-teal-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-teal-900 dark:text-teal-100">Your Data, Your Control</h3>
              <p className="text-teal-800 dark:text-teal-200">
                At NeuroLoop, we believe your health data should always be in your hands. These aren't just legal 
                obligations—they're fundamental rights. We're committed to making it easy for you to access, 
                control, and protect your personal health information.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
