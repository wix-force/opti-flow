// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
  // ---------------------------------------------------------------------------
  // DATA FIDELITY PROTOCOL & STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  const [hourlyRate, setHourlyRate] = useState<string>('100');
  const [hoursPerWeek, setHoursPerWeek] = useState<number[]>([5]);
  const [service, setService] = useState<Services | null>(null);
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
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
      const serviceResult = await BaseCrudService.getAll<Services>('services', [], { limit: 1 });
      if (serviceResult.items.length > 0) {
        setService(serviceResult.items[0]);
      }
      
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
  // ANIMATION HOOKS & REFS
  // ---------------------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white overflow-clip">
      <Header />

      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-20 border-b border-accent-grey">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter text-foreground mb-12">
                  Stop Losing <br />
                  <span className="text-primary">5 Hours a Week</span> <br />
                  to Messy Workflows.
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-3xl"
              >
                <div className="w-12 h-[1px] bg-foreground hidden md:block"></div>
                <p className="font-paragraph text-xl md:text-2xl text-secondary leading-relaxed">
                  Send me a 10-minute <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Loom</a> video of a task you want to speed up or eliminate. I'll send you the playbook to fix it.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                <Button 
                  size="sm" 
                  className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 font-heading px-6 py-4 h-auto rounded-none"
                  onClick={() => document.getElementById('example-workflows')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Show Me Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-background border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-heading px-6 py-4 h-auto rounded-none"
                  onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Show Me the ROI
                </Button>

                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-5 h-auto rounded-none md:ml-auto"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Go <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end opacity-60">
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <ArrowDown className="w-8 h-8 text-foreground" />
               </motion.div>
               <span className="font-heading text-sm tracking-widest uppercase mt-4 writing-mode-vertical lg:writing-mode-horizontal">
                 Scroll to Explore
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CONTAINER - OFFERINGS GRID */}
      <section className="w-full bg-accent-grey/10 py-20 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Single Process Audit Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-background border border-foreground/10 p-6 md:p-8 shadow-lg shadow-black/5 relative overflow-hidden flex flex-col"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

              <div className="flex-1">
                <div className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-heading uppercase tracking-widest mb-3">
                  Offering
                </div>
                
                {isLoadingData ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-8 bg-accent-grey w-3/4"></div>
                    <div className="h-4 bg-accent-grey w-1/2"></div>
                  </div>
                ) : service ? (
                  <>
                    <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
                      {service.itemName}
                    </h3>
                    <div className="space-y-2 mb-6">
                      {service.serviceInclusions?.split('\n').slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-start group">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="font-paragraph text-sm text-foreground/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
                      Single Process Audit
                    </h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-start group">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-paragraph text-sm text-foreground/80">Workflow analysis & audit</span>
                      </div>
                      <div className="flex items-start group">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-paragraph text-sm text-foreground/80">Root cause identification</span>
                      </div>
                      <div className="flex items-start group">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-paragraph text-sm text-foreground/80">5 actionable recommendations</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t border-accent-grey pt-4 mt-4">
                <div className="mb-3">
                  <span className="font-heading text-4xl md:text-5xl text-foreground tracking-tighter">
                    ${service?.itemPrice || 199}
                  </span>
                </div>
                <p className="font-paragraph text-xs text-secondary uppercase tracking-widest mb-4">
                  Introductory Rate
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-sm py-3 h-auto rounded-none transition-all hover:translate-y-[-2px]"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>

            {/* Placeholder for future offerings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="bg-background border border-foreground/10 border-dashed p-6 md:p-8 shadow-lg shadow-black/5 relative overflow-hidden flex flex-col items-center justify-center text-center opacity-50 hover:opacity-75 transition-opacity"
            >
              <Plus className="w-8 h-8 text-secondary mb-3" />
              <p className="font-heading text-sm text-secondary uppercase tracking-widest">
                Coming Soon
              </p>
            </motion.div>

            {/* Placeholder for future offerings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="bg-background border border-foreground/10 border-dashed p-6 md:p-8 shadow-lg shadow-black/5 relative overflow-hidden flex flex-col items-center justify-center text-center opacity-50 hover:opacity-75 transition-opacity"
            >
              <Plus className="w-8 h-8 text-secondary mb-3" />
              <p className="font-heading text-sm text-secondary uppercase tracking-widest">
                Coming Soon
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR - INTERACTIVE - MODERN SLEEK DESIGN */}
      <section id="roi-calculator" className="w-full bg-gradient-to-br from-foreground to-foreground/95 text-background py-16 overflow-hidden relative">
        {/* Sleek background with gradient overlay */}
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl mb-2 text-white">
              The Cost of <span className="text-primary font-bold\">Inaction</span>
            </h2>
            <p className="font-paragraph text-sm text-white/70 max-w-2xl">
              Adjust your hourly rate and hours spent on messy workflows to see your potential savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Input Controls - Sleek & Compact */}
            <div className="lg:col-span-4 space-y-6">
              {/* Hourly Rate Input */}
              <div className="space-y-3">
                <Label htmlFor="hourlyRate" className="font-heading text-xs text-white/70 uppercase tracking-widest block font-semibold">
                  Hourly Rate
                </Label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg font-bold group-focus-within:text-primary transition-colors">$</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="bg-white/8 border border-white/15 text-white text-lg h-12 pl-10 pr-4 focus:border-primary focus:bg-white/12 rounded-lg transition-all duration-200 focus:ring-0 placeholder:text-white/30"
                    min="0"
                  />
                </div>
              </div>

              {/* Hours Per Week Slider */}
              <div className="space-y-3">
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
                  className="py-3"
                />
                <div className="flex justify-between text-xs text-white/50 font-medium">
                  <span>1h</span>
                  <span>20h</span>
                </div>
              </div>
            </div>

            {/* Results Grid - Compact & Sharp */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-3 lg:gap-4">
              {/* Weekly */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/8 border border-white/15 rounded-lg p-4 lg:p-5 text-center hover:bg-white/12 hover:border-white/25 transition-all duration-300 group"
              >
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-3 font-semibold group-hover:text-white/80 transition-colors">Weekly</p>
                <motion.p
                  key={savings.weekly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl lg:text-3xl text-white font-bold"
                >
                  ${savings.weekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>

              {/* Monthly */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white/8 border border-white/15 rounded-lg p-4 lg:p-5 text-center hover:bg-white/12 hover:border-white/25 transition-all duration-300 group"
              >
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-3 font-semibold group-hover:text-white/80 transition-colors">Monthly</p>
                <motion.p
                  key={savings.monthly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl lg:text-3xl text-white font-bold"
                >
                  ${savings.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>

              {/* Yearly - Highlighted */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-primary border border-primary/80 rounded-lg p-4 lg:p-5 text-center hover:bg-primary/90 transition-all duration-300 group shadow-lg shadow-primary/20"
              >
                <p className="font-heading text-xs text-white/90 uppercase tracking-widest mb-3 font-semibold">Yearly</p>
                <motion.p
                  key={savings.yearly}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl lg:text-3xl text-white font-bold"
                >
                  ${savings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* EXAMPLE WORKFLOWS SECTION */}
      <section id="example-workflows" className="w-full bg-background py-20 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
              Example Workflows
            </h2>
            <p className="font-paragraph text-2xl md:text-3xl text-foreground max-w-3xl font-bold leading-tight">
              Real processes we've optimized. See if any match your workflow.
            </p>
          </motion.div>

          <div className="min-h-[200px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-accent-grey/30 h-32 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
      <section id="contact" className="w-full bg-background py-32">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
                Let's Get <br />
                <span className="text-primary">Started.</span>
              </h2>
              <p className="font-paragraph text-xl text-secondary mb-12 max-w-md">
                Ready to optimize your workflow? Fill out the form and I'll get back to you within 24 hours.
              </p>
              
              <div className="hidden lg:block relative w-full aspect-square overflow-hidden mt-12">
                 <Image 
                   src="https://static.wixstatic.com/media/2b1878_aec3db263b214735bf34a51a3804f816~mv2.png?originWidth=576&originHeight=576"
                   alt="Minimalist desk setup"
                   className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                 />
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-heading text-sm uppercase tracking-widest text-foreground">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="border-0 border-b border-accent-grey rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-heading text-sm uppercase tracking-widest text-foreground">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="border-0 border-b border-accent-grey rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-heading text-sm uppercase tracking-widest text-foreground">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="border-0 border-b border-accent-grey rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary bg-transparent transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-heading text-sm uppercase tracking-widest text-foreground">The Workflow *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="border-0 border-b border-accent-grey rounded-none px-0 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary bg-transparent resize-none transition-colors"
                    placeholder="Tell me about the task that's slowing you down..."
                  />
                </div>

                <div className="pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-foreground text-background hover:bg-primary hover:text-white font-heading text-lg px-12 py-8 h-auto rounded-none transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </Button>
                </div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-800 border border-green-200"
                  >
                    Thank you! I'll be in touch within 24 hours.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Ultra compact card component - minimal design
function CompactProcessCard({ process, index }: { process: ProcessExamples, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white border border-accent-grey p-2.5 group hover:border-primary hover:bg-primary/2 transition-all duration-300 flex flex-col justify-between min-h-fit"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-heading text-lg font-bold text-dark-grey group-hover:text-primary transition-colors leading-tight">
            {process.processName}
          </h3>
          <Plus className="w-4 h-4 text-accent-grey group-hover:text-primary group-hover:rotate-90 transition-all duration-300 flex-shrink-0 mt-0.5" />
        </div>
        <p className="font-paragraph text-xs text-secondary leading-snug line-clamp-2">
          {process.processDescription}
        </p>
      </div>

      {process.commonPainPoint && (
        <div className="pt-1.5 mt-1.5 border-t border-accent-grey/50 bg-primary/5 -mx-2.5 px-2.5 py-1.5">
          <p className="font-paragraph text-xs text-foreground font-semibold">
            <span className="text-primary font-bold">Pain:</span> {process.commonPainPoint}
          </p>
        </div>
      )}
    </motion.div>
  );
}
