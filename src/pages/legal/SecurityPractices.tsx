import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Shield, Lock, Server, Eye, AlertTriangle, CheckCircle } from "lucide-react";

export default function SecurityPractices() {
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
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Security Practices</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <p className="lead text-lg mb-6">
              Your health data security is our highest priority. This page details the comprehensive security 
              measures we implement to protect your sensitive information.
            </p>

            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-100">
                <CheckCircle className="inline h-6 w-6 mr-2" />
                HIPAA-Ready Infrastructure
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                NeuroLoop is built on HIPAA-compliant infrastructure through Supabase (BAA in place) and follows 
                HIPAA security guidelines and industry best practices for protected health information (PHI). 
                <strong>We are currently undergoing formal HIPAA certification and expect completion in the coming months.</strong>
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Encryption</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Lock className="h-8 w-8 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Encryption in Transit</h3>
                  <p className="mb-2">
                    All data transmitted between your device and our servers is encrypted using:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>TLS 1.3:</strong> Latest Transport Layer Security protocol</li>
                    <li><strong>256-bit encryption:</strong> Military-grade encryption strength</li>
                    <li><strong>Perfect Forward Secrecy:</strong> Each session uses unique encryption keys</li>
                    <li><strong>HTTPS Everywhere:</strong> All connections forced to secure protocols</li>
                    <li><strong>Certificate Pinning:</strong> Prevents man-in-the-middle attacks</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Server className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Encryption at Rest</h3>
                  <p className="mb-2">
                    All stored data is encrypted at rest using:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>AES-256 encryption:</strong> Industry-standard symmetric encryption</li>
                    <li><strong>Database-level encryption:</strong> All database records encrypted</li>
                    <li><strong>File storage encryption:</strong> Media files encrypted separately</li>
                    <li><strong>Encrypted backups:</strong> All backup copies encrypted</li>
                    <li><strong>Key management:</strong> Encryption keys stored separately in secure vaults</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Authentication & Access Control</h2>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Multi-Factor Authentication (MFA)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Required for clinicians:</strong> All healthcare provider accounts</li>
                  <li><strong>Strongly recommended for patients:</strong> Extra layer of protection</li>
                  <li><strong>Multiple methods:</strong> SMS, authenticator apps, email codes</li>
                  <li><strong>Biometric support:</strong> Face ID, Touch ID, fingerprint</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Password Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Bcrypt hashing:</strong> Passwords never stored in plain text</li>
                  <li><strong>Minimum requirements:</strong> 12+ characters, complexity rules</li>
                  <li><strong>Password strength meter:</strong> Real-time feedback during creation</li>
                  <li><strong>Breach detection:</strong> Checks against known compromised passwords</li>
                  <li><strong>Rate limiting:</strong> Protection against brute force attacks</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Session Management</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Automatic timeout:</strong> Sessions expire after 30 minutes of inactivity</li>
                  <li><strong>Secure tokens:</strong> Cryptographically signed session tokens</li>
                  <li><strong>Single device enforcement:</strong> Optional—limit active sessions</li>
                  <li><strong>Logout everywhere:</strong> Ability to terminate all active sessions</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Infrastructure Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Hosting & Cloud Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>SOC 2 Type II certified:</strong> Third-party audited security controls</li>
              <li><strong>ISO 27001 compliant:</strong> Information security management standards</li>
              <li><strong>Geographically distributed:</strong> Multiple data centers for redundancy</li>
              <li><strong>DDoS protection:</strong> Advanced threat detection and mitigation</li>
              <li><strong>Intrusion detection:</strong> 24/7 monitoring for suspicious activity</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Database Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Row Level Security (RLS):</strong> Database-level access control</li>
              <li><strong>Prepared statements:</strong> Protection against SQL injection</li>
              <li><strong>Regular backups:</strong> Encrypted backups every 24 hours</li>
              <li><strong>Point-in-time recovery:</strong> Can restore to any moment in last 30 days</li>
              <li><strong>Schema isolation:</strong> Separate schemas for different data sensitivity levels</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Network Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Web Application Firewall (WAF):</strong> Filters malicious traffic</li>
              <li><strong>IP allowlisting:</strong> Optional restriction to specific networks</li>
              <li><strong>Network segmentation:</strong> Isolation of sensitive systems</li>
              <li><strong>VPN access:</strong> Secure administrative access only</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Application Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Secure Development Practices</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Security code reviews:</strong> All code reviewed before deployment</li>
              <li><strong>Dependency scanning:</strong> Automated checks for vulnerable libraries</li>
              <li><strong>Static analysis:</strong> Automated security flaw detection</li>
              <li><strong>Input validation:</strong> All user input sanitized and validated</li>
              <li><strong>Output encoding:</strong> Protection against XSS attacks</li>
              <li><strong>CSRF protection:</strong> Tokens prevent cross-site request forgery</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Regular Security Testing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Penetration testing:</strong> Quarterly third-party security assessments</li>
              <li><strong>Vulnerability scanning:</strong> Weekly automated scans</li>
              <li><strong>Bug bounty program:</strong> Rewards for responsibly disclosed vulnerabilities</li>
              <li><strong>Security audits:</strong> Annual comprehensive security reviews</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Data Privacy & Access Control</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Role-Based Access Control (RBAC)</h3>
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm mt-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Role</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Access Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Patient</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Full access to own data only</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Carer</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Read/write for authorized patients</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Clinician</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Read/write for connected patients</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Researcher</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Anonymized data only (with consent)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Admin</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">System management (no PHI access)</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-6 mb-3">Data Minimization</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We collect only data necessary for service delivery</li>
              <li>Optional features require explicit opt-in</li>
              <li>Research data collection requires separate consent</li>
              <li>Automated data retention policies delete old logs</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Audit & Monitoring</h2>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Comprehensive Audit Logs</h3>
                <p className="text-sm mb-2">We maintain detailed logs of all system activity:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>All authentication attempts (successful and failed)</li>
                  <li>Data access and modifications</li>
                  <li>Permission changes</li>
                  <li>Export and deletion requests</li>
                  <li>Administrative actions</li>
                </ul>
                <p className="text-sm mt-2 italic">
                  <strong>Retention:</strong> Audit logs kept for 7 years for compliance
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Real-Time Monitoring</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>24/7 security operations center (SOC) monitoring</li>
                  <li>Automated alerts for suspicious activity</li>
                  <li>Anomaly detection using machine learning</li>
                  <li>Performance monitoring for availability</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Incident Response</h2>

            <div className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-red-900 dark:text-red-100">
                <AlertTriangle className="inline h-6 w-6 mr-2" />
                Security Incident Protocol
              </h3>
              <p className="mb-3">In the event of a security incident:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Immediate containment:</strong> Threat isolated within minutes</li>
                <li><strong>Investigation:</strong> Root cause analysis by security team</li>
                <li><strong>User notification:</strong> Affected users notified within 72 hours</li>
                <li><strong>Regulatory reporting:</strong> Required authorities notified per law</li>
                <li><strong>Remediation:</strong> Security holes patched immediately</li>
                <li><strong>Post-incident review:</strong> Process improvements implemented</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Third-Party Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Vendor Management</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All vendors undergo security assessments before engagement</li>
              <li>Business Associate Agreements (BAAs) for all PHI-handling vendors</li>
              <li>Regular vendor security reviews</li>
              <li>Data Processing Agreements (DPAs) for GDPR compliance</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Our Key Security Partners</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Card className="p-4 border-2">
                <h4 className="font-bold mb-2">Supabase (Database)</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ SOC 2 Type II Certified</li>
                  <li>✓ HIPAA-Compliant (BAA signed)</li>
                  <li>✓ ISO 27001 Certified</li>
                  <li>✓ GDPR Compliant</li>
                </ul>
              </Card>
              <Card className="p-4 border-2">
                <h4 className="font-bold mb-2">Vercel (Hosting)</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ SOC 2 Type II Certified</li>
                  <li>✓ DDoS Protection</li>
                  <li>✓ Edge Network Security</li>
                  <li>✓ Automatic SSL/TLS</li>
                </ul>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Employee Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Access & Training</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Background checks:</strong> All employees undergo security screening</li>
              <li><strong>Security training:</strong> Mandatory annual security awareness training</li>
              <li><strong>HIPAA training:</strong> All staff trained on PHI handling</li>
              <li><strong>Least privilege:</strong> Employees have minimum necessary access</li>
              <li><strong>Confidentiality agreements:</strong> All staff sign NDAs</li>
              <li><strong>Access reviews:</strong> Quarterly review of all employee permissions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Your Security Responsibilities</h2>

            <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-900 dark:text-yellow-100">Security Best Practices for Users</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Use strong, unique passwords</strong> for your NeuroLoop account</li>
                <li><strong>Enable multi-factor authentication (MFA)</strong></li>
                <li><strong>Never share your password</strong> with anyone</li>
                <li><strong>Log out on shared devices</strong></li>
                <li><strong>Keep your devices secure</strong> with PIN/biometric locks</li>
                <li><strong>Update your apps regularly</strong> for latest security patches</li>
                <li><strong>Be cautious of phishing emails</strong> - We'll never ask for your password</li>
                <li><strong>Report suspicious activity immediately</strong></li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Security Standards & Compliance</h2>

            <div className="p-6 bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-100">Certification Status</h3>
              <p className="text-purple-800 dark:text-purple-200 mb-4">
                NeuroLoop is actively pursuing formal certifications and compliance verification. We are currently in the 
                certification process for HIPAA compliance and expect completion in the coming months.
              </p>
              <p className="text-purple-800 dark:text-purple-200">
                <strong>Current Status:</strong> Our infrastructure partners (Supabase, Vercel) are already certified (SOC 2, ISO 27001, HIPAA-compliant). 
                We follow all HIPAA security and privacy guidelines and implement industry best practices, with formal organizational 
                certification pending completion.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4">Standards We Follow:</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <Shield className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                <h4 className="font-bold">HIPAA Guidelines</h4>
                <p className="text-xs mt-1">Following all security & privacy requirements</p>
                <p className="text-xs mt-1 italic text-blue-700 dark:text-blue-300">Certification in progress</p>
              </Card>
              <Card className="p-4 text-center bg-purple-50 dark:bg-purple-950/20 border-purple-200">
                <CheckCircle className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                <h4 className="font-bold">SOC 2 Type II</h4>
                <p className="text-xs mt-1">Infrastructure partners certified</p>
              </Card>
              <Card className="p-4 text-center bg-teal-50 dark:bg-teal-950/20 border-teal-200">
                <Lock className="h-12 w-12 mx-auto text-teal-600 mb-2" />
                <h4 className="font-bold">ISO 27001</h4>
                <p className="text-xs mt-1">Infrastructure partners certified</p>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Report a Security Concern</h2>
            <p>
              If you discover a security vulnerability or have concerns:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Email:</strong> bec@elevitaai.com (Subject: "SECURITY")</li>
              <li><strong>Response Time:</strong> Within 24 hours for security issues</li>
              <li><strong>Responsible Disclosure:</strong> We appreciate coordinated disclosure</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Contact Us</h2>
            <p>
              For questions about our security practices:<br />
              <strong>Email:</strong> bec@elevitaai.com
            </p>

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-950/20 border-2 border-green-300 dark:border-green-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-900 dark:text-green-100">
                <Eye className="inline h-6 w-6 mr-2" />
                Transparency & Trust
              </h3>
              <p className="text-green-800 dark:text-green-200">
                Security is not a checkbox—it's a continuous commitment. We're transparent about our practices 
                and continuously improve our security posture. Your trust is earned through action, not promises.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
