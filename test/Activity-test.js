const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity')
const User = require('../src/User');
const userTestData = require('../test/user-test-data');
const activityTestData = require('./activity-test-data')

describe('Activity', function () {
  let today, yesterday, twoDaysAgo, activityData, user, user1, activity, friendArr;

  beforeEach(function () {
    today = '2019/09/22'
    yesterday = '2019/09/21'
    twoDaysAgo = "2019/09/20"
    activityData = activityTestData
    activity = new Activity(activityData)
    allUsersArr = userTestData
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

  it('should have a property of dataPerUser', function() {
    expect(activity.getUserStepsForDate(activityData, user, yesterday)).to.equal(5711)
    expect(activity.getUserStepsForDate(activityData, user, today)).to.equal(8072)
  })

  it('should calculate numbers of miles per date for user', function() {
    expect(activity.getMilesByDate(activityData, user, yesterday)).to.equal(4.65)
    expect(activity.getMilesByDate(activityData, user, today)).to.equal(6.57)
  })

  it('should calculate numbers of steps for user by date', function() {
    expect(activity.getUserStepsForDate(activityData, user, yesterday)).to.equal(5711)
    expect(activity.getUserStepsForDate(activityData, user, today)).to.equal(8072)
  })

  it('should calculate numbers of active minutes for user', function() {
    expect(activity.getUserMinutesActive(activityData, user, yesterday)).to.equal(137)
    expect(activity.getUserMinutesActive(activityData, user, today)).to.equal(239)
  })

  it('should calculate user avg minutes active for a week ', function() {
    expect(activity.getUserAvgMinActiveByWeek(activityData, user, yesterday)).to.equal(185)
    expect(activity.getUserAvgMinActiveByWeek(activityData, user, today)).to.equal(199)
  })

  it('should calculate user flights of stairs by ate', function() {
    expect(activity.getUserFlightsOfStairs(activityData, user, yesterday)).to.equal(43)
    expect(activity.getUserFlightsOfStairs(activityData, user, today)).to.equal(23)
  })

  it('should show fail message if user did not meet step goal', function() {
    expect(activity.getUserStepGoalAchievement(activityData, user, yesterday)).to.equal(`Epic Fail. You did not meet your step goal!`)
    expect(activity.getUserStepGoalAchievement(activityData, user, today)).to.equal(`Epic Fail. You did not meet your step goal!`)
  })

  it('should show congratulatory message if user met step goal', function() {
    expect(activity.getUserStepGoalAchievement(activityData, user, twoDaysAgo)).to.equal(`Nice job! You completed your step goal for today!`)
  })

  it('should provide dates user achieved step goal', function() {
    expect(activity.getUserStepGoalWins(activityData, user)).to.deep.equal([ '2019/09/19', '2019/09/20' ])
  })

  it('should provide all time stair record for user', function() {
    expect(activity.getUserStairRecord(activityData, user)).to.equal(44)
  })

  it('should provide user weekly data', function() {
    expect(activity.getUserWeekActivity(activityData, user, today)).to.deep.equal([
      '2019/09/16: Steps - 6637, Minutes Active - 175, Stairs - 36',
      '2019/09/17: Steps - 4901, Minutes Active - 288, Stairs - 10',
      '2019/09/18: Steps - 9974, Minutes Active - 80, Stairs - 40',
      '2019/09/19: Steps - 12083, Minutes Active - 218, Stairs - 20',
      '2019/09/20: Steps - 14000, Minutes Active - 262, Stairs - 17',
      '2019/09/21: Steps - 5711, Minutes Active - 137, Stairs - 43',
      '2019/09/22: Steps - 8072, Minutes Active - 239, Stairs - 23'
    ])
  })

  it('should provide avg steps, minutes active and flights of stairs by date for all users', function() {
    expect(activity.getAllUsersAvgData(activityData, yesterday)).to.deep.equal([ 7303, 158, 27 ])
    expect(activity.getAllUsersAvgData(activityData, today)).to.deep.equal([ 6411, 194, 25 ])
  })

  it('should find the greatest stair climber amongst all users', function() {
    expect(activity.bestStairClimberEver(activityData)).to.deep.equal(45)
  })
  
  it('should grab friends activity data with friends names', function() {
    expect(activity.getFriendsStats(activityData, user, today, allUsersArr)).to.deep.equal([
      '<br>Jarvis Considine\n      <br>Total Steps: 9050',
      '<br>Luisa Hane\n      <br>Total Steps: 8072',
      '<br>Erick Schaden\n      <br>Total Steps: 7073',
      '<br>Herminia Witting\n      <br>Total Steps: 4831',
      '<br>Mae Connelly\n      <br>Total Steps: 3030'
    ])
  })
});