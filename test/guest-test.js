import { expect } from 'chai';

import Guest from '../src/Guest';
import sampleUserData from '../src/sample-data/sample-user-data';
import sampleRoomData from '../src/sample-data/sample-room-data';
import sampleBookingData from '../src/sample-data/sample-booking-data';

describe('Guest', () => {
  let guest;

  beforeEach( () => {
    guest = new Guest();
  });
  
  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceof(Guest);
  });

});

