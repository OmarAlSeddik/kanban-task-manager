import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(64),
  email: z.string().min(1, { message: "Email is required." }).max(64),
});
