import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WorkflowsAI | Vote on Workflow Automation Ideas",
    template: "%s | WorkflowsAI",
  },
  description:
    "Discover and vote on workflow automation ideas for SMB teams using n8n, OpenClaw, and AI agents.",
  applicationName: "WorkflowsAI",
  keywords: [
    "workflow automation ideas",
    "automation voting app",
    "SMB automation",
    "n8n workflows",
    "AI workflow ideas",
    "business automation",
    "operations automation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WorkflowsAI | Vote on Workflow Automation Ideas",
    description:
      "Browse and rank high-quality SMB workflow automation ideas across categories like self-healing, bridges, watchdogs, and content machines.",
    url: "/",
    siteName: "WorkflowsAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkflowsAI | Vote on Workflow Automation Ideas",
    description:
      "Swipe through SMB workflow ideas and vote on the best automation opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
