import { z } from "zod";

export const BoardSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(64),
  columns: z.array(
    z.object({
      title: z
        .string()
        .min(1, { message: "Column title is required." })
        .max(64),
    })
  ),
});
