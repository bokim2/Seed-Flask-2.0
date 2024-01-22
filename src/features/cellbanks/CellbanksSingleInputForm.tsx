import React, { useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';
import {
  FormButton,
  FormInput,
  FormLabel,
  FormTextArea,
  InputContainer,
  StyledForm,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function CellbanksSingleInputForm() {
  const initialForm = {
    strain: '',
    notes: '',
    target_molecule: '',
    description: '',
  };

  type TForm = {
    strain: string,
    notes: string,
    target_molecule: string,
    description: string,
  };

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
const queryClient = useQueryClient();

  const {mutate, reset} = useMutation({
    mutationFn: async (form: TForm) => {
      const res = await fetch(`${baseUrl}/api/cellbank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      return data;
    },
    
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries({ queryKey: ["cellbanks"] });
        reset();

      },
    }
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate(form); // Trigger the mutation with the form <data>  </data>
    console.log('initialForm', initialForm)
    console.log('form', form)
    setForm(initialForm);
    console.log('setForm is reset to initial')
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
          <FormInput
            type="select"
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
          <FormLabel htmlFor="target_molecule">
            target molecule
          </FormLabel>
          <FormInput
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

        <Button $size={'sdaf'} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </StyledForm>
    </>
  );
}
