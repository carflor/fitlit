const userData = require('../data/users.js')

class UserRepo {
  constructor(data) {
    this.data = data;
  }

  selectedUser() {
    return this.data.filter(datum => datum.id === currentUserId)
  }

  avgStepGoalUsers() {
    return this.data.reduce((acc, datum) => {
      (acc += datum.dailyStepGoal)/this.data.length
      return acc
    }, 0)
  }

};

module.exports = UserRepo;