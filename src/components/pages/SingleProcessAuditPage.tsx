import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SingleProcessAuditPage() {
  const scrollToContact = () => {
    document.getElementById('audit-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center pt-32 pb-20 border-b border-accent-grey/30 mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground mb-6 font-bold">
              The Single Process Audit
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-secondary/90 leading-relaxed max-w-3xl mb-8">
              One Workflow. One Audit. Immediate ROI.
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mb-12">
              Stop losing hours to manual tasks. Send me your process; I'll send you the exit strategy.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap">
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-3 h-auto rounded-lg shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                onClick={scrollToContact}
              >
                Get Started for $198 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="font-paragraph text-sm text-secondary/70">
                Introductory Rate — Save $397
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="w-full bg-background py-24 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          {/* What is a Single Process Audit? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 font-bold">
              What is a Single Process Audit?
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Most business owners are too "in" the weeds to see the "out." You have a workflow that feels heavy, slow, or prone to error. This is a one-time diagnostic designed to identify exactly where your time is leaking and provide a clear plan to fix it.
            </p>
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 font-bold">
              How it Works: The "20-Minute Rule"
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mb-12">
              To keep this high-impact and low-friction, we use a simple perimeter:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "The Submission",
                  description: "You provide a Loom video, an SOP, or a written walkthrough of one core workflow."
                },
                {
                  title: "The Scope",
                  description: "If you can show it or explain it in 20 minutes or less, I can audit it."
                },
                {
                  title: "The Result",
                  description: "Within 3 business days, you receive a Simple GPS—step-by-step instructions to reclaim your time."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="bg-gradient-to-br from-background to-background/95 border border-foreground/10 hover:border-primary/40 p-8 rounded-xl transition-all duration-300"
                >
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 font-bold">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base md:text-lg text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 font-bold">
              What's Included in Your Audit
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mb-12">
              When you purchase this audit, you aren't just getting "advice"—you're getting a direct bridge to a leaner business.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: "Forensic Workflow Analysis",
                  description: "A deep-dive review of your submission to find bottlenecks and \"hidden\" friction. Think: Identifying nuances in how you move data between platforms, and exactly where a series of targeted automations could do the heavy lifting (without losing your human touch!)."
                },
                {
                  title: "Tech Stack & Automation Audit",
                  description: "I'll review the tools you use and identify exactly where they can be better utilized or integrated. I'll show you how to make your existing apps talk to each other, cutting out the \"middle-man\" manual work."
                },
                {
                  title: "5 Actionable Acceleration Steps",
                  description: "Five simplified, \"do-this-now\" instructions to speed up your process immediately—no complex coding or expensive upgrades required."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex gap-6"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 font-bold">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-base md:text-lg text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What Counts as a Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 font-bold">
              "What counts as a workflow?"
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mb-12">
              Not sure what to send? Here are precise examples of what fits perfectly into this audit:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Client Onboarding",
                  description: "Think of every step you take from the moment a client says \"Yes\" to their first official day working with you."
                },
                {
                  title: "New Lead Processing",
                  description: "Think of how you handle a new inquiry—from that first \"I'm interested\" email to actually engaging in a live conversation."
                },
                {
                  title: "Invoicing & Payments",
                  description: "Think of the manual work that goes into generating, sending, and tracking invoices or processing incoming bills."
                },
                {
                  title: "Content Distribution",
                  description: "Think of the steps it takes to move a finished blog or video from your computer into your newsletter or onto your social feed."
                },
                {
                  title: "Meeting Admin",
                  description: "Beyond just AI summaries—think of the manual work of creating specific prep docs, updating your CRM records, or creating follow-up tasks after a call."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  className="bg-gradient-to-br from-background to-background/95 border border-foreground/10 hover:border-primary/40 p-6 rounded-xl transition-all duration-300"
                >
                  <h3 className="font-heading text-lg md:text-xl text-foreground mb-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-primary/5 border border-primary/20 p-8 rounded-xl"
            >
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 font-bold">
                The Perimeter
              </h3>
              <p className="font-paragraph text-base md:text-lg text-foreground/80 leading-relaxed">
                A "workflow" is a single sequence with a clear start and end. If your process feels like "the whole business," pick the one part that gives you the biggest headache. We'll start there (or feel free to check out my "Business Engine" offering).
              </p>
            </motion.div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 font-bold">
              FAQ
            </h2>

            <div className="space-y-8">
              {[
                {
                  question: "How do I send my process?",
                  answer: "Once you check out, you'll be directed to a simple intake form where you can drop your Loom link or upload your SOP file."
                },
                {
                  question: "Do I need to clean up my process before recording?",
                  answer: "No! In fact, seeing the \"messy\" version helps me see the real friction points. Just hit record and do the task as you normally would."
                },
                {
                  question: "What if my workflow is too big?",
                  answer: "If your submission exceeds the 20-minute review limit, I'll reach out immediately. We'll either narrow the focus to the most important part or discuss a custom project."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 font-bold">
                    {item.question}
                  </h3>
                  <p className="font-paragraph text-base md:text-lg text-foreground/80 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-primary to-primary/80 p-12 md:p-16 rounded-2xl text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 font-bold">
              Reclaim Your Time Today.
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8">
              Introductory Price: <span className="font-bold">$198</span> (Standard Rate: $595)
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300 font-heading px-12 py-4 h-auto rounded-lg shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
              onClick={scrollToContact}
            >
              Reserve Your Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="audit-contact" className="w-full bg-gradient-to-b from-background to-accent-grey/5 py-32 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 font-bold">
              Ready to Get Started?
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Click the button below to proceed with your Single Process Audit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-12 py-4 h-auto rounded-lg shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
            >
              Get Started for $198 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
