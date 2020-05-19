class UserRepo {
  constructor(allUsers) {
    this.allUsers = allUsers;
  }

  selectedUser(currentUserId) {
    return this.allUsers.find(user => currentUserId === user.id)
  }

  calculateAvgStepGoalUsers() {
    const totalStepGoal = this.allUsers.reduce((acc, user) => {
      (acc += user.dailyStepGoal) 
      return acc
    }, 0)
    return totalStepGoal / this.allUsers.length
  }
  
  getUserFriends(allUsers, currentUserId) {
    const currentUser = allUsers.find(user => currentUserId === user.id)
    const userFriends = allUsers.reduce((acc, user) => {
      currentUser.friends.forEach(friend => {
        if (user.id === friend) {
          acc.push(user.name)
        }
      })
      return acc
    }, [])
    return userFriends
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}