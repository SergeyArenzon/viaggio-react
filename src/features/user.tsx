import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
  date: string,
}

export const getUser= createAsyncThunk("user/getUser", async() => {
  const x =  await axios.get("http://localhost:5000/user", {withCredentials: true})

  console.log(x);
  return x
  
})

const initialStateValue = null;

export const userSlice = createSlice({
  name: "user", 
  initialState: {info: initialStateValue, status: null}, 
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.info = action.payload;
    },
    logout: (state: {info: IUser | null}) => {
      state.info = initialStateValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: any, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.status = "pending"
    })
    builder.addCase(getUser.fulfilled, (state: any, action: any) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      console.log(action.payload);
      
      state.status = "success"
      state.info = action.payload
    })
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
