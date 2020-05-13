let currentUser;
let userRepo;

console.log(userData);

function startApp() {
  const currentUserId = pickUser()
  userRepo = new UserRepo(userData)
  currentUser = new User(currentUserId)
  console.log(currentUser)
  displayUserData(currentUser)

  // grab number from randomizer user
  // instantiate userRepo
  // instantiate the user
  // instantiate sleep / hydration / activity
  // display all data
}

function pickUser() {
  const id = userData[0]
  // fixed randomizer
  // const id = userData[Math.floor(Math.random() * 50)]
  return id
}

function displayUserData(user) {
  const userName = document.querySelector('.user-name')
  const userDate = document.querySelector('.date')
  const userAddress = document.querySelector('.user-address')
  const userEmail = document.querySelector('.user-email')
  const userStepGoal = document.querySelector('.user-step-goals')

  userName.innerText = user.name
  // create fn to calculate curr depending on data
  userDate.innerText = '06/15/2019'
  userAddress.innerText = user.address
  userEmail.innerText = user.email
  userStepGoal.innerText = user.dailyStepGoal
}

startApp()