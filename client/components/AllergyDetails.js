import React from "react";
import MenuAppBar from "./MenuAppBar";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Toolbar, Typography, Grid, Button, Paper } from "@mui/material";
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
  if (allergies === null) {
    return null;
  }
  const selectedAllergies = allergies.find(
    (allergy) => String(allergy.id) === String(allergy_name.id)
  );

  const handleDelete = () => {
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
      <Paper>
        <Box>
          <Grid container>
            <Grid item xs={false} sm={4} md={7} xl={2}>
              <Box>
                {" "}
                <img src={selectedAllergies.allergyImg} alt="allergyimage" />
              </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={7} xl={6}>
              <Box sx={{ display: "flex" }} gap={5}>
                <Box>
                  <Typography variant="outlined">Symptoms</Typography>
                  {selectedAllergies.symptoms.map((symptom, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Icon icon="ci:dot-02-s" />
                      <Typography>{symptom}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Typography>High Risk</Typography>
                  <Typography>{String(selectedAllergies.highRisk)}</Typography>
                </Box>
                <Box>
                  <Typography>
                    Severity{" "}
                    <Typography> {selectedAllergies.severity}</Typography>{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Button variant="outlined" onClick={() => handleEdit()}>
        {" "}
        Edit
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleDelete()}
        sx={{ m: "10px" }}
        color="error"
      >
        Delete
      </Button>
    </MenuAppBar>
  );
};

export default AllergyDetails;
