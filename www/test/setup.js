var chai = require('chai');
global.expect = chai.expect;
chai.should();
chai.use(require('sinon-chai'));
global.sinon = require('sinon');
global.request = require('supertest');

process.env.MAPPER_ENVIRONMENT='test'
process.env.MAPPER_SQL_HOST='localhost'
process.env.MAPPER_SQL_USER='mapper'
process.env.MAPPER_SQL_PASSWORD='mapper'
process.env.MAPPER_UPLOAD_DIR='/vagrant/tmp/uploads'
process.env.AMQP_URL='amqp://mapper_test:mapper_test@localhost/mapper_test'
