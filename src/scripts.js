'use strict';

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;

function startApp() {
  const today = '2019/09/22'
  const currentUser = new User(pickUser())
  userRepo = new UserRepo(userData)
  hydrationRepo = new Hydration(hydrationData)
  sleepRepo = new Sleep(sleepData)
  activityRepo = new Activity(activityData)
  displayUserData(currentUser, today)
  displayUserHydrationData(hydrationData, currentUser, today)
  displayUserSleepData(sleepData, currentUser, today)
  displayUserActivityData(activityData, currentUser, today)
  displayFriendsData(activityData, currentUser, today, userData)

}

function pickUser() {
  const id = userData[15]
  // const id = userData[Math.floor(Math.random() * 50)]
  return id
}

function displayUserData(user, date) {
  const userName = document.querySelector('.user-name')
  const userDate = document.querySelector('.title-date')
  const userAddress = document.querySelector('.user-address')
  const userEmail = document.querySelector('.user-email')
  const userStepGoal = document.querySelector('.user-step-goals')
  const avgAllUsers = document.querySelector('.avg-all-Users')

  userName.innerText = user.name
  userDate.innerText = `Step Goal for Today ${date}`
  userAddress.innerText = user.address
  userEmail.innerText = user.email
  userStepGoal.innerText = `${user.dailyStepGoal} Steps`
  avgAllUsers.insertAdjacentHTML('afterbegin', `Average User Goal ${userRepo.calculateAvgStepGoalUsers()} Steps`)
}

function displayUserHydrationData(data, user, date) {
  const userHydrationToday = document.querySelector('.user-hydration-today')
  const userHydrationWeek = document.querySelector('.user-hydration-week')
  const userAvgHydration = document.querySelector('.user-avg-hydration')

  userHydrationToday.innerText = `Hydration today: ${hydrationRepo.getUserAvgOuncesToday(data, user, date)} ounces`
  userHydrationWeek.insertAdjacentHTML('afterbegin', `Ounces drank this week: ${hydrationRepo.getUserWeekHydration(data, user, date)}`)
  userAvgHydration.insertAdjacentHTML('afterbegin', `Average hydration: ${hydrationRepo.getUserAvgOuncesAllTime(data, user, date)} ounces`)
}

function displayUserSleepData(data, user, date) {
  const userSleepHoursToday = document.querySelector('.user-hours-slept-today')
  const userSleepQualityToday = document.querySelector('.user-sleep-quality-today')
  const userWeekHoursSlept = document.querySelector('.user-week-hours-slept')
  const userWeekSleepQuality = document.querySelector('.user-week-sleep-quality')
  const userAvgHoursSlept = document.querySelector('.user-hours-slept-avg')
  const userAvgSleepQuality = document.querySelector('.user-sleep-quality-avg')
  const worstSleptToday = document.querySelector('.worst-slept-today')

  userSleepHoursToday.insertAdjacentHTML('afterbegin', `Hours Slept Today: ${sleepRepo.getUserHoursSleptForDate(data, user, date)}`)
  userSleepQualityToday.insertAdjacentHTML('afterbegin', `Sleep Quality Rating Today: ${sleepRepo.getUserSleepQualityForDate(data, user, date)}/5`)
  userWeekHoursSlept.insertAdjacentHTML('afterbegin', `Hours Slept Per Day This Week: ${sleepRepo.getUserWeekHoursSlept(data, user, date)}`)
  userWeekSleepQuality.insertAdjacentHTML('afterbegin', `Sleep Rating Per Day This Week: ${sleepRepo.getUserWeekSleepQuality(data, user, date)}/5`)
  userAvgHoursSlept.insertAdjacentHTML('afterbegin', `Avg Sleep Time: ${sleepRepo.getUserAvgSleepHours(data, user)} Hours`)
  userAvgSleepQuality.insertAdjacentHTML('afterbegin', `Avg Sleep Rating: ${sleepRepo.getUserAvgSleepQuality(data, user)}/5`)
  worstSleptToday.insertAdjacentHTML('afterbegin', `Worst Slept Today: ${sleepRepo.getWorstSleptPerDate(data, user, date)} hours`)
}

function displayUserActivityData(activityData, currentUser, today) {
  const userNumberStepsToday = document.querySelector('.user-number-steps-today')
  const userMinutesActiveToday = document.querySelector('.user-minutes-active-today')
  const userFlightsOfStairs = document.querySelector('.user-flights-stairs')
  const displayUserMilesWalked = document.querySelector('.display-user-miles-walked')
  const userGoalAchievement = document.querySelector('.user-goal-achievement')
  const allUsersWeekAvg = document.querySelector('.all-users-week-avg')
  const currentStairRecord = document.querySelector('.current-stair-record')
  const userWeekStats = document.querySelector('.user-week-stats')
  
  userGoalAchievement.insertAdjacentHTML('afterbegin', `${activityRepo.getUserStepGoalAchievement(activityData, currentUser, today)}`)
  userNumberStepsToday.insertAdjacentHTML('afterbegin', `Steps Today: ${activityRepo.getUserStepsForDate(activityData, currentUser, today)}`)
  userMinutesActiveToday.insertAdjacentHTML('afterbegin', `Minutes Active Today: ${activityRepo.getUserMinutesActive(activityData, currentUser, today)}`)
  userFlightsOfStairs.insertAdjacentHTML('afterbegin', `Flights of Stairs Today: ${activityRepo.getUserFlightsOfStairs(activityData, currentUser, today)}`)
  displayUserMilesWalked.insertAdjacentHTML('afterbegin', `Miles walked today: ${activityRepo.getMilesByDate(activityData, currentUser, today)}`)
  userWeekStats.insertAdjacentHTML('afterbegin', `User Weekly Stats:${activityRepo.getUserWeekActivity(activityData, currentUser, today)}`)
  allUsersWeekAvg.insertAdjacentHTML('afterbegin', `All users weekly stats:<br> Number of Steps - ${activityRepo.getAllUsersAvgData(activityData, today)[0]},<br> Minutes Active - ${activityRepo.getAllUsersAvgData(activityData, today)[1]},<br> Flights of Stairs - ${activityRepo.getAllUsersAvgData(activityData, today)[2]}`)
  currentStairRecord.insertAdjacentHTML('afterbegin', `Current Stair Record: ${activityRepo.bestStairClimberEver(activityData)}`)
}

function displayFriendsData(activityData, currentUser, today, users) {
  const friendRank = activityRepo.getFriendsStats(activityData, currentUser, today, users)
  const firstRanking = document.querySelector('.first-ranking')
  const secondRanking = document.querySelector('.second-ranking')
  const thirdRanking = document.querySelector('.third-ranking')
  const fourthRanking = document.querySelector('.fourth-ranking')
  const fifthRanking = document.querySelector('.fifth-ranking')

  firstRanking.insertAdjacentHTML('afterbegin', `FIRST PLACE ${friendRank[0]}`)
  secondRanking.insertAdjacentHTML('afterbegin', `SECOND PLACE ${friendRank[1]}`)
  thirdRanking.insertAdjacentHTML('afterbegin', `THIRD PLACE ${friendRank[2]}`)

  if (friendRank[3] !== undefined) {
    fourthRanking.insertAdjacentHTML('afterbegin', `FOURTH PLACE ${friendRank[3]}`)
  } else {
    return 
  }

  if (friendRank[4] !== undefined) {
    fifthRanking.insertAdjacentHTML('afterbegin', `FIFTH PLACE ${friendRank[4]}`)
  } else {
    return
  }
}

startApp();