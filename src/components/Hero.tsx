import { Star, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONTACT } from '../data';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center bg-zinc-950 overflow-hidden pt-20"
    >
      {/* Background Image with Deep Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600" 
          alt="Premium Gym Training Arena" 
          className="w-full h-full object-cover object-center opacity-30 scale-105 filter saturate-[0.85] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        <div className="max-w-3xl">
          
          {/* Welcome Tagline / Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/95 border border-zinc-800 rounded-full mb-6 sm:mb-8 text-xs font-semibold text-brand tracking-widest uppercase"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
            KOLKATA'S PREMIER FITNESS HUB
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-zinc-100 uppercase italic leading-[0.95]"
          >
            NO SHORTCUTS.<br />
            JUST <span className="text-brand text-shadow-glow">RESULTS</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            Experience premium fitness training in Chinatown, Kolkata. From state-of-the-art Hammer Strength equipment to elite coaching, we provide everything you need to crush your athletic goals.
          </motion.p>

          {/* Location details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-zinc-300 bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl max-w-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-brand shrink-0" />
              <span className="font-medium">Near Kim Pou Restaurant, China Town</span>
            </div>
            <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-brand fill-brand shrink-0" />
              <a href="#reviews" className="hover:underline font-semibold text-zinc-100 flex items-center gap-1">
                4.8 Star <span className="text-zinc-400 font-normal">(89 Reviews)</span>
              </a>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-brand text-zinc-950 font-display font-extrabold tracking-wide uppercase rounded-xl hover:bg-brand-hover transition-all duration-200 text-center shadow-lg shadow-brand/10 hover:shadow-brand/20 hover:-translate-y-0.5"
            >
              View Memberships
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 font-display font-extrabold tracking-wide uppercase rounded-xl transition-all duration-200 text-center hover:-translate-y-0.5"
            >
              Book 1 Free Day Pass
            </a>
          </motion.div>

        </div>

        {/* Highlight Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 sm:mt-24 border-t border-zinc-900 pt-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4"
        >
          <div>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand uppercase tracking-tight">6:30 AM</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Mon-Sat Start Time</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-100 uppercase tracking-tight">10:00 PM</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Mon-Sat Close Time</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand uppercase tracking-tight">4.8 ★</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">89+ Verified Reviews</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-100 uppercase tracking-tight">KOL-46</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Chinatown Location</p>
          </div>
        </motion.div>

      </div>

      {/* Aesthetic bottom corner accent */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand/5 rounded-full filter blur-3xl -z-10" />
    </section>
  );
}
