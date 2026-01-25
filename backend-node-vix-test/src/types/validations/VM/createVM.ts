import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
const ETaskLocationEnum = z.enum(["LOCAL", "REMOTE", "CLOUD_BR", "CLOUD_US"]);
// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().optional(),
  password: z.string().optional(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  hasBackup: z.boolean().optional().default(false),
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
  location: ETaskLocationEnum.optional().default("CLOUD_BR"),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
