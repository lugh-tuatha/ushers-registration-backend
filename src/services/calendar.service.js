const moment = require('moment')

class CalendarServices {
    async getAllSundaysOfYear(year) {
        try {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            const sundaysByMonth = {}
            
            let weekNumber = 1
            
            for (let month = 0; month < 12; month++){
                const sundays = []
                let date = new Date(year, month, 1)

                // Find the first Sunday of the month
                while (date.getDay() !== 0) {
                    date.setDate(date.getDate() + 1);
                }

                // Collect all Sundays in the month with week number
                while (date.getMonth() === month) {
                    sundays.push({
                        week_no: weekNumber,
                        date: moment(date).calendar()
                    });
                    date.setDate(date.getDate() + 7);
                    weekNumber++;
                }

                // Assign Sundays to the month name in the output object
                sundaysByMonth[months[month]] = sundays;
            }
            // console.log(sundaysByMonth)
            return sundaysByMonth;
        } catch (error) {
            
        }
    }
}

module.exports = new CalendarServices()