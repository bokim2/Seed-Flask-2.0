import React, { useEffect, useState } from 'react';
import CellbanksForm from '../features/cellbanks/CellbanksForm';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';

export default function Cellbank() {
  const [cellbanks, setCellbanks] = useState<any>([]);

  const fetchCellbanks = async () => {
    const res = await fetch(`${baseUrl}/api/cellbanks`);
    const {data} = await res.json();
    console.log(data, 'in fetchcellbanks')
    setCellbanks(data)
    return data
  };

  useEffect(() => {
fetchCellbanks();
    // setCellbanks(data)
  }, []);

  return (
    <div>
      {/* {JSON.stringify(cellbanks)} */}
      <CellbanksForm />
      <CellbanksTable cellbanks={cellbanks}/>
    </div>
  );
}
