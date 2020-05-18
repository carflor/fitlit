'use strict';

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;

function startApp() {
  const today = '2019/06/29'
  const currentUser = new User(pickUser())
  userRepo = new UserRepo(userData)
  hydrationRepo = new Hydration(hydrationData)
  sleepRepo = new Sleep(sleepData)
  activityRepo = new Activity(activityData)
  displayUserData(currentUser, today)
  displayUserHydrationData(hydrationData, currentUser, today)
  displayUserSleepData(sleepData, currentUser, today)
  displayUserActivityData(activityData, currentUser, today)

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
  const allUsersStepGoals = document.querySelector('.all-users-step-goals')

  userName.innerText = user.name
  userDate.innerText = `Step Goal for Today: ${date}`
  userAddress.innerText = user.address
  userEmail.innerText = user.email
  userStepGoal.innerText = `${user.dailyStepGoal} Steps`
  allUsersStepGoals.innerText = `${userRepo.calculateAvgStepGoalUsers()} Steps`
}

function displayUserHydrationData(data, user, date) {
  const userHydrationToday = document.querySelector('.user-hydration-today')
  const userHydrationWeek = document.querySelector('.user-hydration-week')

  userHydrationToday.innerText = `Ounces drank today: ${hydrationRepo.getUserAvgOuncesToday(data, user, date)}`
  userHydrationWeek.insertAdjacentHTML('afterbegin', `Ounces drank this week: ${fixWeekHydrationDisplay(hydrationRepo.getUserWeekHydration(data, user, date))}`)
}

function fixWeekHydrationDisplay(arr) {
  const fixedArr = []
  // CHANGE THIS FOR LOOP!!
  for (let i = 0; i < arr.length; i++) {
    fixedArr.push(arr[i].toString().split('').slice(5).join(''))
  }
  return fixedArr.toString().split(',').join(', ')
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
  
  userGoalAchievement.insertAdjacentHTML('afterbegin', `${activityRepo.getUserStepGoalAchievement(activityData, currentUser, today)}`)
  userNumberStepsToday.insertAdjacentHTML('afterbegin', `Steps Today: ${activityRepo.getUserStepsForDate(activityData, currentUser, today)}`)
  userMinutesActiveToday.insertAdjacentHTML('afterbegin', `Minutes Active Today: ${activityRepo.getUserMinutesActive(activityData, currentUser, today)}`)
  userFlightsOfStairs.insertAdjacentHTML('afterbegin', `Flights of Stairs Today: ${activityRepo.getUserFlightsOfStairs(activityData, currentUser, today)}`)
  displayUserMilesWalked.insertAdjacentHTML('afterbegin', `Miles walked today: ${activityRepo.getMilesByDate(activityData, currentUser, today)}`)
  allUsersWeekAvg.insertAdjacentHTML('afterbegin', `All users weekly stats: Number of Steps - ${activityRepo.getAllUsersAvgData(activityData, today)[0]}, Minutes Active - ${activityRepo.getAllUsersAvgData(activityData, today)[1]}, Flights of Stairs - ${activityRepo.getAllUsersAvgData(activityData, today)[2]}`)
  currentStairRecord.insertAdjacentHTML('afterbegin', `Current Stair Record: ${activityRepo.bestStairClimberEver(activityData)}`)
}

startApp();