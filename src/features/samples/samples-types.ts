import { z } from 'zod';

// GET

export const sampleInfoSchema = z.object({
  completed: z.boolean().nullable(),
  end_date: z.string().nullable(),
  flask_id: z.coerce.number().nullable(),
  od600: z.number().nullable(),
  sample_id: z.coerce.number().nullable(),
  strain: z.string().nullable(),
  target_molecule: z.string().nullable(),
  temp_c: z.number().nullable(),
  time_since_inoc_hr: z.number().nullable(),
  username: z.string().nullable(),
  user_id: z.string().nullable(),
});

export const samplesInfoArraySchema = z.array(sampleInfoSchema);

export type TSampleInfo = z.infer<typeof sampleInfoSchema>;
export type TSamplesInfo = z.infer<typeof samplesInfoArraySchema>;

// CREATE
export const createSampleColumnsArray = ['flask_id', 'od600', 'completed'];

export const createSampleSchema = z.object({
  flask_id: z.coerce.number().nullable(),
  od600: z.coerce.number().nullable(),
  completed: z.coerce.boolean().nullable(),
  // end_date: z.string(),
});

export type TCreateSample = z.infer<typeof createSampleSchema>;

export const initialCreateSampleForm: TCreateSample = {
  // end_date: '',
  flask_id: null,
  od600: null,
  completed: false,
  // human_readable_date: '',
};

// Update

// export const
export const initialEditSampleForm = {
  completed: false,
  end_date: '',
  flask_id: '',
  od600: '',
  human_readable_date: '',
};

export type TinitialEditSampleForm = {
  completed: boolean;
  // end_date: string,
  flask_id: string;
  od600: string;
  // human_readable_date: '',
};

export const updateSampleSchema = createSampleSchema.extend({
  human_readable_date: z.string(),
});

export type TUpdateSampleForm = z.infer<typeof updateSampleSchema>;

// table header columns

export const samplesTableHeaderCellsArray = [
  'sample_id',
  'flask_id',
  'od600',
  'time_since_inoc_hr',
  'end date/time',
  'completed',
  'username',
  // 'edit',
];

export type TSamplesColumns =
  | 'sample_id'
  | 'flask_id'
  | 'od600'
  | 'time_since_inoc_hr'
  | 'end date/time'
  | 'completed'
  | 'username';
