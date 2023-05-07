import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.id = initialState.id;
      state.email = initialState.email;
      state.token = initialState.token;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
