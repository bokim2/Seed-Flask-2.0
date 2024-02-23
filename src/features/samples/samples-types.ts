import { z } from 'zod'


// GET

// CREATE
export const createSampleColumnsArray = ['flask_id', 'od600', 'completed']

export const createSampleSchema = z.object({
  flask_id: z.coerce.number().nullable(),
  od600: z.coerce.number().nullable(),
  completed: z.boolean().nullable(),
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