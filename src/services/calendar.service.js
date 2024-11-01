class CalendarServices {
    async getAllSundaysOfYear(year) {
        try {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            const sundaysByMonth = {}

            for (let month = 0; month < 12; month++){
                const sundays = []
                let date = new Date(year, month, 1)
                let weekNumber = 1

                // Find the first Sunday of the month
                while (date.getDay() !== 0) {
                    date.setDate(date.getDate() + 1);
                }

                // Collect all Sundays in the month with week number
                while (date.getMonth() === month) {
                    sundays.push({
                        week_no: weekNumber,
                        date: date.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" })
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