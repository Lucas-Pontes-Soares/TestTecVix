import { z } from "zod";

export const userCreatedSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"), // Make safe password,
  email: z.string().email("Invalid email"),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).optional(),
  idBrandMaster: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export type TUserCreated = z.infer<typeof userCreatedSchema>;
