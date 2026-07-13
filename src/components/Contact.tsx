import React, { useState, useEffect } from 'react';
import { GYM_CONTACT, GYM_TIMINGS } from '../data';
import { Inquiry } from '../types';
import { Phone, MapPin, Mail, Calendar, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ContactProps {
  selectedPlan: string;
  onInquirySubmitted: () => void;
}

export default function Contact({ selectedPlan, onInquirySubmitted }: ContactProps) {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [notes, setNotes] = useState('');

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInquiry, setSuccessInquiry] = useState<Inquiry | null>(null);

  // Sync selectedPlan prop with internal form state
  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(GYM_CONTACT.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(GYM_CONTACT.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);

    // Simulate database network delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: `inq-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        selectedPlan: plan || 'General Inquiry',
        additionalNotes: notes.trim(),
        submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
        status: 'Pending'
      };

      // Get previous
      const previous = localStorage.getItem('fitnesstrack_inquiries');
      const list: Inquiry[] = previous ? JSON.parse(previous) : [];
      list.unshift(newInquiry);
      
      localStorage.setItem('fitnesstrack_inquiries', JSON.stringify(list));

      // Build WhatsApp message content
      const waMessage = `*NEW INQUIRY - FITNESS TRACK KOLKATA*\n\n` +
        `👤 *Name:* ${newInquiry.fullName}\n` +
        `📞 *Phone:* ${newInquiry.phone}\n` +
        `✉️ *Email:* ${newInquiry.email}\n` +
        `📋 *Selected Option:* ${newInquiry.selectedPlan}\n` +
        `📝 *Fitness Notes:* ${newInquiry.additionalNotes || 'None'}\n` +
        `🆔 *Inquiry ID:* #${newInquiry.id}\n\n` +
        `Please confirm my spot! Thank you.`;

      const whatsappUrl = `https://wa.me/919123349529?text=${encodeURIComponent(waMessage)}`;

      // Reset form states
      setFullName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setPlan('');

      setIsSubmitting(false);
      setSuccessInquiry(newInquiry);
      
      // Notify parent component to update history
      onInquirySubmitted();

      // Attempt immediate open (fallback button handles iframe blocker)
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn("Popup block prevented auto-redirect to WhatsApp, displaying fallback button.", err);
      }
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div id="location" className="absolute -top-24" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin className="h-3 w-3" />
            VISIT & CONNECT
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
            GET IN <span className="text-brand text-shadow-glow">TOUCH</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Locate our premium gym facility in Tangra, Chinatown, Kolkata. Send an inquiry or claim your free 1-Day VIP Pass instantly.
          </p>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {successInquiry && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-zinc-900 border border-brand/20 p-6 sm:p-8 rounded-2xl max-w-md w-full relative"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex p-3 bg-brand/10 rounded-full text-brand mx-auto mb-2">
                    <Sparkles className="h-8 w-8 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-zinc-100 uppercase italic">
                    SESSION CONFIRMED!
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Thank you, <strong className="text-zinc-100">{successInquiry.fullName}</strong>. Your inquiry reference ID <span className="font-mono text-brand font-bold">#{successInquiry.id}</span> has been processed.
                  </p>
                  
                  <div className="bg-zinc-950 p-4 rounded-xl text-left text-xs space-y-2 border border-zinc-900 font-mono">
                    <p className="flex justify-between"><span>Plan Chosen:</span> <span className="text-brand text-right">{successInquiry.selectedPlan}</span></p>
                    <p className="flex justify-between"><span>Phone:</span> <span className="text-zinc-300">{successInquiry.phone}</span></p>
                    <p className="flex justify-between"><span>Inquiry ID:</span> <span className="text-zinc-400">#{successInquiry.id}</span></p>
                    <p className="flex justify-between"><span>Status:</span> <span className="text-emerald-400">● Forwarded to WhatsApp</span></p>
                  </div>

                  <p className="text-[11px] text-zinc-500">
                    If WhatsApp didn't open automatically, click below to send your details directly to our training staff on WhatsApp!
                  </p>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://wa.me/919123349529?text=${encodeURIComponent(
                        `*NEW INQUIRY - FITNESS TRACK KOLKATA*\n\n` +
                        `👤 *Name:* ${successInquiry.fullName}\n` +
                        `📞 *Phone:* ${successInquiry.phone}\n` +
                        `✉️ *Email:* ${successInquiry.email}\n` +
                        `📋 *Selected Option:* ${successInquiry.selectedPlan}\n` +
                        `📝 *Fitness Notes:* ${successInquiry.additionalNotes || 'None'}\n` +
                        `🆔 *Inquiry ID:* #${successInquiry.id}\n\n` +
                        `Please confirm my slot! Thank you.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-zinc-100 font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] shadow-lg shadow-emerald-950/20"
                    >
                      <WhatsAppIcon className="h-4.5 w-4.5" />
                      Send on WhatsApp
                    </a>

                    <button
                      onClick={() => setSuccessInquiry(null)}
                      className="w-full py-2.5 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-display font-bold text-[11px] uppercase tracking-wider rounded-xl transition-colors"
                    >
                      Close & Return
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Details & Maps (Size 7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Contact coordinates list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address */}
              <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between group">
                <div className="flex gap-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0 h-fit">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-zinc-100 uppercase tracking-wider mb-2">
                      Gym Address
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      61B, Matheswartala Road, near Kim Pou Restaurant, China Town, Kolkata, West Bengal 700046
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="mt-6 flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-brand uppercase transition-colors self-start"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick contact phone */}
              <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between group">
                <div className="flex gap-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0 h-fit">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-zinc-100 uppercase tracking-wider mb-2">
                      Direct Contact
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-semibold tracking-wider font-mono">
                      {GYM_CONTACT.phone}
                    </p>
                    <p className="text-zinc-500 text-[10px] mt-1">
                      Available for SMS / Call assistance
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href={`tel:${GYM_CONTACT.phone}`}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-brand uppercase transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-brand uppercase transition-colors"
                  >
                    {copiedPhone ? (
                      <span className="text-emerald-400">Copied</span>
                    ) : (
                      <span>Copy Phone</span>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* Operating Hours Table */}
            <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl">
              <h4 className="font-display font-bold text-sm text-zinc-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" />
                Operational Hours
              </h4>
              <div className="grid grid-cols-2 gap-y-2.5 text-xs text-zinc-400 border-b border-zinc-900 pb-4">
                <span>Monday - Saturday:</span>
                <span className="font-mono text-zinc-200 font-bold text-right">{GYM_TIMINGS.weekdays}</span>
                <span>Sunday:</span>
                <span className="font-mono text-zinc-200 font-bold text-right">{GYM_TIMINGS.sunday}</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
                * Our heavy weights section is fully functional during all open hours. Cardio arena undergoes general cleaning between 1:00 PM and 2:00 PM on weekdays.
              </p>
            </div>

            {/* Visual Dark Theme Google Map Iframe */}
            <div className="border border-zinc-900 rounded-2xl overflow-hidden h-72 relative bg-zinc-900">
              <iframe
                title="Fitness Track Gym Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.66442654359!2d88.3888352!3d22.5411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027663e26ca4a3%3A0xe536d6a2a0937a54!2s61B%2C%20Matheswartala%20Rd%2C%20Tangra%2C%20Kolkata%2C%20West%20Bengal%20700046!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale invert contrast-[1.2] opacity-75"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Column 2: Inquiry / Day Pass Booking Form (Size 5) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 sm:p-8 rounded-2xl backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest block mb-1">
                  SECURE BOOKING ENGINE
                </span>
                <h3 className="text-2xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100 mb-6">
                  CLAIM FREE DAY PASS
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Das"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9830XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors font-mono"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  {/* Plan Selection */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Selected Membership Option
                    </label>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-400 focus:outline-none focus:border-brand focus:text-zinc-100 transition-colors"
                    >
                      <option value="">-- General 1-Day VIP Pass (Free) --</option>
                      <option value="Classic Gym - ₹1,200/mo">Classic Gym Membership - ₹1,200/mo</option>
                      <option value="Elite Performance - ₹2,200/mo">Elite Performance Membership - ₹2,200/mo</option>
                      <option value="VIP Premium - ₹3,800/mo">VIP Premium Membership - ₹3,800/mo</option>
                      {plan && !plan.startsWith('Classic') && !plan.startsWith('Elite') && !plan.startsWith('VIP') && (
                        <option value={plan}>{plan}</option>
                      )}
                    </select>
                    <p className="text-[10px] text-zinc-500 mt-1.5 leading-normal">
                      * Choose "Custom Estimate" in the calculator above to auto-populate personalized options here!
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Fitness Objectives / Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Weight loss, strength gains, seeking personal trainer coaching..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand hover:bg-brand-hover disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 shadow-lg shadow-brand/10 mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        Processing Secure Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        Book Free Trial Pass
                      </>
                    )}
                  </button>

                </form>
              </div>

              <p className="text-[10px] text-zinc-500 text-center mt-6">
                Protected by client-side local caching. All submitted inquiry tickets are logged instantly and accessible in your personal History panel.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
