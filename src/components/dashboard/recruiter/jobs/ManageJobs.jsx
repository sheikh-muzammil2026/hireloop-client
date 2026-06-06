'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobs } from '@/lib/actions';
import { authClient } from '@/lib/auth-client';
import { Eye } from '@gravity-ui/icons';
import {Pencil} from '@gravity-ui/icons';

const ManageJobs = () => {
  const router = useRouter();

  // demo plan limit
  const jobLimit = 10;
  const activeJobsCount = 7;

  const isLimitReached = activeJobsCount >= jobLimit;

  const [jobs, setJobs] = useState();

   const { 
          data: session
      } = authClient.useSession() 
    
    const userId = session?.user?.id;

  useEffect(()=>{
    const handleJobsPromise = async()=>{
      const {data:tokenData} = await authClient.token();
      console.log(tokenData)
        const jobsData = await getJobs(userId, tokenData);
        return setJobs(jobsData);
    }
    handleJobsPromise()
  } ,[])

  // const toggleStatus = (id) => {
  //   setJobs((prev) =>
  //     prev.map((job) =>
  //       job.id === id
  //         ? {
  //             ...job,
  //             status: job.status === 'Active' ? 'Closed' : 'Active',
  //           }
  //         : job
  //     )
  //   );
  // };

  const deleteJob = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this job?'
    );
    if (!confirmDelete) return;

    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Closed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Draft':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white px-4 py-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-semibold">Manage Jobs</h1>
            <p className="text-sm text-gray-400">
              Manage your job posts, applicants, and status.
            </p>
          </div>

          <button
            onClick={() => router.push('/dashboard/recruiter/jobs/new')}
            disabled={isLimitReached}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition
              ${
                isLimitReached
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                  : 'bg-violet-600 hover:bg-violet-500 text-white'
              }`}
          >
            Post New Job
          </button>
        </div>

        {/* PLAN USAGE */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Active Jobs Usage</span>
            <span className="text-gray-400">
              {activeJobsCount} / {jobLimit}
            </span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500"
              style={{
                width: `${(activeJobsCount / jobLimit) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="text-left p-4">Job Title</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Location</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs?.map((job) => (
                <tr
                  key={job?._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{job?.title}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-lg border text-xs ${getStatusStyle(
                        job?.status
                      )}`}
                    >
                      {job?.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-300">{job?.category}</td>

                  <td className="p-4 text-gray-400">{job?.location}</td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => router.push(`/dashboard/recruiter/jobs/${job?.id}/edit`)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs"
                      >
                      <Pencil/>
                      </button>

                      <button
                        onClick={() => router.push(`/dashboard/recruiter/jobs/${job?.id}/applicants`)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs"
                      >
                        <Eye/>
                      </button>

                      {/* <button
                        onClick={() => toggleStatus(job?.id)}
                        className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs"
                      >
                        {job?.status === 'Active' ? 'Close' : 'Reopen'}
                      </button> */}

                      <button
                        onClick={() => deleteJob(job?.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageJobs;