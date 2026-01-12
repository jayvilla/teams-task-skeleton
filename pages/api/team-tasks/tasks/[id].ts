import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  data: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Invalid task ID" });
    return;
  }

  switch (req.method) {
    case "GET":
      // TEAM_TASKS_TODO_6: Implement GET to return a specific task with its assigned user.
      // Expected response shape: { data: Task & { assignedTo: User } }
      res.status(501).json({ error: "Not implemented" });
      break;

    case "PATCH":
      // TEAM_TASKS_TODO_7: Implement PATCH to update a task's title/description/completed/assignedToId.
      // Expected request body: { title?: string, description?: string, completed?: boolean, assignedToId?: string }
      // Expected response shape: { data: Task }
      res.status(501).json({ error: "Not implemented" });
      break;

    case "DELETE":
      // TEAM_TASKS_TODO_8: Implement DELETE to remove a task.
      // Expected response shape: { data: { id: string } } or 204 No Content
      res.status(501).json({ error: "Not implemented" });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
