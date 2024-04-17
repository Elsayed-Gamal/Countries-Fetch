'use strict';

const input = document.querySelector('.search-bar');
const form = document.querySelector('.search');
const errorMsg = document.querySelector('.error-message');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const country = input.value;
  getCountryData(country);
});

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((result) => {
      let [countryResult] = result;
      if (result[0].name.common === 'Israel') countryResult = null;
      const currencies = [];
      for (const key in countryResult.currencies) {
        currencies.push(countryResult.currencies[key].name);
        renderData(countryResult, currencies[0]);
      }
    })
    .catch(() => {
      errorMsg.style.display = 'block';
    });
};

const renderData = function (country, currency) {
  const countries = document.querySelector('.countries');
  const html = `
    <div class="country">
      <div class="flag">
        <img
          src="${country.flags.png}"
          alt="${country.flags.alt}"
        />
      </div>
      <div class="info">
        <div class="info-name">
          <ion-icon name="at-outline"></ion-icon>
          <span>Name: ${country.name.common}</span>
        </div>
        <div class="info-region">
          <ion-icon name="earth-outline"></ion-icon>
          <span>Region: ${country.region}</span>
        </div>
        <div class="info-time">
          <ion-icon name="time-outline"></ion-icon>
          <span>Time: ${getCountryDateTime(country.timezones[0])}</span>
        </div>
        <div class="info-population">
          <ion-icon name="people-outline"></ion-icon>
          <span>Population: ${country.population}</span>
        </div>
        <div class="info-curruncy">
          <ion-icon name="cash-outline"></ion-icon>
          <span>Currency: ${currency}</span>
        </div>
      </div>
    </div>
  `;

  countries.insertAdjacentHTML('beforeend', html);
  input.value = '';
  if (errorMsg.style.display === 'block') errorMsg.style.display = 'none';
};

const getCountryDateTime = function (timeZone) {
  // Check if 'UTC+' or 'UTC-'
  if (timeZone.includes('+')) {
    timeZone = parseInt(timeZone.split('+')[1]);
  } else if (timeZone.includes('-')) {
    timeZone = -parseInt(timeZone.split('-')[1]);
  } else {
    timeZone = 0;
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
  return formattedCountryTime;
};
