"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Sparkles,
  User,
  Briefcase,
  Mail,
  Phone,
  Building2,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { saveProfile, hasCompletedOnboarding } from "@/lib/profile";
import { toast } from "sonner";

const FIELDS = [
  { key: "fullName", label: "Full Name", placeholder: "Jane Smith", icon: User, type: "text" },
  { key: "jobTitle", label: "Job Title", placeholder: "Head of Talent Acquisition", icon: Briefcase, type: "text" },
  { key: "email", label: "Work Email", placeholder: "jane@company.com", icon: Mail, type: "email" },
  { key: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", icon: Phone, type: "tel" },
  { key: "company", label: "Company", placeholder: "Acme Corp", icon: Building2, type: "text" },
  { key: "location", label: "Location", placeholder: "San Francisco, CA", icon: MapPin, type: "text" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<FieldKey, string>>({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    company: "",
    location: "",
  });

  // Redirect if already onboarded
  useEffect(() => {
    if (hasCompletedOnboarding()) {
      router.replace("/dashboard");
    }
  }, [router]);

  // Pre-fill from Clerk user data
  useEffect(() => {
    if (isLoaded && user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [isLoaded, user]);

  const handleChange = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      toast.error("Full Name and Email are required.");
      return;
    }
    setSaving(true);
    try {
      // Save to localStorage
      saveProfile(form);

      // Also update Clerk user metadata
      if (user) {
        await user.update({
          firstName: form.fullName.split(" ")[0],
          lastName: form.fullName.split(" ").slice(1).join(" "),
          unsafeMetadata: {
            jobTitle: form.jobTitle,
            phone: form.phone,
            company: form.company,
            location: form.location,
          },
        });
      }

      toast.success("Profile saved! Welcome to HireIQ 🎉");
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob w-[500px] h-[500px] bg-gold-500 top-1/4 -left-48" />
        <div className="blob w-[400px] h-[400px] bg-purple-600 bottom-0 right-0 translate-x-1/3" />
        <div className="blob w-[250px] h-[250px] bg-blue-600 top-10 right-1/3" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(198,167,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,94,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/30">
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-display font-bold text-2xl text-gradient-gold">HireIQ</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-medium mb-4">
            <CheckCircle2 size={12} />
            Account created successfully
          </div>

          <h1 className="text-3xl font-bold font-display text-slate-100 mb-2">
            Complete your profile
          </h1>
          <p className="text-sm text-slate-400">
            Help us personalize HireIQ for you. This takes less than a minute.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          {/* Progress indicator */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-1 rounded-full bg-gold-500/80" />
            <span className="text-xs text-slate-500 whitespace-nowrap">Step 2 of 2</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELDS.map((field, i) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">
                    {field.label}
                    {(field.key === "fullName" || field.key === "email") && (
                      <span className="text-gold-500 ml-1">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <field.icon
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-[rgba(198,167,94,0.15)] rounded-xl text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-gold-500/50 focus:bg-white/8 transition-all"
                      style={{
                        background: undefined,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={saving}
                className="btn-gold w-full justify-center py-3.5 text-base gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Go to Dashboard
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            You can update this anytime in{" "}
            <span className="text-gold-500/70">Settings → Profile</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
