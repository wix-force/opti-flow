import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-accent-grey py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 font-bold">
              WORKFLOW AUDIT
            </h3>
            <p className="font-paragraph text-base text-secondary">
              Simplifying business processes, one workflow at a time.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base text-foreground mb-4 uppercase">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-paragraph text-base text-secondary hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => document.getElementById('processes')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-paragraph text-base text-secondary hover:text-primary transition-colors text-left"
              >
                Process Examples
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-paragraph text-base text-secondary hover:text-primary transition-colors text-left"
              >
                Get Started
              </button>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-base text-foreground mb-4 uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p className="font-paragraph text-base text-secondary">
                Ready to optimize your workflows?
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-paragraph text-base text-primary hover:text-primary/80 transition-colors text-left"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-grey text-center">
          <p className="font-paragraph text-sm text-secondary">
            © {currentYear} Workflow Audit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
