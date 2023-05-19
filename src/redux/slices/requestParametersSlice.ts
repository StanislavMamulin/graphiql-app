import { createSlice } from '@reduxjs/toolkit';
import { Variables } from 'graphql-request';

type RequestParametersState = {
  variables?: Variables;
  headers?: { [headerKey: string]: string };
};

const initialState: RequestParametersState = {
  variables: undefined,
  headers: undefined,
};

const requestParametersSlice = createSlice({
  name: 'requestParameters',
  initialState,
  reducers: {
    setVariables(state, action) {
      state.variables = action.payload;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
  },
});

export const { setVariables, setHeaders } = requestParametersSlice.actions;

export default requestParametersSlice.reducer;
