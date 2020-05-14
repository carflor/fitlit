const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const userTestData = require('../test/test-data');
const hydrationTestData = require('../test/test-data')
const Hydration = require('../src/Hydration')

describe('Hydration', function () {
  let hydration, today;  
  beforeEach(function() {
    today = "2019/06/29";
    hydrationData = hydrationTestData;
    hydration = new Hydration(hydrationData)
  })
  it('should be a function', function() {
    expect(Hydration).to.be.a('function')
  })
  it('should be an instance of Hydration', function() {
    expect(hydration).to.be.an.instanceOf(Hydration)
  })
  it('should have a property of data', function() {
    expect(hydration.hydrationData).to.equal(hydrationData)
  })
  it('should be able to get the avg ounces for a user today', function() {
    expect(hydration.getUserAvgOuncesToday(hydrationTestData, 1, today)).to.equal(37)
  })
  it('should be able to get the avg ounces for a user all time', function() {
    expect(hydration.getUserAvgOuncesAllTime(hydrationTestData, 1)).to.equal(59)
  })
  it('should give avg ounces per day for a week', function() {
    expect(hydration.getUserWeekHydration(hydrationData, 1, today).length).to.equal(7)
  })
})


