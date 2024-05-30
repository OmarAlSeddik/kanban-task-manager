import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(64),
  description: z.string().max(1024),
  subtasks: z.array(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(1, { message: "Subtask title is required." })
        .max(64),
    })
  ),
  status: z.string().min(1, { message: "Status is required." }),
});
