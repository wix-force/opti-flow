import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      
      {/* HERO/INTRO SECTION */}
      <section className="w-full pt-40 pb-8 md:pb-12 border-b border-accent-grey/30 mt-20">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-foreground mb-8 font-bold">
              Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Studies</span>
            </h1>
            
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">Video case studies coming soon</p>

            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* VIDEO UPLOAD PLACEHOLDER SECTION */}
      <section className="w-full bg-background py-24">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-accent-grey/20 border border-accent-grey rounded-lg p-12 md:p-16">
              <p className="font-paragraph text-lg text-foreground/70 mb-4">
                This page is ready for video uploads
              </p>
              <p className="font-paragraph text-sm text-secondary">
                Videos will be displayed here once they are uploaded to the CMS
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
