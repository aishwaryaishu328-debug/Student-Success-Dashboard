import React from "react";
import { Task, TaskFilter } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { CheckCircle2, ListFilter, ClipboardList, Plus } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenAddTask: () => void;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
}

export function TaskList({
  tasks,
  filter,
  onFilterChange,
  onToggleComplete,
  onDelete,
  onOpenAddTask,
  totalCount,
  pendingCount,
  completedCount,
}: TaskListProps) {
  const filterTabs: { id: TaskFilter; label: string; count: number }[] = [
    { id: "All", label: "All Tasks", count: totalCount },
    { id: "Pending", label: "Pending", count: pendingCount },
    { id: "Completed", label: "Completed", count: completedCount },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Tasks</h2>
          <p className="text-xs text-slate-500">
            Keep track of assignments, coding practice, and revision deadlines.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "bg-slate-200/70 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List / Empty State */}
      <div className="mt-5 space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 px-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3">
              {filter === "Completed" ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : filter === "Pending" ? (
                <ListFilter className="h-7 w-7" />
              ) : (
                <ClipboardList className="h-7 w-7" />
              )}
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              {filter === "Completed"
                ? "No completed tasks yet"
                : filter === "Pending"
                ? "All caught up! No pending tasks"
                : "No tasks found"}
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              {filter === "Completed"
                ? "Check off tasks as you finish them to see them archived here."
                : filter === "Pending"
                ? "Great job! You have conquered all your current coursework deadlines."
                : "Get started by adding your upcoming assignments or study goals."}
            </p>
            <button
              onClick={onOpenAddTask}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create New Task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
