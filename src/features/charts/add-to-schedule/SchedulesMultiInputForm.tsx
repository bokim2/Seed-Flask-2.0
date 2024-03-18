// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import {
//   FormLabel,
//   StyledForm,
//   BulkInputTextArea,
//   MultiInputFormBody,
//   FormInputCell,
//   MultiInput,
//   ButtonsContainer,
//   CreateEntryTable,
//   CreateEntryTableRow,
// } from '../../../styles/UtilStyles';
// import Button from '../../../ui/Button';
// import {
//   TCreateCellbank,
//   createCellbankColumnsArray,
//   initialCreateCellbankForm,
// } from '../schedules-types';

// import ErrorMessage from '../../../ui/ErrorMessage';
// import { useBulkInputForm } from '../../../hooks/table-hooks/useBulkInputForm';
// import { useCreateValidatedRowMutation } from '../../../hooks/table-hooks/useCreateValidatedRowMutation';
// import {
//   createCellbankSchema,
//   createScheduleSchema,
// } from '../../../../server/zodSchemas';

// export default function SchedulesMultiInputForm() {
//   // create a row
//   const {
//     mutate: createScheduleMutation,
//     isPending,
//     error: createError,
//   } = useCreateValidatedRowMutation({
//     tableName: 'schedules',
//     zodSchema: createScheduleSchema,
//   });

//   const {
//     bulkTextAreaInput,
//     setBulkTextAreaInput,
//     bulkForm,
//     handleSubmit,
//     handleChange,
//     handleClearForm,
//   } = useBulkInputForm<TCreateCellbank>({
//     createTableColumnsArray: createCellbankColumnsArray,
//     createTableRowMutation: createCellbankMutation,
//     initialCreateRowForm: initialCreateCellbankForm,
//   });

//   return (
//     <>
//       <BulkInputTextArea
//         name="bulkTextAreaInputForMultiSubmit"
//         placeholder="copy/paste from excel"
//         value={bulkTextAreaInput}
//         onChange={(e) => setBulkTextAreaInput(e.target.value)}
//       ></BulkInputTextArea>

//       {createError && <ErrorMessage error={createError} />}
//       {isPending && <h1>Submitting cellbank(s) in progress...</h1>}

//       <StyledForm
//         onSubmit={(e) => {
//           handleSubmit(e, bulkForm);

//           console.log('bulkForm in submit', bulkForm);
//         }}
//       >
//         <CreateEntryTable>
//           <MultiInputFormBody>
//             {bulkForm.length !== 0 &&
//               bulkForm?.map((row, i) => (
//                 <CreateEntryTableRow key={i}>
//                   <FormInputCell className="create-row">
//                     <MultiInput
//                       id="strain"
//                       name="strain"
//                       placeholder="strain (e.g. aspergillus)"
//                       onChange={(e) => handleChange(e, i)}
//                       required
//                       autoFocus
//                       value={bulkForm[i].strain}
//                     />
//                     {i == 0 && <FormLabel htmlFor="strain">strain</FormLabel>}
//                   </FormInputCell>

//                   <FormInputCell>
//                     <MultiInput
//                       id="target_molecule"
//                       name="target_molecule"
//                       onChange={(e) => handleChange(e, i)}
//                       placeholder="target molecule (e.g. farnesane)"
//                       required
//                       value={bulkForm[i].target_molecule}
//                     />
//                     {i == 0 && (
//                       <FormLabel htmlFor="target_molecule">
//                         target molecule
//                       </FormLabel>
//                     )}
//                   </FormInputCell>

//                   <FormInputCell>
//                     <MultiInput
//                       id="project"
//                       name="project"
//                       onChange={(e) => handleChange(e, i)}
//                       placeholder="project (e.g. cloudberry)"
//                       required
//                       value={bulkForm[i].project}
//                     />
//                     {i == 0 && <FormLabel htmlFor="project">project</FormLabel>}
//                   </FormInputCell>

//                   <FormInputCell>
//                     <MultiInput
//                       id="description"
//                       name="description"
//                       onChange={(e) => handleChange(e, i)}
//                       placeholder="description"
//                       required
//                       value={bulkForm[i].description}
//                     />
//                     {i == 0 && (
//                       <FormLabel htmlFor="description">description</FormLabel>
//                     )}
//                   </FormInputCell>

//                   <FormInputCell>
//                     <MultiInput
//                       id="notes"
//                       name="notes"
//                       onChange={(e) => handleChange(e, i)}
//                       placeholder="notes"
//                       required
//                       value={bulkForm[i].notes}
//                     />
//                     {i == 0 && <FormLabel htmlFor="notes">notes</FormLabel>}
//                   </FormInputCell>
//                 </CreateEntryTableRow>
//               ))}

//             {/* {popularOptionsArray } */}
//           </MultiInputFormBody>
//         </CreateEntryTable>
//         <ButtonsContainer>
//           <Button $size={'small'} type="submit" disabled={isPending}>
//             Submit
//           </Button>
//           <Button $size={'small'} type="reset" onClick={handleClearForm}>
//             Clear
//           </Button>
//         </ButtonsContainer>
//       </StyledForm>
//     </>
//   );
// }

// // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //   try {
// //     e.preventDefault();
// //     console.log('submitting', 'form', form, 'bulkform', bulkForm);
// //       method: 'POST',
// //       headers: {
// //         'content-type': 'application/json',
// //       },

// //       body: JSON.stringify(form),
// //     });
// //     setForm((prev) => initialUpdateCellbankForm);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
