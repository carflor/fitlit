class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
  getUserAvgOuncesToday(allData, id, date) {
    const drinksPerDate = allData.filter(data => date = data.date)
    const drinksUser = drinksPerDate.find(data => id === data.userID)
    return drinksUser.numOunces
  }
  getUserAvgOuncesAllTime(allData, id) {
    const drinksUser = allData.filter(data => id === data.userID)
    const result = drinksUser.reduce((acc, drink) => {
      acc += drink.numOunces
      return acc
    }, 0) / drinksUser.length
    return result
  }
  getUserAvgOuncesPerWeek(allData, id, date) {
    const drinksUser = allData.filter(data => id === data.userID)
    var today = new Date(date)
    var todayFormat = today.toISOString().split('T')[0]
    var weekAgo = new Date().getDate() - 7
    console.log(today)
    console.log(todayFormat)
    console.log(weekAgo)
  }

}

getWeekOfFluidOunces(date) {
    const weeksHydroData = []
    const userHydroData = this.getUserHydrationData()
    const todaysH2O = userHydroData.find(hydration => hydration.date === date)
    const startIndex = userHydroData.indexOf(todaysH2O)
    for (var i = 1; i < 8; i++) {
        weeksHydroData.push(userHydroData[startIndex + i])
    }
    return weeksHydroData
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}