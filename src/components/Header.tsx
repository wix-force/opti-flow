import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-accent-grey z-50">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-heading text-2xl text-foreground font-bold">
            WORKFLOW AUDIT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('processes')}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Process Examples
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-6 py-2 h-auto rounded"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-accent-grey">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="font-paragraph text-base text-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('processes')}
                className="font-paragraph text-base text-foreground hover:text-primary transition-colors text-left"
              >
                Process Examples
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-6 py-2 h-auto rounded w-full"
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
