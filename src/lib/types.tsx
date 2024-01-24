export type TForm = {
    strain: string,
    notes: string,
    target_molecule: string,
    description: string,
  };

  export type TEditCellbankForm = TForm & {
    cell_bank_id: string
    
  }