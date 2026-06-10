'use client';

import { browseJobs } from '@/lib/actions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Calendar, Compass, Layers, ArrowRight } from 'lucide-react';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [initialJobs, setInitialJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await browseJobs('All');
      setInitialJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const categories = [
    'All',
    ...new Set(initialJobs?.map((job) => job.category)),
  ];

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      const Jobs = await browseJobs(
        searchTerm,
        selectedCategory,
        selectedType
      );
      setAllJobs(Jobs);
      setLoading(false);
    };

    fetchFiltered();
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-6 lg:px-8 py-12 selection:bg-indigo-500/30">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center mb-14 relative">
        {/* ব্যাকগ্রাউন্ডে একটি মৃদু আলোর আভা (Ambient Light) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl rounded-full" />
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Explore Available Positions
        </h1>
        <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto font-medium">
          Discover your next career breakthrough with HireLoops intelligent dispatching engine.
        </p>
      </div>

      {/* --- PREMIUM FILTER BOX --- */}
      <div className="mb-12 p-6 rounded-2xl border border-slate-800 bg-[#111726]/60 backdrop-blur-md shadow-2xl shadow-black/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* SEARCH INPUT WITH ICON */}
          <div className="relative md:col-span-5 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search job title, keywords or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0b0f19] border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none transition-all duration-300 text-sm"
            />
          </div>

          {/* CATEGORY SELECT WITH CUSTOM ICON LOOK */}
          <div className="relative md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0b0f19] border border-slate-800 text-slate-300 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-sm appearance-none cursor-pointer"
            >
              {categories?.map((cat, i) => (
                <option key={i} value={cat} className="bg-[#111726]">
                  {cat === 'All' ? '📂 All Categories' : cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <Layers size={14} />
            </div>
          </div>

          {/* TYPE SELECT */}
          <div className="relative md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0b0f19] border border-slate-800 text-slate-300 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-sm appearance-none cursor-pointer"
            >
              <option value="All" className="bg-[#111726]">🎯 All Types</option>
              <option value="Full-time" className="bg-[#111726]">💼 Full-time</option>
              <option value="Remote" className="bg-[#111726]">🌐 Remote</option>
              <option value="Hybrid" className="bg-[#111726]">🏢 Hybrid</option>
              <option value="Contract" className="bg-[#111726]">📜 Contract</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <Compass size={14} />
            </div>
          </div>

        </div>
      </div>

      {/* --- LOADING INDICATOR --- */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-400 ml-3 font-medium animate-pulse">Filtering jobs engine...</span>
        </div>
      )}

      {/* --- JOBS CARD GRID --- */}
      {!loading && allJobs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {allJobs.map((job, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-800/80 bg-[#151c2c] p-6 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* কার্ডের কোণায় একটি সুন্দর গ্রেডিয়েন্ট লাইট ইফেক্ট */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                {/* TOP TAGS */}
                <div className="flex items-center justify-between mb-5 gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 truncate max-w-[150px]">
                    {job?.category}
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-indigo-500/20 text-indigo-400 bg-indigo-500/10 shrink-0">
                    {job?.type}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1 mb-1.5">
                  {job?.title}
                </h3>

                {/* LOCATION WITH ICON */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-5">
                  <MapPin size={13} className="text-slate-500 shrink-0" />
                  <span className="truncate">{job?.location}</span>
                </div>

                {/* SALARY DISPLAY PANEL */}
                <div className="p-3.5 rounded-xl bg-[#0b0f19] border border-slate-800/60 mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Salary Range</p>
                    <p className="text-slate-200 font-bold font-mono mt-0.5 text-sm sm:text-base">
                      {job.currency === 'BDT' ? '৳' : '$'}
                      {Number(job.salaryMin).toLocaleString()} -{' '}
                      {Number(job.salaryMax).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-emerald-400">
                    <DollarSign size={16} />
                  </div>
                </div>

                {/* REQUIREMENTS DESCRIPTION */}
                <p className="text-xs text-slate-400/90 leading-relaxed line-clamp-2 mb-6 font-normal min-h-[36px]">
                  {job.requirements}
                </p>
              </div>

              <div>
                {/* CARD FOOTER INFO */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-t border-slate-800/50 pt-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-600" />
                    <span>Until: {job.deadline}</span>
                  </div>
                  {job.isRemote && (
                    <span className="text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
                      Remote Available
                    </span>
                  )}
                </div>

                {/* VIEW DETAILS BUTTON */}
                <Link href={`/browse-jobs/${job._id}`} className="block">
                  <button className="w-full py-3 cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 group/btn active:scale-[0.98]">
                    View Details
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </Link>
              </div>

            </div>
          ))}

        </div>
      ) : (
        // NO JOBS FOUND EMPTY STATE
        !loading && (
          <div className="text-center text-slate-500 py-20 border border-dashed border-slate-800 rounded-2xl bg-[#111726]/20">
            <Briefcase size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-slate-400">No Matching Positions Found</p>
            <p className="text-xs text-slate-600 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        )
      )}
    </div>
  );
};

export default BrowseJobs;