export const getAllDates = (startDate : Date, endDate : Date) => {
    const datesMap = new Map<string, number>();

    let currDate = startDate;

    while(currDate <= endDate) {
        datesMap.set(currDate.toISOString(), 0);
        currDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return datesMap;
}
