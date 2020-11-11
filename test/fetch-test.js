const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;
const APIRequests = require('../src/Fetch');

describe('APIRequest', function() {

  before(function() {
    global.APIRequests = {};
    chai.spy.on(APIRequests, ['fetchData'], () => {});
  });
  
  it('should be able to get user data', function() {
    APIRequests.fetchData('users/users', 'users');

    expect(APIRequests.fetchData).to.have.been.called(1);
    expect(APIRequests.fetchData).to.have.been.called.with('users/users', 'users');
  });

  it('should be able to post bookings', function() {
    APIRequests.postData('bookings/bookings', 'bookings');
// I need help on this one. I don't know why the test is saying postData is not a function
    expect(APIRequests.postData).to.have.been.called(1);
    expect(APIRequests.postData).to.have.been.called.with('bookings/bookings', 'bookings');
  });

  it('should be able to post bookings', function() {
    APIRequests.deleteData('bookings/bookings', 12085397154);
// I need help on this one. I don't know why the test is saying deleteData is not a function
    expect(APIRequests.deleteData).to.have.been.called(1);
    expect(APIRequests.deleteData).to.have.been.called.with('bookings/bookings', 12085397154);
  });

});
