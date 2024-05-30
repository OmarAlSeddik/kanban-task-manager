import { z } from "zod";

export const RenameSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(64),
});
