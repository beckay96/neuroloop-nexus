import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, AlertTriangle, Heart, Shield, Phone } from "lucide-react";

export default function SafetyGuidelines() {
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
          <h1 className="text-4xl font-bold">Safety Guidelines</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> October 10, 2025
            </p>

            <div className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-500 rounded-lg mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Critical Safety Notice</h3>
                  <p className="text-red-800 dark:text-red-200">
                    NeuroLoop is a health tracking tool, <strong>NOT a medical device</strong> and <strong>NOT a substitute for emergency services</strong>. 
                    If you are experiencing a medical emergency, call your local emergency number immediately.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Emergency Contacts</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-4">🌏 International Emergency Numbers</h3>
            <p className="mb-4 text-muted-foreground">
              Always call your local emergency number immediately if you or someone else is having a medical emergency.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Australia */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">Australia 🇦🇺</h4>
                </div>
                <p className="text-2xl font-bold">000</p>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
              </Card>

              {/* United States */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">United States 🇺🇸</h4>
                </div>
                <p className="text-2xl font-bold">911</p>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
              </Card>

              {/* Canada */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">Canada 🇨🇦</h4>
                </div>
                <p className="text-2xl font-bold">911</p>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
              </Card>

              {/* India */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">India 🇮🇳</h4>
                </div>
                <p className="text-2xl font-bold">112</p>
                <p className="text-sm text-muted-foreground">National Emergency Number</p>
                <p className="text-lg font-semibold mt-2">108</p>
                <p className="text-xs text-muted-foreground">Ambulance (in some states)</p>
              </Card>

              {/* UK */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">United Kingdom 🇬🇧</h4>
                </div>
                <p className="text-2xl font-bold">999</p>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
                <p className="text-lg font-semibold mt-2">112</p>
                <p className="text-xs text-muted-foreground">Alternative Emergency Number</p>
              </Card>

              {/* New Zealand */}
              <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold">New Zealand 🇳🇿</h4>
                </div>
                <p className="text-2xl font-bold">111</p>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
              </Card>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">📞 Epilepsy & Neurological Support Helplines</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Australia Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">Australia 🇦🇺</h4>
                </div>
                <p className="text-xl font-bold">1300 852 853</p>
                <p className="text-sm text-muted-foreground mb-2">Epilepsy Action Australia</p>
                <p className="text-lg font-semibold mt-2">1800 644 189</p>
                <p className="text-sm text-muted-foreground">Parkinson's Australia InfoLine</p>
              </Card>

              {/* United States Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">United States 🇺🇸</h4>
                </div>
                <p className="text-xl font-bold">1-800-332-1000</p>
                <p className="text-sm text-muted-foreground mb-2">Epilepsy Foundation Helpline</p>
                <p className="text-lg font-semibold mt-2">1-800-4PD-INFO</p>
                <p className="text-xs text-muted-foreground">(1-800-473-4636)</p>
                <p className="text-sm text-muted-foreground">Parkinson's Foundation Helpline</p>
              </Card>

              {/* Canada Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">Canada 🇨🇦</h4>
                </div>
                <p className="text-xl font-bold">1-877-734-0873</p>
                <p className="text-sm text-muted-foreground mb-2">Epilepsy Canada</p>
                <p className="text-lg font-semibold mt-2">1-800-565-3000</p>
                <p className="text-sm text-muted-foreground">Parkinson Canada InfoLine</p>
              </Card>

              {/* India Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">India 🇮🇳</h4>
                </div>
                <p className="text-xl font-bold">+91-80-2699-4444</p>
                <p className="text-sm text-muted-foreground mb-2">Indian Epilepsy Association (Bangalore)</p>
                <p className="text-lg font-semibold mt-2">+91-22-2445-1348</p>
                <p className="text-sm text-muted-foreground">Parkinson's Disease & Movement Disorder Society (Mumbai)</p>
                <p className="text-xs text-muted-foreground mt-2 italic">Note: Support varies by region in India</p>
              </Card>

              {/* UK Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">United Kingdom 🇬🇧</h4>
                </div>
                <p className="text-xl font-bold">0808 800 5050</p>
                <p className="text-sm text-muted-foreground mb-2">Epilepsy Action Helpline</p>
                <p className="text-lg font-semibold mt-2">0808 800 0303</p>
                <p className="text-sm text-muted-foreground">Parkinson's UK Helpline</p>
              </Card>

              {/* New Zealand Support */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold">New Zealand 🇳🇿</h4>
                </div>
                <p className="text-xl font-bold">0800 37 45 37</p>
                <p className="text-sm text-muted-foreground mb-2">Epilepsy New Zealand</p>
                <p className="text-lg font-semibold mt-2">0800 473 4636</p>
                <p className="text-sm text-muted-foreground">Parkinson's New Zealand</p>
              </Card>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg mb-6">
              <p className="text-sm">
                <strong>Important:</strong> If your country is not listed, search for "[your country] epilepsy support" 
                or "[your country] Parkinson's support" online to find local resources and helplines.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">When to Call Emergency Services</h2>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6">
              <h3 className="font-bold mb-3">Call your local emergency number immediately if:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>A seizure lasts longer than 5 minutes</li>
                <li>A second seizure follows quickly after the first</li>
                <li>The person is injured during a seizure</li>
                <li>The person has difficulty breathing after a seizure</li>
                <li>The person does not regain consciousness after a seizure</li>
                <li>The person is pregnant or has diabetes</li>
                <li>This is the person's first-ever seizure</li>
                <li>The seizure happens in water</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Seizure First Aid</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-400">✓ DO:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Stay calm and stay with the person</li>
                  <li>Time the seizure with your watch</li>
                  <li>Protect them from injury by moving harmful objects away</li>
                  <li>Cushion their head with something soft</li>
                  <li>Turn them on their side when possible (recovery position)</li>
                  <li>Loosen any tight clothing around the neck</li>
                  <li>Reassure them as they recover</li>
                  <li>Stay with them until they are fully recovered</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-red-700 dark:text-red-400">✗ DON'T:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Don't restrain or hold the person down</li>
                  <li>Don't put anything in their mouth</li>
                  <li>Don't give them water, pills, or food until fully alert</li>
                  <li>Don't move them unless they are in danger</li>
                  <li>Don't leave them alone after the seizure</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">SUDEP (Sudden Unexpected Death in Epilepsy)</h2>
            <p>
              SUDEP is a rare but serious risk for people with epilepsy. Understanding and managing this risk is crucial:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Risk Factors:</strong> Frequent tonic-clonic seizures, nighttime seizures, missed medications</li>
              <li><strong>Prevention:</strong> Take medications consistently, maintain seizure diaries, sleep on your side or stomach</li>
              <li><strong>Supervision:</strong> Consider nocturnal supervision or monitoring devices if at high risk</li>
              <li><strong>Communication:</strong> Discuss SUDEP risk openly with your healthcare team</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Medication Safety</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-bold mb-2">Never Stop Medications Suddenly</h3>
                <p>
                  Abruptly stopping anti-seizure medications can trigger severe seizures or status epilepticus. 
                  Always consult your doctor before making any changes to your medication regimen.
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Medication Best Practices:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Take medications at the same time each day</li>
                <li>Use NeuroLoop reminders to help maintain consistency</li>
                <li>Keep a 7-day backup supply of medications</li>
                <li>Set up automatic prescription refills</li>
                <li>Store medications properly (away from heat, moisture)</li>
                <li>Check expiration dates regularly</li>
                <li>Inform all healthcare providers about your medications</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Daily Safety Precautions</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">At Home:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Install safety covers on sharp furniture corners</li>
              <li>Use guards on radiators and heaters</li>
              <li>Shower instead of bathing when alone (use non-slip mats)</li>
              <li>Cook on back burners when possible</li>
              <li>Use unbreakable dishes and cups</li>
              <li>Keep bedroom safe: padded bed edges if needed</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Driving:</h3>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p>
                <strong>Australian Law:</strong> You must be seizure-free for a specified period (varies by state and seizure type) 
                before driving. Report seizures to your doctor and licensing authority as required. Driving illegally may void 
                insurance and result in criminal charges.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Exercise & Sports:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Swimming: NEVER swim alone; inform lifeguards of your condition</li>
              <li>Avoid high-altitude activities or solo rock climbing</li>
              <li>Wear protective helmets for cycling or skating</li>
              <li>Inform coaches and teammates about your epilepsy and first aid</li>
              <li>Stay hydrated and avoid overexertion</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Trigger Management</h2>
            <p>Common seizure triggers to track and manage:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Sleep deprivation:</strong> Aim for 7-9 hours consistently</li>
              <li><strong>Stress:</strong> Practice relaxation techniques, mindfulness</li>
              <li><strong>Missed medications:</strong> Use reminders and alarms</li>
              <li><strong>Alcohol:</strong> Limit or avoid; never binge drink</li>
              <li><strong>Flashing lights:</strong> Be cautious with video games, concerts</li>
              <li><strong>Illness/fever:</strong> Manage infections promptly</li>
              <li><strong>Hormonal changes:</strong> Track menstrual cycle if relevant (catamenial epilepsy)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Using NeuroLoop Safely</h2>
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg">
                <h3 className="font-bold mb-2">NeuroLoop Can Help You:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track seizure patterns and identify triggers</li>
                  <li>Set medication reminders to maintain consistency</li>
                  <li>Share accurate health data with your healthcare team</li>
                  <li>Document symptoms for better medical care</li>
                  <li>Connect with carers for emergency support</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="font-bold mb-2">NeuroLoop Cannot:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Predict or prevent seizures</li>
                  <li>Replace medical monitoring devices</li>
                  <li>Provide real-time alerts during emergencies</li>
                  <li>Diagnose medical conditions</li>
                  <li>Replace professional medical advice</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Pregnancy and Women's Health</h2>
            <p>
              If you are pregnant or planning pregnancy with epilepsy:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Consult your neurologist and obstetrician before conception if possible</li>
              <li>Never stop medications without medical supervision</li>
              <li>Take prescribed folic acid supplements (5mg daily)</li>
              <li>Monitor for changes in seizure frequency</li>
              <li>Track catamenial patterns if hormones affect your seizures</li>
              <li>Attend all prenatal appointments</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Mental Health Support</h2>
            <p>
              Depression and anxiety are common in people with epilepsy. If you experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Persistent sadness or hopelessness</li>
              <li>Loss of interest in activities</li>
              <li>Suicidal thoughts</li>
              <li>Severe anxiety or panic attacks</li>
            </ul>
            <p className="mt-4">
              <strong>Seek help immediately:</strong><br />
              • Lifeline (Australia): <strong>13 11 14</strong><br />
              • Beyond Blue: <strong>1300 22 4636</strong><br />
              • Your healthcare provider
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              For questions about safely using NeuroLoop:<br />
              <strong>Email:</strong> bec@elevitaai.com
            </p>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-500 rounded-lg">
              <div className="flex items-start gap-4">
                <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Remember</h3>
                  <p className="text-blue-800 dark:text-blue-200">
                    Living safely with epilepsy or Parkinson's is about preparation, awareness, and working with your healthcare team. 
                    NeuroLoop is here to support your journey, but your safety always comes first. When in doubt, seek professional medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
