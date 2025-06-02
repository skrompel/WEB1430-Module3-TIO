/*

Author: Sahara Krompel
Date: 1 June 2025
Purpose: Create a dynamic calendar

*/

// Determine current date on the machine to establish calendar
let thisDay = new Date();

// Write the calendar out to the HTML element with the id "calendar"
document.getElementById("calendar").innerHTML = createCalendar(thisDay); // createCalendar(thisDay) = createCalendar(calDate), calCaption(calDate)

// Function to generate the calendar table
function createCalendar(calDate) {
    let calendarHTML = "<table id='calendar_table'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calWeekDayRow();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

// Function to generate the table calendar caption
function calCaption(calDate) {
    // Array to store the names of the months
    let monthName = ["January", "February", "March", "April", "May", 
                    "June", "July", "August", "September", "October", 
                    "November", "December"];
    let thisMonth = calDate.getMonth();
    let thisYear = calDate.getFullYear();
    
    return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>"; // Get the month name of the array index number
}

// Function to write a table row with DOW abbreviations
function calWeekDayRow() {
    // Array to store weekday abbreviations
    let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let rowHTML = "<tr>";

    // Loop through the dayName array and make a column for each
    for (let i = 0; i < dayName.length; i++) {
        rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
    }

    rowHTML += "</tr>";
    return rowHTML;
}

// Function used to calculate the number of days in the month
function daysInMonth(calDate) {
    // Array of days in each month
    let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Extract the 4 digit year and the month and year
    let thisYear = calDate.getFullYear();
    let thisMonth = calDate.getMonth();

    // Revise the days in February for possible Leap Year
    if (thisYear % 4 === 0) {
        if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
            dayCount[1] = 29;
        }
    }

    // Return the number of days for the current month
    return dayCount[thisMonth];
}

// Function to write out the rows for each month
function calDays(calDate) {
    // Determine the starting day of the month
    let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    let weekDay = day.getDay(1);

    // Write blank cells preceeding the starting date
    let htmlCode = "<tr>";
    for (let i = 0; i < weekDay; i++) {
        htmlCode += "<td>&nbsp;</td>";   
    }

    // Write out the cells for each day of the month
    let totalDays = daysInMonth(calDate);
    let highlightDay = calDate.getDate(); 

    for (let i = 1; i <= totalDays; i++) {
        day.setDate(i);
        weekDay = day.getDay();

        // If the day of week is a Sunday (index 0), then start a new row
        if (weekDay === 0) htmlCode += "<tr>";

        if (i === highlightDay) {
            htmlCode += "<td class='calendar_dates' id ='calendar_today'>" + i + dayEvent[i] + "</td>";
        }
        else {
            htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
        }
        
        if (weekDay === 6) htmlCode += "</tr>";
    }

    return htmlCode;
}