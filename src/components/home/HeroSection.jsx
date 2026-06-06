"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Magnifier, Pin } from "@gravity-ui/icons";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { searchQuery, location });
  };

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[#0B0B0F] px-4 py-20 text-center overflow-hidden">
      
      {/* BACKGROUND PARTICLES/GLOW (নিচের কোণায় থাকা সূক্ষ্ম স্টারের ফিলিং) */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-violet-600/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        
        {/* TOP BADGE: 50,000+ New Jobs This Month */}
        <div className="inline-flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-[#12121A]/80 px-4 py-2 text-xs font-medium tracking-wide text-gray-400 backdrop-blur-md shadow-xl sm:text-sm">
            <span className="text-base">💼</span> 
            <span className="font-semibold text-white">50,000+</span> NEW JOBS THIS MONTH
            {/* দুই পাশের অ্যানিমেটেড সূক্ষ্ম বর্ডার লাইনের ইফেক্ট */}
            <div className="absolute -left-10 top-1/2 h-px w-8 bg-gradient-to-r from-transparent to-white/20 hidden sm:block" />
            <div className="absolute -right-10 top-1/2 h-px w-8 bg-gradient-to-l from-transparent to-white/20 hidden sm:block" />
          </div>
        </div>

        {/* MAIN HEADING */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Find Your Dream Job Today
          </h1>
          {/* SUBTITLE */}
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg md:text-xl font-light leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse thousands of
            curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* SEARCH BAR CONTAINER (গ্লাস-মরফিজম লুক) */}
        <form 
          onSubmit={handleSearch}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#12121A]/60 p-2 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full"
        >
          {/* JOB TITLE INPUT */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-0">
            <Magnifier className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {/* VERTICAL DIVIDER FOR DESKTOP */}
          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* LOCATION INPUT */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-0">
            <Pin className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {/* SEARCH BUTTON (HERO UI BUTTON) */}
          <Button
            type="submit"
            isIconOnly
            radius="full"
            className="h-12 w-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg sm:w-12 flex-shrink-0 transition-colors"
            aria-label="Search Jobs"
          >
            <Magnifier className="h-5 w-5 stroke-[2]" />
          </Button>
        </form>

        {/* TRENDING POSITIONS SECTION */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-sm">
          <span className="text-gray-500 font-medium">Trending Position</span>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingPositions.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => setSearchQuery(position)}
                className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 transition hover:border-white/10 hover:bg-white/10 hover:text-white"
              >
                {position}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}