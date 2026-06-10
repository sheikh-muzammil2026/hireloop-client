'use client';

import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Briefcase, ChevronRight, DollarSign, Layers, MapPin, Search, Send, SlidersHorizontal, UploadCloud, X } from 'lucide-react';

export default function BrowseJobs() {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxSalary, setMaxSalary] = useState(150000);
  
  // সেভড জবস এবং মডাল স্টেট
  const [savedJobs, setSavedJobs] = useState([]); // জবের ID স্টোর করবে
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  // --- DUMMY JOB DATA ---
  const jobsData = [
    { id: 1, title: 'Senior React Developer', company: 'Google', location: 'Remote', type: 'Full-time', category: 'Frontend', salary: 130000, logoBg: 'bg-red-500/10 text-red-500', posted: '2 days ago' },
    { id: 2, title: 'UI/UX Lead Designer', company: 'Microsoft', location: 'Hybrid', type: 'Full-time', category: 'Design', salary: 115000, logoBg: 'bg-blue-500/10 text-blue-500', posted: '1 day ago' },
    { id: 3, title: 'Node.js Backend Engineer', company: 'Amazon', location: 'On-site', type: 'Contract', category: 'Backend', salary: 95000, logoBg: 'bg-amber-500/10 text-amber-500', posted: '3 days ago' },
    { id: 4, title: 'DevOps Specialist', company: 'Netflix', location: 'Remote', type: 'Full-time', category: 'DevOps', salary: 145000, logoBg: 'bg-red-600/10 text-red-600', posted: 'Just now' },
    { id: 5, title: 'Product Manager', company: 'Meta', location: 'Hybrid', type: 'Part-time', category: 'Management', salary: 120000, logoBg: 'bg-blue-600/10 text-blue-600', posted: '5 days ago' },
    { id: 6, title: 'Junior Frontend Developer', company: 'Vercel', location: 'Remote', type: 'Internship', category: 'Frontend', salary: 45000, logoBg: 'bg-slate-300/10 text-slate-300', posted: '4 days ago' },
  ];

  // --- HANDLERS ---
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const openApplyModal = (job) => {
    setSelectedJobForApply(job);
    setIsModalOpen(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার API Call হবে (e.g., Axios.post('/api/apply', { jobId: selectedJobForApply.id, coverLetter }))
    alert(`Successfully applied for ${selectedJobForApply.title} at ${selectedJobForApply.company}!`);
    setIsModalOpen(false);
    setCoverLetter('');
  };

  // --- FILTER LOGIC ---
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesSalary = job.salary <= maxSalary;

    return matchesSearch && matchesType && matchesLocation && matchesCategory && matchesSalary;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-10">
      
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Explore Opportunities
        </h1>
        <p className="text-slate-400 text-sm mt-1">Find your dream job and manage applications effortlessly.</p>
      </header>

      {/* Main Grid: Filters + Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT SIDE: FILTERS (4 Columns) --- */}
        <aside className="lg:col-span-4 bg-[#151c2c] border border-slate-800 rounded-2xl p-6 shadow-xl lg:sticky lg:top-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/60">
            <SlidersHorizontal size={18} className="text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Filter Jobs</h2>
          </div>

          <div className="space-y-6">
            {/* Search Input inside filter box for mobile optimizations */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Job Type</label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Location</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="All">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="All">All Categories</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="DevOps">DevOps</option>
                <option value="Management">Management</option>
              </select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Max Salary</label>
                <span className="text-sm font-semibold text-emerald-400">${maxSalary.toLocaleString()}/yr</span>
              </div>
              <input 
                type="range" 
                min="30000" 
                max="150000" 
                step="5000"
                value={maxSalary} 
                onChange={(e) => setMaxSalary(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </aside>

        {/* --- RIGHT SIDE: JOB LISTINGS (8 Columns) --- */}
        <main className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <p className="text-sm text-slate-400">Showing <span className="text-white font-semibold">{filteredJobs.length}</span> jobs found</p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-[#151c2c] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <Layers size={40} className="mx-auto mb-3 text-slate-600" />
              <p className="text-lg font-medium text-slate-300">No jobs match your criteria.</p>
              <p className="text-xs mt-1">Try resetting your filters or modifying your search.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-[#151c2c] border border-slate-800/80 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Job Details Info */}
                <div className="flex items-start gap-4">
                  {/* Company Initials Logo Placeholder */}
                  <div className={`w-12 h-12 rounded-xl shrink-0 font-bold flex items-center justify-center text-lg ${job.logoBg}`}>
                    {job.company[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-0.5">{job.company}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 bg-[#0b0f19] px-2.5 py-1 rounded-md border border-slate-800">
                        <MapPin size={13} className="text-slate-500" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 bg-[#0b0f19] px-2.5 py-1 rounded-md border border-slate-800">
                        <Briefcase size={13} className="text-slate-500" /> {job.type}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/10">
                        <DollarSign size={13} /> {job.salary.toLocaleString()}/yr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Button Group */}
                <div className="flex items-center gap-3 border-t border-slate-800/40 md:border-none pt-4 md:pt-0 justify-between md:justify-end shrink-0">
                  <span className="text-xs text-slate-500 md:hidden">{job.posted}</span>
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {/* Save Button */}
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        savedJobs.includes(job.id)
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                          : 'bg-slate-800/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title={savedJobs.includes(job.id) ? "Saved" : "Save Job"}
                    >
                      {savedJobs.includes(job.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>

                    {/* Apply Button */}
                    <button 
                      onClick={() => openApplyModal(job)}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-95"
                    >
                      Apply Now <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>

      </div>

      {/* --- CONFIRMATION & COVER LETTER MODAL --- */}
      {isModalOpen && selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="bg-[#151c2c] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Apply for Position</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedJobForApply.title} — {selectedJobForApply.company}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1 bg-slate-800/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplySubmit} className="p-6 space-y-5">
              
              {/* Profile Resume Note */}
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 flex items-center gap-3">
                <UploadCloud size={22} className="text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-200">Your default resume will be attached</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">John-Doe-Resume.pdf (Updated 1 week ago)</p>
                </div>
              </div>

              {/* Cover Letter Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cover Letter (Optional)</label>
                  <span className="text-[11px] text-slate-500">Max 500 characters</span>
                </div>
                <textarea 
                  rows="4"
                  maxLength="500"
                  placeholder="Introduce yourself and explain why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Send size={15} /> Confirm Application
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}