/**
 * Calculations from: http://users.sa.chariot.net.au/~gmarts/eastalg.htm ;
 *    JavaScript version from http://www.gmarts.org/index.php?go=415#easterscript
 *     updated.
 */
var iJDay = 0;
var iJMonth = 0;
var iODay = 0;
var iOMonth = 0;
var iWDay = 0;
var iWMonth = 0;
var iYear = 0;

function ShowEasters(sYear) {
	// Clear out display fields
	document.getElementById("dateOutputW").innerHTML = "&nbsp;"
	document.getElementById("dateOutputO").innerHTML = "&nbsp;"
	document.getElementById("dateOutputJ").innerHTML = "&nbsp;"
	// Begin calculations
	iYear = parseInt(sYear, 10);
	if (isNaN(iYear))
		iYear = 0;
	// reset variables
	iJDay = 0;
	iJMonth = 0;
	iODay = 0;
	iOMonth = 0;
	iWDay = 0;
	iWMonth = 0;
	// get relevant Easter dates
	if ((iYear <= 325) || (iYear > 4099))
		alert("Select a year from 326 to 4099. ");
	else {
		EasterJulian(); // used for all calculations
		if ((iYear > 325) && (iYear <= 1582)) {
			iAnsJMonth = iJMonth;
			iAnsJDay = iJDay;
		} else { // year is 1583 to 4099
			EasterOrthodox(iYear, iJDay, iJMonth);
			EasterWestern();
			iAnsJMonth = iJMonth;
			iAnsJDay = iJDay;
			iAnsWMonth = iWMonth;
			iAnsWDay = iWDay;
			iAnsOMonth = iOMonth;
			iAnsODay = iODay;
		}
	}
	if (iWDay != 0) {
		//It will only be zero, if the year was invalid.
		document.getElementById("dateOutputW").innerHTML = 'Western: ' + iYear
				+ '-' + padout(iWMonth) + '-' + padout(iWDay);
		document.getElementById("dateOutputO").innerHTML = 'Orthodox: ' + iYear
				+ '-' + padout(iOMonth) + '-' + padout(iODay);
		document.getElementById("dateOutputJ").innerHTML = 'Julian: ' + iYear
				+ '-' + padout(iJMonth) + '-' + padout(iJDay);
	}
}
function EasterJulian() {
	var g = 0;
	var i = 0;
	var j = 0;
	var p = 0;
	g = iYear % 19;
	i = (19 * g + 15) % 30;
	j = (iYear + Math.floor(iYear / 4) + i) % 7;
	p = i - j + 28;
	iJDay = p;
	iJMonth = 4;
	if (p > 31)
		iJDay = p - 31;
	else
		iJMonth = 3;
}
function EasterWestern() {
	var g = 0;
	var c = 0;
	var h = 0;
	var i = 0;
	var j = 0;
	var p = 0;
	g = iYear % 19;
	c = Math.floor(iYear / 100);
	h = (c - Math.floor(c / 4) - Math.floor((8 * c + 13) / 25) + 19 * g + 15) % 30;
	i = h - Math.floor(h / 28)
			* (1 - Math.floor(h / 28) * Math.floor(29 / (h + 1)) * Math.floor((21 - g) / 11));
	j = (iYear + Math.floor(iYear / 4) + i + 2 - c + Math.floor(c / 4)) % 7;
	p = i - j + 28;
	iWDay = p;
	iWMonth = 4;
	if (p > 31)
		iWDay = p - 31;
	else
		iWMonth = 3;
}
function EasterOrthodox(iYear, iJDay, iJMonth)
/*
 * Even though the Julian calendar is no longer in use Orthodox Easters are
 * still based on this calendar. NB The Julian Easter Date must be calculated
 * first! This function converts Julian March and April Easter Sunday dates to
 * Gregorian calendar dates.
 */
{
	var iExtra = 0;
	var iTemp = 0;
	iODay = 0;
	iOMonth = 0;
	if ((iYear > 1582) && (iYear <= 4099)) {
		iExtra = 10;
		if (iYear > 1600) {
			iTemp = Math.floor(iYear / 100) - 16;
			iExtra = iExtra + iTemp - Math.floor(iTemp / 4);
		}
		iODay = iJDay + iExtra;
		iOMonth = iJMonth;
		if ((iOMonth == 3) && (iODay > 31)) {
			iOMonth = 4;
			iODay = iODay - 31;
		}
		if ((iOMonth == 4) && (iODay > 30)) {
			iOMonth = 5;
			iODay = iODay - 30;
		}
	}
}
function padout(iNumber) {
	return (iNumber < 10) ? '0' + iNumber : iNumber;
}