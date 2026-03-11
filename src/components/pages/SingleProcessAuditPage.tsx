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
        <div className="w-full px-[15%]">
          <button
            onClick={handleBackToServices}
            className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>
      
      {/* Header Section - Premium Left-Aligned */}
      <section className="w-full py-24 px-[15%] border-b border-accent-grey">
        <div className="w-full">
          <h1 className="font-heading text-7xl md:text-8xl text-foreground mb-6 font-bold leading-tight tracking-tight">
            The Single Process Audit
          </h1>
          <p className="font-heading text-2xl md:text-3xl text-foreground mb-12 font-semibold leading-tight">
            One Workflow. One Audit. Immediate ROI.
          </p>
          <p className="font-paragraph text-lg text-foreground mb-10 max-w-[700px] leading-relaxed">
            Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
          </p>
          <div className="pt-10">
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

      {/* What is a Single Process Audit - Two Column Layout */}
      <section className="w-full py-32 px-[15%] bg-background">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            {/* Left Column - Title (30%) */}
            <div>
              <h2 className="font-heading text-4xl font-bold text-foreground leading-tight">
                What is a Single Process Audit?
              </h2>
            </div>

            {/* Right Column - Body (70%) */}
            <div className="space-y-6 text-foreground">
              <p className="font-paragraph text-base leading-relaxed max-w-[700px]">
                A Single Process Audit is a forensic examination of one specific workflow in your business. We're not looking at your entire operation—we're laser-focused on one process that's costing you time, money, or both.
              </p>
              <p className="font-paragraph text-base leading-relaxed max-w-[700px]">
                <span className="font-bold">Seeing the out:</span> We identify where your process leaks efficiency. Every manual step, every approval bottleneck, every tool that doesn't talk to another tool—we find it.
              </p>
              <p className="font-paragraph text-base leading-relaxed max-w-[700px]">
                <span className="font-bold">Time leaking:</span> Most businesses don't realize how many hours disappear into a single workflow. We quantify it. Then we fix it.
              </p>
              <p className="font-paragraph text-base leading-relaxed max-w-[700px]">
                The result: A clear, actionable roadmap to reclaim those hours and redirect them toward revenue-generating work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Three Card Layout */}
      <section className="w-full py-32 px-[15%] bg-background">
        <div className="w-full">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-16 leading-tight">
            How it Works: The 20-Minute Rule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Submission',
                description: 'You describe the workflow. Walk me through it step-by-step. Screen recordings, screenshots, voice memos, whatever works for you.'
              },
              {
                title: 'Scope',
                description: 'I map the entire process. Every tool. Every step. Every decision point. Nothing is assumed; everything is documented.'
              },
              {
                title: 'Result',
                description: 'Within 4 business days, you receive a detailed audit report with specific, implementable recommendations.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-[#E0E0E0] rounded-lg p-12 bg-background hover:border-primary/30 transition-colors"
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed max-w-[700px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included - Horizontal Flexbox */}
      <section className="w-full py-32 px-[15%] bg-background">
        <div className="w-full">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-16 leading-tight">
            What's Included in Your Audit
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
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
              <div key={index} className="flex-1 flex gap-4">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Note - Scope Definition */}
      <section className="w-full py-32 px-[15%] bg-background">
        <div className="w-full">
          <h2 className="font-heading text-xs font-bold text-foreground mb-12 uppercase tracking-[0.15em]">
            THE PERIMETER
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            {/* Left Column */}
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                Scope Definition
              </h3>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h4 className="font-heading text-base font-bold text-foreground mb-3 uppercase tracking-[0.15em]">
                  What Counts as a Workflow?
                </h4>
                <p className="font-paragraph text-base text-foreground leading-relaxed max-w-[700px]">
                  A workflow is any repeatable sequence of steps that produces a business outcome. Examples: customer onboarding, invoice processing, content approval, lead qualification, order fulfillment, report generation, or data entry. If it happens more than once and involves multiple steps or tools, it's a workflow.
                </p>
              </div>
              <div className="border-t border-[#F0F0F0] pt-8">
                <h4 className="font-heading text-base font-bold text-foreground mb-3 uppercase tracking-[0.15em]">
                  The Boundaries
                </h4>
                <p className="font-paragraph text-base text-foreground leading-relaxed max-w-[700px]">
                  A Single Process Audit focuses on ONE workflow. We don't audit your entire operation, your organizational structure, or your strategic direction. We audit the mechanics of one process and provide recommendations to optimize it. If your workflow touches multiple departments or systems, we map all of it—but the audit remains focused on that single process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="w-full py-32 px-[15%] bg-background border-t border-[#F0F0F0]">
        <div className="w-full">
          <h2 className="font-heading text-xs font-bold text-foreground mb-16 uppercase tracking-[0.15em]">
            Technical FAQ
          </h2>
          <div className="space-y-0 max-w-[700px]">
            {faqItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between hover:opacity-80 transition-opacity text-left"
                >
                  <h3 className="font-heading text-base font-bold text-foreground uppercase tracking-[0.15em]">
                    {item.header}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-6 overflow-hidden"
                  >
                    <p className="font-paragraph text-base text-[#666666] leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                )}
                {index < faqItems.length - 1 && (
                  <div className="border-b border-[#F0F0F0]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full py-24 px-[15%] bg-primary text-white">
        <div className="w-full">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Reclaim Your Time?
          </h2>
          <p className="font-paragraph text-lg mb-12 max-w-[700px] leading-relaxed opacity-90">
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
              className="font-paragraph text-xs text-white/70 mt-3"
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
