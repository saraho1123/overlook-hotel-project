
class Manager {
  constructor(userData, roomData, bookingsData) {
    this.users = userData;
    this.rooms = roomData;
    this.bookings = bookingsData;
    this.selectedGuest;
    this.guestBookings;
    this.guestTotalSpent; // function to select user
  }

  selectGuest(userID) {
    this.selectedGuest = this.users.find(user => {
      return user.id === userID;
    })
  }

  getSelectedGuestBookings(userID) {
    this.guestBookings = this.bookings.filter(booking => {
      return booking.userID === userID
    })
  }

  getGuestTotalSpent(bookings) {
    this.guestTotalSpent = this.rooms.reduce((totalSpent, room) => {
      let cost = bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          totalSpent += room.costPerNight
      }
    })
      return totalSpent
    }, 0) 
  }

  bookRoomForGuest(userID, date, roomNumber) {
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

/*

bookRoomForGuest (possibly on parent class)
deleteBookingForGuest
Total Rooms available for today
Total revenue for today
Percent rooms occupied for today

*/

export default Manager;
