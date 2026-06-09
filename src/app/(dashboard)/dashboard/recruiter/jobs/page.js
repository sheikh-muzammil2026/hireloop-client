
import ManageJobs from '@/components/dashboard/recruiter/jobs/ManageJobs';
import SearchSection from '@/components/dashboard/recruiter/recruiter-home-pages/SearchSection';
import React from 'react';

const ManageJobsPage = () => {
    return (
        <>
        <SearchSection/>
        <ManageJobs/>
        </>
    );
};

export default ManageJobsPage;