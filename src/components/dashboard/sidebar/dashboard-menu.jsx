import { LayoutDashboard, Settings } from 'lucide-react';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { IoMdBriefcase } from 'react-icons/io';
import { TbSquares } from 'react-icons/tb';
import { Pulse } from '@gravity-ui/icons';

export const dashboardMenus = {
  recruiter: [
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
      label: 'Post New Job',
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
  ],

  job_seeker: [
    {
      label: 'Home',
      href: '/dashboard/seeker',
      icon: LayoutDashboard,
    },
    {
      label: 'Applied Jobs',
      href: '/dashboard/seeker/applied-jobs',
      icon: IoMdBriefcase,
    },
    {
      label: 'Settings',
      href: '/dashboard/seeker/settings',
      icon: Settings,
    },
  ],

  admin: [
    {
      label: 'Dashboard',
      href: '/dashboard/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Companies',
      href: '/dashboard/admin/companies',
      icon: HiOutlineBuildingOffice2,
    },
    {
      label: 'Jobs',
      href: '/dashboard/admin/jobs',
      icon: IoMdBriefcase,
    },
    {
      label: 'Settings',
      href: '/dashboard/admin/settings',
      icon: Settings,
    },
  ],
};