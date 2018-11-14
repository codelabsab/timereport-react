import moment from 'moment';

export function validateDate(date) {
    return moment(date, "YYYY-MM-DD", true).isValid();
};

export function validateHour(hours) {
    return !isNaN(hours) && hours > 0;
};