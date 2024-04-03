import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../configs';
import SingleCellbankGraph from '../graphs/SingleCellbankGraph';
import Button from '../../../ui/Button';
import ChartsTable from '../ChartsTable';

export default function SingleCellbankTab() {
  const [selectedCellbankId, setSelectedCellbankId] = useState<number | null>(
    null
  );

  const [singleCellbankGraphData, setSingleCellbankGraphData] = useState<any[]>(
    []
  );

  const getSingleCellbankGraphData = async (id) => {
    // console.log('data in graphs page, before fetch');
    const res = await fetch(`${baseUrl}/api/chart/cellbank/${id}`);
    const { data } = await res.json();
    setSingleCellbankGraphData(data);
    // console.log('data in setDataSingleCellbank page', data);
    return data;
  };

  useEffect(() => {
    // getGraphData();
    if (!selectedCellbankId) return;
    getSingleCellbankGraphData(selectedCellbankId);
  }, [selectedCellbankId]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={selectedCellbankId ? String(selectedCellbankId) : ''}
          onChange={(e) => setSelectedCellbankId(Number(e.target.value))}
          placeholder="Enter cellbank id"
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* <p>{JSON.stringify(singleCellbankGraphData)}</p> */}
      {singleCellbankGraphData && singleCellbankGraphData?.length > 0 && (
        <>
          <SingleCellbankGraph
            singleCellbankGraphData={singleCellbankGraphData}
          />

          <ChartsTable
            chartTitle="Single Cellbank"
            flasks={singleCellbankGraphData.flat()}
            bookmarkedFlasks={singleCellbankGraphData}
            // setBookmarkedFlasks={setBookmarkedFlasks}
          />
        </>
      )}
    </>
  );
}
