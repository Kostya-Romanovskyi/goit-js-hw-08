const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTrackingInput, 500));
form.addEventListener('submit', onSubmitForm);

const STORAGE_KEY = 'feedback-form-state';

onSavedInputValue();

function onTrackingInput(e) {
  let parsedFilters = localStorage.getItem(STORAGE_KEY);

  parsedFilters = parsedFilters ? JSON.parse(parsedFilters) : {};

  parsedFilters[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedFilters));
}

function onSubmitForm(e) {
  e.preventDefault();

  const receivedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(receivedData);

  console.log(parsedData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSavedInputValue() {
  let savedInputValue = localStorage.getItem(STORAGE_KEY);

  if (savedInputValue) {
    savedInputValue = JSON.parse(savedInputValue);

    Object.entries(savedInputValue).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}

form.addEventListener('reset', evt => {
  localStorage.removeItem(STORAGE_KEY);
});
