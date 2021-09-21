const moment = require("moment")

module.exports = {
    //1000/01/01 não funciona
    format(format, date) {
        const newDateRaw = moment(date).format(format);
        console.log(newDateRaw)
        const newDate = newDateRaw.split("-")
        const YEAR = 0, MONTH = 1, DAY = 2;
        
        // const API_MONTH_ADD = 1;
        date = {
            year: newDate[YEAR],
            month: newDate[MONTH],
            day: newDate[DAY]
        }

        return date;
    },

    isUndefined(date) {
        const {year, month, day} = date;

        return (year == undefined || month == undefined || day == undefined);
    },

    setToNow() {
        date = moment(new Date(), "DD-MM-YYYY")
        return date;
    }
}