if(process.env.NODE_ENV === 'docker'){
  module.exports = {vehicleHostPort: 'vehicle-api:7002'}
} else {
  module.exports = {vehicleHostPort: 'localhost:7002'}
}