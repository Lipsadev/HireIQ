"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  Mail,
  Sparkles,
  Copy,
  RefreshCw,
  ChevronDown,
  Check,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";

type EmailType = "Interview Invite" | "Rejection" | "Follow-up" | "Offer Letter" | "Onboarding";
type Tone = "Professional" | "Friendly" | "Formal" | "Enthusiastic";

const TEMPLATES: Record<EmailType, (name: string, role: string, tone: Tone) => string> = {
  "Interview Invite": (name, role, tone) =>
    tone === "Friendly"
      ? `Hi ${name},\n\nGreat news! We've reviewed your application for the ${role} position at HireIQ, and we'd love to chat with you further.\n\nWe'd like to schedule a 45-minute technical interview at your convenience next week. Please reply with your preferred time slots, and we'll get something locked in.\n\nLooking forward to connecting!\n\nBest,\nThe HireIQ Recruiting Team`
      : `Dear ${name},\n\nThank you for your interest in the ${role} position at HireIQ. After reviewing your application, we are pleased to invite you to the next stage of our hiring process.\n\nWe would like to schedule a 45-minute technical interview at your earliest convenience. Please reply with your availability for the upcoming week, and our recruiting team will confirm the time and video conferencing details.\n\nWe look forward to learning more about your background and discussing how your experience aligns with this exciting opportunity.\n\nKind regards,\nHR Recruiting Team\nHireIQ`,

  "Rejection": (name, role, tone) =>
    `Dear ${name},\n\nThank you for taking the time to apply for the ${role} position at HireIQ and for the effort you put into the interview process.\n\nAfter careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current requirements. This was a competitive process, and this decision in no way reflects negatively on your skills or experience.\n\nWe were genuinely impressed with your background and encourage you to apply for future openings that may be a better fit. We'll keep your profile on file for upcoming positions.\n\nWe wish you all the best in your job search.\n\nWarm regards,\nHR Team\nHireIQ`,

  "Follow-up": (name, role, tone) =>
    `Hi ${name},\n\nI wanted to follow up regarding your application for the ${role} role at HireIQ.\n\nWe are currently finalizing our interview schedule and wanted to ensure you are still interested and available. Our team has been thoroughly reviewing applications, and yours stood out to us.\n\nCould you please confirm your continued interest and share your availability for a brief introductory call this week or next?\n\nThank you for your patience, and we look forward to connecting soon.\n\nBest regards,\nRecruiting Team\nHireIQ`,

  "Offer Letter": (name, role, tone) =>
    `Dear ${name},\n\nOn behalf of the entire team at HireIQ, it is our absolute pleasure to extend a formal offer of employment for the position of ${role}.\n\nAfter a thorough interview process, it became clear that your skills, experience, and values are an exceptional match for our team and culture. We are truly excited about the prospect of you joining us.\n\nOffer Details:\n• Role: ${role}\n• Start Date: To be confirmed\n• Location: San Francisco, CA (Hybrid)\n• Compensation Package: As discussed\n\nPlease review the attached offer letter and indicate your acceptance by signing and returning within 5 business days. Our HR team is available to answer any questions you may have.\n\nWelcome to HireIQ!\n\nWarmly,\nHR Leadership Team\nHireIQ`,

  "Onboarding": (name, role, tone) =>
    `Hi ${name},\n\nWelcome to HireIQ! We are thrilled to have you joining us as our new ${role} — the entire team cannot wait to meet you.\n\nHere's what to expect for your first day:\n\n📅 Date: Your confirmed start date\n🕘 Time: 9:00 AM (local time)\n📍 Location: 100 Market Street, San Francisco, CA / Remote Link (sent separately)\n\nBefore day one, please:\n1. Complete the new hire paperwork in the HR portal (link attached)\n2. Set up your @hireiq.ai email account\n3. Review our onboarding guide (attached)\n\nYour manager will reach out separately to introduce themselves and share the first-week plan. If you have any questions before then, don't hesitate to reach out.\n\nWelcome aboard — this is the beginning of something great!\n\nExcitedly,\nThe HireIQ Team`,
};

export default function EmailGeneratorPage() {
  const [emailType, setEmailType] = useState<EmailType>("Interview Invite");
  const [tone, setTone] = useState<Tone>("Professional");
  const [candidateName, setCandidateName] = useState("Aisha Patel");
  const [jobRole, setJobRole] = useState("Senior Frontend Engineer");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailTypes: EmailType[] = ["Interview Invite", "Rejection", "Follow-up", "Offer Letter", "Onboarding"];
  const tones: Tone[] = ["Professional", "Friendly", "Formal", "Enthusiastic"];

  const handleGenerate = async () => {
    setGenerating(true);
    setEditing(false);
    await sleep(1500);
    const fn = TEMPLATES[emailType];
    setGeneratedEmail(fn(candidateName, jobRole, tone));
    setGenerating(false);
    toast.success("Email generated!", { icon: "✉️" });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Email copied to clipboard!");
  };

  return (
    <DashboardLayout title="Email Generator">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Mail size={18} className="text-gold-400" />
            AI Email Generator
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generate professional recruitment emails instantly with AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Config */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 space-y-5">
            {/* Email Type */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Email Type
              </label>
              <div className="space-y-1.5">
                {emailTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setEmailType(t)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all ${
                      emailType === t
                        ? "bg-gold-500/10 border-gold-500/30 text-gold-400 font-medium"
                        : "border-white/8 text-slate-400 hover:text-slate-200 hover:border-white/15"
                    }`}
                  >
                    {t}
                    {emailType === t && <Check size={13} className="float-right mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Tone
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`text-xs py-2 rounded-lg border transition-all ${
                      tone === t
                        ? "bg-gold-500/15 text-gold-400 border-gold-500/35 font-medium"
                        : "text-slate-500 border-white/8 hover:text-slate-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Name */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Candidate Name
              </label>
              <input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-white/6 border border-[rgba(198,167,94,0.15)] rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-gold-500/50 transition-colors"
                placeholder="Candidate name..."
              />
            </div>

            {/* Job Role */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Job Role
              </label>
              <input
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full bg-white/6 border border-[rgba(198,167,94,0.15)] rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-gold-500/50 transition-colors"
                placeholder="Job role..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-gold w-full justify-center py-3 disabled:opacity-50"
            >
              {generating ? (
                <><RefreshCw size={14} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={14} /> Generate Email</>
              )}
            </button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="lg:col-span-3">
          <div className="glass-card overflow-hidden h-full flex flex-col">
            {/* Email header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(198,167,94,0.1)] bg-white/2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-slate-500 font-medium">{emailType} · {tone}</span>
              <div className="flex items-center gap-2">
                {generatedEmail && (
                  <>
                    <button
                      onClick={() => setEditing(!editing)}
                      className="text-xs text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/6"
                    >
                      <Edit3 size={11} />
                      {editing ? "Preview" : "Edit"}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/6"
                    >
                      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Email body */}
            <div className="flex-1 p-6">
              {generating ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-t-2 border-gold-500 animate-spin" />
                      <Mail size={18} className="text-gold-400 absolute inset-0 m-auto" />
                    </div>
                    <p className="text-slate-500 text-sm">Composing your email...</p>
                  </div>
                </div>
              ) : generatedEmail ? (
                editing ? (
                  <textarea
                    value={generatedEmail}
                    onChange={(e) => setGeneratedEmail(e.target.value)}
                    className="w-full h-full min-h-[400px] bg-transparent text-sm text-slate-200 leading-relaxed outline-none resize-none font-mono"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert prose-sm max-w-none"
                  >
                    {generatedEmail.split("\n").map((line, i) => (
                      <p key={i} className={`text-sm leading-relaxed ${line === "" ? "h-4" : "text-slate-300"}`}>
                        {line || " "}
                      </p>
                    ))}
                  </motion.div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Mail size={36} className="text-slate-700 mb-4" />
                  <p className="text-slate-500 font-medium">Your email will appear here</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Configure settings and click <span className="text-gold-400">Generate Email</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
