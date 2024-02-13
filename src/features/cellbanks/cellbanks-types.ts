import { z } from 'zod';

// zod and typescript types

// cellbanks GET request
export const cellbankSchema = z.object({
  cell_bank_id: z.coerce.number() || null, // force a number type
  strain: z.string() || null,
  target_molecule: z.string() || null,
  project: z.string() || null,
  description: z.string()  || null,
  notes: z.string() || null,
  date_timestamptz: z.string() || null,
});

export const cellbanksArraySchema = z.array(cellbankSchema);

export type TCellbank = z.infer<typeof cellbankSchema>;
export type TCellbanks = z.infer<typeof cellbanksArraySchema>;

// create a cellbank
export const createCellbankSchema = z.object({
  strain: z.string(),
  notes: z.string(),
  target_molecule: z.string(),
  project: z.string(),
  description: z.string(),
});

export type TCreateCellbankSchema = z.infer<typeof createCellbankSchema>;


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

export const updateCellbankSchema = cellbankSchema.extend({
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
    'details',
    'notes',
    'date_timestampz',
  ]),
  searchText: z.string(),
});

export type TCellbankSearchParamsSchema = z.infer<
  typeof CellbankSearchParamsSchema
>;
