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
import APIRequests from './Fetch';

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
const managerView = document.querySelector('.manager-view');

// other elements
const headingGuestName = document.querySelector('.heading-name');
const loginAlert = document.querySelector('.login-alert');
// const headingName = document.querySelector('.heading-name');
// const spentName = document.querySelector('.spent-name');
// const spentAmout = document.querySelector('.spent-amount');

// Event Listeners
window.addEventListener('keyup', allowWrongLoginAlerts);
loginButton.addEventListener('click', validateUserLogin);

// GLOBALS
const apiRequests = new APIRequests();

const retrievedUserData = apiRequests.fetchData('users/users', 'users');
const retrievedBookingData = apiRequests.fetchData('bookings/bookings', 'bookings');
const retrievedRoomData = apiRequests.fetchData('rooms/rooms', 'rooms');
/*
leave off 2nd .then in POST and DELETE
can put a .then when I call those methods in index.js
*/

/*
query selectors stay here
put innerHTML, etc in DOM updates file.
leave add/remove hidden's in here
*/

let guest;
let manager;
let usersData;
let bookingsData;
let roomsData;

Promise.all([retrievedUserData, retrievedBookingData, retrievedRoomData])
  .then(value => {
    usersData = value[0];
    bookingsData = value[1];
    roomsData = value[2];
  })

console.log('Time to really rock this project!');

function enableSubmitButton() {
  loginButton.classList.remove('disable-style');
  loginButton.disabled = false;
}

function disableSubmitButton() {
  loginButton.classList.add('disable-style');
  loginButton.disabled = true;
}

function allowWrongLoginAlerts() {
  if (userLogin.value !== ('') && userPassword.value !== ('')) {
    enableSubmitButton();
    loginAlert.innerHTML = '';
  } else {
    disableSubmitButton();
  }
}

function validateUserLogin(event) {
  event.preventDefault()
  if (userLogin.value === 'customer17'  && userPassword.value === 'o') {
  // if (userLogin.value.slice(0, 8) === 'customer' && userLogin.value.slice(8) > 0 && userLogin.value.slice(8) <= 50 && userPassword.value === 'Overlook2020') {
    guest = new Guest(usersData, roomsData, bookingsData);
    getGuest();
    enableGuestHomeView();
    insertGuestName();
  } else if (userLogin.value === 'manager' && userPassword.value === 'Overlook2020') {
    manager = new Manager(usersData, roomsData, bookingsData);
    enableManagerView();
  } else {
    disableSubmitButton();
    userLogin.value = '';
    userPassword.value = '';
    loginAlert.innerHTML = '<p>Whoops! Your user login and/or password are incorrect.<br>Please try again or contact management.</p>'
  }
}

function getGuest() {
  let currentGuestID = Number(userLogin.value.slice(8));
  guest.selectGuest("id", currentGuestID)
  console.log('loggedInGuest', guest.selectedGuest)
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

function getToday() {
  return new Date();
}

function insertGuestName() {
  const headingName = document.querySelector('.heading-name');
  const spentName = document.querySelector('.spent-name');
  const spentAmout = document.querySelector('.spent-amount');
  let spent = getBookingsAndTotalSpent();
  console.log('spent', spent)
  // let totalSpentAmount = guest.calculateGuestTotalSpent();
  // console.log('spent', totalSpentAmount);
  headingName.innerText = guest.selectedGuest.name;
  spentName.innerText = guest.selectedGuest.name;
  spentAmout.innerText = spent;
}

function getBookingsAndTotalSpent() {
  let date = getToday();
  guest.getSelectedGuestBookings();
  console.log('allguestbookings', guest.selectedGuestBookings)
  guest.seperatePastFromUpcomingBookings(date);
  console.log('pastbookings', guest.pastBookings)
  return guest.calculateGuestTotalSpent();
}

/*

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
