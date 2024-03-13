import { z } from 'zod';
import { createCellbankSchema } from '../../../server/zodSchemas';

// zod and typescript types

// cellbanks GET request
export const cellbankSchema = z.object({
  cell_bank_id: z.coerce.number().nullable(), // force a number type
  strain: z.string().nullable(),
  target_molecule: z.string().nullable(),
  project: z.string().nullable(),
  description: z.string().nullable(),
  notes: z.string().nullable(),
  date_timestamptz: z.string().nullable(),
  username: z.string().nullable(),
  user_id: z.string().nullable(),
});

// export const cellbankDataSchema = z.object({
//   status: z.string(),
//   data: z.array(cellbankSchema),
//   // popularOptions:
// })

export const cellbanksArraySchema = z.array(cellbankSchema);

export type TCellbank = z.infer<typeof cellbankSchema>;
export type TCellbanks = z.infer<typeof cellbanksArraySchema>;

// create a cellbank
export const createCellbankColumnsArray = [
  'strain',
  'target_molecule',
  'project',
  'description',
  'notes',
];

// export const createCellbankSchema = z.object({
//   strain: z.string().trim(),
//   notes: z.string().trim(),
//   target_molecule: z.string().trim(),
//   project: z.string().trim(),
//   description: z.string().trim(),
// });

export type TCreateCellbank = z.infer<typeof createCellbankSchema>;

export const initialCreateCellbankForm: TCreateCellbank = {
  strain: '',
  notes: '',
  target_molecule: '',
  project: '',
  description: '',
};

// update a cellbank

export const initialEditCellbankForm = {
  cell_bank_id: 0,
  strain: '',
  notes: '',
  target_molecule: '',
  project: '',
  description: '',
  date_timestamptz: '',
  human_readable_date: '',
};

export const updateCellbankSchema = createCellbankSchema.extend({
  human_readable_date: z.string(),
});
export type TUpdateCellbankForm = z.infer<typeof updateCellbankSchema>;

// cellbanks search functionality with search params

export const CellbankSearchParamsSchema = z.object({
  searchField: z.enum([
    'cell_bank_id',
    'strain',
    'target_molecule',
    'project',
    'description',
    'notes',
    'date_timestampz',
    'username',
  ]),
  searchText: z.string(),
});

export type TCellbankSearchParamsSchema = z.infer<
  typeof CellbankSearchParamsSchema
>;

export const cellbanksValidFields = [
  'cell_bank_id',
  'strain',
  'project',
  'target_molecule',
  'description',
  'notes',
  'username',
  'date_timestampz',
];

// for searchForm
export type TCellbanksColumns =
  | 'cell_bank_id'
  | 'strain'
  | 'target_molecule'
  | 'project'
  | 'description'
  | 'notes'
  | 'date_timestampz'
  | 'human_readable_date'
  | 'username';

export const cellbanksTableHeaderCellsArray = [
  'cell_bank_id',
  'strain',
  'target_molecule',
  'project',
  'description',
  'notes',
  'human_readable_date',
  'username',
];
