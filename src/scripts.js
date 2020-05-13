'use strict';

let currentUser;
let userRepo;

console.log(userData);

function startApp() {
  const currentUserId = pickUser()
  userRepo = new UserRepo(userData)
  currentUser = new User(currentUserId)
  console.log(currentUser)
  displayUserData(currentUser)

  // instantiate the user
  // instantiate sleep / hydration / activity
  // display all data
}

function pickUser() {
  const id = userData[15]
  // fixed randomizer
  // const id = userData[Math.floor(Math.random() * 50)]
  return id
}

function displayUserData(user) {
  const userName = document.querySelector('.user-name')
  const userDate = document.querySelector('.title-date')
  const userAddress = document.querySelector('.user-address')
  const userEmail = document.querySelector('.user-email')
  const userStepGoal = document.querySelector('.user-step-goals')
  const allUsersStepGoals = document.querySelector('.all-users-step-goals')

  userName.innerText = user.name
  // create fn to calculate curr depending on data
  userDate.innerText = `Step Goal for Today: 06/15/2019`
  userAddress.innerText = user.address
  userEmail.innerText = user.email
  userStepGoal.innerText = `${user.dailyStepGoal} Steps`
  allUsersStepGoals.innerText = `${userRepo.calculateAvgStepGoalUsers()} Steps`
}

startApp()