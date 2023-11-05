import { HotelBooking } from "../interfaces/hotelBooking";
import { dateMapper } from "../utils/dateMapper";

export const getTotalVisitors = (filteredData : HotelBooking[], datesMap : Map<string, number>) => {
    for(let i=0; i<filteredData.length; i++) {
        const date = dateMapper(filteredData[i].arrival_date_day_of_month, filteredData[i].arrival_date_month, filteredData[i].arrival_date_year).toISOString();
        const visitors = filteredData[i].adults +  filteredData[i].children + filteredData[i].babies;
        if(!datesMap.has(date)) {
            datesMap.set(date, visitors);
        }
        else {
            datesMap.set(date, datesMap.get(date)! + visitors);
        }
    }
    return Object.fromEntries(datesMap);
}