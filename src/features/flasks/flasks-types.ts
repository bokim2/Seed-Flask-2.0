import { z } from 'zod';
import { cellbankSchema } from '../cellbanks/cellbanks-types';

export const flaskAndCellbankSchema = cellbankSchema.extend({
  flask_id: z.coerce.number(),
  inoculum_ul: z.number(),
  media: z.string(),
  media_ml: z.number(),
  rpm: z.number(),
  start_date: z.string(),
  temp_c: z.number(),
  vessel_type: z.string(),
});

export const flaskAndCellbankArraySchema = z.array(flaskAndCellbankSchema);
