import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCustomForm } from "../hooks";

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
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          margin: "15% 40%",
        }}
      >
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
        <Button type="submit" variant="contained" color="success">
          Enviar
        </Button>
      </form>
    </div>
  );
};
