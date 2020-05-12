const userData = require('../data/users.js')

class UserRepo {
  constructor(allUsers) {
    this.data = allUsers;
  }

  selectedUser(currentUserId) {
    // currentUserId needs to be built in dom
    return this.allUsers.filter(user => user.id === currentUserId)
  }

  avgStepGoalUsers() {
    return this.allUsers.reduce((acc, user) => {
      (acc += user.dailyStepGoal) / this.allUsers.length
      return acc
    }, 0)
  }
};

module.exports = UserRepo;