'use client';

import { browseJobs } from '@/lib/actions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Explore <span className="text-violet-400">Jobs</span>
        </h1>
        <p className="text-sm text-white/40 mt-2 max-w-xl mx-auto">
          Find your next opportunity with HireLoop
        </p>
      </div>

      {/* FILTER BOX */}
      <div className="mb-10 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none"
          />

          {/* CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-violet-500"
          >
            {categories?.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* TYPE */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-violet-500"
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Contract">Contract</option>
          </select>

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-white/40">Loading jobs...</p>
      )}

      {/* GRID */}
      {allJobs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {allJobs.map((job, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/40 transition-all duration-300"
            >

              {/* TOP TAGS */}
              <div className="flex justify-between mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  {job?.category}
                </span>

                <span className="text-xs px-2 py-1 rounded-full border border-violet-500/30 text-violet-300 bg-violet-500/10">
                  {job?.type}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold group-hover:text-violet-300 transition line-clamp-1">
                {job?.title}
              </h3>

              {/* LOCATION */}
              <p className="text-sm text-white/40 mt-1 mb-4">
                📍 {job?.location}
              </p>

              {/* SALARY */}
              <div className="p-3 rounded-lg bg-black border border-white/10 mb-4">
                <p className="text-xs text-white/40">Salary</p>
                <p className="text-white font-semibold">
                  {job.currency === 'BDT' ? '৳' : '$'}
                  {Number(job.salaryMin).toLocaleString()} -{' '}
                  {Number(job.salaryMax).toLocaleString()}
                </p>
              </div>

              {/* REQUIREMENTS */}
              <p className="text-sm text-white/50 line-clamp-2 mb-5">
                {job.requirements}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                <span>⏳ {job.deadline}</span>
                {job.isRemote && (
                  <span className="text-green-400">Remote</span>
                )}
              </div>

              <Link href={`/browse-jobs/${job._id}`}>
                <button className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition">
                  View Details
                </button>
              </Link>

            </div>
          ))}

        </div>
      ) : (
        <div className="text-center text-white/40 py-16">
          No jobs found
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;