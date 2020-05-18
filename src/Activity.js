class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.dataPerUser = this.grabDataPerUser()
  }

  // This is useless!
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
  getUserStepsForDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.numSteps
  }

  getMilesByDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    const userMile = 5280 / user.strideLength
    const userDistance = dateEntry.numSteps / userMile
    return Number(userDistance.toFixed(2))
  }

  getUserMinutesActive(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.minutesActive
  }

  getUserFlightsOfStairs(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.flightsOfStairs
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
  
  getUserStepGoalWins(allData, user) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateWins = filtered.filter(data => data.numSteps > user.dailyStepGoal).map(data => {
      return data.date
    })
    return dateWins
  }

  getUserStairRecord(allData, user) {
    const filtered = allData.filter(data => data.userID === user.id)
    const sorted = filtered.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0]
    return sorted.flightsOfStairs
    // does this require the date to be displayed for the record?
  }

  // ALL USERS SECTION
  calculateAvgs(total, numUsers) {
    let keys = Object.keys(total)
    return keys.map(key => Math.floor(total[key] / numUsers))
  }

  getAllUserAvgData(allData, date) {
    const dateData = allData.filter(data => data.date === date)
    const userTotal = dateData.reduce((acc, user) => {
      acc.numSteps += user.numSteps
      acc.minutesActive += user.minutesActive
      acc.flightsOfStairs += user.flightsOfStairs
      return acc
    }, {
      'numSteps': 0,
      'minutesActive': 0,
      'flightsOfStairs': 0
    })
    return this.calculateAvgs(userTotal, dateData.length)
  }

  bestStairClimberEver(allData) {
    let sorted = allData.sort((a, b) => (b.flightsOfStairs - a.flightsOfStairs))[0]
    return sorted.flightsOfStairs
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}