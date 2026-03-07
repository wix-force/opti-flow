import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useServiceStore } from '@/lib/serviceStore';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { services } = useServiceStore();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceName: string) => {
    // Navigate to home page first if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Scroll after navigation completes
      setTimeout(() => {
        scrollToServiceSection(serviceName);
      }, 100);
    } else {
      scrollToServiceSection(serviceName);
    }
  };

  const scrollToServiceSection = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('single process audit')) {
      const element = document.getElementById('service-single-process-audit');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (serviceName.toLowerCase().includes('sop library')) {
      // Scroll to the offerings section where SOP Library is displayed
      const element = document.getElementById('offerings-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Then scroll down to show the SOP card
        setTimeout(() => {
          const sopCard = document.querySelector('[data-service="sop-library"]');
          if (sopCard) {
            sopCard.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    } else if (serviceName.toLowerCase().includes('business engine redesign')) {
      // Scroll to the offerings section where Business Engine Redesign is displayed
      const element = document.getElementById('offerings-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Then scroll down to show the Business Engine card
        setTimeout(() => {
          const beCard = document.querySelector('[data-service="business-engine-redesign"]');
          if (beCard) {
            beCard.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  };

  return (
    <footer className="w-full bg-foreground text-background py-20 border-t border-foreground/20">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl text-background mb-4 font-bold tracking-tight">
              Workflowr
            </h3>
            <p className="font-paragraph text-base text-background/70 leading-relaxed">
              Transforming business processes into competitive advantages, one workflow at a time.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-sm text-background mb-6 uppercase tracking-widest font-semibold">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Home
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('offerings-section')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Packages
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                ROI Calculator
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Contact Me
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-sm text-background mb-6 uppercase tracking-widest font-semibold">
              Services
            </h4>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleServiceClick('single process audit')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                The Single Process Audit
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleServiceClick('sop library')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                The SOP Library
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleServiceClick('business engine redesign')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                The Business Engine Redesign
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </nav>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-sm text-background mb-6 uppercase tracking-widest font-semibold">
              Ready to Start?
            </h4>
            <p className="font-paragraph text-base text-background/70 mb-6 leading-relaxed">
              Let's optimize your workflows and unlock your team's potential.
            </p>
            <button
              onClick={() => scrollToSection('offerings-section')}
              className="font-heading text-sm text-foreground bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="font-paragraph text-sm text-background/60">
              © {currentYear} Workflowr. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="font-paragraph text-sm text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="font-paragraph text-sm text-background/60 hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
