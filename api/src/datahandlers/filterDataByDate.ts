import { HotelBooking } from "../interfaces/hotelBooking";
import { dateMapper } from "../utils/dateMapper";

export const filterDataByDate = (startDate : Date, endDate : Date, data : any[]) => {

    const filteredData : HotelBooking[] = [];

    for(let i =0; i<data.length; i++) {
        const arrivalDate = dateMapper(data[i].arrival_date_day_of_month, data[i].arrival_date_month, data[i].arrival_date_year);
        if (arrivalDate >= startDate && arrivalDate <= endDate) {
            const cleanedData : HotelBooking = {
                ...data[i],
                adults: parseInt(data[i].adults),
                children: parseInt(data[i].children),
                babies: parseInt(data[i].babies)
            }
            filteredData.push(cleanedData);
        }
    }

    return filteredData;
}