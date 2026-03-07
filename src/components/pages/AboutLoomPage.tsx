import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AboutLoomPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      {/* Main Content Section */}
      <section className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-[50rem] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-tight">
              Communication Logic
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary/70">Using video to capture nuance and eliminate the email chain.</p>
          </motion.div>

          {/* Video Player Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full aspect-video bg-accent-grey/20 border border-dark-grey rounded-none flex items-center justify-center mb-12 overflow-hidden"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="font-paragraph text-foreground/60 text-sm">
                Loom Video Player Placeholder
              </p>
              <p className="font-paragraph text-foreground/40 text-xs mt-2">
                16:9 Aspect Ratio
              </p>
            </div>
          </motion.div>

          {/* Why I Use This Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Why I Use This
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/75 leading-relaxed mb-4">
              Video communication cuts through the noise of email chains and Slack threads. Instead of 10 back-and-forth messages, a 10-minute Loom video captures the full context, tone, and nuance of what you're trying to communicate.
            </p>
            <p className="font-paragraph text-base md:text-lg text-foreground/75 leading-relaxed">With that said, this isn't a requirement. Whether you prefer a recorded walkthrough, a set of screenshots, or a technical brief, the goal is the same: identify the friction in your workflow and build the solution.</p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start"
          >
            <Button
              onClick={() => navigate('/')}
              className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Main
            </Button>
            
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg"
            >Solutions</Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
