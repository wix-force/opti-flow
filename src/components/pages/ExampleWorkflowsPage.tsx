import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ProcessExamples } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExampleWorkflowsPage() {
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const result = await BaseCrudService.getAll<ProcessExamples>('processexamples');
      setProcessExamples(result.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      {/* HERO SECTION - MINIMAL */}
      <section className="w-full py-12 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
              Example Workflows
            </h1>
            <p className="font-paragraph text-4xl md:text-5xl text-foreground max-w-3xl font-bold leading-tight">
              Real processes we've optimized. See if any match your workflow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WORKFLOW EXAMPLES - ULTRA COMPACT GRID */}
      <section className="w-full bg-background py-8">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="min-h-[200px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-accent-grey/30 h-32 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {processExamples.map((process, index) => (
                  <CompactProcessCard key={process._id} process={process} index={index} />
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

// Ultra compact card component - minimal design
function CompactProcessCard({ process, index }: { process: ProcessExamples, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white border border-accent-grey p-2.5 group hover:border-primary hover:bg-primary/2 transition-all duration-300 flex flex-col justify-between min-h-fit"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-heading text-lg font-bold text-dark-grey group-hover:text-primary transition-colors leading-tight">
            {process.processName}
          </h3>
          <Plus className="w-4 h-4 text-accent-grey group-hover:text-primary group-hover:rotate-90 transition-all duration-300 flex-shrink-0 mt-0.5" />
        </div>
        <p className="font-paragraph text-xs text-secondary leading-snug line-clamp-2">
          {process.processDescription}
        </p>
      </div>

      {process.commonPainPoint && (
        <div className="pt-1.5 mt-1.5 border-t border-accent-grey/50 bg-primary/5 -mx-2.5 px-2.5 py-1.5">
          <p className="font-paragraph text-xs text-foreground font-semibold">
            <span className="text-primary font-bold">Pain:</span> {process.commonPainPoint}
          </p>
        </div>
      )}
    </motion.div>
  );
}
