"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { ANALYTICS_DATA } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-600 border border-[rgba(198,167,94,0.25)] rounded-xl p-3 shadow-gold text-xs">
        <p className="text-gold-400 font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-300 capitalize">{p.name}:</span>
            <span className="text-slate-100 font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ApplicationTrend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Application Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Jan – Aug 2024</p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "Applications", color: "#C6A75E" },
            { label: "Interviews", color: "#8B5CF6" },
            { label: "Hired", color: "#10B981" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={ANALYTICS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C6A75E" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C6A75E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(198,167,94,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="applications" stroke="#C6A75E" strokeWidth={2} fill="url(#colorApplications)" dot={false} />
          <Area type="monotone" dataKey="interviews" stroke="#8B5CF6" strokeWidth={2} fill="url(#colorInterviews)" dot={false} />
          <Area type="monotone" dataKey="hired" stroke="#10B981" strokeWidth={2} fill="url(#colorHired)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
