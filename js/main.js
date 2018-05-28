class Month
{
    constructor()
    {
        this.date = new Date();
        this.determineMonth();
        this.createDays();
    }
    createDays()
    {
        let numberOfDays = this.getMonthDays();
        // Creating div#days container where we will append month days
        let days_div = document.createElement('div');
        days_div.setAttribute('id', 'days');
        document.getElementById('calendar').appendChild(days_div);

        for(let j = 0; j < this.getBeginningDay(); j++)
        // Creating empty blocks until we get to week day where month starts
        {
            let day = document.createElement('span');
            let empty_text = document.createTextNode('0');
            day.appendChild(empty_text);
            day.classList.add('dnone');
            day.classList.add('day');
            document.getElementById('days').appendChild(day);
        }

        for(let i = 1; i <= numberOfDays; i++)
        // Populate calendar with month days
        {
            let day = document.createElement('span');
            let day_number = document.createTextNode(i.toString());
            day.appendChild(day_number);
            day.classList.add('text-center');
            day.classList.add('day');
            day.setAttribute('id', i.toString());
            document.getElementById('days').appendChild(day);
        }
    }
    prevMonth()
    {
        let current_month = this.date.getMonth();
        current_month--; // Going back 1 month
        if(current_month<0)
        // if its less then 0 then we went year back
            // so wee need to change month to December(11) and year to Current Year - 1
        {
            current_month = 11;
            this.date.setMonth(current_month);
            this.date.setFullYear(this.date.getFullYear()-1);
        } else this.date.setMonth(current_month); // else we set month to month before

        this.determineMonth(); // print what month it is

        // delete .days div and recreate it with new month days
        document.getElementById('days').remove();
        this.createDays();
    }
    nextMonth()
    // same as PrevMonth just going forward
    {
        let current_month = this.date.getMonth();
        current_month++;
        if(current_month>11)
        {
            current_month = 0;
            this.date.setMonth(current_month);
            this.date.setFullYear(this.date.getFullYear()+1);
        } else this.date.setMonth(current_month);

        this.determineMonth();

        document.getElementById('days').remove();
        this.createDays();
    }
    determineMonth()
    // print what month it is to human readable way
    {
        let currentMonth = this.date.getMonth();
        let monthToString;
        switch (currentMonth) {
            case 0:
                monthToString = "January";
                break;
            case 1:
                monthToString = "February";
                break;
            case 2:
                monthToString = "March";
                break;
            case 3:
                monthToString = "April";
                break;
            case 4:
                monthToString = "May";
                break;
            case 5:
                monthToString = "June";
                break;
            case 6:
                monthToString = "July";
                break;
            case 7:
                monthToString = "August";
                break;
            case 8:
                monthToString = "September";
                break;
            case 9:
                monthToString = "October";
                break;
            case 10:
                monthToString = "November";
                break;
            case 11:
                monthToString = "December";
                break;
            default:
                monthToString = "Error";
                break;
        }
        document.getElementById('month').innerText = monthToString;
    }
    getBeginningDay()
    // get week day when current month starts
    {
        return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    }
    getMonthDays()
    // get number of days in current month
    {
        // getMonth returns CurrentMonth-1 because it counts months from 0;
        // because of it we need to add +1 to is so it calculates month right
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    }
}
class Calculation
{
    constructor()
    {
        this.salary = 0;
        this.work_days = 0;
        this.free_days = 0;
    }
    calculateDays(days)
    {
        this.reset();
        let weekBreak = [2,2,1]; // shifts: 1st,3rd,2nd
        let daysWorkedLastMonth = document.getElementById('day-in-prev-month').value;
        let shift = document.getElementById('prev-shift').value; // Previous shift
        let shiftBreak = weekBreak[shift]; // Getting number of break days after previous shift
        console.log(daysWorkedLastMonth);
        let daysLeftToWork = 5-daysWorkedLastMonth; // Getting shift days left from previous month

        for(let i = 1; i <= days; i++)
        {
            if(daysLeftToWork !== 0) { // if work day
                document.getElementById(i).classList.add('work-day'); // mark as one
                this.work_days++;
                let shiftToString; // Human readable shift
                if(shift == 0)
                    shiftToString = '1st';
                else if(shift == 1)
                    shiftToString = '3rd';
                else shiftToString = '2nd';

                document.getElementById(i).setAttribute('title', shiftToString);
                daysLeftToWork--;
            } else {
                document.getElementById(i).classList.remove('work-day'); // remove its not work day
                shiftBreak--;
                this.free_days++;
                if(shiftBreak === 0) { // Checking if we run out of break days
                    daysLeftToWork = 5;
                    shift++; // Switching to next shift
                    if(shift > 2) // If shift is 2(end of second shift)
                        shift = 0; // Go back to first shift
                    shiftBreak = weekBreak[shift]; // Set break days after current shift
                }
            }
        }
        this.calculateMonth();
    }
    calculateMonth()
    {
        let daily_wage = 1200;
        this.salary = this.work_days * daily_wage;
        document.getElementById('calculation-result').classList.remove('d-none');
        document.getElementById('salary').setAttribute('placeholder', this.salary.toString());
        document.getElementById('work-days').setAttribute('placeholder', this.work_days.toString());
        document.getElementById('free-days').setAttribute('placeholder', this.free_days.toString());
    }
    reset()
    {
        this.salary = 0;
        this.work_days = 0;
        this.free_days = 0;
    }
}

let month = new Month();
let calculation = new Calculation();
