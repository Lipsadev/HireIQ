"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  ANALYTICS_DATA,
  SKILL_DEMAND,
  DEPARTMENT_HIRING,
  SOURCE_DATA,
  STATS,
} from "@/lib/mock-data";
import { Clock, Target, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-600 border border-[rgba(198,167,94,0.25)] rounded-xl p-3 shadow-gold text-xs">
        <p className="text-gold-400 font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-slate-300 capitalize">{p.name}:</span>
            <span className="text-slate-100 font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 size={18} className="text-gold-400" />
            Hiring Analytics
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Deep insights into your recruitment pipeline performance
          </p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y"].map((r, i) => (
            <button
              key={r}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                i === 2
                  ? "bg-gold-500/15 text-gold-400 border-gold-500/35"
                  : "text-slate-500 border-white/8 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Time to Hire", value: `${STATS.avgTimeToHire}d`, sub: "Industry avg: 24d", icon: <Clock size={15} />, color: "#C6A75E", trend: "+3d faster" },
          { label: "Offer Accept Rate", value: `${STATS.offerAcceptRate}%`, sub: "vs 68% industry", icon: <Target size={15} />, color: "#10B981", trend: "+14% above" },
          { label: "Pipeline Velocity", value: "8.2d", sub: "Avg stage duration", icon: <Zap size={15} />, color: "#8B5CF6", trend: "Improving" },
          { label: "Quality of Hire", value: "4.2/5", sub: "90-day performance", icon: <TrendingUp size={15} />, color: "#F59E0B", trend: "+0.3 this Q" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass-card p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl"
              style={{ background: item.color, transform: "translate(30%, -30%)" }} />
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{item.trend}</span>
            </div>
            <p className="text-2xl font-bold font-display text-slate-100 mt-3">{item.value}</p>
            <p className="text-xs text-slate-400 font-medium">{item.label}</p>
            <p className="text-[10px] text-slate-600 mt-0.5">{item.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly Hiring Bars */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Monthly Hiring Activity</h3>
              <p className="text-xs text-slate-500 mt-0.5">Applications, interviews & hires</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ANALYTICS_DATA} barGap={4} margin={{ left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198,167,94,0.07)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(198,167,94,0.04)" }} />
              <Bar dataKey="applications" fill="#C6A75E" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="interviews" fill="#8B5CF6" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="hired" fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-4 justify-center">
            {[
              { label: "Applications", color: "#C6A75E" },
              { label: "Interviews", color: "#8B5CF6" },
              { label: "Hired", color: "#10B981" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Source Distribution Pie */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-6"
        >
          <h3 className="text-sm font-semibold text-slate-100 mb-1">Candidate Sources</h3>
          <p className="text-xs text-slate-500 mb-4">Where candidates come from</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={SOURCE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {SOURCE_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, ""]}
                contentStyle={{
                  background: "#1F2A44",
                  border: "1px solid rgba(198,167,94,0.25)",
                  borderRadius: "10px",
                  color: "#F1F5F9",
                  fontSize: "11px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {SOURCE_DATA.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-300">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Skill Demand vs Supply */}
        <motion.div
          custom={6}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-6"
        >
          <h3 className="text-sm font-semibold text-slate-100 mb-1">Skill Demand vs Supply</h3>
          <p className="text-xs text-slate-500 mb-5">Market demand vs available talent</p>
          <div className="space-y-3">
            {SKILL_DEMAND.map((item) => (
              <div key={item.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">{item.skill}</span>
                  <span className="text-xs text-red-400">
                    Gap: {item.demand - item.supply}%
                  </span>
                </div>
                <div className="relative h-2 bg-white/6 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gold-500 opacity-80"
                    style={{ width: `${item.demand}%` }}
                  />
                  <div
                    className="absolute h-full rounded-full bg-blue-500 opacity-70"
                    style={{ width: `${item.supply}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-gold-500" />
              <span className="text-xs text-slate-500">Demand</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
              <span className="text-xs text-slate-500">Supply</span>
            </div>
          </div>
        </motion.div>

        {/* Department Hiring */}
        <motion.div
          custom={7}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-6"
        >
          <h3 className="text-sm font-semibold text-slate-100 mb-1">Department Hiring</h3>
          <p className="text-xs text-slate-500 mb-5">Hired vs target by department</p>
          <div className="space-y-4">
            {DEPARTMENT_HIRING.map((dept) => {
              const progress = Math.round((dept.hired / dept.target) * 100);
              return (
                <div key={dept.department}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-300">{dept.department}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400 font-semibold">{dept.hired}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-500">{dept.target}</span>
                      <span className="text-slate-600 text-[10px]">({progress}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{
                        background: progress >= 80 ? "#10B981" : progress >= 50 ? "#F59E0B" : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Trend Line */}
      <motion.div
        custom={8}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Rejection & Interview Trends</h3>
            <p className="text-xs text-slate-500 mt-0.5">Month over month comparison</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ANALYTICS_DATA} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(198,167,94,0.07)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="rejected" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", strokeWidth: 0, r: 3 }} />
            <Line type="monotone" dataKey="interviews" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", strokeWidth: 0, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </DashboardLayout>
  );
}
