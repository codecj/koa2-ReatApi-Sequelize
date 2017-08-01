// store products as database:
const db = require('../db');
var Products = db.defineModel('prods', {
    name: db.STRING(100),
    price: db.BIGINT
});

