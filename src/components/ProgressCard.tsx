import React from "react";
import { Task } from "@/types/task";
import { TrendingUp, CheckCircle, Clock, Lightbulb } from "lucide-react";

interface ProgressCardProps {
  tasks: Task[];
  completionPercentage: number;
}

export function ProgressCard({
  tasks,
  completionPercentage,
}: ProgressCardProps) {
  // Group tasks by subject to show study distribution
  const subjectsMap: Record<string, { total: number; completed: number }> = {};

  tasks.forEach((t) => {
    if (!subjectsMap[t.subject]) {
      subjectsMap[t.subject] = { total: 0, completed: 0 };
    }
    subjectsMap[t.subject].total += 1;
    if (t.completed) {
      subjectsMap[t.subject].completed += 1;
    }
  });

  const subjectStats = Object.entries(subjectsMap).map(([subject, data]) => ({
    subject,
    percentage: Math.round((data.completed / data.total) * 100),
    completed: data.completed,
    total: data.total,
  }));

  // Motivational message based on percentage
  const getMotivationalMessage = (pct: number) => {
    if (pct === 100) return "Outstanding! You've completed 100% of your tasks. Take a well-deserved rest! 🎉";
    if (pct >= 70) return "Awesome pace! You are crushing your academic goals for this week. 🚀";
    if (pct >= 40) return "Steady progress! Knock out one more high-priority task today to maintain momentum. 💪";
    return "Every master was once a beginner. Start by tackling your highest priority task first! 📚";
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Study Progress</h2>
          <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Target: 100%</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Weekly completion rate & subject breakdown
        </p>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600">Completion Status</span>
          <span className="text-sm font-bold text-slate-900">{completionPercentage}%</span>
        </div>
        
        {/* Dynamic Animated Progress Bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            {tasks.filter((t) => t.completed).length} Finished
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {tasks.filter((t) => !t.completed).length} Remaining
          </span>
        </div>
      </div>

      {/* Subject Distribution */}
      {subjectStats.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Subject Breakdown
          </h3>
          <div className="space-y-2.5">
            {subjectStats.slice(0, 4).map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span className="truncate max-w-[170px]">{item.subject}</span>
                  <span className="text-slate-500 text-[11px]">
                    {item.completed}/{item.total} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Study Tip / Motivational Quote */}
      <div className="mt-auto rounded-xl border border-indigo-100/70 bg-indigo-50/50 p-3.5">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
          <p className="text-xs leading-relaxed text-indigo-900">
            {getMotivationalMessage(completionPercentage)}
          </p>
        </div>
      </div>
    </div>
  );
}
