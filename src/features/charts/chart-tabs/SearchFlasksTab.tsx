import React from 'react';
import FlasksTable from '../../flasks/FlasksTable';

export default function SearchFlasksTab({ flasks, isLoading }) {
  return (
    <>
      {flasks && flasks.length > 0 && !isLoading && (
        <FlasksTable flasks={flasks} />
      )}
    </>
  );
}
