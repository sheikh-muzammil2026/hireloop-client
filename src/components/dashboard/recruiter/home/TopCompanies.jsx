import React from "react";

const topCompanies = [
  { name: "Google", jobs: 12 },
  { name: "Meta", jobs: 8 },
  { name: "Amazon", jobs: 15 },
];

const TopCompanies = () => {
  return (
    <div className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            My Top Companies
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Most active hiring companies
          </p>
        </div>

        <button className="text-sm text-gray-400 hover:text-white transition">
          View all
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {topCompanies.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/0 hover:border-white/10"
          >
            <p className="text-white text-sm font-medium">
              {item.name}
            </p>

            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
              {item.jobs} Jobs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;