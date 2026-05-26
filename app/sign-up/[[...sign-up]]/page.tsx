"use client";

import { SignUp } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center relative overflow-hidden px-4">
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

      <div className="relative z-10 w-full max-w-md">
        {/* Logo header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/30">
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-display font-bold text-2xl text-gradient-gold">HireIQ</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100 font-display mb-2">Create your account</h1>
          <p className="text-sm text-slate-400">Start hiring smarter with AI today</p>
        </div>

        {/* Clerk SignUp with custom appearance */}
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#C6A75E",
              colorBackground: "#1F2A44",
              colorInputBackground: "#141c2e",
              colorInputText: "#f1f5f9",
              colorText: "#f1f5f9",
              colorTextSecondary: "#94a3b8",
              colorNeutral: "#94a3b8",
              borderRadius: "12px",
              fontFamily: "Inter, system-ui, sans-serif",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-[#1F2A44] border border-[rgba(198,167,94,0.2)] shadow-2xl shadow-black/50 backdrop-blur-md rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-[rgba(198,167,94,0.2)] bg-white/5 text-slate-200 hover:bg-white/10 hover:border-[rgba(198,167,94,0.4)] transition-all rounded-xl",
              socialButtonsBlockButtonText: "font-medium",
              dividerLine: "bg-[rgba(198,167,94,0.15)]",
              dividerText: "text-slate-400 text-xs",
              formFieldLabel: "text-slate-400 text-xs font-medium",
              formFieldInput:
                "bg-[#141c2e] border border-[rgba(198,167,94,0.2)] text-slate-100 rounded-xl focus:border-[rgba(198,167,94,0.6)] focus:ring-0 placeholder:text-slate-600",
              formButtonPrimary:
                "bg-gradient-to-r from-gold-600 to-gold-400 text-slate-900 font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gold-500/25",
              footerActionText: "text-slate-300 font-medium",
              footerActionLink: "text-gold-400 hover:text-gold-300",
              footerText: "text-slate-400 font-medium",
              identityPreviewEditButton: "text-gold-400",
              formFieldSuccessText: "text-green-400",
              formFieldErrorText: "text-red-400",
              alertText: "text-slate-300",
              otpCodeFieldInput:
                "bg-[#141c2e] border border-[rgba(198,167,94,0.2)] text-slate-100 rounded-xl",
            },
          }}
        />

        {/* Back to home */}
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
