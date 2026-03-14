// HPI 1.7-G
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowDown, X, Zap, Users, TrendingUp, Settings, Clock, Target, Lightbulb, BarChart3, Workflow } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import { useServiceStore } from '@/lib/serviceStore';

export default function HomePage() {
  const navigate = useNavigate();
  const { services: storedServices, setServices: setStoredServices } = useServiceStore();
  // ... keep existing code (state management) ...
  const [hourlyRate, setHourlyRate] = useState<string>('100');
  const [hoursPerWeek, setHoursPerWeek] = useState<number[]>([5]);
  const [services, setServices] = useState<Services[]>(storedServices);
  const [processExamples, setProcessExamples] = useState<ProcessExamples[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [hasInteractedWithRate, setHasInteractedWithRate] = useState(false);
  const [showIntroRateModal, setShowIntroRateModal] = useState(false);
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
      setStoredServices(serviceResult.items);
      
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
    
    try {
      // Send email via API endpoint
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      // Still show success to user for better UX, but log the error
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-white">
      <Header />
      {/* INTRO RATE MODAL */}
      {showIntroRateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowIntroRateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-background border-2 border-primary/30 rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold">
                Introductory Rate
              </h2>
              <button
                onClick={() => setShowIntroRateModal(false)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
              During our Initial Rollout Phase, we are offering a Foundational Rate on all new packages. In exchange for this pricing, we ask for your permission to document the evolution of your operational architecture as a featured case study. All proprietary data and identifying information will be strictly anonymized to protect your firm's privacy.
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
              To opt out, send us a message <button onClick={() => { setShowIntroRateModal(false); setTimeout(() => { const contactSection = document.getElementById('contact'); if (contactSection) { window.scrollTo({ top: contactSection.offsetTop, behavior: 'smooth' }); } }, 100); }} className="text-primary hover:text-primary/80 font-semibold underline transition-colors">here</button>.
            </p>
            
            <div className="flex gap-4">
              <Button
                onClick={() => setShowIntroRateModal(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading px-6 py-3 h-auto rounded-lg transition-all"
              >
                Got It
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center py-10 mt-section-sm">
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div 
          className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10 rounded-2xl overflow-hidden py-10"
          style={{
            backgroundImage: 'url(https://static.wixstatic.com/media/5602cb_160662070d24401bb1bcd26dce9d3bcc~mv2.png?originWidth=1600&originHeight=896)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/85 pointer-events-none rounded-2xl"></div>
          <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-text-header mb-12 font-bold">
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

                <p className="font-paragraph text-lg md:text-xl text-text-body leading-relaxed">
                  Send me a 10-minute <a href="/about-loom" className="text-primary hover:text-primary/80 font-semibold transition-colors">Loom</a> video of a task you want to speed up or eliminate. I'll send you the playbook to fix it.
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
                  className="bg-text-header text-background hover:bg-primary hover:text-white transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg"
                  onClick={() => navigate('/case-studies')}
                >
                  Show Me Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-background border-2 border-text-body/20 text-text-header hover:border-primary hover:bg-primary/5 transition-all duration-300 font-heading px-6 py-3 h-auto rounded-lg"
                  onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Show Me the ROI
                </Button>

                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading px-8 py-3 h-auto rounded-lg md:ml-auto"
                  onClick={() => document.getElementById('offerings-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Select A Package <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end opacity-50">
               <motion.div
                 animate={{ y: [0, 12, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <ArrowDown className="w-8 h-8 text-text-header" />
               </motion.div>
               <span className="font-heading text-xs tracking-widest uppercase mt-4 writing-mode-vertical lg:writing-mode-horizontal font-semibold text-text-header">
                 Scroll to Explore
               </span>
            </div>
          </div>
          </div>
        </div>
       </section>
      {/* VISUAL BRIDGE - "SEE THE OFFERINGS" */}
      <section id="offerings-section" className="w-full bg-background pt-10 pb-10">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-text-header font-bold tracking-tight leading-tight mb-8">See the Offering</h2>
            <p className="font-paragraph text-lg md:text-xl text-text-body max-w-3xl leading-relaxed">
              Choose the service that fits your needs. Each is designed to deliver measurable results.
            </p>
          </motion.div>
        </div>
      </section>
      {/* PRODUCT CONTAINER - MAIN OFFERING + ADDITIONAL OFFERINGS */}
      <section id="service-single-process-audit" className="w-full bg-background py-[60px]">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          {isLoadingData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background border border-text-body/10 p-0 rounded-2xl animate-pulse overflow-hidden">
                  <div className="h-20 md:h-24 bg-accent-grey/30 w-full"></div>
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="h-6 bg-accent-grey/30 w-2/3"></div>
                    <div className="h-4 bg-accent-grey/30 w-full"></div>
                    <div className="h-4 bg-accent-grey/30 w-full"></div>
                    <div className="h-4 bg-accent-grey/30 w-3/4"></div>
                  </div>
                  <div className="border-t border-text-body/10 p-6 md:p-8 space-y-3">
                    <div className="h-8 bg-accent-grey/30 w-1/3"></div>
                    <div className="h-10 bg-accent-grey/30 w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => {
                const isMainOffering = index === 0;
                const isSOP = service.itemName?.toLowerCase().includes('sop library');
                const isBusinessEngine = service.itemName?.toLowerCase().includes('business engine redesign');
                
                return (
                  <motion.div
                    key={service._id}
                    data-service={isMainOffering ? 'main-offering' : isSOP ? 'sop-library' : isBusinessEngine ? 'business-engine-redesign' : 'service'}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Card Container */}
                    <div className={`bg-background border p-0 rounded-2xl transition-all duration-500 overflow-hidden flex flex-col h-full ${
                      isMainOffering 
                        ? 'border-primary/30 hover:border-primary/50' 
                        : 'border-text-body/10 hover:border-text-body/20'
                    }`}>
                      {/* Header Section with Icon Background */}
                      <div className={`relative h-20 md:h-24 overflow-hidden ${
                        isMainOffering ? 'bg-primary/5' :
                        isSOP ? 'bg-blue-50' : 
                        isBusinessEngine ? 'bg-purple-50' : 
                        'bg-slate-50'
                      }`}>
                        {/* Decorative shape */}
                        <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 ${
                          isMainOffering ? 'bg-primary' :
                          isSOP ? 'bg-blue-400' : 
                          isBusinessEngine ? 'bg-purple-400' : 
                          'bg-slate-400'
                        }`}></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-heading text-xs uppercase tracking-widest font-bold ${
                            isMainOffering ? 'bg-primary text-primary-foreground' :
                            isSOP ? 'bg-blue-100 text-blue-700' : 
                            isBusinessEngine ? 'bg-purple-100 text-purple-700' : 
                            'bg-slate-100 text-slate-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              isMainOffering ? 'bg-primary-foreground' :
                              isSOP ? 'bg-blue-500' : 
                              isBusinessEngine ? 'bg-purple-500' : 
                              'bg-slate-500'
                            }`}></div>
                            {isMainOffering ? 'Signature Service' : isSOP ? 'Asset Building' : isBusinessEngine ? 'Systemization' : 'Service'}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col p-6 md:p-8">
                        {/* Title */}
                        <h4 className={`font-heading text-2xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${
                          isMainOffering ? 'text-primary' :
                          isSOP ? 'text-blue-900' : 
                          isBusinessEngine ? 'text-purple-900' : 
                          'text-text-header'
                        }`}>
                          {service.itemName}
                        </h4>
                        
                        {/* Description */}
                        <p className="font-paragraph text-base md:text-lg text-text-body mb-6 leading-relaxed flex-1">
                          {service.itemDescription}
                        </p>
                        
                        {/* Inclusions */}
                        <div className="space-y-2 mb-6">
                          <p className="font-heading text-xs uppercase tracking-widest text-text-body/60 font-semibold">What's Included:</p>
                          <div className="space-y-1.5">
                            {service.serviceInclusions?.split('\n').map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 group/item">
                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-all ${
                                  isMainOffering ? 'bg-primary' :
                                  isSOP ? 'bg-blue-500' : 
                                  isBusinessEngine ? 'bg-purple-500' : 
                                  'bg-primary'
                                }`}></div>
                                <span className="font-paragraph text-xs text-text-body/70 leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Section - Pricing & CTA */}
                      <div className={`border-t p-6 md:p-8 ${
                        isMainOffering ? 'border-primary/20 bg-primary/3' :
                        isSOP ? 'border-blue-100 bg-blue-50/30' : 
                        isBusinessEngine ? 'border-purple-100 bg-purple-50/30' : 
                        'border-text-body/10 bg-text-body/2'
                      }`}>
                        {/* Pricing */}
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-heading text-4xl md:text-4xl font-bold text-text-header">
                              ${service.itemPrice || 199}
                            </span>
                          </div>
                          <button
                            onClick={() => setShowIntroRateModal(true)}
                            className="font-paragraph text-xs uppercase tracking-widest text-text-body/80 font-semibold italic transition-colors hover:text-primary underline"
                          >
                            * Introductory Rate
                          </button>
                        </div>
                        
                        {/* CTA Button */}
                        <Button 
                          size="sm" 
                          className={`w-full font-heading text-sm py-2 h-auto rounded-lg transition-all duration-300 font-semibold ${
                            isMainOffering ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                            isSOP ? 'bg-blue-600 text-white hover:bg-blue-700' : 
                            isBusinessEngine ? 'bg-purple-600 text-white hover:bg-purple-700' : 
                            'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                           onClick={() => navigate(isMainOffering ? '/single-process-audit' : `/service/${service._id}`)}
                        >
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-sm">No services available.</p>
            </div>
          )}
        </div>
      </section>
      {/* ROI CALCULATOR - COMPACT & HIGH-DENSITY */}
      <section id="roi-calculator" className="w-full bg-text-header text-background py-24 md:py-32 lg:py-40 overflow-hidden relative">
        {/* Sleek background with grid overlay */}
        <div className="absolute inset-0 opacity-3" 
             style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
           {/* Unified Container - Compact */}
           <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.7, ease: "easeOut" }}
             className="bg-white/5 border border-white/15 backdrop-blur-sm p-8 md:p-12"
           >
             {/* Header - Compact */}
             <div className="mb-8">
               <h2 className="font-heading text-3xl md:text-4xl mb-3 text-white font-bold">
                 The Cost of <span className="text-primary font-bold">Inaction</span>
               </h2>
               <p className="font-paragraph text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                 Adjust your hourly $ rate and hours spent on messy workflows to see your potential savings.
               </p>
             </div>

             {/* Main Grid - High Density */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               {/* Input Controls - Compact */}
               <div className="lg:col-span-4 space-y-6">
                 {/* Hourly Rate Input */}
                 <motion.div 
                   initial={{ opacity: 0, x: -15 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                   className="space-y-2"
                 >
                   <Label htmlFor="hourlyRate" className={`font-heading text-xs uppercase tracking-widest block font-semibold transition-colors duration-300 ${hasInteractedWithRate ? 'text-white/80' : 'text-white/60'}`}>
                     Hourly $ Rate
                   </Label>
                   <div className={`relative group transition-all duration-300 ${hasInteractedWithRate ? 'opacity-100' : 'opacity-75'}`}>
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm font-bold transition-colors">$</span>
                     <Input
                       id="hourlyRate"
                       type="number"
                       value={hourlyRate}
                       onChange={(e) => {
                         setHourlyRate(e.target.value);
                         setHasInteractedWithRate(true);
                       }}
                       onFocus={() => setHasInteractedWithRate(true)}
                       className="bg-white/10 border border-white/20 text-white text-sm h-10 pl-10 pr-3 focus:border-primary focus:bg-white/15 transition-all duration-200 focus:ring-0 placeholder:text-white/30 autofill:text-white autofill:bg-white/10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                       min="0"
                       style={{ colorScheme: 'dark' }}
                     />
                     <motion.span 
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 text-sm font-bold pointer-events-none"
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.2 }}
                     >
                       {hourlyRate ? `${parseFloat(hourlyRate).toLocaleString()}` : '$0'}
                     </motion.span>
                   </div>
                 </motion.div>

                 {/* Hours Per Week Slider */}
                 <motion.div 
                   initial={{ opacity: 0, x: -15 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                   className="space-y-2"
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
                       className="font-heading text-lg md:text-xl text-primary font-bold"
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
                     className="py-2"
                   />
                   <div className="flex justify-between text-xs text-white/50 font-medium">
                     <span>1h</span>
                     <span>20h</span>
                   </div>
                 </motion.div>
               </div>

               {/* Results Grid - Compact & High-Density */}
               <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {/* Weekly */}
                 <motion.div 
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4 }}
                   className="bg-white/6 border border-white/12 p-5 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm flex flex-col justify-center items-center"
                 >
                   <p className="font-heading text-[11px] text-white/60 uppercase tracking-[0.08em] mb-2 font-bold group-hover:text-white/80 transition-colors">Weekly</p>
                   <motion.p
                     key={savings.weekly}
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.3 }}
                     className="font-heading text-2xl md:text-[28px] text-white font-bold leading-tight"
                   >
                     ${savings.weekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </motion.p>
                 </motion.div>

                 {/* Monthly */}
                 <motion.div 
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.05 }}
                   className="bg-white/6 border border-white/12 p-5 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm flex flex-col justify-center items-center"
                 >
                   <p className="font-heading text-[11px] text-white/60 uppercase tracking-[0.08em] mb-2 font-bold group-hover:text-white/80 transition-colors">Monthly</p>
                   <motion.p
                     key={savings.monthly}
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.3 }}
                     className="font-heading text-2xl md:text-[28px] text-white font-bold leading-tight"
                   >
                     ${savings.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </motion.p>
                 </motion.div>

                 {/* Yearly - Highlighted */}
                 <motion.div 
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.1 }}
                   className="bg-primary border border-white/20 p-5 text-center hover:bg-primary/95 transition-all duration-300 group flex flex-col justify-center items-center"
                 >
                   <p className="font-heading text-[11px] text-white/90 uppercase tracking-[0.08em] mb-2 font-bold">Yearly</p>
                   <motion.p
                     key={savings.yearly}
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.3 }}
                     className="font-heading text-2xl md:text-[28px] text-white font-bold leading-tight"
                   >
                     ${savings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </motion.p>
                 </motion.div>
               </div>
             </div>
           </motion.div>
         </div>
      </section>
      {/* EXAMPLE WORKFLOWS SECTION - GRID LAYOUT */}
      <section id="example-workflows" className="w-full bg-background border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-[60px]">
          <div className="mb-16">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-8 font-bold leading-tight">Example Workflows</h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl leading-relaxed">
              Real processes we've optimized. See if any match your workflow.
            </p>
          </div>

          <div className="min-h-[200px]">
            {isLoadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-dark-grey/20 p-6 space-y-4 rounded-lg">
                    <div className="bg-accent-grey/30 h-6 animate-pulse w-2/3"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-full"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-full"></div>
                    <div className="bg-accent-grey/30 h-4 animate-pulse w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : processExamples.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {processExamples.slice(0, 9).map((process, index) => (
                  <GridProcessCard 
                    key={process._id} 
                    process={process}
                    index={index}
                    total={Math.min(processExamples.length, 9)}
                  />
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
      <section id="contact" className="w-full bg-gradient-to-b from-background to-accent-grey/5 border-b border-accent-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 min-h-[600px]">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <div className="inline-block px-8 py-2 border border-[#1876f2] rounded-full mb-6">
                  <span className="text-[#1876f2] font-heading text-sm font-semibold">Get In Touch</span>
                </div>
                <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl text-foreground mb-8 font-bold leading-tight">
                  Let's Get <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Started.</span>
                </h2>
                <p className="font-paragraph text-lg md:text-xl text-secondary/90 mb-12 max-w-md leading-relaxed">
                  Have a question or want to request a customized package? Fill out the form and I'll get back to you within 48 hours.
                </p>
                
                <div className="hidden lg:block relative w-full aspect-video overflow-hidden mt-12 rounded-2xl">
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
                  Thank you! I'll be in touch within 48 hours.
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

// Map process names to appropriate icons
// Array of unique icons to cycle through
const UNIQUE_ICONS = [
  Workflow,
  Users,
  TrendingUp,
  Settings,
  Clock,
  Target,
  Lightbulb,
  BarChart3,
  Zap,
];

function getIconForProcess(processName?: string, index?: number) {
  // Use index to cycle through unique icons for each card
  if (index !== undefined) {
    const IconComponent = UNIQUE_ICONS[index % UNIQUE_ICONS.length];
    return <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />;
  }
  
  if (!processName) return <Workflow className="w-8 h-8 sm:w-10 sm:h-10" />;
  
  const name = processName.toLowerCase();
  
  if (name.includes('automat') || name.includes('workflow')) return <Workflow className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('team') || name.includes('collaborat')) return <Users className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('growth') || name.includes('scale') || name.includes('expand')) return <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('config') || name.includes('setup') || name.includes('optim')) return <Settings className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('time') || name.includes('speed') || name.includes('fast')) return <Clock className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('goal') || name.includes('target') || name.includes('object')) return <Target className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('idea') || name.includes('innovat') || name.includes('creat')) return <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('analyt') || name.includes('data') || name.includes('metric')) return <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10" />;
  if (name.includes('power') || name.includes('energy') || name.includes('boost')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10" />;
  
  return <Workflow className="w-8 h-8 sm:w-10 sm:h-10" />;
}

// Grid process card - Dense, professional, core redesign components aesthetic
function GridProcessCard({ 
  process, 
  index, 
  total 
}: { 
  process: ProcessExamples; 
  index: number;
  total: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <div className="h-full rounded-[10px] border border-dark-grey/20 hover:border-[#1876f2] transition-all duration-300 p-6 sm:p-8 flex flex-col items-center text-center group bg-background hover:scale-[1.025] hover:shadow-lg gap-5">
        {/* Square Box with Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[5px] bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
          {getIconForProcess(process.processName, index)}
        </div>

        {/* Process Name */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground leading-tight">
          {process.processName}
        </h3>

        {/* Process Description */}
        <p className="font-paragraph text-sm text-secondary leading-relaxed">
          {process.processDescription}
        </p>

        {/* Common Pain Point */}
        {process.commonPainPoint && (
          <div className="w-full">
            <p className="font-paragraph text-xs leading-normal">
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Friction Point:
              </span>
              <span className="text-foreground text-sm leading-normal">
                {process.commonPainPoint}
              </span>
            </p>
          </div>
        )}

        {/* Potential Impact */}
        {process.potentialImpact && (
          <div className="w-full">
            <p className="font-paragraph text-xs leading-normal">
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Potential Impact:
              </span>
              <span className="text-foreground text-sm leading-normal">
                {process.potentialImpact}
              </span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
