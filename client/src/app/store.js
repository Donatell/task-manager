import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice.js';

export const store = configureStore({
	reducer: {
		users: userReducer
	}
});