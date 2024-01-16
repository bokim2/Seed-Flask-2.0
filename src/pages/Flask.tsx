import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlasks } from '../lib/hooks';

export default function Flask() {
  const [flasks, isLoading] = useFlasks<any>([]);

  return (
    <>
      <FlasksTable flasks={flasks} />
    </>
  );
}
