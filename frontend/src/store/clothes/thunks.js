import Swal from "sweetalert2";
import { fashionApi } from "../../api/fashionApi";
import { newPost, setClothes } from "./clothesSlice";

export const startLoadingClothes = () => {
  return async (dispatch) => {
    const resp = await fashionApi.get("/clothes/get");
    if (!resp.data) {
      return;
    }
    const date = [...resp.data].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
    dispatch(setClothes(date || []));
  };
};

export const startAddNewPost = ({ title, description, image }) => {
  return async (dispatch) => {
    const resp = await fashionApi.post(
      "/clothes/add",
      { title, description, file: image },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (!resp.data.ok) return;
    Swal.fire({
      icon: "success",
      title: "El posteo se ha hecho correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(newPost(resp.data.clothes));
  };
};
