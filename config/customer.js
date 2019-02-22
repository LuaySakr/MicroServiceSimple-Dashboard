if(process.env.NODE_ENV === 'docker'){
  module.exports = {customerHostPort: 'http://customer-api:7001/api/customers'}
} else {
  module.exports = {customerHostPort: 'http://localhost:7001/api/customers'}
}