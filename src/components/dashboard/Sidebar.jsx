'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { IoMdBriefcase } from 'react-icons/io';
import { TbSquares } from 'react-icons/tb';
import { authClient } from '@/lib/auth-client';
import { Pulse } from '@gravity-ui/icons';

const menuItems = [
  {
    label: 'Home',
    href: '/dashboard/recruiter',
    icon: LayoutDashboard,
  },
  {
    label: 'My Company',
    href: '/dashboard/recruiter/my-company',
    icon: HiOutlineBuildingOffice2,
  },
  {
    label: 'Post new job',
    href: '/dashboard/recruiter/jobs/new',
    icon: Pulse,
  },
  {
    label: 'Manage Jobs',
    href: '/dashboard/recruiter/jobs',
    icon: IoMdBriefcase,
  },
  {
    label: 'Applications',
    href: '/dashboard/recruiter/applications',
    icon: TbSquares,
  },
  {
    label: 'Settings',
    href: '/dashboard/recruiter/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/auth/signin');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B0B0F] border-r border-white/10 text-white flex flex-col">

      {/* LOGO ONLY */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center">
    <Image
      src="/logo.png"
      alt="Hireloop logo"
      width={140}
      height={140}
      className="object-contain"
      priority
    />
  </Link>
      </div>

      {/* PROFILE SECTION */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="relative w-10 h-10">
            <Image
              src={user?.avatar || "https://i.pravatar.cc/150?img=12"}
              alt="profile"
              fill
              sizes="40px"
              className="rounded-full object-cover border border-white/10"
            />
          </div>

          {/* Name + Email */}
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-tight">
              {user?.name}
            </span>
            <span className="text-xs text-gray-400">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="mt-3">
          <span className="text-[11px] px-2 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-violet-300 border border-violet-500/20">
            {user?.plan || "premium"}
          </span>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition
                ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="flat"
          className="w-full flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </aside>
  );
}