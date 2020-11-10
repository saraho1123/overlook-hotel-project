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
import moment from 'moment';;
import Guest from './Guest';
import Manager from './Manager';
import APIRequests from './Fetch';

// Query Selectors

// inputs
const userLogin = document.querySelector('.user-login');
const userPassword = document.querySelector('.user-password');
const dropdownCalendar = document.querySelector('.calendar');

// buttons
const loginButton = document.querySelector('.submit-login');
const makeBookingButton = document.querySelector('.make-booking');
const showAvailableRoomsButton = document.querySelector('.see-available-rooms-button');
const backToChooseDateButton = document.querySelector('.back-to-choose-date-button');
const filterByType = document.querySelector('.choose-by-type');
const returnGuestHomeViewButton = document.querySelector('.return-homeview');

// page views
const loginView = document.querySelector('.login-view');
const navSection = document.querySelector('.nav-buttons-section');
const guestHomeView = document.querySelector('.guest-home-view');
const managerView = document.querySelector('.manager-view');
const chooseDateView = document.querySelector('.guest-choose-date-view');
const guestBookRoomView = document.querySelector('.guest-book-room-view');
const roomIsBookedView = document.querySelector('.room-booked-view');

// other elements
const headingGuestName = document.querySelector('.heading-name');
const loginAlert = document.querySelector('.login-alert');
const guestViewBookings = document.querySelector('.cards-of-rooms'); // maybe change var name!
const currentRoomsAvailable = document.querySelector('.list-rooms-available');
const guestViewRoomCards = document.querySelector('.guest-rooms-available-by-date');

// Event Listeners
window.addEventListener('keyup', allowWrongLoginAlerts);
loginButton.addEventListener('click', validateUserLogin);
makeBookingButton.addEventListener('click', displayBookingView);
showAvailableRoomsButton.addEventListener('click', displayAvailableRooms);
backToChooseDateButton.addEventListener('click', displayBookingView);
filterByType.addEventListener('change', displayRoomsByTypeGuest);
guestViewRoomCards.addEventListener('click', bookThisRoom);
returnGuestHomeViewButton.addEventListener('click', returnGuestHomeView);

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

let todaysDate = new Date();
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
  // if (userLogin.value === 'customer17' && userPassword.value === 'o') { // cheat login! ;) 
  if (userLogin.value.slice(0, 8) === 'customer' && userLogin.value.slice(8) > 0 && userLogin.value.slice(8) <= 50 && userPassword.value === 'o') {
    guest = new Guest(usersData, roomsData, bookingsData);
    getGuest();
    enableGuestHomeView();
  } else if (userLogin.value === 'm' && userPassword.value === 'o') {
  // } else if (userLogin.value === 'manager' && userPassword.value === 'Overlook2020') {
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
  return guest.selectGuest("id", currentGuestID)
}

function enableGuestHomeView() {
  loginView.classList.add('hidden');
  navSection.classList.remove('hidden');
  guestHomeView.classList.remove('hidden');
  headingGuestName.value = '${user.name}';
  displayGuestNameDasboard();
  displayGuestPastBookingsDasboard();
}

function enableManagerView() {
  loginView.classList.add('hidden');
  managerView.classList.remove('hidden');
  displayManagerDasboard();
  displayTodaysDate();
  displayRevenueForDay();
  displayPercentBookedForDay();
  displayVacantRoomsByDateManager(currentRoomsAvailable);
}

function getToday(date) {
  return moment(date).format("YYYY/MM/DD")
}

function getBookingsAndTotalSpent() {
  let date = new Date();
  guest.getSelectedGuestBookings();
  guest.seperatePastFromUpcomingBookings(date);
  return guest.calculateGuestTotalSpent();
}

function displayGuestNameDasboard() {
  const headingName = document.querySelector('.heading-name');
  const spentName = document.querySelector('.spent-name');
  const spentAmout = document.querySelector('.spent-amount');
  let spent = getBookingsAndTotalSpent();
  headingName.innerText = guest.selectedGuest.name;
  spentName.innerText = guest.selectedGuest.name;
  spentAmout.innerText = spent;
}

function displayBookingView() {
  makeBookingButton.style.visibility = "hidden";
  enableChooseDateView();
}

function enableChooseDateView() {
  guestHomeView.classList.add('hidden');
  chooseDateView.classList.remove('hidden');
  guestBookRoomView.classList.add('hidden');
}

function guestChooseDate() {
  let date = dropdownCalendar.value
  let returnDate = moment(date).format("YYYY/MM/DD")
  return returnDate;
}

function displayGuestPastBookingsDasboard() {  
  guest.pastBookings.map(booking => {
    guest.rooms.forEach(room => {
      if (booking.roomNumber === room.number) {
        guestViewBookings.insertAdjacentHTML('afterbegin', `
          <article class="room booked-room">
          <img class="room-image" src="./images/hotel-room.jpg" alt="room-image">
          <section class="room-details">
            <h2 class="room-number-type">Room ${room.number}: ${room.roomType.toUpperCase()}</h2>
            <article class="small-room-details">
              <p class="num-beds small-details">Number of Beds: ${room.numBeds} </p>
              <p class="bed-size small-details">Bed Size: ${room.bedSize}</p>
              <p class="bidet small-details">Has Bidet: ${room.bidet}</p>
              <p class="cost small-details">Paid: $${room.costPerNight}</p>
              <p class="stayed small-details">Date Stayed: ${booking.date}</p>
            </article>
          </section>
        </article>
        `)
      }
    })
  })
}

function displayAvailableRooms() {
  chooseDateView.classList.add('hidden');
  guestBookRoomView.classList.remove('hidden');
  guestChooseDate();
  displayVacantRoomsByDateGuest('listVacantRoomsByDate');
}

function displayVacantRoomsByDateGuest(filterMethod) {
  //need to get today's bookings!! also need to display by chosen date!!
  let date = guestChooseDate();
  let vacantRooms = guest[filterMethod](date);
  console.log(vacantRooms)
  vacantRooms.forEach(room => {
    guestViewRoomCards.insertAdjacentHTML('afterbegin', `
      <article id="${room.number}" class="room">
        <img id="${room.number}" class="room-image" src="./images/hotel-room.jpg" alt="room-image">
        <section id="${room.number}" class="room-details">
          <h2 id="${room.number}" class="room-number-type">Room ${room.number}: ${room.roomType}</h2>
          <article id="${room.number}" class="small-room-details">
            <p id="${room.number}" class="num-beds small-details">Number of Beds: ${room.numBeds} </p>
            <p id="${room.number}" class="bed-size small-details">Bed Size: ${room.bedSize}</p>
            <p id="${room.number}" class="bidet small-details">Has Bidet: ${room.bidet}</p>
            <p id="${room.number}" class="cost small-details">Price: $${room.costPerNight}</p>
            <button id="${room.number}" class="book-room submit" label="book-this-room" type="button">Book This Room</button>
          </article>
        </section>
      </article>
    `)          
  })
    // const bookRoomButton = document.querySelector('.book-room');
    // bookRoomButton.addEventListener('click', bookThisRoom);
}

function displayVacantRoomsbyTypeGuest() {
  //need to get today's bookings!! also need to display by chosen date!!
  guestViewRoomCards.innerHTML = ``
  let date = guestChooseDate();
  let type = filterRoomsByTypeGuest();
  let vacantRooms = guest.filterRoomsByTypeOnDate(date, type);
  console.log(vacantRooms)
  vacantRooms.forEach(room => {
    guestViewRoomCards.insertAdjacentHTML('afterbegin', `
      <article class="room">
        <img class="room-image" src="./images/hotel-room.jpg" alt="room-image">
        <section class="room-details">
          <h2 class="room-number-type">Room ${room.number}: ${room.roomType}</h2>
          <article class="small-room-details">
            <p class="num-beds small-details">Number of Beds: ${room.numBeds} </p>
            <p class="bed-size small-details">Bed Size: ${room.bedSize}</p>
            <p class="bidet small-details">Has Bidet: ${room.bidet}</p>
            <p class="cost small-details">Price: $${room.costPerNight}</p>
            <button id="${room.number}" class="book-room submit" label="book-this-room" type="button">Book This Room</button>
          </article>
        </section>
      </article>
    `)          
  })
  // const bookRoomButton = document.querySelector('.book-room');
  // bookRoomButton.addEventListener('click', bookThisRoom);
}

function displayRoomsByTypeGuest() {
  displayVacantRoomsbyTypeGuest();
}

function filterRoomsByTypeGuest() { // This need work, and corresponding method in Guest.js
  let roomTypes = ['junior suite', 'single room', 'suite', 'residential suite']
    return roomTypes.find(type => {
      console.log('filterByType', filterByType.value)
    if (filterByType.value = type) {
      return type
    }
  })
}

function bookThisRoom(event) {
  console.log(+event.target.id)
  const userID = guest.selectedGuest.id
  const chosenDate = guestChooseDate();
  const date = getToday(chosenDate);
  const roomNumber = event.target.id
  guest.bookRoomForGuest(+userID, date, +roomNumber);
  showBookedRoomMessage();
}

function showBookedRoomMessage() {
  guestBookRoomView.classList.add('hidden');
  roomIsBookedView.classList.remove('hidden');
}

function returnGuestHomeView() {
  console.log('this.bookings', guest.bookings)

  makeBookingButton.classList.remove('hidden');
  guestHomeView.classList.remove('hidden');
  roomIsBookedView.classList.add('hidden');
  guest.upcomingBookings.map(booking => {
    guest.rooms.forEach(room => {
      if (booking.roomNumber === room.number) {
        guestViewBookings.insertAdjacentHTML('afterbegin', `
          <article class="room booked-room">
          <img class="room-image" src="./images/hotel-room.jpg" alt="room-image">
          <section class="room-details">
            <h2 class="room-number-type">Room ${room.number}: ${room.roomType.toUpperCase()}</h2>
            <article class="small-room-details">
              <p class="num-beds small-details">Number of Beds: ${room.numBeds} </p>
              <p class="bed-size small-details">Bed Size: ${room.bedSize}</p>
              <p class="bidet small-details">Has Bidet: ${room.bidet}</p>
              <p class="cost small-details">Paid: $${room.costPerNight}</p>
              <p class="stayed small-details">Date Stayed: ${booking.date}</p>
            </article>
          </section>
        </article>
        `)
      }
    })
  })
}

function displayManagerDasboard() {
  const welcomeHeader = document.querySelector('.welcome');
  welcomeHeader.innerText = `Welcome, Overlook Hotel Manager. We love our guests!`;
}

function displayTodaysDate() {
  const dailyHotel = document.querySelector('.daily-hotel');
  const dailyRoomsAvailable = document.querySelector('.daily-rooms-available');
  let date = getToday(todaysDate);
  dailyHotel.innerHTML = `Hotel overview for ${date}`;
  dailyRoomsAvailable.innerHTML = `Rooms available for ${date}`;
}

function displayRevenueForDay() {
  const daysRevenue = document.querySelector('.total-revenue');
  let date = getToday();
  let calculatedRevenue = manager.getTodaysTotalRevenue(date, manager.rooms, manager.bookings);
  daysRevenue.innerHTML = `Revenue:  $${calculatedRevenue}`;
}

function displayPercentBookedForDay() {
  const daysPercentage = document.querySelector('.total-percentage');
  let date = getToday();
  let calculatedPercentage = manager.calculatePercentOccupied(date);
  daysPercentage.innerHTML = `Percentage of rooms booked:  ${calculatedPercentage}`
}

function displayVacantRoomsByDateManager(htmlElement) {
  //need to get today's bookings!! also need to display by chosen date!!
  let date = getToday(todaysDate);
  let vacantRooms = manager.listVacantRoomsByDate(date);
  vacantRooms.forEach(room => {
    htmlElement.insertAdjacentHTML('afterbegin', `
      <article class="room vacant-room">
        <section class="rooms-available-cards room-details">
          <h2 class="room-number-type">Room ${room.number}: ${room.roomType}</h2>
          <article class="small-room-details">
            <p class="num-beds small-details">Number of Beds: ${room.numBeds} </p>
            <p class="bed-size small-details">Bed Size: ${room.bedSize}</p>
            <p class="bidet small-details">Has Bidet: ${room.bidet}</p>
            <p class="cost small-details">Price: $${room.costPerNight}</p>
            <button class="book-room-for-guest submit">Book this room for currently selected guest</button>
            only show this button if a guest is selected
          </article>
        </section>
      </article>
    `)          
  })
}

