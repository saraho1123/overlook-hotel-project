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
      this.verySorryMessage = 'There are no available rooms of this time for the date you have picked. We are so very sorry! We love all our guests and really hope to see you very soon! Please click the "Choose New Date" button, or choose a different style of room for this date. '
  }

  convertDateToUsableFormat(date) {
    let todaysDate = new Date(date);
    // if you don't pass in a date, it just uses TODAY's date automically! 
    // .toLocaleDateString
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

  listOccupiedRoomsByDate(date) {
    const bookedRoomsOnDate = this.bookings.filter(booking => {
      return booking.date === date;
    })
    return bookedRoomsOnDate.map(booked => {
      return booked.roomNumber
    })
  }

  listVacantRoomsByDate(date) {
   const bookedRoomNumbers = this.listOccupiedRoomsByDate(date)
    const availableRoomsOnDate = this.rooms.reduce((available, room) => {
      !bookedRoomNumbers.includes(room.number) ? available.push(room) : null;
      return available
    }, [])
    return availableRoomsOnDate;
  }

  filterRoomsByTypeOnDate(type, date) {
    const currentRoomsAvailable = this.listVacantRoomsByDate(date)
    const roomType = this.rooms.filter(room => {
      return room.roomType === type;
    })
    return roomType.reduce((typesAvailable, room) => {
      currentRoomsAvailable.forEach(available => {
        if (available === room) {
          typesAvailable.push(room);
        } 
      })
      if (typesAvailable.length === 0) {
        return `${this.verySorryMessage}`;
      } else {
        return typesAvailable;
      }
    }, [])
  }
  
}

export default Guest;
