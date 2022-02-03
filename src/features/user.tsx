import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  _id: string,
  date: string,
}


interface RootState {
  user: {
    info: {
      firstName: string,
      lastName: string,
      email: string,
      _id: string,
      date: string,
    }
  }
}

const initialStateValue: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  _id: "",
  date: "",
};

export const userSlice = createSlice({name: "user", initialState: {info: initialStateValue}, reducers: {
    login: (state, action) => {
      state.info = action.payload;
    },
    logout: (state: {info: IUser}) => {
      state.info = initialStateValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
