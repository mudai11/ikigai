import z from "zod";

export const messageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
});

export const messageArraySchema = z.array(messageSchema);

export type MessageSchema = z.infer<typeof messageSchema>;
