"use client";

import { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  Copy,
  RefreshCw,
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin,
  Code2,
  Award,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { sleep, getScoreColor } from "@/lib/utils";

// Simulated AI analysis result
const MOCK_ANALYSIS = {
  name: "Aisha Patel",
  email: "aisha.patel@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/aisha-patel",
  github: "github.com/aishapatel",
  education: "B.Tech Computer Science — IIT Bombay (2018)",
  experience: "5 years",
  currentRole: "Senior Frontend Engineer at TechCorp",
  skills: {
    strong: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
    moderate: ["Node.js", "PostgreSQL", "AWS"],
    missing: ["Docker", "Kubernetes", "CI/CD"],
  },
  atsScore: 92,
  summary:
    "Frontend-focused engineer with strong React and TypeScript expertise. Excellent project portfolio with experience in high-scale production systems. Strong understanding of performance optimization and modern design systems. Demonstrated ability to lead frontend architecture decisions.",
  certifications: ["AWS Cloud Practitioner", "React Advanced Certification"],
  projects: ["E-commerce platform (React + GraphQL)", "Design System Library", "Real-time Dashboard"],
  recommendations: [
    "Consider adding Docker experience to strengthen DevOps skills",
    "Backend skills could be strengthened with more cloud architecture experience",
    "Excellent communication demonstrated through open-source contributions",
  ],
};

function UploadZone({ onUpload }: { onUpload: (file: File) => void }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
        dragOver
          ? "border-gold-500 bg-gold-500/8 scale-[1.01]"
          : "border-[rgba(198,167,94,0.25)] hover:border-[rgba(198,167,94,0.5)] hover:bg-white/3"
      }`}
      onClick={() => document.getElementById("resume-input")?.click()}
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-gold-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

      <input
        id="resume-input"
        type="file"
        accept=".pdf,.docx,.doc"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
      />

      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mx-auto mb-4">
          <Upload size={26} className="text-gold-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">
          Drop your resume here
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          or <span className="text-gold-400 underline underline-offset-2">browse files</span>
        </p>
        <div className="flex items-center justify-center gap-3">
          {["PDF", "DOCX", "DOC"].map((fmt) => (
            <span
              key={fmt}
              className="text-xs px-3 py-1 rounded-full bg-white/6 text-slate-400 border border-white/10"
            >
              {fmt}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">Max file size: 10 MB</p>
      </div>
    </motion.div>
  );
}

function LoadingAnalysis() {
  const steps = [
    "Parsing resume structure...",
    "Extracting candidate information...",
    "Analyzing skill set...",
    "Calculating ATS compatibility score...",
    "Generating AI summary...",
    "Detecting improvement areas...",
  ];
  const [step, setStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 600);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-12 text-center"
    >
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-gold-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-gold-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-gold-400" size={22} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">AI is analyzing your resume</h3>
      <p className="text-sm text-gold-400 font-medium">{steps[step]}</p>
      <div className="flex justify-center gap-1.5 mt-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i <= step ? "bg-gold-500 w-6" : "bg-white/10 w-3"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AnalysisResult({ file }: { file: File }) {
  const [summary, setSummary] = useState(MOCK_ANALYSIS.summary);
  const [regenerating, setRegenerate] = useState(false);

  const handleRegenerate = async () => {
    setRegenerate(true);
    await sleep(1500);
    setSummary(
      "Senior frontend engineer demonstrating exceptional React and TypeScript mastery. Strong track record of building scalable design systems and high-performance web applications. Moderate backend exposure with clear potential to expand into full-stack roles."
    );
    setRegenerate(false);
    toast.success("Summary regenerated!");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const a = MOCK_ANALYSIS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* File Header */}
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center">
          <FileText size={18} className="text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
          <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB · Analyzed by AI</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-full">
          <CheckCircle2 size={11} />
          Analysis Complete
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Candidate Info */}
        <div className="space-y-4">
          {/* ATS Score */}
          <div className="glass-card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 to-transparent" />
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 relative">ATS Score</p>
            <div className="relative">
              <div
                className={`text-5xl font-bold font-display ${getScoreColor(a.atsScore)}`}
              >
                {a.atsScore}
              </div>
              <div className="text-sm text-slate-500 mb-4">/ 100</div>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${a.atsScore}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
              />
            </div>
            <p className="text-xs text-green-400 mt-2 font-medium">Excellent Match</p>
          </div>

          {/* Contact Info */}
          <div className="glass-card p-4 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Extracted Info</h4>
            {[
              { icon: <User size={12} />, value: a.name },
              { icon: <Mail size={12} />, value: a.email },
              { icon: <Phone size={12} />, value: a.phone },
              { icon: <MapPin size={12} />, value: a.location },
              { icon: <Briefcase size={12} />, value: a.experience + " experience" },
              { icon: <GraduationCap size={12} />, value: a.education },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm">
                <span className="text-slate-500 mt-0.5 shrink-0">{item.icon}</span>
                <span className="text-slate-300 text-xs leading-relaxed">{item.value}</span>
              </div>
            ))}
            {a.github && (
              <div className="flex items-center gap-2.5 text-sm">
                <Github size={12} className="text-slate-500" />
                <a href="#" className="text-xs text-blue-400 hover:underline">{a.github}</a>
              </div>
            )}
            {a.linkedin && (
              <div className="flex items-center gap-2.5 text-sm">
                <Linkedin size={12} className="text-slate-500" />
                <a href="#" className="text-xs text-blue-400 hover:underline">{a.linkedin}</a>
              </div>
            )}
          </div>
        </div>

        {/* Center + Right: Analysis */}
        <div className="lg:col-span-2 space-y-4">
          {/* AI Summary */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-gold-400" />
                <h4 className="text-sm font-semibold text-slate-100">AI Summary</h4>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="text-xs text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/6"
                >
                  <RefreshCw size={11} className={regenerating ? "animate-spin" : ""} />
                  Regenerate
                </button>
                <button
                  onClick={() => handleCopy(summary)}
                  className="text-xs text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/6"
                >
                  <Copy size={11} />
                  Copy
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/4 rounded-xl p-3 border border-white/6">
              {summary}
            </p>
          </div>

          {/* Skills Analysis */}
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Code2 size={14} className="text-gold-400" />
              Skills Analysis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-green-400 font-semibold mb-2 flex items-center gap-1">
                  <CheckCircle2 size={11} /> Strong Skills
                </p>
                <div className="space-y-1.5">
                  {a.skills.strong.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 text-xs text-slate-300 bg-green-500/8 border border-green-500/20 px-2.5 py-1 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-yellow-400 font-semibold mb-2 flex items-center gap-1">
                  <Star size={11} /> Moderate
                </p>
                <div className="space-y-1.5">
                  {a.skills.moderate.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 text-xs text-slate-300 bg-yellow-500/8 border border-yellow-500/20 px-2.5 py-1 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1">
                  <XCircle size={11} /> Missing Skills
                </p>
                <div className="space-y-1.5">
                  {a.skills.missing.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 text-xs text-slate-300 bg-red-500/8 border border-red-500/20 px-2.5 py-1 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications + Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award size={11} className="text-gold-400" /> Certifications
              </h4>
              <ul className="space-y-2">
                {a.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={11} className="text-green-400 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp size={11} className="text-gold-400" /> Key Projects
              </h4>
              <ul className="space-y-2">
                {a.projects.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500/70 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="glass-card p-5 border border-amber-500/15 bg-amber-500/4">
            <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <AlertTriangle size={14} />
              AI Recommendations
            </h4>
            <ul className="space-y-2">
              {a.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleUpload = async (f: File) => {
    setFile(f);
    setAnalyzing(true);
    setAnalyzed(false);
    await sleep(3500);
    setAnalyzing(false);
    setAnalyzed(true);
    toast.success("Resume analyzed successfully!", { icon: "🧠" });
  };

  const handleReset = () => {
    setFile(null);
    setAnalyzing(false);
    setAnalyzed(false);
  };

  return (
    <DashboardLayout title="AI Resume Analyzer">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles size={18} className="text-gold-400" />
            AI Resume Analyzer
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload a resume and let AI extract insights, calculate ATS score, and generate a recruiter summary.
          </p>
        </div>
        {(analyzed || analyzing) && (
          <button onClick={handleReset} className="btn-outline text-sm py-2 px-4">
            Analyze Another
          </button>
        )}
      </div>

      {/* Capability chips */}
      {!file && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "📊 ATS Score Calculation",
            "🧠 AI Summary Generation",
            "💡 Skill Gap Analysis",
            "📋 Info Extraction",
            "⭐ Candidate Ranking",
            "🔍 Missing Skills Detection",
          ].map((feature) => (
            <span
              key={feature}
              className="text-xs px-3 py-1.5 rounded-full bg-gold-500/8 text-gold-400 border border-gold-500/20"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!file && !analyzing && !analyzed && (
          <motion.div key="upload" exit={{ opacity: 0, scale: 0.95 }}>
            <UploadZone onUpload={handleUpload} />
          </motion.div>
        )}
        {analyzing && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LoadingAnalysis />
          </motion.div>
        )}
        {analyzed && file && (
          <motion.div key="result" initial={{ opacity: 0 }}>
            <AnalysisResult file={file} />
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
