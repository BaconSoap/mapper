var mysql = require('mysql');

module.exports = function(pool) {
  var loadFile = function(fileData, headers, fileId, cb) {
    var createTable = 'CREATE TABLE `tmp.' + fileId + '` ( ';
    var colDefs = [];
    for (var i = 0; i < headers.length; i++) {
      colDefs.push('?? VARCHAR(256)');
    }
    createTable += colDefs.join(', ') + ' )';

    var insertValues = [];

    for(var i = 0; i < fileData.length; i++) {
      insertValues.push(insertRow(fileData[i], 'tmp.' + fileId));
    }

    var insertData = 'INSERT INTO `tmp.' + fileId + '` VALUES ' + insertValues.join(',');

    pool.query(createTable, headers, function(e, data) {
      pool.query(insertData, function(e2) {
        return cb(e);
      });
    });
  };

  var insertRow = function(data, tableName) {
    var sql = '(';
    sql += new Array(data.length + 1).join('?').split('').join(',');
    sql += ')';
    return mysql.format(sql, data);
  };

  return {
    loadFile: loadFile
  };
};
