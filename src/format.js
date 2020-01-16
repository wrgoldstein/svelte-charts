import * as d3 from "d3"

let formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%Y-%m-%d"),
    formatYear = d3.timeFormat("%Y")

function multiFormat(date) {
    return (d3.timeSecond(date) < date ? formatSecond
        : d3.timeMinute(date) < date ? formatMinute
        : d3.timeHour(date) < date ? formatHour
        : d3.timeDay(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
        : d3.timeMonth(date) < date ? formatMonth
        : d3.timeYear(date) < date ? formatMonth
        : formatYear)(date);
}

export function formatLabel(label){
    if (typeof label.getMonth === 'function'){
        return multiFormat(label)
    } else if (!isNaN(label) && !Number.isInteger(+label)) {
        return parseFloat(label).toFixed(2)
    } 
    else {
        return label
    }
}
