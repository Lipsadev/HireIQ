"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/mock-data";
import type { Activity } from "@/lib/types";
import {
  UserPlus,
  Calendar,
  CheckCircle2,
  XCircle,
  StickyNote,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<Activity["type"], { icon: React.ElementType; color: string; bg: string }> = {
  application: { icon: UserPlus, color: "text-blue-400", bg: "bg-blue-500/15" },
  interview: { icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/15" },
  hired: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/15" },
  rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
  note: { icon: StickyNote, color: "text-yellow-400", bg: "bg-yellow-500/15" },
  stage: { icon: ArrowRight, color: "text-gold-400", bg: "bg-gold-500/15" },
};

export default function ActivityFeed() {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Activity Feed</h3>
          <p className="text-xs text-slate-500 mt-0.5">Recent recruiter activity</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gold-400">
          <Sparkles size={11} />
          <span>Live</span>
        </div>
      </div>

      <div className="space-y-1">
        {ACTIVITIES.map((activity, i) => {
          const { icon: Icon, color, bg } = iconMap[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors group cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 border border-[rgba(198,167,94,0.2)] flex items-center justify-center text-xs font-bold text-gold-400 shrink-0">
                {activity.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={cn("w-5 h-5 rounded-md flex items-center justify-center shrink-0", bg)}>
                    <Icon className={cn("w-3 h-3", color)} />
                  </div>
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {activity.candidateName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed truncate">
                  {activity.action}
                </p>
              </div>

              {/* Time */}
              <span className="text-[10px] text-slate-600 shrink-0 pt-0.5 whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-xs text-slate-500 hover:text-gold-400 transition-colors text-center rounded-lg hover:bg-white/5">
        View all activity →
      </button>
    </div>
  );
}
