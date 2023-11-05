export const getUTCDate = (date : string) => {
    const timeZoneOffset = "T00:00:00.000+00:00";
    const UTCDate = date + timeZoneOffset;
    
    return new Date(UTCDate);
}