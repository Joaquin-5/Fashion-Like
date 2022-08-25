import { fashionApi } from "../../api/fashionApi";
import { setClothes } from "./clothesSlice";

export const startLoadingClothes = () => {
  return async (dispatch, getState) => {
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
