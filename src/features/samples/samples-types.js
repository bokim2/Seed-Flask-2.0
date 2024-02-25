import { z } from 'zod';
// GET
// CREATE
export const createSampleColumnsArray = ['flask_id', 'od600', 'completed'];
export const createSampleSchema = z.object({
    flask_id: z.coerce.number().nullable(),
    od600: z.coerce.number().nullable(),
    completed: z.boolean().nullable(),
    // end_date: z.string(),
});
export const initialCreateSampleForm = {
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
export const updateSampleSchema = createSampleSchema.extend({
    human_readable_date: z.string(),
});
//# sourceMappingURL=samples-types.js.map