import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PasswordInput from "../Authentication/PasswordInput";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/gesh.png";
import bgPattern from "../../assets/images/login/bg.svg";
import VideoPlayer from "../common/VideoPlayer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // useEffect(() => {
  //   callApi();
  // }, []);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    const isEmailValid = email.trim() !== "" && validateEmail(email);
    const isPasswordValid = passwordRegex.test(password);
    const isAgreedValid = agreed;

    setIsFormValid(isEmailValid && isPasswordValid && isAgreedValid);
  }, [email, password, agreed]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isEmailValid = email.trim() !== "" && validateEmail(email);
    const isPasswordValid = password.trim() !== "";
    const isAgreedValid = agreed;

    setError({
      email: !isEmailValid,
      password: !isPasswordValid,
    });

    setHelperText({
      email: !isEmailValid ? "Please enter a valid email address" : "",
      password: !isPasswordValid ? "Password is required" : "",
    });

    if (isEmailValid && isPasswordValid && isAgreedValid) {
      console.log(isEmailValid, isPasswordValid, isAgreedValid);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ user_name: email, user_password: password })
      );
      navigate("/owner/personal-info");
    }
  };

  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container style={{ height: "100%", width: "100%" }}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <VideoPlayer />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <img
            src={bgPattern}
            alt=""
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: "1",
              width: "400px",
              height: "400px",
            }}
          />
          <Box
            style={{
              maxWidth: "420px",
              width: "100%",
              padding: "20px",
              position: "relative",
              zIndex: "2",
            }}
          >
            <img
              src={pic}
              alt="Logo"
              style={{ width: "90px", marginBottom: "15px" }}
            />
            <Typography
              variant="h1"
              gutterBottom
              style={{ fontFamily: "Inter", fontSize: "29px", fontWeight: 500 }}
            >
              Register Account!
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginTop: "16px",
                marginBottom: "2rem",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: 15,
                color: "#8692A6",
              }}
            >
              Join us to access sustainability reports and track your progress
              towards a greener future.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                required
                size="medium"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                helperText={helperText.email}
                style={{
                  marginBottom: 15,
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
                sx={{
                  fontSize: "14px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#369D9C",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "rgba(0, 0, 0, 0.60)",
                    fontFamily: "Inter",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "red", // Custom helper text color
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "Inter",
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "Inter",
                    fontSize: "14px",
                  },
                  input: {
                    fontSize: "14px",
                  },
                }}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
                helperText={helperText.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    sx={{
                      color: "primary",

                      "&.Mui-checked": {
                        color: "#43BAB9",
                      },
                      svg: {
                        fill: "#43BAB9",
                      },
                    }}
                  />
                }
                label="I agree to terms & conditions"
                sx={{
                  marginTop: "2rem",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  color: "#696F79",
                  "& .MuiFormControlLabel-label": {
                    fontFamily: "Inter, Arial, sans-serif",
                  },
                  span: {
                    fontWeight: "500",
                  },
                  ".MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />{" "}
              {/* <CustomField
                label={"Report Name"}
                fullWidth={false}
                // value={reportName}
                // onChange={(e) => setReportName(e.target.value)}
                sx={{ marginRight: "1rem", width: "20rem" }}
              /> */}
              <button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isFormValid}
                style={{
                  marginTop: "8px",
                  padding: "14px 24px",
                  borderRadius: 6,
                  background: !isFormValid ? "#E8E8E8" : "",
                  backgroundImage: isFormValid
                    ? "linear-gradient(102deg, #369D9C 0%, #28814D 100%)"
                    : "",
                  fontWeight: 500,
                  fontSize: "15px",
                  fontFamily: "Inter",
                  color: !isFormValid ? "#A2A2A2" : "#FFF",
                  border: "1px solid #DDD",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                }}
              >
                Register Account
              </button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
