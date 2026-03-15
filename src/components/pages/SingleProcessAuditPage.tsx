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
      {/* BACK BUTTON */}
      <section className="w-full bg-background border-b border-[#E5E5E5] py-4">
        <div className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <button
            onClick={handleBackToServices}
            className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>
      {/* HERO SECTION */}
      <section className="relative w-full py-12 md:py-16 bg-background">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-text-header mb-3 font-bold">
                  The Single <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Process Audit</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="font-paragraph text-base md:text-lg text-text-body mb-4 leading-relaxed"
              >
                One Workflow. One Audit. Immediate ROI.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-paragraph text-sm md:text-base text-text-body mb-6 max-w-xl leading-[1.6]"
              >
                Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-2 items-start"
              >
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-6 py-2 h-auto rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={handleSecureAudit}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : `SECURE THIS AUDIT — ${service?.itemPrice || 198}*`}
                </Button>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="font-paragraph text-xs text-dark-grey/60"
                >
                  *Introductory rate.{' '}
                  <button
                    onClick={() => setIsIntroRateModalOpen(true)}
                    className="text-primary hover:text-primary/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
                  >
                    Learn more
                  </button>
                </motion.p>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex justify-end items-center"
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-2xl"></div>
                <Image
                  src="https://static.wixstatic.com/media/5602cb_32b56ffac7284995a82e233ab592aa1e~mv2.png?originWidth=448&originHeight=448"
                  alt="Process Audit Workflow Illustration - Workflow optimization and process analysis"
                  width={400}
                  className="relative z-10 w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* What is a Single Process Audit */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Left Content */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight text-left mb-5">
                What is a Single Process Audit?
              </h2>

              <div className="space-y-3 text-foreground text-left">
                <p className="font-paragraph text-sm md:text-base leading-[1.6]">
                  A Single Process Audit is a forensic examination of one specific workflow in your business. We're not looking at your entire operation—we're laser-focused on one process that's costing you time, money, or both.
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0 text-sm">•</span>
                    <span className="font-paragraph text-sm md:text-base leading-[1.6]">
                      <span className="font-bold">Seeing the out:</span> We identify where your process leaks efficiency. Every manual step, every approval bottleneck, every tool that doesn't talk to another tool—we find it.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0 text-sm">•</span>
                    <span className="font-paragraph text-sm md:text-base leading-[1.6]">
                      <span className="font-bold">Time leaking:</span> Most businesses don't realize how many hours disappear into a single workflow. We quantify it. Then we fix it.
                    </span>
                  </li>
                </ul>
                <p className="font-paragraph text-sm md:text-base leading-[1.6]">
                  The result: A clear, actionable roadmap to reclaim those hours and redirect them toward revenue-generating work.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-end items-center"
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-2xl"></div>
                <Image
                  src="https://static.wixstatic.com/media/5602cb_f0ef43247cce45dc9f5c2234b98fe9dc~mv2.png?originWidth=384&originHeight=256"
                  alt="Single Process Audit - Workflow analysis and process optimization illustration"
                  width={400}
                  className="relative z-10 w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* How it Works - Three Column Layout with Numbers */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight text-center">
            How it Works: The 20-Minute Rule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[
              {
                number: '01',
                title: 'Submission',
                description: 'You describe the workflow. Walk me through it step-by-step. Screen recordings, screenshots, voice memos, whatever works for you.'
              },
              {
                number: '02',
                title: 'Scope',
                description: 'I map the entire process. Every tool. Every step. Every decision point. Nothing is assumed; everything is documented.'
              },
              {
                number: '03',
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
                whileHover={{ scale: 1.05 }}
                className="h-full"
              >
                <div className="h-full border-2 border-primary hover:border-primary rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center text-center bg-accent-grey transition-all duration-300 hover:shadow-lg">
                  <div className="mb-3">
                    <span className="font-heading text-3xl md:text-4xl font-bold text-primary">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-xs md:text-sm text-foreground leading-[1.5]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* What's Included */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight text-center">
            What's Included in Your Audit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full border-2 border-primary rounded-lg p-5 md:p-6 flex flex-col items-center justify-start bg-background text-center">
                  <div className="flex flex-col gap-2 mb-3 items-center">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="font-heading text-sm md:text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-paragraph text-xs md:text-sm text-foreground leading-[1.5]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Scope Definition */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-xs font-bold text-foreground mb-4 uppercase tracking-[0.15em] text-left">
            THE PERIMETER
          </h2>

          <h3 className="font-heading text-lg md:text-xl font-bold text-foreground leading-tight text-left mb-5">
            Scope Definition
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-left">
              <h4 className="font-heading text-sm md:text-base font-bold text-foreground mb-2 uppercase tracking-[0.15em]">
                What Counts as a Workflow?
              </h4>
              <p className="font-paragraph text-sm md:text-base text-foreground leading-[1.6]">
                A workflow is any repeatable sequence of steps that produces a business outcome. Examples: customer onboarding, invoice processing, content approval, lead qualification, order fulfillment, report generation, or data entry. If it happens more than once and involves multiple steps or tools, it's a workflow.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-heading text-sm md:text-base font-bold text-foreground mb-2 uppercase tracking-[0.15em]">
                The Boundaries
              </h4>
              <p className="font-paragraph text-sm md:text-base text-foreground leading-[1.6]">
                A Single Process Audit focuses on ONE workflow. We don't audit your entire operation, your organizational structure, or your strategic direction. We audit the mechanics of one process and provide recommendations to optimize it. If your workflow touches multiple departments or systems, we map all of it—but the audit remains focused on that single process.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Technical FAQ Section */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-xs font-bold text-foreground mb-5 uppercase tracking-[0.15em] text-left">
            Technical FAQ
          </h2>

          <div className="space-y-0 w-full">
            {faqItems.map((item, index) => (
              <div key={index} className="w-full">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-3 flex items-center justify-between hover:opacity-80 transition-opacity text-left"
                >
                  <h3 className="font-heading text-xs md:text-sm font-bold text-foreground uppercase tracking-[0.15em] flex-1">
                    {item.header}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-foreground flex-shrink-0 transition-transform duration-300 ml-4 ${
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
                    className="pb-3 overflow-hidden"
                  >
                    <p className="font-paragraph text-xs md:text-sm text-[#666666] leading-[1.6] w-full">
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
      {/* Top CTA Button - Left Aligned */}
      <section className="w-full py-6 px-6 md:px-12 lg:px-16 bg-background border-b border-[#E5E5E5]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-6 py-2 h-auto rounded-lg text-sm w-fit disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSecureAudit}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : `SECURE THIS AUDIT — ${service?.itemPrice || 198}*`}
            </Button>
            <p className="font-paragraph text-xs text-dark-grey/60">
              *Introductory rate.{' '}
              <button
                onClick={() => setIsIntroRateModalOpen(true)}
                className="text-primary hover:text-primary/80 font-semibold underline bg-none border-none p-0 cursor-pointer"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </section>
      {/* Bottom CTA Section */}
      <section className="w-full py-10 md:py-12 px-6 md:px-12 lg:px-16 bg-primary text-white">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight text-left">
            Ready to Reclaim <br />
            Your Time?
          </h2>
          <p className="font-paragraph text-sm md:text-base mb-5 leading-[1.6] opacity-90 max-w-2xl">
            Get your Single Process Audit today and discover exactly where your workflow is losing efficiency.
          </p>
          <div>
            <Button
              className="bg-white hover:bg-white/90 text-primary font-bold text-sm md:text-base px-6 py-2 h-auto rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSecureAudit}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : `SECURE THIS AUDIT — ${service?.itemPrice || 198}*`}
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
