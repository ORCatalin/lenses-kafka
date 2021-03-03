import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDeepObjectValue from 'lodash.get';
import api from '../../util/api';
import { AsyncActionStatus } from '../../util/constants';

export const login = createAsyncThunk(
  'mainContainer/login',
  async (_, thunkAPI) => {
    const user = userSelector(thunkAPI.getState());
    const password = passwordSelector(thunkAPI.getState());
    const response = await api.post(`/api/login`, {user, password});
    return getDeepObjectValue(response, 'data');
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    host: 'localhost',
    user: '',
    password: '',
    loadingStatus: AsyncActionStatus.IDLE,
    token: '',
  },
  reducers: {
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loadingStatus = AsyncActionStatus.PENDING;
    },
    [login.fulfilled]: (state, action) => {
      state.loadingStatus = AsyncActionStatus.FULFILLED;
      state.token = action.payload;
    },
    [login.rejected]: (state) => {
      state.loadingStatus = AsyncActionStatus.REJECTED;
    },
  }
});

export const {setHost, setUser, setPassword} = loginSlice.actions;

export const hostSelector = state => state.login.host;
export const userSelector = state => state.login.user;
export const passwordSelector = state => state.login.password;
export const loadingStatusSelector = state => state.login.loadingStatus;
export const tokenSelector = state => state.login.token;

export default loginSlice.reducer;