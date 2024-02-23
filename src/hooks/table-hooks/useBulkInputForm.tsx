import { useEffect, useState } from 'react';

// bulk form submit - for submitting multiple rows at once, or just one row
export function useBulkInputForm<TCreateTableRowSchema>({
  createTableColumnsArray,
  createTableRowMutation,
  initialCreateCellbankForm,
}) {
  const [bulkTextAreaInput, setBulkTextAreaInput] = useState(''); // input for pasting cellbank(s) from excel
  const [bulkForm, setBulkForm] = useState<TCreateTableRowSchema[]>([
    initialCreateCellbankForm,
  ]); // data for submitting cellbank(s)
  // console.log(bulkForm, 'bulkForm')

  // update bulkForm when bulkTextAreaInput changes
  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    const pastedInputsArray: TCreateTableRowSchema[] = bulkTextAreaInput
      .split('\n')
      .map((row) => {
        const singleRow = row.split('\t');
        console.log('singleRow', singleRow);
        const rowData = {
          // strain: singleRow[0],
          // target_molecule: singleRow[1],
          // project: singleRow[2],
          // description: singleRow[3],
          // notes: singleRow[3],
        };
        singleRow.forEach(
          (column, i) =>
            (rowData[createTableColumnsArray[i]] = singleRow?.[i] ?? '')
        );
        console.log('rowData', rowData);

        return rowData as TCreateTableRowSchema;
      });
    console.log('pastedInputsArray', pastedInputsArray, 'bulkForm', bulkForm);
    setBulkForm((prev) => {
      console.log('prev', prev, 'pastedInputsArray', pastedInputsArray);
      return pastedInputsArray;
    });
  }, [bulkTextAreaInput]);

  const handleSubmit = async (e, bulkForm) => {
    e.preventDefault();
    const mutationPromises = bulkForm.map((row) => createTableRowMutation(row));
    try {
      await Promise.all(mutationPromises);
      setBulkForm([initialCreateCellbankForm]);
      setBulkTextAreaInput('');
    } catch (err) {
      console.log(err, 'error in bulkForm mutation submit');
    }
  };

  const handleChange = (
    e,
    rowNumber: number
  ) => {
    const { name, value } = e.target;
    setBulkForm((prev) =>
      prev.map((row, index) => {
        if (index === rowNumber) {
          return { ...row, [name]: value };
        }
        return row;
      })
    );
  };

  const handleClearForm = () => {
    setBulkForm([initialCreateCellbankForm]);
    setBulkTextAreaInput('');
  };

  return {
    bulkTextAreaInput,
    setBulkTextAreaInput,
    bulkForm,
    setBulkForm,
    handleSubmit,
    handleChange,
    handleClearForm,
  };
}
