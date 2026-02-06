import { z } from "zod";
import { demoVideoSchema } from "./schema";

export const multiSceneSchema = z.object({
  scenes: z.array(demoVideoSchema).default([]),
});

export type MultiSceneProps = z.infer<typeof multiSceneSchema>;
