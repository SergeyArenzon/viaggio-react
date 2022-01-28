import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  firstName: "",
  lastName: "",
  email: "",
  _id: "",
  date: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {info: initialStateValue},
  reducers: {
    login: (state, action) => {
      state.info = action.payload;
    },
    logout: (state,action) => {
      state.info = initialStateValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
