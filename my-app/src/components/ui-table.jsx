import React,  {memo} from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UITable = ({...props}) => {

    const useStyles = makeStyles({
        table: {
          maxWidth: 600,
          display: 'inline-table'
        },
      });

      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      const {tk1Key} = props;

    return(
        <div className="tableClass">
          <h1>Metric Table</h1> 
            <TableContainer component={Paper}>
                <Table className={useStyles().table}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="justify">Metric</StyledTableCell>
                        <StyledTableCell align="justify">Value</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.keys(tk1Key).map((row, key) => (
                        <StyledTableRow key={row}>
                            <StyledTableCell component="th" scope="row">{row}</StyledTableCell>
                            <StyledTableCell align='justify'>{tk1Key[row]}</StyledTableCell>
                        </StyledTableRow>
                    ))} 
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );

}

export default memo(UITable);