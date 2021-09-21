const pipe =
  (...functions) =>
  (firstValue) => {
    let result = firstValue;
    for (let i = 0; i < functions.length; i++) {
      result = functions[i](result);
    }
    return result;
  };

const divideBy = (divideBy) => (whatToDivide) => whatToDivide / divideBy;

const callbackErrorHandler = (error) => {
  if (error !== null) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = {
  pipe,
  divideBy,
  callbackErrorHandler,
};
