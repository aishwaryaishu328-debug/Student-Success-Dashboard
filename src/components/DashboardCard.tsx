import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant: "indigo" | "emerald" | "amber" | "violet";
  trend?: string;
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
  trend,
}: DashboardCardProps) {
  // Styling variants for distinctive dashboard visual cards
  const colorMap = {
    indigo: {
      bg: "bg-indigo-50/60",
      text: "text-indigo-600",
      border: "hover:border-indigo-200",
      badge: "bg-indigo-100/80 text-indigo-700",
      glow: "from-indigo-500/10",
    },
    emerald: {
      bg: "bg-emerald-50/60",
      text: "text-emerald-600",
      border: "hover:border-emerald-200",
      badge: "bg-emerald-100/80 text-emerald-700",
      glow: "from-emerald-500/10",
    },
    amber: {
      bg: "bg-amber-50/60",
      text: "text-amber-600",
      border: "hover:border-amber-200",
      badge: "bg-amber-100/80 text-amber-700",
      glow: "from-amber-500/10",
    },
    violet: {
      bg: "bg-violet-50/60",
      text: "text-violet-600",
      border: "hover:border-violet-200",
      badge: "bg-violet-100/80 text-violet-700",
      glow: "from-violet-500/10",
    },
  };

  const theme = colorMap[variant];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${theme.border}`}
    >
      {/* Background ambient gradient glow */}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${theme.glow} to-transparent blur-xl transition-all group-hover:scale-150`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            {trend && (
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}
              >
                {trend}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.bg} ${theme.text} transition-transform group-hover:scale-110`}
        >
          <Icon className="h-6 w-6 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}
