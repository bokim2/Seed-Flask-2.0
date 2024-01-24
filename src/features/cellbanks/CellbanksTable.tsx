import CellbanksRow from './CellbanksRow';
import {
  TableContainer,
  StyledTable,
  Caption,
  TableHeader,
  TableRow,
  TableHeaderCell,
  Wrapper,
  StyledForm,
} from '../../styles/UtilStyles';

export default function CellbanksTable({ cellbanks }) {
  // console.log(cellbanks, 'in cellbankstable');

  return (
    // <Wrapper>
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submit in FORM submit', e.target);
      }}
    >
      <TableContainer id="TableContainer">
        <StyledTable>
          <Caption>Cell Banks Table</Caption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>cell bank id</TableHeaderCell>
              <TableHeaderCell>strain</TableHeaderCell>
              <TableHeaderCell>target molecule</TableHeaderCell>
              <TableHeaderCell>details</TableHeaderCell>
              <TableHeaderCell>notes</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
              <TableHeaderCell>edit</TableHeaderCell>
              <TableHeaderCell>delete</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {cellbanks &&
              cellbanks?.map((cellbank, i) => (
                <CellbanksRow
                  key={cellbank.cell_bank_id}
                  cellbank={cellbank}
                  cellbankRow={{ ...cellbanks[i] }}
                />
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </StyledForm>
    // </Wrapper>
  );
}
