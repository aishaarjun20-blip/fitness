import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Amenities from './components/Amenities';
import Services from './components/Services';
import Schedule from './components/Schedule';
import MembershipCalculator from './components/MembershipCalculator';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import InquiryHistory from './components/InquiryHistory';
import { GYM_CONTACT, GYM_TIMINGS } from './data';
import { Sparkles, CalendarCheck, HelpCircle, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [historyRefresh, setHistoryRefresh] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [bookingCount, setBookingCount] = useState<number>(0);

  // Load bookings count for floating badge
  const updateBookingCount = () => {
    try {
      const saved = localStorage.getItem('fitnesstrack_inquiries');
      if (saved) {
        setBookingCount(JSON.parse(saved).length);
      } else {
        setBookingCount(0);
      }
    } catch (e) {
      setBookingCount(0);
    }
  };

  useEffect(() => {
    updateBookingCount();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [historyRefresh]);

  const handlePlanSelection = (planSummary: string) => {
    setSelectedPlan(planSummary);
  };

  const handleInquirySubmitted = () => {
    setHistoryRefresh(prev => !prev);
    updateBookingCount();
    // Auto slide open the history drawer so the user gets instant visual confirmation!
    setIsHistoryOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-brand selection:text-zinc-950">
      
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Primary Sections */}
      <main className="flex-grow">
        
        {/* Hero Banner Section */}
        <Hero />

        {/* Dynamic Amenities Bento Grid */}
        <Amenities />

        {/* Premium Services Showcase */}
        <Services onServiceSelect={handlePlanSelection} />

        {/* Weekly Class Timetable & Schedule */}
        <Schedule />

        {/* Pricing & Interactive Customizer */}
        <MembershipCalculator onPlanSelected={handlePlanSelection} />

        {/* Testimonials & Verified Reviews */}
        <Reviews />

        {/* Location Hours, Interactive Map & Inquiry Booking Form */}
        <Contact 
          selectedPlan={selectedPlan} 
          onInquirySubmitted={handleInquirySubmitted} 
        />

      </main>

      {/* 3. Footer Section */}
      <footer className="bg-zinc-950 border-t border-zinc-900/80 py-16 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Brand details (Size 4) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase italic text-zinc-200">
                FITNESS<span className="text-brand">TRACK</span>
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              Premium fitness training arena located in Tangra, Chinatown, Kolkata. Experience heavy-duty bodybuilding gears, high-energy cardio coaches, and professional diet tracking.
            </p>
            <p className="text-[10px] text-zinc-600">
              © {new Date().getFullYear()} Fitness Track Kolkata. Built for absolute performance.
            </p>
          </div>

          {/* Col 2: Navigation Links (Size 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-extrabold text-sm text-zinc-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#amenities" className="hover:text-brand transition-colors">Gym Amenities</a></li>
              <li><a href="#services" className="hover:text-brand transition-colors">Premium Services</a></li>
              <li><a href="#classes" className="hover:text-brand transition-colors">Class Timetable</a></li>
              <li><a href="#pricing" className="hover:text-brand transition-colors">Membership Options</a></li>
              <li><a href="#reviews" className="hover:text-brand transition-colors font-medium">Member Reviews (4.8★)</a></li>
              <li><a href="#location" className="hover:text-brand transition-colors">Location & Timings</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Info (Size 4) */}
          <div className="md:col-span-4 space-y-4 text-zinc-400">
            <h4 className="font-display font-extrabold text-sm text-zinc-300 uppercase tracking-wider">
              Gym Locations
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="h-4.5 w-4.5 text-brand shrink-0 mt-0.5" />
                <span>61B, Matheswartala Road, near Kim Pou Restaurant, China Town, Kolkata, West Bengal 700046</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand shrink-0" />
                <a href="tel:09123349529" className="font-mono hover:underline">{GYM_CONTACT.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand shrink-0" />
                <span>{GYM_CONTACT.email}</span>
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* 4. Slide-over Persistent Inquiry History Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* Dark backing overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md shadow-2xl"
            >
              <InquiryHistory 
                triggerRefresh={historyRefresh} 
                onClosed={() => setIsHistoryOpen(false)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. Sticky Floating Interactive Panel Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Floating WhatsApp Action Button */}
        <a
          href="https://wa.me/919123349529?text=Hi%20Fitness%20Track%20Kolkata!%20I'm%20interested%20in%20learning%20more%20about%20your%20membership%20plans."
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-emerald-600 hover:bg-emerald-500 text-zinc-100 rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group relative border border-emerald-500/10"
          title="Chat with us on WhatsApp"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute right-16 bg-zinc-900 text-zinc-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg border border-zinc-800">
            Chat on WhatsApp
          </span>
        </a>

        {/* Bookings Drawer Access Trigger */}
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="relative p-4 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-full hover:text-brand hover:border-brand/40 shadow-xl transition-all duration-300 hover:scale-105"
          title="View My Bookings & Trial Status"
        >
          <CalendarCheck className="h-6 w-6" />
          {bookingCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1.5 bg-brand text-zinc-950 font-mono text-xs font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
              {bookingCount}
            </span>
          )}
        </button>

        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="p-4 bg-brand text-zinc-950 rounded-full hover:bg-brand-hover shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              title="Scroll back to Top"
            >
              <ArrowUp className="h-5 w-5 stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
