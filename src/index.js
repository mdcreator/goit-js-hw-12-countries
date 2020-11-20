import './css/style.css';
import getRefs from './js/get-refs';
import API from './js/fetchCountries';
import countryCardTpl from './templates/country-markup.hbs';
import countriesCardTpl from './templates/searchCountries.hbs';
import pnotify from './js/pnotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearchInput, 500));

function onSearchInput() {
  clearCountriesContainer();
  const searchQuery = refs.searchInput.value;

  API.fetchCountries(searchQuery).then(searchResult).catch(console.log);
}

function searchResult(countries) {
  const numberOfCountries = countries.length;

  if (numberOfCountries === 1) {
    renderCountryCard(countries, countryCardTpl);
  } else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
    renderCountryCard(countries, countriesCardTpl);
  } else if (numberOfCountries > 10) {
    clearCountriesContainer();
    pnotify.Info();
  } else {
    clearCountriesContainer();
    pnotify.Error();
  }
}

function renderCountryCard(countries, template) {
  const markup = template(countries);
  refs.cardContainer.innerHTML = markup;
}

function clearCountriesContainer() {
  refs.cardContainer.innerHTML = '';
}
