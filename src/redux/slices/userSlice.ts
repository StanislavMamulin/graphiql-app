import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrentUser } from 'types/User';

const initialState: CurrentUser = {
  id: '',
  email: '',
  token: '',
  expDate: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CurrentUser>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.expDate = action.payload.expDate;
    },
    removeUser(state) {
      state.id = initialState.id;
      state.email = initialState.email;
      state.token = initialState.token;
      state.expDate = initialState.expDate;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
