"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Mail,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { getProfile, getInitials } from "@/lib/profile";
import { useEffect } from "react";

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/candidates", label: "Candidates", icon: Users },
    ],
  },
  {
    group: "AI Tools",
    items: [
      { href: "/resume-analyzer", label: "Resume Analyzer", icon: FileText },
      { href: "/interviews", label: "Interview AI", icon: BrainCircuit },
      { href: "/email-generator", label: "Email Generator", icon: Mail },
    ],
  },
  {
    group: "Insights",
    items: [{ href: "/analytics", label: "Analytics", icon: BarChart3 }],
  },
  {
    group: "Workspace",
    items: [{ href: "/settings", label: "Settings", icon: Settings }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Get local profile for extra fields
  const [localProfile, setLocalProfile] = useState<ReturnType<typeof getProfile>>(null);
  useEffect(() => {
    setLocalProfile(getProfile());
  }, []);

  // Display name: prefer Clerk user name, fall back to local profile, then default
  const displayName =
    (isLoaded && user?.fullName) ||
    localProfile?.fullName ||
    "HR Admin";

  const displayEmail =
    (isLoaded && user?.primaryEmailAddress?.emailAddress) ||
    localProfile?.email ||
    "admin@hireiq.ai";

  const initials = getInitials(displayName);

  // Avatar: use Clerk profile image if available
  const avatarUrl = isLoaded && user?.imageUrl ? user.imageUrl : null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 70 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen flex flex-col shrink-0 border-r border-[rgba(198,167,94,0.12)] bg-navy-700 transition-colors duration-300 z-40"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[rgba(198,167,94,0.12)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-slate-900" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-display font-bold text-lg text-gradient-gold">
                HireIQ
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-2">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-1">
                {group.group}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-gold-500/10 text-gold-400 border-r-2 border-gold-500"
                          : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                      )}
                    >
                      <Icon
                        className={cn(
                          "shrink-0",
                          isActive
                            ? "text-gold-400"
                            : "text-slate-500 group-hover:text-slate-300"
                        )}
                        size={18}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-navy-600 border border-[rgba(198,167,94,0.2)] rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                          {label}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Log Out Button */}
        <div className="mt-2 pt-2 border-t border-[rgba(198,167,94,0.08)]">
          <button
            onClick={() => signOut().then(() => window.location.href = "/")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative text-red-400/80 hover:text-red-400 hover:bg-red-500/10"
            )}
          >
            <LogOut
              className="shrink-0 text-red-400/60 group-hover:text-red-400"
              size={18}
            />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap"
                >
                  Log Out
                </motion.span>
              )}
            </AnimatePresence>
            {collapsed && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-navy-600 border border-[rgba(239,68,68,0.2)] rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Log Out
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* User info */}
      <div className="p-3 border-t border-[rgba(198,167,94,0.12)]">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition cursor-pointer",
            collapsed && "justify-center"
          )}
        >
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover border border-[rgba(198,167,94,0.3)] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xs font-bold text-slate-900 shrink-0">
              {initials}
            </div>
          )}

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <p className="text-sm font-medium text-slate-100 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500 truncate">{displayEmail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy-600 border border-[rgba(198,167,94,0.25)] flex items-center justify-center text-slate-400 hover:text-gold-400 transition-colors shadow-lg"
      >
        {collapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </motion.aside>
  );
}
