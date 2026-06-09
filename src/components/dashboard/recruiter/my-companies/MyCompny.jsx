'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Building2, Users, MapPin, Edit3 } from 'lucide-react';

export default function MyCompany() {
  // demo data (replace with API later)
  const [company, setCompany] = useState(null);
  // const [company, setCompany] = useState({
  //   name: "HireLoop Labs",
  //   logo: "",
  //   industry: "Fintech",
  //   location: "Dhaka, Bangladesh",
  //   employees: "10-50",
  //   description:
  //     "We build next-gen hiring infrastructure for modern companies.",
  //   status: "PENDING",
  // });

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">My Company</h1>
          <p className="text-sm text-white/40 mt-1">
            Manage your registered company profile
          </p>
        </div>

        {/* NO COMPANY STATE */}
        {!company && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="mb-4">
              <Building2 className="mx-auto text-violet-400" size={40} />
            </div>

            <h2 className="text-lg font-semibold mb-2">
              No company registered yet
            </h2>

            <p className="text-sm text-white/40 mb-6">
              Register your company to start posting jobs and hiring talent.
            </p>

            <Link href="/dashboard/recruiter/my-company/new">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                + Register Company
              </Button>
            </Link>
          </div>
        )}

        {/* COMPANY EXISTS */}
        {company && (
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">

            {/* TOP HEADER */}
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4">

              <div>
                <h2 className="text-xl font-semibold">
                  {company.name}
                </h2>

                <div className="flex flex-wrap gap-2 mt-2 text-xs text-white/50">

                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    {company.industry}
                  </span>

                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
                    <MapPin size={12} />
                    {company.location}
                  </span>

                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
                    <Users size={12} />
                    {company.employees} employees
                  </span>

                </div>
              </div>

              {/* STATUS + EDIT */}
              <div className="flex items-start gap-3">

                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    company.status === "APPROVED"
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : company.status === "REJECTED"
                      ? "border-red-500/30 text-red-400 bg-red-500/10"
                      : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                  }`}
                >
                  {company.status}
                </span>

                <Button
                  size="sm"
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/10"
                >
                  <Edit3 size={14} className="mr-1" />
                  Edit
                </Button>

              </div>
            </div>

            {/* BODY */}
            <div className="p-6">

              {/* LOGO PLACEHOLDER */}
              <div className="w-16 h-16 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center mb-5">
                <Building2 className="text-violet-400" />
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-white/60 leading-relaxed">
                {company.description}
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}