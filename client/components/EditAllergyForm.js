import { useTheme } from "@emotion/react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuAppBar from "./MenuAppBar";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editAllergy } from "../reducers/allergyReducers";
import { useNavigate } from "react-router-dom";

const EditAllergyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allergies = useSelector((state) => state.allergies);
  const allergy_name = useParams();
  const theme = useTheme();
  const selectedAllergies = allergies?.find(
    (allergy) => String(allergy.id) === String(allergy_name.id)
  );
  const [name, setName] = useState(selectedAllergies.name);
  const [symptoms, setSymptoms] = useState(selectedAllergies.symptoms);

  const [severity, setSeverity] = useState(selectedAllergies.severity);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editedAllergy = {
      name: data.get("name"),
      severity: data.get("severity"),
      symptoms: data.get("symptoms"),
    };
    console.log("the editallergy is", editedAllergy);

    dispatch(editAllergy(selectedAllergies.id, editedAllergy));
    navigate("/AllergyList");
  };
  const handleCancel = () => {};
  return (
    <div>
      <MenuAppBar>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              Edit the allergy
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="severity"
              label="Severity"
              id="severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="symptoms"
              label="Symptoms"
              id="symptoms"
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: theme.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.primary.main,
                },
              }}
            >
              Submit
            </Button>
            <Button
              onClick={handleCancel}
              fullWidth
              sx={{
                bgcolor: theme.secondary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.secondary.main,
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </MenuAppBar>
    </div>
  );
};

export default EditAllergyForm;
