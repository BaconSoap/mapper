var Joi = require('joi');

module.exports = function(pool) {
  var findByUsernameAndPassword = function(username, password, cb) {
    var sql = "SELECT username, userId FROM users WHERE username = ? AND password = ?";
    pool.query(sql, [username, password], function(e, data) {
      if (e) { return cb(e); }
      if (!data || data.length === 0) { return cb(e, null); }
      var user = {};
      user.username = data[0]['username'];
      user.id = data[0]['userId'];
      return cb(e, user);
    });
  };

  var create = function(user, cb) {
    var sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    pool.query(sql, [user.username, user.password], function(e, data) {
      return cb(e, data.insertId);
    });
  };

  return {
    findByUsernameAndPassword: findByUsernameAndPassword,
    create: create,
    validator: Joi.object({
                 username: Joi.string().min(5),
                 password: Joi.string().min(8)
               })
  };
};
