
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
    // call fetchPOST here
    return bookingData;
  }

  deleteBookingForGuest(bookingID) {
    let bookingToCancel = {id: bookingID}
    // call fetchDELETE here
    return bookingToCancel;
  }

  getTodaysTotalRevenue(date, rooms, bookings) {
    /*
    what? array of rooms w/ costs/night and array of rooms booked w/ dates & roomNum
    want? integer
    methods? reduce
    how?
    reduce rooms to access cost/night
    forEach bookings to access roomNum
    acc += cost/night

    PROBABLY NEED TO NUKE THIS AND START OVER!!!
    */
    return bookings.reduce((total, booking) => {
      let roomCost = rooms.forEach(room => {
        if (booking.date === date) {
          console.log(booking.date)
          return room.costPerNight
        } 
      })  
      console.log(roomCost)
      total += roomCost;
      return total;
   }, 0)
  } 

  calculatePercentOccupied(date, bookings) {

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
