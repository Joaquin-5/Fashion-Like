import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCustomForm } from "../hooks";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BackButton } from "../components/buttons/BackButton";
import { startLogin } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const LoginScreen = () => {
  const [formData, handleInputChange] = useCustomForm({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validationEmail = (correo) => {
    if (correo.length < 1) {
      setErrorEmail(true);
      setErrorMessageEmail("Este campo es obligatorio");
      return true;
    }
    if (!isValidEmail(correo)) {
      setErrorEmail(true);
      setErrorMessageEmail("Email inválido");
      return true;
    }
    setErrorEmail(false);
    setErrorMessageEmail("");
    return false;
  };

  const validationPassword = (password) => {
    if (password.length < 1) {
      setErrorPassword(true);
      setErrorMessagePassword("Este campo es obligatorio");
      return true;
    }
    setErrorPassword(false);
    setErrorMessagePassword("");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLogin(formData));
  };

  return (
    <div className="card-auth">
      <BackButton to="/" />
      <h1>Iniciar Sesión</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            handleInputChange(e);
            validationEmail(e.target.value);
          }}
          error={errorEmail}
          onBlur={(e) => {
            validationEmail(e.target.value);
          }}
          helperText={errorEmail ? errorMessageEmail : null}
          required
        />
        {/*<TextField
          type={showPassword ? "text" : "password"}
          name="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={(e) => {
            handleInputChange(e);
            validationPassword(e.target.value);
          }}
          error={errorPassword}
          onBlur={(e) => {
            validationPassword(e.target.value);
          }}
          helperText={errorPassword ? errorMessagePassword : null}
          autoComplete="off"
          required
        />
        <Button onClick={() => setShowPassword(!showPassword)}>Mostrar</Button> */}
        <FormControl variant="outlined" error={errorPassword} required>
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
              validationPassword(e.target.value);
            }}
            onBlur={(e) => {
              validationPassword(e.target.value);
            }}
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
          {errorPassword && (
            <FormHelperText>{errorMessagePassword}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="info"
          disabled={
            errorEmail.email ||
            errorPassword.password ||
            email.length < 3 ||
            password.length < 6 ||
            !isValidEmail(email)
          }
        >
          Iniciar Sesión
        </Button>
        <Typography>
          Si no tenés una cuenta,{" "}
          <Link to={"/auth/register"}>haz click aquí</Link>
        </Typography>
      </form>
    </div>
  );
};
