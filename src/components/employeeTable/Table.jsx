import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Paper,
  TablePagination,
  Typography,
  styled,
} from "@mui/material";
import Spinner from "../Spinner";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Default Table Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(8,152,169)",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "0",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(8,152,169,0.05)",
  },
  borderTop: "thin solid #e6e6e6",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EmployeeTable = ({ employeeData, loading }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Add data to table rows
  const getTableRow = (data) => {
    const row = (
      <StyledTableRow key={data.id}>
        <StyledTableCell
          onClick={() => {
            console.log(data.details);
            navigate(`/details/?id=${data.first_name}`);
          }}
        >
          <Typography
            variant="p"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {data.id}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>{data.first_name}</StyledTableCell>
        <StyledTableCell>{data.last_name}</StyledTableCell>
        <StyledTableCell>{data.date_of_birth}</StyledTableCell>
        <StyledTableCell>{data.address}</StyledTableCell>
        <StyledTableCell>{data.date_of_joining}</StyledTableCell>
        <StyledTableCell>{data.salary}</StyledTableCell>
        <StyledTableCell>{data.designation}</StyledTableCell>
      </StyledTableRow>
    );
    return row;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        color: "white",
        boxShadow: "none",
        overflowX: "auto",
      }}
    >
      {/* -----------------------------------Table-------------------------------------- */}
      <Table sx={{ border: "thin solid #e6e6e6" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Id</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Date of Birth</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Date of Joining</StyledTableCell>
            <StyledTableCell>Salary</StyledTableCell>
            <StyledTableCell>Designation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.length === 0 && !loading ? (
            <TableRow>
              <StyledTableCell sx={{ color: "red" }}>
                No Results Found!
              </StyledTableCell>
            </TableRow>
          ) : (
            employeeData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => getTableRow(employee))
          )}
        </TableBody>
      </Table>

      {/* -----------------------------------Spinner-------------------------------------- */}
      {loading ? (
        <Container
          sx={{
            minHeight: "20rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size={50} />
        </Container>
      ) : null}

      {/* -----------------------------------Pagination-------------------------------------- */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EmployeeTable;
