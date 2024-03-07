import { z } from 'zod';

export const createCellbankSchema = z.object({
  strain: z.string().trim(),
  notes: z.string().trim(),
  target_molecule: z.string().trim(),
  project: z.string().trim(),
  description: z.string().trim(),
});

export const updateBackendCellbankSchema = createCellbankSchema.extend({
  date_timestamptz: z.string().trim(),
});
