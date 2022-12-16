import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 200,
          }}
          alt="Your logo."
          src={
            "https://cdn.dribbble.com/users/894913/screenshots/2274255/logo_lf.jpg"
          }
        />
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button>
            <Link to="/OverView">
              <Typography component="body1" variant="overline">
                Overview
              </Typography>
            </Link>
          </Button>
        </Box>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button>
            <Link to="/AllergyList">
              <Typography component="body1" variant="overline">
                Allergy List
              </Typography>
            </Link>
          </Button>
        </Box>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Button>
            <Link to="/ContactUs">
              <Typography component="body1" variant="overline">
                Contact us
              </Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
