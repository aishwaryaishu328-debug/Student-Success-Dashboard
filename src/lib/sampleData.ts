import { Task, StudentProfile } from "@/types/task";

export const initialStudentProfile: StudentProfile = {
  name: "Alex Morgan",
  degree: "B.Tech Computer Science & Engineering",
  semester: "Semester 4",
  academicYear: "2026 - 2027",
  targetGpa: "3.85 / 4.00",
};

export const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Practice DSA Arrays",
    subject: "Data Structures",
    priority: "High",
    dueDate: "2026-10-02",
    completed: false,
    createdAt: "2026-09-27T10:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Study Java Unit 2",
    subject: "Java Programming",
    priority: "Medium",
    dueDate: "2026-10-04",
    completed: false,
    createdAt: "2026-09-27T11:30:00.000Z",
  },
  {
    id: "task-3",
    title: "Complete SQL Assignment",
    subject: "Database Systems",
    priority: "High",
    dueDate: "2026-10-01",
    completed: true,
    createdAt: "2026-09-26T09:15:00.000Z",
  },
  {
    id: "task-4",
    title: "Practice Python",
    subject: "Python",
    priority: "Low",
    dueDate: "2026-10-06",
    completed: false,
    createdAt: "2026-09-28T08:00:00.000Z",
  },
  {
    id: "task-5",
    title: "Prepare Seminar Presentation",
    subject: "Communication & Seminars",
    priority: "Medium",
    dueDate: "2026-10-03",
    completed: true,
    createdAt: "2026-09-25T14:20:00.000Z",
  },
];

export const subjectOptions = [
  "Data Structures",
  "Java Programming",
  "Database Systems",
  "Python",
  "Web Development",
  "Communication & Seminars",
  "Mathematics",
  "General Academics",
];
