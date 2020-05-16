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

  getAllUsersAvgSleepQuality(allData) {
    const allUsersAvg = allData.reduce((acc, sleep) => {
      acc += sleep.sleepQuality 
      return acc
    }, 0) / allData.length
    return Math.floor(allUsersAvg)
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

  getBestUsersSleepQualityByDate(allData, date) {
const sleepByID = Object.keys(this.dataPerUser)
// console.log(sleepByID)
const result = sleepByID.reduce((acc, user) => {
console.log(this.dataPerUser[user], 'dataPerUser[user]')
// console.log(sleepByID,'sleepbyID')
const finder = this.dataPerUser[user].find(user => user.date = date)
const dateIndex = this.dataPerUser[user].indexOf(finder)
console.log(finder, 'finder')
console.log(dateIndex,'dateIndex')
  return acc
}, [])
// Find the date that matches 'this.dataPerUser[date] in the array
// get the index of the item with matching date^ 
// .slice this return down to 7 days
//     const weekArr = []
//     const topWeekSleep = []
//     const topSleepData = allData.filter(data => data.sleepQuality > 3)
//     // NEEDS WORK HERE 
    
//     const todaysSleep = topSleepData.find(sleep => sleep.date === date)
//     const index = topSleepData.indexOf(todaysSleep)
//     for (let i = 0; i < todaysSleep && i.date !==; i++) {
//       weekSleep.push()
//     } 
//     return weekSleep
//   }
  
  }

}
if (typeof module !== 'undefined') {
  module.exports = Sleep;
}