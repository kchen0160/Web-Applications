class DatePicker {
    constructor(id, onSelect) {
        this.id = id;
        this.onSelect = onSelect;
        this.date = new Date();
    }
    render(date) {
        let month = date.getMonth();
        let year = date.getFullYear();
        let today = new Date();
        
        let calendarTable = document.createElement("table");
        let header = this.buildHeader(month, year);
        // add header to table
        calendarTable.appendChild(header);
  
        let headerRow = this.createHeader();
  
        // add header row to table
        calendarTable.appendChild(headerRow);
  
        // first day of month
        let firstDayOfMonth = new Date(year, month, 1);

        // first day of week (0 = Sunday)
        let firstDayOfWeekIndex = firstDayOfMonth.getDay();

        // first day of last month
        let lastDayOfPreviousMonth = new Date(year, month, 0);

        // find days in month
        let lastDayOfMonth = new Date(year, month + 1, 0);
        let numDaysInMonth = lastDayOfMonth.getDate();

        // finddays in previous month
        let numDaysInPreviousMonth = lastDayOfPreviousMonth.getDate();

        // # of cells needed
        let totalCellsNeeded = numDaysInMonth + firstDayOfWeekIndex;

        // find rows needed
        let numRows = Math.ceil(totalCellsNeeded / 7);  

        for (let weekIndex = 0; weekIndex < numRows; weekIndex++) {
            let weekRow = document.createElement("tr");
      
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                let dayCell = document.createElement("td");
  
                // day of month for cell
                let dayOfMonth = (weekIndex * 7) + dayIndex - firstDayOfWeekIndex + 1;
    
                if (dayOfMonth < 1 || dayOfMonth > numDaysInMonth) {
                    // not in month
                    dayCell.classList.add("not-in-month");
                        if (dayOfMonth > numDaysInMonth) {
                            dayCell.textContent = dayOfMonth - numDaysInMonth;
                        } else {
                            dayCell.textContent = dayOfMonth + numDaysInPreviousMonth;
                        }
                } else {
                    dayCell.textContent = dayOfMonth;
    
                // add class to cell if it is today's date
                if (year == today.getFullYear() && month == today.getMonth() && dayOfMonth == today.getDate()) {
                    dayCell.classList.add("today");
                }
    
                // event listener for the cell click event
                dayCell.addEventListener("click", () => {
                let fixedDate = {
                    month: month + 1,
                    day: dayOfMonth,
                    year: year
                };
    
                this.onSelect(this.id, fixedDate);
                });
            }
                weekRow.appendChild(dayCell);
            }
  
            calendarTable.appendChild(weekRow);
        }
  
        // clear contents of the calendar div and add the new calendar
        let calendarDiv = document.getElementById(this.id);
        calendarDiv.innerHTML = "";
        calendarDiv.appendChild(calendarTable);
    }
  
    buildHeader(month, year) {
        let headerRow = document.createElement("tr");
        headerRow.className = 'header';
        
        let previousButtonCell = document.createElement("th");
        let previousButton = document.createElement("button");
        previousButton.innerHTML = '<';
        previousButton.onclick = () => {
            let newDate = new Date(year, month - 1, 1);
            this.date = newDate;
            this.render(newDate);
        };
        previousButtonCell.appendChild(previousButton);
        
        let nextButtonCell = document.createElement("th");
        let nextButton = document.createElement("button");
        nextButton.innerHTML = '>';
        nextButton.onclick = () => {
            let newDate = new Date(year, month + 1, 1);
            this.date = newDate;
            this.render(newDate);
        };
        nextButtonCell.appendChild(nextButton);
        
        let titleCell = document.createElement("th");
        titleCell.colSpan = 5;
        titleCell.innerHTML = `${this.getMonthName(month)} ${year}`;
        
        headerRow.appendChild(previousButtonCell);
        headerRow.appendChild(titleCell);
        headerRow.appendChild(nextButtonCell);
        
        return headerRow;
    }
  
    getMonthName(month) {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[month];
    }
  
  
    createHeader() {
        let headerRow = document.createElement("tr");
    
        let dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            let dayCell = document.createElement("th");
            dayCell.textContent = dayNames[dayIndex];
            headerRow.appendChild(dayCell);
        }
        return headerRow;
    }
  
}