import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SingleProcessAuditPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      
      <section className="w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-[120rem] mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6 font-bold">
            Single Process Audit Details
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-foreground/80">
            This is a separate details page for the Single Process Audit offering.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
