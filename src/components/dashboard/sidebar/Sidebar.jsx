'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { LogOut, ShieldAlert } from 'lucide-react'; // ShieldAlert ব্যাকআপ হিসেবে যদি প্ল্যান ব্যাজে লাগে
import { authClient } from '@/lib/auth-client';
import { dashboardMenus } from './dashboard-menu';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const menuItems = dashboardMenus[user?.role] || [];
  console.log(menuItems, "from sidbar");

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/auth/signin');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0b0f19] border-r border-slate-800/80 text-slate-200 flex flex-col shadow-2xl shadow-black/50 select-none">

      {/* --- LOGO SECTION --- */}
      <div className="p-6 border-b border-slate-800/60 flex items-center justify-center bg-[#0d1322]">
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo.png"
            alt="Hireloop logo"
            width={130}
            height={130}
            className="object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]"
            priority
          />
        </Link>
      </div>

      {/* --- PROFILE SECTION --- */}
      <div className="p-5 border-b border-slate-800/60 bg-gradient-to-b from-[#0d1322] to-transparent">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/40 border border-slate-800/40">

          {/* Avatar with dynamic border */}
          <div className="relative w-10 h-10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-spin-slow opacity-70 p-[1.5px]">
              <div className="w-full h-full bg-[#151c2c] rounded-full"></div>
            </div>
            <Image
              src={user?.avatar || "https://i.pravatar.cc/150?img=12"}
              alt="profile"
              fill
              sizes="40px"
              className="rounded-full object-cover p-[2px] relative z-10"
            />
          </div>

          {/* Name + Email */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-white leading-tight truncate">
              {user?.name || "Guest User"}
            </span>
            <span className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Dynamic Plan Badge */}
        <div className="mt-3 flex justify-start pl-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/5">
            {user?.plan || "premium"}
          </span>
        </div>
      </div>

      {/* --- NAVIGATION MENU --- */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="block group">
              <div
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden
                ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/5 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 border border-transparent hover:bg-slate-800/40 hover:border-slate-800/60'
                }`}
              >
                {/* Active Left Indicator Light */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-[0_0_10px_#3b82f6]" />
                )}

                {/* Menu Icon with interactive color shift */}
                <span className={`transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {Icon ? <Icon size={18} /> : <ShieldAlert size={18} />}
                </span>

                <span className="text-[13px] tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* --- FOOTER / LOGOUT --- */}
      <div className="p-4 border-t border-slate-800/60 bg-[#090d16]">
        <Button
          onClick={handleLogout}
          variant="flat"
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/20 text-slate-300 hover:text-red-400 font-medium py-2.5 rounded-xl transition-all duration-300 shadow-inner group/btn"
        >
          <LogOut size={15} className="transition-transform group-hover/btn:-translate-x-0.5" />
          <span className="text-xs tracking-wide">Logout Account</span>
        </Button>
      </div>
      
    </aside>
  );
}