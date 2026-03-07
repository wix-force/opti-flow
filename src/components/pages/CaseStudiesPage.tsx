import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function CaseStudiesPage() {
  // Case study data - modular structure for easy updates
  const caseStudies = [
    {
      id: 1,
      title: 'Process Optimization Example 1',
      description: 'Streamlined workflow implementation across multiple departments.',
      specs: [
        'Reduced processing time by 40%',
        'Improved team collaboration',
        'Automated reporting systems',
        'Real-time monitoring dashboards',
      ],
      mediaPlaceholder: 'https://static.wixstatic.com/media/2b1878_58d480f336e544e882586477e29adadd~mv2.png?originWidth=512&originHeight=384',
      align: 'left',
    },
    {
      id: 2,
      title: 'Workflow Improvement Demo',
      description: 'Complete system redesign for enhanced efficiency and scalability.',
      specs: [
        'Integrated legacy systems',
        'Reduced manual errors by 65%',
        'Enhanced data accuracy',
        'Seamless integration with existing tools',
      ],
      mediaPlaceholder: 'https://static.wixstatic.com/media/2b1878_8b411946964449e89487f8a44b60670d~mv2.png?originWidth=512&originHeight=384',
      align: 'right',
    },
    {
      id: 3,
      title: 'Automation in Action',
      description: 'Enterprise-level automation solution for complex business processes.',
      specs: [
        'Eliminated repetitive tasks',
        'Increased productivity by 55%',
        'Cost savings of 30%',
        'Improved employee satisfaction',
      ],
      mediaPlaceholder: 'https://static.wixstatic.com/media/2b1878_41055cf007a24dfba61e385dc41f1b52~mv2.png?originWidth=512&originHeight=384',
      align: 'left',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* HEADER SECTION - Centered, Minimalist */}
      <section className="w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-paragraph text-xs md:text-xs font-bold uppercase tracking-widest text-primary mb-4">
              SYSTEM ARCHITECTURE
            </p>
            <p className="font-paragraph text-xl md:text-2xl font-medium leading-relaxed text-secondary">
              Reviewing the logic and performance of recent workflow builds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY SECTIONS - Modular Containers */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.15 }}
              className="mb-20 md:mb-32 last:mb-0"
            >
              {/* Case Study Container */}
              <div className="bg-white border border-accent-grey rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Media Section - Left or Right */}
                  <div
                    className={`flex items-center justify-center bg-accent-grey/40 min-h-80 md:min-h-96 ${
                      study.align === 'right' ? 'md:order-2' : ''
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center overflow-hidden"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-accent-grey/50 to-accent-grey/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-accent-grey text-6xl mb-4">📊</div>
                          <p className="text-dark-grey/40 text-sm font-medium">Media Placeholder</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Text Section - Right or Left */}
                  <div
                    className={`flex flex-col justify-center p-8 md:p-12 ${
                      study.align === 'right' ? 'md:order-1' : ''
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                    >
                      {/* Title */}
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark-grey mb-4">
                        {study.title}
                      </h3>

                      {/* Description */}
                      <p className="font-paragraph text-base md:text-lg text-dark-grey/80 mb-6 leading-relaxed">
                        {study.description}
                      </p>

                      {/* Specs/Bullet Points */}
                      <ul className="space-y-3 mb-8">
                        {study.specs.map((spec, specIndex) => (
                          <motion.li
                            key={specIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.15 + specIndex * 0.05 }}
                            className="flex items-start gap-3 text-dark-grey/75"
                          >
                            <span className="text-primary font-bold mt-1">•</span>
                            <span className="font-paragraph text-sm md:text-base">{spec}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Button/Link */}
                      <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors duration-300"
                      >
                        View Full Blueprint
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
