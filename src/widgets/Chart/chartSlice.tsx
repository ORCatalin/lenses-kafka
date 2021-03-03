import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    yAxis: '',
    xAxis: '',
  },
  reducers: {
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
  },
  extraReducers: {}
});

export const { setYAxis, setXAxis } = chartSlice.actions;

export const xAxisSelector = state => state.chart.xAxis;
export const yAxisSelector = state => state.chart.yAxis;

export default chartSlice.reducer;