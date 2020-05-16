class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.dataPerUser = this.grabDataPerUser()
  }

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
    const userMile = 5280/user.strideLength
    const userDistance = dateEntry.numSteps/userMile
    return Number(userDistance.toFixed(2))
  }


  


}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}