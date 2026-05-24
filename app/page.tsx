"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  BrainCircuit,
  FileText,
  BarChart3,
  Users,
  Mail,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Play,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI Resume Analysis",
    desc: "Extract skills, calculate ATS scores, and generate recruiter-friendly summaries in seconds.",
    color: "#C6A75E",
  },
  {
    icon: Users,
    title: "Candidate Pipeline",
    desc: "Kanban-style candidate management with drag-and-drop workflow across all hiring stages.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart3,
    title: "Hiring Analytics",
    desc: "Deep insights into time-to-hire, funnel conversion, skill demand, and recruiter performance.",
    color: "#3B82F6",
  },
  {
    icon: FileText,
    title: "Smart Interview AI",
    desc: "Generate role-specific technical, behavioral, and HR questions tailored to each candidate.",
    color: "#10B981",
  },
  {
    icon: Mail,
    title: "AI Email Generator",
    desc: "Craft professional interview invites, offer letters, and rejection emails with perfect tone.",
    color: "#F59E0B",
  },
  {
    icon: Shield,
    title: "Bias Detection",
    desc: "Analyze job descriptions for exclusionary language and receive inclusive alternative suggestions.",
    color: "#EF4444",
  },
];

const TESTIMONIALS = [
  {
    quote: "HireIQ cut our time-to-hire by 40%. The AI resume analyzer alone saves us hours every day.",
    author: "Sarah Chen",
    role: "VP of Talent, TechCorp",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The candidate pipeline is incredibly intuitive. Our whole team onboarded in a single afternoon.",
    author: "Marcus Johnson",
    role: "Head of HR, Finova",
    avatar: "MJ",
    rating: 5,
  },
  {
    quote: "The analytics dashboard gives us data we never had before. We can finally predict hiring bottlenecks.",
    author: "Priya Sharma",
    role: "Talent Ops Lead, Nexus",
    avatar: "PS",
    rating: 5,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "Perfect for small teams just getting started",
    features: [
      "Up to 5 team members",
      "100 AI resume analyses/mo",
      "Basic candidate pipeline",
      "Email generator",
      "Standard analytics",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    desc: "For growing teams with serious hiring needs",
    features: [
      "Up to 25 team members",
      "Unlimited AI resume analyses",
      "Advanced Kanban pipeline",
      "Interview question AI",
      "Advanced analytics & reports",
      "Bias detection",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations requiring custom solutions",
    features: [
      "Unlimited team members",
      "Custom AI model training",
      "SSO & enterprise security",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const COMPANIES = ["Google", "Stripe", "Vercel", "Airbnb", "Notion", "Linear", "Figma", "Intercom"];

const STATS = [
  { value: "2.4M+", label: "Resumes Analyzed", icon: <FileText size={18} /> },
  { value: "87%", label: "Faster Time-to-Hire", icon: <Clock size={18} /> },
  { value: "94%", label: "Customer Satisfaction", icon: <Star size={18} /> },
  { value: "500+", label: "Enterprise Clients", icon: <Globe size={18} /> },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[rgba(198,167,94,0.1)] bg-[#0D1117]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-900" />
            </div>
            <span className="font-display font-bold text-xl text-gradient-gold">HireIQ</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {["Features", "Analytics", "Pricing", "Integrations"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="btn-outline text-sm py-2 px-4">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-gold text-sm py-2 px-4">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ─────────── HERO ─────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="blob w-[600px] h-[600px] bg-gold-500 top-1/4 -left-48" />
          <div className="blob w-[500px] h-[500px] bg-purple-600 bottom-0 right-0 translate-x-1/3" />
          <div className="blob w-[300px] h-[300px] bg-blue-600 top-10 right-1/3" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,167,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,94,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-sm font-medium mb-8"
            >
              <Sparkles size={13} />
              AI-Powered Recruitment Platform
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold font-display leading-[1.05] mb-6"
            >
              Hire{" "}
              <span
                className="text-gradient-gold"
                style={{ WebkitTextStroke: "0px" }}
              >
                Smarter
              </span>
              {" "}with
              <br />
              the Power of{" "}
              <span className="relative">
                <span className="text-gradient-gold">AI</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-transparent origin-left"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              HireIQ automates resume screening, ranks candidates, generates interviews,
              and delivers deep hiring analytics — all powered by cutting-edge AI.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link href="/dashboard" className="btn-gold text-base py-4 px-8 gap-2.5">
                Start Free — No Card Required
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 text-slate-300 hover:text-gold-400 transition-colors text-sm py-4 px-6"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={12} className="ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-slate-600 flex items-center justify-center gap-2"
            >
              <span className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="w-5 h-5 rounded-full border border-[#0D1117] -ml-1 bg-gradient-to-br from-gold-400 to-gold-600 first:ml-0" />
                ))}
              </span>
              Trusted by <span className="text-gold-400 font-semibold">500+ companies</span> worldwide
            </motion.p>
          </div>

          {/* Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ y: heroY, opacity: heroOpacity }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="glass-card p-2 border border-[rgba(198,167,94,0.2)] shadow-gold-lg rounded-3xl overflow-hidden">
              {/* Fake dashboard UI */}
              <div className="bg-[#111827] rounded-2xl overflow-hidden">
                {/* Top bar */}
                <div className="h-10 bg-[#141c2e] flex items-center px-4 gap-3 border-b border-[rgba(198,167,94,0.08)]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center text-[11px] text-slate-600 font-mono">
                    app.hireiq.ai/dashboard
                  </div>
                </div>

                {/* Dashboard preview content */}
                <div className="flex">
                  {/* Mini sidebar */}
                  <div className="w-14 bg-[#141c2e] flex flex-col items-center py-4 gap-4 border-r border-[rgba(198,167,94,0.06)]">
                    <div className="w-6 h-6 rounded-md bg-gold-500/20 border border-gold-500/30" />
                    {[Users, FileText, BarChart3, Mail].map((Icon, i) => (
                      <Icon key={i} size={14} className="text-slate-600" />
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-5">
                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-3 mb-5">
                      {[
                        { v: "1,248", l: "Applicants", c: "#C6A75E" },
                        { v: "18", l: "Active Jobs", c: "#8B5CF6" },
                        { v: "42", l: "Interviews", c: "#F59E0B" },
                        { v: "87", l: "Hired", c: "#10B981" },
                      ].map(({ v, l, c }) => (
                        <div key={l} className="bg-[#1A2235] rounded-xl p-3 border border-[rgba(198,167,94,0.08)]">
                          <div className="text-xl font-bold font-display" style={{ color: c }}>{v}</div>
                          <div className="text-[10px] text-slate-500">{l}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart placeholder */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 bg-[#1A2235] rounded-xl p-3 h-28 border border-[rgba(198,167,94,0.08)] flex items-end gap-1 px-5 pb-4">
                        {[40, 65, 55, 78, 62, 85, 72, 92].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 7 ? "#C6A75E" : "rgba(198,167,94,0.2)" }} />
                        ))}
                      </div>
                      <div className="bg-[#1A2235] rounded-xl p-3 h-28 border border-[rgba(198,167,94,0.08)] space-y-2 flex flex-col justify-center px-4">
                        {[100, 75, 50, 30, 10].map((w, i) => (
                          <div key={i} className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${w}%`, background: ["#3B82F6", "#8B5CF6", "#F59E0B", "#F97316", "#10B981"][i] }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-10 bg-gradient-radial from-gold-500/8 to-transparent rounded-full -z-10 blur-xl" />
          </motion.div>
        </div>
      </section>

      {/* ─────────── TRUSTED BY ─────────── */}
      <section className="py-16 border-t border-[rgba(198,167,94,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {COMPANIES.map((company) => (
              <span
                key={company}
                className="text-slate-600 font-semibold text-sm hover:text-slate-400 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#111827]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-[rgba(198,167,94,0.35)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold font-display text-gradient-gold mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-gold-400 font-semibold uppercase tracking-widest mb-3 block">
              Everything You Need
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Built for modern{" "}
              <span className="text-gradient-gold">recruiting teams</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From resume screening to offer letters, HireIQ handles your entire recruitment lifecycle with AI precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover p-6 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <feature.icon size={20} style={{ color: feature.color }} />
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── AI SHOWCASE ─────────── */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#111827]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-widest mb-3 block">
                AI Workflow
              </span>
              <h2 className="text-4xl font-bold font-display mb-6">
                From resume upload to{" "}
                <span className="text-gradient-gold">hiring decision</span>
                {" "}in minutes
              </h2>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Upload Resume", desc: "Upload any PDF or DOCX resume to the analyzer." },
                  { step: "02", title: "AI Extracts Data", desc: "AI automatically extracts skills, experience, education, and contact info." },
                  { step: "03", title: "Score & Rank", desc: "Candidates are scored on ATS compatibility and job match percentage." },
                  { step: "04", title: "Move to Pipeline", desc: "Push top candidates directly into your hiring pipeline with one click." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-xs font-bold text-gold-400 shrink-0 mt-0.5">
                      {step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="btn-gold mt-8 inline-flex">
                Try Resume Analyzer <ArrowRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={15} className="text-gold-400" />
                <span className="text-sm font-semibold text-slate-100">AI Analysis Result</span>
                <span className="ml-auto text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Complete</span>
              </div>

              <div className="text-center py-4">
                <div className="text-5xl font-bold text-green-400 font-display">92</div>
                <div className="text-sm text-slate-500">ATS Score / 100</div>
                <div className="h-2 bg-white/8 rounded-full mt-3 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Strong", items: ["React", "TypeScript", "Next.js"], color: "text-green-400 bg-green-500/8 border-green-500/20" },
                  { label: "Moderate", items: ["Node.js", "AWS", "SQL"], color: "text-yellow-400 bg-yellow-500/8 border-yellow-500/20" },
                  { label: "Missing", items: ["Docker", "K8s", "CI/CD"], color: "text-red-400 bg-red-500/8 border-red-500/20" },
                ].map(({ label, items, color }) => (
                  <div key={label}>
                    <p className={`text-[10px] font-semibold mb-1.5 px-1 ${color.split(" ")[0]}`}>{label}</p>
                    {items.map((s) => (
                      <div key={s} className={`text-[10px] px-2 py-1 rounded-lg border mb-1 ${color}`}>{s}</div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="bg-white/4 rounded-xl p-3 border border-white/8 text-xs text-slate-300 leading-relaxed italic">
                "Frontend-focused engineer with strong React and TypeScript expertise. Excellent project portfolio with high-scale production experience..."
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── TESTIMONIALS ─────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Loved by <span className="text-gradient-gold">HR teams</span> worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xs font-bold text-slate-900">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── PRICING ─────────── */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-transparent to-[#111827]/60">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Simple, <span className="text-gradient-gold">transparent</span> pricing
            </h2>
            <p className="text-slate-400">No hidden fees. 14-day free trial on all plans.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative glass-card p-7 flex flex-col ${
                  plan.popular ? "border-gold-500/40 shadow-gold" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-900 text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-400 mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold font-display text-slate-100">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-500">{plan.desc}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-gold-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={plan.popular ? "btn-gold justify-center text-sm py-3" : "btn-outline justify-center text-sm py-3"}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card p-14 overflow-hidden"
          >
            <div className="blob w-80 h-80 bg-gold-500 top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
            <div className="blob w-60 h-60 bg-purple-600 bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                <Zap size={24} className="text-gold-400" />
              </div>
              <h2 className="text-4xl font-bold font-display mb-4">
                Ready to transform your{" "}
                <span className="text-gradient-gold">hiring process?</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Join 500+ companies hiring smarter with HireIQ AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="btn-gold text-base py-4 px-8">
                  Start Free Trial <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard" className="btn-outline text-base py-4 px-8">
                  Book a Demo
                </Link>
              </div>
              <p className="text-xs text-slate-600 mt-5">No credit card required · 14-day free trial · Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="border-t border-[rgba(198,167,94,0.08)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                </div>
                <span className="font-display font-bold text-lg text-gradient-gold">HireIQ</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Smarter hiring powered by AI. The platform built for modern recruiting teams.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Analytics", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "GDPR", "Security"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-sm font-semibold text-slate-300 mb-3">{title}</p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-gold-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(198,167,94,0.06)] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              © 2024 HireIQ Inc. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              Built with <span className="text-gold-400">♥</span> for modern HR teams
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
