import { z } from 'zod';
import { cellbankSchema } from '../cellbanks/cellbanks-types';


// fetch all flasks + important cellbank columns
export const flasksInfoSchema = cellbankSchema.extend({
  flask_id: z.coerce.number() ,
  inoculum_ul: z.number()  || null,
  media: z.string()  || null,
  media_ml: z.number()  || null,
  rpm: z.number(),
  start_date: z.string(),
  temp_c: z.number(),
  vessel_type: z.string(),
});

export const flasksInfoArraySchema = z.array(flasksInfoSchema);


export type TFlasksInfo = z.infer<typeof flasksInfoSchema>;


// create a flask
export const createFlaskSchema = z.object({
  cell_bank_id: z.number()  || null,
  vessel_type: z.string()  || null,
  media: z.string()  || null,
  media_ml: z.number()  || null,
  inoculum_ul: z.number()  || null,
  temp_c: z.number()  || null,
  rpm: z.number()  || null,
  // start_date: z.string(),
});

export type TCreateFlask = z.infer<typeof createFlaskSchema>;

export const editFlaskSchema = createFlaskSchema.extend({
  start_date: z.string(),
  human_readable_date: z.string(),
})

// edit a flask 

// export type TInitialEditFlasksForm = {
//   flask_id: null,
//   inoculum_ul: null,
//   media: null,
//   media_ml: null,
//   rpm: null,
//   start_date: null,
//   temp_c: null,
//   vessel_type: null,
// }

export type TinitialCreateFlasksForm = {
  cell_bank_id: number | null,
  inoculum_ul: number | null,
  media: string | null,
  media_ml: number | null,
  rpm: number | null,
  start_date: string | null,
  temp_c: number | null,
  vessel_type: string | null,
};

export const initialCreateFlasksForm = {
  cell_bank_id: "",
  vessel_type: 'flask',
  media: "",
  inoculum_ul: "",
  media_ml: '',
  rpm: '',
  temp_c: '',
  start_date: '',
  human_readable_date: '',
}

// export type TinitialEditFlasksForm = {
//   flask_id: number | null,
//   cell_bank_id: number | null,
//   inoculum_ul: number | null,
//   media: string | null,
//   media_ml: number | null,
//   rpm: number | null,
//   start_date: string | null,
//   temp_c: number | null,
//   vessel_type: string | null,
  
// };

export const initialEditFlasksForm = {
  flask_id: '',
  cell_bank_id: '',
  inoculum_ul: '',
  media: '',
  media_ml: '',
  rpm: '',
  start_date: '',
  temp_c: '',
  vessel_type: '',
  human_readable_date: '',
}