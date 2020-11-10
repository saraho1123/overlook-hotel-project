import Hotel from '../src/Hotel';

class Guest extends Hotel {
  constructor(usersData, roomsData, bookingsData) {
    super(usersData, roomsData, bookingsData)
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.verySorryMessage = 'There are no available rooms of this time for the date you have picked. We are so very sorry! We love all our guests and really hope to see you very soon! Please click the "Choose New Date" button, or choose a different style of room for this date. '
  }

  convertDateToUsableFormat(date) {
    // let todaysDate = new Date(date);
    // let today = moment(todaysDate).format("YYYY/MM/DD")
    // return today
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
    const total = this.pastBookings.reduce((totalSpent, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalSpent += (room.costPerNight * 100)
        }
      })
      return totalSpent 
    }, 0) 
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
    // console.log(roomsByType)
    // if (roomsByType.length === 0) {
    //   return this.verySorryMessage;
    // } else {
    //   return roomsByType;
    // }
    return roomsByType
  }
}

export default Guest;
