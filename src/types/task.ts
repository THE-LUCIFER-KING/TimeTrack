export type TaskStatus = "pending" | "completed" | "failed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
  category?: string;
  timeSpent?: number; // in seconds
}