import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    heartbeatCount: 0,
    messages: [],
    memMessages: [],
    message: {},
    sqls: "SELECT * FROM sea_vessel_position_reports",
    subscribed: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
      state.memMessages = [];
      state.subscribed = false;
    },
    showRowDetails: (state, action) => {
      state.message = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      if (action.payload.setMemMessages) {
        state.memMessages = action.payload.messages;
      }
    },
    clearSearch: (state) => {
      state.messages = state.memMessages;
    },
    setSqls: (state, action) => {
      state.sqls = action.payload;
    },
    setSubscribed: (state, action) => {
      state.subscribed = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  clearMessages,
  showRowDetails,
  setMessages,
  clearSearch,
  setSqls,
  setSubscribed,
} = mainSlice.actions;

export const heartbeatCountSelector = state => state.main.heartbeatCount;
export const messagesSelector = state => state.main.messages;
export const messageSelector = state => state.main.message;
export const loadingStatusSelector = state => state.main.loadingStatus;
export const sqlsSelector = state => state.main.sqls;
export const subscribedSelector = state => state.main.subscribed;

export default mainSlice.reducer;