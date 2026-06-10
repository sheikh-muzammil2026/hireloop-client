'use client'
import { Award, Bell, Briefcase, Calendar, ChevronRight, Edit3, Send, User } from 'lucide-react';
import React from 'react';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


export default function SeekerHome() {
  // মডার্ন চার্ট ডাটা (color এর বদলে সরাসরি fill প্রপার্টি ইউজ করা হয়েছে)
  const chartData = [
    { name: 'Applied', value: 12, fill: '#3b82f6' },       // Blue
    { name: 'Under Review', value: 5, fill: '#eab308' },  // Yellow
    { name: 'Shortlisted', value: 4, fill: '#a855f7' },   // Purple
    { name: 'Rejected', value: 3, fill: '#ef4444' },      // Red
    { name: 'Offered', value: 2, fill: '#22c55e' },       // Green
  ];

  // ডামি ডাটা (রিসেন্ট অ্যাক্টিভিটি)
  const activities = [
    { id: 1, type: 'status', message: 'Your application for "Senior React Developer" at Google was moved to Shortlisted.', time: '2 hours ago', urgent: true },
    { id: 2, type: 'alert', message: 'New Job Alert: 5 new Frontend positions match your profile.', time: '5 hours ago', urgent: false },
    { id: 3, type: 'interview', message: 'Interview scheduled with Microsoft for "UI/UX Designer" position.', time: '1 day ago', urgent: false },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6 md:p-10">
      
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Welcome Back, Seeker!
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here is whats happening with your job search today.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95 self-start md:self-auto">
          <Briefcase size={18} />
          Explore Jobs
        </button>
      </header>

      {/* --- STATS ROW --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Saved Jobs', count: 24, icon: Briefcase, color: 'from-blue-500/20 to-cyan-500/5', border: 'border-blue-500/30', iconColor: 'text-blue-400' },
          { title: 'Applications', count: 18, icon: Send, color: 'from-yellow-500/20 to-orange-500/5', border: 'border-yellow-500/30', iconColor: 'text-yellow-400' },
          { title: 'Interviews', count: 3, icon: Calendar, color: 'from-purple-500/20 to-pink-500/5', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
          { title: 'Offers Received', count: 2, icon: Award, color: 'from-green-500/20 to-emerald-500/5', border: 'border-green-500/30', iconColor: 'text-green-400' },
        ].map((stat, index) => (
          <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2 text-white font-mono">{stat.count}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-slate-900/50 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 text-white/5 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={80} />
            </div>
          </div>
        ))}
      </section>

      {/* --- PROFILE CARD & RECHARTS --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left: Profile Card (4 Columns) */}
        <div className="lg:col-span-4 bg-[#151c2c] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20"></div>
          
          <div className="relative pt-6 flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-[#151c2c] bg-slate-800 overflow-hidden flex items-center justify-center shadow-xl">
                <User size={48} className="text-slate-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Edit3 size={18} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">John Doe</h2>
            <p className="text-sm text-slate-400">johndoe@hireloop.com</p>
            
            <div className="mt-4 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">
              Premium Candidate
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/60 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-slate-400">Profile Match</p>
              <p className="text-lg font-semibold text-emerald-400 mt-1">92%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Resume Score</p>
              <p className="text-lg font-semibold text-blue-400 mt-1">A+</p>
            </div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl font-medium transition-all border border-slate-700/50">
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Right: Application Status Chart (8 Columns) */}
        <div className="lg:col-span-8 bg-[#151c2c] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white">Application Status Analytics</h3>
            <p className="text-xs text-slate-400">Visual representation of your journey</p>
          </div>
          
          <div className="flex-1 min-h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  // লেটেস্ট ভার্সনে সেল কম্পোনেন্ট ছাড়াই ডাটার fill থেকে কালার অটোমেটিক পেয়ে যাবে
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-300 text-xs font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* --- RECENT ACTIVITY --- */}
      <section className="bg-[#151c2c] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Recent Activity & Alerts</h3>
              <p className="text-xs text-slate-400">Stay updated with your latest interactions</p>
            </div>
          </div>
          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-start justify-between p-4 rounded-xl border transition-all duration-200 ${
                activity.urgent 
                  ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' 
                  : 'bg-[#1e2638]/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.urgent ? 'bg-amber-400 animate-pulse' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">{activity.message}</p>
                  <span className="text-xs text-slate-500 mt-1 block">{activity.time}</span>
                </div>
              </div>
              
              <button className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors self-center">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}