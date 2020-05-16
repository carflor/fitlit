const chai = require('chai');
const expect = chai.expect;
const Sleep = require('../src/Sleep')
const User = require('../src/User');
const userTestData = require('../test/user-test-data');
const sleepTestData = require('./sleep-test-data')

describe('Sleep', function () {
  let today, yesterday, sleepData, user, user1, sleep;

  beforeEach(function () {
    today = '2019/09/22'
    yesterday = '2019/09/21'
    sleepData = sleepTestData
    sleep = new Sleep(sleepData)
    user1 = userTestData[0]
    user = new User(user1)
  })

  it('should be a function', function() {
    expect(Sleep).to.be.a('function')
  })

  it('should be an instance of sleep', function() {
    expect(sleep).to.be.an.instanceOf(Sleep)
  })

  it('should have a property of data', function() {
    expect(sleep.sleepData).to.equal(sleepData)
  })

  it('should be able to get the avg sleep hours for a user', function() {
    expect(sleep.getUserAvgSleepHours(sleepData, user)).to.equal(7)
  })

  it('should be able to calculate the average sleep quality', function() {
    expect(sleep.getUserAvgSleepQuality(sleepData, user)).to.equal(2)
  })

  it('should get the sleep hours for a user on a specific date', function() {
    expect(sleep.getUserHoursSleptForDate(sleepData, user, today)).to.equal(4.6)
  })

  it('should be able to get sleep quality for a specific date', function() {
    expect(sleep.getUserSleepQualityForDate(sleepData, user, today)).to.equal(1)
  })

  it('should be able to calculate avg sleep quality for ALL users', function() {
    expect(sleep.getAllUsersAvgSleepQuality(sleepData)).to.equal(3)
  })

  it('should get the avg sleep quality for a given week', function() {
    expect(sleep.getUserWeekSleepQuality(sleepData, user, today)).to.deep.equal(['2019/09/22  : 1.4/5',
      '2019/09/21  : 4/5',
      '2019/09/20  : 2.6/5',
      '2019/09/19  : 1.7/5',
      '2019/09/18  : 2.2/5',
      '2019/09/17  : 3.2/5',
      '2019/09/16  : 1.8/5'])
  })

  it('should get the user week hours slept', function() {
    expect(sleep.getUserWeekHoursSlept(sleepData, user, today)).to.deep.equal([
      '2019/09/22  : 4.6',
      '2019/09/21  : 10.7',
      '2019/09/20  : 8.6',
      '2019/09/19  : 9.9',
      '2019/09/18  : 4.1',
      '2019/09/17  : 6.3',
      '2019/09/16  : 8.8'
    ])
  })

  it('should return users that avg best sleep for any week', function() {
    // sleep.getBestUsersSleepQualityByDate(today)
    expect(sleep.getBestUsersSleepQualityByDate(today)).to.deep.equal([3])
  })

  it('should return users that slept the most for a given day', function() {
    expect(sleep.getUsersMostHoursSleptPerDate(sleepData, today)).to.deep.equal([
      { userID: 2, date: '2019/09/22', hoursSlept: 5.3, sleepQuality: 4.6 },
      { userID: 3, date: '2019/09/22', hoursSlept: 5.3, sleepQuality: 4.4 }
    ])
  })

  it('should return users that slept the least for a given day', function() {
    expect(sleep.getWorstSleptUserPerDate(sleepData, yesterday)).to.deep.equal([
      { userID: 3, date: '2019/09/21', hoursSlept: 6.1, sleepQuality: 3.5 }
    ])
    expect(sleep.getWorstSleptUserPerDate(sleepData, today)).to.deep.equal([
      { userID: 1, date: '2019/09/22', hoursSlept: 4.6, sleepQuality: 1.4 }
    ])
  })

});