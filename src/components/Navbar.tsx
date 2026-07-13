import { useState, useEffect } from 'react';
import { getKolkataStatus, GymStatus } from '../utils/time';
import { GYM_CONTACT } from '../data';
import { Phone, Menu, X, Dumbbell, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [gymStatus, setGymStatus] = useState<GymStatus>(getKolkataStatus());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Update live status every 30 seconds
    const interval = setInterval(() => {
      setGymStatus(getKolkataStatus());
    }, 30000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Amenities', href: '#amenities' },
    { name: 'Services', href: '#services' },
    { name: 'Classes', href: '#classes' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Hours & Location', href: '#location' },
  ];

  return (
    <header 
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 shadow-lg py-3' 
          : 'bg-gradient-to-b from-zinc-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="p-2 bg-brand rounded-lg text-zinc-950 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight uppercase italic text-zinc-100">
              FITNESS<span className="text-brand">TRACK</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-zinc-400 hover:text-brand font-medium text-sm transition-colors duration-200 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Live Status and CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Status Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${gymStatus.badgeColor}`}>
              <Clock className="h-3.5 w-3.5" />
              <span>{gymStatus.message}</span>
            </div>

            {/* Direct Phone Call */}
            <a 
              href={`tel:${GYM_CONTACT.phone}`} 
              className="flex items-center gap-1.5 text-zinc-300 hover:text-brand font-mono text-sm transition-colors duration-200"
            >
              <Phone className="h-4 w-4 text-brand" />
              <span>{GYM_CONTACT.phone}</span>
            </a>

            {/* Join Button */}
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-brand text-zinc-950 font-display font-bold text-sm tracking-wide rounded-lg uppercase hover:bg-brand-hover transition-colors duration-200"
            >
              Book Free Trial
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Minimal Status Indicator */}
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${gymStatus.badgeColor}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${gymStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{gymStatus.isOpen ? 'Open' : 'Closed'}</span>
            </div>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Timing bar */}
              <div className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-medium justify-center ${gymStatus.badgeColor}`}>
                <Clock className="h-4 w-4" />
                <span>{gymStatus.message}</span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-lg text-zinc-300 hover:bg-zinc-900 hover:text-brand font-semibold text-base uppercase tracking-wide transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
                {/* Contact phone */}
                <a
                  href={`tel:${GYM_CONTACT.phone}`}
                  className="flex items-center justify-center gap-2 p-3 bg-zinc-900 text-zinc-200 rounded-lg hover:text-brand transition-colors font-mono font-semibold"
                >
                  <Phone className="h-5 w-5 text-brand" />
                  <span>Call: {GYM_CONTACT.phone}</span>
                </a>

                {/* Free trial */}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 bg-brand text-zinc-950 rounded-lg font-display font-bold text-base uppercase tracking-wider block hover:bg-brand-hover transition-colors"
                >
                  Book Free Trial
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
