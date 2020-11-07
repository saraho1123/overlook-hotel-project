import { expect } from 'chai';

import Guest from '../src/Guest';
import sampleUserData from '../src/sample-data/sample-user-data';
import sampleRoomData from '../src/sample-data/sample-room-data';
import sampleBookingData from '../src/sample-data/sample-booking-data';

describe('Guest', () => {
  let guest;

  beforeEach( () => {
    guest = new Guest(sampleUserData, sampleRoomData, sampleBookingData);
  });
  
  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceof(Guest);
  });

  it('should be able to select a user by id from login', () => {
    guest.selectGuest("id", 1);

    expect(guest.selectedGuest.name).to.equal("Isaac Osgood");
  });

  it('should be able to find all bookings for selected guest', () => {
    guest.selectGuest("Isaac Osgood");
    guest.getSelectedGuestBookings()
    expect(guest.selectedGuestBookings).to.deep.equal([  
      {"id":"5fwrgu4i7k55hl6sz","userID":1,"date":"2020/04/22","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t9","userID":1,"date":"2020/04/21","roomNumber":5,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t0","userID":1,"date":"2020/04/21","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t3","userID":1,"date":"2020/05/21","roomNumber":3,"roomServiceCharges":[]},
    ])
  });

  it('should be able to book a room for selected guest', () => {
    expect(guest.bookRoomForGuest(1, '2020/11/14', 4)).to.deep.equal(
      {
        "userID": 1,
        "date": "2020/11/14",
        "roomNumber": 4
    })
  });

  it('should be able to seperate past bookings from upcoming bookings', () => {
    guest.selectGuest("id", 1);
    guest.getSelectedGuestBookings();
    guest.seperatePastFromUpcomingBookings('2020/4/30')
    expect(guest.pastBookings).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6sz","userID":1,"date":"2020/04/22","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t9","userID":1,"date":"2020/04/21","roomNumber":5,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t0","userID":1,"date":"2020/04/21","roomNumber":1,"roomServiceCharges":[]},
    ]);
    expect(guest.upcomingBookings).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6t3","userID":1,"date":"2020/05/21","roomNumber":3,"roomServiceCharges":[]},
    ]);
  });

  it('should return all rooms available for selected date', () => {
    expect(guest.listVacantRoomsByDate("2020/04/21")).to.deep.equal([
      {"number": 2,"roomType": "suite","bidet": false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
      {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":4,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
    ]);
  });

  it('should return all rooms available for selected date and type', () => {
    expect(guest.filterRoomsbyTypeOnDate('junior suite', "2020/04/21")).to.deep.equal([
      {"number":4,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
    ])
  });

  it('should apologize profusely and give suggestions to proceed if there are no available rooms', () => {
    expect(guest.filterRoomsbyTypeOnDate('single room', "2020/06/27")).to.equal(
      'There are no available rooms of this time for the date you have picked. We are so very sorry! We love all our guests and really hope to see you very soon! Please click the "Choose New Date" button, or choose a different style of room for this date. '
    )
  })

});

