var chai = require('chai');
global.expect = chai.expect;
chai.should();
chai.use(require('sinon-chai'));
global.sinon = require('sinon');

process.env.MAPPER_ENVIRONMENT='test'
process.env.MAPPER_SQL_HOST='localhost'
process.env.MAPPER_SQL_USER='mapper'
process.env.MAPPER_SQL_PASSWORD='mapper'
