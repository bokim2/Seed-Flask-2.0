import { create } from 'domain';
import { z } from 'zod';

// fetch all flasks + important cellbank columns
export const flasksInfoSchema = z.object({
  flask_id: z.coerce.number().nullable(),
  cell_bank_id: z.coerce.number().nullable(),
  inoculum_ul: z.number().nullable(),
  media: z.string().nullable(),
  media_ml: z.coerce.number().nullable(),
  rpm: z.coerce.number().nullable(),
  start_date: z.string().nullable(),
  temp_c: z.coerce.number().nullable(),
  vessel_type: z.string().nullable(),
  username: z.string().nullable(),
  user_id: z.string().nullable(),

  // cellbank columns
  strain: z.string().nullable(),
  target_molecule: z.string().nullable(),
  project: z.string().nullable(),
});

export const flasksInfoArraySchema = z.array(flasksInfoSchema);

export type TFlaskInfo = z.infer<typeof flasksInfoSchema>;
export type TFlasksInfo = z.infer<typeof flasksInfoArraySchema>;

// create a flask
export const createFlaskSchema = z.object({
  cell_bank_id: z.coerce.number().nullable(),
  vessel_type: z.string().trim().nullable(),
  media: z.string().trim().nullable(),
  media_ml: z.coerce.number().nullable(),
  inoculum_ul: z.coerce.number().nullable(),
  temp_c: z.coerce.number().nullable(),
  rpm: z.coerce.number().nullable(),
  // start_date: z.string(),
});

export type TCreateFlask = z.infer<typeof createFlaskSchema>;

export const initialCreateFlaskForm: TCreateFlask = {
  cell_bank_id: null,
  vessel_type: 'flask',
  media: '',
  media_ml: null,
  inoculum_ul: null,
  temp_c: null,
  rpm: null,
};

// create a flask
export const createFlaskColumnsArray = [
  'cell_bank_id',
  'vessel_type',
  'media',
  'media_ml',
  'inoculum_ul',
  'temp_c',
  'rpm',
];

export const updateFlaskSchema = createFlaskSchema.extend({
  start_date: z.string(),
  human_readable_date: z.string(),
});

export type TUpdateFlaskForm = z.infer<typeof updateFlaskSchema>;

export type TinitialCreateFlasksForm = {
  cell_bank_id: number | null;
  inoculum_ul: number | null;
  media: string | null;
  media_ml: number | null;
  rpm: number | null;
  start_date: string | null;
  temp_c: number | null;
  vessel_type: string | null;
};

export const initialCreateFlasksForm = {
  cell_bank_id: '',
  vessel_type: 'flask',
  media: '',
  inoculum_ul: '',
  media_ml: '',
  rpm: '',
  temp_c: '',
  start_date: '',
  human_readable_date: '',
};

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
};

// flask vessel-types options

export const flaskVesselTypes = [
  'flask',
  'test tube',
  '96_well plate',
  '24 well plate',
];




export type TFlasksColumns = 
  'flask_id' |
  'cell_bank_id' |
  'vessel_type' |
  'media' |
  'media_ml' |
  'inoculum_ul' |
  'temp_c' |
  'rpm' |
  'start_date' |
  'human_readable_date' |
  'username';


export const flasksTableHeaderCellsArray = [
  'flask_id' ,
  'cell_bank_id',
  'vessel_type',
  'media',
  'media_ml',
  'inoculum_ul',
  'temp_c',
  'rpm',
  // 'start_date',
  'human_readable_date',
  'username',

  'strain',
  'target_molecule',
  'project',
]

export const flasksOnlyTableHeaderCellsArray = [
  'flask_id' ,
  'cell_bank_id',
  'vessel_type',
  'media',
  'media_ml',
  'inoculum_ul',
  'temp_c',
  'rpm',
  // 'start_date',
  'human_readable_date',
  'username',

]