import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface IntroductoryRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroductoryRateModal({ isOpen, onClose }: IntroductoryRateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-auto px-6"
          >
            <div className="bg-background border-2 border-dark-grey/20 p-8 md:p-10 space-y-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-dark-grey/60 hover:text-dark-grey transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl md:text-3xl text-dark-grey font-bold">
                  Introductory Rate
                </h2>
                <p className="font-paragraph text-base text-dark-grey/80 leading-relaxed">
                  This is our introductory pricing for early adopters. As we expand our service offerings and build our track record, pricing will adjust to reflect the full value delivered.
                </p>
                <p className="font-paragraph text-base text-dark-grey/80 leading-relaxed">
                  By securing your service now, you lock in this rate for future engagements and updates—a benefit reserved for our founding clients.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full bg-primary text-white hover:bg-primary/90 font-heading text-base px-8 py-3 h-auto font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  Got It
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
