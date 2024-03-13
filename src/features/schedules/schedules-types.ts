import { z } from 'zod';
import { createCellbankSchema } from '../../../server/zodSchemas';

// zod and typescript types

// schedules GET request
export const schedulesSchema = z.object({
  schedule_id: z.coerce.number().optional().nullable(),
  start_date: z.string().nullable(),
  time_since_inoc_hr: z.number().nullable(),
  notes: z.string().nullable(),
  username: z.string().nullable(),
  flask_bookmark: z.array(z.number()).nullable(),
  flask_id: z.number().optional().nullable(),
});

// export const cellbankDataSchema = z.object({
//   status: z.string(),
//   data: z.array(cellbankSchema),
//   // popularOptions:
// })

export const schedulesArraySchema = z.array(schedulesSchema);

export type TSchedule = z.infer<typeof schedulesSchema>;
export type TSchedules = z.infer<typeof schedulesArraySchema>;

// // create a cellbank
// export const createCellbankColumnsArray = [
//   'strain',
//   'target_molecule',
//   'project',
//   'description',
//   'notes',
// ];


// export type TCreateCellbank = z.infer<typeof createCellbankSchema>;

// export const initialCreateCellbankForm: TCreateCellbank = {
//   strain: '',
//   notes: '',
//   target_molecule: '',
//   project: '',
//   description: '',
// };

// // update a cellbank

// export const initialEditCellbankForm = {
//   cell_bank_id: 0,
//   strain: '',
//   notes: '',
//   target_molecule: '',
//   project: '',
//   description: '',
//   date_timestamptz: '',
//   human_readable_date: '',
// };

// export const updateCellbankSchema = createCellbankSchema.extend({
//   human_readable_date: z.string(),
// });
// export type TUpdateCellbankForm = z.infer<typeof updateCellbankSchema>;

// // cellbanks search functionality with search params

// export const CellbankSearchParamsSchema = z.object({
//   searchField: z.enum([
//     'cell_bank_id',
//     'strain',
//     'target_molecule',
//     'project',
//     'description',
//     'notes',
//     'date_timestampz',
//     'username',
//   ]),
//   searchText: z.string(),
// });

// export type TCellbankSearchParamsSchema = z.infer<
//   typeof CellbankSearchParamsSchema
// >;

// export const cellbanksValidFields = [
//   'cell_bank_id',
//   'strain',
//   'project',
//   'target_molecule',
//   'description',
//   'notes',
//   'username',
//   'date_timestampz',
// ];

// // for searchForm
// export type TCellbanksColumns =
//   | 'cell_bank_id'
//   | 'strain'
//   | 'target_molecule'
//   | 'project'
//   | 'description'
//   | 'notes'
//   | 'date_timestampz'
//   | 'human_readable_date'
//   | 'username';

// export const cellbanksTableHeaderCellsArray = [
//   'cell_bank_id',
//   'strain',
//   'target_molecule',
//   'project',
//   'description',
//   'notes',
//   'human_readable_date',
//   'username',
// ];
