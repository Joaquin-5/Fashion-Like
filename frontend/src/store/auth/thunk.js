<<<<<<< HEAD
import { fashionApi } from "../../api/fashionApi";
import Swal from "sweetalert2";
import { login } from "./AuthSlice";

export const startRegister = (user) => {
  return async (dispatch) => {
    try {
      const resp = await fashionApi.post("/user/register", user);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "Por favor verifique su correo para activar su cuenta",
      });
      console.log(resp);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response.data.message ||
          "Hubo un error al registrar, inténtelo de nuevo",
=======


export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const resp = await fashionApi.post("/user/login", { email, password });
      dispatch(login(resp.data.token));
      localStorage.setItem("token", resp.data.token);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.err.message || "Hubo un error",
        showConfirmButton: false,
        timer: 1500,
>>>>>>> Login
      });
    }
  };
};
