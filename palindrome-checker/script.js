const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

const cleanString = (str) => {
  return str.replace(/[^a-z0-9]/gi, '');
};

const lowerCaseString = (str) => {
  return str.toLowerCase();
};

const isPalindrome = (word) => {
  if (!word) {
    return false;
  }

  for (let i = 0, j = word.length - 1; i < j; i += 1, j -= 1) {
    if (word[i] !== word[j]) {
      return false;
    }
  }

  return true;
};

const handleCheckButtonClick = () => {
  const inputValue = textInput.value;
  if (!inputValue) {
    alert('Please input a value');
    return;
  }

  const result = isPalindrome(lowerCaseString(cleanString(inputValue)));

  resultDiv.innerText = `${inputValue} is ${result ? '' : 'not'} a palindrome`;
  textInput.value = '';
};

checkButton.addEventListener('click', handleCheckButtonClick);
