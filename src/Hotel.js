class Hotel {
  constructor(userData, roomData, bookingsData, userKey, userIdentifier) {
    this.users = userData;
    this.rooms = roomData;
    this.bookings = bookingsData;
    this.selectedGuest = 
  }

  selectGuest(userKey, userIdentifier) {
    this.selectedGuest = this.users.find(user => {
      return user[userKey] === userIdentifier;
    })
  }
}

export default Hotel;
