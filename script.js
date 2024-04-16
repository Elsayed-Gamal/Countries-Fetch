'use strict';

let egypt;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://restcountries.com/v3.1/all');
xhr.send();

xhr.onload = function () {
  const response = JSON.parse(xhr.response);
  egypt =
    response[response.findIndex(country => country.name.common === 'Egypt')];
  let timeZone = egypt.timezones[0];
  getCountryDateTime(timeZone);
};

const dateMile = new Date().getTime();
// const utcTime =

const getCountryDateTime = function (timeZone) {
  // Check if 'UTC+' or 'UTC-'
  if (timeZone.includes('+')) {
    timeZone = parseInt(timeZone.split('+')[1]);
  } else if (timeZone.includes('-')) {
    timeZone = -parseInt(timeZone.split('-')[1]);
  }

  // Convert Time Zone to mileseconds
  const timeZoneMileSeconds = timeZone * 60 * 60 * 1000;

  // Get UTC date and time in mileseconds
  const utcTimeMileSeconds =
    new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;

  // Get country date and time depending on it's Time Zone
  const countryTime = new Date(utcTimeMileSeconds + timeZoneMileSeconds);

  // Format date and time in a nice way
  const formattedCountryTime = Intl.DateTimeFormat('en-EG', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(countryTime);

  // Log formatted date and time to the console
  console.log(formattedCountryTime);
};
