import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

interface VideoItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail: string;
}

export default function CaseStudiesPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Sample video gallery data - can be replaced with CMS data later
  const videoGallery: VideoItem[] = [
    {
      id: '1',
      title: 'Email Management Automation',
      description: 'See how we reduced email processing time by 80%',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_a259609691b94d1a867565bf526a9c34~mv2.png?originWidth=640&originHeight=320'
    },
    {
      id: '2',
      title: 'Invoice Processing Workflow',
      description: 'Streamlined invoice handling from 2 hours to 15 minutes',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_296ee5cbb63f4c508930ef043dfbd80d~mv2.png?originWidth=640&originHeight=320'
    },
    {
      id: '3',
      title: 'Customer Data Entry System',
      description: 'Automated data entry saving 5 hours per week',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_a6e09eff33ef4fe3859034fcd6fa93ab~mv2.png?originWidth=640&originHeight=320'
    },
    {
      id: '4',
      title: 'Report Generation Pipeline',
      description: 'Automated monthly reporting with zero manual work',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_60847574e5564f77b59c651fbde388a8~mv2.png?originWidth=640&originHeight=320'
    },
    {
      id: '5',
      title: 'Scheduling Optimization',
      description: 'Reduced scheduling conflicts by 95%',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_145b719e96bb4a35b481e6fc9076fb69~mv2.png?originWidth=640&originHeight=320'
    },
    {
      id: '6',
      title: 'Document Management System',
      description: 'Centralized document handling with automated filing',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://static.wixstatic.com/media/2b1878_26b046672a3843eda2f2d0cff2e9f260~mv2.png?originWidth=640&originHeight=320'
    }
  ];

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
            
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
              This space is dedicated to demonstrating the logic and results of recent system builds. Explore the case studies below to see the architecture in action.
            </p>

            <p className="font-paragraph text-sm md:text-base text-foreground/50 leading-relaxed mb-8 italic">
              Note: This site has recently launched. Additional video documentation and technical walkthroughs are currently in production.
            </p>

            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* VIDEO GALLERY SECTION */}
      <section className="w-full bg-gradient-to-b from-background via-accent-grey/3 to-background py-24 md:py-32">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              Real Workflow Optimizations
            </h2>
            <p className="font-paragraph text-lg text-foreground/60 max-w-2xl">
              Explore how we've transformed various business processes. Click any video to see the full optimization in action.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videoGallery.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer"
              >
                {/* Video Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-background/95 border border-foreground/8 hover:border-primary/30 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-video overflow-hidden bg-foreground/5">
                    <Image src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/90 hover:bg-primary p-3 rounded-full shadow-lg"
                      >
                        <Play className="w-6 h-6 text-white fill-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-lg md:text-xl text-foreground mb-2 font-bold group-hover:text-primary transition-colors leading-snug">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="font-paragraph text-sm md:text-base text-foreground/60 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>
                    
                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t border-accent-grey/30 flex items-center gap-2 text-primary font-heading text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Watch Video</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 md:mt-28 p-8 md:p-12 bg-gradient-to-r from-primary/5 to-primary/3 border border-primary/20 rounded-2xl text-center"
          >
            <p className="font-paragraph text-lg text-foreground/70 mb-2">
              More examples coming soon!
            </p>
            <p className="font-paragraph text-sm text-foreground/50">
              We're constantly adding new workflow optimizations. Check back regularly for the latest case studies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Container */}
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Video Info */}
              <div className="bg-foreground/5 p-6 md:p-8 border-t border-white/10">
                <h3 className="font-heading text-xl md:text-2xl text-white mb-2 font-bold">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="font-paragraph text-white/70">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
