'use strict';

let currentUser;
let userRepo;
let hydrationRepo;

console.log('user data', userData);
console.log('hydro data', hydrationData)

function startApp() {
  const today = '2019/06/29'
  const currentUser = new User(pickUser())
  userRepo = new UserRepo(userData)
  // currentUser = new User(currentUserId)
  hydrationRepo = new Hydration(hydrationData)
  console.log('currentUser', currentUser)
  console.log('currentUserId', currentUser)
  displayUserData(currentUser, today)

  displayUserHydrationData(hydrationData, currentUser, today)
}

function pickUser() {
  const id = userData[15]
  // const id = userData[Math.floor(Math.random() * 50)]
  return id
}

function displayUserData(user, date) {
  console.log('user in display fn', user)
  const userName = document.querySelector('.user-name')
  const userDate = document.querySelector('.title-date')
  const userAddress = document.querySelector('.user-address')
  const userEmail = document.querySelector('.user-email')
  const userStepGoal = document.querySelector('.user-step-goals')
  const allUsersStepGoals = document.querySelector('.all-users-step-goals')

  userName.innerText = user.name
  // create fn to calculate curr depending on data
  userDate.innerText = `Step Goal for Today: ${date}`
  userAddress.innerText = user.address
  userEmail.innerText = user.email
  userStepGoal.innerText = `${user.dailyStepGoal} Steps`
  allUsersStepGoals.innerText = `${userRepo.calculateAvgStepGoalUsers()} Steps`
}

function displayUserHydrationData(data, user, date) {
  const userHydrationToday = document.querySelector('.user-hydration-today')
  const userHydrationWeek = document.querySelector('.user-hydration-week')
  console.log('user in fn', user)
  userHydrationToday.innerText = `Ounces drank today: ${hydrationRepo.getUserAvgOuncesToday(data, user, date)}`
  console.log(hydrationRepo.getUserWeekHydration(data, user, date))
  userHydrationWeek.insertAdjacentHTML('afterBegin', `Ounces drank this week: ${hydrationRepo.getUserWeekHydration(data, user, date)}`)

}

startApp()