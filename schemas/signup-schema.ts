import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(64),
  email: z.string().min(1, { message: "Email is required." }).max(64),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8)
    .max(64)
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});
