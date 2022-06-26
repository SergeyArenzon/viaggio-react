import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './reducers/booksReducer';
import booksReducer from './slices/bookSlice';
import authReducer from './slices/authSlice';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>

export default store;
