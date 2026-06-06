"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight, Briefcase, Pin } from "@gravity-ui/icons";
import { RiCoinsLine } from "react-icons/ri";

export default function JobRolesSection() {
  // স্ক্রিনশটের ডেমো ডেটা অ্যারে
  const jobs = Array(6).fill({
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    link: "/jobs/frontend-developer"
  });

  return (
    <section className="bg-[#0B0B0F] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="mb-16 text-center space-y-3">
          {/* SMALL TOP SUB-BADGE */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
            Smart Job Discovery
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
          </div>
          {/* MAIN TITLE */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            The roles you&apos;d never <br className="hidden sm:inline" /> find by searching
          </h2>
        </div>

        {/* JOB CARDS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#12121A]/40 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-[#12121A]/70"
            >
              {/* CARD TOP INFO */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {job.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {job.description}
                </p>
                
                {/* BADGES SECTION */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {/* Location Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                    <Pin className="h-3.5 w-3.5 text-fuchsia-400" />
                    {job.location}
                  </div>
                  {/* Job Type Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                    <Briefcase className="h-3.5 w-3.5 text-fuchsia-400" />
                    {job.type}
                  </div>
                  {/* Salary Badge (Coins Icon Used Here) */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3 py-1 text-xs font-medium text-gray-300 w-full sm:w-auto">
                    <RiCoinsLine className="h-3.5 w-3.5 text-fuchsia-400" />
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* ACTION LINK */}
              <div className="mt-8 pt-4">
                <Link
                  href={job.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white group"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="mt-16 text-center">
          <Button
            as={Link}
            href="/jobs"
            radius="lg"
            className="bg-white font-semibold text-black hover:bg-gray-200 transition-colors px-8 h-12 text-sm shadow-xl"
          >
            View all job open
          </Button>
        </div>

      </div>
    </section>
  );
}