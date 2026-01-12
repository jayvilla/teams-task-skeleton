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
  switch (req.method) {
    case "GET":
      // TEAM_TASKS_TODO_4: Implement GET to list tasks, optionally filtered by userId and/or completed status.
      // Query params: ?userId=string&completed=boolean
      // Expected response shape: { data: Task[] } (consider including assigned user data)
      res.status(501).json({ error: "Not implemented" });
      break;

    case "POST":
      // TEAM_TASKS_TODO_5: Implement POST to create a new task assigned to a user.
      // Expected request body: { title: string, description?: string, assignedToId: string }
      // Expected response shape: { data: Task }
      res.status(501).json({ error: "Not implemented" });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
