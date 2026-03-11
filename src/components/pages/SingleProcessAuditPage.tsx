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
      <section className="w-full bg-background border-b border-[#E5E5E5] pt-16 pb-3">
        <div className="mx-auto max-w-[1000px] px-8">
          <button
            onClick={handleBackToServices}
            className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>
      
      {/* Header Section - Compressed */}
      <section className="w-full py-12 px-8 border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-3 font-bold leading-tight tracking-tight">
            The Single Process Audit
          </h1>
          <p className="font-heading text-xl md:text-2xl text-foreground mb-6 font-semibold leading-tight">
            One Workflow. One Audit. Immediate ROI.
          </p>
          <p className="font-paragraph text-base text-foreground mb-6 max-w-[700px] leading-relaxed">
            Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
          </p>
          <div className="pt-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-2 h-auto"
              onClick={handleSecureAudit}
            >
              SECURE THIS AUDIT — $198*
            </Button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-paragraph text-xs text-dark-grey/60 mt-2"
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

      {/* What is a Single Process Audit - Two Column Asymmetrical */}
      <section className="w-full py-10 px-8 bg-background border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12">
            {/* Left Column - Title (30%) */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground leading-tight text-left">
                What is a Single Process Audit?
              </h2>
            </div>

            {/* Right Column - Body (70%) */}
            <div className="space-y-4 text-foreground text-left">
              <p className="font-paragraph text-base leading-relaxed">
                A Single Process Audit is a forensic examination of one specific workflow in your business. We're not looking at your entire operation—we're laser-focused on one process that's costing you time, money, or both.
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span className="font-paragraph text-base leading-relaxed">
                    <span className="font-bold">Seeing the out:</span> We identify where your process leaks efficiency. Every manual step, every approval bottleneck, every tool that doesn't talk to another tool—we find it.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span className="font-paragraph text-base leading-relaxed">
                    <span className="font-bold">Time leaking:</span> Most businesses don't realize how many hours disappear into a single workflow. We quantify it. Then we fix it.
                  </span>
                </li>
              </ul>
              <p className="font-paragraph text-base leading-relaxed pt-2">
                The result: A clear, actionable roadmap to reclaim those hours and redirect them toward revenue-generating work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Three Card Horizontal Layout */}
      <section className="w-full py-10 px-8 bg-background border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 leading-tight text-left">
            How it Works: The 20-Minute Rule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="p-6 bg-[#F4F4F4] rounded-md text-left"
              >
                <h3 className="font-heading text-base font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-paragraph text-sm text-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included - Structured List */}
      <section className="w-full py-10 px-8 bg-background border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 leading-tight text-left">
            What's Included in Your Audit
          </h2>
          <div className="space-y-4">
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
              <div key={index} className="flex gap-4 text-left">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-1">
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
      <section className="w-full py-10 px-8 bg-background border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-heading text-xs font-bold text-foreground mb-8 uppercase tracking-[0.15em] text-left">
            THE PERIMETER
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12">
            {/* Left Column */}
            <div>
              <h3 className="font-heading text-base font-bold text-foreground leading-tight text-left">
                Scope Definition
              </h3>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-heading text-sm font-bold text-foreground mb-2 uppercase tracking-[0.15em]">
                  What Counts as a Workflow?
                </h4>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  A workflow is any repeatable sequence of steps that produces a business outcome. Examples: customer onboarding, invoice processing, content approval, lead qualification, order fulfillment, report generation, or data entry. If it happens more than once and involves multiple steps or tools, it's a workflow.
                </p>
              </div>
              <div className="border-t border-[#E5E5E5] pt-6">
                <h4 className="font-heading text-sm font-bold text-foreground mb-2 uppercase tracking-[0.15em]">
                  The Boundaries
                </h4>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  A Single Process Audit focuses on ONE workflow. We don't audit your entire operation, your organizational structure, or your strategic direction. We audit the mechanics of one process and provide recommendations to optimize it. If your workflow touches multiple departments or systems, we map all of it—but the audit remains focused on that single process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="w-full py-10 px-8 bg-background border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-heading text-xs font-bold text-foreground mb-8 uppercase tracking-[0.15em] text-left">
            Technical FAQ
          </h2>
          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-4 flex items-center justify-between hover:opacity-80 transition-opacity text-left"
                >
                  <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-[0.15em]">
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
                    className="pb-4 overflow-hidden"
                  >
                    <p className="font-paragraph text-sm text-[#666666] leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                )}
                {index < faqItems.length - 1 && (
                  <div className="border-b border-[#E5E5E5]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full py-10 px-8 bg-primary text-white">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight text-left">
            Ready to Reclaim Your Time?
          </h2>
          <p className="font-paragraph text-base mb-6 leading-relaxed opacity-90">
            Get your Single Process Audit today and discover exactly where your workflow is losing efficiency.
          </p>
          <div>
            <Button 
              className="bg-white hover:bg-white/90 text-primary font-bold text-sm px-6 py-2 h-auto"
              onClick={handleSecureAudit}
            >
              SECURE THIS AUDIT — $198*
            </Button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-paragraph text-xs text-white/70 mt-2"
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
