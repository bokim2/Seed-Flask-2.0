import React, { useEffect, useState } from 'react';
import {
  FormLabel,
  StyledForm,
  StyledTable,
  TableRow,
  FormInputCell,
  BulkInputTextArea,
  MultiInputFormBody,
  MultiInput,
  ButtonsContainer,
  CreateEntryTable,
  CreateEntryTableRow,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';

import {
  TCreateSample,
  TinitialEditSampleForm,
  createSampleColumnsArray,
  createSampleSchema,
  initialCreateSampleForm,
  initialEditSampleForm,
} from './samples-types';
import { useCreateValidatedRowMutation } from '../../hooks/table-hooks/useCreateValidatedRowMutation';
import { useBulkInputForm } from '../../hooks/table-hooks/useBulkInputForm';

export default function SamplesMultiInputForm() {

  // create a row
  const {
    mutate: createSampleMutation,
    isPending,
    error: createError,
  } = useCreateValidatedRowMutation({
    tableName: 'samples',
    zodSchema: createSampleSchema,
  });
  
  const {
    bulkTextAreaInput,
    setBulkTextAreaInput,
    bulkForm,
    handleSubmit,
    handleChange,
    handleClearForm,
  } = useBulkInputForm<TCreateSample>({
    createTableColumnsArray: createSampleColumnsArray,
    createTableRowMutation: createSampleMutation,
    initialCreateRowForm: initialCreateSampleForm,
  });
  


  return (
    <>
      <BulkInputTextArea
        name="bulkTextAreaInputForMultiSubmit"
        placeholder="copy/paste from excel"
        value={bulkTextAreaInput}
        onChange={(e) => setBulkTextAreaInput(e.target.value)}
      ></BulkInputTextArea>

      {isPending && <h1>Submitting cellbank(s) in progress...</h1>}
      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e, bulkForm);

          console.log('bulkForm in submit', bulkForm);
        }}
      >
        <CreateEntryTable>
          <MultiInputFormBody>
            {bulkForm.length !== 0 &&
              bulkForm?.map((row, i) => (
                <CreateEntryTableRow key={i}>
                  <FormInputCell>
                    <MultiInput
                      id="flask_id"
                      name="flask_id"
                      placeholder="flask_id (e.g. 2)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].flask_id || ''}
                      />
                      {i == 0 && (
                        <FormLabel htmlFor="flask_id">flask_id</FormLabel>
                      )}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="od600"
                      name="od600"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="od600 (e.g. 3.4)"
                      required
                      value={bulkForm[i].od600 || ''}
                      />
                      {i == 0 && <FormLabel htmlFor="od600">od600</FormLabel>}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="completed"
                      name="completed"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="completed"
                      required
                      value={bulkForm[i].completed ? 'true' : 'false'}
                      />
                      {i == 0 && (
                        <FormLabel htmlFor="completed">completed</FormLabel>
                      )}
                  </FormInputCell>
                </CreateEntryTableRow>
              ))}
          </MultiInputFormBody>
        </CreateEntryTable>
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
