class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.users = usersData
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.selectedGuest = null;
    this.selectedGuestBookings = null;
  }

  selectGuest(userKey, userIdentifier) {
    this.selectedGuest = this.users.find(user => {
      return user[userKey] === userIdentifier;
    })
  }

  getSelectedGuestBookings() {
    this.selectedGuestBookings = this.bookings.filter(booking => {
      let guestBookings = booking.userID === this.selectedGuest.id;
      return guestBookings;
    })
  }

  bookRoomForGuest(userID, date, roomNumber) { // possibly put on a parent class
    let bookingData =  { userID: userID, date: date, roomNumber: roomNumber }
    // call fetchPOST here, I think
    return bookingData;
  }

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
}

export default Hotel;
