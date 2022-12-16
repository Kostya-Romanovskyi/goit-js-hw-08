const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTrackingInput, 500));
form.addEventListener('submit', onSubmitForm);

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

onSavedInputValue();

function onTrackingInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();

  e.currentTarget.reset();

  const receivedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(receivedData);

  console.log(parsedData);

  localStorage.removeItem(STORAGE_KEY);
}

function onSavedInputValue() {
  let savedInputValue = localStorage.getItem(STORAGE_KEY);

  if (savedInputValue) {
    savedInputValue = JSON.parse(savedInputValue);

    Object.entries(savedInputValue).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
  }
}
