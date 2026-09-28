"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardCard } from "@/components/DashboardCard";
import { TaskList } from "@/components/TaskList";
import { ProgressCard } from "@/components/ProgressCard";
import { AddTaskModal } from "@/components/AddTaskModal";
import { Task, TaskFilter, Priority } from "@/types/task";
import { sampleTasks, initialStudentProfile } from "@/lib/sampleData";
import {
  CheckCircle2,
  Clock,
  Layers,
  Percent,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate tasks from localStorage on initial client load
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("student_dashboard_tasks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
          return;
        }
      }
    } catch {
      // Fallback if localStorage is inaccessible or corrupted
    }
    setTasks(sampleTasks);
  }, []);

  // Save to localStorage when tasks change (only after initial hydration)
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("student_dashboard_tasks", JSON.stringify(tasks));
      } catch {
        // localStorage quota or error handling
      }
    }
  }, [tasks, isMounted]);

  // Task actions
  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddTask = ({
    title,
    subject,
    priority,
    dueDate,
  }: {
    title: string;
    subject: string;
    priority: Priority;
    dueDate: string;
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      subject,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleResetSampleData = () => {
    setTasks(sampleTasks);
    try {
      localStorage.setItem("student_dashboard_tasks", JSON.stringify(sampleTasks));
    } catch {
      // Handle error
    }
  };

  // Derived metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter & Search logic
  const filteredTasks = tasks.filter((task) => {
    // Tab filter
    if (filter === "Pending" && task.completed) return false;
    if (filter === "Completed" && !task.completed) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchSubject = task.subject.toLowerCase().includes(q);
      return matchTitle || matchSubject;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        student={initialStudentProfile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Bar */}
        <Header
          student={initialStudentProfile}
          onOpenMobileMenu={() => setIsSidebarOpen(true)}
          onOpenAddTask={() => setIsAddModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dashboard Main Scrollable View */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Quick Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-md shadow-indigo-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Semester Focus
                  </span>
                  <span className="text-xs text-indigo-100 font-medium">
                    {initialStudentProfile.degree}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  You have {pendingTasks} {pendingTasks === 1 ? "task" : "tasks"} due this week
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100">
                  Target GPA: {initialStudentProfile.targetGpa} • Consistent daily effort builds long-term success.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetSampleData}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
                  title="Restore initial hackathon sample tasks"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>

            {/* Dashboard Cards Grid (4 Primary Metrics) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Total Tasks"
                value={totalTasks}
                subtitle="All tracked academic items"
                icon={Layers}
                variant="indigo"
              />
              <DashboardCard
                title="Completed"
                value={completedTasks}
                subtitle="Successfully finished"
                icon={CheckCircle2}
                variant="emerald"
                trend={`${progressPercentage}% done`}
              />
              <DashboardCard
                title="Pending"
                value={pendingTasks}
                subtitle="Requires attention"
                icon={Clock}
                variant="amber"
              />
              <DashboardCard
                title="Progress Rate"
                value={`${progressPercentage}%`}
                subtitle="Overall completion"
                icon={Percent}
                variant="violet"
              />
            </div>

            {/* Main Interactive Grid (TaskList + ProgressCard) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Task Management Section (2/3 width on large screens) */}
              <div className="lg:col-span-2">
                <TaskList
                  tasks={filteredTasks}
                  filter={filter}
                  onFilterChange={setFilter}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onOpenAddTask={() => setIsAddModalOpen(true)}
                  totalCount={totalTasks}
                  pendingCount={pendingTasks}
                  completedCount={completedTasks}
                />
              </div>

              {/* Progress & Academic Insights Section (1/3 width) */}
              <div className="lg:col-span-1">
                <ProgressCard
                  tasks={tasks}
                  completionPercentage={progressPercentage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Task Modal Dialog */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
