"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getJobsByJobId } from "@/lib/actions";
import { AlertCircle, ArrowLeft, Award, Briefcase, Building2, Calendar, CheckCircle2, DollarSign, FileText, Loader2, MapPin } from "lucide-react";

export default function JobDetailsContent({ jobId }) {
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    const fetchJobData = async () => {
      const { data: tokenData } = await authClient.token();

      try {
        setLoading(true);
        const data = await getJobsByJobId(jobId, tokenData);
        setJob(data);
      } catch (error) {
        console.log("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  // --- LOADING STATE DESIGN ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-3 font-medium animate-pulse">
          Decrypting job specifications...
        </span>
      </div>
    );
  }

  // --- NOT FOUND STATE DESIGN ---
  if (!job) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-6">
        <div className="relative max-w-md w-full rounded-2xl border border-slate-800 bg-[#151c2c]/60 backdrop-blur-xl p-8 text-center shadow-2xl">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-amber-400 mb-4">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-white">Position Not Found</h2>
          <p className="text-xs text-slate-400 mt-1.5 mb-6">
            The job listing you are trying to access might have been archived or removed.
          </p>
          <Link href="/browse-jobs">
            <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50 text-xs font-semibold uppercase tracking-wider transition-all">
              Return to Job Board
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-6 lg:px-8 py-12 selection:bg-indigo-500/30 relative">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <div className="mb-8">
          <Link href="/browse-jobs">
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-colors group">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Back to Job Board
            </button>
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-2xl border border-slate-800 bg-[#151c2c] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          {/* HEADER SECTION */}
          <div className="p-6 sm:p-10 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/20 to-transparent">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
              
              <div className="flex gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400">
                  {job.category}
                </span>

                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  {job.type}
                </span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5">
                ● {job.status || "Active"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {job.title}
              </h1>
              
              {/* TOP APPLY BUTTON (OPTIONAL - NAVIGATES TO FORM PAGE) */}
              <Link href={`/jobs/${job._id}/apply`} className="shrink-0">
                <button className="w-full sm:w-auto px-6 py-2.5 cursor-pointer rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 font-bold text-xs uppercase tracking-widest transition-all">
                  Apply Now
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-400 mt-4 font-medium">
              <div className="flex items-center gap-1.5">
                <Building2 size={15} className="text-slate-500" />
                <span className="text-slate-200">{job.companyName || "Verified Partner"}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-slate-500" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* QUICK STATS PANEL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 border-b border-slate-800/60 bg-[#0d1322]/40">

            <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/80 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 shrink-0">
                <DollarSign size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Salary Bracket</p>
                <p className="font-bold text-white font-mono text-sm mt-0.5">
                  {job.currency === "BDT" ? "৳" : "$"}
                  {Number(job.salaryMin).toLocaleString()} -{" "}
                  {Number(job.salaryMax).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/80 flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Closing Date</p>
                <p className="font-bold text-white text-sm mt-0.5">{job.deadline}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/80 flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 shrink-0">
                <Briefcase size={16} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Work Framework</p>
                <p className="font-bold text-white text-sm mt-0.5">
                  {job.isRemote ? "Remote Ops" : "On-Site Office"}
                </p>
              </div>
            </div>

          </div>

          {/* MAIN DESCRIPTION BODY */}
          <div className="p-6 sm:p-10 space-y-8">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={18} className="text-indigo-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Core Responsibilities
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-7 bg-slate-950/20 p-4 rounded-xl border border-slate-900">
                {job.responsibilities}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} className="text-indigo-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Technical Requirements
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-7 bg-slate-950/20 p-4 rounded-xl border border-slate-900">
                {job.requirements}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-indigo-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Compensations & Benefits
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-7 bg-slate-950/20 p-4 rounded-xl border border-slate-900">
                {job.benefits}
              </p>
            </div>

          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-6 sm:px-10 py-6 border-t border-slate-800/60 bg-[#090d16] flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="text-[11px] text-slate-500 font-mono bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
              REF_ID: {job._id}
            </div>

            {/* MAIN BOTTOM APPLY BUTTON - NAVIGATES TO FORM ROUTE */}
            <Link href={`/browse-jobs/${job._id}/apply`} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-indigo-600/10 active:scale-95">
                Submit Application
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}