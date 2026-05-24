"use client";

import { motion } from "framer-motion";
import { FUNNEL_DATA } from "@/lib/mock-data";

export default function HiringFunnel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Hiring Funnel</h3>
          <p className="text-xs text-slate-500 mt-0.5">Conversion by stage</p>
        </div>
        <span className="text-xs bg-gold-500/10 text-gold-400 border border-gold-500/20 px-2 py-1 rounded-full">
          This Month
        </span>
      </div>

      <div className="space-y-3">
        {FUNNEL_DATA.map((item, i) => (
          <motion.div
            key={item.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="text-sm text-slate-300 font-medium">{item.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{item.percentage}%</span>
                <span className="text-sm font-semibold text-slate-100 w-8 text-right">
                  {item.count}
                </span>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: item.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion rate */}
      <div className="mt-6 pt-5 border-t border-[rgba(198,167,94,0.1)] flex items-center justify-between">
        <p className="text-sm text-slate-400">Hire conversion rate</p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-400">10.1%</span>
          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">+2.3%</span>
        </div>
      </div>
    </div>
  );
}
