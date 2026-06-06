'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/lib/actions';
import { authClient } from '@/lib/auth-client';

const PostJob = () => {
  const router = useRouter();

  // demo plan limits
  const planLimits = {
    free: 3,
    growth: 10,
    enterprise: 50,
  };

  const currentPlan = 'growth';
  const activeJobs = 4;

  const canPost = activeJobs < planLimits[currentPlan];

  const [form, setForm] = useState({
    title: '',
    category: '',
    type: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    location: '',
    isRemote: false,
    deadline: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
  });

  const { 
            data: session
        } = authClient.useSession() 
      
      const companyId = session?.user.id;
      // console.log(companyId)

  

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async() => {
    if (!canPost) {
      alert('Job limit reached for your plan');
      return;
    }

    const payload = {
      ...form,
      status: 'Active',
      companyId: companyId
    };

    const {data:tokenData} = await authClient.token();

    await createJob(payload, tokenData)

    console.log('Posting Job:', payload, tokenData);

    router.push('/dashboard/recruiter/jobs');
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white flex justify-center px-4 py-10">

      <div className="w-full max-w-4xl space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Post a New Job</h1>
          <p className="text-sm text-gray-400 mt-1">
            Create a job post and start receiving applications.
          </p>
        </div>

        {/* PLAN WARNING */}
        {!canPost && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-sm">
            You have reached your active job limit for your current plan.
          </div>
        )}

        {/* FORM */}

        <div className="space-y-10">

          {/* ================= JOB INFO ================= */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-6">

            <h2 className="text-lg font-semibold">Job Info</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <input
                placeholder="Job Title"
                className="input text-white"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />

              <input
                placeholder="Job Category"
                className="input text-white"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />

              <select
                className="input text-white"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="" className="text-black">Job Type</option>
                <option className="text-black">Full-time</option>
                <option className="text-black">Part-time</option>
                <option className="text-black">Remote</option>
                <option className="text-black">Contract</option>
                <option className="text-black">Internship</option>
              </select>

              <input
                type="date"
                className="input text-white"
                value={form.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
              />

            </div>

            {/* Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <input
                placeholder="Min Salary"
                className="input text-white"
                value={form.salaryMin}
                onChange={(e) => handleChange('salaryMin', e.target.value)}
              />

              <input
                placeholder="Max Salary"
                className="input text-white"
                value={form.salaryMax}
                onChange={(e) => handleChange('salaryMax', e.target.value)}
              />

              <select
                className="input text-white"
                value={form.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option className='text-black'>USD</option>
                <option className='text-black'>BDT</option>
                <option className='text-black'>EUR</option>
              </select>

            </div>

            {/* Location + Remote */}
            <div className="flex items-center gap-3">

              <input
                placeholder="City, Country"
                className="input flex-1 text-white"
                disabled={form.isRemote}
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.isRemote}
                  onChange={(e) => handleChange('isRemote', e.target.checked)}
                />
                Remote
              </label>

            </div>

          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-6">

            <h2 className="text-lg font-semibold">Job Description</h2>

            <textarea
              placeholder="Responsibilities"
              className="input min-h-[120px] text-white"
              value={form.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
            />

            <textarea
              placeholder="Requirements"
              className="input min-h-[120px] text-white"
              value={form.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
            />

            <textarea
              placeholder="Benefits (optional)"
              className="input min-h-[100px] text-white"
              value={form.benefits}
              onChange={(e) => handleChange('benefits', e.target.value)}
            />

          </div>

          {/* ================= COMPANY INFO ================= */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">

            <h2 className="text-lg font-semibold">Company</h2>

            <p className="text-sm text-gray-400 mt-2">
              Auto-filled from your registered company (verified account required).
            </p>

            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 ">
              Acme Corp (Verified)
            </div>

          </div>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end gap-3">

            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={!canPost}
              onClick={handleSubmit}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer
                ${canPost
                  ? 'bg-violet-600 hover:bg-violet-500'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
            >
              Publish Job
            </button>

          </div>

        </div>
      </div>

      {/* reusable input style */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.2);
        }
      `}</style>

    </div>
  );
};

export default PostJob;