import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormButton,
  FormLabel,
  FormTextArea,
  InputContainer,
  MultiFormInput,
  StyledForm,
  StyledTable,
  TableDataCell,
  TableRow,
  FormTableCell,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';

import {
  TCreateSample,
  TinitialEditSampleForm,
  createSampleSchema,
  initialEditSampleForm,
} from './samples-types';
import { useCreateValidatedRowMutation } from '../../hooks/table-hooks/useCreateValidatedRowMutation';

const BulkInputTextArea = styled.textarea`
  background-color: transparent;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
  margin: 1rem;
`;

const MultiInputFormBody = styled.tbody``;

const MultiInputFormCell = styled(FormTableCell)``;

export const MultiInput = styled(MultiFormInput)``;

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

export default function SamplesMultiInputForm({ popularOptions }) {
  const [bulkTextAreaInput, setBulkTextAreaInput] = useState(''); // input for pasting cellbank(s) from excel
  const [bulkForm, setBulkForm] = useState<
    TCreateSample[] | TinitialEditSampleForm[]
  >([initialEditSampleForm]); // data for submitting cellbank(s)

  // const [createCellbankMutation, isPending] = useCreateCellbankMutation(); // create cellbank(s)

  const {
    mutate: createSampleMutation,
    isPending,
    error,
  } = useCreateValidatedRowMutation({
    tableName: 'samples',
    zodSchema: createSampleSchema,
    // apiEndpoint: 'cellbank',
  });

  // update bulkForm when bulkTextAreaInput changes
  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    const pastedInputsArray = bulkTextAreaInput.split('\n').map((row) => {
      const singleRow = row.split('\t');
      const rowData = {
        flask_id: Number(singleRow[0]),
        od600: Number(singleRow[1]),
        completed: Boolean(singleRow[2]),
        // notes: singleRow[3],
      };
      return rowData;
    });
    setBulkForm(pastedInputsArray);
  }, [bulkTextAreaInput]);

  const handleSubmit = async (e, bulkForm) => {
    e.preventDefault();

    const mutationPromises = bulkForm.map((row) =>
      createSampleMutation({
        flask_id: Number(row.flask_id),
        od600: Number(row.od600),
        completed: Boolean(row.completed),
      })
    );
    try {
      await Promise.all(mutationPromises);
      setBulkForm([initialEditSampleForm]);
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
    setBulkForm([initialEditSampleForm]);
    setBulkTextAreaInput('');
  };

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
        <StyledTable>
          <MultiInputFormBody>
            {bulkForm.length !== 0 &&
              bulkForm?.map((row, i) => (
                <TableRow key={i}>
                  <MultiInputFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="flask_id">flask_id</FormLabel>
                    )}
                    <MultiInput
                      type="text"
                      id="flask_id"
                      name="flask_id"
                      placeholder="flask_id (e.g. 2)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].flask_id}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && <FormLabel htmlFor="od600">od600</FormLabel>}
                    <MultiInput
                      type="text"
                      id="od600"
                      name="od600"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="od600 (e.g. 3.4)"
                      required
                      value={bulkForm[i].od600}
                    />
                  </MultiInputFormCell>

                  <MultiInputFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="completed">completed</FormLabel>
                    )}
                    <MultiInput
                      id="completed"
                      name="completed"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="completed"
                      required
                      value={bulkForm[i].completed ? 'true' : 'false'}
                    />
                  </MultiInputFormCell>
                </TableRow>
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
