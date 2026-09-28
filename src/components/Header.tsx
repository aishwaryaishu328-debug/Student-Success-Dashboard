"use client";

import React from "react";
import { Plus, Menu, Search, CalendarDays } from "lucide-react";
import { getTodayFormatted } from "@/lib/utils";
import { StudentProfile } from "@/types/task";

interface HeaderProps {
  student: StudentProfile;
  onOpenMobileMenu: () => void;
  onOpenAddTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  student,
  onOpenMobileMenu,
  onOpenAddTask,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const todayFormatted = getTodayFormatted();

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-slate-200/80 bg-white/95 px-6 py-4 backdrop-blur-md transition-all sm:flex-row sm:items-center sm:justify-between">
      {/* Top / Left: Greeting & Date */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, {student.name.split(" ")[0]}!
            </h1>
            <span className="hidden text-xl sm:inline">🎓</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
            <span>{todayFormatted}</span>
          </div>
        </div>
      </div>

      {/* Right / Actions: Search & Add Task Button */}
      <div className="flex items-center gap-3">
        {/* Quick Search Input */}
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, subjects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            aria-label="Search tasks"
          />
        </div>

        {/* Primary Add Task Button */}
        <button
          onClick={onOpenAddTask}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          id="btn-add-task-header"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
