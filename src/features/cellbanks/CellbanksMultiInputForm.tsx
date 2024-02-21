import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormLabel,
  StyledForm,
  StyledTable,
  TableRow,
  BulkInputTextArea,
  MultiInputFormBody,
  MultiInputFormCell,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import {
  createCellbankSchema,
  initialEditCellbankForm,
} from './cellbanks-types';
import { TCreateCellbankSchema } from './cellbanks-types';
import { useCreateValidatedRowMutation } from '../../lib/hooks';
import ErrorMessage from '../../ui/ErrorMessage';
import PopularOptionsSelectors from '../../ui/PopularOptionsSelectors';
import { MultiInput } from '../samples/SamplesMultiInputForm';

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

export default function CellbanksMultiInputForm() {
  // console.log('popularOptions in cellbanks multi input form', popularOptions);

  const [bulkTextAreaInput, setBulkTextAreaInput] = useState(''); // input for pasting cellbank(s) from excel
  const [bulkForm, setBulkForm] = useState<TCreateCellbankSchema[] | []>([
    initialEditCellbankForm,
  ]); // data for submitting cellbank(s)
  // console.log(bulkForm, 'bulkForm')


  // create a row
  const {
    mutate: createCellbankMutation,
    isPending,
    error: createError,
  } = useCreateValidatedRowMutation({
    tableName: 'cellbanks',
    zodSchema: createCellbankSchema,
    // apiEndpoint: 'cellbank',
  });

  // update bulkForm when bulkTextAreaInput changes
  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    const pastedInputsArray = bulkTextAreaInput.split('\n').map((row) => {
      const singleRow = row.split('\t');
      const rowData = {
        strain: singleRow[0],
        target_molecule: singleRow[1],
        project: singleRow[2],
        description: singleRow[3],
        notes: singleRow[3],
      };
      return rowData;
    });
    setBulkForm(pastedInputsArray);
  }, [bulkTextAreaInput]);

  const handleSubmit = async (e, bulkForm) => {
    e.preventDefault();
    const mutationPromises = bulkForm.map((row) => createCellbankMutation(row));
    try {
      await Promise.all(mutationPromises);
      setBulkForm([initialEditCellbankForm]);
      setBulkTextAreaInput('');
    } catch (err) {
      console.log(err, 'error in bulkForm mutation submit');
    }
  };

  const handleChange = (e, rowNumber: number) => {
    setBulkForm((prev) => {
      return prev.map((row, i) => {
        if (i === rowNumber) {
          return { ...row, [e.target.name]: e.target.value };
        }
        return row;
      });
    });
  };

  const handleClearForm = () => {
    setBulkForm([initialEditCellbankForm]);
    setBulkTextAreaInput('');
  };

  // for popular options
  // const popularOptionsArray: any = [];
  // for (let i = 0; i < 5; i++) {
  //   // console.log('popularOptions in loop', popularOptions)
  //   popularOptionsArray.push(
  //     <tr key={i}>
  //       <PopularOptionsSelectors
  //         popularOptions={popularOptions}
  //         columns={[
  //           'strain',
  //           'target_molecule',
  //           'project',
  //           'description',
  //           'notes',
  //         ]}
  //         i={i}
  //         selectPopularOption={selectPopularOption}
  //       ></PopularOptionsSelectors>
  //     </tr>
  //   );
  // }

  // function selectPopularOption(column, value) {
  //   // console.log('value, column',value, column)
  //   if (bulkForm.length > 1) return;
  //   setBulkForm((prev) =>
  //     prev.map((singleForm) => ({ ...singleForm, [column]: value }))
  //   );
  // }
  //

  return (
    <>
      <BulkInputTextArea
        name="bulkTextAreaInputForMultiSubmit"
        placeholder="copy/paste from excel"
        value={bulkTextAreaInput}
        onChange={(e) => setBulkTextAreaInput(e.target.value)}
      ></BulkInputTextArea>

      {createError && <ErrorMessage error={createError} />}
      {isPending && <h1>Submitting cellbank(s) in progress...</h1>}

      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e, bulkForm);

          console.log('bulkForm in submit', bulkForm);
        }}
      >
        <StyledTable>
          <MultiInputFormBody>
            {bulkForm.length !== 0 &&
              bulkForm?.map((row, i) => (
                <TableRow key={i}>
                  <MultiInputFormCell>
                    {i == 0 && <FormLabel htmlFor="strain">strain</FormLabel>}
                    <MultiInput
                      type="text"
                      id="strain"
                      name="strain"
                      placeholder="strain (e.g. aspergillus)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].strain}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="target_molecule">
                        target molecule
                      </FormLabel>
                    )}
                    <MultiInput
                      type="text"
                      id="target_molecule"
                      name="target_molecule"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="target molecule (e.g. farnesane)"
                      required
                      value={bulkForm[i].target_molecule}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && <FormLabel htmlFor="project">project</FormLabel>}
                    <MultiInput
                      type="text"
                      id="project"
                      name="project"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="project (e.g. cloudberry)"
                      required
                      value={bulkForm[i].project}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="description">description</FormLabel>
                    )}
                    <MultiInput
                      id="description"
                      name="description"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="description"
                      required
                      value={bulkForm[i].description}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && <FormLabel htmlFor="notes">notes</FormLabel>}
                    <MultiInput
                      id="notes"
                      name="notes"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="notes"
                      required
                      value={bulkForm[i].notes}
                    />
                  </MultiInputFormCell>
                </TableRow>
              ))}

            {/* {popularOptionsArray } */}
          </MultiInputFormBody>
        </StyledTable>
        <ButtonsContainer>
          <Button $size={'small'} type="submit" disabled={isPending}>
            Submit
          </Button>
          <Button $size={'small'} type="reset" onClick={handleClearForm}>
            Clear
          </Button>
        </ButtonsContainer>
      </StyledForm>
    </>
  );
}

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   try {
//     e.preventDefault();
//     console.log('submitting', 'form', form, 'bulkform', bulkForm);
//     await fetch(`${baseUrl}/api/cellbanks`, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },

//       body: JSON.stringify(form),
//     });
//     setForm((prev) => initialUpdateCellbankForm);
//   } catch (error) {
//     console.log(error);
//   }
// };
