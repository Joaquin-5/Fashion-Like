import Swal from "sweetalert2";
import { fashionApi } from "../../api/fashionApi";

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
      });
    }
  };
};
