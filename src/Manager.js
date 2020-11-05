
class Manager {
  constructor(userData, roomData, bookingsData) {
    this.users = userData;
    this.rooms = roomData;
    this.bookings = bookingsData;
    this.selectedGuest;
    // this.selectedGuestData = consolidateGuestData();
    this.guestBookings; // GOES ON BOTH
    // this.guestTotalSpent; // GOES ON GUEST CLASS!
  }

  selectGuest(name) {
    this.selectedGuest = this.users.find(user => {
      return user.name === name;
    })
  }

  getSelectedGuestBookings() {
    this.bookings = this.bookings.filter(booking => {
      return booking.userID === this.selectedGuest.id;
    })
  }
/*
FOR GUEST CLASS!
  getGuestTotalSpent() {
    return this.rooms.reduce((totalSpent, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          totalSpent += room.costPerNight
      }
    })
      return totalSpent
    }, 0) 
  }
  */

  /*
  PERHAPS USE THIS ON A PARENT CLASS??
  consolidateGuestData() {
    this.selectedGuestData = {
      // id: this.selectguest.id,
      // name: this.selectguest.name,
      bookings: this.getSelectedGuestBookings(),
      totalSpent: this.getGuestTotalSpent(),
    }  
  }
  */

  bookRoomForGuest(userID, date, roomNumber) { // possibly put on a parent class
    let bookingData =  { userID: userID, date: date, roomNumber: roomNumber }
    // call fetchPOST here, I think
    return bookingData;
  }

  deleteBookingForGuest(bookingID) {
    let bookingToCancel = {id: bookingID}
    // call fetchDELETE here, I think
    return bookingToCancel;
  }

  getTodaysTotalRevenue(date, rooms, bookings) {
    return bookings.reduce((total, booking) => {
      if (booking.date === date) {
        rooms.forEach(room => {
          if (booking.roomNumber === room.number) {
            total += room.costPerNight
          }
        })  
      } 
      return total;
   }, 0)
  } 

  calculatePercentOccupied(date) {
   let todaysBookings = this.bookings.filter(booking => {
    return booking.date === date;
    })
    let percentBooked = Math.round((todaysBookings.length/this.rooms.length) * 100);
    return `${percentBooked}%`
  }
}

export default Manager;
