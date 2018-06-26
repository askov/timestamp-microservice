let chai = require('chai'),
  expect = chai.expect;
let parseDateString = require('../middlewares/parseDateString');


describe('middleware parseDateString', () => {
  it('is function', done => {
    expect(parseDateString).to.be.an('function');
    done();
  });
});
