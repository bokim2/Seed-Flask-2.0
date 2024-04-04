import { z } from 'zod';
import { createCellbankSchema, updateScheduleSchema } from '../../../server/zodSchemas';

// zod and typescript types

// schedules GET request
export const schedulesSchema = z.object({
  schedule_id: z.coerce.number().optional().nullable(),
  start_date: z.string().nullable(),
  time_since_inoc_hr: z.number().nullable(),
  notes: z.string().nullable(),
  username: z.string().nullable(),
  flask_bookmark: z.array(z.number()).optional().nullable(),
  current_flasks: z.array(z.number()).optional().nullable(),
  flask_id: z.number().optional().nullable(),
});


export const schedulesArraySchema = z.array(schedulesSchema);

export type TSchedule = z.infer<typeof schedulesSchema>;
export type TSchedules = z.infer<typeof schedulesArraySchema>;

export const initialEditScheduleForm = {
  start_date: '',
  notes: '',
  username: '',
  flask_bookmark: '',
  flask_id: '',
  human_readable_date: '',
  // time_since_inoc_hr: '',
};

// create a schedule

export const initialCreateSchedulesForm = {
  start_date: '',
  notes: '',
  username: '',
  flask_bookmark: '',
  flask_id: '',
  human_readable_date: '',
  // time_since_inoc_hr: '',
};

export type TUpdateScheduleForm = z.infer<typeof updateScheduleSchema>;


// create a schedule
export const createCellbankColumnsArray = [
  'start_date',
  'notes',
  'username',
  'flask_bookmark',
  'flask_id',
  'human_readable_date'
  // time_since_inoc_hr,
];


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

// for searchForm
export type TSchedulesColumns =
  'schedule_id'
  | 'start_date'
  | 'time_since_inoc_hr'
  | 'notes'
  | 'username'
  | 'flask_bookmark'
  | 'flask_id'
  | 'human_readable_date';


export const schedulesTableHeaderCellsArray = [
  'schedule_id',
  'start_date',
  'time_since_inoc_hr',
  'sample date/time',
  'notes',
  'flask_bookmark',
  'current_flasks',
  'flask_id',
  // 'human_readable_date',
  'username',
];
