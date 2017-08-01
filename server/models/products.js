// store products as database:
const db = require('../db');
module.exports = db.defineModel('prods', {
    name: db.STRING(100),
    price: db.BIGINT
});

