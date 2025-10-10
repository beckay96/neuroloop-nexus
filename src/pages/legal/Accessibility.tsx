import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Eye, Ear, Hand, Monitor } from "lucide-react";

export default function Accessibility() {
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
          <Eye className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Accessibility Statement</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h2>
            <p>
              NeuroLoop is committed to ensuring digital accessibility for people with disabilities, including 
              those living with neurological conditions. We are continually improving the user experience for 
              everyone and applying the relevant accessibility standards.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Accessibility Goals</h2>
            <p>
              NeuroLoop aims to conform to Level AA of the Web Content Accessibility Guidelines (WCAG) 2.1. 
              These guidelines explain how to make web content more accessible for people with disabilities 
              and user-friendly for everyone.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Accessibility Features</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Eye className="h-8 w-8 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Visual Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Dark Mode:</strong> Full dark theme support to reduce eye strain</li>
                    <li><strong>High Contrast:</strong> Clear contrast ratios exceeding WCAG AA standards</li>
                    <li><strong>Resizable Text:</strong> All text can be enlarged up to 200% without loss of functionality</li>
                    <li><strong>Screen Reader Support:</strong> Compatible with NVDA, JAWS, and VoiceOver</li>
                    <li><strong>Clear Typography:</strong> Large, readable fonts throughout the interface</li>
                    <li><strong>Icon Labels:</strong> All icons have descriptive text labels</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Hand className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Motor Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Keyboard Navigation:</strong> Full functionality available via keyboard</li>
                    <li><strong>Large Touch Targets:</strong> Buttons and controls sized for easy tapping</li>
                    <li><strong>Voice Input Support:</strong> Compatible with speech recognition software</li>
                    <li><strong>No Time Limits:</strong> No automatic timeouts that require quick responses</li>
                    <li><strong>Skip Links:</strong> Quick navigation to main content areas</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Ear className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Auditory Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Visual Notifications:</strong> All audio alerts have visual alternatives</li>
                    <li><strong>Video Captions:</strong> Educational videos include closed captions</li>
                    <li><strong>Text-Based Communication:</strong> No required audio interactions</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Monitor className="h-8 w-8 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cognitive Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Simple Language:</strong> Clear, straightforward instructions</li>
                    <li><strong>Consistent Navigation:</strong> Predictable layout across all pages</li>
                    <li><strong>Error Prevention:</strong> Confirmation for important actions</li>
                    <li><strong>Clear Labels:</strong> Descriptive form labels and instructions</li>
                    <li><strong>Progress Indicators:</strong> Clear feedback on multi-step processes</li>
                    <li><strong>Seizure Safety:</strong> No flashing content or animations that could trigger seizures</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Neurological Condition-Specific Features</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">For People with Epilepsy:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>No flashing animations or strobe effects (three flashes per second threshold)</li>
              <li>Reduced motion options for those sensitive to movement</li>
              <li>Ability to pause or disable all animations</li>
              <li>High contrast mode to reduce visual stress</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">For People with Parkinson's Disease:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Extra-large touch targets (minimum 44x44 pixels)</li>
              <li>Spacing between interactive elements to prevent accidental clicks</li>
              <li>Undo functionality for all important actions</li>
              <li>Voice input compatibility for hands-free operation</li>
              <li>Simplified single-tap interactions where possible</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Technical Specifications</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML5 markup</li>
              <li>ARIA labels and landmarks</li>
              <li>Proper heading hierarchy</li>
              <li>Alt text for all images</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Responsive design for all screen sizes</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Assistive Technology Compatibility</h2>
            <p>
              NeuroLoop is designed to be compatible with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Screen Readers:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
              <li><strong>Speech Recognition:</strong> Dragon NaturallySpeaking, Windows Speech Recognition</li>
              <li><strong>Screen Magnifiers:</strong> ZoomText, Windows Magnifier, macOS Zoom</li>
              <li><strong>Alternative Input Devices:</strong> Switch controls, eye tracking, adaptive keyboards</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Known Limitations</h2>
            <p>
              While we strive for full accessibility, we acknowledge the following limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Some third-party embedded content may not meet our accessibility standards</li>
              <li>Older browsers may not support all accessibility features</li>
              <li>User-uploaded images may lack proper alt text if not provided by the uploader</li>
            </ul>
            <p className="mt-4">
              We are actively working to address these limitations and improve accessibility across all features.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Ongoing Improvements</h2>
            <p>
              Accessibility is an ongoing effort. We:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conduct regular accessibility audits</li>
              <li>Test with actual assistive technologies</li>
              <li>Gather feedback from users with disabilities</li>
              <li>Provide ongoing training to our development team</li>
              <li>Follow WCAG guidelines in all new feature development</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Feedback and Contact</h2>
            <p>
              We welcome feedback on the accessibility of NeuroLoop. If you encounter any barriers or have 
              suggestions for improvement:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Email:</strong> bec@elevitaai.com</li>
              <li><strong>Subject Line:</strong> Accessibility Feedback</li>
              <li>We aim to respond within 2 business days</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Formal Complaints</h2>
            <p>
              If you are not satisfied with our response to your accessibility concern, you may contact:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Australian Human Rights Commission:</strong> <a href="https://humanrights.gov.au/complaints" className="text-blue-600 hover:underline">humanrights.gov.au/complaints</a></li>
              <li><strong>Phone:</strong> 1300 656 419</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Additional Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Web Content Accessibility Guidelines (WCAG)</a></li>
              <li><a href="https://www.vision.org.au/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vision Australia - Assistive Technology Resources</a></li>
              <li><a href="https://www.and.org.au/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Australian Network on Disability</a></li>
            </ul>

            <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-950/20 border-2 border-teal-300 dark:border-teal-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-teal-900 dark:text-teal-100">Our Promise</h3>
              <p className="text-teal-800 dark:text-teal-200">
                Accessibility is not just a compliance checkbox for us—it's a core value. Many of our users live 
                with neurological conditions that affect their motor skills, vision, and cognitive function. We are 
                committed to ensuring NeuroLoop is usable, helpful, and empowering for everyone.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
