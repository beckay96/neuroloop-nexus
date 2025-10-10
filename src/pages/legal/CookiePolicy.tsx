import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Cookie } from "lucide-react";

export default function CookiePolicy() {
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
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> January 10, 2025<br />
              <strong>Last Updated:</strong> January 10, 2025
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely 
              used to make websites work more efficiently, provide a better user experience, and provide information 
              to the website owners.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How NeuroLoop Uses Cookies</h2>
            <p>
              NeuroLoop uses cookies to provide essential functionality, improve your experience, and understand how 
              you use our service. We are committed to transparency about our cookie usage and respect your privacy choices.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">1. Essential Cookies (Required)</h3>
                <p className="mb-3">
                  These cookies are necessary for the website to function and cannot be disabled. They include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Authentication Cookies:</strong> Keep you logged in securely</li>
                  <li><strong>Session Cookies:</strong> Maintain your session as you navigate between pages</li>
                  <li><strong>Security Cookies:</strong> Detect authentication abuse and protect your account</li>
                  <li><strong>CSRF Tokens:</strong> Prevent cross-site request forgery attacks</li>
                </ul>
                <p className="mt-3 text-sm font-semibold">
                  Duration: Session-based or up to 30 days
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">2. Functional Cookies (Optional)</h3>
                <p className="mb-3">
                  These cookies enhance functionality and personalization:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Theme Preference:</strong> Remember your dark/light mode choice</li>
                  <li><strong>Language Settings:</strong> Store your preferred language</li>
                  <li><strong>Accessibility Settings:</strong> Remember your accessibility preferences</li>
                  <li><strong>Notification Preferences:</strong> Store your notification settings</li>
                </ul>
                <p className="mt-3 text-sm font-semibold">
                  Duration: Up to 1 year
                </p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">3. Analytics Cookies (Optional)</h3>
                <p className="mb-3">
                  These cookies help us understand how you use NeuroLoop so we can improve:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Vercel Analytics:</strong> Page views, session duration, navigation patterns</li>
                  <li><strong>Performance Monitoring:</strong> Load times, error tracking</li>
                  <li><strong>Feature Usage:</strong> Which features are used most often</li>
                </ul>
                <p className="mt-3 text-sm font-semibold">
                  Duration: Up to 2 years
                </p>
                <p className="mt-2 text-sm">
                  <strong>Note:</strong> All analytics data is anonymized and cannot be used to identify you personally.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies We Do NOT Use</h2>
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Advertising Cookies:</strong> We do not use cookies for targeted advertising</li>
                <li><strong>Third-Party Marketing Cookies:</strong> No marketing or tracking by external companies</li>
                <li><strong>Social Media Tracking:</strong> We do not share your data with social media platforms</li>
                <li><strong>Cross-Site Tracking:</strong> We do not track your activity on other websites</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Cookies</h2>
            <p>
              We use limited third-party services that may set their own cookies:
            </p>

            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Vercel Analytics & Speed Insights</h3>
                <p className="text-sm mb-2">
                  <strong>Purpose:</strong> Website performance monitoring and analytics
                </p>
                <p className="text-sm mb-2">
                  <strong>Data Collected:</strong> Page load times, navigation patterns (anonymized)
                </p>
                <p className="text-sm">
                  <strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com/legal/privacy-policy</a>
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Supabase (Database & Authentication)</h3>
                <p className="text-sm mb-2">
                  <strong>Purpose:</strong> Essential authentication and data storage
                </p>
                <p className="text-sm mb-2">
                  <strong>Data Collected:</strong> Session tokens, authentication state
                </p>
                <p className="text-sm">
                  <strong>Privacy Policy:</strong> <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com/privacy</a>
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Managing Your Cookie Preferences</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Browser Settings</h3>
            <p>
              You can control cookies through your browser settings. However, blocking essential cookies will prevent 
              you from using NeuroLoop.
            </p>

            <div className="mt-4 space-y-2">
              <p><strong>Popular Browsers:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">NeuroLoop Cookie Settings</h3>
            <p>
              You can manage your cookie preferences for optional cookies through your account settings:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-4">
              <li>Log in to your NeuroLoop account</li>
              <li>Go to Settings → Privacy</li>
              <li>Adjust your cookie preferences under "Cookie Settings"</li>
              <li>Save your changes</li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4">Mobile App Considerations</h2>
            <p>
              Our mobile application uses similar tracking technologies to cookies. You can manage these through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>iOS:</strong> Settings → Privacy & Security → Tracking</li>
              <li><strong>Android:</strong> Settings → Google → Ads → Opt out of personalization</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Do Not Track Signals</h2>
            <p>
              NeuroLoop respects Do Not Track (DNT) browser settings. When DNT is enabled:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>We disable all optional analytics cookies</li>
              <li>We limit data collection to essential functionality only</li>
              <li>We do not share any usage data with third parties</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookie Audit Trail</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">sb-access-token</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Authentication</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Essential</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">sb-refresh-token</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Session refresh</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Essential</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">neuroloop-theme</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Theme preference</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Functional</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_vercel_analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of significant changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification for material changes</li>
              <li>Displaying an in-app notification</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about our use of cookies:<br />
              <strong>Email:</strong> bec@elevitaai.com<br />
              <strong>Subject Line:</strong> Cookie Policy Question
            </p>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-100">Your Privacy Matters</h3>
              <p className="text-blue-800 dark:text-blue-200">
                We use cookies responsibly and only when necessary to provide you with the best possible experience. 
                Your health data is never used for advertising or shared with marketing companies. We are committed to 
                protecting your privacy at every step.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
