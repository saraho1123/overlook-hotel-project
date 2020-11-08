// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/desert-highway.png'
import './images/desert-magic.png'
import './images/desert-pool.png'
import './images/desert-wisdom.png'
import './images/great-people-great-place.png'
import './images/hotel-room.jpg'
import './images/san-juan-dawn.png'
import './images/san-juan-day.png'
import './images/san-juan-evening.png'
import './images/snake-house-for-overlook.png'
import Guest from './Guest';
import Manager from './Manager';

// GLOBALS
let guest;
let manager;
let userData;
let bookingData;
let roomData;

// Query Selectors

// inputs
const userLogin = document.querySelector('.user-login');
const userPassword = document.querySelector('.user-password');

// buttons
const loginButton = document.querySelector('.submit-login');

// page views
const loginView = document.querySelector('.login-view');
const navSection = document.querySelector('.nav-buttons-section');
const guestHomeView = document.querySelector('.guest-home-view');

// other elements
const headingGuestName = document.querySelector('.heading-name');

// Event Listeners
window.addEventListener('keyup', validateUserLogin);
loginButton.addEventListener('click', showHomeView);

console.log('Time to really rock this project!');

function enableSubmitButton() {
  loginButton.classList.remove('disable-style');
  loginButton.disabled = false;
}
function validateUserLogin() {
  console.log('It works!');
  if (userLogin.value === 'customer01' && userPassword.value === 'Overlook2020') {
    enableSubmitButton();
  } else if (userLogin.value === 'manager' && userPassword.value === 'Overlook2020') {
    enableSubmitButton();
  }
}

function showHomeView() {
  if (userLogin.value === 'manager') {
    enableManagerView();
    manager = new Manager(usersData, roomsData, bookingsData);
  } else {
    guest = new Guest(usersData, roomsData, bookingsData);
    enableGuestHomeView();
  }
}



function enableGuestHomeView() {
  loginView.classList.add('hidden');
  navSection.classList.remove('hidden');
  guestHomeView.classList.remove('hidden');
  headingGuestName.value = '${user.name}'
}

function enableManagerView() {
  loginView.classList.add('hidden');
  managerView.classList.remove('hidden');
}

// validateUserPassword() {
  // loginView.classList.add('hidden');
  //   navSection.classList.remove('hidden');
    // guestHomeView.classList.remove('hidden');

// }
/*

l

let manager = new Manager(userData, roomData, bookingData)
let loggedInGuest = manager.selectGuest("id", 01) // id will need to come from login userName
let guestBookings = manager.getSelectedGuestBookings()

GUEST LOGIN
let guest = new Guest(userData, roomData, bookingData);
let currentGuest = guest.selectGuest("id", 01) // id will need to come from login userName
// display name right away
let currentGuestBookings = guest.getSelectedGuestBookings() // display right away

MANAGER LOGIN
let manager = new Manager(userData, roomData, bookingData)



*/

/*
fetch all data on login?


LOGIN
if customerUserName && password match
then fetch
and
instantiate either manager or guest
*/
