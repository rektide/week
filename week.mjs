#!/usr/bin/env node
"use strict"

/*
 * credit http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php/6117889#6117889
 */
/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function week( d) {
	// Copy date so don't modify original
	d = d=== undefined? new Date(): new Date( d);
	d.setHours( 0, 0, 0);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setDate( d.getDate() + 4 - ( d.getDay()|| 7));
	// Get first day of year
	var yearStart = new Date( d.getFullYear(), 0,1);
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil(( (( d - yearStart) / 86400000) + 1)/ 7);
	// Return array of year and week number
	return weekNo;
}

if( import.meta.url=== `file://${process.argv[ 1]}`){
	console.log( week())
	process.on( "uncaughtException", console.error.bind( console))
}

export {
	week
}
