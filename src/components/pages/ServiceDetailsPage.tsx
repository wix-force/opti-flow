import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService, buyNow } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Services | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Services>('services', id);
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!service) return;
    setIsCheckingOut(true);
    try {
      await buyNow([
        {
          collectionId: 'services',
          itemId: service._id,
          quantity: 1,
        },
      ]);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsCheckingOut(false);
    }
  };

  const isSopLibrary = service?.itemName?.toLowerCase().includes('sop');

  // SOP Library specific content
  const sopContent = {
    title: 'The SOP Library',
    subtitle: 'Turn Tribal Knowledge into a Company Asset.',
    leadText: 'Stop the "How-To" friction and information lost between the lines. We capture your team\'s expertise, translate it into a searchable database, and eliminate repetitive questions for good.',
    buttonText: 'GET THE 10-SOP STARTER PACK',
    
    problemTitle: 'The Cost of Friction',
    problemText: 'Every time a team member asks "How do I do this?" your organization pays a hidden cost. Errors multiply. Resources get wasted. Knowledge walks out the door.',
    
    solutionTitle: 'The SOP Library',
    solutionText: 'A single-link knowledge system that plugs information leaks. Your team offloads tasks without thinking twice. No more "I didn\'t know how to do that."',
    
    methodology: [
      {
        number: '1',
        title: 'The Inputs',
        description: 'Record raw screen-shares or notes of 10 core workflows.'
      },
      {
        number: '2',
        title: 'The Translation',
        description: 'I transcribe and structure these into professional, no-fail guides.'
      },
      {
        number: '3',
        title: 'The Delivery',
        description: 'Within 10 business days, receive your "Company Brain" in Notion, Google Drive, or your tool of choice.'
      }
    ],
    
    inclusions: [
      '10 Professional Step-by-Step Guides',
      'The Searchable Database',
      '"Single-Link" Onboarding Logic',
      'Knowledge Protection'
    ],
    
    faqs: [
      {
        question: 'Can I record all 10 at once?',
        answer: 'Yes. We can schedule a single session or multiple sessions over a week. Whatever works best for your team.'
      },
      {
        question: 'How strict is the submission format?',
        answer: 'Not strict at all. Raw notes, screen recordings, voice memos—we translate everything into professional guides. Just capture the workflow.'
      },
      {
        question: 'What SOP formats do you support?',
        answer: 'Notion, Google Drive, Airtable, or your preferred tool. We deliver in whatever format your team uses daily.'
      },
      {
        question: 'What if I need more than 10?',
        answer: 'Perfect. We can scale. Reach out to discuss pricing for additional SOPs. Contact us for a custom quote.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* BACK BUTTON */}
      <section className="w-full bg-background border-b border-dark-grey/10 pt-32 pb-6">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-dark-grey hover:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>

      {isLoading ? (
        <section className="w-full bg-background py-32">
          <div className="flex items-center justify-center min-h-[600px]">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        </section>
      ) : !service ? (
        <section className="w-full bg-background py-20 md:py-32">
          <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-dark-grey mb-4 font-bold">
              Service Not Found
            </h2>
            <p className="font-paragraph text-lg text-dark-grey/60 mb-8">
              The service you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-primary text-white hover:bg-primary/90 font-heading px-8 py-3 h-auto"
            >
              Return Home
            </Button>
          </div>
        </section>
      ) : isSopLibrary ? (
        <>
          {/* HERO SECTION */}
          <section className="w-full bg-background py-16 md:py-24 border-b border-dark-grey/10">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-dark-grey font-bold leading-tight">
                  {sopContent.title}
                </h1>
                <p className="font-heading text-xl md:text-2xl text-dark-grey/80 font-semibold max-w-3xl">
                  {sopContent.subtitle}
                </p>
                <p className="font-paragraph text-lg text-dark-grey/70 leading-relaxed max-w-3xl">
                  {sopContent.leadText}
                </p>
                <div className="pt-4">
                  <Button
                    onClick={handleBuyNow}
                    disabled={isCheckingOut}
                    className="bg-primary text-white hover:bg-primary/90 font-heading text-base px-8 py-4 h-auto font-semibold uppercase tracking-widest transition-all duration-300"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin inline" />
                        Processing...
                      </>
                    ) : (
                      sopContent.buttonText
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* PROBLEM / SOLUTION SPLIT SECTION */}
          <section className="w-full bg-background py-16 md:py-24 border-b border-dark-grey/10">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* LEFT: PROBLEM */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6 border-l-4 border-primary pl-8"
                >
                  <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                    {sopContent.problemTitle}
                  </h2>
                  <p className="font-paragraph text-lg text-dark-grey/70 leading-relaxed">
                    {sopContent.problemText}
                  </p>
                </motion.div>

                {/* RIGHT: SOLUTION */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6 border-l-4 border-dark-grey pl-8"
                >
                  <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                    {sopContent.solutionTitle}
                  </h2>
                  <p className="font-paragraph text-lg text-dark-grey/70 leading-relaxed">
                    {sopContent.solutionText}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* METHODOLOGY SECTION */}
          <section className="w-full bg-background py-16 md:py-24 border-b border-dark-grey/10">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                  The Capture & Translate Method
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sopContent.methodology.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-4 border border-dark-grey/10 p-8"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-4xl text-primary font-bold">
                        {step.number}
                      </span>
                      <h3 className="font-heading text-xl text-dark-grey font-bold">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-paragraph text-base text-dark-grey/70 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT'S INCLUDED SECTION */}
          <section className="w-full bg-background py-16 md:py-24 border-b border-dark-grey/10">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                  What's Included
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sopContent.inclusions.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 border border-dark-grey/10 bg-background"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-lg text-dark-grey/80">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQS SECTION */}
          <section className="w-full bg-background py-16 md:py-24 border-b border-dark-grey/10">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                  Technical FAQs
                </h2>
              </motion.div>

              <div className="space-y-4 max-w-3xl">
                {sopContent.faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="border border-dark-grey/10"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 hover:bg-accent-grey/30 transition-colors"
                    >
                      <span className="font-heading text-lg text-dark-grey font-semibold text-left">
                        {faq.question}
                      </span>
                      {expandedFAQ === idx ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-dark-grey/40 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-dark-grey/10 p-6 bg-accent-grey/10"
                      >
                        <p className="font-paragraph text-base text-dark-grey/70 leading-relaxed">
                          {faq.question === 'What if I need more than 10?' ? (
                            <>
                              {faq.answer.split('Contact us for a custom quote.')[0]}
                              <Link
                                to="/#contact"
                                className="text-primary hover:text-primary/80 font-semibold underline"
                              >
                                Contact us
                              </Link>
                              {' for a custom quote.'}
                            </>
                          ) : (
                            faq.answer
                          )}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA SECTION */}
          <section className="w-full bg-background py-16 md:py-24">
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center space-y-8"
              >
                <h2 className="font-heading text-3xl md:text-4xl text-dark-grey font-bold">
                  Ready to Build Your Company Brain?
                </h2>
                <p className="font-paragraph text-lg text-dark-grey/70 max-w-2xl mx-auto">
                  Stop losing knowledge. Start scaling operations.
                </p>
                <Button
                  onClick={handleBuyNow}
                  disabled={isCheckingOut}
                  className="bg-primary text-white hover:bg-primary/90 font-heading text-base px-8 py-4 h-auto font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin inline" />
                      Processing...
                    </>
                  ) : (
                    sopContent.buttonText
                  )}
                </Button>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        // FALLBACK FOR OTHER SERVICES
        <section className="w-full bg-background py-20 md:py-32 border-b border-accent-grey/30">
          <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* LEFT: IMAGE & DETAILS */}
              <div className="lg:col-span-6 space-y-8">
                {service.itemImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full aspect-square overflow-hidden border border-accent-grey/30"
                  >
                    <Image
                      src={service.itemImage}
                      alt={service.itemName || 'Service'}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 font-bold leading-tight">
                      {service.itemName}
                    </h1>
                    <p className="font-paragraph text-lg md:text-xl text-foreground/75 leading-relaxed">
                      {service.itemDescription}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: PRICING & CTA */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-40 space-y-8 bg-gradient-to-br from-background to-background/95 border-2 border-primary/40 p-8 md:p-10"
                >
                  <div className="space-y-3">
                    <p className="font-heading text-sm uppercase tracking-widest text-secondary/70 font-semibold">
                      Investment
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-5xl md:text-6xl text-foreground font-bold">
                        ${service.itemPrice || 199}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-accent-grey/30"></div>

                  {service.serviceInclusions && (
                    <div className="space-y-4">
                      <p className="font-heading text-sm uppercase tracking-widest text-foreground/80 font-semibold">
                        What's Included
                      </p>
                      <div className="space-y-3">
                        {service.serviceInclusions.split('\n').map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-paragraph text-base text-foreground/80 leading-relaxed">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-accent-grey/30"></div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button
                      onClick={handleBuyNow}
                      disabled={isCheckingOut}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-8 py-4 h-auto transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed font-semibold"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin inline" />
                          Processing...
                        </>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="font-paragraph text-xs text-center text-secondary/60 uppercase tracking-widest"
                  >
                    Secure checkout powered by Wix
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
