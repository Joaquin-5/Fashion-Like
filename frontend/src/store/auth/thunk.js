import { fashionApi } from "../../api/fashionApi";
import Swal from "sweetalert2";
import { login, logOut } from "./AuthSlice";
import { changeLoading, closeSideBar } from "../sideBar/sideBarSlice";

export const startRegister = (user) => {
  return async () => {
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
      });
    }
  };
};

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const resp = await fashionApi.post("/user/login", { email, password });
      dispatch(login(resp.data));
      console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("data", JSON.stringify(resp.data.user));
      if (resp.data.ok) {
        window.location.href="/";
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.err.message || "Hubo un error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const startLogOut = () => {
  return (dispatch) => {
    dispatch(changeLoading(true));
    dispatch(logOut());
    dispatch(closeSideBar());
    localStorage.clear();
    dispatch(changeLoading(false));
    // window.location.reload();
  }
}

export const checkAuthState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const resp = await fashionApi.get(`/user/check-auth/${token}`);
        console.log({resp});
        dispatch(login(resp.data));
      } catch (error) {
        localStorage.clear();
      }
    }
  };
}