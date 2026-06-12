"use client";

import React, { useState } from "react";
import { Briefcase, Check, ChevronDown, HelpCircle, ShieldCheck, Sparkles, User, Zap } from "lucide-react";

export default function PricingPage() {
  const [billingType, setBillingType] = useState("seeker"); 
  const [openFaq, setOpenFaq] = useState(null);

  // --- DATA: JOB SEEKER PLANS ---
  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      plan_id: "seeker_free",
      period: "/forever",
      desc: "Perfect for starting your career journey.",
      features: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs per month", "Basic profile creation", "Standard email alerts"],
      icon: User,
      badge: "Starter",
      popular: false,
      buttonText: "Get Started Free",
      gradient: "from-blue-500/10 to-cyan-500/5",
      border: "border-slate-800",
    },
    {
      name: "Pro",
      plan_id: "seeker_pro",
      price: "$19",
      period: "/month",
      desc: "Accelerate your job search with deep insights.",
      features: ["Apply to up to 30 jobs per month", "Unlimited saved jobs", "Advanced application tracking", "Salary insights & analytics"],
      icon: Zap,
      badge: "Most Popular",
      popular: true,
      buttonText: "Upgrade to Pro",
      gradient: "from-indigo-600/20 to-purple-600/5",
      border: "border-indigo-500/40 shadow-lg shadow-indigo-500/5",
    },
    {
      name: "Premium",
      plan_id: "seeker_premium",
      price: "$39",
      period: "/month",
      desc: "Maximum visibility and unlimited power.",
      features: ["Everything in Pro Plan", "Unlimited job applications", "Profile boost to top recruiters", "Early access to premium jobs", "24/7 Priority support"],
      icon: Sparkles,
      badge: "Elite",
      popular: false,
      buttonText: "Go Premium",
      gradient: "from-pink-500/10 to-purple-500/5",
      border: "border-slate-800",
    },
  ];

  // --- DATA: RECRUITER PLANS ---
  const recruiterPlans = [
    {
      name: "Free",
      plan_id: "recruiter_free",
      price: "$0",
      period: "/forever",
      desc: "Great for a company's first year of hiring.",
      features: ["Up to 3 active job posts", "Basic applicant management", "Standard listing visibility", "Standard dashboard access"],
      icon: Briefcase,
      badge: "Basic",
      popular: false,
      buttonText: "Start Posting Free",
      gradient: "from-blue-500/10 to-cyan-500/5",
      border: "border-slate-800",
    },
    {
      name: "Growth",
      plan_id: "recruiter_growth",
      price: "$49",
      period: "/month",
      desc: "Scale your team with advanced pipeline tooling.",
      features: ["Up to 10 active job posts", "Full applicant tracking system (ATS)", "Basic analytics & insights", "Email & chat support"],
      icon: Zap,
      badge: "Recommended",
      popular: true,
      buttonText: "Deploy Growth Plan",
      gradient: "from-indigo-600/20 to-purple-600/5",
      border: "border-indigo-500/40 shadow-lg shadow-indigo-500/5",
    },
    {
      name: "Enterprise",
      plan_id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      desc: "For large-scale talent acquisition teams.",
      features: ["Up to 50 active job posts", "Advanced analytics dashboard", "Featured job listings (Top spot)", "Team collaboration & sub-accounts", "Custom branding elements", "Dedicated priority manager"],
      icon: ShieldCheck,
      badge: "Ultimate",
      popular: false,
      buttonText: "Contact Enterprise",
      gradient: "from-pink-500/10 to-purple-500/5",
      border: "border-slate-800",
    },
  ];

  // --- DATA: FAQ ACCORDION ---
  const faqs = [
    { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your plan at any time through your dashboard settings. You will retain access to the premium features until the end of your current billing cycle." },
    { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee if you feel HireLoop didn't meet your needs, provided you haven't deployed excessive applications or posted multiple jobs." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, PayPal, and region-specific secure payments like bKash/Nagad depending on your location." },
    { q: "How does plan switching work?", a: "You can upgrade or downgrade your plan instantly. Upgrades are pro-rated immediately, while downgrades take effect at the start of your next billing interval." },
  ];

  const activePlans = billingType === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-6 lg:px-8 py-16 selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Predictable Pricing, No Hidden Fees
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-xl mx-auto font-medium">
          Choose the optimal accelerator for your ecosystem. Scale up or down as your requirements evolve.
        </p>
      </div>

      {/* --- UNIQUE METALLIC TOGGLE BUTTON --- */}
      <div className="flex justify-center mb-16 relative z-10">
        <div className="relative p-1.5 rounded-2xl bg-[#111726] border border-slate-800/80 shadow-inner flex items-center w-72 sm:w-80">
          
          {/* গ্লাইডিং ব্যাকগ্রাউন্ড অ্যানিমেশন */}
          <div 
            className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-600/20 transition-all duration-300 ease-out ${
              billingType === "seeker" ? "left-1.5 w-[calc(50%-3px)]" : "left-[calc(50%+1.5px)] w-[calc(50%-3px)]"
            }`}
          />

          <button
            onClick={() => setBillingType("seeker")}
            className={`flex-1 relative z-10 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-200 cursor-pointer ${
              billingType === "seeker" ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            For Job Seekers
          </button>
          
          <button
            onClick={() => setBillingType("recruiter")}
            className={`flex-1 relative z-10 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-200 cursor-pointer ${
              billingType === "recruiter" ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            For Recruiters
          </button>
        </div>
      </div>

      {/* --- PRICING CARDS GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
        {activePlans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <div
              key={index}
              className={`relative rounded-3xl border bg-[#151c2c] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden ${plan.border}`}
            >
              {/* জনপ্রিয় কার্ডের উপরে নিয়ন রিং গ্লো */}
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
              )}
              
              {/* মেটালিক ব্যাকগ্রাউন্ড আভা */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${plan.gradient} rounded-bl-full pointer-events-none`} />

              <div>
                {/* কার্ডের মাথা (Badge & Name) */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                    plan.popular 
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" 
                      : "bg-slate-900 border border-slate-800 text-slate-400"
                  }`}>
                    {plan.badge}
                  </span>
                  
                  <div className={`p-2 rounded-xl bg-[#0b0f19] border border-slate-800 ${plan.popular ? "text-indigo-400" : "text-slate-500"}`}>
                    <IconComponent size={18} />
                  </div>
                </div>

                {/* দাম এবং ডেসক্রিপশন */}
                <h3 className="text-xl font-bold text-slate-300">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-3">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6 min-h-[32px]">
                  {plan.desc}
                </p>

                {/* ফিচারস লিস্ট */}
                <div className="border-t border-slate-800/60 pt-6 mb-8">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Included Features:</p>
                  <ul className="space-y-3.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-slate-300">
                        <span className={`p-0.5 rounded-md mt-0.5 shrink-0 ${plan.popular ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-slate-900 text-slate-500 border border-slate-800"}`}>
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

                          {/* অ্যাকশন বাটন */}
              <form action="/api/checkout_sessions" method="POST">    
                  <input type="hidden" name="plan_id" value={plan.plan_id}></input>  
                <section>
                  <button type="submit" role="link" className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                plan.popular
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50"
              }`}>
                    {plan.buttonText}
                  </button>
                </section>
              </form>
 

             
           
            </div>
          );
        })}
      </div>

      {/* --- FAQ SECTION (ACCORDION) --- */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-2 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 mb-3">
            <HelpCircle size={18} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1.5">Everything you need to know about billing and deployment.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-800/80 bg-[#151c2c] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16} 
                    className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`} 
                  />
                </button>
                
                {/* অ্যাকর্ডিয়ন অ্যানিমেশন স্লট */}
                <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 border-t border-slate-800/40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}