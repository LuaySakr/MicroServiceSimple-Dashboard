if(process.env.NODE_ENV === 'docker'){
  module.exports = {zipkinHost: 'zipkin'}
} else {
  module.exports = {zipkinHost: 'zipkin'}
}