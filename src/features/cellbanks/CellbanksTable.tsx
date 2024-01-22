import CellbanksRow from './CellbanksRow';
import {
  TableContainer,
  StyledTable,
  Caption,
  TableHeader,
  TableRow,
  TableHeaderCell,
  Wrapper,
} from '../../styles/UtilStyles';

export default function CellbanksTable({ cellbanks }) {
  // console.log(cellbanks, 'in cellbankstable');
  return (
    // <Wrapper>
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
              cellbanks?.map((cellbank) => (
                <CellbanksRow key={cellbank.cell_bank_id} cellbank={cellbank} />
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    // </Wrapper>
  );
}
