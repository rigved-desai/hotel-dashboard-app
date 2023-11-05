import monthMapper from "./monthMapper";

export const dateMapper = (arrivalDay : string, arrivalMonth : string, arrivalYear: string) => {
    if (arrivalDay.length == 1) {
        arrivalDay = "0" + arrivalDay;
    }
    const dateString = `${arrivalYear}-${monthMapper.get(arrivalMonth)}-${arrivalDay}T00:00:00.000+00:00`;

    const date = new Date(dateString);
    return date;
}