import { AMENITIES } from '../data';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="h-3 w-3" />
            WORLD-CLASS FACILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
            BUILT FOR <span className="text-brand text-shadow-glow">PERFORMANCE</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Our gym is divided into dedicated training zones, equipped with premier fitness machinery and luxury features to streamline your routine.
          </p>
        </div>

        {/* Amenities Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((amenity, idx) => {
            // First two amenities take larger space on desktop for dynamic bento look
            const isLarge = idx === 0 || idx === 1;
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/40 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between ${
                  isLarge ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Visual Cover */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={amenity.imageUrl} 
                    alt={amenity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                {/* Info Text */}
                <div className="p-6 relative flex-grow flex flex-col justify-between">
                  <div>
                    {/* Index badge */}
                    <span className="font-mono text-xs text-brand font-bold uppercase tracking-wider block mb-2">
                      ZONE_0{idx + 1}
                    </span>
                    <h3 className="text-xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100 mb-2">
                      {amenity.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>

                  {/* High quality specifications teaser */}
                  <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>BIO-HYGIENIC</span>
                    <span className="text-brand">● 100% ACCESS</span>
                  </div>
                </div>

                {/* Accent Hover Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
