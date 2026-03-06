import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-accent-grey/50 z-50">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-heading text-xl md:text-2xl text-foreground font-bold tracking-tight hover:text-primary transition-colors duration-300">
            WORKFLOW AUDIT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <Link
              to="/case-studies"
              className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
            >
              Examples
            </Link>
            <button
              onClick={() => scrollToSection('roi-calculator')}
              className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
            >
              ROI
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-sm px-6 py-2.5 h-auto rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Solutions
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-6 border-t border-accent-grey/50"
            >
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="font-paragraph text-base text-foreground/80 hover:text-primary transition-colors text-left font-medium"
                >
                  Home
                </button>
                <Link
                  to="/case-studies"
                  className="font-paragraph text-base text-foreground/80 hover:text-primary transition-colors text-left font-medium"
                >
                  Examples
                </Link>
                <button
                  onClick={() => scrollToSection('roi-calculator')}
                  className="font-paragraph text-base text-foreground/80 hover:text-primary transition-colors text-left font-medium"
                >
                  ROI
                </button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-6 py-3 h-auto rounded-lg w-full transition-all duration-300"
                >
                  Solutions
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
