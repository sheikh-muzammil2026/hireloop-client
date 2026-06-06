"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { ArrowRight, Plus } from "@gravity-ui/icons";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // monthly or yearly

  // প্রাইসিং ডেটা স্ট্রাকচার
  const plans = [
    {
      name: "Starter",
      price: billingPeriod === "monthly" ? "$0" : "$0",
      icon: "👑",
      isPopular: false,
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
    },
    {
      name: "Growth",
      price: billingPeriod === "monthly" ? "$17" : "$12", // ইয়ারলি ডিসকাউন্টেড প্রাইস ডেমো
      icon: "📈",
      isPopular: true, // মাঝখানের কার্ডটি স্ক্রিনশটের মতো হাইলাইটেড
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
    },
    {
      name: "Premium",
      price: billingPeriod === "monthly" ? "$99" : "$79",
      icon: "⚡",
      isPopular: false,
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
    },
  ];

  return (
    <section className="bg-[#0B0B0F] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center space-y-3">
          {/* SMALL TOP SUB-BADGE */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
            Pricing
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
          </div>
          {/* MAIN TITLE */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Pay for the leverage, <br className="hidden sm:inline" /> not the listings
          </h2>
        </div>

        {/* BILLING TOGGLE SWITCH */}
        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-white/5 bg-[#12121A]/80 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                billingPeriod === "yearly"
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className="rounded-full bg-fuchsia-500/20 px-1.5 py-0.5 text-[10px] font-bold text-fuchsia-400 border border-fuchsia-500/30">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl border p-8 transition-all ${
                plan.isPopular
                  ? "border-white/10 bg-[#171722]/80 shadow-2xl relative"
                  : "border-white/5 bg-[#12121A]/40"
              }`}
            >
              <div>
                {/* PLAN NAME & PRICE */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-lg bg-white/5 p-2 rounded-xl border border-white/5">{plan.icon}</span>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline text-white">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-xs text-gray-500">/month</span>
                  </div>
                </div>

                <p className="text-sm font-medium text-gray-300 mb-6">Start building your insights hub:</p>

                {/* FEATURES LIST */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-white/5 border border-white/5 text-gray-400">
                        <Plus className="h-3.5 w-3.5" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-8">
                {plan.isPopular ? (
                  /* হাইলাইটেড কার্ডের জন্য প্রিমিয়াম হোয়াইট বাটন */
                  <Button
                    className="w-full h-12 bg-white font-semibold text-black hover:bg-gray-200 transition-all text-sm"
                    radius="xl"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Choose This Plan
                  </Button>
                ) : (
                  /* নরমাল কার্ডের জন্য ডার্ক মিনিমাল বাটন */
                  <Button
                    className="w-full h-12 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm"
                    radius="xl"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Choose This Plan
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}