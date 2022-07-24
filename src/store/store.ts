import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;

