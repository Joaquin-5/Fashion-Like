import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
    },
    changeRole: (state, action) => {
        state.users = state.users.map(u => {
            if (u._id === action.payload._id) {
                return {...action.payload, index: u.index}
            } 
            return u;
        })
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, changeRole } = usersSlice.actions;
