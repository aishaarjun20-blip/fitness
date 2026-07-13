import { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Sparkles, CalendarCheck, X, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryProps {
  triggerRefresh: boolean;
  onClosed: () => void;
}

export default function InquiryHistory({ triggerRefresh, onClosed }: HistoryProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load inquiries
  const loadInquiries = () => {
    const saved = localStorage.getItem('fitnesstrack_inquiries');
    if (saved) {
      setInquiries(JSON.parse(saved));
    } else {
      setInquiries([]);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [triggerRefresh]);

  const handleCancelInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('fitnesstrack_inquiries', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CalendarCheck className="h-5 w-5 text-brand" />
          <h3 className="text-lg font-display font-black uppercase italic tracking-tight text-zinc-100">
            MY BOOKINGS & INQUIRIES
          </h3>
          {inquiries.length > 0 && (
            <span className="h-5 min-w-5 px-1.5 bg-brand text-zinc-950 font-mono text-xs font-bold rounded-full flex items-center justify-center">
              {inquiries.length}
            </span>
          )}
        </div>
        <button
          onClick={onClosed}
          className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Booking List Scroll Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((inq) => (
            <div 
              key={inq.id}
              className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl space-y-4 relative group hover:border-zinc-800 transition-colors"
            >
              {/* Header: Ref ID & Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase">
                  Ref: #{inq.id}
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-3 w-3" />
                  Callback Active
                </span>
              </div>

              {/* Booking Body Details */}
              <div className="space-y-1">
                <h4 className="font-display font-extrabold text-sm text-zinc-200 uppercase tracking-wide">
                  {inq.fullName}
                </h4>
                <p className="text-zinc-400 text-xs font-mono">{inq.phone}</p>
                <div className="bg-zinc-950/80 border border-zinc-900/60 p-2.5 rounded-lg text-xs text-brand font-medium mt-2 flex justify-between">
                  <span className="text-zinc-500 font-mono text-[10px] uppercase">Plan:</span>
                  <span className="truncate max-w-[200px] text-right">{inq.selectedPlan}</span>
                </div>
              </div>

              {/* Submitted Time & Cancel CTA */}
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {inq.submittedAt.split(',')[0]}
                </span>
                
                <button
                  onClick={() => handleCancelInquiry(inq.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 uppercase font-bold transition-colors"
                  title="Cancel Inquiry Ticket"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Cancel Request</span>
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 space-y-4">
            <div className="p-4 bg-zinc-900/30 rounded-full text-zinc-600 border border-zinc-900/80">
              <CalendarCheck className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-zinc-400 uppercase tracking-wide">No Bookings Active</h4>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-[240px] mx-auto">
                Any guest passes, free trial sessions, or dynamic memberships you request will show up here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Support Info */}
      <div className="p-6 border-t border-zinc-900 bg-zinc-900/10 text-center space-y-2">
        <p className="text-xs text-zinc-500">
          Need immediate support or customized schedules?
        </p>
        <p className="text-sm font-mono font-bold text-brand hover:underline">
          <a href="tel:09123349529">📞 Call Support: 09123349529</a>
        </p>
      </div>

    </div>
  );
}
