import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HireIQ — Smarter Hiring Powered by AI",
  description:
    "Enterprise-grade AI recruitment platform. Automate resume screening, candidate ranking, interview scheduling, and hiring analytics with the power of artificial intelligence.",
  keywords: [
    "AI recruitment",
    "hiring platform",
    "ATS",
    "resume analyzer",
    "candidate management",
    "HR tech",
  ],
  openGraph: {
    title: "HireIQ — Smarter Hiring Powered by AI",
    description:
      "The most intelligent AI-powered recruitment platform for modern teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <Toaster
              theme="dark"
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1F2A44",
                  border: "1px solid rgba(198,167,94,0.25)",
                  color: "#F1F5F9",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
