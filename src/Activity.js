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

  
  


}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}