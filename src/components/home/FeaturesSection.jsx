"use client";

import { Bookmark, ChartLine, LayoutCellsLarge, Magnifier, NutHex, SquareArticle } from "@gravity-ui/icons";
import { BiTrendingUp } from "react-icons/bi";
import { BsCursor } from "react-icons/bs";

export default function FeaturesSection() {

  const features = [
    {
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: <Magnifier className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: <ChartLine className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: <LayoutCellsLarge className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: <Bookmark className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: <BsCursor className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: <SquareArticle className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: <NutHex className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: <BiTrendingUp className="h-5 w-5 text-fuchsia-400" />,
    },
  ];

  return (
    <section className="bg-[#0B0B0F] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="mb-20 text-center space-y-3">
          {/* SMALL TOP SUB-BADGE */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
            Features Job
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
          </div>
          {/* MAIN TITLE */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* FEATURES GRID */}
        {/* রেসপন্সিভ স্ট্রাকচার: মোবাইলে ১টি, ট্যাবলেটে ২টি, লার্জ স্ক্রিনে ৪টি কলাম */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 group">
              
              {/* ICON CONTAINER (ডার্ক স্কয়ার বক্স ব্যাকগ্রাউন্ড ও সূক্ষ্ম হোভার গ্লো) */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#12121A]/60 shadow-md backdrop-blur-sm transition-all group-hover:border-white/10 group-hover:bg-[#12121A]/90">
                {feature.icon}
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white tracking-wide transition-colors group-hover:text-indigo-400">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}