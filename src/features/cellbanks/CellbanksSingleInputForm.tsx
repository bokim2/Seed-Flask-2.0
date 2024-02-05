import React, { useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormButton,
  SingleFormInput,
  FormLabel,
  FormTextArea,
  InputContainer,
  StyledForm,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { initialForm } from '../../lib/constants';
import { useCreateCellbankMutation } from './cellbanks-hooks';

export default function CellbanksSingleInputForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const queryClient = useQueryClient();

  //   const {mutate, reset} = useMutation({
  //     mutationFn: async (form: TForm) => {
  //       const res = await fetch(`${baseUrl}/api/cellbank`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(form),
  //       });
  //       const data = await res.json();
  //       return data;
  //     },

  //       onSuccess: () => {
  //         console.log('success');
  //         queryClient.invalidateQueries({ queryKey: ["cellbanks"] });
  //         reset();

  //       },
  //     }
  //   );
  const [createCellbankMutation, isPending] = useCreateCellbankMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    createCellbankMutation(form); // Trigger the mutation with the form <data>  </data>
    console.log('initialForm', initialForm);
    console.log('form', form);
    setForm(initialForm);
    console.log('setForm is reset to initial');
    setIsSubmitting(false);
  };

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer id="InputContainer">
          <FormLabel htmlFor="strain">strain</FormLabel>
          <SingleFormInput
            type="text"
            id="strain"
            name="strain"
            placeholder="strain (e.g. aspergillus)"
            onChange={handleChange}
            value={form.strain}
            required
            autoFocus
          />
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor="target_molecule">target molecule</FormLabel>
          <SingleFormInput
            type="text"
            id="target_molecule"
            name="target_molecule"
            onChange={handleChange}
            placeholder="target molecule (e.g. farnesane)"
            value={form.target_molecule}
            required
          />
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor="description">description</FormLabel>
          <FormTextArea
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="description"
            value={form.description}
            required
          />
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor="notes">notes</FormLabel>
          <FormTextArea
            id="notes"
            name="notes"
            onChange={handleChange}
            placeholder="notes"
            value={form.notes}
            required
          />
        </InputContainer>

        <Button $size={'small'} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </StyledForm>
    </>
  );
}
