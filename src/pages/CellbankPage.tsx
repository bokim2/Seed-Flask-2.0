import React, { useEffect, useState } from 'react';
import CellbanksSingleInputForm from '../features/cellbanks/CellbanksSingleInputForm';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import { useFetchCellbanksQuery } from '../features/cellbanks/cellbanks-hooks';
import CellbanksMultiInputForm from '../features/cellbanks/CellbanksMultiInputForm';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';
import { useDispatch, useSelector } from 'react-redux';
import { addCellbankBookmark } from '../features/settings/bookmarksSlice';
import { RootState } from '../lib/store';
import Button from '../ui/Button';

export default function CellbankPage() {
  const [cellbanks, isLoading, error] = useFetchCellbanksQuery();
  // console.log('cellbanks in cellbanks page', cellbanks);
  const [toggleTextTruncation, settToggleTextTruncation] = useState(true); // cut off details on long cellbank cells

  // bookmarked cellbanks
  const dispatch = useDispatch();
  const handleAddBookmark = (id) => {
    dispatch(addCellbankBookmark(id));
  };

  const cellbankBookmarks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );
  // console.log('cellbankBookmarks', cellbankBookmarks);

  // const fetchCellbanks = async () => {
  //   const res = await fetch(`${baseUrl}/api/cellbanks`);
  //   const { data } = await res.json();
  //   // console.log(data, 'in fetchcellbanks')
  //   setCellbanks(data);
  //   return data;
  // };

  // useEffect(() => {
  //   fetchCellbanks();
  //   // setCellbanks(data)
  // }, []);
  // const handleEditForm = (e) => {}

  return (
    <PageContainer id="CellbankPageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>
      <InnerPageContainer id="CellbankInnerPageContainer">
        <Button
          $size={'small'}
          onClick={() => settToggleTextTruncation((prev) => !prev)}
        >
          {!toggleTextTruncation
            ? 'Show Table Cell Details'
            : 'Hide Table Cell Overflow'}
        </Button>

        <h3>{JSON.stringify(cellbankBookmarks)}</h3>
        <CellbanksMultiInputForm />
        {error && <ErrorMessage error={error} />}
        {!isLoading && (
          <CellbanksTable
            cellbanks={cellbanks}
            handleAddBookmark={handleAddBookmark}
            toggleTextTruncation={toggleTextTruncation}
          />
        )}
        {/* {JSON.stringify(cellbanks)} */}
        {/* <CellbanksSingleInputForm /> */}
      </InnerPageContainer>
    </PageContainer>
  );
}
