const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity')
const User = require('../src/User');
const userTestData = require('../test/user-test-data');
const activityTestData = require('./activity-test-data')

describe('Activity', function () {
  let today, yesterday, activityData, user, user1, activity;

  beforeEach(function () {
    today = '2019/09/22'
    yesterday = '2019/09/21'
    activityData = activityTestData
    activity = new Activity(activityData)
    user1 = userTestData[0]
    user = new User(user1)
  })

  it('should be a function', function() {
    expect(Activity).to.be.a('function')
  })

  it('should be an instance of Activity', function() {
    expect(activity).to.be.an.instanceOf(Activity)
  })

  it('should have a property of activityData', function() {
    expect(activity.activityData).to.equal(activityData)
  })

  it('should have a property of dataPerUser', function() {
    expect(activity.grabDataPerUser()).to.deep.equal(activity.dataPerUser)
  })

  it('should calculate numbers of miles per date for user', function() {
    expect(activity.getMilesByDate(activityData, user, today)).to.equal(6.57)
  })

  

});