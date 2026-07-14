import { useState, useEffect } from 'react';
import { MEMBERSHIP_PLANS } from '../data';
import { Check, Flame, Percent, Sparkles, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

interface CalculatorProps {
  onPlanSelected: (planSummary: string) => void;
}

export default function MembershipCalculator({ onPlanSelected }: CalculatorProps) {
  // Calculator States
  const [selectedPlanId, setSelectedPlanId] = useState<string>('elite');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('monthly');
  const [addPersonalTrainer, setAddPersonalTrainer] = useState(false);
  const [addLocker, setAddLocker] = useState(false);
  const [addDietPlan, setAddDietPlan] = useState(false);

  // Constants
  const ADD_ON_PRICES = {
    personalTrainer: 1500, // ₹ per month
    locker: 300,
    dietPlan: 600
  };

  const getDiscountFactor = () => {
    switch (billingCycle) {
      case 'quarterly': return 0.90; // 10% off
      case 'half-yearly': return 0.80; // 20% off
      case 'yearly': return 0.65; // 35% off
      default: return 1.0;
    }
  };

  const getCycleMonths = () => {
    switch (billingCycle) {
      case 'quarterly': return 3;
      case 'half-yearly': return 6;
      case 'yearly': return 12;
      default: return 1;
    }
  };

  const getCycleLabel = () => {
    switch (billingCycle) {
      case 'quarterly': return '3 Months';
      case 'half-yearly': return '6 Months';
      case 'yearly': return '12 Months';
      default: return 'Month';
    }
  };

  // Find currently active plan
  const activePlan = MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MEMBERSHIP_PLANS[0];

  // Calculations
  const baseMonthlyPrice = activePlan.basePrice;
  const addOnMonthlyPrice = 
    (addPersonalTrainer ? ADD_ON_PRICES.personalTrainer : 0) +
    (addLocker ? ADD_ON_PRICES.locker : 0) +
    (addDietPlan ? ADD_ON_PRICES.dietPlan : 0);

  const rawTotalMonthly = baseMonthlyPrice + addOnMonthlyPrice;
  const discountFactor = getDiscountFactor();
  
  // Total cost for the chosen billing duration (months)
  const totalDurationCost = Math.round(rawTotalMonthly * getCycleMonths() * discountFactor);
  const effectiveMonthlyCost = Math.round(rawTotalMonthly * discountFactor);
  
  const totalSaved = Math.round(rawTotalMonthly * getCycleMonths() * (1 - discountFactor));

  // Auto scroll to inquiry and pass data
  const handleSelectPlanAndRequest = () => {
    const cycleLabel = billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1);
    
    let summary = `${activePlan.name} (${cycleLabel} Plan) - ₹${totalDurationCost} total`;
    const addOns: string[] = [];
    if (addPersonalTrainer) addOns.push("Personal Trainer");
    if (addLocker) addOns.push("Personal Locker");
    if (addDietPlan) addOns.push("Diet Consultation");
    
    if (addOns.length > 0) {
      summary += ` incl. ${addOns.join(', ')}`;
    }

    onPlanSelected(summary);

    // Smooth scroll to the inquiry section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 rounded-full filter blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 rounded-full text-brand text-xs font-semibold uppercase tracking-widest mb-4">
            <Flame className="h-3 w-3" />
            TRANSPARENT VALUE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-tight italic">
            MEMBERSHIP <span className="text-brand text-shadow-glow">PLANS</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Choose a standard package, or customize a membership duration & custom add-ons to build your perfect fitness routine with no hidden costs.
          </p>
        </div>

        {/* Standard Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {MEMBERSHIP_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`bg-zinc-900/40 border p-8 rounded-2xl flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300 ${
                plan.isPopular 
                  ? 'border-brand/40 shadow-xl shadow-brand/2 bg-zinc-900/60' 
                  : 'border-zinc-900 hover:border-zinc-800'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-brand text-zinc-950 font-display font-black text-[10px] tracking-widest uppercase rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              )}

              <div>
                {/* Plan Name */}
                <h3 className="text-2xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100 mb-2">
                  {plan.name}
                </h3>
                
                {/* Plan Price */}
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-display font-black text-brand">₹{plan.basePrice}</span>
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">/ Month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <Check className="h-4.5 w-4.5 text-brand shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  // Scroll to customizer
                  const customizer = document.getElementById('membership-customizer');
                  if (customizer) {
                    customizer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                  plan.isPopular 
                    ? 'bg-brand text-zinc-950 hover:bg-brand-hover' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700'
                }`}
              >
                Customize Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Interactive Customizer Panel */}
        <div 
          id="membership-customizer"
          className="bg-zinc-900/35 border border-zinc-900/80 rounded-2xl p-6 sm:p-10 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 mb-8">
            <Sliders className="h-5 w-5 text-brand" />
            <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase italic tracking-tight text-zinc-100">
              INTERACTIVE COST ESTIMATOR
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Customizer Inputs */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Base Tier Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                  Step 1: Choose Base Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEMBERSHIP_PLANS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlanId(p.id)}
                      className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                        selectedPlanId === p.id 
                          ? 'bg-zinc-900 border-brand/50 text-zinc-100' 
                          : 'bg-zinc-950/50 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="font-display font-extrabold text-sm uppercase italic tracking-wider block">
                        {p.name}
                      </span>
                      <span className="font-mono text-xs text-brand block mt-1">
                        ₹{p.basePrice}/mo
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Billing Duration / Cycle */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                  Step 2: Choose Membership Duration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'monthly', label: '1 Month', discount: 'Regular' },
                    { id: 'quarterly', label: '3 Months', discount: '10% OFF' },
                    { id: 'half-yearly', label: '6 Months', discount: '20% OFF' },
                    { id: 'yearly', label: '1 Year', discount: '35% OFF' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setBillingCycle(c.id as any)}
                      className={`p-3 rounded-xl text-center border transition-all duration-200 ${
                        billingCycle === c.id 
                          ? 'bg-zinc-900 border-brand/50 text-zinc-100' 
                          : 'bg-zinc-950/50 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="text-xs font-bold block">{c.label}</span>
                      <span className="text-[10px] font-mono text-brand font-semibold uppercase tracking-wider block mt-1">
                        {c.discount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Optional Add-ons */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                  Step 3: Toggle Premium Add-ons
                </label>
                <div className="space-y-3">
                  {[
                    { 
                      state: addPersonalTrainer, 
                      setter: setAddPersonalTrainer, 
                      label: "Personal Trainer Guidance", 
                      price: ADD_ON_PRICES.personalTrainer, 
                      desc: "One-on-one professional session coaching + dynamic muscle plan tracking." 
                    },
                    { 
                      state: addLocker, 
                      setter: setAddLocker, 
                      label: "Private Biometric Locker Space", 
                      price: ADD_ON_PRICES.locker, 
                      desc: "Dedicated personal storage secure safe locker for your belongings." 
                    },
                    { 
                      state: addDietPlan, 
                      setter: setAddDietPlan, 
                      label: "Custom Diet & Nutrition Consultant", 
                      price: ADD_ON_PRICES.dietPlan, 
                      desc: "Monthly customized calorie macros & dietary recommendations tailored to you." 
                    }
                  ].map((add, index) => (
                    <button
                      key={index}
                      onClick={() => add.setter(!add.state)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 ${
                        add.state 
                          ? 'bg-zinc-900/80 border-brand/40 text-zinc-100' 
                          : 'bg-zinc-950/30 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`h-4 w-4 rounded border flex items-center justify-center text-zinc-950 transition-colors ${add.state ? 'bg-brand border-brand' : 'border-zinc-700'}`}>
                            {add.state && <Check className="h-3 w-3 stroke-[3]" />}
                          </span>
                          <span className="text-sm font-bold">{add.label}</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 pl-6 leading-relaxed">{add.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-sm text-brand font-semibold">+₹{add.price}</span>
                        <span className="text-[10px] text-zinc-500 block">/ Month</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Customizer Results Box */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
                  MEMBERSHIP SUMMARY
                </span>
                
                {/* Plan Base */}
                <div className="flex items-center justify-between text-zinc-400 text-sm pb-3 border-b border-zinc-900">
                  <span>Base Tier ({activePlan.name})</span>
                  <span className="font-mono text-zinc-200 font-medium">₹{baseMonthlyPrice}/mo</span>
                </div>

                {/* Add-ons List */}
                <div className="space-y-2 py-3 border-b border-zinc-900 text-zinc-400 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Add-ons Total</span>
                    <span className="font-mono text-zinc-200">₹{addOnMonthlyPrice}/mo</span>
                  </div>
                  {addPersonalTrainer && <div className="text-brand/80 flex justify-between pl-2"><span>• Personal Trainer</span><span>+₹{ADD_ON_PRICES.personalTrainer}</span></div>}
                  {addLocker && <div className="text-brand/80 flex justify-between pl-2"><span>• Biometric Locker</span><span>+₹{ADD_ON_PRICES.locker}</span></div>}
                  {addDietPlan && <div className="text-brand/80 flex justify-between pl-2"><span>• Diet Plan</span><span>+₹{ADD_ON_PRICES.dietPlan}</span></div>}
                </div>

                {/* Billing Interval & Discount */}
                <div className="flex items-center justify-between text-zinc-400 text-xs py-3 border-b border-zinc-900">
                  <span>Billing Interval</span>
                  <span className="font-mono text-zinc-200 capitalize">{billingCycle} ({getCycleLabel()})</span>
                </div>

                {billingCycle !== 'monthly' && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 py-3 border-b border-zinc-900 bg-emerald-500/5 px-2 rounded mt-2">
                    <span className="flex items-center gap-1"><Percent className="h-3 w-3" /> Special Savings</span>
                    <span className="font-mono font-bold">-₹{totalSaved} Saved</span>
                  </div>
                )}

                {/* Effective pricing */}
                <div className="mt-8 flex items-baseline justify-between">
                  <span className="text-zinc-400 text-sm">Effective Monthly:</span>
                  <div className="text-right">
                    <span className="text-2xl font-display font-black text-brand">₹{effectiveMonthlyCost}</span>
                    <span className="text-zinc-500 text-xs"> / month</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-900 flex items-baseline justify-between">
                  <span className="text-zinc-100 font-bold text-sm">Grand Total ({getCycleLabel()}):</span>
                  <span className="text-3xl font-display font-black text-brand">₹{totalDurationCost}</span>
                </div>
              </div>

              {/* Inquiry Action */}
              <button
                onClick={handleSelectPlanAndRequest}
                className="mt-8 w-full py-4 bg-brand hover:bg-brand-hover text-zinc-950 font-display font-black text-sm tracking-widest uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg shadow-brand/10"
              >
                <Sparkles className="h-4 w-4 stroke-[2.5]" />
                Select & Book Free Session
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
