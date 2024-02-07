import { z } from 'zod';
import { TCreateCellbankSchema } from '../features/cellbanks/cellbanks-types';

export type TNavOrUser = 'user' | 'nav'; //  main navlist and user navlist toggles

export type THandleNavToggle = (
  e:
    | React.MouseEvent<Element, MouseEvent>
    | React.KeyboardEvent<HTMLElement | SVGElement>,
  navOrUser: TNavOrUser
) => void;

// export type TForm = {
//   strain: string;
//   notes: string;
//   target_molecule: string;
//   description: string;
// };

export type TTableRow = {
  $editing: boolean;
};

// export type TCellbank = {
//   cell_bank_id: string;
//   strain: string;
//   target_molecule: string;
//   description: string;
//   notes: string;
//   readable_start_date_pacific: string;
// };

// export type TBookmarkedCellbankGraph = {
//   bookmarkedCellbankGraphData: any[][];
// };

// styles

export type TTableHeaderCell = {
  width?: string;
};




export const samplesInfoSchema = z.object({
  completed: z.boolean(),
  end_date: z.string(),
  flask_id: z.coerce.number(),
  od600: z.number(),
  sample_id: z.coerce.number(),
  strain: z.string(),
  target_molecule: z.string(),
  temp_c: z.number(),
  time_since_inoc_hr: z.number(),
});

export type TSamplesInfo = z.infer<typeof samplesInfoSchema>;

export const samplesInfoArraySchema = z.array(samplesInfoSchema);