const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTrackingInput, 500));
form.addEventListener('submit', onSubmitForm);

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

function onTrackingInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();

  e.currentTarget.reset();

  const receivedData = localStorage.getItem(STORAGE_KEY);
  parsedData = JSON.parse(receivedData);

  console.log(parsedData);

  localStorage.removeItem(STORAGE_KEY);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('textarea, input').forEach(e => {
    if (e.value === '') e.value = localStorage.getItem(e.name, e.value);

    e.addEventListener('input', function () {
      localStorage.setItem(e.name, e.value);
    });
  });
});

// function onSavedInputValue1() {
//   const savedInputValue = localStorage.getItem(STORAGE_KEY);
//   const savedInputValueParse = JSON.parse(savedInputValue);

//   if (savedInputValueParse) {
//     form.elements.email.value = savedInputValueParse.email;
//   }
// }

// function onSavedInputValue2() {
//   const savedInputValue = localStorage.getItem(STORAGE_KEY);
//   const savedInputValueParse = JSON.parse(savedInputValue);
//   if (savedInputValueParse) {
//     form.elements.message.value = savedInputValueParse.message;
//   }
// }

// onSavedInputValue1();
// onSavedInputValue2();
