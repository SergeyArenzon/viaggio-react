import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api/index';

const initialState: IState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};



interface IState {
  isLoggedIn: boolean,
  user: {} | null,
  loading: boolean,
  error: any,

}


export const fetchUserData = createAsyncThunk<any>(
  'auth/fetchUser',
  async () => {
    try {
      const response = await AuthApi.user();
      return response;
    } catch (error) {
      throw error;
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: IState, action: PayloadAction<number>) => {
      state.user = action.payload;
      state.isLoggedIn = Boolean(action.payload)
      state.loading = false;
    },
    logout: () =>  initialState,
    
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
      state.error = null;
    });
    builder.addCase(fetchUserData.rejected, (state , action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  }
});


export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
