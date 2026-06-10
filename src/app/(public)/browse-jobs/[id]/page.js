import JobDetailsContent from '@/components/home/jobs/JobsDetailsContent';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { ShieldAlert, ArrowLeft } from 'lucide-react'; // প্রিমিয়াম লুকের জন্য আইকন
import Link from 'next/link';
import React from 'react';

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  // ইউজার লগইন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট (থিমের সাথে ম্যাচ রেখে)
  if (!user) {
    redirect(`/auth/signin?redirect=/browse-jobs/${id}`);
  }
  if (user.role !== 'job_seeker') {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center p-6 selection:bg-red-500/20">
        {/* অ্যাম্বিয়েন্ট রেড গ্লো */}
        <div className="absolute w-64 h-64 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-md w-full rounded-2xl border border-red-500/20 bg-[#151c2c]/60 backdrop-blur-xl p-8 text-center shadow-2xl shadow-black/40">
          <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400 mb-5 shadow-lg shadow-red-500/5">
            <ShieldAlert size={26} />
          </div>
          
          <h2 className="text-xl font-bold text-white tracking-tight">Access Restricted</h2>
          <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
            Only verified <span className="text-red-400 font-semibold">Job Seekers</span> possess the clearance to view details and deploy applications on this position.
          </p>

          <div className="mt-6 pt-5 border-t border-slate-800/60">
            <Link href="/browse-jobs">
              <button className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors group">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                Return to Job Board
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // যদি সবকিছু ঠিক থাকে, তবে মূল ডিজাইন কনটেন্ট লোড হবে
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <JobDetailsContent jobId={id} />
    </div>
  );
};

export default JobDetailsPage;