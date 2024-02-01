import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormButton,
  FormInput,
  FormLabel,
  FormTextArea,
  InputContainer,
  StyledForm,
  StyledTable,
  TableDataCell,
  TableRow,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { useCreateCellbank } from '../../lib/hooks';

const BulkInputTextArea = styled.textarea`
  background-color: transparent;
  padding: 0.5rem;
  text-align: center;
`;

const CellbankFormTable = styled.table`
  /* display: flex; */
  background-color: darkgrey;
`;

const CellbankFormBody = styled.tbody``;

const CellbankFormRow = styled.tr`
  /* display: flex; */
`;

const CellbankFormCell = styled.td`
  /* padding: 1rem; */

  @media (max-width: 600px) {
    display: grid;
    &::before {
      content: attr(data-cell) ': ';
      font-weight: 700;
      text-transform: capitalize;
      color: yellow;
    }
  }
`;

export const CellbankMultiInput = styled.input`
  width: 90%;
  border: 0;
  font-family: inherit;
  font-weight: 400;
  background-color: transparent;
  color: inherit;
  border-bottom: 2px solid #f2d17c;

  &::placeholder {
    color: #faf7f0;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #10e7dc;
  }

  @media (min-width: 800px) {
    /* width: 40vw; */
  }
`;

export default function CellbanksMultiInputForm() {
  const initialForm = {
    strain: '',
    notes: '',
    target_molecule: '',
    description: '',
  };

  type TForm = {
    strain: string;
    notes: string;
    target_molecule: string;
    description: string;
  };

  const initialMultiInputData = [initialForm];

  const [bulkTextAreaInput, setBulkTextAreaInput] = useState('');

  const [bulkForm, setBulkForm] = useState<TForm[] | []>(initialMultiInputData);

  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    const pastedInputsArray = bulkTextAreaInput.split('\n').map((row) => {
      const singleRow = row.split('\t');
      const rowData = {
        strain: singleRow[0],
        target_molecule: singleRow[1],
        description: singleRow[2],
        notes: singleRow[3],
      };
      return rowData;
    });
    setBulkForm(pastedInputsArray);
  }, [bulkTextAreaInput]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createCellbankMutation, isPending] = useCreateCellbank();

  const handleSubmit = async (e, bulkForm) => {
    e.preventDefault();
    setIsSubmitting(true);
    const mutationPromises = bulkForm.map((row) => createCellbankMutation(row));

    try {
      await Promise.all(mutationPromises);
      setBulkForm(initialMultiInputData);
      setBulkTextAreaInput('');
      setIsSubmitting(false);
    } catch (err) {
      console.log(err, 'error in bulkForm mutation submit');
    }
  };

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    rowNumber: number
  ) => {
    setBulkForm((prev) => {
      return prev.map((row, i) => {
        if (i === rowNumber) {
          return {
            ...row,
            [e.target.name]: e.target.value,
          };
        }
        return row;
      });
    });
  };
  return (
    <>
      <BulkInputTextArea
        placeholder="copy/paste from excel"
        value={bulkTextAreaInput}
        onChange={(e) => setBulkTextAreaInput(e.target.value)}
      ></BulkInputTextArea>

      {isPending && <h1>loading...</h1>}
      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e, bulkForm);

          console.log('bulkForm in submit', bulkForm);
        }}
      >
        <StyledTable>
          <CellbankFormBody>
            {bulkForm.length !== 0 &&
              bulkForm?.map((row, i) => (
                <TableRow key={i}>
                  {/* <InputContainer>
              <FormLabel htmlFor="strain">strain</FormLabel> */}
                  <CellbankFormCell>
                    <CellbankMultiInput
                      type="select"
                      id="strain"
                      name="strain"
                      placeholder="strain (e.g. aspergillus)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].strain}
                    />
                  </CellbankFormCell>
                  {/* </InputContainer> */}

                  <CellbankFormCell>
                    {/* <FormLabel htmlFor="target_molecule">target molecule</FormLabel> */}
                    <CellbankMultiInput
                      type="text"
                      id="target_molecule"
                      name="target_molecule"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="target molecule (e.g. farnesane)"
                      required
                      value={bulkForm[i].target_molecule}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {/* <FormLabel htmlFor="description">description</FormLabel> */}
                    <CellbankMultiInput
                      id="description"
                      name="description"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="description"
                      required
                      value={bulkForm[i].description}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {/* <FormLabel htmlFor="notes">notes</FormLabel> */}
                    <CellbankMultiInput
                      id="notes"
                      name="notes"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="notes"
                      required
                      value={bulkForm[i].notes}
                    />
                  </CellbankFormCell>
                </TableRow>
              ))}
          </CellbankFormBody>
        </StyledTable>
        <Button $size={'small'} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </StyledForm>
    </>
  );
}

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault();
  //     console.log('submitting', 'form', form, 'bulkform', bulkForm);
  //     setIsSubmitting(true);
  //     await fetch(`${baseUrl}/api/cellbank`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },

  //       body: JSON.stringify(form),
  //     });
  //     setForm((prev) => initialForm);
  //     setIsSubmitting(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };