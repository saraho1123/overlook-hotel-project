class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.users = usersData
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.selectedGuest = null;
  }

  selectGuest(userKey, userIdentifier) {
    this.selectedGuest = this.users.find(user => {
      return user[userKey] === userIdentifier;
    })
  }

  getSelectedGuestBookings() {
    this.bookings = this.bookings.filter(booking => {
      return booking.userID === this.selectedGuest.id;
    })
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
