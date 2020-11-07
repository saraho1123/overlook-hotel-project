
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

  postData(urlPath, inputUserID, inputDate, inputRoomNumber) {
    return fetch(`${this.urlRoot}${urlPath}`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': inputUserID,
        'data': inputDate,
        'roomNumber': inputRoomNumber,
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
}

export default APIRequests;
