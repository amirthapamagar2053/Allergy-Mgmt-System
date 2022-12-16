import { CssBaseline } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";

const MenuAppBar = ({ children }) => {
  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} xl={2}>
          <SideBar />
        </Grid>
        <Grid item xs={false} sm={4} md={7} xl={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default MenuAppBar;
