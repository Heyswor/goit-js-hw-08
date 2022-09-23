import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');

const INPUT_STORAGE_KEY = 'inputValue';

formRef.addEventListener('input', throttle(onInputText, 500));
formRef.addEventListener('submit', onFormSubmit);

function onInputText(event) {
  const { name, value } = event.target;
  let myData = localStorage.getItem(INPUT_STORAGE_KEY);
  if (myData) {
    myData = JSON.parse(myData);
  } else {
    myData = {};
  }
  myData[name] = value;
  save(INPUT_STORAGE_KEY, myData);
}

function onFormSubmit(event) {
  event.preventDefault();  
  if (!localStorage.getItem(INPUT_STORAGE_KEY)) {
    return;
  }
  const saveObj = load(INPUT_STORAGE_KEY);
  console.log('email:', saveObj.email);
  console.log('message:', saveObj.message);

  const { target } = event;

  target.reset();
  remove(INPUT_STORAGE_KEY);
}

function savedData() {
  const saveObj = load(INPUT_STORAGE_KEY);

  if (!saveObj) {
    return;
  }

  Object.entries(saveObj).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
savedData();
