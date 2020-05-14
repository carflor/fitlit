class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
 
  getUserAvgOuncesToday(allData, user, date) {
    const drinksPerDate = allData.filter(data => date === data.date)
    console.log('drinksper', drinksPerDate)
    console.log('id in fn', user)
    const drinksUser = drinksPerDate.find(data => data.userID === user.id)
    console.log('', drinksUser)
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
  
  getUserWeekHydration(allData, user, date) {
    const weekData = []
    const userHydrationData = allData.filter(data => user.id === data.userID)
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