'use client'
import { browseJobs } from '@/lib/actions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [initialJobs, setInitialJobs] = useState([]);
  const [allJobs, setAllJobs]          = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    const allJobsPromise = async()=>{
      setLoading(true)
      const allJobs = await browseJobs('All');
      setInitialJobs(allJobs)
      setLoading(false)
      
    }
    allJobsPromise()
  } ,[])

  // ইউনিক ক্যাটাগরি বের করার লজিক (ফিল্টারের জন্য)
  const categories = ['All', ...new Set(initialJobs?.map((job)=> job.category))];
  

  // ফিল্টারিং লজিক
 useEffect(()=>{

    const allJobsPromise = async()=>{
      setLoading(true)
      const Jobs = await browseJobs(searchTerm,selectedCategory,selectedType );
      setAllJobs(Jobs)
      setLoading(false)  
    }
    allJobsPromise()
  } ,[searchTerm,selectedCategory,selectedType])

  return (
    <>
   
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Explore <span className="text-blue-600">Available Jobs</span>
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            HireLoop-এর মাধ্যমে খুঁজে নিন আপনার পছন্দের ক্যারিয়ার এবং সেরা কাজের সুযোগ।
          </p>
        </div>

        {/* ফিল্টার এবং সার্চ বার */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* সার্চ ইনপুট */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="জব টাইটেল বা কিওয়ার্ড দিয়ে খুঁজুন..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* ক্যাটাগরি ফিল্টার */}
            <div>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories?.map((cat, ind) => (
                  <option key={ind} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* জব টাইপ ফিল্টার */}
            <div>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* ৩-কলাম জবের গ্রিড লেআউট */}
         {loading && <p className='text-center'>loading</p>}
      
        {allJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs?.map((job, index) => (
              <div 
                key={`${job.title}-${index}`}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* ক্যাটাগরি ও স্ট্যাটাস ট্যাগ */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {job?.category}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      job?.type === 'Remote' ? 'bg-green-50 text-green-700' :
                      job?.type === 'Hybrid' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {job?.type}
                    </span>
                  </div>

                  {/* জব টাইটেল */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1 hover:text-blue-600 cursor-pointer line-clamp-1">
                    {job?.title}
                  </h3>

                  {/* লোকেশন */}
                  <p className="text-sm text-slate-400 flex items-center mb-4">
                    <span className="mr-1">📍</span> {job?.location}
                  </p>

                  {/* সেলারি রেঞ্জ */}
                  <div className="bg-slate-50 p-3 rounded-xl mb-4">
                    <span className="text-xs text-slate-400 block mb-0.5">Salary Range</span>
                    <span className="text-base font-bold text-slate-800">
                      {job.currency === 'BDT' ? '৳' : '$'}{Number(job?.salaryMin).toLocaleString()} - {Number(job.salaryMax).toLocaleString()}
                    </span>
                  </div>

                  {/* রিকোয়ারমেন্টস (ছোট করে ২ লাইনে দেখানোর জন্য line-clamp) */}
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    <strong className="text-slate-700">Requirements:</strong> {job.requirements}
                  </p>
                </div>

                {/* কার্ডের নিচের অংশ (বাটন ও ডেডলাইন) */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span>⏳ Deadline: {job.deadline}</span>
                    {job.isRemote && <span className="text-green-600 font-semibold">🏠 Work from Home</span>}
                  </div>
                  <Link href={`/browse-jobs/${job._id}`}>
                  <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors duration-200">
                    View details
                  </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* ডেটা না পাওয়া গেলে */
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-lg">দুঃখিত, কোনো জব খুঁজে পাওয়া যায়নি!</p>
          </div>
        )}

      </div>
    </div>
    
    </>
  );
};

export default BrowseJobs;