
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

}
// ROOM: {"number": 1,"roomType": "residential suite","bidet": true,"bedSize": "queen","numBeds": 1,"costPerNight":358.4},
// BOOKING: {"id":"5fwrgu4i7k55hl6t9","userID":1,"date":"2020/04/21","roomNumber":5,"roomServiceCharges":[]},


/*
searchForGuest:
		return: 
		name
		all bookings for guest
		total of all $ spent by guest
bookRoomForGuest (possibly on parent class)
deleteBookingForGuest
getTotalRevenue

*/

export default Manager;
