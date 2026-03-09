import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buyNow } from '@/integrations';
import IntroductoryRateModal from '@/components/IntroductoryRateModal';
import { motion } from 'framer-motion';

export default function SingleProcessAuditPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isIntroRateModalOpen, setIsIntroRateModalOpen] = useState(false);

  const handleSecureAudit = async () => {
    await buyNow([{ collectionId: 'services', itemId: 'single-process-audit', quantity: 1 }]);
  };

  const handleBackToServices = () => {
    navigate('/#offerings-section');
  };

  const faqItems = [
    {
      header: 'Submission Protocol',
      body: 'Once you check out, you will receive a confirmation email with a secure submission link. We recommend a Loom screen recording to capture the "living" version of the friction, but written SOPs or walkthroughs are also accepted.'
    },
    {
      header: 'Documentation Standard',
      body: 'Do not worry about "cleaning up" your process before recording. Seeing the raw, manual friction points allows for a more accurate forensic audit. Perform the task exactly as you normally would.'
    },
    {
      header: 'Scope Verification',
      body: 'If your submission exceeds the 20-minute review limit or the single-sequence perimeter, I will reach out to either narrow the focus or discuss a custom build.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      <IntroductoryRateModal isOpen={isIntroRateModalOpen} onClose={() => setIsIntroRateModalOpen(false)} />
      
      {/* BACK BUTTON */}
      <section className="w-full bg-background border-b border-dark-grey/10 pt-32 pb-6">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <button
            onClick={handleBackToServices}
            className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>
      
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
          <div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-3 h-auto"
              onClick={handleSecureAudit}
            >
              SECURE THIS AUDIT — $198*
            </Button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-paragraph text-xs text-dark-grey/60 mt-3"
            >
              *Introductory rate.{' '}
              <button
                onClick={() => setIsIntroRateModalOpen(true)}
                className="text-primary hover:text-primary/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
              >
                Learn more
              </button>
            </motion.p>
          </div>
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
                    You describe the workflow. Walk me through it step-by-step. Screen recordings, screenshots, voice memos, whatever works for you.
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

      {/* Technical FAQ Section */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-background">
        <div className="w-full max-w-[100rem] mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-16">
            Technical FAQ
          </h2>
          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between hover:opacity-80 transition-opacity text-left"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {item.header}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="pb-6">
                    <p className="font-paragraph text-base text-[#666666] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                )}
                {index < faqItems.length - 1 && (
                  <div className="border-b border-accent-grey" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-primary text-white border-t border-primary/20">
        <div className="w-full max-w-[100rem] mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to Reclaim Your Time?
          </h2>
          <p className="font-paragraph text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get your Single Process Audit today and discover exactly where your workflow is losing efficiency.
          </p>
          <div>
            <Button 
              className="bg-white hover:bg-white/90 text-primary font-bold text-base px-8 py-3 h-auto"
              onClick={handleSecureAudit}
            >
              SECURE THIS AUDIT — $198*
            </Button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-paragraph text-xs text-white/70 mt-3 text-center"
            >
              *Introductory rate.{' '}
              <button
                onClick={() => setIsIntroRateModalOpen(true)}
                className="text-white hover:text-white/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
              >
                Learn more
              </button>
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
