import FloatingActionButton from '@/components/dashboard/recruiter/recruiter-home-pages/FloatingActionButton';
import RecentApplications from '@/components/dashboard/recruiter/recruiter-home-pages/RecentApplications';
import StatsSection from '@/components/dashboard/recruiter/recruiter-home-pages/StatsSection';
import TopCompanies from '@/components/dashboard/recruiter/recruiter-home-pages/TopCompanies';
import AccessDenied from '@/components/dashboard/routerProtect';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const dashboardHomePage = async() => {
    const user = await getUserSession()
    
if (user.role !== 'recruiter') {
  return <AccessDenied requiredRole="recruiter" />;
}
    return (
        <>
        <div className='space-y-10'>
        <StatsSection/>
       <section className="flex flex-col lg:flex-row gap-6 mt-6 items-start">
                {/* LEFT */}
                <div className="lg:flex-[2.2] w-full">
                    <RecentApplications />
                </div>

                {/* RIGHT */}
                <div className="lg:flex-[1] w-full">
                    <TopCompanies />
                </div>
        </section>
        </div>
        <FloatingActionButton />
        </>
    );
};

export default dashboardHomePage;