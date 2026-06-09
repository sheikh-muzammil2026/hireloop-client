"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getJobsByJobId } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";

export default function JobDetailsPage({ params }) {
 
    const unwrappedParams = use(params)
  const jobId = unwrappedParams?.id; 
 

  const [job, setJob] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId) {
    const fetchJobData = async()=>{
      const {data:tokenData} = await authClient.token();
        
        try {
            setLoading(true);
        
        const data =   await getJobsByJobId(jobId,tokenData)
        setJob(data)
            
        } catch (error) {
            console.log("Error fetching job details:", error);
        }finally{
         setLoading(false)
        }
     
    }
    fetchJobData()
      
    }
  }, [jobId]);


  if (loading) {
    return <p className="text-center py-20 font-medium text-slate-500">Loading job details...</p>;
  }

  if (!job) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-xl mx-auto mt-10">
        <p className="text-slate-400 text-lg mb-4">দুঃখিত, জবের তথ্যটি খুঁজে পাওয়া যায়নি!</p>
        <Link href="/browse-jobs">
          <span className="text-blue-600 hover:underline cursor-pointer">সব জব দেখুন</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* পেছনে যাওয়ার বাটন */}
        <div className="mb-6">
          <Link href="/browse-jobs">
            <button className="flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
              <span className="mr-2">←</span> ব্যাক টু জবস
            </button>
          </Link>
        </div>

        {/* মেইন কার্ড */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* হেডার ব্যানার / ইনফো */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              {/* ক্যাটাগরি ও জব টাইপ */}
              <div className="flex gap-2">
                <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {job.category}
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  job.type === 'Remote' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {job.type}
                </span>
              </div>
              {/* স্ট্যাটাস */}
              <span className="text-xs font-medium px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {job.status}
              </span>
            </div>

            {/* জব টাইটেল এবং কোম্পানি */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {job.title}
            </h1>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
              🏢 {job.companyName || "Verified Company"} 
              <span className="text-slate-300">•</span> 
              📍 {job.location}
            </p>
          </div>

          {/* জবের গুরুত্বপূর্ণ তথ্য (Quick Stats Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-50/50 border-b border-slate-100">
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">স্যালারি রেঞ্জ</span>
              <span className="text-lg font-bold text-slate-800">
                {job.currency === 'BDT' ? '৳' : '$'}{Number(job.salaryMin).toLocaleString()} - {Number(job.salaryMax).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 block">প্রতি মাস</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">আবেদনের শেষ সময়</span>
              <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                ⏳ {job.deadline}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">কাজের ধরন</span>
              <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                {job.isRemote ? "🏠 Work from Home" : "🏢 Office Job"}
              </span>
            </div>
          </div>

          {/* বিস্তারিত বিবরণী সেকশন */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Responsibilities */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">🎯</span> Responsibilities
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">📋</span> Requirements
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">🎁</span> Benefits & Perks
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {job.benefits}
              </p>
            </div>

          </div>

          {/* অ্যাকশন বাটন বা ফুটার */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Job ID: <span className="font-mono">{job._id}</span>
            </div>
            <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-all duration-200 cursor-pointer text-center">
              Apply Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}