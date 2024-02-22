import React, { useEffect, useState } from 'react';
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
  createCellbankColumnsArray,
  createCellbankSchema,
  initialCreateCellbankForm,
} from './cellbanks-types';
import { TCreateCellbankSchema } from './cellbanks-types';

import ErrorMessage from '../../ui/ErrorMessage';
import { MultiInput } from '../samples/SamplesMultiInputForm';
import { useBulkInputForm } from '../../hooks/table-hooks/useBulkInputForm';
import { useCreateValidatedRowMutation } from '../../hooks/table-hooks/useCreateValidatedRowMutation';

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

export default function CellbanksMultiInputForm() {
  // create a row
  const {
    mutate: createCellbankMutation,
    isPending,
    error: createError,
  } = useCreateValidatedRowMutation({
    tableName: 'cellbanks',
    zodSchema: createCellbankSchema,
  });

  const {
    bulkTextAreaInput,
    setBulkTextAreaInput,
    bulkForm,
    handleSubmit,
    handleChange,
    handleClearForm,
  } = useBulkInputForm<TCreateCellbankSchema>({
    createTableColumnsArray: createCellbankColumnsArray,
    createTableRowMutation: createCellbankMutation,
    initialCreateCellbankForm: initialCreateCellbankForm,
  });

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
