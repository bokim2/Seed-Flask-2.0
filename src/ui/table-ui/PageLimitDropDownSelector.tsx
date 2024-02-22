import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

export default function PageLimitDropDownSelector({
  handleChoosePageLimit,
  pageLimitSetting,
  tableName,
  
}) {
  const pageLimitOtions = [10, 20, 50, 100];
  const queryClient = useQueryClient()


  return (
    <select
      value={pageLimitSetting}
      onChange={(e) => {
        handleChoosePageLimit(e.target.value)
        queryClient.removeQueries({ queryKey: [tableName] });
    }}
    >
      {pageLimitOtions.map((pageLimitOption) => (
        <option key={pageLimitOption} value={pageLimitOption}>{pageLimitOption}</option>
      ))}
    </select>
  );
}
