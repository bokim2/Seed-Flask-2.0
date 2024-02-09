import { z } from 'zod'

export const createSampleSchema = z.object({
    completed: z.boolean(),
    end_date: z.string(),
    flask_id: z.coerce.number(),
    od600: z.number()
})

export type TCreateSample = z.infer<typeof createSampleSchema>


// Update

// export const 
export const initialEditSampleForm = {
    completed: false,
    end_date: '',
    flask_id: 0,
    od600: 0,
    human_readable_date: '',
  }

  export const updateSampleSchema = createSampleSchema.extend({
    human_readable_date: z.string(),
  });

  export type TUpdateSampleForm = z.infer<typeof updateSampleSchema>;