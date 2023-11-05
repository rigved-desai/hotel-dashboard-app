require('dotenv').config();

import express from 'express';
import cors from 'cors';
import columnChartRouter from './routers/columnChartRouter';
import timeSeriesRouter from './routers/timeSeriesRouter';
import sparkline1Router1 from './routers/sparklineRouter1';
import sparkline1Router2 from './routers/sparklineRouter2';

const app = express();

app.use(cors());

app.use('/time-series', timeSeriesRouter);
app.use('/column-chart', columnChartRouter);
app.use('/sparkline-1', sparkline1Router1)
app.use('/sparkline-2', sparkline1Router2);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}!`)
})