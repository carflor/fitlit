class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
 
  getUserAvgOuncesToday(allData, user, date) {
    const drinksPerDate = allData.filter(data => date === data.date)
    const drinksUser = drinksPerDate.find(data => data.userID === user.id)
    return drinksUser.numOunces
  }

  getUserAvgOuncesAllTime(allData, user) {
    const drinksUser = allData.filter(data => user.id === data.userID)
    const result = drinksUser.reduce((acc, drink) => {
      acc += drink.numOunces
      return acc
    }, 0) / drinksUser.length
    return result
  }
  
  formatHydrationDisplay(weeklyData) {
    const formattedWeek = weeklyData.map(data => {
      // data.date.slice(0, 5)
      return ` ${data.date.slice(5, 10)} : ${data.numOunces}`
    })
    return formattedWeek
  } 

  getUserWeekHydration(allData, user, date) {
    const userHydrationData = allData.filter(data => user.id === data.userID)
    const todaysWater = userHydrationData.find(hydration => hydration.date === date)
    const dateIndex = userHydrationData.indexOf(todaysWater)
    const weekData = userHydrationData.slice(dateIndex - 6, dateIndex + 1)
    return this.formatHydrationDisplay(weekData)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}