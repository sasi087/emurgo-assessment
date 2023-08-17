/**
 * Function which is used to check the given input is a number or not
 * @param { string } value
 * @returns
 */
const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const NumberHelper = {
  isNumeric,
};

export default NumberHelper;
