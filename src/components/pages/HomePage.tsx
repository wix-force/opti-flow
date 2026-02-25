// HPI 1.7-G
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BaseCrudService } from '@/integrations';
import { ProcessExamples, Services } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  // ... keep existing code (state management) ...
  const [hourlyRate, setHourlyRate] = useState<string>('100');
  const [hoursPerWeek, setHoursPerWeek] = useState<number[]>([5]);
  const [services, setServices] = useState<Services[]>([]);
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [hasInteractedWithRate, setHasInteractedWithRate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const serviceResult = await BaseCrudService.getAll<Services>('services');
      setServices(serviceResult.items);
      
      const processResult = await BaseCrudService.getAll<ProcessExamples>('processexamples');
      setProcessExamples(processResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const calculateSavings = () => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = hoursPerWeek[0] || 0;
    const weekly = rate * hours;
    const monthly = weekly * 4.33;
    const yearly = weekly * 52;
    return { weekly, monthly, yearly };
  };

  const savings = calculateSavings();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', company: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-20 border-b border-accent-grey/30 mt-20">
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-foreground mb-12 font-bold">
                  Stop Losing <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">5 Hours a Week</span> <br />
                  to Messy Workflows.
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-3xl"
              >
                <div className="w-12 h-[1px] bg-foreground/30 hidden md:block"></div>
                <p className="font-paragraph text-lg md:text-xl text-secondary/90 leading-relaxed">
                  Send me a 10-minute <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-semibold transition-colors">Loom</a> video of a task you want to speed up or eliminate. I'll send you the playbook to fix it.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap"
              >
                <Button 
                  size="sm" 
                  className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg shadow-lg shadow-foreground/10 hover:shadow-lg hover:shadow-primary/20"
                  onClick={() => document.getElementById('example-workflows')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Show Me Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-background border-2 border-foreground/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg"
                  onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Show Me the ROI
                </Button>

                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-3 h-auto rounded-lg md:ml-auto shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Go <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end opacity-50">
               <motion.div
                 animate={{ y: [0, 12, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <ArrowDown className="w-8 h-8 text-foreground" />
               </motion.div>
               <span className="font-heading text-xs tracking-widest uppercase mt-4 writing-mode-vertical lg:writing-mode-horizontal font-semibold">
                 Scroll to Explore
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CONTAINER - MAIN OFFERING + ADDITIONAL OFFERINGS */}
      <section className="w-full bg-gradient-to-b from-background via-accent-grey/5 to-background py-24 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          {isLoadingData ? (
            <div className="space-y-12">
              {/* Main offering skeleton */}
              <div className="bg-background border border-foreground/10 p-8 md:p-12 animate-pulse rounded-xl">
                <div className="h-8 bg-accent-grey w-3/4 mb-4"></div>
                <div className="h-4 bg-accent-grey w-1/2 mb-6"></div>
                <div className="h-12 bg-accent-grey w-1/3"></div>
              </div>
              {/* Additional offerings skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-background border border-foreground/10 p-6 animate-pulse rounded-xl">
                    <div className="h-6 bg-accent-grey w-2/3 mb-3"></div>
                    <div className="h-4 bg-accent-grey w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : services.length > 0 ? (
            <div className="space-y-12">
              {/* MAIN OFFERING - Single Process Audit */}
              {services[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="bg-gradient-to-br from-background to-background/95 border-2 border-primary/40 hover:border-primary/60 p-8 md:p-12 shadow-xl shadow-primary/10 rounded-2xl relative overflow-hidden flex flex-col justify-start group transition-all duration-500"
                >
                  {/* Decorative gradient accents */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none"></div>

                  <div className="flex-1 relative z-10">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-heading uppercase tracking-widest mb-6 font-bold rounded-full">
                      Signature Service
                    </div>
                    
                    <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-6 font-bold">
                      {services[0].itemName}
                    </h3>
                    <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl leading-relaxed">
                      {services[0].itemDescription}
                    </p>
                    <div className="space-y-4 mb-8">
                      {services[0].serviceInclusions?.split('\n').map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-start group/item"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="font-paragraph text-base text-foreground/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-accent-grey/30 pt-8 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
                    <div>
                      <div className="mb-2 flex items-baseline gap-3">
                        <span className="font-heading text-5xl md:text-6xl text-foreground tracking-tight font-bold">
                          ${services[0].itemPrice || 199}
                        </span>
                        <span className="font-heading text-2xl md:text-3xl text-secondary/70 tracking-tight font-bold line-through">
                          $595
                        </span>
                      </div>
                      <p className="font-paragraph text-xs text-secondary/70 uppercase tracking-widest font-semibold">
                        Introductory rate
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-4 h-auto rounded-lg transition-all hover:shadow-lg hover:shadow-primary/30 hover:translate-y-[-2px] md:w-auto w-full"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ADDITIONAL OFFERINGS - Other Services */}
              {services.length > 1 && (
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                  >
                    <h3 className="font-heading text-2xl text-foreground/70 uppercase tracking-widest font-semibold">
                      Additional Offerings
                    </h3>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.slice(1).map((service, index) => (
                      <motion.div
                        key={service._id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                        className="bg-gradient-to-br from-background to-background/95 border border-foreground/10 hover:border-primary/40 p-6 md:p-8 hover:shadow-lg hover:shadow-primary/10 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-start group"
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors duration-300"></div>

                        <div className="flex-1 relative z-10">
                          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-heading uppercase tracking-widest mb-4 group-hover:bg-primary/20 transition-colors rounded-full font-semibold">
                            {service.itemName?.toLowerCase().includes('sop library') ? 'Asset Building' : service.itemName?.toLowerCase().includes('business engine redesign') ? 'Systemiv' : 'Option'}
                          </div>
                          
                          <h4 className="font-heading text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors font-bold">
                            {service.itemName}
                          </h4>
                          <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-2">
                            {service.itemDescription}
                          </p>
                          <div className="space-y-2.5 mb-6">
                            {service.serviceInclusions?.split('\n').slice(0, 2).map((item, idx) => (
                              <div key={idx} className="flex items-start group/item">
                                <CheckCircle className="w-3.5 h-3.5 text-primary/60 mr-2 mt-0.5 flex-shrink-0 group-hover/item:text-primary group-hover/item:scale-110 transition-all" />
                                <span className="font-paragraph text-xs text-foreground/70">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-accent-grey/30 pt-4 mt-4 relative z-10">
                          <div className="mb-3">
                            <span className="font-heading text-3xl text-foreground tracking-tight font-bold">
                              ${service.itemPrice || 199}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-heading text-xs py-2.5 h-auto rounded-lg transition-all group-hover:translate-y-[-1px]"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-sm">No services available.</p>
            </div>
          )}
        </div>
      </section>

      {/* ROI CALCULATOR - INTERACTIVE - MODERN SLEEK DESIGN */}
      <section id="roi-calculator" className="w-full bg-gradient-to-br from-foreground via-foreground/98 to-foreground text-background py-20 overflow-hidden relative">
        {/* Sleek background with gradient overlay */}
        <div className="absolute inset-0 opacity-3" 
             style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl mb-4 text-white font-bold"
            >
              The Cost of <span className="text-primary font-bold">Inaction</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-paragraph text-base text-white/70 max-w-2xl leading-relaxed"
            >
              Adjust your hourly rate and hours spent on messy workflows to see your potential savings.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Input Controls - Sleek & Compact */}
            <div className="lg:col-span-4 space-y-8">
              {/* Hourly Rate Input */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <Label htmlFor="hourlyRate" className={`font-heading text-xs uppercase tracking-widest block font-semibold transition-colors duration-300 ${hasInteractedWithRate ? 'text-white/80' : 'text-white/60'}`}>
                  Hourly Rate
                </Label>
                <div className={`relative group transition-all duration-300 ${hasInteractedWithRate ? 'opacity-100' : 'opacity-70'}`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg font-bold transition-colors">$</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => {
                      setHourlyRate(e.target.value);
                      setHasInteractedWithRate(true);
                    }}
                    onFocus={() => setHasInteractedWithRate(true)}
                    className="bg-white/10 border border-white/20 text-white text-lg h-12 pl-10 pr-12 focus:border-primary focus:bg-white/15 rounded-lg transition-all duration-200 focus:ring-0 placeholder:text-white/30 autofill:text-white autofill:bg-white/10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="0"
                    style={{ colorScheme: 'dark' }}
                  />
                  <motion.span 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 text-lg font-bold pointer-events-none"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {hourlyRate ? `${parseFloat(hourlyRate).toLocaleString()}` : '$0'}
                  </motion.span>
                </div>
                {!hasInteractedWithRate && (
                  <p className="font-paragraph text-xs text-white/40 italic">
                    Default example showing potential savings
                  </p>
                )}
              </motion.div>

              {/* Hours Per Week Slider */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <Label htmlFor="hoursPerWeek" className="font-heading text-xs text-white/70 uppercase tracking-widest font-semibold">
                    Hours/Week
                  </Label>
                  <motion.span 
                    key={hoursPerWeek[0]}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-heading text-2xl text-primary font-bold"
                  >
                    {hoursPerWeek[0]}h
                  </motion.span>
                </div>
                <Slider
                  id="hoursPerWeek"
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  max={20}
                  min={1}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-white/50 font-medium">
                  <span>1h</span>
                  <span>20h</span>
                </div>
              </motion.div>
            </div>

            {/* Results Grid - Compact & Sharp */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-4 lg:gap-6">
              {/* Weekly */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/8 border border-white/15 rounded-xl p-5 lg:p-6 text-center hover:bg-white/12 hover:border-white/25 transition-all duration-300 group backdrop-blur-sm"
              >
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-4 font-semibold group-hover:text-white/80 transition-colors">Weekly</p>
                <motion.p
                  key={savings.weekly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-3xl lg:text-4xl text-white font-bold"
                >
                  ${savings.weekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>

              {/* Monthly */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white/8 border border-white/15 rounded-xl p-5 lg:p-6 text-center hover:bg-white/12 hover:border-white/25 transition-all duration-300 group backdrop-blur-sm"
              >
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-4 font-semibold group-hover:text-white/80 transition-colors">Monthly</p>
                <motion.p
                  key={savings.monthly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-3xl lg:text-4xl text-white font-bold"
                >
                  ${savings.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>

              {/* Yearly - Highlighted */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-br from-primary to-primary/80 border border-primary/60 rounded-xl p-5 lg:p-6 text-center hover:from-primary hover:to-primary/90 transition-all duration-300 group shadow-xl shadow-primary/30"
              >
                <p className="font-heading text-xs text-white/90 uppercase tracking-widest mb-4 font-semibold">Yearly Savings</p>
                <motion.p
                  key={savings.yearly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-3xl lg:text-4xl text-white font-bold"
                >
                  ${savings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE WORKFLOWS SECTION */}
      <section id="example-workflows" className="w-full bg-background py-24 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4 font-bold">
              Example Workflows
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl leading-relaxed">
              Real processes we've optimized. See if any match your workflow.
            </p>
          </motion.div>

          <div className="min-h-[200px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-accent-grey/30 h-40 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {processExamples.map((process, index) => (
                  <CompactProcessCard key={process._id} process={process} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary text-sm">No workflow examples available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="w-full bg-gradient-to-b from-background to-accent-grey/5 py-32 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 min-h-[600px]">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8 font-bold leading-tight">
                Let's Get <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Started.</span>
              </h2>
              <p className="font-paragraph text-lg text-secondary/90 mb-12 max-w-md leading-relaxed">
                Have a question or want to request a customized package? Fill out the form and I'll get back to you within 24 hours.
              </p>
              
              <div className="hidden lg:block relative w-full aspect-square overflow-hidden mt-12 rounded-2xl">
                 <Image 
                   src="https://static.wixstatic.com/media/2b1878_aec3db263b214735bf34a51a3804f816~mv2.png?originWidth=576&originHeight=576"
                   alt="Minimalist desk setup"
                   className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                 />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="font-heading text-sm uppercase tracking-widest text-foreground font-semibold">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="border-0 border-b-2 border-accent-grey/50 rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors placeholder:text-foreground/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-heading text-sm uppercase tracking-widest text-foreground font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="border-0 border-b-2 border-accent-grey/50 rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors placeholder:text-foreground/30"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="font-heading text-sm uppercase tracking-widest text-foreground font-semibold">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="border-0 border-b-2 border-accent-grey/50 rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors placeholder:text-foreground/30"
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="font-heading text-sm uppercase tracking-widest text-foreground font-semibold">Workflow Challenge *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="border-0 border-b-2 border-accent-grey/50 rounded-none px-0 py-3 text-lg focus-visible:ring-0 focus-visible:border-primary bg-transparent resize-none transition-colors placeholder:text-foreground/30"
                    placeholder="Tell me about what's slowing you down..."
                  />
                </div>

                <div className="pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-12 py-4 h-auto rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg"
                  >
                    Thank you! I'll be in touch within 24 hours.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Ultra compact card component - minimal design
function CompactProcessCard({ process }: { process: ProcessExamples }) {
  return (
    <div className="bg-gradient-to-br from-background to-background/95 border border-foreground/10 hover:border-primary/40 p-5 group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between min-h-fit rounded-xl overflow-hidden relative">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/10 transition-colors duration-300"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {process.processName}
          </h3>
          <Plus className="w-4 h-4 text-accent-grey group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <p className="font-paragraph text-xs text-secondary/80 leading-relaxed line-clamp-2">
          {process.processDescription}
        </p>
      </div>

      {process.commonPainPoint && (
        <div className="pt-3 mt-3 border-t border-accent-grey/30 bg-primary/5 -mx-5 px-5 py-3 relative z-10">
          <p className="font-paragraph text-xs text-foreground/80 font-medium">
            <span className="text-primary font-bold">Pain:</span> {process.commonPainPoint}
          </p>
        </div>
      )}
    </div>
  );
}
