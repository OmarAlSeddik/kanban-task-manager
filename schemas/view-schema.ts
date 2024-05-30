import { z } from "zod";

export const ViewSchema = z.object({
  subtasks: z.array(
    z.object({
      id: z.string(),
      isCompleted: z.boolean(),
      title: z
        .string()
        .min(1, { message: "Subtask title is required." })
        .max(64),
    })
  ),
  status: z.string().min(1, { message: "Status is required." }),
});
