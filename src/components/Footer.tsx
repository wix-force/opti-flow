import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                onClick={() => scrollToSection('example-workflows')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Examples
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                ROI Calculator
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
                onClick={() => scrollToSection('contact')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Process Audit
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Workflow Optimization
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-paragraph text-base text-background/70 hover:text-background transition-colors text-left font-medium group flex items-center gap-2"
              >
                Custom Solutions
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
              onClick={() => scrollToSection('contact')}
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
              <a href="#" className="font-paragraph text-sm text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-background/60 hover:text-background transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
