"use client";

import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Calendar,
  Flame,
  Award,
  X,
  Sparkles,
} from "lucide-react";
import { StudentProfile } from "@/types/task";

interface SidebarProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export function Sidebar({
  student,
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
}: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "schedule", label: "Study Schedule", icon: Calendar },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo & Close button on mobile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-100">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Student<span className="text-indigo-600">Flow</span>
                </span>
                <p className="text-xs font-medium text-slate-400">Success Workspace</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Study Streak Card */}
          <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>5-Day Streak</span>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                Active
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-800/80">
              Keep it up! You completed 4 tasks this week.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
            <p className="px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                      isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Student Profile Card (Bottom) */}
        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100/80 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-slate-800">
                {student.name}
              </h4>
              <p className="truncate text-xs text-slate-500">
                {student.semester} • CS
              </p>
            </div>
            <span title="Target GPA: 3.85">
              <Award className="h-4 w-4 shrink-0 text-amber-500" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
