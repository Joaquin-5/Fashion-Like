import { fashionApi } from "../../api/fashionApi";
import Swal from "sweetalert2";
import { login } from "./AuthSlice";

export const startRegister = (user) => {
  return async (dispatch) => {
    console.log(user);
  };
};

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
      });
    }
  };
};
