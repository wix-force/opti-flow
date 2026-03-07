import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function CaseStudiesPage() {
  // Case study data - modular structure for easy updates
  const caseStudies = [
    {
      id: 1,
      title: 'Customer Data Entry System',
      metric: 'Automated data entry saving 5 hours per week',
      image: 'https://static.wixstatic.com/media/2b1878_16ec0b9a2dee4670b54a7c4e6f302359~mv2.png?originWidth=576&originHeight=320',
    },
    {
      id: 2,
      title: 'Report Generation Pipeline',
      metric: 'Reduced report creation time by 70%',
      image: 'https://static.wixstatic.com/media/2b1878_b54ff9f0916c417d8aad53cb0176dd38~mv2.png?originWidth=576&originHeight=320',
    },
    {
      id: 3,
      title: 'Inventory Management Workflow',
      metric: 'Real-time tracking eliminating manual updates',
      image: 'https://static.wixstatic.com/media/2b1878_6b0e5e455c8f486bb11523d20359fabb~mv2.png?originWidth=576&originHeight=320',
    },
    {
      id: 4,
      title: 'Email Automation System',
      metric: 'Personalized campaigns reaching 10k+ users daily',
      image: 'https://static.wixstatic.com/media/2b1878_65bc726b8fc44f99a10d1c29c53a8143~mv2.png?originWidth=576&originHeight=320',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* HEADER SECTION - Bold, Left-Aligned */}
      <section className="w-full pt-24 pb-16 md:pt-32 md:pb-20 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-dark-grey mb-4">
              Workflow Examples
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-dark-grey/70 max-w-2xl">
              The logic and performance of recent workflow builds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CARD GRID SECTION - 2-Column Layout */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
                  {/* Featured Image/Video Thumbnail */}
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="w-full aspect-video bg-accent-grey overflow-hidden"
                    >
                      <Image
                        src={study.image}
                        alt={study.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow">
                    {/* Subhead */}
                    <h3 className="font-heading text-2xl md:text-2xl font-bold text-dark-grey mb-3">
                      {study.title}
                    </h3>

                    {/* Metric Description */}
                    <p className="font-paragraph text-base text-dark-grey/75 mb-6 flex-grow">
                      {study.metric}
                    </p>

                    {/* Watch Video Link */}
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-primary font-medium text-base hover:text-primary/80 transition-colors duration-300"
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
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full bg-blue-50 rounded-lg py-16 md:py-20 px-8 md:px-12 text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-grey mb-4">
              More examples coming soon!
            </h2>
            <p className="font-paragraph text-lg text-dark-grey/70 max-w-2xl mx-auto">
              We're constantly adding new workflow optimizations. Check back regularly for the latest case studies.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
