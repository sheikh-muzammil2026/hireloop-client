import React from "react";

const recentApplications = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

const statusStyles = {
  Interviewing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  New: "bg-green-500/15 text-green-400 border-green-500/30",
  Reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

const RecentApplications = () => {
  return (
    <div className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Applications
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            View all candidate applications and status
          </p>
        </div>

        <button className="text-sm text-gray-400 hover:text-white transition">
          View all
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-[11px] text-gray-400 mb-3 px-2">
        <span>Candidate</span>
        <span>Role</span>
        <span>Experience</span>
        <span>Applied</span>
        <span className="text-right">Status</span>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {recentApplications.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            {/* Candidate */}
            <div>
              <p className="text-white text-sm font-medium">{item.name}</p>
              <p className="text-gray-400 text-xs">Candidate</p>
            </div>

            {/* Role */}
            <div className="text-gray-300 text-sm">{item.role}</div>

            {/* Experience (NEW COLUMN FIXED) */}
            <div className="text-gray-400 text-sm">
              {item.experience}
            </div>

            {/* Date */}
            <div className="text-gray-400 text-xs">
              {item.date}
            </div>

            {/* Status */}
            <div className="flex justify-end">
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  statusStyles[item.status] ||
                  "bg-gray-500/10 text-gray-300 border-gray-500/30"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;