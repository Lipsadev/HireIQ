export type Stage =
  | "Applied"
  | "Screening"
  | "Shortlisted"
  | "Interview"
  | "Hired"
  | "Rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  experience: number; // years
  skills: string[];
  education: string;
  university: string;
  stage: Stage;
  atsScore: number;
  matchScore: number;
  appliedDate: string;
  location: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  summary: string;
  salary: string;
  source: string;
  notes: string;
  tags: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  posted: string;
  status: "Active" | "Paused" | "Closed";
  salary: string;
  requiredSkills: string[];
}

export interface Activity {
  id: string;
  type: "application" | "interview" | "hired" | "rejected" | "note" | "stage";
  candidateName: string;
  action: string;
  time: string;
  avatar: string;
}

export interface StatCard {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface AnalyticsData {
  month: string;
  applications: number;
  interviews: number;
  hired: number;
  rejected: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SkillDemand {
  skill: string;
  demand: number;
  supply: number;
}

export interface DepartmentHiring {
  department: string;
  open: number;
  hired: number;
  target: number;
}
