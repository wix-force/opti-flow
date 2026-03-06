import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService, buyNow } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Services | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Services>('services', id);
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!service) return;
    setIsCheckingOut(true);
    try {
      await buyNow([
        {
          collectionId: 'services',
          itemId: service._id,
          quantity: 1,
        },
      ]);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* BACK BUTTON & BREADCRUMB */}
      <section className="w-full bg-background border-b border-accent-grey/30 pt-32 pb-8">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-heading text-sm uppercase tracking-widest font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="w-full bg-background py-20 md:py-32 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[600px]">
              <Loader className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : !service ? (
            <div className="text-center py-20">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4 font-bold">
                Service Not Found
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 mb-8">
                The service you're looking for doesn't exist.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading px-8 py-3 h-auto rounded-lg"
              >
                Return Home
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* LEFT: IMAGE & DETAILS */}
              <div className="lg:col-span-6 space-y-8">
                {/* Service Image */}
                {service.itemImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full aspect-square rounded-2xl overflow-hidden border border-accent-grey/30 shadow-xl shadow-primary/10"
                  >
                    <Image
                      src={service.itemImage}
                      alt={service.itemName || 'Service'}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )}

                {/* Service Name & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 font-bold leading-tight">
                      {service.itemName}
                    </h1>
                    <p className="font-paragraph text-lg md:text-xl text-foreground/75 leading-relaxed">
                      {service.itemDescription}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: PRICING & CTA */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-40 space-y-8 bg-gradient-to-br from-background to-background/95 border-2 border-primary/40 p-8 md:p-10 rounded-2xl shadow-xl shadow-primary/10"
                >
                  {/* Pricing Section */}
                  <div className="space-y-3">
                    <p className="font-heading text-sm uppercase tracking-widest text-secondary/70 font-semibold">
                      Investment
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-5xl md:text-6xl text-foreground font-bold">
                        ${service.itemPrice || 199}
                      </span>
                      <span className="font-heading text-lg text-secondary/70 line-through font-semibold">
                        ${service.itemName?.toLowerCase().includes('sop') ? '1,595' : service.itemName?.toLowerCase().includes('business engine') ? '2,795' : '595'}
                      </span>
                    </div>
                    <p className="font-paragraph text-sm text-secondary/70 uppercase tracking-widest font-semibold">
                      Introductory Rate
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-accent-grey/30"></div>

                  {/* What's Included */}
                  {service.serviceInclusions && (
                    <div className="space-y-4">
                      <p className="font-heading text-sm uppercase tracking-widest text-foreground/80 font-semibold">
                        What's Included
                      </p>
                      <div className="space-y-3">
                        {service.serviceInclusions.split('\n').map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-paragraph text-base text-foreground/80 leading-relaxed">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-accent-grey/30"></div>

                  {/* Buy Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button
                      onClick={handleBuyNow}
                      disabled={isCheckingOut}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-8 py-4 h-auto rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed font-semibold"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin inline" />
                          Processing...
                        </>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </Button>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="font-paragraph text-xs text-center text-secondary/60 uppercase tracking-widest"
                  >
                    Secure checkout powered by Wix
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
