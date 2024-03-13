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

export const createScheduleSchema = z.object({
  start_date: z.string().trim(),
  time_since_inoc_hr: z.number(),
  notes: z.string().trim(),
  username: z.string().trim(),
  flask_bookmark: z.array(z.number()).optional(),
  flask_id: z.number().optional(),
})
