
const ZERO = 'zero';
const before20NumbersNames = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const dozenNumbersNames = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

module.exports = function toReadable (number) {
  if (number < 20) return getBefore20NumberName(number);
  if (number < 100) return getBeforeHundredNumber(number);
  if (number < 1000) return getBeforeThousandNumberName(number);
}

function getBefore20NumberName(number) {
  return before20NumbersNames[number];
}

function getBeforeHundredNumber(number) {
  const numberArray = parseNumberToArray(number);
  const dozens = getDozenNumberName(numberArray);
  const units = getUnitsNumberName(numberArray);
  return units === ZERO ? dozens : `${dozens} ${units}`;
}

function getBeforeThousandNumberName(number) {
  const [hundredNumber, dozensNumber] = getHundredAndDozensNumbers(number);
  const hundred = getHundredNumberName(hundredNumber);
  const dozens = dozensNumber < 20 ? getBefore20NumberName(dozensNumber) : getBeforeHundredNumber(dozensNumber);
  return dozens === ZERO ? hundred : `${hundred} ${dozens}`;
}

function parseNumberToArray(number) {
  return `${number}`.split('').map((item) => +item);
}

function getDozenNumberName(numberArray) {
  return dozenNumbersNames[numberArray[0]];
}

function getUnitsNumberName(numberArray) {
  return getBefore20NumberName(numberArray[1]);
}

function getHundredNumberName(hundredNumber) {
  return `${getBefore20NumberName(hundredNumber)} hundred`;
}

function getHundredAndDozensNumbers(number) {
  const numberArray = parseNumberToArray(number);
  return [+numberArray.shift(), +numberArray.join('')];
}