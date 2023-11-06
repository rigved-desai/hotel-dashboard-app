import { useEffect, useState } from "react";
import { SERVER_URL } from "../../config/config";
import DateRange from "../../interfaces/dateRange";
import axios from 'axios';
import { ISOtoReadableDateMapper } from "../../mappers/ISOtoReadableDateMapper";

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

const SparklineChart2 = ({ startDate, endDate }: DateRange) => {
    const [childVisitors, setChildVisitors] = useState<number[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const [totalChildVisitors, setTotalChildVisitors] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        const getAdultVisitorData = async () => {
            try {
                const response = await axios.get(SERVER_URL + "sparkline-2", {
                    params: {
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0]
                    }
                })
                const values: number[] = Object.values(response.data.frequencies);
                const dates: string[] = Object.keys(response.data.frequencies).map(key => {
                    return ISOtoReadableDateMapper(key)
                });
                const totalNumberOfAdultVisitors = response.data.total;
                setErrorMessage('');
                setDates(dates);
                setChildVisitors(values);
                setTotalChildVisitors(totalNumberOfAdultVisitors);
            }
            catch (err) {
                setErrorMessage("There was some error getting data from the API!");
            }

        }
        getAdultVisitorData();
    }, [startDate, endDate])

    return (
        <>
            <div style={
                {
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    height: '200px',
                    width: '50%'
                }
            }>
                <h1>Sparkline 2</h1>
                {errorMessage ?
                    <h5>{errorMessage}</h5> :
                    <></>}
                {totalChildVisitors != null ?
                    <h3 data-testid='sparkline-2-sum'>Total Number of Child Visitors: {totalChildVisitors}</h3>
                    : <></>}
                <Line
                    data-testid='sparkline-2'
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
                                    label: 'Number of Child Visitors (By Date)',
                                    data: childVisitors,
                                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                    borderColor: 'black',
                                    borderWidth: 5,
                                    pointRadius: 0.05,
                                    pointBackgroundColor: 'black',
                                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                                    fill: true
                                },
                            ],
                        }
                    }
                    options={
                        {
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                x: {
                                    display: false,
                                    beginAtZero: true,
                                    grid: {
                                        display: true
                                    },
                                },
                                y: {
                                    display: false,
                                    grid: {
                                        display: false
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

export default SparklineChart2;