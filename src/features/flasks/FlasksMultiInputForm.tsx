import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormLabel,
  MultiFormInput,
  StyledForm,
  StyledTable,
  TableRow,
  FormInputCell,
  MultiInputFormBody,
  BulkInputTextArea,
  MultiInput,
  ButtonsContainer,
  CreateEntryTableRow,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import {
  TCreateFlask,
  createFlaskColumnsArray,
  createFlaskSchema,
  initialCreateFlaskForm,
} from './flasks-types';
import { useCreateValidatedRowMutation } from '../../hooks/table-hooks/useCreateValidatedRowMutation';
import { useBulkInputForm } from '../../hooks/table-hooks/useBulkInputForm';
import ErrorMessage from '../../ui/ErrorMessage';

export default function FlasksMultiInputForm() {
  // create a row
  const {
    mutate: createFlaskMutation,
    isPending,
    error: createError,
  } = useCreateValidatedRowMutation({
    tableName: 'flasks',
    zodSchema: createFlaskSchema,
  });

  const {
    bulkTextAreaInput,
    setBulkTextAreaInput,
    bulkForm,
    handleSubmit,
    handleChange,
    handleClearForm,
  } = useBulkInputForm<TCreateFlask>({
    createTableColumnsArray: createFlaskColumnsArray,
    createTableRowMutation: createFlaskMutation,
    initialCreateRowForm: initialCreateFlaskForm,
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
                <CreateEntryTableRow key={i}>
                  <FormInputCell>
                    <MultiInput
                      id="cell_bank_id"
                      name="cell_bank_id"
                      placeholder="cell_bank_id (e.g. 3)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].cell_bank_id || ''}
                      />
                      {i == 0 && (
                        <FormLabel htmlFor="cell_bank_id">cell bank id</FormLabel>
                      )}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="vessel_type"
                      name="vessel_type"
                      placeholder="vessel_type (e.g. flask)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].vessel_type || ''}
                    />
                      {i == 0 && (
                        <FormLabel htmlFor="vessel_type">vessel type</FormLabel>
                      )}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="media"
                      name="media"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="media (e.g. farnesane)"
                      required
                      value={bulkForm[i].media || ''}
                      />
                      {i == 0 && <FormLabel htmlFor="media">media</FormLabel>}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="media_ml"
                      name="media_ml"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="media_ml"
                      required
                      value={bulkForm[i].media_ml || ''}
                      />
                      {i == 0 && (
                        <FormLabel htmlFor="media_ml">media mL</FormLabel>
                      )}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="inoculum_ul"
                      name="inoculum_ul"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="inoculum_ul"
                      required
                      value={bulkForm[i].inoculum_ul || ''}
                      />
                      {i == 0 && (
                        <FormLabel htmlFor="inoculum_ul">inoculum uL</FormLabel>
                      )}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="temp_c"
                      name="temp_c"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="temp_c"
                      required
                      value={bulkForm[i].temp_c || ''}
                      />
                      {i == 0 && <FormLabel htmlFor="temp_c">temp c</FormLabel>}
                  </FormInputCell>

                  <FormInputCell>
                    <MultiInput
                      id="rpm"
                      name="rpm"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="rpm"
                      required
                      value={bulkForm[i].rpm || ''}
                      />
                      {i == 0 && <FormLabel htmlFor="rpm">RPM</FormLabel>}
                  </FormInputCell>
                </CreateEntryTableRow>
              ))}
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
