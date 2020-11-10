import APIRequests from './Fetch';
const apiRequests = new APIRequests();


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

  listBookedRoomNumberByDate(date) {
    const bookedRoomsOnDate = this.bookings.filter(booking => {
      return booking.date === date;
    })
    return bookedRoomsOnDate.map(booked => {
      return booked.roomNumber
    })
  }

  listVacantRoomsByDate(date) {
    const bookedRoomNumbers = this.listBookedRoomNumberByDate(date)
    const availableRoomsOnDate = this.rooms.reduce((available, room) => {
      !bookedRoomNumbers.includes(room.number) ? available.push(room) : null;
      return available
    }, [])
    return availableRoomsOnDate;
  }

  bookRoomForGuest(userID, date, roomNum) { 
    let bookingData =  { "userID": userID, "date": date, "roomNumber": roomNum }
    console.log('bookingData', typeof bookingData.userID)
    apiRequests.postData('bookings/bookings', bookingData)
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
