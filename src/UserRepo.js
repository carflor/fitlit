const userData = require('../data/users.js')

class UserRepo {
  constructor(allUsers) {
    this.allUsers = allUsers;
  }

  selectedUser(currentUserId) {
    // currentUserId needs to be built in dom
    return this.allUsers.find(user => currentUserId === user.id)
  }

  calculateAvgStepGoalUsers() {
    const totalStepGoal = this.allUsers.reduce((acc, user) => {
      (acc += user.dailyStepGoal) 
      return acc
    }, 0)
    return totalStepGoal / this.allUsers.length
  }
};

module.exports = UserRepo;