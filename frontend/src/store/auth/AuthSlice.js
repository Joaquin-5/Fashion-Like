import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
       token: null
   },
   reducers: {
       increment: (state, /* action */ ) => {
           state.token = '';
       },
   }
});


// Action creators are generated for each case reducer function
export const { increment } = authSlice.actions;