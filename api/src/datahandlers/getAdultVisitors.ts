import { HotelBooking } from "../interfaces/hotelBooking";
import { dateMapper } from "../utils/dateMapper";

export const getAdultVisitors = (filteredData : HotelBooking[], datesMap : Map<string, number>) => {
    let totalAdultVistors = 0;
    for(let i=0; i<filteredData.length; i++) {
        const date = dateMapper(filteredData[i].arrival_date_day_of_month, filteredData[i].arrival_date_month, filteredData[i].arrival_date_year).toISOString();
        const visitors = filteredData[i].adults;
        totalAdultVistors += visitors;
        if(!datesMap.has(date)) {
            datesMap.set(date, visitors);
        }
        else {
            datesMap.set(date, datesMap.get(date)! + visitors);
        }
    }
    return [Object.fromEntries(datesMap), totalAdultVistors];
}