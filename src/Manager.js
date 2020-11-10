import Hotel from '../src/Hotel';
import APIRequests from './Fetch';
const apiRequests = new APIRequests();

class Manager extends Hotel {
  constructor(userData, roomData, bookingsData) {
    super(userData, roomData, bookingsData)
  }

  deleteBookingForGuest(bookingID) {
    console.log('beforeDELETEGuestBookings', this.selectedGuestBookings)
    let bookingToCancel = {'id': Number(bookingID) }
    console.log('data', typeof bookingToCancel)
    console.log('bookingID', typeof bookingID)
    apiRequests.deleteData('bookings/bookings', bookingToCancel)
      .then(() => {
        this.updateBookingsData()
       }) // need to put then on it's own line
      .then(() => {
        console.log('refetchedGuestBookings', this.selectedGuestBookings)
      })   
  }

  getTodaysTotalRevenue(date, rooms, bookings) {
    return bookings.reduce((total, booking) => {
      if (booking.date === date) {
        rooms.forEach(room => {
          if (booking.roomNumber === room.number) {
            total += room.costPerNight
          }
        })  
      } 
      return total;
    }, 0)
  } 

  calculatePercentOccupied(date) {
    let todaysBookings = this.bookings.filter(booking => {
      return booking.date === date;
    })
    let percentBooked = Math.round((todaysBookings.length / this.rooms.length) * 100);
    return `${percentBooked}%`
  }
}

export default Manager;
