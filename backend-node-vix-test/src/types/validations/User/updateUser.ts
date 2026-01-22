import { z } from "zod";
import { userCreatedSchema } from "./createUser";

export const userUpdatedSchema = userCreatedSchema
  .partial()
  .extend({
    currentPassword: z.string().min(8, "Current Password must be at least 8 characters long").optional(),
    newPassword: z.string().min(8, "New Password must be at least 8 characters long").optional(),
  })

export type TUserUpdated = z.infer<typeof userUpdatedSchema>;
