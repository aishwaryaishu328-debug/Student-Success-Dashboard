export type Priority = 'Low' | 'Medium' | 'High';

export type Subject = 
  | 'Data Structures'
  | 'Java Programming'
  | 'Database Systems'
  | 'Python'
  | 'Web Development'
  | 'Communication & Seminars'
  | 'Mathematics'
  | 'General Academics';

export interface Task {
  id: string;
  title: string;
  subject: string;
  priority: Priority;
  dueDate: string; // Format: YYYY-MM-DD
  completed: boolean;
  createdAt: string;
}

export type TaskFilter = 'All' | 'Pending' | 'Completed';

export interface StudentProfile {
  name: string;
  degree: string;
  semester: string;
  academicYear: string;
  avatarUrl?: string;
  targetGpa: string;
}
