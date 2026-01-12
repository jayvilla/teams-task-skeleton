import useSWR from "swr";

// TEAM_TASKS_TODO_9: Update import to use your actual User type from types.ts
import type { User } from "./types";

type UsersResponse = {
  data: User[];
};

type CreateUserRequest = {
  name: string;
  email: string;
};

const fetcher = async (url: string): Promise<UsersResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<UsersResponse>(
    "/api/team-tasks/users",
    fetcher,
  );

  return {
    users: data?.data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

export async function createUser(userData: CreateUserRequest): Promise<User> {
  const res = await fetch("/api/team-tasks/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  const result = await res.json();
  return (result as { data: User }).data;
}
