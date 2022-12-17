import React from "react";
import MenuAppBar from "./MenuAppBar";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Toolbar, Typography, Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import { deleteAllergy } from "../reducers/allergyReducers";

const AllergyDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allergies = useSelector((state) => state.allergies);
  let allergy_name = useParams();
  const selectedAllergies = allergies.find(
    (allergy) => String(allergy.name) === String(allergy_name.id)
  );
  console.log("the symptoms", selectedAllergies.symptoms);

  const handleDelete = () => {
    console.log("the handle delete entered");
    dispatch(deleteAllergy(selectedAllergies.id));
    navigate("/AllergyList");
  };

  const handleEdit = () => {
    navigate(`/AllergyLists/edit/${selectedAllergies.name}`);
  };

  return (
    <MenuAppBar>
      <Toolbar>
        <Box
          sx={{
            height: 150,
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            icon="mdi:allergy"
            style={{ fontSize: "44px", color: `${theme.primary.main}` }}
          />{" "}
          <Typography
            variant="h5"
            sx={{ fontFamily: `${theme.text.main}`, mt: "10px ", p: "5px" }}
          >
            {selectedAllergies.name}
          </Typography>
        </Box>
      </Toolbar>
      <Box>
        <Grid container>
          <Grid item xs={false} sm={4} md={7} xl={2}>
            <Box>Hello world</Box>
          </Grid>
          <Grid item xs={false} sm={4} md={7} xl={6}>
            <Box>
              <Typography variant="outlined">Symptoms</Typography>
              {selectedAllergies.symptoms.map((symptom, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Icon icon="ci:dot-02-s" />
                  <Typography>{symptom}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button variant="outlined" onClick={() => handleEdit()}>
        {" "}
        Edit
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleDelete()}
        sx={{ m: "10px" }}
      >
        Delete
      </Button>
    </MenuAppBar>
  );
};

export default AllergyDetails;
