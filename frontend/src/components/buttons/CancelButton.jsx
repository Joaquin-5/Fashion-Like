import React from "react";
import "./buttons.style.css";
export const CancelButton = ({ onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className="cerrar-edicion"
      color="error"
      style={style}
    >
      X
    </button>
  );
};
