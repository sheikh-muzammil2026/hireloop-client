import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getJobsByJobId } from '@/lib/actions';
import JobDetailsContent from '@/components/home/jobs/JobsDetailsContent';

const JobDetailsPage = async ({ params }) => {
  
  const resolevParams = await params;
  const jobId = resolevParams.id;

  const {token} = await auth.api.getToken({
        headers: await headers() 
    });
  
   let jobData = null;
  // get job by jobId
 try {
    jobData = await getJobsByJobId(jobId,token)
  
 } catch (error) {
  console.log(error, "failed to fatching job data");
 }

 
  return (
    <div className="min-h-screen bg-[#0b0f19]">
       
      <JobDetailsContent jobData={jobData} />
    </div>
  );
};

export default JobDetailsPage;