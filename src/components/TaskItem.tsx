import React from "react";
import { Check, Trash2, Calendar, AlertCircle } from "lucide-react";
import { Task, Priority } from "@/types/task";
import { formatDate, isDueSoon } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  const dueSoon = isDueSoon(task.dueDate) && !task.completed;

  // Priority color styling
  const priorityStyles: Record<Priority, { bg: string; text: string; dot: string }> = {
    High: {
      bg: "bg-rose-50 border-rose-200/80",
      text: "text-rose-700",
      dot: "bg-rose-500",
    },
    Medium: {
      bg: "bg-amber-50 border-amber-200/80",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    Low: {
      bg: "bg-emerald-50 border-emerald-200/80",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  const priorityBadge = priorityStyles[task.priority];

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-200 ${
        task.completed
          ? "border-slate-200 bg-slate-50/60 opacity-75"
          : "border-slate-200/90 bg-white hover:border-indigo-200 hover:shadow-xs"
      }`}
    >
      {/* Left side: Checkbox & Task details */}
      <div className="flex items-start gap-3.5 min-w-0">
        {/* Toggle Checkbox Button */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
            task.completed
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-slate-300 bg-white hover:border-indigo-500 group-hover:border-indigo-400"
          }`}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          {task.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-sm sm:text-base font-semibold leading-tight text-slate-800 transition-all ${
                task.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </h3>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {/* Subject Tag */}
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
              {task.subject}
            </span>

            {/* Priority Tag */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-medium ${priorityBadge.bg} ${priorityBadge.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${priorityBadge.dot}`} />
              <span>{task.priority} Priority</span>
            </span>

            {/* Due Date Indicator */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-medium ${
                dueSoon
                  ? "bg-rose-50 text-rose-700 font-semibold"
                  : "text-slate-500"
              }`}
            >
              {dueSoon ? (
                <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
              ) : (
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span>{formatDate(task.dueDate)}</span>
              {dueSoon && <span className="text-[10px] text-rose-600 font-bold uppercase">(Due Soon)</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Delete action */}
      <div className="flex items-center justify-end sm:self-center">
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-all"
          title="Delete task"
          aria-label={`Delete task ${task.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
