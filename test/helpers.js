let chai = require('chai'),
  expect = chai.expect;
let dateformats = require('../helpers/dateformats');


describe('helper isValidUnixTimestamp', () => {
  const x = dateformats.isValidUnixTimestamp;
  it('is function', done => {
    expect(x).to.be.a('function');
    done();
  });
  it('return boolean', done => {
    expect(x('123123')).to.be.a('boolean');
    done();
  });
  it('values test', done => {
    expect(x('123123')).to.be.true;
    expect(x('-123123')).to.be.true;
    expect(x('8640000000001')).to.be.false;
    expect(x('-8640000000001')).to.be.false;
    expect(x('123123s')).to.be.false;
    done();
  });
});
