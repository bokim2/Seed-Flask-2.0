import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlasks } from '../lib/hooks';
import LoaderBar from '../ui/LoaderBar';

export default function Flask() {
  const [flasks, isLoading] = useFlasks();

  return (
    <>
      {isLoading ? <LoaderBar/> : <FlasksTable flasks={flasks} />}
    </>
  );
}
