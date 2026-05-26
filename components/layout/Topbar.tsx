"use client";

import { useState } from "react";
import { Bell, Search, Plus, Menu, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

interface TopbarProps {
  title: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Topbar({ title, sidebarOpen, onToggleSidebar }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(4);
  const { user } = useUser();

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-[rgba(198,167,94,0.1)] bg-navy-800/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300 gap-3">
      {/* Left: Sidebar toggle + Back arrow + Title */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Sidebar hamburger toggle */}
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(198,167,94,0.1)] flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/30 transition-all shrink-0"
        >
          <Menu size={17} />
        </button>

        {/* Back to homepage arrow */}
        <Link
          href="/"
          title="Back to homepage"
          className="w-9 h-9 rounded-lg bg-white/5 border border-[rgba(198,167,94,0.1)] flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/30 transition-all shrink-0"
        >
          <ArrowLeft size={17} />
        </Link>

        {/* Title */}
        <div className="min-w-0 ml-1">
          <h1 className="text-base font-semibold text-slate-100 font-display leading-tight truncate">
            {title}
          </h1>
          <p className="text-[11px] text-slate-500 leading-tight hidden sm:block">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search..."
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

        {/* Post Job CTA */}
        <button className="btn-gold text-sm px-3 py-2 hidden sm:flex">
          <Plus size={14} />
          Post Job
        </button>

        {/* Clerk UserButton — replaces static avatar */}
        <div className="flex items-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              variables: {
                colorPrimary: "#C6A75E",
                colorBackground: "#1F2A44",
                colorText: "#f1f5f9",
                borderRadius: "12px",
              },
              elements: {
                avatarBox: "w-8 h-8 rounded-full ring-1 ring-[rgba(198,167,94,0.3)] hover:ring-gold-500/60 transition-all",
                userButtonPopoverCard: "bg-[#1F2A44] border border-[rgba(198,167,94,0.2)] shadow-2xl rounded-2xl",
                userButtonPopoverActionButton: "text-slate-300 hover:text-slate-100 hover:bg-white/5 rounded-xl",
                userButtonPopoverActionButtonText: "font-medium",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
