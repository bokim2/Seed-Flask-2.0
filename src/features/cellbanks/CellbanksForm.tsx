import React, { useState } from 'react';
import { baseUrl } from '../../../configs';

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="strain">strain</label>
        <input
          type="text"
          id="strain"
          name="strain"
          placeholder="strain name"
          onChange={handleChange}
          required
        />

        <label htmlFor="notes">notes</label>
        <input
          type="text"
          id="notes"
          name="notes"
          onChange={handleChange}
          placeholder="notes"
          required
        />

        <label htmlFor="target_molecule">target molecule</label>
        <input
          type="text"
          id="target_molecule"
          name="target_molecule"
          onChange={handleChange}
          placeholder="target molecule"
          required
        />

        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          placeholder="description"
          required
        />

        <button type="submit" disabled={isSubmitting} >
          Submit
        </button>
      </form>
    </>
  );
}
