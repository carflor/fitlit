const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const userTestData = require('../test/test-data');

describe('User', function () {
  let user, user1;
    
  beforeEach(function() {
    user1 = userTestData[0]
    user = new User(user1)
  })

  it('should be a function', function() {
    expect(User).to.be.a('function')
  })

  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceOf(User)
  })

  it('Should have a property of ID', function () {
    expect(user.id).to.equal(1)
  })

  it('should have a property of name', function () {
    expect(user.name).to.equal("Luisa Hane")
  })

  it('should have a property of address', function () {
    expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697")
  })

  it('should have a property of email', function () {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com")
  })

  it('should have a property of stride length', function () {
    expect(user.strideLength).to.equal(4.3)
  })

  it('should have a property of daily step goal', function () {
    expect(user.dailyStepGoal).to.equal(10000)
  })

  it('should have a property of friends', function () {
    expect(user.friends).to.deep.equal([2, 4, 3])
  })

  it('should only show the first name', function() {
    expect(user.showFirstName()).to.equal('Luisa')
  })
});