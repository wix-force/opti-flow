import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function SingleProcessAuditPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      
      {/* Header Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 border-b border-accent-grey">
        <div className="w-full max-w-[100rem] mx-auto">
          <h1 className="font-heading text-6xl md:text-7xl text-foreground mb-4 font-bold leading-tight">
            The Single Process Audit
          </h1>
          <p className="font-heading text-2xl md:text-3xl text-foreground mb-8 font-bold">
            One Workflow. One Audit. Immediate ROI.
          </p>
          <p className="font-paragraph text-lg text-foreground mb-12 max-w-2xl leading-relaxed">
            Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-3 h-auto"
            onClick={() => {
              // Placeholder for purchase action
              console.log('Audit purchase initiated');
            }}
          >
            SECURE THIS AUDIT - $198
          </Button>
        </div>
      </section>

      {/* Body Section - Two Column Layout */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-background">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                What is a Single Process Audit?
              </h2>
              <div className="space-y-6 text-foreground">
                <p className="font-paragraph text-base leading-relaxed">
                  A Single Process Audit is a forensic examination of one specific workflow in your business. We're not looking at your entire operation—we're laser-focused on one process that's costing you time, money, or both.
                </p>
                <p className="font-paragraph text-base leading-relaxed">
                  <span className="font-bold">Seeing the out:</span> We identify where your process leaks efficiency. Every manual step, every approval bottleneck, every tool that doesn't talk to another tool—we find it.
                </p>
                <p className="font-paragraph text-base leading-relaxed">
                  <span className="font-bold">Time leaking:</span> Most businesses don't realize how many hours disappear into a single workflow. We quantify it. Then we fix it.
                </p>
                <p className="font-paragraph text-base leading-relaxed">
                  The result: A clear, actionable roadmap to reclaim those hours and redirect them toward revenue-generating work.
                </p>
              </div>
            </div>

            {/* Right Column - Boxed Section */}
            <div className="border border-dark-grey p-8">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                How it Works: The 20-Minute Rule
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    Submission
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    You describe the workflow. Walk me through it step-by-step. Screen recordings, screenshots, or a 20-minute call—whatever works for you.
                  </p>
                </div>
                <div className="border-t border-accent-grey pt-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    Scope
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    I map the entire process. Every tool. Every step. Every decision point. Nothing is assumed; everything is documented.
                  </p>
                </div>
                <div className="border-t border-accent-grey pt-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    Result
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Within 4 business days, you receive a detailed audit report with specific, implementable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section - What's Included */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-accent-grey border-y border-dark-grey">
        <div className="w-full max-w-[100rem] mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12">
            What's Included in Your Audit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Forensic Workflow Analysis',
                description: 'A complete breakdown of your process, identifying inefficiencies, redundancies, and bottlenecks.'
              },
              {
                title: 'Tech Stack & Automation Audit',
                description: 'Review of your current tools and identification of integration opportunities and automation possibilities.'
              },
              {
                title: '5 Actionable Acceleration Steps',
                description: 'Specific, prioritized recommendations you can implement immediately to reclaim time and reduce costs.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-background border border-dark-grey p-8">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section - Technical Note */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-background">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="border-l-4 border-primary pl-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Technical Note: Scope Definition
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  What counts as a workflow?
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  A workflow is any repeatable sequence of steps that produces a business outcome. Examples: customer onboarding, invoice processing, content approval, lead qualification, order fulfillment, report generation, or data entry. If it happens more than once and involves multiple steps or tools, it's a workflow.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  The Perimeter
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  A Single Process Audit focuses on ONE workflow. We don't audit your entire operation, your organizational structure, or your strategic direction. We audit the mechanics of one process and provide recommendations to optimize it. If your workflow touches multiple departments or systems, we map all of it—but the audit remains focused on that single process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
