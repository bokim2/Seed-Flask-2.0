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

const BulkInputTextArea = styled.textarea``;

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
  };
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
    row?: number;
    strain: string;
    notes: string;
    target_molecule: string;
    description: string;
  };

  const initialMultiInputData = [
    { row: 0, strain: '', target_molecule: '', description: '', notes: '' },
  ];

  const [bulkTextAreaInput, setbulkTextAreaInput] = useState('			');
  // const [multiInputData, setMultiInputData] = useState<TForm[] | []>(initialMultiInputData);
  const [bulkForm, setBulkForm] = useState<TForm[] | []>(initialMultiInputData);

  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    // const test: TForm[] | [] = []
    // setMultiInputData((prevData) => []);
    const pastedInputsArray = bulkTextAreaInput
      .split('\n')
      .map((row, rowNumber) => {
        const singleRow = row.split('\t');
        const rowData = {
          row: rowNumber,
          strain: singleRow[0],
          target_molecule: singleRow[1],
          description: singleRow[2],
          notes: singleRow[3],
        };
        // test.push(rowData)
        // setMultiInputData((prevData) => [...prevData, rowData]);
        return rowData;
      });
    setBulkForm(pastedInputsArray);
    // setBulkForm(test)
  }, [bulkTextAreaInput]);

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [formRowsCount, setFormRowsCount] = useState(3);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log('submitting', form);
      setIsSubmitting(true);
      await fetch(`${baseUrl}/api/cellbank`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },

        body: JSON.stringify(form),
      });
      setForm((prev) => initialForm);
      setIsSubmitting(true);
    } catch (error) {
      console.log(error);
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
        onChange={(e) => setbulkTextAreaInput(e.target.value)}
      ></BulkInputTextArea>

      <StyledForm onSubmit={handleSubmit}>
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
        <Button $size={'sdaf'} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </StyledForm>
    </>
  );
}
