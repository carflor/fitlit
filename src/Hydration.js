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
  
  getUserWeekHydration(allData, id, date) {
    const weekData = []
    const userHydrationData = allData.filter(data => id === data.userID)
    const todaysWater = userHydrationData.find(hydration => hydration.date === date)
    const index = userHydrationData.indexOf(todaysWater)
    for (let i = 0; i < 7; i++) {
      weekData.push(userHydrationData[index - i])
    } 
    return weekData
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}