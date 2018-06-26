let server = require('../server');

let chai = require('chai'),
  expect = chai.expect;

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));


describe('/GET /api/timestamp/:date_string', () => {
  let resSuccessSchema = {
    type: 'object',
    required: ['unix', 'utc'],
    properties: {
      unix: {
        type: 'number'
      },
      utc: {
        type: 'string'
      },
    }
  };
  let resErrorSchema = {
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'string'
      },
    }
  };
  it('/GET current time', done => {
    chai.request(server)
      .get('/api/timestamp/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(resSuccessSchema);
        done();
      });
  });

  it('/GET date for 552333', done => {
    chai.request(server)
      .get('/api/timestamp/552333')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(resSuccessSchema);
        expect(res.body).to.have.property('utc', 'Thu, 01 Jan 1970 00:09:12 GMT');
        expect(res.body).to.have.property('unix', 552333);
        done();
      });
  });

  it('/GET date for 2018-02-03', done => {
    chai.request(server)
      .get('/api/timestamp/2018-02-03')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(resSuccessSchema);
        expect(res.body).to.have.property('utc', 'Sat, 03 Feb 2018 00:00:00 GMT');
        expect(res.body).to.have.property('unix', 1517616000000);
        done();
      });
  });

  it('/GET date for 552333f', done => {
    chai.request(server)
      .get('/api/timestamp/552333f')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.jsonSchema(resErrorSchema);
        done();
      });
  });

  it('/GET date for 8640000000001', done => {
    chai.request(server)
      .get('/api/timestamp/8640000000001')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.jsonSchema(resErrorSchema);
        done();
      });
  });

  it('/GET date for 2020-22-44', done => {
    chai.request(server)
      .get('/api/timestamp/2020-22-44')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.jsonSchema(resErrorSchema);
        done();
      });
  });

});
