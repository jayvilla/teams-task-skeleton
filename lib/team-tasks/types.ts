// TEAM_TASKS_TODO_9: Define User and Task TypeScript types that match the Prisma models.
// These types should correspond to your Prisma schema models.
// Consider using Prisma's generated types if available (e.g., import { User, Task } from '@prisma/client').

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  assignedToId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

// Task with assigned user (for responses that include relations)
export type TaskWithUser = Task & {
  assignedTo: User;
};
