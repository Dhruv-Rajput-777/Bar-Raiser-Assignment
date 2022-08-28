import React from "react";
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  tableCellClasses,
  Container,
  styled,
} from "@mui/material";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

// Default Table Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(8,152,169)",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "0",
  },
  padding: "1rem 2rem",
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

const PersonalDetails = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  let { employeeData, loading, err } = useFetch({
    url: `https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${id}`,
  });
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Grid item sx={{}}>
          <TableContainer
            component={Paper}
            sx={{
              color: "white",
              boxShadow: "none",
              overflowX: "auto",
              minWidth: "20vw",
              border: "thin solid #e6e6e6",
            }}
          >
            {/* -----------------------------------Table-------------------------------------- */}
            <Table sx={{}}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Field</StyledTableCell>
                  <StyledTableCell>Value</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData.length === 0 && !loading ? (
                  <TableRow>
                    <StyledTableCell sx={{ color: "red" }}>
                      No Results Found!
                    </StyledTableCell>
                  </TableRow>
                ) : null}
                {employeeData.length
                  ? Object.keys(employeeData[0]).map((key) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell>{key}</StyledTableCell>
                          <StyledTableCell>
                            {employeeData[0][key]}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  : null}
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
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalDetails;
