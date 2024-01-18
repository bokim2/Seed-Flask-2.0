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

export default function CellbanksForm() {
  const initialForm = {
    strain: '',
    notes: '',
    target_molecule: '',
    description: '',
  };

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <InputContainer>
          <FormLabel htmlFor="strain">strain</FormLabel>
          <FormInput
            type="select"
            id="strain"
            name="strain"
            placeholder="strain (e.g. aspergillus)"
            onChange={handleChange}
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
