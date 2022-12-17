import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Box sx={{ position: "sticky", top: "0px" }}>
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography component="body1" variant="overline">
                  Overview
                </Typography>
              </Link>
            </Button>
          </Box>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Button>
              <Link to="/AllergyList" style={{ textDecoration: "none" }}>
                <Typography component="body1" variant="overline">
                  Allergy List
                </Typography>
              </Link>
            </Button>
          </Box>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Button>
              <Link to="/ContactUs" style={{ textDecoration: "none" }}>
                <Typography component="body1" variant="overline">
                  Contact us
                </Typography>
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
