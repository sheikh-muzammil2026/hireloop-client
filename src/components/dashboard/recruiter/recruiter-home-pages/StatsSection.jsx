import {
  Briefcase,
  Users,
  Activity,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: Briefcase,
    color: "from-violet-500/20 to-violet-600/10 text-violet-400",
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Users,
    color: "from-blue-500/20 to-blue-600/10 text-blue-400",
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Activity,
    color: "from-green-500/20 to-green-600/10 text-green-400",
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: XCircle,
    color: "from-red-500/20 to-red-600/10 text-red-400",
  },
];

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}
            >
              <Icon size={18} />
            </div>

            {/* Value */}
            <h2 className="mt-4 text-2xl font-semibold text-white">
              {item.value}
            </h2>

            {/* Title */}
            <p className="text-sm text-gray-400 mt-1">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}