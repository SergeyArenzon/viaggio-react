import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api/index';

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  'auth/fetchUser',
  async () => {
    try {
      const response = await AuthApi.user();
      return response;
    } catch (error) {
      throw Error(error);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = Boolean(action.payload)
      state.loading = false;
    },
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = Boolean(action.payload)
      state.loading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  }
});


export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
