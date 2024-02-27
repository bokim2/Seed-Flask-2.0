import { z } from 'zod';
import { TCreateCellbank } from '../features/cellbanks/cellbanks-types';

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



