if(process.env.NODE_ENV === 'docker'){
  module.exports = {vehicleownerHostPort: 'vehicleowner-api:7003'}
} else {
  module.exports = {vehicleownerHostPort: 'localhost:7003'}
}