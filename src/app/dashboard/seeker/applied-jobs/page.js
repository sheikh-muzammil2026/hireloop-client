'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Building2, ChevronRight, Clock, ExternalLink, Search, SlidersHorizontal } from 'lucide-react';
import {  getAppliedJobsByEmail } from '@/lib/actions';
import { authClient } from '@/lib/auth-client';
import { formatDistanceToNow } from 'date-fns';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const { data: session } = authClient.useSession(); 
  const user = session?.user;
  const userEmail = user?.email;

  // গেট অ্যাপ্লিকেশন ডাটা
  useEffect(() => {
    const fetchApplications = async () => {
      const appData = await getAppliedJobsByEmail(userEmail);
      setApplications(appData);
    };
    if (userEmail) {
      fetchApplications();
    }
  }, [userEmail]);
 
  // ফিল্টারিং লজিক (নিরাপত্তার জন্য fallback যোগ করা হয়েছে)
  const filteredApplications = applications?.filter(app => {
    const title = app?.jobTitle || '';
    const company = app?.companyName || '';
    const search = searchTerm || '';

    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || 
                          company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app?.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // স্ট্যাটাস অনুসারে স্টাইল নির্ধারণের অবজেক্ট
  const statusStyles = {
    'Applied': {
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-blue-500/5',
      dot: 'bg-blue-400'
    },
    'Under Review': {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/5',
      dot: 'bg-amber-400'
    },
    'Shortlisted': {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/5',
      dot: 'bg-purple-400'
    },
    'Offered': {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5',
      dot: 'bg-emerald-400'
    },
    'Rejected': {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5',
      dot: 'bg-rose-400'
    },
    // ডিফোল্ট ব্যাকআপ স্টাইল (যদি স্ট্যাটাস ম্যাচ না করে)
    'default': {
      bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20 shadow-slate-500/5',
      dot: 'bg-slate-400'
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-10 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* হেডার সেকশন */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage your submitted pipelines and operational recruitment statuses.</p>
        </header>

        {/* সার্চ এবং ফিল্টার কন্ট্রোল প্যানেল */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* সার্চ ইনপুট */}
          <div className="md:col-span-7 relative">
            <input
              type="text"
              placeholder="Search by role or institution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#151c2c] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 pl-11 pr-4 py-3.5 rounded-xl focus:border-indigo-500 focus:outline-none transition-all font-medium shadow-lg shadow-black/20"
            />
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* ফিল্টার ড্রপডাউন */}
          <div className="md:col-span-5 relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#151c2c] border border-slate-800 text-xs text-slate-300 px-11 py-3.5 rounded-xl focus:border-indigo-500 focus:outline-none transition-all font-medium appearance-none cursor-pointer shadow-lg shadow-black/20"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Offered">Offered</option>
            </select>
            <SlidersHorizontal size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 rotate-90 pointer-events-none" />
          </div>
        </div>

        {/* টেবিল কন্টেইনার */}
        <div className="bg-[#151c2c] border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            
            {filteredApplications?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/60 bg-[#0d1322]/40 text-slate-400 text-[11px] font-bold uppercase tracking-widest font-mono">
                    <th className="py-4 px-6">Job Title</th>
                    <th className="py-4 px-6">Company</th>
                    <th className="py-4 px-6">Date Applied</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/40 text-sm">
                  {filteredApplications?.map((app) => {
                    // ডাইনামিক স্টাইল সিলেকশন
                    const style = statusStyles[app?.status] || statusStyles['default'];
                    
                    return (
                      <tr 
                        key={app._id} 
                        className="hover:bg-[#1e2638]/30 transition-colors group"
                      >
                        {/* জব টাইটেল */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-indigo-400 group-hover:scale-105 transition-transform">
                              <Briefcase size={16} />
                            </div>
                            <div>
                              <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{app.jobTitle}</p>
                              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5">ID: {app.jobId}</span>
                            </div>
                          </div>
                        </td>

                        {/* কোম্পানি */}
                        <td className="py-4 px-6 text-slate-300 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Building2 size={14} className="text-slate-500" />
                            <span>{app?.companyName}</span>
                          </div>
                        </td>

                        {/* ডেট */}
                        <td className="py-4 px-6 text-slate-400 text-xs">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Clock size={13} className="text-slate-600" />
                            <span>
                              {app?.appliedAt 
                                ? formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true }) 
                                : 'N/A'}
                            </span>
                          </div>
                        </td>

                        {/* সুন্দর ও ডাইনামিক স্ট্যাটাস ব্যাজ */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-wider shadow-sm transition-all duration-300 ${style.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${style.dot}`} />
                            {app?.status}
                          </span>
                        </td>

                        {/* অ্যাকশন বাটন */}
                        <td className="py-4 px-6 text-right">
                          <Link href={`/browse-jobs/${app.jobId}`}>
                            <button className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-slate-700/50 hover:border-indigo-500 shadow-md active:scale-95 cursor-pointer">
                              View Details
                              <ExternalLink size={12} />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              /* নো ডাটা স্টেট */
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-500 mb-4">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Pipelines Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">There are no jobs matching your current search parameters or status filter.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}