import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { selectors } from "@features/cart/slice";

import Description from "./Description";
import Price from "./Price";
import UserSelection from "./UserSelection";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableComponent = () => {
  const products = useSelector(selectors.entity.selectAll);
  const hasLoaded = useSelector(selectors.selectHasLoaded);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: 300 }} aria-label="simple table">
        {!hasLoaded ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "6.5%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Retail Price</StyledTableCell>
                <StyledTableCell align="left">Quantity</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.name}>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell>
                    <Description product={product} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Price product={product} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <UserSelection product={product} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
