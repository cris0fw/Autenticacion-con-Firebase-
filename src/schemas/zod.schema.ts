import { z } from "zod";

export interface typeSchemaLogin {
  email: string;
  password: string;
}

export interface typeSchemaRegister {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const formSchemaLogin = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "No es un email valido" })),
  password: z.string().min(6, { message: "Minimo 6 caracteres" }),
});

export const formSchemaRegister = z
  .object({
    email: z.string().pipe(z.email({ message: "Invalid email" })),
    displayName: z
      .string()
      .min(1, { message: "Display name is require" })
      .max(50, { message: "Display name must be at most 50 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display must be at most 50 characters long"),
  photoURL: z.url().optional(),
});

export type zodSchemaLogin = z.infer<typeof formSchemaLogin>;
export type zodSchemaRegister = z.infer<typeof formSchemaRegister>;
export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;
