import MyCompanies from '@/components/dashboard/recruiter/my-companies/MyCompnies';
import SearchSection from '@/components/dashboard/recruiter/home/SearchSection';
import React from 'react';

const MyCompanyPage = () => {
    return (
        <div className='space-y-10'>
        <SearchSection/>
        <MyCompanies/>
        </div>
    );
};

export default MyCompanyPage;