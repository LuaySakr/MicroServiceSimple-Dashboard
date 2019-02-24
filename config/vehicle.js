if(process.env.NODE_ENV === 'docker'){
  module.exports = {vehicleHostPort: 'http://vehicle-api:7002/api/vehicles'}
} else {
  module.exports = {vehicleHostPort: 'http://vehicle-api:7002/api/vehicles'}
}