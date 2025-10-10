import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function ResearchAndCitations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Research & Citations</h1>
        </div>

        <Card className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Last Updated:</strong> January 10, 2025
            </p>

            <div className="p-6 bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-950/30 dark:to-purple-950/30 border-2 border-teal-300 dark:border-teal-700 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Why This Research Matters</h2>
              <p className="text-lg leading-relaxed mb-4">
                Neurological conditions affect <strong>over 77 million people worldwide</strong>, yet critical gaps in 
                tracking, research, and treatment persist. Women with catamenial epilepsy—representing 40% of all women 
                with epilepsy—have virtually <strong>no standardized way to track their condition</strong>, despite it 
                representing a massive health burden.
              </p>
              <p className="text-lg leading-relaxed">
                NeuroLoop was created to fill these gaps. Every statistic on this page represents real people whose 
                lives could be transformed by better data, better tracking, and better research. This isn't just about 
                numbers—it's about giving patients the tools they deserve.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Global Burden of Neurological Conditions</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <h3 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-100">Parkinson's Disease</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">12 Million</p>
                    <p className="text-sm text-muted-foreground">People living with Parkinson's globally (2021)</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">25.2 Million</p>
                    <p className="text-sm text-muted-foreground">Projected cases by 2050 (112% increase)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">5.67 per 100,000</p>
                    <p className="text-sm text-muted-foreground">Global mortality rate (2019)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
                <h3 className="text-2xl font-bold mb-4 text-teal-900 dark:text-teal-100">Epilepsy</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-teal-700 dark:text-teal-300">65 Million</p>
                    <p className="text-sm text-muted-foreground">People living with epilepsy worldwide</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-700 dark:text-teal-300">3.27 Million</p>
                    <p className="text-sm text-muted-foreground">New cases annually (2021)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">140,000 Deaths</p>
                    <p className="text-sm text-muted-foreground">Global deaths per year (2021)</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Parkinson's Disease: Key Statistics</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Global Prevalence & Trends</h3>
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/10 rounded-lg mb-4">
              <p className="text-base leading-relaxed mb-3">
                Parkinson's disease is experiencing explosive growth worldwide. What started as 8.5 million cases in 2021 
                is projected to more than double to <strong>25.2 million by 2050</strong>—making it the fastest-growing 
                neurological disorder on the planet.<sup className="text-blue-600">1,2,3</sup>
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>8.5 million people worldwide</strong> currently live with Parkinson's disease, with projections 
                indicating this will rise to <strong>25.2 million by 2050</strong>—a 112% increase driven primarily by 
                population aging.<sup className="text-blue-600">1,2,3</sup>
              </li>
              <li>
                Parkinson's is now the <strong>world's fastest-growing neurological disorder</strong>, with prevalence 
                doubling over the past 25 years.<sup className="text-blue-600">3,7</sup>
              </li>
              <li>
                In the United States, approximately <strong>1.1 million Americans</strong> live with Parkinson's today.<sup className="text-blue-600">13</sup>
              </li>
            </ul>
            
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded mt-4">
              <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                💡 <strong>Why This Matters:</strong> The dramatic increase means existing tracking and care systems will be 
                overwhelmed. Digital health tools like NeuroLoop are essential to scale care for millions of new patients.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Mortality Rates</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Between 1994 and 2019, more than <strong>1 million deaths globally</strong> were attributed to Parkinson's disease, 
                with the annual mortality rate climbing from <strong>1.76 per 100,000 in 1994 to 5.67 per 100,000 in 2019</strong>.<sup>4</sup>
              </li>
              <li>
                In the United States (1999-2022), there were <strong>947,272 deaths</strong> from Parkinson's, with age-adjusted 
                mortality rates increasing from 88.9 per million (1999) to 110.6 per million (2022).<sup>5</sup>
              </li>
              <li>
                Global data (1999-2020) shows death rates increased from <strong>5.3 to 9.8 per 100,000 population</strong>.<sup>6</sup>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Epilepsy: Key Statistics</h2>

            <div className="p-4 bg-teal-50/50 dark:bg-teal-950/10 rounded-lg mb-4">
              <p className="text-base leading-relaxed">
                Epilepsy affects <strong>65 million people globally</strong>—more than Parkinson's and multiple sclerosis combined. 
                Yet tracking tools remain outdated, with most patients relying on paper diaries that research shows miss up to 
                50% of seizures.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Global Prevalence</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Current estimates indicate approximately <strong>65 million people worldwide</strong> live with epilepsy.<sup className="text-blue-600">8,9</sup>
              </li>
              <li>
                In 2021, there were <strong>3.27 million new cases</strong> of epilepsy of unknown cause globally, with an 
                incidence rate of <strong>42.8 per 100,000 people</strong>.<sup className="text-blue-600">8</sup>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Mortality Rates & Trends</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                In 2021, approximately <strong>140,000 deaths</strong> were attributed to epilepsy of unknown cause globally, 
                with an age-standardized death rate of <strong>1.74 per 100,000</strong>. Mortality was highest in those over 60 
                and children under 5.<sup>8,9</sup>
              </li>
              <li>
                United States data (2011-2021): Epilepsy was linked to <strong>43,231 adult deaths</strong>. The death rate 
                with epilepsy as the underlying cause increased by <strong>84% (from 2.9 to 6.4 per million)</strong>, while 
                deaths with epilepsy as a contributing cause jumped <strong>144% (from 3.3 to 11 per million)</strong> over 
                the decade.<sup>10</sup>
              </li>
              <li>
                Global mortality data show that older adults (over 50, especially over 75) are driving a rise in epilepsy-related deaths 
                in high-income countries, even as general elderly mortality declines.<sup className="text-blue-600">11</sup>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Catamenial Epilepsy: A Neglected Crisis</h2>

            <div className="p-6 bg-pink-50 dark:bg-pink-950/20 border-2 border-pink-300 dark:border-pink-700 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3 text-pink-900 dark:text-pink-100">🚨 The Research Crisis</h3>
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  <strong>40% of women with epilepsy</strong> experience catamenial epilepsy—seizures that significantly worsen 
                  during specific phases of the menstrual cycle. This affects <strong>approximately 13 million women worldwide</strong>.
                </p>
                <div className="p-4 bg-white dark:bg-pink-950/40 rounded border-l-4 border-red-500">
                  <p className="text-sm font-bold text-red-900 dark:text-red-100 mb-2">The Shocking Gap:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Catamenial epilepsy represents only <strong>0.19% of all epilepsy research</strong></li>
                    <li><strong>No standardized tracking method exists</strong> despite decades of recognition</li>
                    <li><strong>No specific FDA-approved treatments</strong> are available</li>
                    <li>Women struggle to identify patterns without proper tools</li>
                    <li>Clinicians lack data to optimize treatment timing</li>
                  </ul>
                </div>
                <p className="text-base font-semibold text-pink-900 dark:text-pink-100">
                  This is exactly why NeuroLoop was created—to give women the tracking tools researchers have failed to provide.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Treatment Challenges</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Despite extensive research, treatment options remain limited. The landmark NIH Progesterone Trial 
                showed mixed results, with <strong>only 22.8% of progesterone-treated women achieving ≥50% seizure 
                reduction</strong> compared to 20% with placebo.
              </li>
              <li>
                Recent systematic reviews (including a 2021 Cochrane analysis) have highlighted significant gaps in 
                understanding and treatment approaches for catamenial epilepsy.
              </li>
              <li>
                Emerging neurosteroid replacement therapy and modified ketogenic diet approaches show promise, with 
                some studies demonstrating <strong>25-62% of participants achieving ≥50% seizure reduction</strong>.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">SUDEP (Sudden Unexpected Death in Epilepsy)</h2>

            <p className="mb-4">
              SUDEP represents the most important direct epilepsy-related cause of death, particularly among young 
              and middle-aged populations.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Risk Stratification</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>General epilepsy population: <strong>1.0 per 1,000 person-years</strong></li>
              <li>Children: <strong>0.22 per 1,000 person-years</strong> (significantly lower risk)</li>
              <li>Drug-resistant epilepsy: <strong>2.0 per 1,000 person-years</strong></li>
              <li>Refractory epilepsy (surgical candidates): <strong>9.3 per 1,000 person-years</strong></li>
            </ul>

            <p className="mt-4">
              SUDEP is estimated to cause <strong>50,000-55,000 deaths globally each year</strong>. In Australia alone, 
              approximately <strong>300 SUDEP deaths</strong> occur annually among 270,000 people with epilepsy, 
              representing a rate of <strong>1.2 per 1,000 persons</strong> with epilepsy annually.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Status Epilepticus</h2>

            <p className="mb-4">
              Status epilepticus represents a neurological emergency with substantial mortality rates:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Adults: <strong>15.9% case fatality rate</strong></li>
              <li>Children: <strong>3.6% case fatality rate</strong></li>
              <li>All ages combined: <strong>13.0% case fatality rate</strong></li>
              <li>Refractory status epilepticus: <strong>17.3% case fatality rate</strong></li>
            </ul>

            <p className="mt-4">
              The age-standardized incidence is <strong>25.5 cases per 100,000 persons annually</strong>. The 2015 
              ILAE redefinition changed the diagnostic threshold from 30 minutes to <strong>5 minutes</strong>, 
              resulting in approximately <strong>25% reduction in mortality</strong> since implementation.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Treatment Gaps & Challenges</h2>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 rounded mb-4">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                📊 <strong>Critical Insight:</strong> Treatment success drops off a cliff after the first medication fails. 
                This makes <strong>detailed tracking absolutely essential</strong> to identify triggers, patterns, and optimize 
                the limited treatment options available. Yet most patients have no systematic way to track this data.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Drug-Resistant Epilepsy</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Approximately <strong>30-40% of patients</strong> develop drug-resistant epilepsy through multiple mechanisms.
              </li>
              <li>
                <strong>50.5% of patients</strong> achieve seizure freedom with their first antiepileptic drug, but only 
                <strong>11.6% respond to the second medication</strong> if the first fails.
              </li>
              <li>
                The probability of seizure control decreases dramatically with each subsequent treatment failure, with 
                <strong>less than 5% achieving optimal control after the third medication regimen</strong>.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Surgical Interventions</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Epilepsy surgery remains the most effective treatment for drug-resistant focal epilepsy, with 
                <strong>60-70% of patients achieving seizure freedom</strong>.
              </li>
              <li>
                Long-term studies show <strong>75% seizure freedom at 10+ years</strong> following temporal lobe 
                resection for appropriate candidates.
              </li>
              <li>
                However, <strong>80% of people with epilepsy live in low- and middle-income countries</strong> 
                with severely limited surgical access.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Regional Analysis: Australia</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Epilepsy Burden</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Active epilepsy cases: <strong>142,740 people (0.56% prevalence)</strong></li>
              <li>Annual incidence: <strong>14,603 new cases</strong></li>
              <li>Total annual economic burden: <strong>$12.3 billion AUD</strong></li>
              <li>Lifetime costs for new cases: <strong>$22.2 billion AUD</strong></li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Cost Breakdown</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Health system costs: <strong>$557.1 million annually</strong></li>
              <li>Productivity losses: <strong>$2.3 billion annually</strong> (largest component)</li>
              <li>Informal care costs: <strong>$438.2 million annually</strong></li>
              <li>Loss of wellbeing (non-financial): <strong>$8.2 billion annually</strong></li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Queensland-Specific Data</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Current active epilepsy cases: <strong>28,740-30,000 people</strong></li>
              <li>Lifetime epilepsy prevalence: <strong>51,646 Queenslanders</strong></li>
              <li>
                Hospitalization rates <strong>20% above national average</strong>, 30-40% higher than Victoria/NSW
              </li>
              <li>
                Cairns has <strong>210% higher epilepsy admission rates</strong> than Brisbane, highlighting 
                geographic disparities
              </li>
              <li>
                Indigenous Australians have <strong>3.5 times higher epilepsy-related hospitalization rates</strong>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-16 mb-6 text-center">Why NeuroLoop Is Critically Needed</h2>

            <div className="p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-950/20 dark:via-teal-950/20 dark:to-purple-950/20 border-2 border-teal-400 dark:border-teal-600 rounded-lg mb-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900 dark:text-blue-100">Turning Research Gaps Into Solutions</h3>
              <p className="text-lg text-center mb-6 leading-relaxed">
                Every statistic on this page represents a gap NeuroLoop was specifically designed to fill. 
                Here's how research evidence directly informs what we've built:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-pink-300 dark:border-pink-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">13 million women with catamenial epilepsy have <strong>no standardized tracking</strong></p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">Menstrual cycle integration with seizure tracking, automated pattern recognition, and research-grade data export</p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">30-40% of patients have drug-resistant epilepsy with <strong>declining treatment success</strong></p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">Detailed tracking of medication responses, trigger patterns, and symptoms to inform precision medicine approaches</p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">SUDEP causes <strong>50,000+ preventable deaths</strong> annually, many during sleep</p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">SUDEP risk assessment, seizure logging for pattern analysis, and care team alerts for high-risk patients</p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">Patients <strong>underreport up to 50% of seizures</strong>, compromising treatment decisions</p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">Easy mobile logging, video documentation, carer involvement, and automated reminders to capture all events</p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">25.2 million Parkinson's patients by 2050 will <strong>overwhelm traditional care systems</strong></p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">Scalable digital platform for tremor, gait, and motor symptom tracking without constant clinic visits</p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border-2 border-red-300 dark:border-red-700">
                  <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-300">🔬 Research Gap:</h4>
                  <p className="text-sm mb-4">80% of people with epilepsy in low/middle-income countries <strong>lack access to specialists</strong></p>
                  <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-300">✅ NeuroLoop Solution:</h4>
                  <p className="text-sm">Remote monitoring, telemedicine integration, and data sharing that extends specialist reach globally</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-teal-100 to-purple-100 dark:from-teal-900/30 dark:to-purple-900/30 rounded-lg border-2 border-teal-500">
                <h4 className="font-bold text-xl mb-3 text-center">The Bottom Line</h4>
                <p className="text-base leading-relaxed text-center">
                  NeuroLoop isn't just another health app—it's a <strong>research-driven response to documented failures</strong> in 
                  neurological care. Every feature addresses a specific gap identified in peer-reviewed research. We're building 
                  the tools that should have existed decades ago.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Citations & References</h2>

            <div className="text-sm space-y-2 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold mb-3">Primary Sources:</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">1. BMJ (2025)</p>
                  <a href="https://www.bmj.com/content/388/bmj-2024-080952" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Global Parkinson's disease projections <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">2. BMJ Group (2025)</p>
                  <a href="https://bmjgroup.com/cases-of-parkinsons-disease-set-to-reach-25-million-worldwide-by-2050/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Parkinson's disease projections to 2050 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">3. World Health Organization</p>
                  <a href="https://www.who.int/news-room/fact-sheets/detail/parkinson-disease" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Parkinson's Disease Fact Sheet <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">4. Frontiers in Neurology (2022)</p>
                  <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2022.956440/full" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Global Parkinson's mortality trends <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">5. PMC/NIH (2025)</p>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11755521/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    US Parkinson's mortality statistics <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">6. NIHR OpenResearch (2022)</p>
                  <a href="https://openresearch.nihr.ac.uk/articles/4-50" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Parkinson's death rate trends 1999-2020 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">7. Frontiers in Aging Neuroscience (2024)</p>
                  <a href="https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2024.1498756/full" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Fastest-growing neurological disorder <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">8. Frontiers in Neurology (2025)</p>
                  <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1526984/full" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Global epilepsy burden 2021 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">9. Frontiers in Neurology (2024)</p>
                  <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2024.1448596/full" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Epilepsy mortality statistics <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">10. Epilepsy Alliance America / CDC</p>
                  <a href="https://epilepsyallianceamerica.org/centers-for-disease-control-cdc-epilepsy-program/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    US epilepsy mortality trends 2011-2021 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">11. PMC/NIH (2024)</p>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11937074/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Age-stratified epilepsy mortality trends <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">12. BMJ Open (2020)</p>
                  <a href="https://bmjopen.bmj.com/content/10/8/e035767" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Epilepsy burden analysis <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">13. Parkinson's Foundation</p>
                  <a href="https://www.parkinson.org/understanding-parkinsons/statistics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    US Parkinson's statistics <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold">Additional Regional Sources:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      <a href="https://epilepsyfoundation.org.au/wp-content/uploads/2020/02/Economic-burden-of-epilepsy-Final-Report-Feb-2020.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Economic Burden of Epilepsy in Australia (2020) <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.deloitte.com/au/en/services/economics/perspectives/economic-burden-of-epilepsy-australia.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Deloitte: Economic Analysis of Epilepsy in Australia <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://epilepsyfoundation.org.au/managing-epilepsy/health-and-wellbeing/sudep/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Epilepsy Foundation Australia: SUDEP Information <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-950/20 border-2 border-teal-300 dark:border-teal-700 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-teal-900 dark:text-teal-100">
                <Brain className="inline h-6 w-6 mr-2" />
                Our Commitment to Evidence-Based Care
              </h3>
              <p className="text-teal-800 dark:text-teal-200">
                All statistics and research cited on this page are from peer-reviewed medical journals, government health 
                agencies, and reputable medical organizations. We regularly update this information as new research becomes 
                available. NeuroLoop is committed to translating research evidence into practical tools that improve lives.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Contact Us</h2>
            <p>
              For questions about our research methodology or to collaborate:<br />
              <strong>Email:</strong> bec@elevitaai.com
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
