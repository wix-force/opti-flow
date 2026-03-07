import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play } from 'lucide-react';

export default function CaseStudiesPage() {
  // Sample video data - can be replaced with CMS data
  const [videos] = useState([
    {
      id: 1,
      title: 'Process Optimization Example 1',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_af0c7363021a4cf78b01e2843684e783~mv2.png?originWidth=640&originHeight=320',
      duration: '5:32',
    },
    {
      id: 2,
      title: 'Workflow Improvement Demo',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_70e2a5d417a642d9b853cb6b5411b21e~mv2.png?originWidth=640&originHeight=320',
      duration: '4:15',
    },
    {
      id: 3,
      title: 'Automation in Action',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_4a5828277c4b43ac95d0ecd8ed7463af~mv2.png?originWidth=640&originHeight=320',
      duration: '6:48',
    },
    {
      id: 4,
      title: 'Data Analysis Walkthrough',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_63e3f99adf484d6bbed6c5642558ae4b~mv2.png?originWidth=640&originHeight=320',
      duration: '3:52',
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      
      {/* WELCOME MESSAGE SECTION */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-grey/90">
              Thanks for visiting the examples section! This site has just newly launched, so there are more examples of optimizations "in action" coming soon. In the meantime, take a look at what I've got below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VIDEO GRID SECTION */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Grid of videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-accent-grey/30 aspect-video">
                    {/* Placeholder for video thumbnail */}
                    <div className="w-full h-full bg-gradient-to-br from-accent-grey/40 to-accent-grey/20 flex items-center justify-center">
                      <div className="absolute inset-0 bg-dark-grey/5 group-hover:bg-dark-grey/10 transition-colors duration-300"></div>
                      
                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      >
                        <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                      </motion.div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 bg-dark-grey/80 text-white px-2.5 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video title */}
                  <h3 className="font-heading text-base md:text-lg font-semibold text-dark-grey mt-4 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Empty state message if no videos */}
            {videos.length === 0 && (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-dark-grey/60">
                  Video examples coming soon
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
