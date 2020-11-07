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

});

//   it('should be able to fetch user data', function() {
//     apiRequest.getUserData();

//     expect(apiRequest.getUserData).to.have.been.called(1);
//     expect(apiRequest.getUserData).to.have.been.called.with();
//   });

//   it('should be able to fetch sleep data', function() {
//     apiRequest.getSleepData();

//     expect(apiRequest.getSleepData).to.have.been.called(1);
//     expect(apiRequest.getSleepData).to.have.been.called.with();
//   });

//   it('should be able to fetch hydration data', function() {
//     apiRequest.getHydrationData();

//     expect(apiRequest.getHydrationData).to.have.been.called(1);
//     expect(apiRequest.getHydrationData).to.have.been.called.with();
//   });

//   it('should be able to fetch activity data', function() {
//     apiRequest.getActivityData();

//     expect(apiRequest.getActivityData).to.have.been.called(1);
//     expect(apiRequest.getActivityData).to.have.been.called.with();
//   });
// });