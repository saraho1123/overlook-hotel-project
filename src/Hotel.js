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
      let guestBookings = booking.userID == this.selectedGuest.id;
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

  calculateGuestTotalSpent() {
    const total = this.selectedGuestBookings.reduce((totalSpent, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalSpent += (room.costPerNight * 100)
        }
      })
      return totalSpent 
    }, 0) 
    return total / 100
    //this is notes for chai spies!
    // let finalTotal = total / 100
    // dom-updates.showTotalSpent(finalTotal)
    // return finalTotal
  }

  bookRoomForGuest(userID, date, roomNum) { 
    let bookingData =  { "userID": userID, "date": date, "roomNumber": roomNum }
    console.log('bookingData', typeof bookingData.userID)
    return apiRequests.postData('bookings/bookings', bookingData)
      .then(value => {
        return value;
      })
  }
}

export default Hotel;
