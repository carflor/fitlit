class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.dataPerUser = this.grabDataPerUser()
  }

  grabDataPerUser() {
    let result = this.activityData.reduce((acc, activity) => {
      if (!acc[activity.userID]) {
        acc[activity.userID] = []
      }
      acc[activity.userID].push(activity)
      return acc
    }, {})
    return result
  }

  // SINGLE USER SECTION

  getMilesByDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    const userMile = 5280/user.strideLength
    const userDistance = dateEntry.numSteps/userMile
    return Number(userDistance.toFixed(2))
  }

  getUserMinutesActive(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.minutesActive
  }

  getUserAvgMinActiveByWeek(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const finder = filtered.find(data => data.date === date)
    const index = filtered.indexOf(finder)
    const weekData = filtered.slice(index - 6, index + 1)
    const avgMinActive = weekData.reduce((acc, data) => {
      acc += data.minutesActive
      return acc
    }, 0) / weekData.length
    return Math.floor(avgMinActive)
  }

  getUserStepGoalAchievement(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const finder = filtered.find(data => data.date === date)
    if (finder.numSteps < user.dailyStepGoal) {
      return `Epic Fail. You did not meet your step goal!`
    } else {
      return `Nice job! You completed your step goal for today!`
    }
  }
  


}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}