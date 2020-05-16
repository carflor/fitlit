class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
    this.dataPerUser = this.grabDataPerUser()
  }
    
  grabDataPerUser() {
    let result = this.sleepData.reduce((acc, sleep) => {
      if (!acc[sleep.userID]) {
        acc[sleep.userID] = []
      }
      acc[sleep.userID].push(sleep)
      return acc
    }, {})
    return result
  }

  // SINGLE USER SECTION

  getUserAvgSleepHours(allData, user) {
    const totalUserSleepHours = allData.filter(data => user.id === data.userID)
    const result = totalUserSleepHours.reduce((acc, sleep) => {
      acc += sleep.hoursSlept
      return acc
    }, 0) / totalUserSleepHours.length
    return Math.floor(result)
  }

  getUserAvgSleepQuality(allData, user) {
    const totalUserSleepQuality = allData.filter(data => user.id === data.userID)
    const result = totalUserSleepQuality.reduce((acc, sleep) => {
      acc += sleep.sleepQuality
      return acc
    }, 0) / totalUserSleepQuality.length
    return Math.floor(result)
  }

  getUserHoursSleptForDate(allData, user, date) {
    const userSleepData = allData.filter(data => user.id === data.userID)
    const userSleepDataForDate = userSleepData.find(data => data.date === date)
    return userSleepDataForDate.hoursSlept 
  }

  getUserSleepQualityForDate(allData, user, date) {
    const userSleepData = allData.filter(data => user.id === data.userID)
    const userSleepDataForDate = userSleepData.find(data => data.date === date)
    return Math.floor(userSleepDataForDate.sleepQuality)
  }

  getUserWeekSleepQuality(allData, user, date) {
    const weekSleep = []
    const userSleepData = allData.filter(data => user.id === data.userID)
    const todaysSleep = userSleepData.find(sleep => sleep.date === date)
    const index = userSleepData.indexOf(todaysSleep)
    // maybe use slice instead of damn for loop
    for (let i = 0; i < 7; i++) {
      weekSleep.push(`${userSleepData[index - i].date}  : ${userSleepData[index - i].sleepQuality}/5`)
    } 
    return weekSleep
  }

  getUserWeekHoursSlept(allData, user, date) {
    const weekSleep = []
    const userSleepData = allData.filter(data => user.id === data.userID)
    const todaysSleep = userSleepData.find(sleep => sleep.date === date)
    const index = userSleepData.indexOf(todaysSleep)
    // maybe use slice instead of damn for loop
    for (let i = 0; i < 7; i++) {
      weekSleep.push(`${userSleepData[index - i].date}  : ${userSleepData[index - i].hoursSlept}`)
    }
    return weekSleep
  }

  // ALL USERS METHODS 

  getAllUsersAvgSleepQuality(allData) {
    const allUsersAvg = allData.reduce((acc, sleep) => {
      acc += sleep.sleepQuality 
      return acc
    }, 0) / allData.length
    return Math.floor(allUsersAvg)
  }

  getBestUsersSleepQualityByDate(date) {
    const sleepByID = Object.keys(this.dataPerUser)
    const result = sleepByID.reduce((acc, user) => {
      const finder = this.dataPerUser[user].find(user => user.date === date)
      const dateIndex = this.dataPerUser[user].indexOf(finder)
      let weekData = this.dataPerUser[user].slice(dateIndex - 6, dateIndex + 1)
      const bestSleepers = this.getAllUsersAvgSleepQuality(weekData)
      if (bestSleepers > 3) {
        acc.push(this.dataPerUser[user][0].userID)
      }
      return acc
    }, [])
    return result
  }

  getUsersMostHoursSleptPerDate(allData, date) {
    const datedData = allData.filter(sleep => sleep.date === date)
    const sorted = datedData.sort((a, b) => b.hoursSlept - a.hoursSlept)[0]
    const filtered = datedData.filter(sleep => sleep.hoursSlept === sorted.hoursSlept)
    return filtered
  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}