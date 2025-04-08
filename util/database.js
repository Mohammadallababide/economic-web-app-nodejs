const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'hyT5428',
    database : 'shop-node-js', 
});

module.exports = pool.promise();