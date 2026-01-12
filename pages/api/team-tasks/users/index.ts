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
      // TEAM_TASKS_TODO_2: Implement GET to return all users using Prisma.
      // Expected response shape: { data: User[] }
      res.status(501).json({ error: "Not implemented" });
      break;

    case "POST":
      // TEAM_TASKS_TODO_3: Implement POST to create a new user.
      // Expected request body: { name: string, email: string }
      // Expected response shape: { data: User }
      res.status(501).json({ error: "Not implemented" });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
