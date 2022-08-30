import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCustomForm } from "../hooks";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginScreen = () => {
  const [formData, handleInputChange] = useCustomForm({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(formData);
  };

  return (
    <div className="card-auth">
      <h1>Log-In</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          value={email}
          onChange={handleInputChange}
        />
        <TextField
          type="password"
          name="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <Button type="submit" variant="contained" color="info">
          Iniciar Sesión
        </Button>
        <Typography>Si no tenés una cuenta, <Link to={"/auth/register"}>haz click aquí</Link></Typography>
      </form>
    </div>
  );
};
