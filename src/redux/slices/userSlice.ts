import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.email = initialState.email;
      state.token = initialState.token;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
