import { useTheme } from "@emotion/react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
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
  allergies ? allergies : [];

  const allergy_name = useParams();
  const theme = useTheme();
  const selectedAllergies = allergies?.find(
    (allergy) => String(allergy.id) === String(allergy_name.id)
  );

  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("");
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState("");

  useEffect(() => {
    setName(selectedAllergies?.name);
    setSymptoms(selectedAllergies?.symptoms);
    setSeverity(selectedAllergies?.severity);
    setImage(selectedAllergies?.allergyImg);
    setChecked(selectedAllergies?.highRisk);
  }, [selectedAllergies]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editedAllergy = {
      name: data.get("name"),
      severity: data.get("severity"),
      symptoms: data.get("symptoms"),
      highRisk: checked,
      allergyImg: image,
    };

    dispatch(editAllergy(selectedAllergies.id, editedAllergy));
    navigate("/AllergyList");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleCancel = () => {
    navigate(-1);
  };

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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                value
              />
              <Typography>High Risk</Typography>
            </Box>

            <img src={image} alt="allergyimage" />
            <Typography variant="h6"> Change An Image for Allergy</Typography>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => handleImageChange(e)}
              required
              accept="image/png,image/jpeg"
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
