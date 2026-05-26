"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Users,
  Plug,
  Moon,
  Sun,
  Check,
  Save,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { useUser } from "@clerk/nextjs";
import { getProfile, saveProfile, getInitials, type UserProfile } from "@/lib/profile";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "team", label: "Team", icon: Users },
  { id: "integrations", label: "Integrations", icon: Plug },
];

const INTEGRATIONS = [
  { name: "Slack", desc: "Get notified on candidate updates", connected: true, color: "#4A154B" },
  { name: "Google Calendar", desc: "Sync interview scheduling", connected: true, color: "#4285F4" },
  { name: "Greenhouse", desc: "Import/export candidate data", connected: false, color: "#3CB371" },
  { name: "LinkedIn", desc: "Source candidates directly", connected: false, color: "#0A66C2" },
  { name: "Zapier", desc: "Automate recruitment workflows", connected: false, color: "#FF4A00" },
  { name: "BambooHR", desc: "Sync with HR management", connected: false, color: "#73C41D" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  const { user, isLoaded } = useUser();

  const darkMode = theme === "dark";
  const setDarkMode = (isDark: boolean) => setTheme(isDark ? "dark" : "light");

  // Profile form state — loaded from localStorage + Clerk
  const [profileForm, setProfileForm] = useState<UserProfile>({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    company: "",
    location: "",
  });

  // Load profile on mount
  useEffect(() => {
    const saved = getProfile();
    if (saved) {
      setProfileForm(saved);
    } else if (isLoaded && user) {
      setProfileForm((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        jobTitle: (user.unsafeMetadata?.jobTitle as string) || "",
        phone: (user.unsafeMetadata?.phone as string) || "",
        company: (user.unsafeMetadata?.company as string) || "",
        location: (user.unsafeMetadata?.location as string) || "",
      }));
    }
  }, [isLoaded, user]);

  const [notifications, setNotifications] = useState({
    newApplications: true,
    interviewReminders: true,
    stageChanges: true,
    teamMentions: true,
    weeklyReport: false,
    emailDigest: true,
  });

  const handleSave = () => {
    saveProfile(profileForm);
    toast.success("Settings saved successfully!");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your account and preferences</p>
        </div>
        <button onClick={handleSave} className="btn-gold text-sm py-2 px-4">
          <Save size={14} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Sidebar */}
        <div className="w-full lg:w-52 shrink-0">
          <div className="glass-card p-2 space-y-0.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-gold-500/10 text-gold-400 border-r-2 border-gold-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-card p-6"
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Profile Information
                </h3>
                <div className="flex items-center gap-5">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={profileForm.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border border-[rgba(198,167,94,0.3)]"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xl font-bold text-slate-900">
                      {getInitials(profileForm.fullName || "HR")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-200 mb-1">
                      {profileForm.fullName || "Your Name"}
                    </p>
                    <p className="text-xs text-slate-500 mb-2">{profileForm.jobTitle || "Your Title"}</p>
                    <button className="text-xs text-gold-400 hover:underline flex items-center gap-1.5">
                      <Upload size={11} />
                      Upload photo
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", key: "fullName" as const, placeholder: "Your full name" },
                    { label: "Job Title", key: "jobTitle" as const, placeholder: "Your job title" },
                    { label: "Email", key: "email" as const, placeholder: "Email address" },
                    { label: "Phone", key: "phone" as const, placeholder: "Phone number" },
                    { label: "Company", key: "company" as const, placeholder: "Company name" },
                    { label: "Location", key: "location" as const, placeholder: "Location" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={label}>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">{label}</label>
                      <input
                        value={profileForm[key]}
                        onChange={(e) =>
                          setProfileForm((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        placeholder={placeholder}
                        className="w-full bg-white/6 border border-[rgba(198,167,94,0.12)] rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Notification Preferences
                </h3>
                {Object.entries(notifications).map(([key, value]) => {
                  const labels: Record<string, { label: string; desc: string }> = {
                    newApplications: { label: "New Applications", desc: "When a new candidate applies" },
                    interviewReminders: { label: "Interview Reminders", desc: "30 min before scheduled interviews" },
                    stageChanges: { label: "Stage Changes", desc: "When a candidate moves through pipeline" },
                    teamMentions: { label: "Team Mentions", desc: "When someone @mentions you" },
                    weeklyReport: { label: "Weekly Report", desc: "Summary of hiring activity each Monday" },
                    emailDigest: { label: "Email Digest", desc: "Daily email summary of key activities" },
                  };
                  const { label, desc } = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-[rgba(198,167,94,0.06)] last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${value ? "bg-gold-500" : "bg-white/10"}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${value ? "left-5.5" : "left-0.5"}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Appearance & Theme
                </h3>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-3">Color Mode</p>
                  <div className="flex gap-3">
                    {[
                      { mode: true, label: "Dark", icon: <Moon size={16} /> },
                      { mode: false, label: "Light", icon: <Sun size={16} /> },
                    ].map(({ mode, label, icon }) => (
                      <button
                        key={label}
                        onClick={() => setDarkMode(mode)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm ${
                          darkMode === mode
                            ? "bg-gold-500/10 border-gold-500/35 text-gold-400"
                            : "border-white/10 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {icon}
                        {label}
                        {darkMode === mode && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-3">Accent Color</p>
                  <div className="flex gap-3 flex-wrap">
                    {["#C6A75E", "#3B82F6", "#8B5CF6", "#10B981", "#F97316", "#EF4444"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className="w-9 h-9 rounded-full border-2 transition-all"
                        style={{
                          background: c,
                          borderColor: accentColor === c ? "#fff" : "transparent",
                          boxShadow: accentColor === c ? `0 0 10px ${c}60` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === "integrations" && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Integrations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTEGRATIONS.map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-white/4 rounded-xl border border-white/8 hover:border-[rgba(198,167,94,0.2)] transition-all">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: integration.color + "30", border: `1px solid ${integration.color}40` }}
                        >
                          {integration.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{integration.name}</p>
                          <p className="text-xs text-slate-500">{integration.desc}</p>
                        </div>
                      </div>
                      <button
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          integration.connected
                            ? "border-green-500/30 text-green-400 bg-green-500/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                            : "border-gold-500/30 text-gold-400 bg-gold-500/10 hover:bg-gold-500/20"
                        }`}
                      >
                        {integration.connected ? "Connected" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Team Members
                </h3>
                {[
                  { name: "Sarah Chen", role: "Senior Recruiter", email: "sarah@hireiq.ai", access: "Admin" },
                  { name: "Mike Ross", role: "Talent Coordinator", email: "mike@hireiq.ai", access: "Editor" },
                  { name: "Lisa Park", role: "HR Manager", email: "lisa@hireiq.ai", access: "Viewer" },
                ].map((member) => (
                  <div key={member.email} className="flex items-center gap-3 py-3 border-b border-[rgba(198,167,94,0.06)] last:border-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-600 to-navy-900 border border-[rgba(198,167,94,0.2)] flex items-center justify-center text-xs font-bold text-gold-400">
                      {member.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role} · {member.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      member.access === "Admin" ? "border-gold-500/30 text-gold-400 bg-gold-500/10" :
                      member.access === "Editor" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
                      "border-slate-500/30 text-slate-400 bg-slate-500/10"
                    }`}>
                      {member.access}
                    </span>
                  </div>
                ))}
                <button className="btn-outline text-sm py-2 px-4 mt-2">
                  Invite Team Member
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-100 pb-3 border-b border-[rgba(198,167,94,0.1)]">
                  Security Settings
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Current Password", type: "password" },
                    { label: "New Password", type: "password" },
                    { label: "Confirm New Password", type: "password" },
                  ].map(({ label, type }) => (
                    <div key={label}>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder="••••••••"
                        className="w-full max-w-sm bg-white/6 border border-[rgba(198,167,94,0.12)] rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-gold-500/50 transition-colors"
                      />
                    </div>
                  ))}
                  <button className="btn-gold text-sm py-2 px-4 mt-2">
                    Update Password
                  </button>
                </div>
                <div className="pt-4 border-t border-[rgba(198,167,94,0.1)]">
                  <p className="text-sm font-medium text-slate-300 mb-3">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500 mb-3">Add an extra layer of security to your account.</p>
                  <button className="btn-outline text-sm py-2 px-4">Enable 2FA</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
