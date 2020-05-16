class Sleep {
  constructor(sleepData) {
      this.sleepData = sleepData;
  }
  // SINGLE USER SECTION
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

  // ALL USERS SECTIONS
  getAllUsersSleepQualityAbove3(allData, date) {
    1) use this.getUserWeekSleepQuality to grab a weeks worth of sleep quality
    2) calulate the avg of sleep quality depending on userSleepData[index - i].sleepQuality
    per user 





    const avgOver3 = []
    // const topWeekSleep = []

    const reduction = allData.reduce((acc, datum) => {
      const day = datum
      return acc
    }, [])


    // const topSleepData = allData.filter(data => data.sleepQuality > 3)


    // make an arr of the last seven days
    // for loop over topSleepData 7 times
    // in topSleepData find the date that matches DATE 
    // unshift that match.date into weekArr
    // do the same
    // if match.date === weekArry[0].date

    const todaysSleep = topSleepData.find(sleep => sleep.date === date)
    const index = topSleepData.indexOf(todaysSleep)
    for (let i = 0; i < todaysSleep && i.date !==; i++) {
      weekSleep.push()
    } 
    return weekSleep
  }
  
};

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}