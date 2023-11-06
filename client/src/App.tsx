import DatePicker from "react-datepicker";
import { useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import ColumnChart from './chart-components/column-chart/columnChart';
import LineChart from './chart-components/line-chart/lineChart';
import SparklineChart1 from './chart-components/sparkline-chart-1/sparklineChart1';
import SparklineChart2 from './chart-components/sparkline-chart-2/sparklineChart2';

function App() {

  const [startDate, setStartDate] = useState<Date>(new Date("2015-07-10T00:00:00.000Z"));
  const [endDate, setEndDate] = useState<Date>(new Date("2015-08-10T00:00:00.000Z"));

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>Enter your date range:</h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h3 style={{
            paddingRight: '10px'
          }}>Start Date:</h3>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <h3 style={{
            paddingRight: '10px'
          }}>End Date:</h3>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy" />
        </div>
      </div>
      <ColumnChart startDate={startDate} endDate={endDate} />
      <LineChart startDate={startDate} endDate={endDate} />
      <div style={{
        display: 'flex',
        marginTop: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '150px',
        width: '70%'
      }}>
        <SparklineChart1 startDate={startDate} endDate={endDate} />
        <SparklineChart2 startDate={startDate} endDate={endDate} />
      </div>
    </>
  );
}

export default App;
