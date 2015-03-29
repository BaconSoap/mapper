var mysql = require('mysql');

var user = process.env.MAPPER_SQL_USER;
var password = process.env.MAPPER_SQL_PASSWORD;
var host = process.env.MAPPER_SQL_HOST;

var pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  conenctionLimit: 10,
  database: 'mapper'
});

module.exports = {
  model: {
    User: require('./model/users.js')(pool)
  },
  __pool: pool
}
