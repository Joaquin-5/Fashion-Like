import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCustomForm } from "../hooks";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  const [hasError, setHasError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, handleInputChange] = useCustomForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) return;
    if (hasError) return;

    console.log(formData);
  };

  const validation = () => {
    if (password !== password2) {
      setHasError(true);
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    setHasError(false);
    setErrorMessage("");
    return;
  };
  return (
    <div className="card-auth">
      <h1 style={{textAlign: 'center'}}>Registro</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Nombre de usuario"
          variant="outlined"
          value={username}
          onChange={handleInputChange}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={handleInputChange}
          onBlur={validation}
          error={hasError}
          helperText={hasError && errorMessage}
        />
        <TextField
          id="repeat-password"
          type="password"
          label="Repetir contraseña"
          variant="outlined"
          name="password2"
          value={password2}
          onChange={handleInputChange}
          onBlur={validation}
          error={hasError}
          helperText={hasError && errorMessage}
        />
        <Button type="submit" variant="contained" disabled={hasError}>
          Submit
        </Button>
        <Typography>Si ya tenés una cuenta, <Link to={"/auth/login"}>haz click aquí</Link></Typography>
      </form>
    </div>
  );
};
