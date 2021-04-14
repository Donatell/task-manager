import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	name: '',
	id: '',
	token: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated
	// actions
	reducers: {
		fetchUser: (state) => ({
			isLoading: true
		}),
		removeUser: (state) => ({
			...initialState
		}),
		setUser: (state, action) => ({
			isLoading: false,
			name: action.payload.user.name,
			id: action.payload.user._id,
			token: action.payload.token
		})
	}
});

export const { fetchUser, removeUser, setUser } = userSlice.actions;

export const selectCount = (state) => state.counter.value;

export default userSlice.reducer;