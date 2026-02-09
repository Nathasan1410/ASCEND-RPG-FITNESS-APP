import { z } from "zod";

// Quest Bypass Types
export const QuestBypassReason = [
  "Manual Override - Good Run",
  "Manual Override - Verification Needed",
  "Manual Override - Technical Issue",
  "Manual Override - User Dispute",
  "Manual Override - Special Circumstance",
] as const;

export const QuestBypassType = [
  "judge_manual_override",
  "admin_force_approve",
  "emergency_override",
] as const;

export const QuestBypassInputSchema = z.object({
  quest_id: z.string().uuid(),
  bypass_reason: z.enum({
    values: QuestBypassReason,
    errorMap: z.ZodIssueInvalidError.toMap(
      QuestBypassReason.map(reason => ({ value: reason, message: `Invalid reason: ${reason}` }))
    ),
  }),
  bypass_type: z.enum({
    values: QuestBypassType,
    errorMap: z.ZodIssueInvalidError.toMap(
      QuestBypassType.map(type => ({ value: type, message: `Invalid type: ${type}` }))
    ),
  }).default("judge_manual_override"),
  notes: z.string().optional(),
});

export type QuestBypassInput = z.infer<typeof QuestBypassInputSchema>;
