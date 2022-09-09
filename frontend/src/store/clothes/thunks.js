import Swal from "sweetalert2";
import { fashionApi } from "../../api/fashionApi";
import { changeLoading } from "../sideBar/sideBarSlice";
import {
  editPost,
  newPost,
  setClothes,
  deletePost,
  searchPost,
  orderByDate,
} from "./clothesSlice";

export const startLoadingClothes = () => {
  return async (dispatch) => {
    dispatch(changeLoading(true));
    const resp = await fashionApi.get("/clothes/get");
    if (!resp.data) {
      return;
    }
    const date = [...resp.data].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
    dispatch(setClothes(date || []));
    dispatch(changeLoading(false));
  };
};

export const startAddNewPost = ({ title, description, image }) => {
  return async (dispatch) => {
    dispatch(changeLoading(true));
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
    dispatch(changeLoading(false));
  };
};

export const startEditPost = ({ id, title, description, image }) => {
  return async (dispatch) => {
    dispatch(changeLoading(true));
    const res = await fashionApi.put(
      "/clothes/" + id,
      { title, description, file: image },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (!res.data.ok) return;
    Swal.fire({
      icon: "success",
      title: "El posteo se ha editado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(editPost(res.data.updatePost));
    dispatch(changeLoading(false));
  };
};

export const startDeletePost = (id) => {
  return async (dispatch) => {
    dispatch(changeLoading(true));
    Swal.fire({
      title: "¿Estás seguro que querés eliminar esta publicación?",
      text: "No se va a poder recuperar esta publicación!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fashionApi
          .delete("/clothes/" + id)
          .then(() =>
            Swal.fire(
              "Eliminado!",
              "La publicación ha sido eliminada.",
              "success"
            ).then(() => {
              dispatch(deletePost(id));
            })
          )
          .catch((error) =>
            Swal.fire("Error", error.response.data.msg, "error")
          );
      }
    });
  dispatch(changeLoading(false));

  };
};

export const startSearchPost = (word) => {
  return async (dispatch) => {
    dispatch(searchPost(word));
  };
};


// Order can be "asc" or "desc"
export const startOrderByDate = (order) => {
  return async (dispatch, getState) => {
    const state = getState();
    const posts = [...state.clothes.posts];
    const date = [...posts].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
    if (order === "asc") {
      dispatch(orderByDate(date));
    } else {
      dispatch(orderByDate(date.reverse()));
    }
  };
}