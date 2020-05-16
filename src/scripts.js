'use strict';

let currentUser;
let userRepo;
let hydrationRepo;
let sleepRepo;

function startApp() {
  const today = '2019/06/29'
  currentUser = new User(pickUser())
  userRepo = new UserRepo(userData)
  hydrationRepo = new Hydration(hydrationData)
  sleepRepo = new Sleep(sleepData)
  displayUserData(currentUser, today)
  displayUserHydrationData(hydrationData, currentUser, today)
  displayUserSleepData(sleepData, currentUser, today)
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
  // console.log('hydro data', data)
  const userHydrationToday = document.querySelector('.user-hydration-today')
  const userHydrationWeek = document.querySelector('.user-hydration-week')

  userHydrationToday.innerText = `Ounces drank today: ${hydrationRepo.getUserAvgOuncesToday(data, user, date)}`
  // console.log(hydrationRepo.getUserWeekHydration(data, user, date))
  userHydrationWeek.insertAdjacentHTML('afterBegin', `Ounces drank this week: ${fixWeekHydrationDisplay(hydrationRepo.getUserWeekHydration(data, user, date))}`)
}

function fixWeekHydrationDisplay(arr) {
  const fixedArr = []
  for (let i = 0; i < arr.length; i++) {
    fixedArr.push(arr[i].toString().split('').slice(5).join(''))
  }
  return fixedArr.toString().split(',').join(', ')
}

function displayUserSleepData(data, user, date) {
  console.log(data)
  // STEP 3
  // For a user, their all-time average sleep quality
  // for a user, all-time average number of hours slept
  const userSleepHoursToday = document.querySelector('.user-hours-slept-today')
  const userSleepQualityToday = document.querySelector('.user-sleep-quality-today')
  const userWeekHoursSlept = document.querySelector('.user-week-hours-slept')
  const userWeekSleepQuality = document.querySelector('.user-week-sleep-quality')
  const userAvgHoursSlept = document.querySelector('.user-hours-slept-avg')
  const userAvgSleepQuality = document.querySelector('.user-sleep-quality-avg')

  userSleepHoursToday.insertAdjacentHTML('afterBegin', `Hours Slept Today: ${sleepRepo.getUserHoursSleptForDate(data, user, date)}`)
  userSleepQualityToday.insertAdjacentHTML('afterBegin', `Sleep Quality Rating Today: ${sleepRepo.getUserSleepQualityForDate(data, user, date)}/5`)
  userWeekHoursSlept.insertAdjacentHTML('afterBegin', `Hours Slept Per Day This Week: ${sleepRepo.getUserWeekHoursSlept(data, user, date)}`)
  userWeekSleepQuality.insertAdjacentHTML('afterBegin', `Sleep Rating Per Day This Week: ${sleepRepo.getUserWeekSleepQuality(data, user, date)}`)
  userAvgHoursSlept.insertAdjacentHTML('afterBegin', `Avg Sleep Time: ${sleepRepo.getUserAvgSleepHours(data, user)}`)
  userAvgSleepQuality.insertAdjacentHTML('afterBegin', `Avg Sleep Rating: ${sleepRepo.getUserAvgSleepQuality(data, user)}`)
}

startApp();