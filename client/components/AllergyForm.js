import { useTheme } from "@emotion/react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MenuAppBar from "./MenuAppBar";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { addAllergy } from "../reducers/allergyReducers";

const AllergyForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newAllergy = {
      name: data.get("name"),
      symptoms: data.get("symptoms"),
      severity: data.get("severity"),
    };
    dispatch(addAllergy(newAllergy));
  };

  const handleCancel = () => {
    console.log("the handle cancel entered");
  };
  return (
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
            Add a new Allergy
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="severity"
            label="Severity"
            type="severity"
            id="severity"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="symptoms"
            label="Symptoms"
            type="symptoms"
            id="symptoms"
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
  );
};

export default AllergyForm;
