"use client";

import Image from "next/image";
// আপনার ইনস্টল করা gravity-ui আইকনসমূহ
import { Briefcase, Layers, Magnifier, Star } from "@gravity-ui/icons";

export default function StatsSection() {
  
  // স্ক্রিনশটের ৪টি কার্ডের ডেটা অ্যারে
  const stats = [
    {
      id: 1,
      value: "50K",
      label: "Active Jobs",
      icon: <Briefcase className="h-5 w-5 text-gray-400" />,
    },
    {
      id: 2,
      value: "12K",
      label: "Companies",
      icon: <Layers className="h-5 w-5 text-gray-400" />, // বিল্ডিং/কোম্পানি রিলেটেড
    },
    {
      id: 3,
      value: "2M",
      label: "Job Seekers",
      icon: <Magnifier className="h-5 w-5 text-gray-400" />, // সার্চ/ট্যালেন্ট হান্ট রিлеটেড
    },
    {
      id: 4,
      value: "97%",
      label: "Satisfaction Rate",
      icon: <Star className="h-5 w-5 text-gray-400" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0B0B0F] py-24 sm:py-32">
      
      {/* BACKGROUND GLOBE IMAGE & GLOW EFFECT */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-80 mix-blend-screen pointer-events-none">
        <div className="relative h-[400px] w-full max-w-5xl sm:h-[600px]">
          {/* গ্লোবের পেছনের বেগুনি গ্লো ইফেক্ট */}
          <div className="absolute inset-0 bg-indigo-600/20 mix-blend-screen blur-[100px] pointer-events-none" />
          
          {/* গ্লোব ইমেজ (আপনার পাবলিক ডিরেক্টরিতে globe.png নামে সেভ রাখবেন) */}
          <Image
            src="/globe.png" 
            alt="Globe Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* CONTENT INNER CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* MAIN HEADING TEXT */}
        <div className="mx-auto max-w-3xl mt-12 sm:mt-24">
          <h2 className="text-2xl font-normal leading-relaxed text-gray-300 sm:text-4xl">
            Assisting over <span className="font-semibold text-white">15,000 job seekers</span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* STATS CARDS GRID - FULLY RESPONSIVE */}
        <div className="mx-auto mt-20 grid max-w-md grid-cols-1 gap-5 sm:max-w-3xl sm:grid-cols-2 lg:max-w-7xl lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#12121A]/60 p-8 text-left backdrop-blur-xl transition duration-300 hover:border-white/10 hover:bg-[#12121A]/80"
            >
              {/* Card Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/10">
                {stat.icon}
              </div>

              {/* Card Content */}
              <div className="mt-12">
                <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}