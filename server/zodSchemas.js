import { z } from 'zod';

// CELL BANK SCHEMAS
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

// SCHEDULE SCHEMAS
export const createScheduleSchema = z.object({
  start_date: z.string().trim(),
  time_since_inoc_hr: z.number(),
  notes: z.string().trim(),
  username: z.string().trim(),
  flask_bookmark: z.array(z.number()).optional(),
  current_flasks: z.array(z.number()).optional(),
  flask_id: z.number().optional(),
})

export const updateScheduleSchema = createScheduleSchema.extend({
  human_readable_date: z.string(),
});
