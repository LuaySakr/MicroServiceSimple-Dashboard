if(process.env.NODE_ENV === 'docker'){
  module.exports = {vehicleownerHostPort: 'http://vehicleowner-api:7003/api/vehicleowners'}
} else {
  module.exports = {vehicleownerHostPort: 'http://localhost:7003/api/vehicleowners'}
}

