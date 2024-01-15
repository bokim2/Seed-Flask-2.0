import React, { useState } from 'react';
import { baseUrl } from '../../../configs';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  gap: 0.5rem;
`;

const InputContainer = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
`;

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <label htmlFor="strain">strain</label>
          <input
            type="select"
            id="strain"
            name="strain"
            placeholder="strain name (e.g. aspergillus, e.coli)"
            onChange={handleChange}
            required
            autoFocus
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="notes">notes</label>
          <input
            type="text"
            id="notes"
            name="notes"
            onChange={handleChange}
            placeholder="notes"
            required
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="target_molecule">target molecule</label>
          <input
            type="text"
            id="target_molecule"
            name="target_molecule"
            onChange={handleChange}
            placeholder="target molecule"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="description"
            required
          />
        </InputContainer>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </StyledForm>
    </>
  );
}
