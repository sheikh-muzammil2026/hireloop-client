import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function AccessDenied({ requiredRole }) {
  // রোল অনুযায়ী টেক্সট এবং ইউআরএল ডাইনামিক করার জন্য
  const isRecruiterRoute = requiredRole === 'recruiter';
  
  const config = {
    title: isRecruiterRoute ? 'Recruiter Clearance Required' : 'Seeker Access Restricted',
    allowedRole: isRecruiterRoute ? 'Recruiters' : 'Job Seekers',
    description: isRecruiterRoute 
      ? 'Your account does not have the publisher privileges required to access management dashboards and talent acquisition pipelines.'
      : 'This terminal is optimized exclusively for candidate profiles, application tracking, and career deployment tools.',
    btnText: isRecruiterRoute ? 'Return to Talent Dashboard' : 'Return to Job Board',
    btnLink: isRecruiterRoute ? '/dashboard/recruiter' : '/dashboard/seeker',
    // রিক্রুটারের জন্য একটু বেগুনি/ইন্ডিগো গ্লো এবং সিকারের জন্য লাল/ক্রিমসন গ্লো (ইউনিক লুকের জন্য)
    themeColor: isRecruiterRoute ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' : 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    glowColor: isRecruiterRoute ? 'bg-indigo-500/5' : 'bg-rose-500/5',
    borderColor: isRecruiterRoute ? 'border-indigo-500/15' : 'border-rose-500/15',
    spanColor: isRecruiterRoute ? 'text-indigo-400' : 'text-rose-400'
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex items-center justify-center p-6 selection:bg-indigo-500/20 antialiased">
      {/* Dynamic Background Glow */}
      <div className={`absolute w-80 h-80 ${config.glowColor} blur-[100px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
      
      {/* Main Card */}
      <div className={`relative max-w-md w-full rounded-2xl border ${config.borderColor} bg-[#0d1322]/70 backdrop-blur-2xl p-8 text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]`}>
        
        {/* Futuristic Cyber Badge Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#070a13] px-4 py-1 rounded-full border border-slate-800 text-[10px] uppercase tracking-[0.2em] font-mono text-slate-500">
          Security Alert // 403
        </div>

        {/* Icon Container */}
        <div className={`w-16 h-16 ${config.themeColor} border rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transition-transform hover:scale-105 duration-300`}>
          {isRecruiterRoute ? <Lock size={26} /> : <ShieldAlert size={26} />}
        </div>

        {/* Heading */}
        <h2 className="text-xl font-extrabold text-white tracking-tight font-sans bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
          {config.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-400 mt-3.5 leading-relaxed font-normal px-2">
          Only verified <span className={`${config.spanColor} font-semibold font-mono text-xs bg-slate-900/50 px-1.5 py-0.5 rounded border border-slate-800`}>{config.allowedRole}</span> {config.description}
        </p>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <Link href={config.btnLink} className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all group cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 px-5 py-3 rounded-xl border border-slate-800 hover:border-slate-700" >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-white" />
              {config.btnText}
          </Link>
        </div>

      </div>
    </div>
  );
}