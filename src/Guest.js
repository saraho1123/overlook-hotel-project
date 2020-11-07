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

  filterRoomsbyTypeOnDate(type, date) {
    const currentRoomsAvailable = this.listVacantRoomsByDate(date)
    const roomType = this.rooms.filter(room => {
      return room.roomType === type;
    })
    return roomType.reduce((typesAvailable, room) => {
      currentRoomsAvailable.forEach(available => {
        available === room ? typesAvailable.push(room) : null;
      })
      return typesAvailable
    }, [])
  }
  
}

  // currentRoomsAvailable.forEach(available => {
      //   if (room.roomType === type) {
      //     typeAvailableRooms.push(room)
      //   }
      // })

export default Guest;


    // let todaysDate = this.convertDateToUsableFormat(date);
    // let availableRooms = this.bookings.filter(booking => {
    //   let bookingDate = this.convertDateToUsableFormat(booking.date);
    //   return bookingDate !== todaysDate; 
    // })
    // // console.log(bookedRooms)
    // // let stuff =  bookedRooms.filter(room => {
    // //   return bookedRooms.forEach(booked => {
    // //     if (booked.roomNumber !== room.number) {
    // //       return room;
    // //     }    
    // //   })
    // // })
    // // return stuff;
    // console.log(availableRooms)