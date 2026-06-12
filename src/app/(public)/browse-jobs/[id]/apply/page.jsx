import Link from "next/link";
import { redirect } from "next/navigation"; // ১. রিডাইরেক্ট ইমপোর্ট করা হলো
import { ArrowLeft, Crown, ShieldAlert, Sparkles } from "lucide-react";
import { getAppliedJobsByEmail, getJobsByJobId, getPlansByPlanId } from "@/lib/actions";
import JobApplyForm from "@/components/home/jobs/applyForm";
import { getUserSession } from "@/lib/core/session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function JobApplyPage({ params }) {
  
  const unWraapper = await params;
  const jobId      = unWraapper.id;
  // ১. প্রথমে সেশন এবং ইউজার ডেটা ফেচিং
  const user = await getUserSession(); 

  // ২. ইউজার লগইন না থাকলে শুরুতেই সাইন-ইন পেজে রিডাইরেক্ট (সিকিউরড প্রোটেকশন)
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${jobId}`); // id পরিবর্তন করে jobId করা হলো
  }

  // ৩. রোল চেক (ইউজার যদি জব সিকার না হয় তবে এক্সেস ব্লক)
  if (user.role !== 'job_seeker') {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center p-6 selection:bg-red-500/20">
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
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors group cursor-pointer">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                Return to Job Board
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ৪. ইউজার ভ্যালিড হলে ডেটা এক্সট্র্যাক্ট করা
  const planId = user?.plan_Id;
  const userEmail = user?.email;

  let job = null;
  let plans = null;
  let applications = [];

  // ৫. ডেটা ফেচিং ব্লক
  try {
    const { token } = await auth.api.getToken({
      headers: await headers() 
    });
   
    // টোকেন সহ ডেটা ফেচ করা হচ্ছে
    job = await getJobsByJobId(jobId, token);
    plans = await getPlansByPlanId(planId);
    applications = await getAppliedJobsByEmail(userEmail);
  } catch (error) {
    console.error("Error fetching data on server:", error);
  }
console.log(plans ,"fetched plans");
  const quota = plans?.maxApplicationsPerMonth || 0;
  const appliedCount = applications?.length || 0;
  const hasQuota = appliedCount < quota;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-6 lg:px-8 py-12 selection:bg-indigo-500/30 relative overflow-hidden">
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* BACK TO DETAIL PAGE */}
        <div className="mb-8">
          <Link href={`/jobs/${jobId}`}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors group cursor-pointer">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Job Specifications
            </span>
          </Link>
        </div>

        {/* MAIN APPLICATION CONTAINER */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#151c2c]/80 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* APPLICATION HEADER & QUOTA COUNTER */}
          <div className="p-6 sm:p-10 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/40 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <Sparkles size={12} /> Hireloop Application Terminal
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Applying for {job?.title || "Position"}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">at {job?.companyName || "Verified Partner"}</p>
            </div>

            {/* LIVE QUOTA BADGE */}
            <div className="px-4 py-2.5 rounded-xl bg-[#0b0f19] border border-slate-800 flex flex-col items-end shrink-0 shadow-inner">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Monthly Allocation</span>
              <span className="text-sm font-black text-indigo-400 font-mono mt-0.5">
                  {appliedCount} / {quota} Quota Left
              </span>
            </div>
          </div>

          {/* DYNAMIC RENDERING BLOCK */}
          {hasQuota ? (
            <JobApplyForm
              jobId={jobId} 
              job={job} 
              user={user} 
            />
          ) : (
            /* PREVENT ACCESS & UPGRADE ALERTS */
            <div className="p-8 sm:p-14 text-center">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-5 shadow-lg shadow-amber-500/5">
                <Crown size={26} />
              </div>
              <h2 className="text-lg font-black text-amber-400 uppercase tracking-wider">Quota Limits Exhausted</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                You have spent your maximum allowed monthly submissions. Upgrade to a premium tier to resume network access.
              </p>
              
              <Link href="/pricing" className="inline-block mt-6">
                <span className="px-6 py-3 cursor-pointer inline-block rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 active:scale-95">
                  Upgrade to Premium
                </span>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}