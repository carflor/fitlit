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
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}