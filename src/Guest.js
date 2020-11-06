import Hotel from '../src/Hotel';

class Guest extends Hotel {
  constructor(usersData, roomsData, bookingsData) {
    super(usersData, roomsData, bookingsData)
    // this.users = usersData
    // this.rooms = roomsData;
    // this.bookings = bookingsData;
    // this.selectedGuest = null;
    // this.selectedGuestBookings = null;
      this.pastBookings = [];
      this.upcomingBookings = [];
  }

  seperatePastFromUpcomingBookings(date) {
    let todaysDate = new Date(date)
    return this.selectedGuestBookings.filter(booking => {
      let bookingDate = new Date(booking.date)
      let smallerDate = bookingDate.getTime() < todaysDate.getTime();
      smallerDate ? this.pastBookings.push(booking) : this.upcomingBookings.push(booking);
    })
  }

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
  
}

export default Guest;
