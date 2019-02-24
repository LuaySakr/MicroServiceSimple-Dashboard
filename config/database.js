if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://mongodb/dashboard-prod'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/dashboard-dev'}
}