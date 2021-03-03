import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Chart } from 'react-charts';
import getDeepObjectValue from 'lodash.get';

import { setXAxis, setYAxis, xAxisSelector, yAxisSelector } from './chartSlice';
import { messagesSelector } from "../Main/mainSlice";
import Dropdown, { IOption } from "../../components/Dropdown";
import Button from "../../components/Button";

export default function Line() {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);
  const xAxis = useSelector(xAxisSelector);
  const yAxis = useSelector(yAxisSelector);
  const [axisOptions, setAxisOptions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const handleXAxisChange = useCallback((option: IOption) => dispatch(setXAxis(option)), []);
  const handleYAxisChange = useCallback((option: IOption) => dispatch(setYAxis(option)), []);
  const handleSetAxesClick = useCallback(() => {
    const data = messages.map((message: any) => {
      return [parseInt(message[xAxis.value], 10), parseInt(message[yAxis.value])];
    })
    console.log(data);
    setChartData(data);
  }, [messages, xAxis, yAxis]);

  useEffect(() => {
    const messageKeys = Object.keys(getDeepObjectValue(messages, '[0]', {}));
    setAxisOptions(messageKeys.map((key: string) => ({ label: key, value: key })));
  }, [messages]);

  const data = React.useMemo(
    () => [
      {
        label: 'Chart Line',
        data: chartData
      },
    ],
    [chartData]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  return (
    <div className="pt-2 pb-2 pl-2 pr-2" style={{ backgroundColor: 'white' }}>
      <div className="level level-left">
        <div className="level-item">
          <Dropdown
            title="XAxis"
            options={axisOptions}
            onChange={handleXAxisChange}
            value={xAxis}
          />
        </div>
        <div className="level-item">
          <Dropdown
            title="YAxis"
            options={axisOptions}
            onChange={handleYAxisChange}
            value={yAxis}
          />
        </div>
        <Button
          onClick={handleSetAxesClick}
          disabled={!(xAxis && yAxis)}
          className="button is-fullwidth is-primary"
        >
          Set Axes
        </Button>
      </div>
      <div style={{ width: '500px', height: '450px', }}>
        <Chart data={data} axes={axes} tooltip/>
      </div>
    </div>
  )
}