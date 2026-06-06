'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { Globe, Building2, Users, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import RegisterCompanyModal from './RegisterCompanyModal';

const companies = [
  {
    name: 'Vercel',
    status: 'PENDING',
    category: 'Technology',
    description:
      'Vercel is the platform for frontend developers, providing speed and reliability. Experience the best workflow for React, Next.js, and more.',
    location: 'San Francisco',
    employees: '201-500 range',
    website: '#',
  },
  {
    name: 'Stripe',
    status: 'ACTIVE',
    category: 'Fintech',
    description:
      'Stripe helps businesses accept payments and build financial infrastructure for the internet.',
    location: 'USA',
    employees: '1000+',
    website: '#',
  },
  {
    name: 'Notion',
    status: 'ACTIVE',
    category: 'Productivity',
    description:
      'All-in-one workspace for notes, docs, and collaboration tools.',
    location: 'San Francisco',
    employees: '500-1000',
    website: '#',
  },
];

export default function MyCompanies() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 text-white max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        {/* LEFT */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            My Companies
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Manage and track all your registered companies in one place.
          </p>
        </div>

        {/* BUTTON */}
        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white"
          >
            + Register a Company
          </Button>
        </div>

      </div>

      {/* MODAL (safe mount outside grid flow) */}
      {isOpen && (
        <RegisterCompanyModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {companies.map((company, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >

            {/* TOP */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-base sm:text-lg font-semibold break-words">
                  {company.name}
                </h2>

                <span
                  className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-full border whitespace-nowrap ${
                    company.status === 'ACTIVE'
                      ? 'border-green-500/30 text-green-400 bg-green-500/10'
                      : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                  }`}
                >
                  {company.status}
                </span>
              </div>

              {/* CATEGORY */}
              <p className="text-xs text-gray-400 mb-2">
                {company.category}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {company.description}
              </p>

              {/* INFO */}
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  <span className="break-words">{company.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{company.employees}</span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={company.website}
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                <Globe size={14} />
                Visit Website
              </Link>

              <BadgeCheck size={16} className="text-gray-500" />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}