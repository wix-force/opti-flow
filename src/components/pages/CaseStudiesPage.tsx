import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ProcessExamples } from '@/entities';

export default function CaseStudiesPage() {
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const processResult = await BaseCrudService.getAll<ProcessExamples>('processexamples');
      setProcessExamples(processResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

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
              Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Examples</span>
            </h1>
            
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">Real processes we've optimized. See if any match your workflow.</p>

            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* EXAMPLE WORKFLOWS SECTION - GRID LAYOUT */}
      <section className="w-full bg-background py-24 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="min-h-[200px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border-r border-b border-dark-grey/20 p-6 space-y-4">
                    <div className="bg-accent-grey/30 h-6 animate-pulse w-2/3"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-full"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-full"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {processExamples.map((process, index) => (
                  <GridProcessCard 
                    key={process._id} 
                    process={process}
                    index={index}
                    total={processExamples.length}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary text-sm">No workflow examples available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Grid process card - Dense, professional, core redesign components aesthetic
function GridProcessCard({ 
  process, 
  index, 
  total 
}: { 
  process: ProcessExamples; 
  index: number;
  total: number;
}) {
  // Calculate which borders to show for 3-column grid
  const isLastRow = index >= total - (total % 3 === 0 ? 3 : total % 3);
  const isLastInRow = (index + 1) % 3 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border border-dark-grey p-[25px] flex flex-col h-full pt-[25px] ${
        !isLastRow ? 'border-b border-dark-grey' : ''
      } ${
        !isLastInRow ? 'border-r border-dark-grey' : ''
      }`}
    >
      <div className="flex flex-col h-full space-y-0">
        {/* Workflow Title - Bold, top-aligned, zero margin below */}
        <h3 className="font-heading text-lg font-bold text-foreground leading-[1.3] mb-0">
          {process.processName}
        </h3>
        
        {/* Description Text - 14px, line-height 1.3, 12px margin below */}
        <p className="font-paragraph text-[14px] text-[#666666] leading-[1.3] mb-[12px] flex-1">
          {process.processDescription}
        </p>
        
        {/* Friction Section - Electric Blue label, bold, all-caps, 12px */}
        {process.commonPainPoint && (
          <div className="mb-[8px]">
            <p className="font-paragraph text-[14px] leading-[1.3]">
              <span className="font-heading text-[12px] font-bold text-primary uppercase tracking-wide">Friction:</span>{' '}
              <span className="text-foreground text-[14px] leading-[1.3]">{process.commonPainPoint}</span>
            </p>
          </div>
        )}
        
        {/* Impact Section - Electric Blue label, bold, all-caps, 12px */}
        {process.potentialImpact && (
          <div className="mb-0">
            <p className="font-paragraph text-[14px] leading-[1.3]">
              <span className="font-heading text-[12px] font-bold text-primary uppercase tracking-wide">Impact:</span>{' '}
              <span className="text-foreground text-[14px] leading-[1.3]">{process.potentialImpact}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
