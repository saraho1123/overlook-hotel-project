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

  convertDateToUsableFormat(date) {
    let todaysDate = new Date(date);
    return todaysDate.getTime();
  }

  seperatePastFromUpcomingBookings(date) {
    let todaysDate = this.convertDateToUsableFormat(date);
    return this.selectedGuestBookings.filter(booking => {
      let bookingDate = this.convertDateToUsableFormat(booking.date);
      let smallerDate = bookingDate < todaysDate;
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

  filterRoomsBySelectedDate(date) {
    /*
    need to rethink this. 
    need rooms! not bookings!
    NEEDS MORE WORK WHEN I AM RESTED!
    */
    let todaysDate = this.convertDateToUsableFormat(date);
    let bookedRooms = this.bookings.filter(booking => {
      let bookingDate = this.convertDateToUsableFormat(booking.date);
      return bookingDate === todaysDate; 
    })

    let stuff =  this.rooms.filter(room => {
      return bookedRooms.forEach(booked => {
        if (booked.roomNumber !== room.number) {
          return room;
        }    
      })
    })
    return stuff;
  }
  filterRoomsByTypeOnDate(type) {
    let currentRoomsAvailable = filterRoomsBySelectedDate(date)
    return this.rooms.filter(room => {
      currentRoomsAvailable.forEach(available => {

      })
      return room.roomType === type;
    })
  }
  
}

export default Guest;
