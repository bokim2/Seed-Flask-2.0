import { z } from 'zod';
// zod and typescript types
// cellbanks GET request
export const cellbankSchema = z.object({
    cell_bank_id: z.coerce.number() || null, // force a number type
    strain: z.string() || null,
    target_molecule: z.string() || null,
    project: z.string() || null,
    description: z.string() || null,
    notes: z.string() || null,
    date_timestamptz: z.string() || null,
    username: z.string() || null,
    user_id: z.string() || null,
});
// export const cellbankDataSchema = z.object({
//   status: z.string(),
//   data: z.array(cellbankSchema),
//   // popularOptions: 
// })
export const cellbanksArraySchema = z.array(cellbankSchema);
// create a cellbank
export const createCellbankColumnsArray = ['strain', 'target_molecule', 'project', 'description', 'notes'];
export const createCellbankSchema = z.object({
    strain: z.string().trim(),
    notes: z.string().trim(),
    target_molecule: z.string().trim(),
    project: z.string().trim(),
    description: z.string().trim(),
});
export const initialCreateCellbankForm = {
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
        'username'
    ]),
    searchText: z.string(),
});
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
//# sourceMappingURL=cellbanks-types.js.map