import { useState, useEffect } from 'react';
import DateRange from '../../interfaces/dateRange';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import { ISOtoReadableDateMapper } from '../../mappers/ISOtoReadableDateMapper';

import {
    Chart as ChartJS,
    LineElement, CategoryScale,
    LinearScale, Tooltip, Legend, PointElement, Filler
} from "chart.js";

import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend, Filler
)

const LineChart = ({ startDate, endDate }: DateRange) => {

    const [dates, setDates] = useState<string[]>([]);
    const [numberOfVisitors, setNumberOfVisitors] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        const getTotalVisitorData = async () => {
            try {
                const response = await axios.get(SERVER_URL + "time-series", {
                    params: {
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0]
                    }
                })
                const dates: string[] = Object.keys(response.data).map(key => {
                    return ISOtoReadableDateMapper(key)
                });
                const values: number[] = Object.values(response.data);
                setErrorMessage('');
                setDates(dates);
                setNumberOfVisitors(values);

            }
            catch (err) {
                setErrorMessage("There was some error getting data from the API!");
            }
        }

        getTotalVisitorData();

    }, [startDate, endDate])


    return (
        <>

            <div style={
                {
                    marginTop: 80,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '400px',
                    width: '80%'
                }
            }>
                <h1>Time Series</h1>
                {errorMessage ?
                    <h4>{errorMessage}</h4> :
                    <></>}
                <Line
                    data-testid = 'line-chart'
                    style={
                        {
                            height: '100%',
                            width: '80%'
                        }
                    }
                    data={
                        {
                            labels: dates,
                            datasets: [
                                {
                                    label: 'Number of Total Visitors (By Date)',
                                    data: numberOfVisitors,
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    borderWidth: 5
                                },
                            ],
                        }
                    }
                    options={
                        {
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    },
                                },
                                y: {
                                    grid: {
                                        display: true
                                    }
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    }
                ></Line>
            </div>
        </>
    )
}

export default LineChart;