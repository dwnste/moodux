const compose = (...functions) => functions.reduce((f, g) => (...args) => f(g(...args)));

export default compose;
