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
  TCreateFlask,
  TFlasksInfo,
  TinitialCreateFlasksForm,
  createFlaskSchema,
  initialCreateFlasksForm,
  initialEditFlasksForm,
} from './flasks-types';
import { useCreateValidatedRowMutation } from '../../lib/hooks';

const BulkInputTextArea = styled.textarea`
  background-color: transparent;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
  margin: 1rem;
`;

const CellbankFormBody = styled.tbody``;

const CellbankFormCell = styled(FormTableCell)``;

export const CellbankMultiInput = styled(MultiFormInput)``;

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

export default function FlasksMultiInputForm() {
  const [bulkTextAreaInput, setBulkTextAreaInput] = useState(''); // input for pasting cellbank(s) from excel
  const [bulkForm, setBulkForm] = useState<TinitialCreateFlasksForm[] | any[]>([
    initialCreateFlasksForm,
  ]); // data for submitting cellbank(s)

  // const [createCellbankMutation, isPending] = useCreateCellbankMutation(); // create cellbank(s)

  const {
    mutate: createFlaskMutation,
    isPending,
    error,
  } = useCreateValidatedRowMutation({
    tableName: 'flasks',
    zodSchema: createFlaskSchema,
    apiEndpoint: 'flask',
  });

  // update bulkForm when bulkTextAreaInput changes
  useEffect(() => {
    if (bulkTextAreaInput === '') return;
    const pastedInputsArray = bulkTextAreaInput.split('\n').map((row) => {
      const singleRow = row.split('\t');
      const rowData = {
        cell_bank_id: singleRow[0],
        vessel_type: singleRow[1],
        media: singleRow[2],
        media_ml: singleRow[3],
        inoculum_ul: singleRow[4],
        temp_c: singleRow[5],
        rpm: singleRow[6],
      };
      return rowData;
    });
    setBulkForm(pastedInputsArray);
  }, [bulkTextAreaInput]);

  const handleSubmit = async (e, bulkForm) => {
    e.preventDefault();
    console.log('bulkForm in submit', bulkForm);
    const mutationPromises = bulkForm.map((row) => {
      const {
        cell_bank_id,
        vessel_type,
        media,
        media_ml,
        inoculum_ul,
        temp_c,
        rpm,
      } = row;
      const formattedRow = {
        cell_bank_id: Number(cell_bank_id),
        vessel_type: "flask",
        media: String(media),
        media_ml: Number(media_ml),
        inoculum_ul: Number(inoculum_ul),
        temp_c: Number(temp_c),
        rpm: Number(rpm),
      }
      createFlaskMutation(formattedRow)
    }); 
    try {
      await Promise.all(mutationPromises);
      setBulkForm([initialCreateFlasksForm]);
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
    setBulkForm([initialCreateFlasksForm]);
    setBulkTextAreaInput('');
  };

  return (
    <>
      <BulkInputTextArea
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
          <CellbankFormBody>
            {bulkForm.length !== 0 &&
              bulkForm?.map((row, i) => (
                <TableRow key={i}>
                  <CellbankFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="cell_bank_id">cell bank id</FormLabel>
                    )}
                    <CellbankMultiInput
                      type="text"
                      id="cell_bank_id"
                      name="cell_bank_id"
                      placeholder="cell_bank_id (e.g. 3)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].cell_bank_id}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="vessel_type">vessel type</FormLabel>
                    )}
                    <CellbankMultiInput
                      type="text"
                      id="vessel_type"
                      name="vessel_type"
                      placeholder="vessel_type (e.g. flask)"
                      onChange={(e) => handleChange(e, i)}
                      required
                      autoFocus
                      value={bulkForm[i].vessel_type}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && <FormLabel htmlFor="media">media</FormLabel>}
                    <CellbankMultiInput
                      type="text"
                      id="media"
                      name="media"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="media (e.g. farnesane)"
                      required
                      value={bulkForm[i].media}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="media_ml">media_ml</FormLabel>
                    )}
                    <CellbankMultiInput
                      id="media_ml"
                      name="media_ml"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="media_ml"
                      required
                      value={bulkForm[i].media_ml}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && (
                      <FormLabel htmlFor="inoculum_ul">inoculum_ul</FormLabel>
                    )}
                    <CellbankMultiInput
                      id="inoculum_ul"
                      name="inoculum_ul"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="inoculum_ul"
                      required
                      value={bulkForm[i].inoculum_ul}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && <FormLabel htmlFor="temp_c">temp_c</FormLabel>}
                    <CellbankMultiInput
                      id="temp_c"
                      name="temp_c"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="temp_c"
                      required
                      value={bulkForm[i].temp_c}
                    />
                  </CellbankFormCell>

                  <CellbankFormCell>
                    {i == 0 && <FormLabel htmlFor="rpm">RPM</FormLabel>}
                    <CellbankMultiInput
                      id="rpm"
                      name="rpm"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="rpm"
                      required
                      value={bulkForm[i].rpm}
                    />
                  </CellbankFormCell>

                  {/* <CellbankFormCell>
                    {i == 0 && <FormLabel htmlFor="start_date">start_date</FormLabel>}
                    <CellbankMultiInput
                      id="start_date"
                      name="start_date"
                      onChange={(e) => handleChange(e, i)}
                      placeholder="start_date"
                      required
                      value={bulkForm[i].start_date}
                    />
                  </CellbankFormCell> */}

                </TableRow>
              ))}
          </CellbankFormBody>
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
//     await fetch(`${baseUrl}/api/cellbank`, {
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
