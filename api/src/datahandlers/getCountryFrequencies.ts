import { HotelBooking } from "../interfaces/hotelBooking";

export const getCountryFrequencies = (filteredData : HotelBooking[], countriesMap : Map<string, number>) => {

    for(let i =0; i<filteredData.length; i++) {
        if (countriesMap.has(filteredData[i].country)) {
            countriesMap.set(filteredData[i].country, countriesMap.get(filteredData[i].country)! + 1);
        }
        else {
            countriesMap.set(filteredData[i].country, 1)
        }
    }

    const countryFrequencies = Object.fromEntries(countriesMap);
    return countryFrequencies;

}