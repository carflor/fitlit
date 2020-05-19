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
      {
        id: 2,
        name: 'Jarvis Considine',
        address: '30086 Kathryn Port, Ciceroland NE 07273',
        email: 'Dimitri.Bechtelar11@gmail.com',
        strideLength: 4.5,
        dailyStepGoal: 5000,
        friends: [ 9, 18, 24, 19 ]
      },
      {
        id: 3,
        name: 'Herminia Witting',
        address: '85823 Bosco Fork, East Oscarstad MI 85126-5660',
        email: 'Elwin.Tromp@yahoo.com',
        strideLength: 4.4,
        dailyStepGoal: 5000,
        friends: [ 19, 11, 42, 33 ]
      },
      {
        id: 4,
        name: 'Mae Connelly',
        address: '28926 Schinner Islands, Turnermouth NE 23720-3230',
        email: 'Marcos_Pollich@hotmail.com',
        strideLength: 3.1,
        dailyStepGoal: 4000,
        friends: [ 48, 7, 44, 8 ]
      },
      {
        id: 5,
        name: 'Erick Schaden',
        address: '514 Mayert Walk, Jordaneside SC 55023-6523',
        email: 'Vanessa_Gerhold@gmail.com',
        strideLength: 3.1,
        dailyStepGoal: 8000,
        friends: [ 13, 44, 49, 33, 10 ]
      }
    ])
  })
});