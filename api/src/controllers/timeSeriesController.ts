import csvParser from "csv-parser";
import { Request, Response } from "express";
import { HotelBooking } from "../interfaces/hotelBooking";
import fs from 'fs';
import { filterDataByDate } from "../datahandlers/filterDataByDate";
import { getAllDates } from "../datahandlers/getAllDates";
import { getTotalVisitors } from "../datahandlers/getTotalVisitors";
import { getUTCDate } from "../utils/getUTCDate";

export const getTimeSeriesData = (req: Request, res: Response) => {
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
        const datesMap : Map<string, number> = getAllDates(startDate, endDate);
        const totalVisitors = getTotalVisitors(filteredData, datesMap);

        return res.status(200).json(totalVisitors);
    });
}