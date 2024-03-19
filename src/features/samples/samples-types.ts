import { z } from 'zod'


// GET

export const samplesInfoSchema = z.object({
  completed: z.boolean(),
  end_date: z.string(),
  flask_id: z.coerce.number(),
  od600: z.number(),
  sample_id: z.coerce.number(),
  strain: z.string(),
  target_molecule: z.string(),
  temp_c: z.number(),
  time_since_inoc_hr: z.number(),
  username: z.string() || null,
  user_id: z.string() || null,
});

export type TSamplesInfo = z.infer<typeof samplesInfoSchema>;

export const samplesInfoArraySchema = z.array(samplesInfoSchema);

// CREATE
export const createSampleColumnsArray = ['flask_id', 'od600', 'completed']

export const createSampleSchema = z.object({
  flask_id: z.coerce.number().nullable(),
  od600: z.coerce.number().nullable(),
  completed: z.coerce.boolean().nullable(),
  // end_date: z.string(),
})

export type TCreateSample = z.infer<typeof createSampleSchema>

export const initialCreateSampleForm: TCreateSample = {
  // end_date: '',
  flask_id: null,
  od600: null,
  completed: false,
    // human_readable_date: '',
}

// Update

// export const 
export const initialEditSampleForm = {
    completed: false,
    end_date: '',
    flask_id: '',
    od600: '',
    human_readable_date: '',
  }

  export type TinitialEditSampleForm = {
    completed: boolean,
    // end_date: string,
    flask_id: string,
    od600: string,
    // human_readable_date: '',
  }

  export const updateSampleSchema = createSampleSchema.extend({
    human_readable_date: z.string(),
  });

  export type TUpdateSampleForm = z.infer<typeof updateSampleSchema>;