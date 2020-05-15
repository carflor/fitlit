class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getUserAvgSleepHours(allData, user) {
    const totalUserSleepHours = allData.filter(data => user.id === data.userID)
    const result = totalUserSleepHours.reduce((acc, sleep) => {
      acc += sleep.hoursSlept
      return acc
    }, 0) / totalUserSleepHours.length
    return result
  }

  getUserAvgSleepQuality(allData, user) {
    const totalUserSleepQuality = allData.filter(data => user.id === data.userID)
    const result = totalUserSleepQuality.reduce((acc, sleep) => {
      acc += sleep.sleepQuality
      return acc
    }, 0) / totalUserSleepQuality.length
  }

  getUserHoursSleptForDate(allData, user, date) {
    const userSleepData = allData.filter(data => user.id === data.userID)
    const userSleepDataForDate = userSleepData.find(data => data.date === date)
    return userSleepDataForDate.hoursSlept 
  }

  getUserSleepQualityForDate(allData, user, date) {
    const userSleepData = allData.filter(data => user.id === data.userID)
    const userSleepDataForDate = userSleepData.find(data => data.date === date)
    return userSleepDataForDate.sleepQuality
  }

  getAllUsersAvgSleepQuality(allData) {
    const allUsersAvg = allData.reduce((acc, sleep) => {
      acc += sleep.sleepQuality 
      return acc
    }, 0) / allData.length
    return allUsersAvg
  }

  getUserWeekSleepQuality(allData, user, date) {
    const weekSleep = []
    const userSleepData = allData.filter(data => user.id === data.userID)
    const todaysSleep = userSleepData.find(sleep => sleep.date === date)
    const index = userSleepData.indexOf(todaysSleep)
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
    for (let i = 0; i < 7; i++) {
      weekSleep.push(`${userSleepData[index - i].date}  : ${userSleepData[index - i].hoursSlept}`)
    } 
    return weekSleep
  }

  getAllUsersTopWeekSleepQuality(allData, date) {
    const weekArr = []
    const topWeekSleep = []
    const topSleepData = allData.filter(data => data.sleepQuality > 3)
    // NEEDS WORK HERE 
    
    const todaysSleep = topSleepData.find(sleep => sleep.date === date)
    const index = topSleepData.indexOf(todaysSleep)
    for (let i = 0; i < todaysSleep && i.date !== ; i++) {
      weekSleep.push()
    } 
    return weekSleep
  }
  
};

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}