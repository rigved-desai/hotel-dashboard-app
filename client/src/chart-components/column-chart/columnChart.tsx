import DateRange from "../../interfaces/dateRange";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from "../../config/config";
import {
    Chart as ChartJS,
    BarElement, CategoryScale,
    LinearScale, Tooltip, Legend, Filler
} from "chart.js";

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend, Filler
)
const ColumnChart = ({ startDate, endDate }: DateRange) => {

    const [countryCodes, setcountryCodes] = useState<string[]>([]);
    const [freq, setFreq] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {

        const getCountryData = async () => {
            try {
                const response = await axios.get(SERVER_URL + "column-chart", {
                    params: {
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0]
                    }
                })
                const codes = Object.keys(response.data);
                const values: number[] = Object.values(response.data);
                setErrorMessage('');
                setcountryCodes(codes);
                setFreq(values);

            }
            catch (err) {
                setErrorMessage("There was some error getting data from the API!");
            }
        }

        getCountryData();

    }, [startDate, endDate])


    return (
        <>
            <div style={
                {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '400px',
                    width: '80%'
                }
            }>
                <h1>Column Chart</h1>
                {errorMessage ?
                    <h4>{errorMessage}</h4> :
                    <></>}
                <Bar
                    data-testid="column-chart"
                    style={
                        {
                            height: '100%',
                            width: '80%'
                        }
                    }
                    data={
                        {
                            labels: countryCodes,
                            datasets: [
                                {
                                    label: 'Number of Visitors Per Country',
                                    data: freq,
                                    backgroundColor: 'black',
                                    borderWidth: 1,
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
                                    }
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
                ></Bar>
            </div>
        </>
    )
}

export default ColumnChart;