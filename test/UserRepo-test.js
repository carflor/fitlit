const chai = require('chai');
const expect = chai.expect;
const UserRepo = require('../src/UserRepo');
const User = require('../src/User');
// const testData = require('../test/test-data.js');

describe('UserRepo', function() {
  let user1, user2, userRepo, allUsers;

  beforeEach(function() {
    // allUsers = new UserRepo(userTestData);
    user1 = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        2,
        4,
        3
      ]
    })
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    })
    allUsers = [user1, user2]
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
    expect(userRepo.selectedUser(2)).to.equal(user2);
  })

  it('should calculate average step goal for all users', function() {
    expect(userRepo.calculateAvgStepGoalUsers()).to.equal(7500);
  })
})