const fs = require('fs/promises');

const test = 12345;

// именной экспорт
module.exports.test = test;

// экспорт по умолчанию
// module.exports = test;