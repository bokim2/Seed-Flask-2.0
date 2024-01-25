export type TForm = {
    strain: string,
    notes: string,
    target_molecule: string,
    description: string,
  };

  export type TTableRow = {
    $editing: boolean;
}

  export type TEditCellbankForm = TForm & {
    cell_bank_id: string
    
  }

  export type TCellbank = {
    cell_bank_id: number;
    strain: string;
    target_molecule: string;
    description: string;
    notes: string;
    readable_start_date_pacific: string;
  }