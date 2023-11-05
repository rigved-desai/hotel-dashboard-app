export const getAllCountries = (rawData : any[]) => {
    const countriesMap = new Map<string, number>();
    
    for(let i =0; i<rawData.length; i++) {
        if(!countriesMap.has(rawData[i].country)) {
            countriesMap.set(rawData[i].country, 0);
        }
    }

    return countriesMap;
    
}