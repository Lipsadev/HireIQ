"use client";

import { useState } from "react";
import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar({ title }: { title: string }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(4);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[rgba(198,167,94,0.1)] bg-navy-800/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
      {/* Left: Title */}
      <div>
        <h1 className="text-lg font-semibold text-slate-100 font-display">{title}</h1>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search candidates, jobs..."
              className="bg-navy-600/60 border border-[rgba(198,167,94,0.2)] rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-gold-500/50"
            />
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(198,167,94,0.1)] flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
            >
              <Search size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <button
          onClick={() => setNotifications(0)}
          className="relative w-9 h-9 rounded-lg bg-white/5 border border-[rgba(198,167,94,0.1)] flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
        >
          <Bell size={16} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-[9px] font-bold text-slate-900 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* New Job CTA */}
        <button className="btn-gold text-sm px-4 py-2">
          <Plus size={14} />
          Post Job
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xs font-bold text-slate-900">
            HR
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}
