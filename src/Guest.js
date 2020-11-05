import Hotel from '../src/Hotel';

class Guest extends Hotel {
  constructor(usersData, roomData, bookingsData) {
    super(usersData, roomData, bookingsData)
    this.guest = null;
    this.users = usersData;
    this.rooms = roomData;
    this.bookings = bookingsData;
  }

  // selectGuest(userKey, userIdentifier) {
  //   this.selectedGuest = this.users.find(user => {
  //     return user[userKey] === userIdentifier;
  //   })
  // }

  // FOR GUEST CLASS!
  // getGuestTotalSpent() {
  //   return this.rooms.reduce((totalSpent, room) => {
  //     this.bookings.forEach(booking => {
  //       if (booking.roomNumber === room.number) {
  //         totalSpent += room.costPerNight
  //     }
  //   })
  //     return totalSpent
  //   }, 0) 
  // }
  // */


}

export default Guest;
