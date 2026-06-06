import FloatingActionButton from '@/components/dashboard/recruiter/home/FloatingActionButton';
import RecentApplications from '@/components/dashboard/recruiter/home/RecentApplications';
import SearchSection from '@/components/dashboard/recruiter/home/SearchSection';
import StatsSection from '@/components/dashboard/recruiter/home/StatsSection';
import TopCompanies from '@/components/dashboard/recruiter/home/TopCompanies';
import React from 'react';

const dashboardHomePage = () => {
    return (
        <>
        <div className='space-y-10'>
        <SearchSection/>
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