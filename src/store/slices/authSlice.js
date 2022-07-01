import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api/index';

const initialState = {
  isLoggedIn: true,
  user: {},
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
    logout(state, action) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  }
  // extraReducers: {
  //   [fetchRandomUserData.pending]: (state, action) => {
  //     state.loading = true;
  //     state.error = null;
  //   },
  //   [fetchRandomUserData.fulfilled]: (state, action) => {
  //     state.user = action.payload;
  //     state.loading = false;
  //   },
  //   [fetchRandomUserData.rejected]: (state, action) => {
  //     state.error = action.error.message;
  //     state.loading = false;
  //   },
  // },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
