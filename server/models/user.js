const db = require('../db');
var Products = db.defineModel('users', {
    name: db.STRING(100),
    password: db.BIGINT
});
 
