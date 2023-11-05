import { Request, Response } from "express";
import { getUTCDate } from "../utils/getUTCDate";
import fs from 'fs'; 
import csvParser from "csv-parser";
import { filterDataByDate } from "../datahandlers/filterDataByDate";
import { HotelBooking } from "../interfaces/hotelBooking";
import { getAllDates } from "../datahandlers/getAllDates";
import { getChildVisitors } from "../datahandlers/getChildVisitors";

export const getSparkline2Data = (req: Request, res: Response) => {
    let startDateParam = req.query.startDate as string;
    let endDateParam = req.query.endDate as string;
    
    if(!startDateParam || !endDateParam) {
        return res.status(400).json({
            error: "Invalid Date"
        });
    }

    const startDate = getUTCDate(startDateParam);
    const endDate = getUTCDate(endDateParam);

    const rawData : any = [];

    fs.createReadStream('./src/data/hotel_bookings_1000.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        rawData.push(row);
    })
    .on('end', () => {
        const filteredData : HotelBooking[] = filterDataByDate(startDate, endDate, rawData);
        const datesMap : Map<string, number> = getAllDates(startDate, endDate);
        const [childVisitors, totalChildVistors] = getChildVisitors(filteredData, datesMap);

        return res.status(200).json({
            total: totalChildVistors,
            frequencies: childVisitors
        })
    });
    
}