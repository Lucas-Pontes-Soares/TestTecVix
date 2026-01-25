import { z } from "zod";
import { vMCreatedSchema } from "./createVM";

export const vMUpdatedSchema = vMCreatedSchema
  .partial()
  .extend({
    currentPassword: z.string().min(8, "Current Password must be at least 8 characters long").optional(),
    newPassword: z.string().min(8, "New Password must be at least 8 characters long").optional(),
  });

export type TVMUpdate = z.infer<typeof vMUpdatedSchema>;
