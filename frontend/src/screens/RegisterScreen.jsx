import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Typography } from "@mui/material";

import { BackButton } from "../components/buttons/BackButton";
import { useCustomForm } from "../hooks";
import { startRegister } from "../store/auth";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState({
    username: false,
    email: false,
    password: false,
    password2: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [formData, handleInputChange] = useCustomForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      hasError.email ||
      hasError.password ||
      hasError.password2 ||
      hasError.username
    )
      return;

    dispatch(startRegister(formData));
  };

  const isValidEmail = (email) => {
    return /\S+@\S+.\S+/.test(email);
  };

  const usernameValidation = (e) => {
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]:
          "El nombre de usuario debe tener entre 3 y 20 caracteres",
      });
    } else if (e.target.value.match(/[^a-zA-Z0-9]/)) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]:
          "El nombre de usuario no puede contener caracteres especiales",
      });
    } else if (e.target.value.match(/[0-9]/)) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: "El nombre de usuario no puede contener números",
      });
    } else {
      setHasError({ ...hasError, [e.target.name]: false });
      setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    }
  };
  const emailValidation = (e) => {
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: "El email debe tener entre 3 y 50 caracteres",
      });
    } else if (!isValidEmail(e.target.value)) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: "El email no es válido",
      });
    } else {
      setHasError({ ...hasError, [e.target.name]: false });
      setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    }
  };

  const passwordValidation = (e) => {
    if (e.target.value.length < 6 || e.target.value.length > 20) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: "La contraseña debe tener entre 6 y 20 caracteres",
      });
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(e.target.value)
    ) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]:
          "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número",
      });
    } else {
      setHasError({ ...hasError, [e.target.name]: false });
      setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    }
  };

  const password2Validation = (e) => {
    if (e.target.value.length < 6 || e.target.value.length > 20) {
      setHasError({ ...hasError, [e.target.name]: true });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: "La contraseña debe tener entre 6 y 20 caracteres",
      });
    } else {
      setHasError({ ...hasError, [e.target.name]: false });
      setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    }
    if (password !== e.target.value) {
      setHasError({ ...hasError, password2: true });
      setErrorMessage({
        ...errorMessage,
        password2: "Las contraseñas no coinciden",
      });
    } else {
      setHasError({ ...hasError, password2: false });
      setErrorMessage({ ...errorMessage, password2: "" });
    }
  };
  return (
    <div className="card-auth">
      <BackButton to="/" />
      <h1 style={{ textAlign: "center" }}>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Nombre de usuario"
          variant="outlined"
          value={username}
          onBlur={usernameValidation}
          onChange={(e) => {
            handleInputChange(e);
            usernameValidation(e);
          }}
          error={hasError.username}
          helperText={errorMessage.username}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            handleInputChange(e);
            emailValidation(e);
          }}
          onBlur={emailValidation}
          error={hasError.email}
          helperText={errorMessage.email}
        />
        {/*         <TextField
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={(e) => {
            handleInputChange(e);
            passwordValidation(e);
          }}
          onBlur={passwordValidation}
          error={hasError.password}
          helperText={errorMessage.password}
        /> */}
        <FormControl variant="outlined" error={hasError.password} required>
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => {
              handleInputChange(e);
              passwordValidation(e);
            }}
            onBlur={passwordValidation}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
          {hasError.password && (
            <FormHelperText>{errorMessage.password}</FormHelperText>
          )}
        </FormControl>
        <TextField
          id="repeat-password"
          type={showPassword ? "text" : "password"}
          label="Repetir contraseña"
          variant="outlined"
          name="password2"
          value={password2}
          onChange={(e) => {
            handleInputChange(e);
            password2Validation(e);
          }}
          onBlur={password2Validation}
          error={hasError.password2}
          helperText={errorMessage.password2}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={
            hasError.username ||
            hasError.email ||
            hasError.password ||
            hasError.password2 ||
            username.length < 3 ||
            email.length < 3 ||
            password.length < 6 ||
            password2.length < 6 ||
            !isValidEmail(email)
          }
        >
          Crear Cuenta
        </Button>
        <Typography>
          Si ya tenés una cuenta, <Link to={"/auth/login"}>haz click aquí</Link>
        </Typography>
      </form>
    </div>
  );
};
