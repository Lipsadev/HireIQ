"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import HiringFunnel from "@/components/dashboard/HiringFunnel";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import ApplicationTrend from "@/components/dashboard/ApplicationTrend";
import { STATS, CANDIDATES, JOBS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getStageColor } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { getProfile } from "@/lib/profile";
import { useEffect, useState } from "react";

const STAT_CARDS = [
  {
    label: "Total Applicants",
    value: STATS.totalApplicants,
    change: 12.5,
    changeLabel: "vs last month",
    icon: <Users size={18} />,
    accentColor: "#C6A75E",
  },
  {
    label: "Active Jobs",
    value: STATS.activeJobs,
    change: 5.2,
    changeLabel: "3 new this week",
    icon: <Briefcase size={18} />,
    accentColor: "#8B5CF6",
  },
  {
    label: "Interviews Scheduled",
    value: STATS.interviewsScheduled,
    change: 8.1,
    changeLabel: "Next 7 days",
    icon: <Calendar size={18} />,
    accentColor: "#F59E0B",
  },
  {
    label: "Hired This Year",
    value: STATS.hired,
    change: 18.3,
    changeLabel: "Offer acceptance: 82%",
    icon: <CheckCircle size={18} />,
    accentColor: "#10B981",
  },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState("HR Admin");

  useEffect(() => {
    if (isLoaded && user?.firstName) {
      setFirstName(user.firstName);
    } else {
      const profile = getProfile();
      if (profile?.fullName) {
        setFirstName(profile.fullName.split(" ")[0]);
      }
    }
  }, [isLoaded, user]);

  const recentCandidates = CANDIDATES.slice(0, 5);

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mb-8 p-6 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(198,167,94,0.12) 0%, rgba(31,42,68,0.6) 100%)",
          border: "1px solid rgba(198,167,94,0.2)",
        }}
      >
        {/* Background decoration */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gold-500/5 blur-2xl" />
        <div className="absolute right-20 top-0 w-20 h-20 rounded-full bg-purple-500/5 blur-xl" />

        <div className="flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-gold-400" />
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
                AI Insights Active
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-100">
              Good afternoon, <span className="text-gradient-gold">{firstName}</span> 👋
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              You have{" "}
              <span className="text-gold-400 font-semibold">
                {STATS.interviewsScheduled} interviews
              </span>{" "}
              scheduled this week and{" "}
              <span className="text-blue-400 font-semibold">12 new applications</span> to review.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/resume-analyzer"
              className="btn-outline text-sm py-2 px-4"
            >
              Analyze Resume
            </Link>
            <Link href="/candidates" className="btn-gold text-sm py-2 px-4">
              View Pipeline
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.08} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Application Trend - 2 cols */}
        <div className="lg:col-span-2">
          <ApplicationTrend />
        </div>
        {/* Hiring Funnel */}
        <div>
          <HiringFunnel />
        </div>
      </div>

      {/* Bottom Row: Recent Candidates + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Candidates */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Recent Candidates</h3>
              <p className="text-xs text-slate-500 mt-0.5">Latest applications</p>
            </div>
            <Link
              href="/candidates"
              className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(198,167,94,0.08)]">
                  {["Candidate", "Role", "ATS Score", "Stage", "Applied"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-slate-500 pb-3 pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentCandidates.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="border-b border-[rgba(198,167,94,0.06)] hover:bg-white/3 transition-colors group"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 border border-[rgba(198,167,94,0.2)] flex items-center justify-center text-[10px] font-bold text-gold-400">
                          {c.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-gold-400 transition-colors">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-slate-600">{c.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-400 whitespace-nowrap">{c.role}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${c.atsScore}%`,
                              background: c.atsScore >= 85 ? "#10B981" : c.atsScore >= 70 ? "#F59E0B" : "#EF4444",
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-300">{c.atsScore}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${getStageColor(c.stage)}`}
                      >
                        {c.stage}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-slate-600">
                      {new Date(c.appliedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Avg. Time to Hire", value: `${STATS.avgTimeToHire} days`, icon: <Clock size={14} />, color: "text-blue-400" },
          { label: "Offer Accept Rate", value: `${STATS.offerAcceptRate}%`, icon: <CheckCircle size={14} />, color: "text-green-400" },
          { label: "Rejected", value: STATS.rejected, icon: <XCircle size={14} />, color: "text-red-400" },
          { label: "Active Positions", value: JOBS.filter(j => j.status === "Active").length, icon: <Briefcase size={14} />, color: "text-purple-400" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className={`${item.color} bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center`}>
              {item.icon}
            </div>
            <div>
              <p className="text-base font-bold text-slate-100">{item.value}</p>
              <p className="text-[11px] text-slate-500">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
