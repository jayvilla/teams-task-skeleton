/**
 * Team Tasks Dashboard - Practice Skeleton
 *
 * This page is a practice skeleton focusing on:
 * - Prisma relations (User -> Task via assignedToId)
 * - RESTful API design (GET/POST/PATCH/DELETE patterns)
 * - SWR hooks for data fetching and caching
 * - UI patterns for filtering and assignment workflows
 *
 * Complete the TODOs throughout the codebase to implement the full functionality.
 */

import { useState } from "react";
import { useUsers, createUser } from "@/lib/team-tasks/useUsers";
import { useTasks, createTask } from "@/lib/team-tasks/useTasks";
import type { User, Task } from "@/lib/team-tasks/types";

export default function TeamTasksDashboard() {
  const { users, isLoading: usersLoading, isError: usersError } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { tasks, isLoading: tasksLoading, isError: tasksError, mutate: mutateTasks } = useTasks(
    selectedUserId ? { userId: selectedUserId } : undefined,
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskUserId, setNewTaskUserId] = useState("");

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskUserId) {
      return;
    }

    try {
      // TEAM_TASKS_TODO_13: Wire the "New Task" form up to the POST /tasks endpoint and revalidate the list.
      // After creating the task, call mutateTasks() to refresh the list.
      await createTask({
        title: newTaskTitle,
        description: newTaskDescription || undefined,
        assignedToId: newTaskUserId,
      });
      await mutateTasks();
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskUserId("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Team Tasks Dashboard</h1>

      {/* Users Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        {usersError && (
          <div className="text-red-600 mb-4">
            Error loading users. Make sure the API endpoints are implemented.
          </div>
        )}
        {usersLoading && <div className="text-gray-600">Loading users...</div>}
        {!usersLoading && !usersError && users.length === 0 && (
          <div className="text-gray-600">No users found. Create users via the API.</div>
        )}
        {!usersLoading && !usersError && users.length > 0 && (
          <div className="space-y-2">
            {users.map((user: User) => (
              <div key={user.id} className="p-4 border rounded">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tasks Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          {/* TEAM_TASKS_TODO_12: Add a select input to filter tasks by assignee using SWR filter params. */}
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Users</option>
            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {tasksError && (
          <div className="text-red-600 mb-4">
            Error loading tasks. Make sure the API endpoints are implemented.
          </div>
        )}
        {tasksLoading && <div className="text-gray-600">Loading tasks...</div>}
        {!tasksLoading && !tasksError && tasks.length === 0 && (
          <div className="text-gray-600">No tasks found. Create tasks using the form below.</div>
        )}
        {!tasksLoading && !tasksError && tasks.length > 0 && (
          <div className="space-y-2">
            {/* TEAM_TASKS_TODO_11: Render a table of tasks with columns: title, assignee name, completed, createdAt. */}
            {tasks.map((task: Task) => {
              const assignedUser = users.find((u: User) => u.id === task.assignedToId);
              return (
                <div key={task.id} className="p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{task.title}</div>
                      {task.description && (
                        <div className="text-sm text-gray-600 mt-1">{task.description}</div>
                      )}
                      <div className="text-sm text-gray-500 mt-2">
                        Assigned to: {assignedUser?.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Create Task Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">New Task</h2>
        <form onSubmit={handleCreateTask} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              id="task-title"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="task-description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="task-user" className="block text-sm font-medium mb-1">
              Assign To *
            </label>
            <select
              id="task-user"
              value={newTaskUserId}
              onChange={(e) => setNewTaskUserId(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select a user</option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Task
          </button>
        </form>
      </section>
    </div>
  );
}
