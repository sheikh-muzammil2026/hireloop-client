'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { Globe, Building2, Users, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

const industries = ['All', 'Fintech', 'AI', 'Technology', 'Productivity'];

const companies = [
  {
    id: '1',
    name: 'Vercel',
    status: 'PENDING',
    category: 'Technology',
    description:
      'Frontend infrastructure platform for developers building modern web apps.',
    location: 'San Francisco',
    employees: '201-500',
    openJobs: 12,
  },
  {
    id: '2',
    name: 'Stripe',
    status: 'ACTIVE',
    category: 'Fintech',
    description:
      'Payments infrastructure for internet businesses worldwide.',
    location: 'USA',
    employees: '1000+',
    openJobs: 34,
  },
  {
    id: '3',
    name: 'Notion',
    status: 'ACTIVE',
    category: 'Productivity',
    description:
      'All-in-one workspace for notes, docs, and team collaboration.',
    location: 'San Francisco',
    employees: '500-1000',
    openJobs: 8,
  },
];

export default function Companies() {
  const [activeIndustry, setActiveIndustry] = useState('All');

  const filtered =
    activeIndustry === 'All'
      ? companies
      : companies.filter((c) => c.category === activeIndustry);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">
            Companies
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Explore verified companies & opportunities
          </p>
        </div>

        <Button className="bg-white/10 border border-white/10 text-white hover:bg-white/15">
          + Register Company
        </Button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {industries.map((item) => (
          <button
            key={item}
            onClick={() => setActiveIndustry(item)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
              activeIndustry === item
                ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'bg-black border-white/10 text-white/50 hover:text-white hover:border-white/30'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {filtered.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="group relative p-5 rounded-xl border border-white/10 bg-black hover:border-violet-500/40 transition-all duration-300"
          >

            {/* glow border effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-violet-500/10 to-transparent pointer-events-none" />

            {/* TOP */}
            <div className="relative z-10">

              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-medium group-hover:text-violet-300 transition">
                  {company.name}
                </h2>

                <span
                  className={`text-[10px] px-2 py-1 rounded-full border ${
                    company.status === 'ACTIVE'
                      ? 'border-green-500/30 text-green-400 bg-green-500/10'
                      : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <p className="text-xs text-white/40 mb-2">
                {company.category}
              </p>

              <p className="text-sm text-white/60 mb-4 line-clamp-3">
                {company.description}
              </p>

              <div className="space-y-2 text-xs text-white/50">

                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-violet-400" />
                  {company.location}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={14} className="text-violet-400" />
                  {company.employees} employees
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-violet-400" />
                  {company.openJobs} open jobs
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-5 flex items-center justify-between text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <Globe size={13} />
                  View Profile
                </span>

                <span className="text-violet-400">
                  Click →
                </span>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}