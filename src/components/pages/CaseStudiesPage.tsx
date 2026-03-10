import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  // Case study data - modular structure for easy updates
  const caseStudies = [
    {
      id: 1,
      title: 'Customer Data Entry System',
      metric: 'Automated data entry saving 5 hours per week',
    },
    {
      id: 2,
      title: 'Report Generation Pipeline',
      metric: 'Reduced report creation time by 70%',
    },
    {
      id: 3,
      title: 'Inventory Management Workflow',
      metric: 'Real-time tracking eliminating manual updates',
    },
    {
      id: 4,
      title: 'Email Automation System',
      metric: 'Personalized campaigns reaching 10k+ users daily',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* HEADER SECTION - Bold, Left-Aligned */}
      <section className="w-full pt-32 pb-24 md:pt-40 md:pb-32 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-text-header mb-8">
              Workflow Examples
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-text-body max-w-3xl leading-relaxed">
              The logic and performance of recent workflow builds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CARD GRID SECTION - 2-Column Layout */}
      <section className="w-full bg-white py-24 md:py-32 lg:py-40">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                className="flex flex-col"
              >
                {/* Card Container */}
                <div className="flex flex-col h-full">
                  {/* Video Player Placeholder */}
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="w-full aspect-video bg-dark-grey/10 overflow-hidden flex items-center justify-center cursor-pointer relative group"
                    >
                      {/* Play Button Icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow">
                    {/* Subhead */}
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-header mb-4">
                      {study.title}
                    </h3>

                    {/* Metric Description */}
                    <p className="font-paragraph text-base md:text-lg text-text-body mb-8 flex-grow leading-relaxed">
                      {study.metric}
                    </p>

                    {/* Watch Video Link */}
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:text-primary/80 transition-colors duration-300"
                    >
                      Watch Video →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON SECTION - Full-Width Light Blue Box */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full bg-blue-50 rounded-2xl py-24 md:py-32 px-8 md:px-16 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-header mb-8">
              More examples coming soon!
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-text-body max-w-3xl mx-auto mb-12 leading-relaxed">
              We're constantly adding new workflow optimizations. Check back regularly for the latest case studies.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-4 h-auto rounded-lg shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 text-base font-semibold"
              onClick={() => navigate('/#roi-calculator')}
            >
              See the ROI <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
