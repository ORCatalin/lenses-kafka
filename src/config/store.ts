import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';
import logger from 'redux-logger';

import loginReducer from '../widgets/Login/loginSlice';
import mainReducer from '../widgets/Main/mainSlice';
import chartReducer from '../widgets/Chart/chartSlice';

const reducer = {
  login: loginReducer,
  main: mainReducer,
  chart: chartReducer,
};
const middleware = [
  ...getDefaultMiddleware(),
  logger,
];
const preloadedState = {};
const store = configureStore({
  reducer,
  middleware,
  // devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
});

export default store;
