import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IntroductoryRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroductoryRateModal({ isOpen, onClose }: IntroductoryRateModalProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    onClose();

    // If we're on the home page, scroll to contact
    if (location.pathname === '/') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      // If we're on a detail page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
            className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8 overflow-y-auto"
          >
            <div className="bg-background border-2 border-dark-grey/20 border-primary rounded-2xl shadow-2xl p-8 md:p-10 space-y-6 w-full max-w-md my-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-dark-grey/60 rounded-2xl hover:text-dark-grey transition-colors"
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
                  During our Initial Rollout Phase, we are offering a Foundational Rate on all new packages. In exchange for this pricing, we ask for your permission to document the evolution of your operational architecture as a featured case study. All proprietary data and identifying information will be strictly anonymized to protect your firm's privacy.
                </p>
                <p className="font-paragraph text-base text-dark-grey/80 leading-relaxed">
                  To opt out, send us a message <button onClick={handleContactClick} className="text-primary hover:text-primary/80 font-semibold underline transition-colors">here</button>.
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
