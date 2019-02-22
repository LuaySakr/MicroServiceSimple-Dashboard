if(process.env.NODE_ENV === 'docker'){
  module.exports = {customerHost: 'customer-api'}
} else {
  module.exports = {customerHost: 'localhost'}
}