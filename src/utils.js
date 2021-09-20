const pipe = (...functions) => (firstValue) => {
    let result = firstValue;
    for (let i = 0; i < functions.length; i++) {
        result = functions[i](result);
    }
    return result
}

const divide = (divideBy) => (whatToDivide) => whatToDivide / divideBy;


module.exports = {
    pipe: pipe,
    divideBy: divide,
}