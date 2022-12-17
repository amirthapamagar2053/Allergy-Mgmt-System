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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteAllergy } from "../reducers/allergyReducers";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let allergies = useSelector((state) => state.allergies);
  let allergy = allergies
    ? [...allergies]
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(b.highRisk) - Number(a.highRisk))
    : [];
  // allergy = allergy
  //   ? allergy
  //       .sort((a, b) => a.name.localeCompare(b.name))
  //       .sort((a, b) => Number(b.highRisk) - Number(a.highRisk))
  //   : [];

  const handleEdit = (allergy_id) => {
    navigate(`/AllergyLists/edit/${allergy_id}`);
  };

  const handleDelete = (allergies_id) => {
    dispatch(deleteAllergy(allergies_id));
  };

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
        <Box sx={{ display: "flex" }}>
          <Icon
            icon="mdi:allergy"
            style={{ fontSize: "44px", color: `${theme.primary.main}` }}
          />{" "}
          <Typography
            variant="h5"
            sx={{ fontFamily: `${theme.text.main}`, mt: "10px " }}
          >
            Allergy List
          </Typography>
        </Box>
        <Link to="/AllergyForm" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ bgcolor: `${theme.primary.main}` }}>
            <Typography> Add a new Allergy </Typography>
          </Button>
        </Link>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Allergy Name</StyledTableCell>
              <StyledTableCell align="center">Symptoms</StyledTableCell>
              <StyledTableCell align="center">Severity</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allergy.map((allergy) => (
              <>
                <StyledTableRow
                  key={allergy.id}
                  component={Link}
                  to={{ pathname: `/AllergyLists/${allergy.id}` }}
                  sx={{ textDecoration: "none" }}
                >
                  <StyledTableCell align="center">
                    <Typography variant="h6">{allergy.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6">{allergy.symptoms}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6">{allergy.severity}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.preventDefault(),
                          e.stopPropagation(),
                          handleEdit(allergy.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.preventDefault(),
                          e.stopPropagation(),
                          handleDelete(allergy.id);
                      }}
                      sx={{ m: "10px" }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MenuAppBar>
  );
};

export default AllergyList;
