import Footer from '@/components/Footer';
import Header from '@/components/Header';
import IntroductoryRateModal from '@/components/IntroductoryRateModal';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Services } from '@/entities';
import { BaseCrudService, buyNow } from '@/integrations';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleProcessAuditPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isIntroRateModalOpen, setIsIntroRateModalOpen] = useState(false);
  const [service, setService] = useState<Services | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const services = await BaseCrudService.getAll<Services>('services');
      const singleAudit = services.items.find(s => s.itemName?.toLowerCase().includes('single process audit'));
      if (singleAudit) {
        setService(singleAudit);
      }
    } catch (error) {
      console.error('Error loading service:', error);
    }
  };

  const handleSecureAudit = async () => {
    if (!service) return;
    setIsCheckingOut(true);
    try {
      // Use buyNow with proper error handling
      const result = await buyNow([{ 
        collectionId: 'services', 
        itemId: service._id, 
        quantity: 1 
      }]);
      // If successful, the user will be redirected to checkout
      // No need to reset isCheckingOut as the page will navigate away
    } catch (error) {
      console.error('Checkout error:', error);
      setIsCheckingOut(false);
      // Optionally show error to user
      alert('There was an issue processing your checkout. Please try again.');
    }
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
      
      {/* HERO SECTION */}
      <section className="w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-background border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <button
              onClick={handleBackToServices}
              className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-text-header mb-6 font-bold tracking-tight">
                The Single Process Audit
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <p className="font-heading text-xl md:text-2xl text-primary font-bold leading-[1.3]">
                One Workflow. One Audit. Immediate ROI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <p className="font-paragraph text-lg md:text-xl text-text-body leading-[1.7] max-w-2xl">
                Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-3 h-auto rounded-lg text-base font-bold disabled:opacity-70 disabled:cursor-not-allowed w-fit shadow-sm hover:shadow-md"
                onClick={handleSecureAudit}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : `SECURE THIS AUDIT — ${service?.itemPrice || 198}*`}
              </Button>
              <p className="font-paragraph text-sm text-dark-grey/70">
                *Introductory rate.{' '}
                <button
                  onClick={() => setIsIntroRateModalOpen(true)}
                  className="text-primary hover:text-primary/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
                >
                  Learn more
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS A SINGLE PROCESS AUDIT */}
      <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-accent-grey border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8">
            What is a Single Process Audit?
          </h2>

          <div className="max-w-3xl">
            <p className="font-paragraph text-lg md:text-xl text-text-body mb-10 leading-[1.7] font-semibold">
              A forensic examination of one specific workflow in your business. We're laser-focused on one process that's costing you time, money, or both.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-border-light">
                <h3 className="font-heading text-base font-bold text-primary mb-3 uppercase tracking-wide">
                  Identifying Inefficiencies
                </h3>
                <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                  We identify where your process leaks efficiency. Every manual step, every approval bottleneck, every tool that doesn't talk to another tool—we find it.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-border-light">
                <h3 className="font-heading text-base font-bold text-primary mb-3 uppercase tracking-wide">
                  Quantifying Time Loss
                </h3>
                <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                  Most businesses don't realize how many hours disappear into a single workflow. We quantify it. Then we fix it.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border-light">
                <h3 className="font-heading text-base font-bold text-primary mb-3 uppercase tracking-wide">
                  Your Roadmap Forward
                </h3>
                <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                  A clear, actionable roadmap to reclaim those hours and redirect them toward revenue-generating work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - COMPACT LINEAR */}
      <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-background border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 leading-tight">
            How it Works: The 20-Minute Rule
          </h2>

          <div className="space-y-6 max-w-3xl">
            {[
              {
                number: '01',
                title: 'Submission',
                description: 'You describe the workflow. Screen recordings, screenshots, or voice memos—whatever works.'
              },
              {
                number: '02',
                title: 'Scope',
                description: 'I map the entire process: every tool, step, and decision point. Nothing assumed.'
              },
              {
                number: '03',
                title: 'Result',
                description: 'Within 4 business days, receive a detailed audit report with specific, implementable recommendations.'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start pb-6 border-b border-border-light last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <span className="font-heading text-3xl font-bold text-primary bg-accent-grey rounded-full w-12 h-12 flex items-center justify-center">
                    {item.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base text-text-body leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED - COMPACT */}
      <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-accent-grey border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10 leading-tight">
            What's Included in Your Audit
          </h2>

          <div className="space-y-5 max-w-3xl">
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
              <div key={index} className="flex gap-4 bg-white rounded-lg p-6 border border-border-light">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE DEFINITION - STACKED LAYOUT */}
      <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-background border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10 leading-tight">
            Scope Definition
          </h2>

          <div className="space-y-6 max-w-4xl">
            <div className="bg-accent-grey rounded-lg p-6 border border-border-light">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
                What Counts as a Workflow?
              </h3>
              <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                A workflow is any repeatable sequence of steps that produces a business outcome. Examples: customer onboarding, invoice processing, content approval, lead qualification, order fulfillment, report generation, or data entry. If it happens more than once and involves multiple steps or tools, it's a workflow.
              </p>
            </div>
            <div className="bg-accent-grey rounded-lg p-6 border border-border-light">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
                The Boundaries
              </h3>
              <p className="font-paragraph text-base md:text-lg text-text-body leading-[1.7] font-medium">
                A Single Process Audit focuses on ONE workflow. We don't audit your entire operation, your organizational structure, or your strategic direction. We audit the mechanics of one process and provide recommendations to optimize it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-accent-grey border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10 leading-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 w-full">
            {faqItems.map((item, index) => (
              <div key={index} className="w-full bg-white rounded-lg border border-border-light overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-4 px-5 flex items-center justify-between hover:bg-accent-grey transition-colors text-left"
                >
                  <h3 className="font-heading text-base font-bold text-foreground flex-1">
                    {item.header}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ml-4 ${
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
                    className="border-t border-border-light"
                  >
                    <p className="font-paragraph text-sm text-text-body leading-[1.6] px-5 py-4">
                      {item.body}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-primary text-white">
        <div className="w-full max-w-7xl mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Reclaim Your Time?
          </h2>
          <p className="font-paragraph text-lg mb-8 leading-[1.6] opacity-90">
            Get your Single Process Audit today and discover exactly where your workflow is losing efficiency.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              className="bg-white hover:bg-white/90 text-primary font-bold text-base px-6 py-2 h-auto rounded-lg disabled:opacity-70 disabled:cursor-not-allowed w-fit"
              onClick={handleSecureAudit}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : `SECURE THIS AUDIT — ${service?.itemPrice || 198}*`}
            </Button>
            <p className="font-paragraph text-sm text-white/70">
              *Introductory rate.{' '}
              <button
                onClick={() => setIsIntroRateModalOpen(true)}
                className="text-white hover:text-white/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
