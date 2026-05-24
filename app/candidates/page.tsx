"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KanbanBoard from "@/components/candidates/KanbanBoard";
import { CANDIDATES } from "@/lib/mock-data";
import type { Candidate, Stage } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Download,
  UserPlus,
} from "lucide-react";
import { getStageColor } from "@/lib/utils";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");

  const handleStageChange = (id: string, stage: Stage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage } : c))
    );
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStage = stageFilter === "All" || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stages = ["All", "Applied", "Screening", "Shortlisted", "Interview", "Hired", "Rejected"];

  return (
    <DashboardLayout title="Candidates">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100">
            Candidate Pipeline
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} candidates across {stages.length - 1} stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline text-sm py-2 px-3 gap-2">
            <Download size={13} />
            Export
          </button>
          <button className="btn-gold text-sm py-2 px-4">
            <UserPlus size={14} />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, role, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-navy-600/50 border border-[rgba(198,167,94,0.15)] rounded-xl text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        {/* Stage filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                stageFilter === stage
                  ? "bg-gold-500/15 text-gold-400 border-gold-500/35"
                  : "text-slate-500 border-white/8 hover:text-slate-300 hover:border-white/15"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/8 ml-auto">
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded-md transition-all ${view === "kanban" ? "bg-gold-500/15 text-gold-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-md transition-all ${view === "table" ? "bg-gold-500/15 text-gold-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "kanban" ? (
        <KanbanBoard candidates={filtered} onStageChange={handleStageChange} />
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(198,167,94,0.1)]">
                  {["Candidate", "Role", "Experience", "Skills", "ATS", "Match", "Stage", "Applied"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[rgba(198,167,94,0.06)] hover:bg-white/3 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-600 to-navy-900 border border-[rgba(198,167,94,0.2)] flex items-center justify-center text-[11px] font-bold text-gold-400">
                          {c.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-gold-400 transition-colors">{c.name}</p>
                          <p className="text-xs text-slate-600">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{c.role}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{c.experience}y</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.skills.slice(0, 2).map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/6 text-slate-400">{s}</span>
                        ))}
                        {c.skills.length > 2 && <span className="text-[10px] text-slate-600">+{c.skills.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${c.atsScore >= 85 ? "text-green-400" : c.atsScore >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                        {c.atsScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-gold-400">{c.matchScore}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStageColor(c.stage)}`}>
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                      {new Date(c.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
