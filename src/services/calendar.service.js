const moment = require('moment')

class CalendarServices {
    async getAllSundaysWithMonthByYear(year) {
        try {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            const sundaysByMonth = {}
            
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
                        week_no: moment(date).isoWeek(),
                        date: moment(date).calendar()
                    });
                    date.setDate(date.getDate() + 7);
                }

                // Assign Sundays to the month name in the output object
                sundaysByMonth[months[month]] = sundays;
            }
            // console.log(sundaysByMonth)
            return sundaysByMonth;
        } catch (error) {
            
        }
    }

    async getAllSundaysByYear() {
        try {
            let firstSundayOfYear = new Date('2025-01-05')
            let lastSundayOfYear = new Date('2025-12-28')
 
            const sundays = []
            while (firstSundayOfYear.getTime() !== lastSundayOfYear.getTime()) {
                sundays.push({
                    week_no: moment(firstSundayOfYear).isoWeek(),
                    date: moment(firstSundayOfYear).format('ddd, MMM D YYYY')
                });

                firstSundayOfYear.setDate(firstSundayOfYear.getDate() + 7);
            }

            return sundays;
        } catch (error) {
            
        }
    }
}

module.exports = new CalendarServices()