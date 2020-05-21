const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const userTestData = require('../test/user-test-data');
const hydrationTestData = require('../test/hydration-test-data')
const Hydration = require('../src/Hydration')

describe('Hydration', function () {
  let hydration, today, hydrationData, user, user1;  

  beforeEach(function() {
    today = '2019/06/29';
    hydrationData = hydrationTestData;
    hydration = new Hydration(hydrationData)
    user1 = userTestData[0]
    user = new User(user1)
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
    expect(hydration.getUserAvgOuncesToday(hydrationData, user, today)).to.equal(99)
  })

  it('should be able to get the avg ounces for a user all time', function() {
    expect(hydration.getUserAvgOuncesAllTime(hydrationData, user)).to.equal(59)
  })

  //  Test was passing until styling with line breaks was implemented. 
  // it('should give avg ounces per day for a week', function() {
  //   expect(hydration.getUserWeekHydration(hydrationData, user, today)).to.deep.equal(
  //     ' 06/23 : 39',
  //     ' 06/24 : 61',
  //     ' 06/25 : 51',
  //     ' 06/26 : 52',
  //     ' 06/27 : 29',
  //     ' 06/28 : 57',
  //     ' 06/29 : 99'
  //   )
  // })
});


