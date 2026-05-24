import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export function formatPercent(n: number): string {
  return n.toFixed(1) + "%";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStageColor(stage: string): string {
  const map: Record<string, string> = {
    Applied: "badge-applied",
    Screening: "badge-screening",
    Shortlisted: "badge-shortlisted",
    Interview: "badge-interview",
    Hired: "badge-hired",
    Rejected: "badge-rejected",
  };
  return map[stage] ?? "badge-applied";
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-green-400";
  if (score >= 70) return "text-yellow-400";
  if (score >= 55) return "text-orange-400";
  return "text-red-400";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const STAGES = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
] as const;

export type Stage = (typeof STAGES)[number];
