"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getJobsByJobId } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";

export default function JobDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const jobId = unwrappedParams?.id;

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

  if (loading) {
    return (
      <p className="text-center py-20 text-white/40">
        Loading job details...
      </p>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20 max-w-xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-xl text-white/60">
        <p className="mb-4">Job not found!</p>
        <Link href="/browse-jobs">
          <span className="text-violet-400 hover:text-violet-300 cursor-pointer">
            Back to jobs
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link href="/browse-jobs">
            <button className="text-sm text-white/50 hover:text-violet-400 transition">
              ← Back to Jobs
            </button>
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">

          {/* HEADER */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex flex-wrap justify-between gap-3 mb-4">

              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  {job.category}
                </span>

                <span className="text-xs px-2 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  {job.type}
                </span>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                {job.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold group-hover:text-violet-300">
              {job.title}
            </h1>

            <p className="text-sm text-white/40 mt-2 flex flex-wrap gap-2">
              🏢 {job.companyName || "Company"} • 📍 {job.location}
            </p>
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 border-b border-white/10">

            <div className="p-4 rounded-lg bg-black border border-white/10">
              <p className="text-xs text-white/40">Salary</p>
              <p className="font-semibold text-white">
                {job.currency === "BDT" ? "৳" : "$"}
                {Number(job.salaryMin).toLocaleString()} -{" "}
                {Number(job.salaryMax).toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-black border border-white/10">
              <p className="text-xs text-white/40">Deadline</p>
              <p className="font-semibold text-white">⏳ {job.deadline}</p>
            </div>

            <div className="p-4 rounded-lg bg-black border border-white/10">
              <p className="text-xs text-white/40">Work Type</p>
              <p className="font-semibold text-white">
                {job.isRemote ? "🏠 Remote" : "🏢 Office"}
              </p>
            </div>

          </div>

          {/* DETAILS */}
          <div className="p-6 sm:p-8 space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-violet-400 mb-2">
                Responsibilities
              </h3>
              <p className="text-sm text-white/60 whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-400 mb-2">
                Requirements
              </h3>
              <p className="text-sm text-white/60 whitespace-pre-line">
                {job.requirements}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-400 mb-2">
                Benefits
              </h3>
              <p className="text-sm text-white/60 whitespace-pre-line">
                {job.benefits}
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-xs text-white/40 font-mono">
              ID: {job._id}
            </p>

            <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition">
              Apply Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}