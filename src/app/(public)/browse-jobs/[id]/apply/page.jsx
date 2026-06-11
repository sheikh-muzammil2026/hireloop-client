"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Loader2, Send, Crown, User, Mail, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import {  useEffect, useState } from "react";
import { getJobsByJobId, getPlansByPlanId, submitApplication } from "@/lib/actions";

export default function JobApplyPage() {
  const params = useParams();
  const jobId = params.id;
  
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- HIRELOOP PREMIUM QUOTA STATES ---
  const [quota, setQuota] = useState({ total: 3, remaining: 2 }); // আপনার API ইন্টিগ্রেশন অনুযায়ী ডাইনামিক করবেন
  // const [seekerInfo, setSeekerInfo] = useState({ name: "", email: ""});
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [plans, setPlans]           = useState([])

  // seeker info niye nibo session theke . form e auto show korbe. button disabled thakbe.
   const { data: session } = authClient.useSession(); 
   const user = session?.user;
   const plan = user?.plan;


  useEffect(()=>{

    const fetchPlans = async()=>{
      try {
        setLoading(true)
        const plans = await getPlansByPlanId(plan)
        setPlans(plans)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPlans()
    // 1. plan er data niye asbo. 
    // sei data setplan e set korbo. 
    // ei plans theke page er uporer dike dekhabo koyta qouta chilo r koyta baki ache . 
    // plans pete hole plan_id diye nite hbe.

  }, [])

  

  useEffect(() => {
    if (!jobId) return;

    const fetchJobData = async () => {
      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token();
        const data = await getJobsByJobId(jobId, tokenData);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job data for form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  // --- FORM SUBMISSION ---
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!coverLetter.trim()) return;

    try {
      setIsSubmitting(true);
      
 //  { id: '1', jobTitle: 'Senior React Developer', company: 'Google', dateApplied: '2 hours ago', status: 'Shortlisted', jobId: '6a22f86' },
  
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("jobTitle", job?.title);
      formData.append("companyName", job?.companyName || 'Google');
      formData.append("status",  'Shortlisted');
      formData.append("name", user?.name);
      formData.append("email", user?.email);
      formData.append("coverLetter", coverLetter);

      await submitApplication(Object.fromEntries(formData));
    
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-3 font-medium animate-pulse font-mono tracking-widest">
          INITIALIZING GATEWAY...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-6 lg:px-8 py-12 selection:bg-indigo-500/30 relative overflow-hidden">
      {/* BACKGROUND GLOW EFFECTS (HIRELOOP STYLE) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* BACK TO DETAIL PAGE */}
        <div className="mb-8">
          <Link href={`/jobs/${jobId}`}>
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors group">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Job Specifications
            </button>
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
                {quota.remaining} / {quota.total} Quota Left
              </span>
            </div>
          </div>

          {/* DYNAMIC RENDERING BLOCK */}
          {submitSuccess ? (
            /* SUCCESS SCREEN */
            <div className="p-10 text-center py-20 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 mb-6 shadow-xl shadow-emerald-500/5">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Transmission Successful!</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Your credentials and intent profile have been fully committed to our database collection.
              </p>
              <button 
                onClick={() => router.push("/browse-jobs")}
                className="mt-8 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Return to Jobboard
              </button>
            </div>
          ) : quota.remaining > 0 ? (
            /* SHOW APPLICATION FORM */
            <form onSubmit={handleApplySubmit} className="p-6 sm:p-10 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800/40">
                <User size={14} className="text-indigo-400" /> Personal Identity Records
              </div>

              {/* SEEKER INFO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      disabled
                      value={user.name}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none transition-all font-medium"
                    />
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Secure Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      disabled
                      value={user.email}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none transition-all font-medium"
                    />
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  </div>
                </div>
              </div>


              {/* COVER LETTER / MISSION BRIEF */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800/40 mb-3">
                  <FileText size={14} className="text-indigo-400" /> Statement of Capability
                </div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Cover Letter</label>
                <textarea
                  required
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Elaborate details regarding your technical expertise, system frameworks you mastered, and why HireLoop should pipeline you to this operational unit..."
                  className="w-full p-4 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none transition-all resize-none leading-relaxed font-medium"
                />
              </div>

              {/* ACTION COMPONENT */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090d16]/50 -mx-6 -mb-6 p-6 sm:px-10 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <ShieldCheck size={12} className="text-emerald-500" /> Verified via HireLoop Core Secure Protocol
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>Dispatched Engine <Loader2 size={13} className="animate-spin" /></>
                  ) : (
                    <>Deploy Application <Send size={12} /></>
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* PREVENT ACCESS & UPGRADE ALERTS */
            <div className="p-8 sm:p-14 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-5 shadow-lg shadow-amber-500/5 animate-pulse">
                <Crown size={26} />
              </div>
              <h2 className="text-lg font-black text-amber-400 uppercase tracking-wider">Quota Limits Exhausted</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                You have spent your maximum allowed monthly submissions. Upgrade to a premium tier to resume network access.
              </p>
              
              <Link href="/premium-plans" className="inline-block mt-6">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 active:scale-95">
                  Upgrade to Premium
                </button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}