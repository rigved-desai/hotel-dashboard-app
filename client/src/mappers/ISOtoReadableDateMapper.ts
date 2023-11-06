export const ISOtoReadableDateMapper = (dateString : string) => {
    let date = new Date(dateString);

    let monthName = date.toLocaleString('default', { month: 'short' });

    let readableDate = date.getDate() + " " + monthName + " " + date.getFullYear();

    return readableDate;
}