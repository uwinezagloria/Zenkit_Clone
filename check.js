import moment from "moment";

// Example start and end dates
const startDate = moment("2024-03-19T13:56:00.767Z");
const endDate = moment("2024-04-09T12:56:00.767Z");
const differenceInMilliseconds = endDate.diff(startDate);
console.log(differenceInMilliseconds)