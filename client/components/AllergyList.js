import React from "react";
import MenuAppBar from "./MenuAppBar";
import { Icon } from "@iconify/react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Box, styled } from "@mui/system";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.secondary.main,
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.primary.main,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: "white",
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AllergyList = () => {
  const theme = useTheme();
  let allergy = useSelector((state) => state.allergies);
  allergy = allergy ? allergy : [];
  return (
    <MenuAppBar>
      <Toolbar
        fullwidth
        sx={{
          display: "flex",
          height: 150,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", m: "8 px" }}>
          <Icon
            icon="mdi:allergy"
            style={{ fontSize: "44px", color: `${theme.primary.main}` }}
          />{" "}
          <Typography variant="h5" sx={{ fontFamily: `${theme.text.main}` }}>
            Allergy List
          </Typography>
        </Box>
        <Button>Add a new Allergy</Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Allergy Name</StyledTableCell>
              <StyledTableCell align="center">Symptoms</StyledTableCell>
              <StyledTableCell align="center">Severity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allergy.map((allergy) => (
              <StyledTableRow key={allergy.name}>
                <StyledTableCell align="center">
                  <Typography variant="h6">{allergy.name}</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="h6">{allergy.symptoms}</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="h6">{allergy.severity}</Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MenuAppBar>
  );
};

export default AllergyList;
