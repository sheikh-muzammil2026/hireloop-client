"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, User, Mail, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { submitApplication } from "@/lib/actions";

export default function JobApplyForm({ jobId, job, user }) {
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!coverLetter.trim()) return;

    try {
      setIsSubmitting(true);
      
      const payload = {
        jobId: jobId,
        jobTitle: job?.title,
        companyName: job?.companyName || 'Google',
        status: 'Shortlisted',
        name: user?.name,
        email: user?.email,
        coverLetter: coverLetter,
      };

      await submitApplication(payload);
      setSubmitSuccess(true);
      router.refresh(); // সার্ভারের কোটা ডেটা রিফ্রেশ করার জন্য
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
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
          className="mt-8 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          Return to Jobboard
        </button>
      </div>
    );
  }

  return (
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
              value={user?.name || ""}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-all font-medium opacity-80"
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
              value={user?.email || ""}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-all font-medium opacity-80"
            />
            <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
          </div>
        </div>
      </div>

      {/* COVER LETTER */}
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
  );
}