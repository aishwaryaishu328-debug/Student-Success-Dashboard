import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Success Dashboard | Track Academic Progress & Tasks",
  description: "A clean, modern academic productivity dashboard for college students to manage coursework, monitor completion rates, and stay on top of deadlines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
