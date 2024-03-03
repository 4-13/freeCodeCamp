const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultDiv = document.getElementById("results-div");

const phoneNumberRegexp = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/

const isValidString = (regexArr = []) => (string = '') => regexArr.some(regex => regex.test(string));

const isValidPhoneNumber = isValidString([phoneNumberRegexp]);

const checkHandler = (event) => {
  console.log(userInput)
  if (!userInput) {
    return;
  }
  const value = userInput.value
  userInput.value = '';

  if (value === '') {
    alert('Please provide a phone number')
    return;
  }

  const isValid = isValidPhoneNumber(value);
  const resultStr = `${isValid ? 'Valid' : 'Invalid'} US number: ${value}`
  addResult(resultStr)
}

const clearHandler = (event) => {
  if (!resultDiv) {
    return;
  }

  resultDiv.innerHTML = '';
}

const addResult = (resultStr) => {
  if (!resultDiv) {
    return;
  }

  const p = document.createElement('p');
  p.textContent = resultStr;
  resultDiv.appendChild(p);
}

checkBtn.addEventListener('click', checkHandler);
clearBtn.addEventListener('click', clearHandler);
