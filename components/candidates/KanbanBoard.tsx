"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Candidate, Stage } from "@/lib/types";
import { STAGES } from "@/lib/utils";
import { getStageColor, getScoreColor } from "@/lib/utils";
import {
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  Star,
  MoreHorizontal,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface CandidateCardProps {
  candidate: Candidate;
  onStageChange: (id: string, stage: Stage) => void;
}

const STAGE_CONFIG: Record<Stage, { color: string; bg: string; border: string }> = {
  Applied: { color: "#3B82F6", bg: "bg-blue-500/8", border: "border-blue-500/25" },
  Screening: { color: "#8B5CF6", bg: "bg-purple-500/8", border: "border-purple-500/25" },
  Shortlisted: { color: "#F59E0B", bg: "bg-yellow-500/8", border: "border-yellow-500/25" },
  Interview: { color: "#F97316", bg: "bg-orange-500/8", border: "border-orange-500/25" },
  Hired: { color: "#10B981", bg: "bg-green-500/8", border: "border-green-500/25" },
  Rejected: { color: "#EF4444", bg: "bg-red-500/8", border: "border-red-500/25" },
};

function CandidateCard({ candidate: c, onStageChange }: CandidateCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const config = STAGE_CONFIG[c.stage];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="relative bg-navy-600 border border-[rgba(198,167,94,0.12)] rounded-xl p-4 group cursor-pointer hover:border-[rgba(198,167,94,0.28)] hover:shadow-gold transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-600 to-navy-900 border border-[rgba(198,167,94,0.25)] flex items-center justify-center text-xs font-bold text-gold-400">
            {c.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 group-hover:text-gold-300 transition-colors">
              {c.name}
            </p>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <MapPin size={9} /> {c.location}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-600 hover:text-slate-300 hover:bg-white/8 transition-all"
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 w-40 bg-navy-600 border border-[rgba(198,167,94,0.2)] rounded-xl shadow-gold-lg z-10 overflow-hidden">
              {STAGES.filter((s) => s !== c.stage).map((stage) => (
                <button
                  key={stage}
                  onClick={() => { onStageChange(c.id, stage); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/8 hover:text-gold-400 transition-colors"
                >
                  Move to {stage}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Role */}
      <div className="flex items-center gap-1.5 mb-3">
        <Briefcase size={11} className="text-slate-500" />
        <p className="text-xs text-slate-400 truncate">{c.role}</p>
        <span className="text-slate-600">·</span>
        <span className="text-xs text-slate-500">{c.experience}y exp</span>
      </div>

      {/* ATS + Match Score */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-600">ATS</span>
            <span className={`text-[10px] font-bold ${getScoreColor(c.atsScore)}`}>{c.atsScore}</span>
          </div>
          <div className="h-1 bg-white/8 rounded-full">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${c.atsScore}%`,
                background: c.atsScore >= 85 ? "#10B981" : c.atsScore >= 70 ? "#F59E0B" : "#EF4444",
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-600">Match</span>
            <span className={`text-[10px] font-bold ${getScoreColor(c.matchScore)}`}>{c.matchScore}%</span>
          </div>
          <div className="h-1 bg-white/8 rounded-full">
            <div
              className="h-full rounded-full"
              style={{
                width: `${c.matchScore}%`,
                background: "#C6A75E",
              }}
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {c.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-slate-400 border border-white/8"
          >
            {skill}
          </span>
        ))}
        {c.skills.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-slate-500">
            +{c.skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2">
          {c.github && (
            <a href={c.github} target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-300 transition-colors">
              <Github size={12} />
            </a>
          )}
          {c.linkedin && (
            <a href={c.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-400 transition-colors">
              <Linkedin size={12} />
            </a>
          )}
          <a href={`mailto:${c.email}`} className="text-slate-600 hover:text-gold-400 transition-colors">
            <Mail size={12} />
          </a>
        </div>
        <div className="flex items-center gap-1">
          {c.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface KanbanBoardProps {
  candidates: Candidate[];
  onStageChange: (id: string, stage: Stage) => void;
}

export default function KanbanBoard({ candidates, onStageChange }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {STAGES.map((stage, colIdx) => {
        const stageCandidates = candidates.filter((c) => c.stage === stage);
        const config = STAGE_CONFIG[stage];

        return (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.07 }}
            className="shrink-0 w-[270px]"
          >
            {/* Column header */}
            <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-xl ${config.bg} border ${config.border}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: config.color }} />
                <span className="text-sm font-semibold text-slate-200">{stage}</span>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${config.color}20`, color: config.color }}
              >
                {stageCandidates.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3 min-h-[200px]">
              {stageCandidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 rounded-xl border border-dashed border-[rgba(198,167,94,0.1)] text-slate-600 text-xs">
                  No candidates
                </div>
              ) : (
                stageCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onStageChange={onStageChange}
                  />
                ))
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
