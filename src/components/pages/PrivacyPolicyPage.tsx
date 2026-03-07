import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-6 py-16">
        <h1 className="text-5xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-lg text-secondary mb-6">
            Your privacy policy content goes here.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
