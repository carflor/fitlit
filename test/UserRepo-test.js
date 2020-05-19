const chai = require('chai');
const expect = chai.expect;
const UserRepo = require('../src/UserRepo');
const User = require('../src/User');
const userTestData = require('../test/user-test-data');

describe('UserRepo', function() {
  let user1, user2, user3, user4, user5, userRepo, allUsers;

  beforeEach(function() {
    user1 = userTestData[0]
    user2 = userTestData[1]
    user3 = userTestData[2]
    user4 = userTestData[3]
    user5 = userTestData[4]
    allUsers = [user1, user2, user3, user4, user5]
    userRepo = new UserRepo(allUsers)
  })

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function');
  })

  it('should be an instance of UserRepo', function() {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  })

  it('should take all users as argument', function() {
    expect(userRepo.allUsers[0]).to.equal(user1);
  })

  it('should select user by provided id ', function() {
    expect(userRepo.selectedUser(user2.id)).to.equal(user2);
  })

  it('should calculate average step goal for all users', function() {
    expect(userRepo.calculateAvgStepGoalUsers()).to.equal(6400);
  })

  it('should get user friends names ', function() {
    expect(userRepo.getUserFriends(allUsers, user1.id)).to.deep.equal([
      'Jarvis Considine',
      'Herminia Witting',
      'Mae Connelly',
      'Erick Schaden'
    ])
  })
});