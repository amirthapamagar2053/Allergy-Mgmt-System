import React from "react";
import MenuAppBar from "./MenuAppBar";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Toolbar, Typography, Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const AllergyDetails = () => {
  const theme = useTheme();
  const allergies = useSelector((state) => state.allergies);
  let allergy_name = useParams();
  const selectedAllergies = allergies.find(
    (allergy) => String(allergy.name) === String(allergy_name.id)
  );
  console.log("the symptoms", selectedAllergies.symptoms);

  const handleDelete = () => {
    console.log("the handle delete entered");
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
      <Link to={{ pathname: `/AllergyLists/edit/${selectedAllergies.name}` }}>
        <Button> Edit</Button>
      </Link>
      <Button onClick={() => handleDelete()}>Delete</Button>
    </MenuAppBar>
  );
};

export default AllergyDetails;
