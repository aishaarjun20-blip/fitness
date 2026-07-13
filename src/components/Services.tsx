import React, { useState } from 'react';
import { GYM_SERVICES } from '../data';
import { GymService } from '../types';
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  Music, 
  Users, 
  Sparkles, 
  Apple, 
  TrendingUp, 
  Target, 
  Bike, 
  Timer, 
  Search, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Dynamic icon mapper helper
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Activity': return <Activity className="h-5 w-5" />;
    case 'Flame': return <Flame className="h-5 w-5" />;
    case 'Dumbbell': return <Dumbbell className="h-5 w-5" />;
    case 'Music': return <Music className="h-5 w-5" />;
    case 'Users': return <Users className="h-5 w-5" />;
    case 'Sparkles': return <Sparkles className="h-5 w-5" />;
    case 'Apple': return <Apple className="h-5 w-5" />;
    case 'TrendingUp': return <TrendingUp className="h-5 w-5" />;
    case 'Target': return <Target className="h-5 w-5" />;
    case 'Bike': return <Bike className="h-5 w-5" />;
    case 'Timer': return <Timer className="h-5 w-5" />;
    default: return <Dumbbell className="h-5 w-5" />;
  }
};

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case 'Low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Medium': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'High': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Extreme': return 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse';
    default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
  }
};

interface ServicesProps {
  onServiceSelect?: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Strength', 'Cardio & Dance', 'Wellness & Core', 'Specialized'];

  // Filter & Search logic
  const filteredServices = GYM_SERVICES.filter((service) => {
    const categoryMatch = selectedCategory === 'All' || service.category === selectedCategory;
    const searchMatch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section id="services" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            <Zap className="h-3.5 w-3.5 animate-pulse" />
            FITNESS TRACK SPECIALITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
            OUR PREMIUM <span className="text-brand text-shadow-glow">SERVICES</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            From fat-burning high intensity cardio to powerlifting and holistic core rehab, explore our comprehensive range of specialized training and consulting programs.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-zinc-900">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === category
                    ? 'bg-brand text-zinc-950 border-brand'
                    : 'bg-zinc-900/40 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Elegant Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search services (e.g. kickboxing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-850 focus:border-brand/50 text-zinc-100 placeholder-zinc-500 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none transition-all duration-300 font-medium"
            />
          </div>

        </div>

        {/* Services Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="bg-zinc-900/35 border border-zinc-900 hover:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between group hover:shadow-lg hover:shadow-brand/2 transition-all duration-300 relative"
                >
                  {/* Decorative corner flash */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-brand/10 to-transparent rounded-tr-2xl group-hover:from-brand/20 transition-all duration-300" />

                  <div>
                    {/* Topline: Category Icon and Intensity Badge */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-brand group-hover:scale-110 transition-transform duration-300">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-widest ${getIntensityColor(service.intensity)}`}>
                        {service.intensity} Intensity
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100 group-hover:text-brand transition-colors duration-250">
                      {service.title}
                    </h3>

                    {/* Sub-Category Label */}
                    <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block mt-1 mb-3">
                      {service.category}
                    </span>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Footnote: Certified Assurance */}
                  <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                      <span>Certified Training Included</span>
                    </span>
                    <a 
                      href="#contact" 
                      onClick={() => {
                        if (onServiceSelect) {
                          onServiceSelect(`${service.title} Program`);
                        }
                      }}
                      className="text-xs font-bold text-zinc-400 hover:text-brand transition-colors uppercase font-display"
                    >
                      Enquire →
                    </a>
                  </div>

                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-zinc-500 text-sm font-mono border border-dashed border-zinc-850 rounded-2xl bg-zinc-950/20">
                NO SERVICES FOUND MATCHING YOUR CRITERIA.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick CTA banner */}
        <div className="mt-12 bg-zinc-900/50 border border-zinc-900 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-extrabold text-zinc-200 uppercase">
              Looking for a custom hybrid program?
            </h4>
            <p className="text-xs text-zinc-500 max-w-lg">
              Combine spinning classes, nutrition consulting, and pilates to tailor-make your own personalized fitness track body transformation program.
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => {
              if (onServiceSelect) {
                onServiceSelect("Custom Hybrid Routine");
              }
            }}
            className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-brand border border-brand/20 hover:border-brand/50 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Design My Routine
          </a>
        </div>

      </div>
    </section>
  );
}
