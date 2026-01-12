import useSWR from "swr";

// TEAM_TASKS_TODO_9: Update import to use your actual Task types from types.ts
import type { Task, TaskWithUser } from "./types";

type TasksResponse = {
  data: Task[] | TaskWithUser[];
};

type CreateTaskRequest = {
  title: string;
  description?: string;
  assignedToId: string;
};

type TaskFilters = {
  userId?: string;
  completed?: boolean;
};

const fetcher = async (url: string): Promise<TasksResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
};

// TEAM_TASKS_TODO_10: Extend this hook to accept filter params (e.g. userId, completed) and pass them as query string.
// Example: useTasks({ userId: "123", completed: false }) should fetch /api/team-tasks/tasks?userId=123&completed=false
export function useTasks(filters?: TaskFilters) {
  // Build query string from filters
  const queryParams = new URLSearchParams();
  if (filters?.userId) {
    queryParams.set("userId", filters.userId);
  }
  if (filters?.completed !== undefined) {
    queryParams.set("completed", String(filters.completed));
  }
  const queryString = queryParams.toString();
  const url = `/api/team-tasks/tasks${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<TasksResponse>(
    url,
    fetcher,
  );

  return {
    tasks: data?.data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

export async function createTask(taskData: CreateTaskRequest): Promise<Task> {
  const res = await fetch("/api/team-tasks/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  const result = await res.json();
  return (result as { data: Task }).data;
}

export async function updateTask(
  taskId: string,
  updates: Partial<Pick<Task, "title" | "description" | "completed" | "assignedToId">>,
): Promise<Task> {
  const res = await fetch(`/api/team-tasks/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  const result = await res.json();
  return (result as { data: Task }).data;
}

export async function deleteTask(taskId: string): Promise<void> {
  const res = await fetch(`/api/team-tasks/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}
