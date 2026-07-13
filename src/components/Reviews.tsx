import React, { useState, useEffect } from 'react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, Plus, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Review inputs
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Initialize reviews from localStorage or fallback
  useEffect(() => {
    const saved = localStorage.getItem('fitnesstrack_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Compute aggregate ratings dynamically based on baseline
  // Baseline: 89 reviews with an average of 4.8
  const baseCount = 89;
  const baseRating = 4.8;
  const baseSumPoints = baseCount * baseRating; // 427.2

  // Number of custom added reviews beyond initial list
  const customAddedReviews = reviews.filter(
    r => !INITIAL_REVIEWS.some(init => init.id === r.id)
  );

  const totalReviewsCount = baseCount + customAddedReviews.length;
  
  // Sum of custom review scores
  const customSumPoints = customAddedReviews.reduce((sum, r) => sum + r.rating, 0);
  const computedAverage = (
    (baseSumPoints + customSumPoints) / 
    (baseCount + customAddedReviews.length)
  ).toFixed(1);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      isVerified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('fitnesstrack_reviews', JSON.stringify(updated));

    // Reset Form & show success
    setName('');
    setRating(5);
    setComment('');
    setSuccessMsg(true);
    setIsFormOpen(false);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="h-3 w-3" />
            MEMBER TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
            WHAT OUR <span className="text-brand text-shadow-glow">MEMBERS SAY</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Real feedback from athletes, beginners, and fitness enthusiasts training daily at Fitness Track Kolkata.
          </p>
        </div>

        {/* Aggregated Score Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          {/* Average Display */}
          <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-900 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">GOOGLE VERIFIED</span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl sm:text-7xl font-display font-black text-zinc-100">{computedAverage}</span>
              <span className="text-zinc-500 text-xl font-bold">/ 5.0</span>
            </div>
            
            {/* Stars */}
            <div className="flex gap-1 my-4">
              {[1, 2, 3, 4, 5].map((s) => {
                const numAvg = parseFloat(computedAverage);
                const isFull = s <= Math.floor(numAvg);
                return (
                  <Star 
                    key={s} 
                    className={`h-5 w-5 ${
                      isFull ? 'text-brand fill-brand' : 'text-zinc-800'
                    }`} 
                  />
                );
              })}
            </div>

            <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              {totalReviewsCount} Verified Reviews
            </p>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-brand text-zinc-950 rounded-lg font-display font-extrabold text-xs uppercase tracking-widest hover:bg-brand-hover transition-colors"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              Write A Review
            </button>
          </div>

          {/* Testimonial Cards Slider / List */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review) => (
                <div 
                  key={review.id} 
                  className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between relative group hover:border-zinc-800 transition-colors"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-brand fill-brand' : 'text-zinc-800'
                          }`} 
                        />
                      ))}
                    </div>

                    <p className="text-zinc-300 text-sm italic leading-relaxed mb-6">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-4 text-xs">
                    <div>
                      <h4 className="font-bold text-zinc-100">{review.name}</h4>
                      <span className="text-zinc-500 font-mono">{review.date}</span>
                    </div>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Verified Member
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Success Announcement Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-center flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <Check className="h-5 w-5 stroke-[2.5]" />
              Review posted successfully! Thank you for supporting Fitness Track Gym.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write a Review Modal Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 overflow-hidden mb-12"
            >
              <h3 className="text-lg font-display font-extrabold uppercase italic text-zinc-100 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                POST YOUR ANONYMOUS OR VERIFIED REVIEW
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Select Rating
                    </label>
                    <div className="flex items-center gap-3 h-11 bg-zinc-900 border border-zinc-800 rounded-xl px-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 text-zinc-400 hover:text-brand transition-colors focus:outline-none"
                        >
                          <Star className={`h-6 w-6 ${num <= rating ? 'text-brand fill-brand' : 'text-zinc-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                    Review Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the equipment, staff, facilities, and overall experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand text-zinc-950 rounded-xl font-display font-extrabold text-xs uppercase tracking-widest hover:bg-brand-hover transition-colors"
                  >
                    Post Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-6 py-3 bg-zinc-900 text-zinc-300 border border-zinc-850 rounded-xl font-display font-extrabold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
