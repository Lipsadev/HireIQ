"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  RefreshCw,
  Copy,
  Download,
  ChevronDown,
  Code2,
  Users,
  Heart,
  Briefcase,
  Plus,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";

type QuestionType = "Technical" | "Behavioral" | "HR" | "Project";
type Difficulty = "Easy" | "Medium" | "Hard" | "Mixed";

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  difficulty: Difficulty;
  followUp?: string;
}

const QUESTION_BANK: Record<string, Question[]> = {
  "Frontend Engineer": [
    { id: "q1", type: "Technical", question: "Explain the difference between useMemo and useCallback in React. When would you use each?", difficulty: "Medium" },
    { id: "q2", type: "Technical", question: "How does React's reconciliation algorithm work? What is the virtual DOM?", difficulty: "Hard", followUp: "How would you optimize a component that re-renders too frequently?" },
    { id: "q3", type: "Technical", question: "What are CSS Custom Properties (CSS Variables)? How do you use them with JavaScript?", difficulty: "Easy" },
    { id: "q4", type: "Technical", question: "Describe the browser's critical rendering path and how you can optimize it.", difficulty: "Hard" },
    { id: "q5", type: "Behavioral", question: "Tell me about a time you had to refactor a large codebase. What was your approach?", difficulty: "Medium" },
    { id: "q6", type: "Behavioral", question: "Describe a conflict you had with a designer over a technical decision. How did you resolve it?", difficulty: "Medium" },
    { id: "q7", type: "HR", question: "Where do you see yourself in 3 years, and how does this role fit your career goals?", difficulty: "Easy" },
    { id: "q8", type: "HR", question: "What does 'good code' mean to you? How do you balance speed vs quality?", difficulty: "Easy" },
    { id: "q9", type: "Project", question: "Walk me through your most complex project. What were the main technical challenges?", difficulty: "Medium", followUp: "What would you do differently if you started over?" },
    { id: "q10", type: "Project", question: "Have you built any component libraries or design systems? Explain the architecture.", difficulty: "Hard" },
  ],
  "Data Scientist": [
    { id: "q1", type: "Technical", question: "Explain the bias-variance tradeoff and how it affects model selection.", difficulty: "Hard" },
    { id: "q2", type: "Technical", question: "When would you use XGBoost vs a neural network for a classification task?", difficulty: "Hard" },
    { id: "q3", type: "Technical", question: "How do you handle class imbalance in a dataset?", difficulty: "Medium" },
    { id: "q4", type: "Behavioral", question: "Describe a time your model performed poorly in production. How did you debug it?", difficulty: "Medium" },
    { id: "q5", type: "HR", question: "How do you communicate model uncertainty and limitations to non-technical stakeholders?", difficulty: "Medium" },
    { id: "q6", type: "Project", question: "Walk me through a production ML pipeline you've built end-to-end.", difficulty: "Hard" },
  ],
  "Product Manager": [
    { id: "q1", type: "Technical", question: "How do you prioritize features when you have more requests than capacity?", difficulty: "Medium" },
    { id: "q2", type: "Technical", question: "Walk me through how you would design a product metrics framework from scratch.", difficulty: "Hard" },
    { id: "q3", type: "Behavioral", question: "Tell me about a product decision you made that turned out to be wrong. What did you learn?", difficulty: "Medium" },
    { id: "q4", type: "HR", question: "How do you build alignment between engineering, design, and sales teams?", difficulty: "Easy" },
    { id: "q5", type: "Project", question: "Describe a product you've shipped that you're most proud of. What was your impact?", difficulty: "Medium" },
  ],
};

const TYPE_CONFIG: Record<QuestionType, { icon: React.ElementType; color: string; bg: string }> = {
  Technical: { icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/25" },
  Behavioral: { icon: Users, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/25" },
  HR: { icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/25" },
  Project: { icon: Briefcase, color: "text-gold-400", bg: "bg-gold-500/10 border-gold-500/25" },
};

const DIFF_COLOR: Record<Difficulty, string> = {
  Easy: "text-green-400 bg-green-500/10 border-green-500/25",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  Hard: "text-red-400 bg-red-500/10 border-red-500/25",
  Mixed: "text-slate-400 bg-slate-500/10 border-slate-500/25",
};

export default function InterviewsPage() {
  const [role, setRole] = useState("Frontend Engineer");
  const [difficulty, setDifficulty] = useState<Difficulty>("Mixed");
  const [types, setTypes] = useState<QuestionType[]>(["Technical", "Behavioral", "HR", "Project"]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const roles = Object.keys(QUESTION_BANK);

  const toggleType = (t: QuestionType) => {
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setQuestions([]);
    await sleep(1800);
    const pool = QUESTION_BANK[role] || QUESTION_BANK["Frontend Engineer"];
    const filtered = pool.filter(
      (q) =>
        types.includes(q.type) &&
        (difficulty === "Mixed" || q.difficulty === difficulty)
    );
    setQuestions(filtered);
    setGenerating(false);
    toast.success(`Generated ${filtered.length} interview questions!`, { icon: "🧠" });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success("Question copied!");
  };

  const handleCopyAll = () => {
    const text = questions
      .map((q, i) => `${i + 1}. [${q.type}] ${q.question}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast.success("All questions copied!");
  };

  return (
    <DashboardLayout title="Interview AI">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BrainCircuit size={18} className="text-gold-400" />
            AI Interview Question Generator
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generate role-specific, difficulty-calibrated interview questions instantly.
          </p>
        </div>
        {questions.length > 0 && (
          <button onClick={handleCopyAll} className="btn-outline text-sm py-2 px-4">
            <Copy size={13} />
            Copy All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5 space-y-5">
            {/* Role Select */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Job Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/6 border border-[rgba(198,167,94,0.15)] rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none appearance-none cursor-pointer focus:border-gold-500/50 transition-colors"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-navy-600">
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Difficulty
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["Mixed", "Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`text-xs py-2 rounded-lg border transition-all ${
                      difficulty === d
                        ? "bg-gold-500/15 text-gold-400 border-gold-500/35"
                        : "text-slate-500 border-white/8 hover:text-slate-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Types */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Question Types
              </label>
              <div className="space-y-2">
                {(["Technical", "Behavioral", "HR", "Project"] as QuestionType[]).map((t) => {
                  const { icon: Icon, color } = TYPE_CONFIG[t];
                  const active = types.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                        active
                          ? "bg-gold-500/8 border-gold-500/25 text-slate-200"
                          : "border-white/8 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <Icon size={14} className={active ? color : "text-slate-600"} />
                      {t}
                      {active && <Check size={12} className="ml-auto text-gold-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || types.length === 0}
              className="btn-gold w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Generate Questions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Questions Panel */}
        <div className="lg:col-span-3">
          {questions.length === 0 && !generating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-16 text-center"
            >
              <BrainCircuit size={40} className="text-slate-600 mx-auto mb-4" />
              <h3 className="text-slate-400 font-medium mb-2">No questions generated yet</h3>
              <p className="text-sm text-slate-600">
                Configure your settings and click <span className="text-gold-400">Generate Questions</span>
              </p>
            </motion.div>
          ) : generating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-16 text-center"
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-t-2 border-gold-500 animate-spin" />
                <BrainCircuit size={22} className="text-gold-400 absolute inset-0 m-auto" />
              </div>
              <p className="text-slate-400">Generating tailored questions for <span className="text-gold-400 font-semibold">{role}</span>...</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, i) => {
                const { icon: Icon, color, bg } = TYPE_CONFIG[q.type];
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass-card p-5 group hover:border-[rgba(198,167,94,0.28)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${bg}`}>
                          <Icon size={13} className={color} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${bg} ${color}`}>
                              {q.type}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFF_COLOR[q.difficulty]}`}>
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-600">Q{i + 1}</span>
                          </div>
                          <p className="text-sm text-slate-200 leading-relaxed">{q.question}</p>
                          {q.followUp && (
                            <p className="text-xs text-slate-500 mt-2 pl-3 border-l border-gold-500/30 italic">
                              Follow-up: {q.followUp}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(q.id, q.question)}
                        className="text-slate-600 hover:text-gold-400 transition-colors mt-1 shrink-0"
                      >
                        {copied === q.id ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
