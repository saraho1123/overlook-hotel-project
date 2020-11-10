
class APIRequests {
  constructor() {
    this.urlRoot = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/'
  }

  fetchData(urlPath, dataFile) {
    return fetch(`${this.urlRoot}${urlPath}`)
      .then(response => response.json())
      .then(data => data[dataFile])
      .catch(error => console.log(error))
  }

  postData(urlPath, bookingData) {
    return fetch(`${this.urlRoot}${urlPath}`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
  /*
Need to update this.bookings.
POST
and then fetch the updated data so I can update this.bookings.
ALSO DO THIS WITH DELETE.
  */

  deleteData(urlPath, inputID) {
    return fetch(`${this.urlRoot}${urlPath}`, {
      method: 'DELETE',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: inputID,
      })
    })
    .then(response => response.json())
    .then(data => console.log(data)) // I am not sure that is what I want to do here??
    .catch(error => console.log(error)) 
  }
}

export default APIRequests;
