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
  getMilesByDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    const userMile = 5280 / user.strideLength
    const userDistance = dateEntry.numSteps / userMile
    return Number(userDistance.toFixed(2))
  }
  
  getUserStepsForDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.numSteps
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

  formatActivityDisplay(weeklyData) {
    const formattedWeek = weeklyData.map(data => {
      return ` ${data.date.slice(5, 10)} : Steps - ${data.numSteps}, Minutes Active - ${data.minutesActive}, Stairs - ${data.flightsOfStairs}`
    })
    return formattedWeek
  } 

  getUserWeekActivity(allData, user, date) {
    const userActivityData = allData.filter(data => user.id === data.userID)
    const todaysActivity = userActivityData.find(activity => activity.date === date)
    const dateIndex = userActivityData.indexOf(todaysActivity)
    let weekData = userActivityData.slice(dateIndex - 6, dateIndex + 1)
    return this.formatActivityDisplay(weekData)
  }

  // ALL USERS SECTION
  calculateAvgs(total, numUsers) {
    let keys = Object.keys(total)
    return keys.map(key => Math.floor(total[key] / numUsers))
  }

  getAllUsersAvgData(allData, date) {
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

  formatFriendRankings(friendsSort) {
    const ranking = friendsSort.map(friend => {
      return `<br>${friend.name}
      <br>Total Steps: ${friend.numSteps}`
    })
    return ranking
  }

  getFriendsStats(allData, user, date, allUsersArray) {
    const dateData = allData.filter(data => data.date === date)
    const friendCrew = dateData.filter(currentUser => user.friends.includes(currentUser.userID) || user.id === currentUser.userID)
    const match = friendCrew.reduce((acc, friend) => {
      allUsersArray.forEach(singleUser => {
        if (singleUser.id === friend.userID) {
          let friendWithName = {
            name: singleUser.name,
            numSteps: friend.numSteps,
          }
          acc.push(friendWithName)
        }
      })
      return acc
    }, [])
    const sorted = match.sort((a, b) => b.numSteps - a.numSteps)
    return this.formatFriendRankings(sorted)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}