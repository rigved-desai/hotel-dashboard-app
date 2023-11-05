import { Request, Response } from "express";
import fs from 'fs';
import csvParser from 'csv-parser';
import { filterDataByDate } from "../datahandlers/filterDataByDate";
import { HotelBooking } from "../interfaces/hotelBooking";
import { getAllCountries } from "../datahandlers/getAllCountries";
import { getCountryFrequencies } from "../datahandlers/getCountryFrequencies";
import { getUTCDate } from "../utils/getUTCDate";


export const getColumnChartData = (req: Request, res: Response) => {
    
    let startDateParam = req.query.startDate as string;
    let endDateParam = req.query.endDate as string;
    
    if(!startDateParam || !endDateParam) {
        return res.status(400).json({
            error: "Invalid Date"
        });
    }

    const startDate = getUTCDate(startDateParam);
    const endDate = getUTCDate(endDateParam);
    
    const rawData : any[] = [];

    fs.createReadStream('./src/data/hotel_bookings_1000.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        rawData.push(row);
    })
    .on('end', () => {
        const filteredData : HotelBooking[] = filterDataByDate(startDate, endDate, rawData);
        const countriesMap : Map<string, number> = getAllCountries(rawData);
        const countryFrequencies = getCountryFrequencies(filteredData, countriesMap); 
        
        return res.status(200).json(countryFrequencies);
        
    });
}
