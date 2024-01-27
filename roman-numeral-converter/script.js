const app = document.getElementById('app');
const numberInput = app.querySelector('#number');
const convertButton = app.querySelector('#convert-btn');
const outputDiv = app.querySelector('#output');

const arabicToRomanArr = [
  { target: "M", source: 1000 },
  { target: "CM", source: 900 },
  { target: "D", source: 500 },
  { target: "CD", source: 400 },
  { target: "C", source: 100 },
  { target: "XC", source: 90 },
  { target: "L", source: 50 },
  { target: "XL", source: 40 },
  { target: "X", source: 10 },
  { target: "IX", source: 9 },
  { target: "V", source: 5 },
  { target: "IV", source: 4 },
  { target: "I", source: 1 },
]

const convertArabicToRoman = (num, map = arabicToRomanArr) => {
  if (num < 0) {
    return 'Please enter a number greater than or equal to 1';
  }

  if (num === 0) {
    return '';
  }

  if (num >= 4000) {
    return 'Please enter a number less than or equal to 3999';
  }

  const maxNumberIndex = map.findIndex(el => {
    return el.source <= num;
  });

  if (maxNumberIndex === -1) {
    return ''
  }

  const maxNumberObj = map[maxNumberIndex];

  return maxNumberObj.target + convertArabicToRoman(num - maxNumberObj.source, map.slice(maxNumberIndex));
}

const updateElementInnerHTML = (element, text) => {
  element.innerHTML = text;
}

const updateOutput = updateElementInnerHTML.bind(null, outputDiv);

const clearInput = (input) => {
  input.value = '';
}

const updateApp = () => {
  const value = numberInput.value;
  if (!value) {
    updateOutput('Please enter a valid number');
    return;
  }

  updateOutput(convertArabicToRoman(value));
  clearInput(numberInput);
}

numberInput.addEventListener('keydown', (e) => {
  if (outputDiv.textContent.trim()) {
    updateOutput('&nbsp;')
  }

  if (e.key === "Enter") {
    updateApp();
    return;
  }
})

convertButton.addEventListener('click', () => {
  updateApp()
})

