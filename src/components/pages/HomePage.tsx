// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Clock, FileText, Zap, CheckCircle, ArrowDown, Plus } from 'lucide-react';
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
  const [hourlyRate, setHourlyRate] = useState<string>('50');
  const [hoursPerWeek, setHoursPerWeek] = useState<number[]>([5]);
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [service, setService] = useState<Services | null>(null);
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
      const [processResult, serviceResult] = await Promise.all([
        BaseCrudService.getAll<ProcessExamples>('processexamples'),
        BaseCrudService.getAll<Services>('services', [], { limit: 1 })
      ]);
      setProcessExamples(processResult.items);
      if (serviceResult.items.length > 0) {
        setService(serviceResult.items[0]);
      }
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
                className="mt-12"
              >
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 font-heading text-lg px-10 py-8 h-auto rounded-none"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started <ArrowRight className="ml-3 h-5 w-5" />
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

      {/* VISUAL BREATHER - PARALLAX IMAGE */}
      <section className="w-full h-[80vh] relative overflow-clip">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/2b1878_0726156ee3d44c5bb7c073bf256684f7~mv2.png?originWidth=1280&originHeight=704" 
          alt="Abstract representation of workflow clarity"
        />
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 z-20">
           <h2 className="text-white font-heading text-4xl md:text-5xl tracking-tight">
             Clarity in Motion.
           </h2>
        </div>
      </section>

      {/* HOW IT WORKS - STICKY SCROLL */}
      <section className="w-full bg-background py-32 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Title */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <span className="block font-heading text-sm tracking-widest uppercase text-secondary mb-4">
                  The Process
                </span>
                <h2 className="font-heading text-5xl md:text-6xl text-foreground leading-none mb-8">
                  3 Steps to <br />
                  <span className="text-primary">Zero Friction</span>
                </h2>
                <p className="font-paragraph text-lg text-secondary max-w-xs">
                  Don't overthink it. Just show me how you do it, and I'll handle the rest.
                </p>
              </div>
            </div>

            {/* Scrolling Steps */}
            <div className="lg:col-span-8 space-y-32 mt-16 lg:mt-0">
              <StepCard 
                number="01" 
                title="Record" 
                description="Use Loom (or any tool) to record your screen while you perform a repetitive task. Don't overthink it—just show me how you do it."
                icon={<Clock className="w-12 h-12 text-primary" />}
              />
              <StepCard 
                number="02" 
                title="Submit" 
                description="Upload your video and hit 'Optimize.' Share your current tech stack so I can work within your existing ecosystem."
                icon={<FileText className="w-12 h-12 text-primary" />}
              />
              <StepCard 
                number="03" 
                title="Implement" 
                description="Within 48 hours, you receive a Friction Report with 3 bottlenecks identified and 5 immediate steps to automate or simplify that specific task."
                icon={<Zap className="w-12 h-12 text-primary" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CONTAINER - THE "BUY" BOX */}
      <section className="w-full bg-accent-grey/10 py-32 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-background border border-foreground/10 p-8 md:p-16 lg:p-20 shadow-2xl shadow-black/5 relative overflow-hidden"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-heading uppercase tracking-widest mb-6">
                    The Product
                  </div>
                  
                  {isLoadingData ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-10 bg-accent-grey w-3/4"></div>
                      <div className="h-6 bg-accent-grey w-1/2"></div>
                    </div>
                  ) : service ? (
                    <>
                      <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                        {service.itemName}
                      </h2>
                      <p className="font-paragraph text-xl text-secondary mb-8">
                        One Workflow. One Report. Zero Fluff.
                      </p>
                      <div className="space-y-4 mb-8">
                        {service.serviceInclusions?.split('\n').map((item, index) => (
                          <div key={index} className="flex items-start group">
                            <CheckCircle className="w-5 h-5 text-primary mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="font-paragraph text-base text-foreground/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                        The Single Process Audit
                      </h2>
                      <p className="font-paragraph text-xl text-secondary mb-8">
                        One Workflow. One Report. Zero Fluff.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-accent-grey pt-12 lg:pt-0 lg:pl-12">
                  <div className="mb-2">
                    <span className="font-heading text-6xl md:text-7xl text-foreground tracking-tighter">
                      ${service?.itemPrice || 199}
                    </span>
                  </div>
                  <p className="font-paragraph text-sm text-secondary uppercase tracking-widest mb-8">
                    Introductory Rate
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg py-8 h-auto rounded-none transition-all hover:translate-y-[-2px]"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Optimize My Workflow
                  </Button>
                  <p className="mt-6 text-xs text-secondary/60 max-w-xs mx-auto">
                    100% Money-back guarantee if no efficiency gains are found.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR - INTERACTIVE */}
      <section className="w-full bg-foreground text-background py-20 overflow-hidden relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="mb-12">
            <h2 className="font-heading text-4xl md:text-5xl mb-3 text-white">
              The Cost of <span className="text-secondary">Inaction</span>
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-2xl">
              See how much time and money you could save by optimizing just one workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Input Controls - Compact */}
            <div className="lg:col-span-1 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="font-heading text-xs text-white/80 uppercase tracking-widest block">
                  Hourly Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">$</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="bg-white/5 border-white/20 text-white text-base h-11 pl-7 focus:border-primary rounded-none transition-colors"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="hoursPerWeek" className="font-heading text-xs text-white/80 uppercase tracking-widest">
                    Hours/Week Spent on Messy Workflows
                  </Label>
                  <span className="font-heading text-xl text-primary">{hoursPerWeek[0]}h</span>
                </div>
                <Slider
                  id="hoursPerWeek"
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  max={20}
                  min={1}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-secondary/70">
                  <span>1h</span>
                  <span>20h</span>
                </div>
              </div>
            </div>

            {/* Results Grid - 3 Cards */}
            <div className="lg:col-span-2 grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 p-5 text-center">
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-2">Weekly</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-2xl md:text-3xl text-white"
                >
                  ${savings.weekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 text-center">
                <p className="font-heading text-xs text-white/60 uppercase tracking-widest mb-2">Monthly</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-heading text-2xl md:text-3xl text-white"
                >
                  ${savings.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </div>
              <div className="bg-primary border border-primary p-5 text-center">
                <p className="font-heading text-xs text-white/80 uppercase tracking-widest mb-2">Yearly</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-heading text-2xl md:text-3xl text-white"
                >
                  ${savings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY TO ANYTHING - PROCESS EXAMPLES */}
      <section id="processes" className="w-full bg-background py-32 border-b border-accent-grey">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
              Apply to Anything
            </h2>
            <p className="font-paragraph text-2xl text-secondary">
              "If it's a repetitive process, I can fix it."
            </p>
          </div>

          <div className="min-h-[400px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-accent-grey border border-accent-grey">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-background h-64 animate-pulse"></div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-accent-grey border border-accent-grey">
                {processExamples.map((process, index) => (
                  <ProcessCard key={process._id} process={process} index={index} />
                ))}
              </div>
            ) : (
               <div className="text-center py-20">
                 <p className="text-secondary">No process examples loaded.</p>
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

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function ParallaxImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden relative">
      <motion.div style={{ y }} className="w-full h-[140%] absolute top-[-20%] left-0">
        <Image 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function StepCard({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
      <div className="relative">
        <div className="w-24 h-24 border border-accent-grey flex items-center justify-center bg-background relative z-10 group-hover:border-primary transition-colors duration-500">
          {icon}
        </div>
        <div className="absolute -top-4 -left-4 font-heading text-6xl text-accent-grey/50 -z-0 select-none">
          {number}
        </div>
      </div>
      <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <h3 className="font-heading text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="font-paragraph text-lg text-secondary leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
}

function ROICard({ label, amount, delay, highlight = false }: { label: string, amount: number, delay: number, highlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center justify-between py-4">
      <span className={`font-heading text-lg md:text-xl ${highlight ? 'text-white' : 'text-white/60'}`}>
        {label}
      </span>
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className={`font-heading text-4xl md:text-6xl ${highlight ? 'text-primary' : 'text-white'}`}
      >
        ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </motion.span>
    </div>
  );
}

function ProcessCard({ process, index }: { process: ProcessExamples, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <div 
      ref={ref}
      className={`bg-background p-12 group hover:bg-accent-grey/5 transition-colors duration-300 flex flex-col justify-between min-h-[320px] ${isInView ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transition-colors">
            {process.processName}
          </h3>
          <Plus className="w-6 h-6 text-accent-grey group-hover:text-primary group-hover:rotate-90 transition-all duration-300" />
        </div>
        <p className="font-paragraph text-base text-secondary mb-6 leading-relaxed">
          {process.processDescription}
        </p>
      </div>
      
      {process.commonPainPoint && (
        <div className="pt-6 border-t border-accent-grey/50">
          <p className="font-paragraph text-sm text-secondary/80 italic">
            <span className="font-bold not-italic text-foreground/80 mr-2">Pain Point:</span> 
            {process.commonPainPoint}
          </p>
        </div>
      )}
    </div>
  );
}
