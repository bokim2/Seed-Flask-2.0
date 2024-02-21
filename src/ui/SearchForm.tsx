import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { baseUrl } from '../../configs';
import { cellbanksValidFields } from '../features/cellbanks/cellbanks-types';
import { formatColumnName } from '../lib/hooks';

export function useTextInputSearch() {
  // Keep search criteria as an array of objects { field, text }
  const [searchCriteria, setSearchCriteria] = useState<any>([]);

  // Function to handle updating the search criteria array
  const updateSearchCriteria = (criteria) => {
    setSearchCriteria(criteria);
  };

  const performInputTextSearch = async () => {
    // Construct URLSearchParams with multiple searchField and searchText entries
    const params = new URLSearchParams();
    searchCriteria.forEach(criterion => {
      params.append('searchField[]', criterion.field);
      params.append('searchText[]', criterion.text);
    });

    try {
      const response = await fetch(`${baseUrl}/api/cellbanks/search?${params}`);
      if (!response.ok) {
        throw new Error('Failed to perform input text search');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error in performInputTextSearch', err);
      return [];
    }
  };

  return {
    searchCriteria,
    updateSearchCriteria,
    performInputTextSearch,
  };
}


export default function SearchForm({setSearchedData}) {
  const { searchCriteria, updateSearchCriteria, performInputTextSearch } = useTextInputSearch();

  const handleAddCriteria = () => {
    updateSearchCriteria([...searchCriteria, { field: '', text: '' }]);
  };

  const handleRemoveCriteria = (index) => {
    const newCriteria = [...searchCriteria];
    newCriteria.splice(index, 1);
    updateSearchCriteria(newCriteria);
  };

  const handleFieldChange = (index, value) => {
    const newCriteria = [...searchCriteria];
    newCriteria[index].field = value;
    updateSearchCriteria(newCriteria);
  };

  const handleTextChange = (index, value) => {
    const newCriteria = [...searchCriteria];
    newCriteria[index].text = value;
    updateSearchCriteria(newCriteria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await performInputTextSearch();
    console.log('performInputTextSearch', data)
    setSearchedData(data);
    console.log(data); // Do something with the data
  };

  return (
    <form onSubmit={handleSubmit}>
      {searchCriteria.map((criterion, index) => (
        <div key={index}>
          {/* <input
            value={criterion.field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            placeholder="Field"
          /> */}

          <select name="selectField" id="selectField" onChange={(e) => handleFieldChange(index, e.target.value)}>
            {cellbanksValidFields.map((field)=> {
                return <option key={field} value={field}>{formatColumnName(field)}</option>
            })}
          </select>
          <input
            value={criterion.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            placeholder="Search Text"
          />
          <button type="button" onClick={() => handleRemoveCriteria(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddCriteria}>Add Search Criterion</button>
      <button type="submit">Search</button>
    </form>
  );
}
