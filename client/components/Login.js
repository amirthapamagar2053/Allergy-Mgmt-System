import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { logUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { getAllergy } from "../reducers/allergyReducers";
import { useNavigate } from "react-router-dom";

export default function SignInSide() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const savedUser = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await dispatch(logUser(savedUser));
    await dispatch(getAllergy());
    navigate("/");
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://cdn.dribbble.com/users/894913/screenshots/2274255/logo_lf.jpg)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: `${theme.text.main}` }}
          >
            Sign in
          </Typography>
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              // onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: theme.primary.main,
                "&:hover": {
                  backgroundColor: theme.secondary.main,
                },
              }}
            >
              Sign In
            </Button>
          </Box>
          <Link to="/Signup">
            <Typography
              variant="h6"
              sx={{
                color: `${theme.secondary.main}`,
                fontFamily: `${theme.text.main}`,
              }}
            >
              {"Don't have an account? Sign Up"}
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
