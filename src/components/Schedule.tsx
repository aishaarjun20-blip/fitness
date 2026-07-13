import { useState } from 'react';
import { WEEKLY_SCHEDULE, TRAINERS } from '../data';
import { Calendar, User, Compass, Zap, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Schedule() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDayType, setSelectedDayType] = useState<'weekdays' | 'sunday'>('weekdays');

  const categories = ['All', 'Cardio', 'Strength', 'HIIT', 'Yoga & Flex'];

  // Filter schedules based on category and day type
  const filteredSchedule = WEEKLY_SCHEDULE.filter((item) => {
    // Category match
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    
    // On Sundays, only Yoga & Flex and basic morning HIIT is available (due to 6:30am - 1pm timing)
    if (selectedDayType === 'sunday') {
      return categoryMatch && (item.category === 'Yoga & Flex' || item.time.includes('AM'));
    }
    
    return categoryMatch;
  });

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Extreme':
        return 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <section id="classes" className="py-24 bg-zinc-900/40 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
              <Calendar className="h-3 w-3" />
              DYNAMIC WEEKLY SESSIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
              CLASS <span className="text-brand text-shadow-glow">TIMETABLE</span>
            </h2>
          </div>

          {/* Day Type Selector */}
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start">
            <button
              onClick={() => setSelectedDayType('weekdays')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedDayType === 'weekdays' 
                  ? 'bg-brand text-zinc-950 shadow-md' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Mon - Sat (Full Day)
            </button>
            <button
              onClick={() => setSelectedDayType('sunday')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedDayType === 'sunday' 
                  ? 'bg-brand text-zinc-950 shadow-md' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Sunday (6:30 AM - 1:00 PM)
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-900 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                selectedCategory === category
                  ? 'bg-zinc-800 text-brand border-brand/40 shadow-sm'
                  : 'bg-zinc-950/40 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between group hover:shadow-lg hover:shadow-brand/2 transition-all duration-300 relative"
                >
                  <div>
                    {/* Header: Category & Intensity */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono font-bold text-brand uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getIntensityBadge(item.intensity)}`}>
                        {item.intensity} Effort
                      </span>
                    </div>

                    {/* Class Title */}
                    <h3 className="text-xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100 group-hover:text-brand transition-colors duration-200">
                      {item.className}
                    </h3>

                    {/* Time details */}
                    <p className="text-zinc-400 text-sm font-semibold mt-2 flex items-center gap-2">
                      <Flame className="h-4 w-4 text-brand/80 shrink-0" />
                      <span>{item.time}</span>
                    </p>
                  </div>

                  {/* Footer details: Trainer & Room */}
                  <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Coach: <strong className="text-zinc-300 font-medium">{item.trainer}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Compass className="h-3.5 w-3.5 text-zinc-500" />
                      <span className="font-mono text-zinc-500 uppercase">{item.room}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-zinc-500 text-sm font-mono border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
                NO SCHEDULED CLASSES FOR THIS SELECTION. OPEN TRAINING ACTIVE.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Informative Note */}
        <div className="mt-8 flex items-start gap-3 bg-zinc-900/40 border border-zinc-900/80 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed">
          <Sparkles className="h-4 w-4 text-brand shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-200">Personal Trainer (PT) Hours:</strong> Dedicated one-on-one personal training sessions can be booked separately outside of the group timetable. PT slots are available throughout our operational hours: <strong className="text-brand">6:30 AM to 10:00 PM (Monday-Saturday)</strong> and <strong className="text-brand">6:30 AM to 1:00 PM (Sunday)</strong>.
          </div>
        </div>

      </div>
    </section>
  );
}
