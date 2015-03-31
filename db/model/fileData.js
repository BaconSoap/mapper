var mysql = require('mysql');

module.exports = function(pool) {
  var loadFile = function(filePath, headers, fileId, cb) {
    var createTable = 'CREATE TABLE `tmp.' + fileId + '` ( ';
    var colDefs = [];
    for (var i = 0; i < headers.length; i++) {
      colDefs.push('?? VARCHAR(256)');
    }
    createTable += colDefs.join(', ') + ' )';

    var insertData = 'LOAD DATA INFILE ? INTO TABLE `tmp.' + fileId + '` IGNORE 1 LINES';
    console.log(mysql.format(insertData, [filePath]))
    pool.query(createTable, headers, function(e, data) {
      pool.query(insertData, [filePath], function(e2) {
        return cb(e);
      });
    });
  };

  return {
    loadFile: loadFile
  };
};
