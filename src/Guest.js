import Hotel from '../src/Hotel';

class Guest extends Hotel {
  constructor(usersData, roomsData, bookingsData) {
    super(usersData, roomsData, bookingsData)
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.selectedGuestTotalSpent = null;
    this.verySorryMessage = `<div class="sorry"><h2 class="heading2">There are no available rooms at this time for the date you have picked.<br>We are so very sorry!<br>We love all our guests and really hope to see you very soon!<br>Please click the "Choose New Date" button, or choose a different style of room for this date.</h2></div>`
  }

  convertDateToUsableFormat(date) {
    let todaysDate = new Date(date);
    return todaysDate.toLocaleDateString();
  }

  seperatePastFromUpcomingBookings(date) {
    let todaysDate = this.convertDateToUsableFormat(date);
    return this.selectedGuestBookings.filter(booking => {
      let bookingDate = this.convertDateToUsableFormat(booking.date);
      let smallerDate = bookingDate < todaysDate;
      smallerDate ? this.pastBookings.push(booking) : this.upcomingBookings.push(booking);
    })
  }

  calculateGuestTotalSpent() {
    const total = this.selectedGuestBookings.reduce((totalSpent, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalSpent += (room.costPerNight * 100)
        }
      })
      return totalSpent 
    }, 0) 
    this.selectedGuestTotalSpent = total / 100;
    return total / 100
  }

  filterRoomsByTypeOnDate(date, type) {
    const currentRoomsAvailable = this.listVacantRoomsByDate(date)
    const roomTypes = this.rooms.filter(room => {
      return room.roomType === type;
    })
    let roomsByType = roomTypes.reduce((typesAvailable, room) => {
      currentRoomsAvailable.forEach(available => {
        if (available === room) {
          typesAvailable.push(room);
        } 
      })
      return typesAvailable
    }, [])
    return roomsByType
  }
}

export default Guest;
